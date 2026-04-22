"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  FaSearch, FaCheck, FaPrint, FaExchangeAlt, FaSignOutAlt,
  FaFolderOpen, FaTimes, FaBed
} from 'react-icons/fa';
import BottomActionPanel, { ActionButton } from '@/components/BottomActionPanel';

export default function RawatInap() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  /* Table data mock for UI */
  const mockData = [
    { no: "2026/02/25/000005", rm: "000051", nama: "ADI KAZAMA (41 Th)", alamat: ", CAMPURJO, BOJONEGOR...", pj: "-", hub: "DIRI SENDIRI", jenis: "UMUM", kamar: "KL.01 Kamar Kelas I", tarif: "500,000", tgl: "2026-02-25", jam: "20:40:40", wKeluar: "-", jKeluar: "-", lama: "0", dokter: "dr. Sri Rahma" },
    { no: "2026/03/11/000003", rm: "000003", nama: "HAFIZ HARIYADI (35 Th)", alamat: "-, SAMBONGWANG, TRANGK...", pj: "PAIJO", hub: "AYAH", jenis: "UMUM", kamar: "KL.03 Kamar Kelas III", tarif: "100,000", tgl: "2026-03-11", jam: "13:07:04", wKeluar: "-", jKeluar: "-", lama: "0", dokter: "dr. Hilyatul Nadia" }
  ];

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-slate-50 text-slate-800 rounded-tl-xl shadow-inner border-t border-l border-white">
      {/* Elegant Page Header */}
      <div className="bg-gradient-to-r from-emerald-100 to-slate-50 px-4 py-1 border-b border-emerald-100 flex items-center justify-between shadow-sm z-10">
        <h2 className="text-emerald-800 font-bold text-sm flex items-center gap-2 tracking-wide">
          <FaBed className="text-emerald-600" />
          Daftar Pasien Rawat Inap
        </h2>
      </div>

      {/* Top Filters - Improved UI */}
      <div className="flex items-center flex-wrap gap-4 p-3 bg-white border-b border-slate-200 text-xs shadow-sm z-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-600">No. Rawat</span>
          <div className="flex gap-1">
            <input type="text" placeholder="Tahun" className="border border-slate-200 rounded-md px-2 py-1.5 w-[80px] focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-all" />
            <input type="text" placeholder="No" className="border border-slate-200 rounded-md px-2 py-1.5 w-[80px] focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-all" />
            <input type="text" placeholder="Cari by No. Rawat..." className="border border-slate-200 rounded-md px-3 py-1.5 w-[200px] focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-all placeholder-slate-400" />
          </div>
        </div>
        <div className="w-px h-6 bg-slate-200 mx-1"></div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-600">Status Bayar</span>
          <select className="border border-slate-200 rounded-md px-3 py-1.5 w-[140px] focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs bg-slate-50 focus:bg-white cursor-pointer transition-all">
            <option>Semua</option>
            <option>Belum Bayar</option>
            <option>Sudah Bayar</option>
          </select>
        </div>
      </div>

      {/* Table Area - Modernized */}
      <div className="flex-1 overflow-auto bg-slate-50/50 relative">
        <table className="w-full text-left border-collapse text-[11px] whitespace-nowrap">
          <thead className="sticky top-0 z-10 text-slate-600 shadow-sm backdrop-blur-md bg-white/90">
            <tr className="border-b-2 border-emerald-500">
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors">No.Rawat</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors">Nomor RM</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors">Nama Pasien</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors">Alamat Pasien</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors">Penanggung Jawab</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors">Hubungan P.J.</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors text-center">Jenis Bayar</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors">Kamar</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors text-right">Tarif Kamar</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors text-center">Tgl.Masuk</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors text-center">Jam Masuk</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors text-center">Lama</th>
              <th className="py-2.5 px-3 font-bold hover:bg-slate-100 cursor-pointer transition-colors">Dokter P.J.</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <motion.tr
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                key={i}
                className={`border-b border-slate-100 cursor-pointer transition-all duration-200
                  ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'} 
                  hover:bg-emerald-50 hover:shadow-[inset_4px_0_0_0_#10b981]`}
              >
                <td className="py-2 px-3 text-slate-700 font-medium">{row.no}</td>
                <td className="py-2 px-3 text-emerald-600 font-semibold">{row.rm}</td>
                <td className="py-2 px-3 text-slate-800 font-bold">{row.nama}</td>
                <td className="py-2 px-3 text-slate-600 truncate max-w-[150px]" title={row.alamat}>{row.alamat}</td>
                <td className="py-2 px-3 text-slate-600">{row.pj}</td>
                <td className="py-2 px-3 text-slate-600">{row.hub}</td>
                <td className="py-2 px-3 text-center"><span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full text-[9px] font-bold">{row.jenis}</span></td>
                <td className="py-2 px-3 text-slate-700 font-medium">{row.kamar}</td>
                <td className="py-2 px-3 text-right text-slate-700">{row.tarif}</td>
                <td className="py-2 px-3 text-center text-slate-600">{row.tgl}</td>
                <td className="py-2 px-3 text-center text-slate-600">{row.jam}</td>
                <td className="py-2 px-3 text-center text-slate-600">{row.lama}</td>
                <td className="py-2 px-3 text-slate-700">{row.dokter}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions and Filters Panel */}
      <BottomActionPanel 
        recordCount={2}
        hideStandardButtons
        customButtons={
          <>
            <ActionButton icon={<FaFolderOpen className="text-emerald-600 drop-shadow-sm" />} label="Masuk" />
            <ActionButton icon={<FaSignOutAlt className="text-amber-600 drop-shadow-sm" />} label="Pulang" />
            <ActionButton icon={<FaExchangeAlt className="text-blue-600 drop-shadow-sm" />} label="Pindah" />
            <ActionButton icon={<FaPrint className="text-indigo-600 drop-shadow-sm" />} label="Cetak" />
          </>
        }
        extraFilters={
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer font-medium hover:text-emerald-700 text-slate-600 transition-colors px-2">
                <input type="radio" name="filter_tgl" className="accent-emerald-600 w-3.5 h-3.5" defaultChecked />
                Belum Pulang
              </label>
              <div className="w-px h-4 bg-slate-300"></div>
              <label className="flex items-center gap-2 cursor-pointer font-medium hover:text-emerald-700 text-slate-600 transition-colors px-2">
                <input type="radio" name="filter_tgl" className="accent-emerald-600 w-3.5 h-3.5" />
                Tgl. Masuk
              </label>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2 py-1 w-[200px] focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 shadow-sm overflow-hidden transition-all">
                <span className="text-slate-400 font-medium pr-2 border-r border-slate-200">Kamar</span>
                <input type="text" placeholder="Cari kamar..." className="w-full bg-transparent outline-none pl-2 text-slate-700 placeholder-slate-400" />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
