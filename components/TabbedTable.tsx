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
        <div className="flex gap-1 px-4 mt-2 mb-0 shrink-0 border-b border-slate-200">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 text-xs transition-all relative whitespace-nowrap ${
                activeTab === tab.id 
                  ? "font-bold text-brand-700" 
                  : "font-semibold text-slate-500 hover:text-brand-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full" />
              )}
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
