"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  FaBed, FaSave, FaFileAlt, FaTrash, FaEdit, FaPrint, FaListAlt, 
  FaSignOutAlt, FaSearch, FaHistory, FaSync, FaStethoscope, FaSyringe,
  FaNotesMedical, FaHeartbeat, FaPills, FaClipboardList, FaCheck
} from 'react-icons/fa';
import BottomActionPanel, { ActionButton } from '@/components/BottomActionPanel';

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

  const sidebarMenu = [
    { icon: <FaStethoscope />, label: 'Skrining TB' },
    { icon: <FaSyringe />, label: 'Bundle PPI' },
    { icon: <FaClipboardList />, label: 'Rekapan HAIs' },
    { icon: <FaHistory />, label: 'Riwayat Pasien' },
    { icon: <FaPills />, label: 'Input Resep' },
    { icon: <FaNotesMedical />, label: 'Copy Resep' },
    { icon: <FaHeartbeat />, label: 'Permintaan Stok Pasien' },
    { icon: <FaNotesMedical />, label: 'Permintaan Resep Pulang' },
    { icon: <FaNotesMedical />, label: 'Input Obat & BHP' },
    { icon: <FaNotesMedical />, label: 'Input Gas Medik (O2)' },
    { icon: <FaNotesMedical />, label: 'Data Obat & BHP' },
    { icon: <FaNotesMedical />, label: 'Berkas Digital' },
    { icon: <FaNotesMedical />, label: 'Permintaan Lab' },
    { icon: <FaNotesMedical />, label: 'Permintaan Rad' },
    { icon: <FaNotesMedical />, label: 'Konsultasi Medik' },
    { icon: <FaNotesMedical />, label: 'Jadwal Operasi' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full h-full overflow-hidden bg-slate-50 text-slate-800 rounded-tl-xl shadow-inner border-t border-l border-white"
    >
      {/* Page Header */}
      <div className="bg-gradient-to-r from-brand-100 to-slate-50 px-4 py-2 border-b border-brand-100 flex items-center justify-between shadow-sm z-10 shrink-0">
        <h2 className="text-brand-800 font-bold text-sm flex items-center gap-2 tracking-wide">
          <FaBed className="text-brand-600" />
          :: Daftar Pasien Rawat Inap :: / Pemeriksaan / Tindakan Rawat Inap ::
        </h2>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Menu */}
        <div className="w-56 bg-white border-r border-slate-200 flex flex-col overflow-hidden shrink-0">
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <input 
                type="text" 
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Cari menu..."
              />
              <FaSearch className="absolute left-2.5 top-2 text-slate-400 text-xs" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {sidebarMenu.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 px-3 py-2 hover:bg-brand-50 cursor-pointer text-xs text-slate-700 border-b border-slate-50 transition-colors"
              >
                <span className="text-brand-500">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Top Patient Info Bar */}
          <div className="bg-white border-b border-slate-200 p-3 shrink-0 flex flex-wrap gap-4 items-center text-xs">
            <div className="flex items-center gap-2">
              <label className="font-semibold text-slate-600">No.Rawat :</label>
              <input type="text" className="border border-slate-300 rounded px-2 py-1 w-40 bg-slate-50 focus:outline-none focus:border-brand-500" value={noRawatParam} readOnly />
            </div>
            <div className="flex items-center gap-2">
              <input type="text" className="border border-slate-300 rounded px-2 py-1 w-24 bg-slate-50 focus:outline-none focus:border-brand-500" defaultValue="617211" readOnly />
            </div>
            <div className="flex items-center gap-2">
              <input type="text" className="border border-slate-300 rounded px-2 py-1 w-64 bg-slate-50 focus:outline-none focus:border-brand-500" defaultValue="Tn. Sukarji" readOnly />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <label className="font-semibold text-slate-600">Tanggal :</label>
              <input type="date" className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-brand-500" defaultValue="2026-04-30" />
              <input type="text" className="border border-slate-300 rounded px-2 py-1 w-12 text-center focus:outline-none focus:border-brand-500" defaultValue="09" />
              <input type="text" className="border border-slate-300 rounded px-2 py-1 w-12 text-center focus:outline-none focus:border-brand-500" defaultValue="26" />
              <input type="text" className="border border-slate-300 rounded px-2 py-1 w-12 text-center focus:outline-none focus:border-brand-500" defaultValue="25" />
              <input type="checkbox" className="accent-brand-500 w-4 h-4 cursor-pointer" defaultChecked />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-100 border-b border-slate-200 px-2 pt-2 shrink-0 overflow-x-auto custom-scrollbar">
            {['Penanganan Dokter', 'Penanganan Petugas', 'Penanganan Dokter & Petugas', 'Pemeriksaan / CPPT', 'Pemeriksaan Obstetri', 'Pemeriksaan Ginekologi'].map((tab) => {
              const tabId = tab.toLowerCase().replace(/[^a-z0-9]/g, '');
              const isActive = activeTab === (tab === 'Pemeriksaan / CPPT' ? 'cppt' : tabId);
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab === 'Pemeriksaan / CPPT' ? 'cppt' : tabId)}
                  className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap border border-b-0 ${
                    isActive 
                      ? 'bg-white text-brand-700 border-slate-200' 
                      : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto bg-white p-4 relative">
            {activeTab === 'cppt' && (
              <div className="flex flex-col h-full gap-4">
                <div className="flex gap-6 h-full">
                  {/* Left Column Form */}
                  <div className="flex-1 flex flex-col gap-3 min-w-[300px]">
                    <div className="flex items-center gap-2">
                      <label className="w-24 text-right text-xs font-semibold text-slate-600">Dilakukan :</label>
                      <input type="text" className="border border-slate-300 rounded px-2 py-1 w-24 bg-slate-50 focus:outline-none focus:border-brand-500 text-xs" defaultValue="renov" />
                      <input type="text" className="border border-slate-300 rounded px-2 py-1 flex-1 bg-slate-50 focus:outline-none focus:border-brand-500 text-xs" defaultValue="Novgeny Ramadhalero Ermawan" />
                      <button className="p-1.5 text-brand-500 hover:bg-brand-50 rounded"><FaEdit /></button>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-24 text-right text-xs font-semibold text-slate-600">Profesi / Jabatan / Departemen :</label>
                      <input type="text" className="border border-slate-300 rounded px-2 py-1 flex-1 bg-slate-50 focus:outline-none focus:border-brand-500 text-xs" defaultValue="Administrasi IT" />
                      <button className="p-1.5 text-brand-500 hover:bg-brand-50 rounded"><FaEdit /></button>
                    </div>

                    <div className="flex items-start gap-2">
                      <label className="w-24 text-right text-xs font-semibold text-slate-600 mt-1">Subjek :</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-20 resize-none focus:outline-none focus:border-brand-500 text-xs"></textarea>
                    </div>

                    <div className="flex items-start gap-2">
                      <label className="w-24 text-right text-xs font-semibold text-slate-600 mt-1">Objek :</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-20 resize-none focus:outline-none focus:border-brand-500 text-xs"></textarea>
                    </div>

                    {/* Vitals Grid */}
                    <div className="grid grid-cols-3 gap-2 pl-26 ml-26">
                      <div className="flex items-center gap-2 justify-end">
                        <label className="text-xs font-semibold text-slate-600">Suhu (C) :</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1 w-16 focus:outline-none focus:border-brand-500 text-xs" />
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <label className="text-xs font-semibold text-slate-600">Tensi (mmHg) :</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1 w-16 focus:outline-none focus:border-brand-500 text-xs" />
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <label className="text-xs font-semibold text-slate-600">Berat (Kg) :</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1 w-16 focus:outline-none focus:border-brand-500 text-xs" />
                      </div>

                      <div className="flex items-center gap-2 justify-end">
                        <label className="text-xs font-semibold text-slate-600">TB (Cm) :</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1 w-16 focus:outline-none focus:border-brand-500 text-xs" />
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <label className="text-xs font-semibold text-slate-600">RR (/menit) :</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1 w-16 focus:outline-none focus:border-brand-500 text-xs" />
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <label className="text-xs font-semibold text-slate-600">Nadi (/menit) :</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1 w-16 focus:outline-none focus:border-brand-500 text-xs" />
                      </div>

                      <div className="flex items-center gap-2 justify-end">
                        <label className="text-xs font-semibold text-slate-600">SpO2 (%) :</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1 w-16 focus:outline-none focus:border-brand-500 text-xs" />
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <label className="text-xs font-semibold text-slate-600">GCS (E,V,M) :</label>
                        <input type="text" className="border border-slate-300 rounded px-2 py-1 w-16 focus:outline-none focus:border-brand-500 text-xs" />
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <label className="text-xs font-semibold text-slate-600">Kesadaran :</label>
                        <select className="border border-slate-300 rounded px-1 py-1 w-24 focus:outline-none focus:border-brand-500 text-xs bg-white">
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

                  {/* Right Column Form */}
                  <div className="flex-1 flex flex-col gap-3 min-w-[300px]">
                    <div className="flex items-start gap-2">
                      <label className="w-20 text-right text-xs font-semibold text-slate-600 mt-1">Alergi :</label>
                      <input type="text" className="border border-slate-300 rounded px-2 py-1 flex-1 focus:outline-none focus:border-brand-500 text-xs" />
                    </div>

                    <div className="flex items-start gap-2">
                      <label className="w-20 text-right text-xs font-semibold text-slate-600 mt-1">Asesmen :</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-16 resize-none focus:outline-none focus:border-brand-500 text-xs"></textarea>
                    </div>

                    <div className="flex items-start gap-2">
                      <label className="w-20 text-right text-xs font-semibold text-slate-600 mt-1">Plan :</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-16 resize-none focus:outline-none focus:border-brand-500 text-xs"></textarea>
                    </div>

                    <div className="flex items-start gap-2">
                      <label className="w-20 text-right text-xs font-semibold text-slate-600 mt-1">Instruksi :</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-16 resize-none focus:outline-none focus:border-brand-500 text-xs"></textarea>
                    </div>

                    <div className="flex items-start gap-2">
                      <label className="w-20 text-right text-xs font-semibold text-slate-600 mt-1">Evaluasi :</label>
                      <textarea className="border border-slate-300 rounded p-2 flex-1 h-16 resize-none focus:outline-none focus:border-brand-500 text-xs"></textarea>
                    </div>
                  </div>

                  {/* Actions Right Side */}
                  <div className="w-40 flex flex-col gap-3 shrink-0">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shadow-sm text-xs font-semibold text-slate-700 w-full">
                      <FaHistory className="text-blue-500" /> Riwayat Pasien
                    </button>
                    <button className="flex items-center justify-between px-3 py-2 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shadow-sm text-xs font-semibold text-slate-700 w-full">
                      <span className="flex items-center gap-2"><FaFileAlt className="text-red-400" /> Resume Pasien</span>
                      <div className="w-2 h-2 rounded bg-green-500"></div>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shadow-sm text-xs font-semibold text-slate-700 w-full">
                      <FaSync className="text-brand-500" /> Muat Ulang
                    </button>
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

          {/* Table Search / Filter Bar */}
          <div className="bg-slate-100 border-t border-slate-300 p-2 shrink-0 flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <label className="text-slate-600">Tgl.Rawat :</label>
              <input type="date" className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-brand-500" defaultValue="2026-04-30" />
              <label className="text-slate-600">s.d.</label>
              <input type="date" className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-brand-500" defaultValue="2026-04-30" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-slate-600">No.RM :</label>
              <input type="text" className="border border-slate-300 rounded px-2 py-1 w-24 focus:outline-none focus:border-brand-500" />
              <button className="p-1 text-brand-500 hover:bg-brand-50 rounded"><FaSearch /></button>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <label className="text-slate-600">Key Word :</label>
              <input type="text" className="border border-slate-300 rounded px-2 py-1 flex-1 max-w-[200px] focus:outline-none focus:border-brand-500" defaultValue={noRawatParam} />
              <button className="p-1 text-green-500 hover:bg-green-50 rounded"><FaCheck /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bottom Actions */}
      <BottomActionPanel
        recordCount={0}
        hideStandardButtons
        customButtons={
          <>
            <ActionButton icon={<FaSave className="text-brand-600 drop-shadow-sm" />} label="Simpan" />
            <ActionButton icon={<FaFileAlt className="text-emerald-600 drop-shadow-sm" />} label="Baru" />
            <ActionButton icon={<FaTrash className="text-red-600 drop-shadow-sm" />} label="Hapus" />
            <ActionButton icon={<FaEdit className="text-orange-500 drop-shadow-sm" />} label="Ganti" />
            <ActionButton icon={<FaPrint className="text-indigo-600 drop-shadow-sm" />} label="Cetak" />
            <ActionButton icon={<FaSearch className="text-blue-600 drop-shadow-sm" />} label="Semua" />
            <div className="w-px h-6 bg-slate-300 mx-1"></div>
            <ActionButton icon={<FaListAlt className="text-rose-600 drop-shadow-sm" />} label="Log" />
            <ActionButton 
              icon={<FaSignOutAlt className="text-red-600 drop-shadow-sm" />} 
              label="Keluar" 
              onClick={() => router.push('/rawat-inap')}
            />
          </>
        }
      />
    </motion.div>
  );
}

export default function PemeriksaanRawatInap() {
  return (
    <Suspense fallback={<div className="p-8 flex justify-center text-brand-500">Memuat data...</div>}>
      <PemeriksaanContent />
    </Suspense>
  );
}
