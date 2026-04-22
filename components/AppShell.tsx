"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaKey, FaUserTie, FaInfoCircle, FaDesktop, FaBook,
  FaHome, FaIdCard, FaAmbulance, FaFlask, FaRadiation,
  FaPills, FaBed, FaWheelchair, FaSignInAlt, FaTimes,
  FaLaptopMedical, FaCubes, FaSync, FaCog, FaReact
} from 'react-icons/fa';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleClick = () => setContextMenu(prev => ({ ...prev, show: false }));
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const x = e.pageX + 220 > window.innerWidth ? window.innerWidth - 230 : e.pageX;
    const y = e.pageY + 200 > window.innerHeight ? window.innerHeight - 210 : e.pageY;
    setContextMenu({ show: true, x, y });
  };

  if (!mounted) return null;

  return (
    <div 
      className="flex flex-col h-screen w-full overflow-hidden bg-slate-50 font-sans"
      onContextMenu={handleContextMenu}
    >
      {/* Primary Top Bar (Dark Green Gradient) */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-800 text-white flex overflow-x-auto whitespace-nowrap px-2 py-1 shadow-md z-30 border-b border-emerald-500/50 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex items-center gap-1 w-max">
          <TopMenuItem icon={<FaKey className="text-yellow-400" />} label="Program" />
          <TopMenuItem icon={<FaUserTie className="text-sky-300" />} label="Presensi Pegawai" />
          <TopMenuItem icon={<FaInfoCircle className="text-orange-400" />} label="Informasi" />
          <TopMenuItem icon={<FaDesktop className="text-green-300" />} label="Anjungan & Antrian" />
          <TopMenuItem icon={<FaBook className="text-blue-200" />} label="Tentang Program" />
        </div>
      </motion.nav>

      {/* Secondary Toolbar (Light Glassmorphic Style) */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md border-b border-emerald-100 flex items-center px-4 py-2 shadow-sm z-20 gap-1 overflow-x-auto relative [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <Link href="/">
          <SecondaryMenuItem icon={<FaHome className="text-slate-500 group-hover:text-emerald-600 transition-colors" />} label="Menu" active={pathname === '/'} />
        </Link>
        <div className="w-px h-10 bg-emerald-100 mx-2 self-center"></div>
        <SecondaryMenuItem icon={<FaIdCard className="text-slate-500 group-hover:text-emerald-600 transition-colors" />} label="Registrasi" />
        <SecondaryMenuItem icon={<FaAmbulance className="text-slate-500 group-hover:text-red-500 transition-colors" />} label="IGD/UGD" />
        <SecondaryMenuItem icon={<FaFlask className="text-slate-500 group-hover:text-purple-500 transition-colors" />} label="Laborat" />
        <SecondaryMenuItem icon={<FaRadiation className="text-slate-500 group-hover:text-yellow-500 transition-colors" />} label="Radiologi" />
        <SecondaryMenuItem icon={<FaPills className="text-slate-500 group-hover:text-pink-500 transition-colors" />} label="Farmasi" />
        <Link href="/rawat-inap">
          <SecondaryMenuItem icon={<FaBed className="text-slate-500 group-hover:text-blue-500 transition-colors" />} label="Rawat Inap" active={pathname === '/rawat-inap'} />
        </Link>
        <SecondaryMenuItem icon={<FaWheelchair className="text-slate-500 group-hover:text-teal-500 transition-colors" />} label="Rawat Jalan" />

        <div className="flex-1 min-w-[20px]"></div>

        <SecondaryMenuItem icon={<FaSignInAlt className="text-slate-500 group-hover:text-emerald-600 transition-colors" />} label="Log In" />
        <SecondaryMenuItem icon={<FaTimes className="text-red-500 group-hover:text-red-600 transition-colors" />} label="Keluar" isRed />
      </motion.nav>

      {/* Main Content Area */}
      <main className="flex-1 relative w-full h-full overflow-hidden bg-emerald-50/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={pathname === '/rawat-inap' ? { opacity: 0, scale: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={pathname === '/' ? { opacity: 0, scale: 0 } : { opacity: 0, scale: 0.95 }}
            transition={pathname === '/rawat-inap' ? { type: "spring", stiffness: 200, damping: 20 } : { duration: 0.2 }}
            className="absolute inset-0 w-full h-full"
            style={{ transformOrigin: "52% 0%" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Status Bar */}
      <motion.footer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-emerald-50/90 backdrop-blur-md border-t border-emerald-200 text-xs font-semibold text-slate-600 flex items-center h-8 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] w-full overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="px-3 sm:px-5 py-1 border-r border-emerald-200/60 flex items-center min-w-max h-full">
          Status Admin :
        </div>
        <div className="px-3 sm:px-5 py-1 border-r border-emerald-200/60 flex items-center hover:bg-emerald-100 cursor-pointer transition-colors h-full min-w-max">
          Admin Utama
        </div>
        <div className="hidden sm:flex px-5 py-1 border-r border-emerald-200/60 items-center h-full text-slate-500 font-mono">
          22/04/2026
        </div>
        <div className="hidden sm:flex px-5 py-1 border-r border-emerald-200/60 items-center h-full text-slate-500 font-mono">
          192.168.2.230
        </div>
        <div className="px-3 sm:px-5 py-1 flex items-center min-w-max h-full text-[11px] flex-1">
          <span><span className="hidden sm:inline">Dikembangkan oleh </span><span className="inline sm:hidden">Dev: </span><span className="text-emerald-700 font-bold">Novgeny R. Ermiawan / Khanza.Soft Media</span></span>
        </div>
      </motion.footer>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 bg-white/95 backdrop-blur-xl border border-emerald-100 shadow-2xl rounded-xl py-2 min-w-[220px] flex flex-col text-sm font-medium overflow-hidden"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <div className="px-4 py-1.5 mb-1 border-b border-emerald-50/50 flex items-center gap-2 bg-emerald-50/30">
              <FaLaptopMedical className="text-emerald-600 text-lg" />
              <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest">Tindakan Cepat</span>
            </div>
            <ContextMenuItem icon={<FaReact className="text-sky-500" />} label="Tentang Aplikasi" />
            <ContextMenuItem icon={<FaCog className="text-slate-500" />} label="Pengaturan" />
            <div className="w-full h-px bg-slate-100 my-1"></div>
            <ContextMenuItem icon={<FaSync className="text-emerald-500" />} label="Muat Ulang (Refresh)" onClick={() => window.location.reload()} />
            <Link href="/login" className="w-full text-left">
              <ContextMenuItem icon={<FaSignInAlt className="text-blue-500" />} label="Buka Halaman Login" />
            </Link>
            <div className="w-full h-px bg-slate-100 my-1"></div>
            <ContextMenuItem icon={<FaTimes className="text-red-500" />} label="Tutup Menu" isRed />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Subcomponents

function TopMenuItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <motion.button
      whileHover={{ y: -1, backgroundColor: "rgba(255,255,255,0.15)" }}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:shadow-sm"
    >
      <span className="text-base drop-shadow-md">{icon}</span>
      <span className="drop-shadow-sm">{label}</span>
    </motion.button>
  );
}

function SecondaryMenuItem({ icon, label, isRed, active }: { icon: React.ReactNode, label: string, isRed?: boolean, active?: boolean }) {
  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.02, backgroundColor: isRed ? "rgba(254,226,226,0.5)" : "rgba(209,250,229,0.3)" }}
      whileTap={{ scale: 0.95 }}
      className={`group flex flex-col items-center justify-center gap-1 min-w-[76px] p-2 rounded-xl transition-all border ${active ? 'border-emerald-200 bg-emerald-50/60 shadow-sm' : 'border-transparent'} hover:border-emerald-100 hover:shadow-sm relative overflow-hidden`}
    >
      <span className={`text-2xl drop-shadow-sm z-10 ${active && !isRed ? 'text-emerald-600' : ''}`}>{icon}</span>
      <span className={`text-[11px] font-bold z-10 ${isRed ? 'text-red-600' : active ? 'text-emerald-700' : 'text-slate-600 group-hover:text-emerald-700'}`}>{label}</span>
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
    </motion.button>
  );
}

function ContextMenuItem({ icon, label, onClick, isRed }: { icon: React.ReactNode, label: string, onClick?: () => void, isRed?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${isRed ? 'hover:bg-red-50 hover:text-red-600' : 'hover:bg-emerald-50 hover:text-emerald-700'} text-slate-700`}
    >
      <span className="text-base w-5 text-center flex justify-center drop-shadow-sm">{icon}</span>
      <span className="font-semibold">{label}</span>
    </button>
  );
}
