importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

let pyodide = null;
let micropip = null;
let blackReady = false;
let pyflakesReady = false;

// Expose to Pyodide's js module
self.inputBuffer = null;
self.current_run_id = null;
self.postWaitForInput = (id) => {
  self.postMessage({ id, type: "WAIT_FOR_INPUT" });
};

async function init() {
  if (!pyodide) {
    pyodide = await self.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
    });
  }
  return pyodide;
}

async function ensureMicropip(p) {
  if (!micropip) {
    await p.loadPackage("micropip");
    micropip = p.pyimport("micropip");
  }
  return micropip;
}

async function ensureBlack(p) {
  if (blackReady) return;
  const mp = await ensureMicropip(p);
  await mp.install("black");
  blackReady = true;
}

async function ensurePyflakes(p) {
  if (pyflakesReady) return;
  const mp = await ensureMicropip(p);
  await mp.install("pyflakes");
  pyflakesReady = true;
}

self.onmessage = async (event) => {
  const { id, type, code, files, buffer } = event.data;

  if (type === "INIT") {
    try {
      await init();
      self.postMessage({ id, type: "READY" });
    } catch (e) {
      console.error("Pyodide init error:", e);
      self.postMessage({ id, type: "ERROR", error: e.toString() });
    }
    return;
  }

  if (type === "RUN") {
    try {
      if (buffer) {
        self.inputBuffer = new Int32Array(buffer);
      }
      self.current_run_id = id;

      const p = await init();

      // Write all project files to the FS so imports across files resolve
      if (Array.isArray(files)) {
        for (const f of files) {
          if (f && typeof f.name === "string" && typeof f.content === "string") {
            try { p.FS.writeFile(f.name, f.content); } catch (e) { /* ignore */ }
          }
        }
      }

      let stdoutText = "";
      p.setStdout({
        batched: (str) => {
          stdoutText += str + "\n";
          self.postMessage({ id, type: "STDOUT", text: str + "\n" });
        }
      });

      await p.runPythonAsync(`
import sys
import os
import builtins
import js

_cwd = os.getcwd()
if _cwd not in sys.path:
    sys.path.insert(0, _cwd)

def custom_input(prompt=""):
    js.postWaitForInput(js.current_run_id)
    js.Atomics.wait(js.inputBuffer, 0, 0)

    length = js.inputBuffer[0]
    chars = []
    for i in range(1, length + 1):
        chars.append(chr(js.inputBuffer[i]))

    js.inputBuffer[0] = 0
    return "".join(chars)

builtins.input = custom_input
      `);

      const result = await p.runPythonAsync(code);

      self.postMessage({ id, type: "DONE", result: stdoutText });
    } catch (e) {
      self.postMessage({ id, type: "ERROR", error: e.toString() });
    }
    return;
  }

  // Auto-format with Black (pip-installed on first use)
  if (type === "FORMAT") {
    try {
      const p = await init();
      await ensureBlack(p);
      p.globals.set("_src_to_format", code);
      const formatted = await p.runPythonAsync(
        "import black\nblack.format_str(_src_to_format, mode=black.Mode())"
      );
      self.postMessage({ id, type: "FORMATTED", code: formatted });
    } catch (e) {
      self.postMessage({ id, type: "FORMAT_ERROR", error: e.toString() });
    }
    return;
  }

  // Lint with pyflakes -> list of {line, col, message, error}
  if (type === "LINT") {
    try {
      const p = await init();
      await ensurePyflakes(p);
      p.globals.set("_src_to_lint", code);
      const result = await p.runPythonAsync(`
import json
from pyflakes import api as _pf_api

class _PFCollector:
    def __init__(self):
        self.items = []
    def unexpectedError(self, filename, msg):
        self.items.append({"line": 1, "col": 1, "message": str(msg), "error": True})
    def syntaxError(self, filename, msg, lineno, offset, text):
        self.items.append({"line": lineno or 1, "col": offset or 1, "message": str(msg), "error": True})
    def flake(self, message):
        try:
            text = message.message % message.message_args
        except Exception:
            text = str(message)
        self.items.append({"line": getattr(message, "lineno", 1), "col": getattr(message, "col", 0) + 1, "message": text, "error": False})

_pf_c = _PFCollector()
_pf_api.check(_src_to_lint, "main.py", _pf_c)
json.dumps(_pf_c.items)
`);
      self.postMessage({ id, type: "LINTED", diagnostics: JSON.parse(result) });
    } catch (e) {
      self.postMessage({ id, type: "LINTED", diagnostics: [] });
    }
    return;
  }
};
