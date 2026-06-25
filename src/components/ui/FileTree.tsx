"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Folder, FileCode, CheckCircle, Lock, Monitor, Cpu } from "lucide-react";
import clsx from "clsx";
import { useRouter, usePathname } from "next/navigation";

export type FileNode = {
  name: string;
  type: "folder" | "file";
  path: string;
  icon?: React.ReactNode;
  status?: "locked" | "available" | "completed";
  children?: FileNode[];
};

export function FileTree({ data, onSelect }: { data: FileNode[]; onSelect?: (node: FileNode) => void }) {
  const [hoveredNode, setHoveredNode] = useState<{ id: string; rect: DOMRect } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleHover = (e: React.MouseEvent, id: string) => {
    const target = e.currentTarget as HTMLElement;
    setHoveredNode({
      id,
      rect: target.getBoundingClientRect(),
    });
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full text-[14px] font-medium text-muted select-none pb-8"
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {hoveredNode && containerRef.current && (
          <motion.div
            layoutId="file-tree-hover"
            className="absolute rounded-md bg-white/5 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              top: hoveredNode.rect.top - containerRef.current.getBoundingClientRect().top,
              left: hoveredNode.rect.left - containerRef.current.getBoundingClientRect().left,
              width: hoveredNode.rect.width,
              height: hoveredNode.rect.height,
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </AnimatePresence>
      <div className="z-10 relative">
        {data.map((node) => (
          <FileTreeNode
            key={node.path}
            node={node}
            onHover={handleHover}
            activePath={pathname}
            onSelect={(n) => {
              if (onSelect) onSelect(n);
              else router.push(n.path);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function FileTreeNode({
  node,
  onHover,
  onSelect,
  activePath,
}: {
  node: FileNode;
  onHover: (e: React.MouseEvent, id: string) => void;
  onSelect: (node: FileNode) => void;
  activePath: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const isFile = node.type === "file";
  const isActive = activePath === node.path || activePath.startsWith(node.path + "/");

  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          "flex items-center gap-3 px-3 py-1.5 cursor-pointer rounded-md transition-colors relative z-10",
          isActive ? "text-accent" : "hover:text-text",
          node.status === "locked" && "opacity-50 cursor-not-allowed"
        )}
        onMouseEnter={(e) => onHover(e, node.path)}
        onClick={() => {
          if (isFile && node.status !== "locked") {
            onSelect(node);
          } else if (!isFile) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
          {!isFile ? (
            isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          ) : node.icon ? (
            node.icon
          ) : (
            <FileCode className="w-4 h-4" />
          )}
        </span>
        <span className="flex-1 truncate">{node.name}</span>
        {node.status === "completed" && <CheckCircle className="w-3.5 h-3.5 text-c-string" />}
        {node.status === "locked" && <Lock className="w-3 h-3 text-muted" />}
      </div>
      {!isFile && (
        <AnimatePresence initial={false}>
          {isOpen && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden ml-[21px] pl-3 border-l border-white/10"
            >
              {node.children.map((child) => (
                <FileTreeNode
                  key={child.path}
                  node={child}
                  onHover={onHover}
                  onSelect={onSelect}
                  activePath={activePath}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
