"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export function Tabs({ tabs, defaultTab }: { tabs: Tab[]; defaultTab?: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto");
  
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.id === activeTab);
    const el = tabsRef.current[activeIndex];
    if (el) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
    
    const contentEl = contentRefs.current[activeIndex];
    if (contentEl) {
      setContentHeight(contentEl.offsetHeight);
      
      const ro = new ResizeObserver(() => {
        setContentHeight(contentEl.offsetHeight);
      });
      ro.observe(contentEl);
      return () => ro.disconnect();
    }
  }, [activeTab, tabs]);

  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  return (
    <div className="w-full flex flex-col">
      <div className="relative flex p-1.5 bg-black/30 rounded-2xl mb-6 border border-white/5">
        <motion.div
          className="absolute top-1.5 bottom-1.5 bg-white/10 border border-white/5 rounded-xl shadow-md z-0"
          initial={false}
          animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabsRef.current[idx] = el;
            }}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "flex-1 relative z-10 px-4 py-2.5 text-sm font-medium transition-colors rounded-xl",
              activeTab === tab.id ? "text-white" : "text-muted hover:text-gray-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <motion.div 
        className="relative overflow-hidden w-full -mx-2 px-2"
        animate={{ height: contentHeight }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      >
        <motion.div
          className="flex items-start w-full"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        >
          {tabs.map((tab, idx) => (
            <div
              key={tab.id}
              ref={(el) => {
                contentRefs.current[idx] = el;
              }}
              className={clsx(
                "w-full flex-shrink-0 px-2 transition-all duration-500",
                activeTab === tab.id ? "opacity-100 blur-none" : "opacity-0 blur-sm pointer-events-none"
              )}
            >
              {tab.content}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
