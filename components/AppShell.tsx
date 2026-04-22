"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaKey, FaUserTie, FaInfoCircle, FaDesktop, FaBook,
  FaHome, FaIdCard, FaAmbulance, FaFlask, FaRadiation,
  FaPills, FaBed, FaWheelchair, FaSignInAlt, FaTimes,
  FaLaptopMedical, FaCubes, FaSync, FaCog, FaReact,
  FaUser, FaLock, FaThLarge
} from 'react-icons/fa';
import { loginAction } from '@/lib/actions/auth';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const pathname = usePathname();

  // Auth States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      className="flex flex-col h-screen w-full overflow-hidden bg-slate-50 font-sans relative"
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
        <Link href="/daftar-menu">
          <SecondaryMenuItem icon={<FaHome className="text-slate-500 hover:text-emerald-600 transition-colors" />} label="Menu" active={pathname === '/daftar-menu'} />
        </Link>
        <div className="w-px h-10 bg-emerald-100 mx-2 self-center"></div>
        <Link href="/registrasi">
          <SecondaryMenuItem icon={<FaIdCard className="text-slate-500 hover:text-emerald-600 transition-colors" />} label="Registrasi" active={pathname === '/registrasi'} />
        </Link>
        <SecondaryMenuItem icon={<FaAmbulance className="text-slate-500 hover:text-red-500 transition-colors" />} label="IGD/UGD" />
        <SecondaryMenuItem icon={<FaFlask className="text-slate-500 hover:text-purple-500 transition-colors" />} label="Laborat" />
        <SecondaryMenuItem icon={<FaRadiation className="text-slate-500 hover:text-yellow-500 transition-colors" />} label="Radiologi" />
        <SecondaryMenuItem icon={<FaPills className="text-slate-500 hover:text-pink-500 transition-colors" />} label="Farmasi" />
        <Link href="/rawat-inap">
          <SecondaryMenuItem icon={<FaBed className="text-slate-500 hover:text-blue-500 transition-colors" />} label="Rawat Inap" active={pathname === '/rawat-inap'} />
        </Link>
        <SecondaryMenuItem icon={<FaWheelchair className="text-slate-500 hover:text-teal-500 transition-colors" />} label="Rawat Jalan" />

        <div className="flex-1 min-w-[20px]"></div>

        {!isLoggedIn ? (
          <SecondaryMenuItem
            icon={<FaSignInAlt className="text-slate-500 group-hover:text-emerald-600 transition-colors" />}
            label="Log In"
            onClick={() => setIsLoginModalOpen(true)}
          />
        ) : (
          <div className="flex items-center">
            <div className="flex items-center gap-2 px-3 py-1 mr-2 border-r border-emerald-200">
              <span className="text-[14px] font-semibold text-slate-700 max-w-[100px] truncate">{username || 'renov'}</span>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 shadow-sm cursor-pointer hover:bg-blue-200 transition-colors">
                <FaUser className="text-blue-600 text-lg drop-shadow-sm" />
              </div>
            </div>
            <SecondaryMenuItem
              icon={<FaKey className="text-slate-500 group-hover:text-yellow-600 transition-colors" />}
              label="Log Out"
              onClick={() => setIsLoggedIn(false)}
            />
          </div>
        )}
        <SecondaryMenuItem icon={<FaTimes className="text-red-500 hover:text-red-600 transition-colors" />} label="Keluar" isRed />
      </motion.nav>

      {/* Main Content Area */}
      <main className="flex-1 relative w-full h-full overflow-hidden bg-emerald-50/30">
        <div className="absolute inset-0 w-full h-full">
          {children}
        </div>
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
          {isLoggedIn ? username || 'Admin Utama' : 'Belum Login'}
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
            {!isLoggedIn ? (
              <ContextMenuItem icon={<FaSignInAlt className="text-blue-500" />} label="Buka Halaman Login" onClick={() => setIsLoginModalOpen(true)} />
            ) : (
              <ContextMenuItem icon={<FaKey className="text-yellow-600" />} label="Log Out" onClick={() => setIsLoggedIn(false)} />
            )}
            <div className="w-full h-px bg-slate-100 my-1"></div>
            <ContextMenuItem icon={<FaTimes className="text-red-500" />} label="Tutup Menu" isRed />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-[380px] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-white/50"
            >
              {/* Top spacer */}
              <div className="h-6 bg-white w-full"></div>

              {/* Form Area */}
              <form action={async (formData) => {
                setLoginError('');
                setIsLoading(true);
                const result = await loginAction(formData);
                setIsLoading(false);

                if (result.success && result.user) {
                  setIsLoggedIn(true);
                  setUsername(result.user.nama || username);
                  setIsLoginModalOpen(false);
                  setPassword('');
                } else {
                  setLoginError(result.message || 'Login failed');
                }
              }}>
                <div className="bg-[#cbdceb] px-6 py-6 flex flex-col gap-5 border-y border-slate-300 shadow-inner">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700 w-24">Username :</label>
                    <input
                      name="username"
                      type="text"
                      className="flex-1 bg-gradient-to-b from-slate-50 to-slate-200 border border-slate-400 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-inner text-slate-700 font-medium"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoFocus
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700 w-24">Password :</label>
                    <input
                      name="password"
                      type="password"
                      className="flex-1 bg-gradient-to-b from-slate-50 to-slate-200 border border-slate-400 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-inner text-slate-700 font-medium"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {loginError && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-[10px] text-red-600 font-bold text-center bg-red-50 py-1 rounded border border-red-200"
                    >
                      {loginError}
                    </motion.p>
                  )}
                </div>

                {/* Buttons Area */}
                <div className="bg-white px-6 py-4 flex items-center justify-center gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 flex justify-center items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full py-2 px-4 transition-colors shadow-sm text-sm font-bold text-slate-700 active:scale-95 disabled:opacity-50"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <FaLock className={`text-yellow-500 text-lg drop-shadow-sm ${isLoading ? 'animate-pulse' : ''}`} />
                    </div>
                    {isLoading ? 'Loading...' : 'Log-in'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoginModalOpen(false);
                      setLoginError('');
                    }}
                    className="flex-1 flex justify-center items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full py-2 px-4 transition-colors shadow-sm text-sm font-bold text-slate-700 active:scale-95"
                  >
                    <div className="w-5 h-5 flex items-center justify-center bg-red-500 rounded-md shadow-sm">
                      <FaTimes className="text-white text-[10px]" />
                    </div>
                    Batal
                  </button>
                </div>
              </form>
            </motion.div>
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
      className="flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-colors hover:shadow-sm"
    >
      <span className="text-base drop-shadow-md">{icon}</span>
      <span className="drop-shadow-sm">{label}</span>
    </motion.button>
  );
}

function SecondaryMenuItem({ icon, label, isRed, active, onClick }: { icon: React.ReactNode, label: string, isRed?: boolean, active?: boolean, onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
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
