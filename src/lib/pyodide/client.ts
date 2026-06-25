// Pyodide Client hook
import { useEffect, useRef, useState } from "react";

export function usePyodide() {
  const [isReady, setIsReady] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const bufferRef = useRef<SharedArrayBuffer | null>(null);

  useEffect(() => {
    workerRef.current = new Worker("/worker.js");
    
    if (typeof SharedArrayBuffer !== "undefined") {
      bufferRef.current = new SharedArrayBuffer(1024 * 4); // 4KB buffer
    } else {
      console.warn("SharedArrayBuffer not available. input() will not block.");
    }

    workerRef.current.onmessage = (e) => {
      if (e.data.type === "READY") {
        setIsReady(true);
      }
    };

    workerRef.current.postMessage({ type: "INIT", id: "init" });

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const runCode = (
    code: string, 
    onStdout?: (text: string) => void,
    onInput?: () => void
  ): Promise<string> => {
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
          resolve(e.data.result);
        } else if (e.data.type === "ERROR") {
          workerRef.current?.removeEventListener("message", handler);
          reject(new Error(e.data.error));
        }
      };

      workerRef.current.addEventListener("message", handler);
      workerRef.current.postMessage({ 
        type: "RUN", 
        id, 
        code, 
        buffer: bufferRef.current 
      });
    });
  };

  const submitInput = (text: string) => {
    if (!bufferRef.current) return;
    const view = new Int32Array(bufferRef.current);
    
    view[0] = text.length;
    for (let i = 0; i < text.length; i++) {
      view[i + 1] = text.charCodeAt(i);
    }
    
    Atomics.notify(view, 0, 1);
  };

  return { isReady, runCode, submitInput };
}
