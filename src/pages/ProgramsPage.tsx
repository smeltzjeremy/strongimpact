import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface BentoHub {
  name: string;
  description: string;
  path: string;
  gridSpan: string;
  brandColor: string;
  glowColor: string;
  icon: string;
}

export default function ProgramsPage(): React.JSX.Element {
  const navigate = useNavigate();

  const hubs: BentoHub[] = [
    {
      name: "Youth Development",
      description: "Football camps, athletic training, and leadership workshops.",
      path: "/programs/development",
      gridSpan: "col-span-1 h-[130px]",
      brandColor: "bg-gradient-to-tr from-purple-600 to-indigo-600",
      glowColor: "rgba(124, 58, 237, 0.2)",
      icon: "🏈"
    },
    {
      name: "Education & Mentorship",
      description: "Academic tracking, college readiness, and guest speakers.",
      path: "/programs/mentorship",
      gridSpan: "col-span-1 h-[130px]",
      brandColor: "bg-gradient-to-tr from-emerald-600 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.2)",
      icon: "🎓"
    },
    {
      name: "Community Outreach",
      description: "Holiday givebacks, school supply drives, and family support.",
      path: "/programs/outreach",
      gridSpan: "col-span-2 h-[125px]",
      brandColor: "bg-gradient-to-tr from-red-600 to-rose-600",
      glowColor: "rgba(220, 38, 38, 0.2)",
      icon: "🤝"
    }
  ];

  return (
    <div className="fixed inset-0 bg-[#030306] z-10 flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto select-none perspective-[1200px]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[70vw] h-[70vw] bg-emerald-600/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#030306_98%)]" />
      </div>
      
      <div className="w-full max-w-md flex justify-between items-center mt-2 z-10">
        <button onClick={() => navigate(-1)} className="text-[9px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-xl transition-all hover:scale-105">← Back</button>
        <span className="text-[9px] uppercase font-black tracking-widest text-zinc-500 opacity-60">Stepping Stone 03</span>
      </div>

      <div className="w-full max-w-md flex flex-col justify-center items-center z-10 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">PROGRAMS</span></h1>
          <p className="text-[8px] uppercase tracking-widest text-zinc-400 font-black mt-3 bg-white/[0.02] border border-white/10 px-4 py-2 rounded-full inline-block backdrop-blur-2xl">Empowerment Pillars</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          {hubs.map((hub, index) => {
            const cardRef = useRef<HTMLAnchorElement>(null);
            return (
              <Link 
                key={index} 
                ref={cardRef} 
                to={hub.path} 
                className={`${hub.gridSpan} block p-5 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl backdrop-blur-2xl backdrop-saturate-[180%] transition-all duration-200 ease-out relative overflow-hidden flex flex-col justify-between group`}
                style={{
                  border: '1px solid transparent',
                  borderImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(255,255,255,0.02) 40%, transparent) 1',
                  boxShadow: `0 35px 70px -15px rgba(0, 0, 0, 0.95), inset 0 1px 0px 0 rgba(255, 255, 255, 0.12), inset 0 -3px 12px 0 rgba(0, 0, 0, 0.6)`
                }}
              >
                <div className="flex items-center justify-between w-full relative z-10">
                  <div className={`p-2.5 rounded-xl ${hub.brandColor} text-white shadow-lg shadow-black/40`}>{hub.icon}</div>
                  <div className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all text-xs font-black">➔</div>
                </div>
                <div className="text-left w-full relative z-10 mt-2">
                  <span className="block text-[8px] uppercase tracking-widest text-zinc-400 font-extrabold opacity-60">{hub.description}</span>
                  <span className="block text-sm font-bold text-white tracking-wide mt-1">{hub.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-full text-center pb-2 z-10"><span className="text-[9px] uppercase tracking-widest text-zinc-600 font-black opacity-30">Building Stronger Foundations © 2026</span></div>
    </div>
  );
}