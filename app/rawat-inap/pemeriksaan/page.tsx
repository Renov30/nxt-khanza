"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  FaBed, FaSave, FaFileAlt, FaTrash, FaEdit, FaPrint, FaListAlt,
  FaSignOutAlt, FaSearch, FaHistory, FaSync, FaStethoscope, FaSyringe,
  FaNotesMedical, FaHeartbeat, FaPills, FaClipboardList, FaCheck, FaBars, FaUtensils
} from 'react-icons/fa';
import BottomActionPanel, { ActionButton } from '@/components/BottomActionPanel';
import ClinicalSidebar from '@/components/ClinicalSidebar';

function PemeriksaanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const noRawatParam = searchParams.get('noRawat') || '';

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('cppt');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-slate-50 text-slate-800 rounded-tl-xl shadow-inner border-t border-l border-white">
      <ClinicalSidebar noRawat={noRawatParam} noRM="617211" namaPasien="Tn.+Sukarji">
        {/* Page Header - now inside content area, beside sidebar */}
        <div className="bg-gradient-to-r from-brand-100 to-slate-50 px-4 py-1 border-b border-brand-100 flex items-center justify-between shadow-sm z-10 shrink-0">
          <h2 className="text-brand-800 font-bold text-sm flex items-center gap-2 tracking-wide">
            <FaBed className="text-brand-600" />
            <span className="truncate">Pemeriksaan / Tindakan Rawat Inap</span>
          </h2>
        </div>

          {/* Top Patient Info Bar */}
          <div className="bg-white border-b border-slate-200 p-3 shrink-0 flex flex-wrap gap-4 items-center text-xs">
            <div className="flex items-center gap-1 w-full sm:w-auto">
              <label className="font-semibold text-slate-600 min-w-[80px] sm:min-w-0">Pasien :</label>
              <input type="text" className="border border-slate-300 rounded px-2 py-1 flex-1 sm:w-35 bg-slate-50 focus:outline-none focus:border-brand-500" value={noRawatParam} readOnly />
            </div>
            <div className="flex items-center gap-1 w-full sm:w-auto">
              <input type="text" className="border border-slate-300 rounded px-2 py-1 flex-1 sm:w-15 bg-slate-50 focus:outline-none focus:border-brand-500" defaultValue="617211" readOnly />
            </div>
            <div className="flex items-center gap-1 w-full md:w-auto">
              <input type="text" className="border border-slate-300 rounded px-2 py-1 flex-1 md:w-50 bg-slate-50 focus:outline-none focus:border-brand-500" defaultValue="Tn. Sukarji" readOnly />
            </div>
            <div className="flex flex-wrap items-center gap-1 sm:ml-auto w-full sm:w-auto">
              <label className="font-semibold text-slate-600">Tanggal :</label>
              <input type="date" className="border border-slate-300 rounded px-2 py-1 mr-2 focus:outline-none focus:border-brand-500" defaultValue="2026-04-30" />
              <input type="time" step="1" className="border border-slate-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-brand-500 bg-white" defaultValue="09:26:25" />
              <input type="checkbox" className="accent-brand-500 w-4 h-4 cursor-pointer ml-2" defaultChecked />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-white border-b border-slate-200 px-3 shrink-0 overflow-x-auto custom-scrollbar">
            {['Penanganan Dokter', 'Penanganan Petugas', 'Penanganan Dokter & Petugas', 'Pemeriksaan / CPPT', 'Pemeriksaan Obstetri', 'Pemeriksaan Ginekologi'].map((tab) => {
              const tabId = tab.toLowerCase().replace(/[^a-z0-9]/g, '');
              const isActive = activeTab === (tab === 'Pemeriksaan / CPPT' ? 'cppt' : tabId);
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab === 'Pemeriksaan / CPPT' ? 'cppt' : tabId)}
                  className={`px-4 py-2.5 text-xs font-semibold transition-all whitespace-nowrap relative ${isActive
                    ? 'text-brand-700 font-bold'
                    : 'text-slate-500 hover:text-brand-600'
                    }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto bg-white p-4 relative">
            {activeTab === 'cppt' && (
              <div className="flex flex-col h-full gap-4">
                {/* Main Form Area */}
                <div className="flex flex-col gap-5">

                  {/* Petugas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-lg border border-slate-200">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600">Dilakukan Oleh</label>
                      <div className="flex gap-1">
                        <input type="text" className="border border-slate-300 rounded px-2 py-1.5 w-20 focus:outline-none focus:border-brand-500 text-xs bg-white" defaultValue="renov" />
                        <input type="text" className="border border-slate-300 rounded px-2 py-1.5 flex-1 focus:outline-none focus:border-brand-500 text-xs bg-white" defaultValue="Novgeny Ramadhalero Ermawan" />
                        <button className="px-2 text-brand-500 hover:bg-brand-50 rounded border border-transparent hover:border-brand-200 transition-colors"><FaEdit /></button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600">Jabatan / Departemen</label>
                      <div className="flex gap-1">
                        <input type="text" className="border border-slate-300 rounded px-2 py-1.5 flex-1 focus:outline-none focus:border-brand-500 text-xs bg-white" defaultValue="Administrasi IT" />
                        <button className="px-2 text-brand-500 hover:bg-brand-50 rounded border border-transparent hover:border-brand-200 transition-colors"><FaEdit /></button>
                      </div>
                    </div>
                  </div>

                  {/* SOAP, Instruksi & Alergi */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600">Subjek (S)</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-20 resize-none focus:outline-none focus:border-brand-500 text-xs" placeholder="Keluhan pasien..."></textarea>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600">Objek (O)</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-20 resize-none focus:outline-none focus:border-brand-500 text-xs" placeholder="Hasil pemeriksaan..."></textarea>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600">Alergi</label>
                      <input type="text" className="border border-slate-300 rounded px-2 py-1.5 flex-1 focus:outline-none focus:border-brand-500 text-xs" placeholder="Tidak ada alergi..." />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600">Asesmen (A)</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-20 resize-none focus:outline-none focus:border-brand-500 text-xs" placeholder="Diagnosis/Asesmen..."></textarea>
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-600">Plan (P)</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-20 resize-none focus:outline-none focus:border-brand-500 text-xs" placeholder="Rencana tindakan..."></textarea>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600">Instruksi</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-20 resize-none focus:outline-none focus:border-brand-500 text-xs" placeholder="Instruksi medis..."></textarea>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600">Evaluasi</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-20 resize-none focus:outline-none focus:border-brand-500 text-xs" placeholder="Evaluasi tindakan..."></textarea>
                    </div>
                  </div>

                  {/* Tanda-Tanda Vital */}
                  <div className="bg-brand-50/40 p-4 rounded-lg border border-brand-100/50">
                    <h3 className="text-[13px] font-bold text-brand-700 mb-3 flex items-center gap-2 border-b border-brand-100 pb-2">
                      Tanda-Tanda Vital (TTV)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-slate-600">Suhu (°C)</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-brand-500 text-xs bg-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-slate-600">Tensi (mmHg)</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-brand-500 text-xs bg-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-slate-600">Berat (Kg)</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-brand-500 text-xs bg-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-slate-600">Tinggi (Cm)</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-brand-500 text-xs bg-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-slate-600">Respirasi (/mnt)</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-brand-500 text-xs bg-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-slate-600">Nadi (/mnt)</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-brand-500 text-xs bg-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-slate-600">SpO2 (%)</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-brand-500 text-xs bg-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-slate-600">GCS (E,V,M)</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-brand-500 text-xs bg-white" />
                      </div>
                      <div className="flex flex-col gap-1 sm:col-span-2 md:col-span-2">
                        <label className="text-[11px] font-semibold text-slate-600">Kesadaran</label>
                        <select className="border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-brand-500 text-xs bg-white">
                          <option>-</option>
                          <option>Compos Mentis</option>
                          <option>Apatis</option>
                          <option>Somnolent</option>
                          <option>Sopor</option>
                          <option>Coma</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table at Bottom of Content */}
                <div className="flex-1 min-h-[200px] border border-slate-300 rounded overflow-auto mt-4">
                  <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                    <thead className="sticky top-0 bg-slate-100 border-b border-slate-300 z-10 shadow-sm text-slate-600">
                      <tr>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold w-8">P</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">No.Rawat</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">No.R.M.</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">Nama Pasien</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">Tgl.Rawat</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">Jam</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">Suhu(C)</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">Tensi</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">Nadi(/mnt)</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">Respirasi(/mnt)</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">Tinggi(Cm)</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">Berat(Kg)</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">SpO2(%)</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">GCS(E,V,M)</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">Kesadaran</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold min-w-[150px]">Subjek</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold min-w-[150px]">Objek</th>
                        <th className="py-2 px-3 border-r border-slate-300 font-semibold">Alergi</th>
                        <th className="py-2 px-3 font-semibold min-w-[150px]">Asesmen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Empty state for now */}
                      <tr>
                        <td colSpan={19} className="py-8 text-center text-slate-400 italic">Belum ada data pemeriksaan...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {activeTab !== 'cppt' && (
              <div className="flex items-center justify-center h-full text-slate-400">
                Menu {activeTab.toUpperCase()} belum tersedia (Demo)
              </div>
            )}
          </div>
      </ClinicalSidebar>

      {/* Main Bottom Actions */}
      <BottomActionPanel
        recordCount={0}
        onExit={() => router.push('/rawat-inap')}
      />
    </div>
  );
}

export default function PemeriksaanRawatInap() {
  return (
    <Suspense fallback={<div className="p-8 flex justify-center text-brand-500">Memuat data...</div>}>
      <PemeriksaanContent />
    </Suspense>
  );
}
