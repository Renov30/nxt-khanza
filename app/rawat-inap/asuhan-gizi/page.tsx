"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  FaUtensils, FaSearch, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import BottomActionPanel from '@/components/BottomActionPanel';

// Demo data for table
const demoData = [
  {
    noRawat: '2025/10/23/000065', noRM: '617244', nama: 'Tn. Sukarji', jk: 'L',
    tglLahir: '1959-06-22', tglAsuhan: '2025-10-23', bb: 55, tb: 155, imt: 22.9,
    lla: 0, tl: 0, ulna: 0, llaU: 0, bbIdeal: 0, bbU: 0, tbU: 0, bbTb: 0, llaUPersen: 0,
    subjektif: 'A p51.1.b Leukosit : 13.5 10^3/...',
    fisikKlinis: 'Status Gizi : normalMual dan nyeri ...',
    telur: false, susuSapi: false, kacang: false, gluten: false,
    udang: false, ikan: false, hazelnut: false,
    polaMakan: '3x makan utama',
    riwayatPersonal: '', diagnosaGizi: '', intervensiGizi: '',
    instruksi: '', monitoringEvaluasi: '', petugas: 'ayu',
    namaPetugas: 'Ukhuwwatun Hasanah Pristari Rahayu, S.Gz',
  },
];

// Allergy item component
function AllergyItem({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="min-w-[170px] text-slate-700">{label}</span>
      <label className="flex items-center gap-1 cursor-pointer">
        <input type="radio" name={label} checked={value} onChange={() => onChange(true)} className="accent-brand-500 w-3.5 h-3.5" />
        <span className="text-slate-600">Ya</span>
      </label>
      <label className="flex items-center gap-1 cursor-pointer">
        <input type="radio" name={label} checked={!value} onChange={() => onChange(false)} className="accent-brand-500 w-3.5 h-3.5" />
        <span className="text-slate-600">Tidak</span>
      </label>
    </div>
  );
}

function AsuhannGiziContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const noRawatParam = searchParams.get('noRawat') || '2025/10/23/000065';

  const [mounted, setMounted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form state
  const [bb, setBb] = useState('55');
  const [tb, setTb] = useState('155');
  const [imt, setImt] = useState('22.9');
  const [lla, setLla] = useState('');
  const [tl, setTl] = useState('');
  const [ulna, setUlna] = useState('');
  const [llaU, setLlaU] = useState('');
  const [bbIdeal, setBbIdeal] = useState('');
  const [bbU, setBbU] = useState('');
  const [tku, setTku] = useState('');
  const [bbTb, setBbTb] = useState('');
  const [llaUPersen, setLlaUPersen] = useState('');
  const [biokimia, setBiokimia] = useState('');
  const [fisikKlinis, setFisikKlinis] = useState('');
  const [polaMakan, setPolaMakan] = useState('');
  const [riwayatPersonal, setRiwayatPersonal] = useState('');
  const [diagnosaGizi, setDiagnosaGizi] = useState('');
  const [intervensiGizi, setIntervensiGizi] = useState('');
  const [instruksi, setInstruksi] = useState('');
  const [monitoringEvaluasi, setMonitoringEvaluasi] = useState('');

  // Allergy state
  const [alergiTelur, setAlergiTelur] = useState(false);
  const [alergiSusuSapi, setAlergiSusuSapi] = useState(false);
  const [alergiKacang, setAlergiKacang] = useState(false);
  const [alergiGluten, setAlergiGluten] = useState(false);
  const [alergiUdang, setAlergiUdang] = useState(false);
  const [alergiIkan, setAlergiIkan] = useState(false);
  const [alergiHazelnut, setAlergiHazelnut] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // Input helper component
  const FormInput = ({ label, value, onChange, unit, width = 'w-20' }: { label: string; value: string; onChange: (v: string) => void; unit?: string; width?: string }) => (
    <div className="flex items-center gap-1.5">
      <span className="font-semibold text-slate-600 text-xs whitespace-nowrap">{label}</span>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        className={`${width} border border-slate-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-brand-500 bg-white`} />
      {unit && <span className="text-xs text-slate-500">{unit}</span>}
    </div>
  );

  const FormTextarea = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-600">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
        className="border border-slate-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-brand-500 bg-white resize-y" />
    </div>
  );

  const formContent = (
    <div className="space-y-4">
      {/* Patient Info Row */}
      <div className="flex flex-wrap gap-3 items-center text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-600">No. Rawat :</span>
          <input type="text" className="border border-slate-300 rounded px-2 py-1 w-40 bg-slate-50 text-xs" value={noRawatParam} readOnly />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-600">No. RM :</span>
          <input type="text" className="border border-slate-300 rounded px-2 py-1 w-20 bg-slate-50 text-xs" defaultValue="617244" readOnly />
        </div>
        <div className="flex items-center gap-1.5">
          <input type="text" className="border border-slate-300 rounded px-2 py-1 w-36 bg-slate-50 text-xs" defaultValue="Tn. Sukarji" readOnly />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-600">Tgl.Lahir :</span>
          <input type="text" className="border border-slate-300 rounded px-2 py-1 w-28 bg-slate-50 text-xs" defaultValue="1959-06-22" readOnly />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-600">J.K. :</span>
          <input type="text" className="border border-slate-300 rounded px-2 py-1 w-16 bg-slate-50 text-xs" defaultValue="Laki-Laki" readOnly />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-600">Diagnosa :</span>
          <input type="text" className="border border-slate-300 rounded px-2 py-1 flex-1 min-w-[200px] bg-slate-50 text-xs" defaultValue="pneumonia / pasien umum" readOnly />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-600">Tanggal :</span>
          <input type="date" className="border border-slate-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-brand-500 bg-white" defaultValue="2026-04-30" />
        </div>
      </div>

      {/* Antropometri Section */}
      <div className="bg-brand-50/40 p-3 rounded-lg border border-brand-100/50">
        <h3 className="text-[13px] font-bold text-brand-700 mb-3 flex items-center gap-2 border-b border-brand-100 pb-2">
          Antropometri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <FormInput label="BB :" value={bb} onChange={setBb} unit="Kg" />
          <FormInput label="TB :" value={tb} onChange={setTb} unit="Cm" />
          <FormInput label="IMT :" value={imt} onChange={setImt} unit="Kg/m²" />
          <FormInput label="LLA :" value={lla} onChange={setLla} unit="Cm" />
          <FormInput label="TL :" value={tl} onChange={setTl} unit="Cm" />
          <FormInput label="ULNA :" value={ulna} onChange={setUlna} unit="Cm" />
          <FormInput label="BB Ideal :" value={bbIdeal} onChange={setBbIdeal} unit="Kg" />
          <FormInput label="BB/U :" value={bbU} onChange={setBbU} unit="SD" />
          <FormInput label="TKU :" value={tku} onChange={setTku} unit="SD" />
          <FormInput label="BB/TB :" value={bbTb} onChange={setBbTb} unit="SD" />
          <FormInput label="LLA/U :" value={llaUPersen} onChange={setLlaUPersen} unit="SD" />
        </div>
      </div>

      {/* Biokimia & Fisik/Klinis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormTextarea label="Biokimia :" value={biokimia} onChange={setBiokimia} />
        <FormTextarea label="Fisik/Klinis :" value={fisikKlinis} onChange={setFisikKlinis} />
      </div>

      {/* Riwayat Gizi Section */}
      <div className="bg-brand-50/40 p-3 rounded-lg border border-brand-100/50">
        <h3 className="text-[13px] font-bold text-brand-700 mb-3 flex items-center gap-2 border-b border-brand-100 pb-2">
          Riwayat Gizi
        </h3>
        <div className="mb-3">
          <span className="text-xs font-semibold text-slate-600 block mb-2">Alergi Makanan :</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ml-2">
            <AllergyItem label="Telur" value={alergiTelur} onChange={setAlergiTelur} />
            <AllergyItem label="Udang" value={alergiUdang} onChange={setAlergiUdang} />
            <AllergyItem label="Susu sapi dan produk olahannya" value={alergiSusuSapi} onChange={setAlergiSusuSapi} />
            <AllergyItem label="Ikan" value={alergiIkan} onChange={setAlergiIkan} />
            <AllergyItem label="Kacang kedelai / tanah" value={alergiKacang} onChange={setAlergiKacang} />
            <AllergyItem label="Hazelnut / Almond" value={alergiHazelnut} onChange={setAlergiHazelnut} />
            <AllergyItem label="Gluten / gandum" value={alergiGluten} onChange={setAlergiGluten} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Pola Makan :</label>
            <input type="text" value={polaMakan} onChange={e => setPolaMakan(e.target.value)}
              className="border border-slate-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-brand-500 bg-white" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Riwayat Personal :</label>
            <input type="text" value={riwayatPersonal} onChange={e => setRiwayatPersonal(e.target.value)}
              className="border border-slate-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-brand-500 bg-white" />
          </div>
        </div>
      </div>

      {/* Clinical Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormTextarea label="Diagnosa Gizi :" value={diagnosaGizi} onChange={setDiagnosaGizi} />
        <FormTextarea label="Intervensi Gizi :" value={intervensiGizi} onChange={setIntervensiGizi} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormTextarea label="Instruksi :" value={instruksi} onChange={setInstruksi} />
        <FormTextarea label="Monitoring & Evaluasi :" value={monitoringEvaluasi} onChange={setMonitoringEvaluasi} />
      </div>

      {/* Petugas */}
      <div className="flex flex-wrap gap-3 items-center text-xs border-t border-slate-200 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-600">Petugas :</span>
          <input type="text" className="border border-slate-300 rounded px-2 py-1 w-24 bg-slate-50 text-xs" defaultValue="ayu" readOnly />
        </div>
        <input type="text" className="border border-slate-300 rounded px-2 py-1 flex-1 min-w-[200px] bg-slate-50 text-xs" defaultValue="Ukhuwwatun Hasanah Pristari Rahayu, S.Gz" readOnly />
        <button className="bg-brand-50 border border-brand-200 p-1.5 rounded hover:bg-brand-100 text-brand-600 transition-colors">
          <FaSearch className="text-[10px]" />
        </button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full h-full overflow-hidden bg-slate-50 text-slate-800 rounded-tl-xl shadow-inner border-t border-l border-white"
    >
      {/* Page Header */}
      <div className="bg-gradient-to-r from-brand-100 to-slate-50 px-4 py-1 border-b border-brand-100 flex items-center justify-between shadow-sm z-10 shrink-0">
        <h2 className="text-brand-800 font-bold text-sm flex items-center gap-2 tracking-wide">
          <FaUtensils className="text-brand-600" />
          Data Asuhan Gizi Pasien
        </h2>
      </div>

      {/* Toggle Button - above table when form is closed */}
      {!isFormOpen && (
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-white border-b border-slate-200 px-4 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 transition-colors flex items-center gap-2 shrink-0 w-full text-left"
        >
          <FaChevronDown className="text-[10px]" />
          <span className="tracking-wide">Tampilkan Input Data</span>
        </button>
      )}

      {/* Collapsible Input Form - expands from top, pushing table down */}
      <AnimatePresence initial={false}>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-slate-200 shrink-0"
            style={{ maxHeight: '60vh' }}
          >
            <div className="p-3 bg-white overflow-y-auto custom-scrollbar" style={{ maxHeight: '60vh' }}>
              {formContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button - below form when form is open */}
      {isFormOpen && (
        <button
          onClick={() => setIsFormOpen(false)}
          className="bg-white border-b border-slate-200 px-4 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 transition-colors flex items-center gap-2 shrink-0 w-full text-left"
        >
          <FaChevronUp className="text-[10px]" />
          <span className="tracking-wide">Sembunyikan Input Data</span>
        </button>
      )}

      {/* Data Table - takes remaining space */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
          <thead className="sticky top-0 bg-slate-100 border-b border-slate-300 z-10 shadow-sm text-slate-600">
            <tr>
              {[
                'No.Rawat', 'No.RM', 'Nama Pasien', 'J.K.', 'Tgl.Lahir', 'Tgl.Asuhan',
                'BB(Kg)', 'TB(Cm)', 'IMT(Kg/m²)', 'LLA(Cm)', 'TL(Cm)', 'ULNA(Cm)',
                'LLA/U(%)', 'BB Ideal(Kg)', 'BB/U(%)', 'TB/U(%)', 'BB/TB(%)', 'LLA/U(SD)',
                'Subjektif', 'Fisik/Klinis',
                'Telur', 'Susu Sapi', 'Kacang', 'Gluten', 'Udang', 'Ikan', 'Hazelnut',
                'Pola Makan'
              ].map(h => (
                <th key={h} className="py-2 px-3 border-r border-slate-300 font-semibold last:border-r-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demoData.map((row, i) => (
              <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'} hover:bg-brand-50 hover:shadow-[inset_3px_0_0_0_var(--color-brand-500)] transition-colors cursor-pointer`}>
                <td className="py-2 px-3 border-r border-slate-200 text-brand-600 font-bold">{row.noRawat}</td>
                <td className="py-2 px-3 border-r border-slate-200">{row.noRM}</td>
                <td className="py-2 px-3 border-r border-slate-200">{row.nama}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-center">{row.jk}</td>
                <td className="py-2 px-3 border-r border-slate-200">{row.tglLahir}</td>
                <td className="py-2 px-3 border-r border-slate-200">{row.tglAsuhan}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.bb}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.tb}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.imt}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.lla}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.tl}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.ulna}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.llaU}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.bbIdeal}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.bbU}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.tbU}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.bbTb}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-right">{row.llaUPersen}</td>
                <td className="py-2 px-3 border-r border-slate-200 max-w-[200px] truncate">{row.subjektif}</td>
                <td className="py-2 px-3 border-r border-slate-200 max-w-[200px] truncate">{row.fisikKlinis}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-center">{row.telur ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-center">{row.susuSapi ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-center">{row.kacang ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-center">{row.gluten ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-center">{row.udang ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-center">{row.ikan ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-3 border-r border-slate-200 text-center">{row.hazelnut ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-3">{row.polaMakan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Action Panel - always at bottom */}
      <BottomActionPanel
        recordCount={1}
        onExit={() => router.push('/rawat-inap')}
      />
    </motion.div>
  );
}

export default function AsuhannGiziPage() {
  return (
    <Suspense fallback={<div className="p-8 flex justify-center text-brand-500">Memuat data...</div>}>
      <AsuhannGiziContent />
    </Suspense>
  );
}
