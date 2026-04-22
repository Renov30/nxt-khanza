"use client";

import React from 'react';

interface DataTableProps {
  header: React.ReactNode;
  body: React.ReactNode;
}

export default function DataTable({ header, body }: DataTableProps) {
  return (
    <div className="flex-1 overflow-auto bg-slate-50/50 border-t border-slate-300 relative h-full">
      <table className="w-full text-left border-collapse text-[10px] whitespace-nowrap">
        <thead className="sticky top-0 z-10 text-slate-600 shadow-sm backdrop-blur-md bg-white/95 border-b-2 border-emerald-500">
          {header}
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>
    </div>
  );
}
