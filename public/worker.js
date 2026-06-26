importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

let pyodide = null;

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

self.onmessage = async (event) => {
  const { id, type, code, buffer } = event.data;

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
      
      let stdoutText = "";
      p.setStdout({
        batched: (str) => {
          stdoutText += str + "\n";
          self.postMessage({ id, type: "STDOUT", text: str + "\n" });
        }
      });

      await p.runPythonAsync(`
import sys
import builtins
import js

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
  }
};
