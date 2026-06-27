import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProgramSegment {
  title: string;
  tag: string;
  description: string;
}

interface OutreachConfig {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

export default function ProgramDetails(): React.JSX.Element {
  const navigate = useNavigate();

  // 📊 ADMIN CONFIGURATION STATE SCHEMAS (Open for live Supabase state pairing)
  const [segments] = useState<ProgramSegment[]>([
    { 
      title: "Youth Development", 
      tag: "Athletic Foundation",
      description: "Engineering structural speed mechanics, explosive footwork drill cycles, and unshakeable physical athletic conditioning parameters required to compete at the highest level."
    },
    { 
      title: "Education & Mentorship", 
      tag: "Academic Tracking",
      description: "Enforcing tactical classroom accountability protocols, mandatory report card progress checks, and proactive character mentoring modules to build elite leaders off the gridiron."
    }
  ]);

  const [outreach] = useState<OutreachConfig>({
    title: "Community Outreach",
    subtitle: "Localized Pipelines",
    description: "Extending impactful resources directly to regional families via structured seasonal food distributions, holiday turkey drives, and back-to-school backpack networks.",
    imageUrl: "" // Wired directly to your skeuomorphic upload preview system below
  });

  return (
    <div className="min-h-screen bg-[#030305] text-white flex flex-col justify-between p-6 overflow-y-auto selection:bg-red-500/30 relative select-none font-sans">
      
      {/* 🔮 THE NEON LIQUID ENGINE (Preserved completely from your template) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#030305]">
        <div className="absolute top-[-15%] left-[10%] w-[85vw] h-[50vh] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] bg-gradient-to-tr from-red-600 via-rose-700 to-red-500 opacity-40 blur-[40px] animate-[pulse_10s_infinite_alternate_ease-in-out]" />
        <div className="absolute bottom-[-10%] left-[15%] w-[70vw] h-[45vh] rounded-[60%_40%_30%_70%_/_50%_40%_60%_50%] bg-gradient-to-br from-red-900 via-red-600 to-rose-800 opacity-30 blur-[50px] animate-[pulse_8s_infinite_alternate_ease-in-out_2s]" />
        <div className="absolute top-[15%] left-[8%] w-[18vw] h-[18vw] rounded-full bg-gradient-to-br from-white via-zinc-400 to-zinc-800 opacity-25 blur-[15px] animate-[pulse_12s_infinite_alternate_ease-in-out_1s]" />
        <div className="absolute bottom-[12%] right-[5%] w-[28vw] h-[28vw] rounded-[50%_40%_60%_50%_/_40%_60%_40%_60%] bg-gradient-to-l from-red-500 to-rose-600 opacity-35 blur-[25px] animate-[pulse_9s_infinite_alternate_ease-in-out]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:48px_48px] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#030305_95%)]" />
      </div>

      {/* TOP BAR CONFIGURATION */}
      <div className="w-full max-w-md mx-auto flex justify-between items-center mt-2 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="text-[9px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-5 py-2 bg-zinc-900/40 border border-white/10 rounded-full backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:scale-105 active:scale-95 shadow-2xl"
        >
          ← Back
        </button>
        <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-black bg-zinc-950/40 border border-white/5 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          Liquid Core Engine
        </span>
      </div>

      {/* 🏢 THE ULTRA-PREMIUM HEAVY FROSTED CONTAINER GLASS CAPSULE */}
      <div className="w-full max-w-md mx-auto my-auto z-10 relative pt-4">
        <div 
          className="w-full p-6 sm:p-8 bg-zinc-950/30 border border-white/10 rounded-[36px] backdrop-blur-[36px] backdrop-saturate-[180%] transition-all duration-500 hover:border-white/20"
          style={{
            boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.9), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.4)'
          }}
        >
          {/* Decorative Sub-Label */}
          <div className="text-center mb-4">
            <span className="text-[8px] uppercase tracking-[0.4em] font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-200">
              Core Framework Pillars
            </span>
          </div>

          {/* CHROME LIQUID TYPOGRAPHY HEADER */}
          <div className="text-center mb-6 select-text">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] leading-none">
              OUR ACTIVE
            </h2>
            <p className="text-xs font-black uppercase tracking-[0.3em] mt-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-red-500 [filter:drop-shadow(0_2px_8px_rgba(239,68,68,0.2))]">
              PROGRAMS
            </p>
          </div>

          {/* LUXURY INTERNAL PILLARS 1 & 2 LIST MODULES */}
          <div className="space-y-4 my-6 text-left">
            {segments.map((item, index) => (
              <div 
                key={index} 
                className="w-full p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col transition-all duration-300 hover:bg-white/[0.03] hover:border-white/10 group"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-black uppercase tracking-tight text-white group-hover:text-red-400 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[8px] uppercase font-black tracking-widest px-2.5 py-0.5 bg-zinc-950/60 border border-white/5 rounded-md text-zinc-400 shadow-inner">
                    {item.tag}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-medium leading-relaxed tracking-wide">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* 📸 PILLAR 3: INTEGRATED HIGH-FIDELITY COMMUNITY OUTREACH SHOWCASE SLOT */}
          <div className="w-full p-4 bg-black/30 border border-white/5 rounded-2xl text-left space-y-3">
            
            {/* CINEMATIC OUTREACH PHOTOGRAPH FRAME CONTAINER */}
            <div className="w-full h-36 rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              {outreach.imageUrl ? (
                <img src={outreach.imageUrl} alt={outreach.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1 opacity-20">
                  <span className="text-lg">🤝</span>
                  <span className="text-[7px] uppercase tracking-widest font-black text-zinc-400">Outreach Media Frame</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.05] pointer-events-none" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-black uppercase tracking-tight text-white">{outreach.title}</h3>
                <span className="text-[7px] uppercase font-black tracking-widest text-red-400">{outreach.subtitle}</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium leading-relaxed tracking-wide">
                {outreach.description}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER BOUNDARY */}
      <div className="w-full text-center pb-2 z-10 mt-4">
        <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-black opacity-50">
          Strong Impact Platform © 2026
        </span>
      </div>

    </div>
  );
}