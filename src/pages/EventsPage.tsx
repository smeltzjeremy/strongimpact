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

export default function EventsPage(): React.JSX.Element {
  const navigate = useNavigate();

  const hubs: BentoHub[] = [
    {
      name: "Upcoming Calendar",
      description: "Football camps, fundraisers, and community activities schedules.",
      path: "/events/calendar",
      gridSpan: "col-span-2 h-[125px]",
      brandColor: "bg-gradient-to-tr from-red-600 to-rose-600",
      glowColor: "rgba(220, 38, 38, 0.3)",
      icon: "📅"
    },
    {
      name: "Special Guests",
      description: "Profiles of collegiate and professional athletes coaching camps.",
      path: "/events/guests",
      gridSpan: "col-span-1 h-[130px]",
      brandColor: "bg-gradient-to-tr from-purple-600 to-blue-600",
      glowColor: "rgba(147, 51, 234, 0.3)",
      icon: "🌟"
    },
    {
      name: "Registration Hub",
      description: "Secure placement forms for upcoming development sessions.",
      path: "/events/register",
      gridSpan: "col-span-1 h-[130px]",
      brandColor: "bg-gradient-to-tr from-emerald-600 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.3)",
      icon: "📝"
    }
  ];

  return (
    <div className="fixed inset-0 bg-[#030306] z-10 flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto select-none perspective-[1200px]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-[20%] right-[10%] w-[70vw] h-[70vw] bg-blue-600/5 rounded-full blur-[120px] animate-[pulse_8s_infinite_alternate]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#030306_98%)]" />
      </div>
      
      <div className="w-full max-w-md flex justify-between items-center mt-2 z-10">
        <button onClick={() => navigate('/')} className="text-[9px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-xl transition-all hover:scale-105 active:scale-95 shadow-md">← Home</button>
        <span className="text-[9px] uppercase font-black tracking-widest text-zinc-500 opacity-60">Stepping Stone 04</span>
      </div>

      <div className="w-full max-w-md flex flex-col justify-center items-center z-10 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">FOUNDATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600 font-black">EVENTS</span></h1>
          <p className="text-[8px] uppercase tracking-widest text-zinc-400 font-black mt-3 bg-white/[0.02] border border-white/10 px-4 py-2 rounded-full inline-block backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">Schedules & Action</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          {hubs.map((hub, index) => {
            const cardRef = useRef<HTMLAnchorElement>(null);

            const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
              const card = cardRef.current;
              if (!card) return;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const xc = rect.width / 2;
              const yc = rect.height / 2;
              const angleX = (yc - y) / 5; 
              const angleY = (x - xc) / 5;

              card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.04, 1.04, 1.04)`;
              card.style.setProperty('--mx', `${x}px`);
              card.style.setProperty('--my', `${y}px`);
            };

            const handleMouseLeave = () => {
              const card = cardRef.current;
              if (!card) return;
              card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            };

            return (
              <Link 
                key={index} 
                ref={cardRef} 
                to={hub.path} 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`${hub.gridSpan} block p-5 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl backdrop-blur-2xl backdrop-saturate-[180%] transition-all duration-200 ease-out relative overflow-hidden flex flex-col justify-between group transform-style-3d`}
                style={{
                  border: '1px solid transparent',
                  borderImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(255,255,255,0.02) 40%, transparent) 1',
                  boxShadow: `0 35px 70px -15px rgba(0, 0, 0, 0.95), inset 0 1px 0px 0 rgba(255, 255, 255, 0.12), inset 0 -3px 12px 0 rgba(0, 0, 0, 0.6)`
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" style={{ background: `radial-gradient(130px circle at var(--mx, 0px) var(--my, 0px), rgba(255, 255, 255, 0.08), transparent 100%)` }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen" style={{ background: `radial-gradient(100px circle at var(--mx, 0px) var(--my, 0px), ${hub.glowColor}, transparent 100%)` }} />

                <div className="flex items-center justify-between w-full relative z-10 pointer-events-none">
                  <div className={`p-2.5 rounded-xl ${hub.brandColor} text-white shadow-lg shadow-black/40 group-hover:scale-105 transition-transform`}>{hub.icon}</div>
                  <div className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all text-xs font-black">➔</div>
                </div>
                <div className="text-left w-full relative z-10 mt-2 pointer-events-none">
                  <span className="block text-[8px] uppercase tracking-widest text-zinc-400 font-extrabold opacity-60 group-hover:opacity-100 transition-opacity">{hub.description}</span>
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