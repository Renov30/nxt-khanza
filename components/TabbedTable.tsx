"use client";

import React, { useState } from 'react';
import DataTable from './DataTable';

export interface TabData {
  id: string;
  label: string;
  header: React.ReactNode;
  body: React.ReactNode;
}

interface TabbedTableProps {
  tabs: TabData[];
  defaultTabId?: string;
  onTabChange?: (tabId: string) => void;
  hideTabBar?: boolean;
}

export default function TabbedTable({ tabs, defaultTabId, onTabChange, hideTabBar = false }: TabbedTableProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || (tabs.length > 0 ? tabs[0].id : ''));

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    if (onTabChange) onTabChange(id);
  };

  const activeTabData = tabs.find(t => t.id === activeTab) || tabs[0];

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Tabs Menu */}
      {!hideTabBar && (
        <div className="flex gap-1 px-4 mt-2 mb-0 shrink-0">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-1.5 text-xs transition-colors ${
                activeTab === tab.id 
                  ? "font-bold border border-b-0 border-slate-300 rounded-t-lg bg-white text-brand-700 pb-2 z-10 -mb-[1px]" 
                  : "font-semibold border-b border-transparent text-slate-500 hover:text-brand-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Table Content */}
      <DataTable 
        header={activeTabData?.header} 
        body={activeTabData?.body} 
      />
    </div>
  );
}
