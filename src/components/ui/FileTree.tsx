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
            className="absolute rounded-md bg-border pointer-events-none z-0"
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
        {data.map((node, index) => (
          <FileTreeNode
            key={node.path}
            node={node}
            onHover={handleHover}
            activePath={pathname}
            isRoot={true}
            isLast={index === data.length - 1}
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
  isRoot,
  isLast,
  isOpenProp,
  onToggle
}: {
  node: FileNode;
  onHover: (e: React.MouseEvent, id: string) => void;
  onSelect: (node: FileNode) => void;
  activePath: string;
  isRoot?: boolean;
  isLast?: boolean;
  isOpenProp?: boolean;
  onToggle?: () => void;
}) {
  const isFile = node.type === "file";
  const isActive = activePath === node.path || activePath.startsWith(node.path + "/");
  const [internalIsOpen, setInternalIsOpen] = useState(node.path === "/root" || isActive);
  const isOpen = isOpenProp !== undefined ? isOpenProp : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) onToggle();
    else setInternalIsOpen(!internalIsOpen);
  };

  const [openChildPath, setOpenChildPath] = useState<string | null>(() => {
    if (!node.children) return null;
    const activeChild = node.children.find(c => activePath === c.path || activePath.startsWith(c.path + "/"));
    return activeChild ? activeChild.path : null;
  });

  const handleChildToggle = (childPath: string) => {
    setOpenChildPath(prev => prev === childPath ? null : childPath);
  };

  return (
    <div className="flex flex-col relative">
      {/* Tree Lines */}
      {!isRoot && (
        <>
          <div 
            className={clsx(
              "absolute -left-3 w-px bg-border pointer-events-none",
              isLast ? "top-0 h-[18px]" : "top-0 bottom-0"
            )} 
          />
          <div className="absolute -left-3 top-[18px] w-3 h-px bg-border pointer-events-none" />
        </>
      )}

      <div
        className={clsx(
          "flex items-center gap-3 px-3 py-1.5 cursor-pointer rounded-md transition-colors relative z-10",
          isActive ? "text-accent" : (node.status === "locked" ? "hover:text-black" : "hover:text-text"),
          node.status === "locked" && "text-c-danger line-through opacity-80 cursor-not-allowed"
        )}
        onMouseEnter={(e) => onHover(e, node.path)}
        onClick={() => {
          if (!isFile) {
            handleToggle();
            onSelect(node);
          } else if (node.status !== "locked") {
            onSelect(node);
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
              className="overflow-hidden ml-[21px] pl-3 relative"
            >
              {node.children.map((child, index) => (
                <FileTreeNode
                  key={child.path}
                  node={child}
                  onHover={onHover}
                  onSelect={onSelect}
                  activePath={activePath}
                  isRoot={false}
                  isLast={index === node.children!.length - 1}
                  isOpenProp={!isFile && child.type !== "file" ? openChildPath === child.path : undefined}
                  onToggle={!isFile && child.type !== "file" ? () => handleChildToggle(child.path) : undefined}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
