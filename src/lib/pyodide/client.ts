// Pyodide Client hook
import { useEffect, useRef, useState, useCallback } from "react";

// `lazy` defers spinning up the Pyodide worker (a full CPython WASM runtime,
// tens of MB of memory) until code is first run/formatted/linted. The landing
// page uses this so merely scrolling past the demo editor doesn't load Python;
// in-app pages keep the default eager init so the runtime is warm by the time
// the user presses Run.
export function usePyodide({ lazy = false }: { lazy?: boolean } = {}) {
  const [isReady, setIsReady] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const bufferRef = useRef<SharedArrayBuffer | null>(null);
  const pendingRef = useRef<{ reject: (e: any) => void; handler: (e: MessageEvent) => void } | null>(null);
  const readyResolversRef = useRef<(() => void)[]>([]);
  // Mirrors isReady in a ref so ensureReady() can read the *current* readiness
  // synchronously — the state closure is stale until the next render, which
  // otherwise deadlocks a second ensureReady() call awaiting an already-fired
  // READY message.
  const readyRef = useRef(false);

  const initWorker = useCallback(() => {
    const w = new Worker("/worker.js");

    if (typeof SharedArrayBuffer !== "undefined") {
      bufferRef.current = new SharedArrayBuffer(1024 * 4); // 4KB buffer
    } else {
      console.warn("SharedArrayBuffer not available. input() will not block.");
    }

    w.onmessage = (e) => {
      if (e.data.type === "READY") {
        readyRef.current = true;
        setIsReady(true);
        readyResolversRef.current.forEach((r) => r());
        readyResolversRef.current = [];
      }
    };

    w.postMessage({ type: "INIT", id: "init" });
    workerRef.current = w;
  }, []);

  // Ensure the worker exists and Pyodide has finished loading, initializing it
  // on demand for lazy mode. Resolves immediately if already ready.
  const ensureReady = useCallback((): Promise<void> => {
    if (workerRef.current && readyRef.current) return Promise.resolve();
    if (!workerRef.current) initWorker();
    return new Promise((resolve) => {
      readyResolversRef.current.push(resolve);
    });
  }, [initWorker]);

  useEffect(() => {
    if (!lazy) initWorker();
    return () => {
      workerRef.current?.terminate();
    };
  }, [initWorker, lazy]);

  const runCode = async (
    code: string,
    files?: { name: string; content: string }[],
    onStdout?: (text: string) => void,
    onInput?: () => void
  ): Promise<string> => {
    await ensureReady();
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        reject(new Error("Worker not initialized"));
        return;
      }

      const id = Math.random().toString(36).substring(7);

      const handler = (e: MessageEvent) => {
        if (e.data.id !== id) return;

        if (e.data.type === "STDOUT" && onStdout) {
          onStdout(e.data.text);
        } else if (e.data.type === "WAIT_FOR_INPUT" && onInput) {
          onInput();
        } else if (e.data.type === "DONE") {
          workerRef.current?.removeEventListener("message", handler);
          pendingRef.current = null;
          resolve(e.data.result);
        } else if (e.data.type === "ERROR") {
          workerRef.current?.removeEventListener("message", handler);
          pendingRef.current = null;
          reject(new Error(e.data.error));
        }
      };

      pendingRef.current = { reject, handler };
      workerRef.current.addEventListener("message", handler);
      workerRef.current.postMessage({
        type: "RUN",
        id,
        code,
        files,
        buffer: bufferRef.current,
      });
    });
  };

  // Hard stop: terminate the worker (kills a runaway loop OR code blocked on
  // input) and spin up a fresh Pyodide. Reliable, at the cost of a short reload.
  const stop = useCallback(() => {
    if (pendingRef.current) {
      workerRef.current?.removeEventListener("message", pendingRef.current.handler);
      const rej = pendingRef.current.reject;
      pendingRef.current = null;
      rej(new Error("__STOPPED__"));
    }
    workerRef.current?.terminate();
    workerRef.current = null;
    readyRef.current = false;
    setIsReady(false);
    initWorker();
  }, [initWorker]);

  const submitInput = (text: string) => {
    if (!bufferRef.current) return;
    const view = new Int32Array(bufferRef.current);

    view[0] = text.length;
    for (let i = 0; i < text.length; i++) {
      view[i + 1] = text.charCodeAt(i);
    }

    Atomics.notify(view, 0, 1);
  };

  // Format the code with Black (in the worker). Rejects on syntax error.
  const format = (code: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        reject(new Error("Worker not ready"));
        return;
      }
      const id = Math.random().toString(36).substring(7);
      const handler = (e: MessageEvent) => {
        if (e.data.id !== id) return;
        if (e.data.type === "FORMATTED") {
          workerRef.current?.removeEventListener("message", handler);
          resolve(e.data.code);
        } else if (e.data.type === "FORMAT_ERROR") {
          workerRef.current?.removeEventListener("message", handler);
          reject(new Error(e.data.error));
        }
      };
      workerRef.current.addEventListener("message", handler);
      workerRef.current.postMessage({ type: "FORMAT", id, code });
    });
  };

  // Lint the code with pyflakes (in the worker). Never rejects.
  const lint = (
    code: string
  ): Promise<{ line: number; col: number; message: string; error?: boolean }[]> => {
    return new Promise((resolve) => {
      if (!workerRef.current) {
        resolve([]);
        return;
      }
      const id = Math.random().toString(36).substring(7);
      const handler = (e: MessageEvent) => {
        if (e.data.id !== id) return;
        if (e.data.type === "LINTED") {
          workerRef.current?.removeEventListener("message", handler);
          resolve(e.data.diagnostics || []);
        }
      };
      workerRef.current.addEventListener("message", handler);
      workerRef.current.postMessage({ type: "LINT", id, code });
    });
  };

  return { isReady, runCode, submitInput, stop, format, lint, ensureReady };
}
