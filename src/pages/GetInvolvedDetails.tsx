import React, { useState } from 'react';

interface VolunteerModule {
  label: string;
  title: string;
  description: string;
  formUrl: string;
}

interface SponsorModule {
  label: string;
  title: string;
  description: string;
  portalUrl: string;
}

interface DonationConfig {
  tagline: string;
  subLabel: string;
  processorUrl: string;
  actionText: string;
}

export default function GetInvolvedDetails() {
  // 📊 DATA CORES: Preserving your exact structural text mapping blocks
  const [volunteer] = useState<VolunteerModule>({
    label: "Launch Core",
    title: "3D Studio",
    description: "Open optimized movie theater room mesh.",
    formUrl: "https://forms.google.com" // Ready for your link
  });

  const [sponsor] = useState<SponsorModule>({
    label: "Directory",
    title: "Links Portal",
    description: "Connect directly with community networks.",
    portalUrl: "https://forms.google.com" // Ready for your link
  });

  const [donation] = useState<DonationConfig>({
    tagline: "NEON LIQUID",
    subLabel: "System Core Portal",
    processorUrl: "https://www.paypal.com", // Ready for your processor link
    actionText: "System Blueprint Logs"
  });

  return (
    <div className="min-h-screen bg-[#020204] text-white flex flex-col justify-between p-4 sm:p-6 overflow-y-auto selection:bg-red-500/30 relative select-none font-sans">
      
      {/* 🔮 1. BACKGROUND LAYER: FLUID LIQUID AURORAS (Passing behind everything) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#020204]">
        {/* Core Neon Crimson Blob - Top Right */}
        <div className="absolute top-[-10%] right-[-10%] w-[90vw] h-[55vh] rounded-[45%_55%_70%_30%_/_45%_45%_65%_55%]
          bg-gradient-to-tr from-red-600 via-rose-700 to-red-500 opacity-35 blur-[45px]
          animate-[pulse_9s_infinite_alternate_ease-in-out]" />

        {/* Deep Ruby Fluid Flow - Center Left */}
        <div className="absolute bottom-[10%] left-[-15%] w-[85vw] h-[50vh] rounded-[60%_40%_45%_55%_/_50%_40%_60%_50%]
          bg-gradient-to-br from-red-950 via-red-700 to-rose-900 opacity-25 blur-[55px]
          animate-[pulse_11s_infinite_alternate_ease-in-out_1s]" />

        {/* Crisp Silver-White Lighting Source - Bottom Right */}
        <div className="absolute bottom-[-10%] right-[10%] w-[35vw] h-[35vw] rounded-full
          bg-gradient-to-tr from-white via-zinc-400 to-zinc-900 opacity-15 blur-[35px]
          animate-[pulse_7s_infinite_alternate_ease-in-out_3s]" />

        {/* Tech Grid Mask Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#020204_95%)]" />
      </div>

      {/* TOP HEADER CONTROLS */}
      <div className="w-full max-w-sm mx-auto flex justify-between items-center mt-2 z-10">
        <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-black bg-zinc-950/50 border border-white/5 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          3D Compositor Active
        </span>
      </div>

      {/* 🏢 2. MIDDLE LAYER: THE HEAVY FROSTED BASE GLASS PLATE */}
      <div className="w-full max-w-sm mx-auto my-auto z-10 relative pt-12 pb-6">
        <div 
          className="w-full p-6 bg-zinc-950/20 border border-white/5 rounded-[40px] backdrop-blur-[40px] backdrop-saturate-[180%] relative"
          style={{
            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.95), inset 0 1px 1px 0 rgba(255,255,255,0.1), inset 0 -1px 2px 0 rgba(0,0,0,0.5)'
          }}
        >
          {/* Chromatic Brand Label */}
          <div className="text-center mb-6">
            <span className="text-[8px] uppercase tracking-[0.4em] font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-200 opacity-60">
              {donation.subLabel}
            </span>
          </div>

          {/* Luxury Headings */}
          <div className="text-center mb-20 select-text">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] leading-none">
              {donation.tagline}
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mt-3 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600 [filter:drop-shadow(0_2px_6px_rgba(239,68,68,0.25))]">
              3D Layered Suite
            </p>
          </div>

          {/* Mini Base Information Row */}
          <div className="w-full bg-white/[0.01] border border-white/[0.03] p-3 rounded-2xl flex justify-between items-center text-[9px] uppercase tracking-widest font-black text-zinc-500 shadow-inner">
            <span>Diagnostics</span>
            <span className="text-emerald-400 font-mono">60fps / Safe</span>
          </div>

          {/* The Outline Button sitting safely inside the base plate */}
          <div className="w-full flex justify-center mt-4">
            <a 
              href={donation.processorUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-transparent border border-white/10 hover:border-white/30 rounded-2xl text-[9px] uppercase font-black tracking-widest text-zinc-400 hover:text-white transition-all duration-300 shadow-lg block text-center"
            >
              {donation.actionText}
            </a>
          </div>

          {/* 🚀 3. FOREGROUND LAYER: FLOATING OVERLAY GLASS CARDS (Raised 3D effect) */}
          
          {/* OVERLAY CARD A: Upper Right Float */}
          <a 
            href={volunteer.formUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute -top-6 -right-4 w-[160px] p-4 bg-gradient-to-b from-zinc-900/80 to-zinc-950/95 border border-white/15 rounded-2xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-red-500/30 group/card block text-white"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.85), inset 0 1px 1px 0 rgba(255,255,255,0.15)'
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-[8px] uppercase font-black tracking-widest text-zinc-500 group-hover/card:text-red-400 transition-colors">
                {volunteer.label}
              </span>
              <div className="w-2 h-2 rounded-full bg-red-500 [filter:drop-shadow(0_0_4px_#ef4444)]" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-tight text-white text-left">
              {volunteer.title}
            </h3>
            <p className="text-[10px] text-zinc-400 font-medium leading-tight text-left mt-1">
              {volunteer.description}
            </p>
          </a>

          {/* OVERLAY CARD B: Center Left Float */}
          <a 
            href={sponsor.portalUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute top-[38%] -left-6 w-[170px] p-4 bg-gradient-to-b from-zinc-900/80 to-zinc-950/95 border border-white/15 rounded-2xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-red-500/30 group/card2 block text-white"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.85), inset 0 1px 1px 0 rgba(255,255,255,0.15)'
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-[8px] uppercase font-black tracking-widest text-zinc-500 group-hover/card2:text-red-400 transition-colors">
                {sponsor.label}
              </span>
              <span className="text-[8px] font-mono text-zinc-600 bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                v3
              </span>
            </div>
            <h3 className="text-sm font-black uppercase tracking-tight text-white text-left">
              {sponsor.title}
            </h3>
            <p className="text-[10px] text-zinc-400 font-medium leading-tight text-left mt-1">
              {sponsor.description}
            </p>
          </a>

        </div>
      </div>

      {/* FOOTER BOUNDARY */}
      <div className="w-full text-center pb-2 z-10 mt-4">
        <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-black opacity-40">
          Strong Impact Platform © 2026
        </span>
      </div>

    </div>
  );
}