"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  FaSave, FaFileAlt, FaEdit, FaTrash, FaPrint, FaList, FaTimes, FaSearch, FaCheck
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BottomActionPanelProps {
  onSave?: () => void;
  onNew?: () => void;
  onReplace?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  onAll?: () => void;
  onExit?: () => void;
  recordCount?: number;
  extraFilters?: React.ReactNode;
  customButtons?: React.ReactNode;
  hideStandardButtons?: boolean;
}

export default function BottomActionPanel({
  onSave, onNew, onReplace, onDelete, onPrint, onAll, onExit, recordCount = 0, extraFilters, customButtons, hideStandardButtons = false
}: BottomActionPanelProps) {
  const router = useRouter();

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="bg-white px-4 py-3 border-t border-slate-200 text-xs shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-20 shrink-0 flex flex-col gap-3">
      {extraFilters && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-2 border-b border-brand-50 pb-2 mb-1">
          {extraFilters}
        </div>
      )}
      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-600 ml-1">Periode :</span>
          <div className="flex items-center gap-1.5">
            <input type="date" className="border border-slate-200 rounded text-slate-600 px-2 py-1 focus:outline-brand-500 focus:ring-1 focus:ring-brand-500 bg-white shadow-sm" />
            <span className="text-slate-400 font-bold">s.d.</span>
            <input type="date" className="border border-slate-200 rounded text-slate-600 px-2 py-1 focus:outline-brand-500 focus:ring-1 focus:ring-brand-500 bg-white shadow-sm" />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:mr-2">
          <span className="font-semibold text-slate-600">Key Word :</span>
          <div className="flex bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden focus-within:ring-1 focus-within:ring-brand-500 w-[250px]">
            <input type="text" className="w-full bg-transparent outline-none px-2 py-1 text-slate-700" />
            <div className="flex border-l border-slate-200">
              <button className="px-2 text-brand-500 hover:bg-brand-50 transition-colors"><FaCheck className="text-[10px]" /></button>
              <button className="px-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors border-l border-slate-100"><FaSearch className="text-[10px]" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Row */}
      <div className="flex items-center justify-between flex-wrap gap-y-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {customButtons}
          {!hideStandardButtons && (
            <>
              <ActionButton onClick={onSave} icon={<FaSave className="text-brand-600 drop-shadow-sm" />} label="Simpan" />
              <ActionButton onClick={onNew} icon={<FaFileAlt className="text-red-600 drop-shadow-sm" />} label="Baru" />
              <ActionButton onClick={onReplace} icon={<FaEdit className="text-orange-500 drop-shadow-sm" />} label="Ganti" />
              <ActionButton onClick={onDelete} icon={<FaTrash className="text-orange-600 drop-shadow-sm" />} label="Hapus" />
              <ActionButton onClick={onPrint} icon={<FaPrint className="text-indigo-600 drop-shadow-sm" />} label="Cetak" />
              <ActionButton onClick={onAll} icon={<FaList className="text-slate-600 drop-shadow-sm" />} label="Semua" />
            </>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center px-3 py-1.5 text-slate-500 font-semibold text-[11px] mx-1">
            Record : <span className="text-slate-800 ml-1.5">{recordCount}</span>
          </div>

          <ActionButton 
            icon={<FaTimes className="text-red-500 drop-shadow-sm" />} 
            label="Keluar" 
            isExit 
            onClick={handleExit}
          />
        </div>
      </div>
    </div>
  );
}

// Exportable Button Component
export function ActionButton({ icon, label, isExit, className = "", onClick }: { icon: React.ReactNode, label: string, isExit?: boolean, className?: string, onClick?: () => void }) {
  return (
    <Button 
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn(
        "bg-white h-7.5 font-bold text-[11px] transition-all active:scale-95",
        isExit 
          ? "border-red-200 hover:border-red-400 hover:bg-red-50 text-red-700" 
          : "border-slate-200 hover:border-brand-400 hover:bg-brand-50 text-slate-700",
        className
      )}
    >
      <span className="text-sm">{icon}</span>
      <span>{label}</span>
    </Button>
  );
}

