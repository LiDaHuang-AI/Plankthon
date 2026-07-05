"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Scene } from "./Scene";

export function LazyScene({
  scale = 1,
  rootRef,
  className,
}: {
  scale?: number;
  rootRef?: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: rootRef?.current ?? null, rootMargin: "200px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootRef]);

  return (
    <div ref={containerRef} className={className}>
      {inView && <Scene scale={scale} />}
    </div>
  );
}
