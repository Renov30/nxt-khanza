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
  defaultOpen = false,
  children
}: TopFormContainerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white shadow-sm z-0 shrink-0 flex flex-col">
      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-slate-200"
          >
            <div className="p-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button / Header now placed at the bottom */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-4 py-1 text-xs font-bold text-brand-800 hover:bg-brand-50 transition-colors bg-gradient-to-r from-brand-50 to-white self-start w-full border-b border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
      >
        <div className="w-4 h-4 rounded bg-brand-100 flex items-center justify-center text-[10px] text-brand-700 border border-brand-200 shadow-sm">
          {isOpen ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        <span className="tracking-wide">{title}</span>
      </button>
    </div>
  );
}
