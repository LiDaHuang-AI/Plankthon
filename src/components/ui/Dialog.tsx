"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { RippleButton } from "@/components/ui/RippleButton";

export interface PromptOptions {
  title: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  validate?: (v: string) => string | null | Promise<string | null>;
}

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  danger?: boolean;
}

export interface DialogContextType {
  prompt: (options: PromptOptions) => Promise<string | null>;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const DialogContext = createContext<DialogContextType | null>(null);

type DialogState =
  | {
      type: "prompt";
      options: PromptOptions;
      resolve: (val: string | null) => void;
    }
  | {
      type: "confirm";
      options: ConfirmOptions;
      resolve: (val: boolean) => void;
    };

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DialogState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const prompt = useCallback((options: PromptOptions): Promise<string | null> => {
    // Only allow one dialog at a time
    if (state) return Promise.resolve(null);
    return new Promise<string | null>((resolve) => {
      setState({
        type: "prompt",
        options,
        resolve: (val) => {
          setState(null);
          resolve(val);
        },
      });
    });
  }, [state]);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    if (state) return Promise.resolve(false);
    return new Promise<boolean>((resolve) => {
      setState({
        type: "confirm",
        options,
        resolve: (val) => {
          setState(null);
          resolve(val);
        },
      });
    });
  }, [state]);

  return (
    <DialogContext.Provider value={{ prompt, confirm }}>
      {children}
      {mounted && state && (
        <DialogContainer state={state} />
      )}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}

function DialogContainer({ state }: { state: DialogState }) {
  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const shouldReduceMotion = useReducedMotion();

  // Reset internal state when a new dialog opens
  useEffect(() => {
    if (state.type === "prompt") {
      setInputValue(state.options.defaultValue || "");
    }
    setValidationError(null);
    setIsValidating(false);

    // Save focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    return () => {
      // Restore focus on unmount
      previousActiveElement.current?.focus();
    };
  }, [state]);

  // Handle focus on open
  useEffect(() => {
    if (state.type === "prompt") {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    } else {
      if (confirmBtnRef.current) {
        confirmBtnRef.current.focus();
      }
    }
  }, [state.type]);

  const handleCancel = () => {
    if (state.type === "prompt") {
      state.resolve(null);
    } else {
      state.resolve(false);
    }
  };

  const handleConfirm = async () => {
    if (state.type === "prompt") {
      if (state.options.validate) {
        setIsValidating(true);
        setValidationError(null);
        try {
          const err = await state.options.validate(inputValue);
          if (err) {
            setValidationError(err);
            // Re-focus and select input on validation error
            inputRef.current?.focus();
            inputRef.current?.select();
            return;
          }
        } catch (e: any) {
          setValidationError(e.message || "การตรวจสอบล้มเหลว");
          return;
        } finally {
          setIsValidating(false);
        }
      }
      state.resolve(inputValue);
    } else {
      state.resolve(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
      return;
    }
    if (e.key === "Enter" && state.type === "prompt") {
      e.preventDefault();
      handleConfirm();
      return;
    }
    if (e.key === "Tab") {
      if (!modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll<HTMLElement>(
        'button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  };

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const cardVariants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : { scale: 0.95, opacity: 0, y: 10 },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : { scale: 1, opacity: 1, y: 0 },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : { scale: 0.95, opacity: 0, y: 10 },
  };

  const transition = shouldReduceMotion
    ? { duration: 0.05 }
    : { duration: 0.16, ease: "easeOut" as const };

  return createPortal(
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleCancel();
        }}
        className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onKeyDown={handleKeyDown}
      >
        <motion.div
          ref={modalRef}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          role="dialog"
          aria-modal="true"
          className="bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden max-w-[420px] w-full relative ring-1 ring-accent/30 flex flex-col"
        >
          {/* Header Row */}
          <div className="flex items-center gap-3 px-6 pt-6">
            {state.options.icon && (
              <div className="flex-shrink-0">
                {state.options.icon}
              </div>
            )}
            <h2 className="text-lg font-bold text-text">
              {state.options.title}
            </h2>
          </div>

          {/* Body Content */}
          <div className="px-6 py-4 flex-1">
            {state.type === "prompt" ? (
              <div className="flex flex-col gap-2">
                {state.options.label && (
                  <label className="text-sm font-medium text-text">
                    {state.options.label}
                  </label>
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder={state.options.placeholder}
                  disabled={isValidating}
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-text outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-[16px] font-sans"
                />
                {validationError && (
                  <p className="text-c-danger text-xs mt-1 leading-relaxed">
                    {validationError}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted leading-relaxed">
                {state.options.message}
              </p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 pb-6 pt-2 flex justify-end gap-3 bg-surface/50 border-t border-border/10">
            <RippleButton
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-muted hover:text-text hover:bg-surface-2 rounded-lg transition-colors"
            >
              {state.options.cancelText || "ยกเลิก"}
            </RippleButton>
            <RippleButton
              ref={confirmBtnRef}
              onClick={handleConfirm}
              disabled={isValidating}
              className={clsx(
                "px-4 py-2 text-sm font-bold rounded-lg transition-colors flex items-center justify-center min-w-[70px]",
                state.type === "confirm" && (state.options as ConfirmOptions).danger
                  ? "bg-c-danger text-white hover:bg-c-danger/90"
                  : "bg-accent text-bg hover:bg-accent/90",
                isValidating && "opacity-50 cursor-not-allowed"
              )}
            >
              {isValidating
                ? "กำลังตรวจ..."
                : state.options.confirmText || "ตกลง"}
            </RippleButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
