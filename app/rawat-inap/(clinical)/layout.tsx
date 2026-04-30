import React, { Suspense } from 'react';
import ClinicalSidebar from '@/components/ClinicalSidebar';

export default function ClinicalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-slate-50 text-slate-800 rounded-tl-xl shadow-inner border-t border-l border-white">
      <Suspense fallback={<div className="p-8 flex justify-center text-brand-500">Memuat data...</div>}>
        <ClinicalSidebar>
          {children}
        </ClinicalSidebar>
      </Suspense>
    </div>
  );
}
