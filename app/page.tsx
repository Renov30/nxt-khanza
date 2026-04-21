"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaKey, FaUserTie, FaInfoCircle, FaDesktop, FaBook,
  FaHome, FaIdCard, FaAmbulance, FaFlask, FaRadiation,
  FaPills, FaBed, FaWheelchair, FaSignInAlt, FaTimes,
  FaLaptopMedical, FaCubes
} from 'react-icons/fa';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-slate-50 font-sans">

      {/* Primary Top Bar (Dark Green Gradient) */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-800 text-white flex items-center justify-between px-2 py-1 shadow-md z-30 border-b border-emerald-500/50"
      >
        <div className="flex flex-wrap items-center gap-1">
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
        className="bg-white/80 backdrop-blur-md border-b border-emerald-100 flex items-center px-4 py-2 shadow-sm z-20 gap-1 overflow-x-auto relative"
      >
        <SecondaryMenuItem icon={<FaHome className="text-slate-500 group-hover:text-emerald-600 transition-colors" />} label="Menu" />
        <div className="w-px h-10 bg-emerald-100 mx-2 self-center"></div>
        <SecondaryMenuItem icon={<FaIdCard className="text-slate-500 group-hover:text-emerald-600 transition-colors" />} label="Registrasi" />
        <SecondaryMenuItem icon={<FaAmbulance className="text-slate-500 group-hover:text-red-500 transition-colors" />} label="IGD/UGD" />
        <SecondaryMenuItem icon={<FaFlask className="text-slate-500 group-hover:text-purple-500 transition-colors" />} label="Laborat" />
        <SecondaryMenuItem icon={<FaRadiation className="text-slate-500 group-hover:text-yellow-500 transition-colors" />} label="Radiologi" />
        <SecondaryMenuItem icon={<FaPills className="text-slate-500 group-hover:text-pink-500 transition-colors" />} label="Farmasi" />
        <SecondaryMenuItem icon={<FaBed className="text-slate-500 group-hover:text-blue-500 transition-colors" />} label="Rawat Inap" />
        <SecondaryMenuItem icon={<FaWheelchair className="text-slate-500 group-hover:text-teal-500 transition-colors" />} label="Rawat Jalan" />

        <div className="flex-1 min-w-[20px]"></div>

        <SecondaryMenuItem icon={<FaSignInAlt className="text-slate-500 group-hover:text-emerald-600 transition-colors" />} label="Log In" />
        <SecondaryMenuItem icon={<FaTimes className="text-red-500 group-hover:text-red-600 transition-colors" />} label="Keluar" isRed />
      </motion.nav>

      {/* Main Content Area */}
      <main className="flex-1 relative w-full h-full overflow-hidden bg-emerald-50/30">
        {/* Background Image with slight animation */}
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url('/img/background.png')" }}
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent z-0"></div>

        {/* Bottom Left Logo Area */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          className="absolute bottom-8 left-8 z-10 flex items-center gap-5"
        >
          {/* Logo 3D effect */}
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="w-20 h-20 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center p-3 shadow-2xl border border-white/50 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <FaLaptopMedical className="text-6xl text-sky-600 drop-shadow-md z-10" />
            <div className="absolute bottom-1 right-1">
              <FaCubes className="text-xl text-emerald-500 opacity-80" />
            </div>
          </motion.div>

          <div className="flex flex-col drop-shadow-lg bg-white/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40">
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight italic flex items-center gap-2">
              <span className="text-emerald-700">RS</span> SIMRS KHANZA
            </h1>
            <p className="text-sm font-semibold text-slate-600 mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              GUWOSARI, Pajangan, Bantul
            </p>
          </div>
        </motion.div>
      </main>

      {/* Bottom Status Bar */}
      <motion.footer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-emerald-50/90 backdrop-blur-md border-t border-emerald-200 text-xs font-semibold text-slate-600 flex items-center h-8 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]"
      >
        <div className="px-5 py-1 border-r border-emerald-200/60 flex items-center min-w-[120px] h-full">
          Status Admin :
        </div>
        <div className="px-5 py-1 border-r border-emerald-200/60 flex items-center hover:bg-emerald-100 cursor-pointer transition-colors h-full">
          Log Out
        </div>
        <div className="px-5 py-1 border-r border-emerald-200/60 flex items-center h-full text-slate-500 font-mono">
          21/04/2026
        </div>
        <div className="px-5 py-1 border-r border-emerald-200/60 flex items-center h-full text-slate-500 font-mono">
          192.168.2.230
        </div>
        <div className="px-5 py-1 flex items-center flex-1 h-full text-[11px] justify-end sm:justify-start">
          <span><span className="hidden sm:inline">Dikembangkan oleh </span><span className="text-emerald-700 font-bold">Novgeny R. Ermiawan</span></span>
        </div>
      </motion.footer>

    </div>
  );
}

// Components

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

function SecondaryMenuItem({ icon, label, isRed }: { icon: React.ReactNode, label: string, isRed?: boolean }) {
  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.02, backgroundColor: isRed ? "rgba(254,226,226,0.5)" : "rgba(209,250,229,0.3)" }}
      whileTap={{ scale: 0.95 }}
      className="group flex flex-col items-center justify-center gap-1 min-w-[76px] p-2 rounded-xl transition-all border border-transparent hover:border-emerald-100 hover:shadow-sm bg-transparent relative overflow-hidden"
    >
      <span className="text-2xl drop-shadow-sm z-10">{icon}</span>
      <span className={`text-[11px] font-bold z-10 ${isRed ? 'text-red-600' : 'text-slate-600 group-hover:text-emerald-700'}`}>{label}</span>
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
    </motion.button >
  );
}
