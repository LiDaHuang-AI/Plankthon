"use client";

// Material-style ripple button, adapted from animate-ui (animate-ui.com/docs/
// components/buttons/ripple) to use the app's framer-motion + plain props.
// Drop-in replacement for <button>: pass the same className/onClick/etc. and it
// adds a click-origin ripple plus a subtle hover/tap scale. The ripple defaults
// to `currentColor`, so it adapts to each button (dark on the yellow Run button,
// light on dark surfaces) with no per-button config.

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Ripple = { id: number; x: number; y: number };

export type RippleButtonProps = HTMLMotionProps<"button"> & {
  rippleColor?: string;
  hoverScale?: number;
  tapScale?: number;
};

export function RippleButton({
  children,
  onClick,
  rippleColor,
  hoverScale = 1.03,
  tapScale = 0.96,
  style,
  disabled,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const ref = React.useRef<HTMLButtonElement>(null);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = ref.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const id = Date.now() + Math.random();
        const newRipple: Ripple = {
          id,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }
      onClick?.(event);
    },
    [onClick]
  );

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: hoverScale }}
      whileTap={disabled ? undefined : { scale: tapScale }}
      style={{ position: "relative", overflow: "hidden", ...style }}
      {...props}
    >
      {children as React.ReactNode}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 10, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: ripple.y - 10,
            left: ripple.x - 10,
            width: 20,
            height: 20,
            borderRadius: "50%",
            pointerEvents: "none",
            backgroundColor: rippleColor ?? "currentColor",
          }}
        />
      ))}
    </motion.button>
  );
}
