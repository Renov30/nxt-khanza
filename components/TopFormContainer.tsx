"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface TopFormContainerProps {
  title?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function TopFormContainer({
  title = "Input Data",
  defaultOpen = true,
  children
}: TopFormContainerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm z-0 shrink-0 flex flex-col">
      {/* Toggle Button / Header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition-colors w-full border-b border-slate-100/50"
      >
        <div className="w-4 h-4 rounded bg-emerald-100 flex items-center justify-center text-[10px] text-emerald-600 border border-emerald-200 shadow-sm">
          {isOpen ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        <span className="tracking-wide">:: {title}</span>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
