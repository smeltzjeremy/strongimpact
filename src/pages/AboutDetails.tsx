import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export default function AboutDetails(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  // ADMIN-EDITABLE ROW SCHEMAS (Left open for Admin dashboard updates)
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Jazmond Strong",
      role: "Founder & Executive Director",
      bio: "Dedicated to engineering structural pathways for youth development, athletic excellence, and comprehensive mentorship programs.",
      imageUrl: "" 
    },
    {
      id: 2,
      name: "Team Member Two",
      role: "Operations Coordinator",
      bio: "Managing localized logistics, school distribution partnerships, and corporate sponsorship outreach execution networks.",
      imageUrl: ""
    }
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');

    const handleScroll = (elementRef: React.RefObject<HTMLDivElement>) => {
      setTimeout(() => {
        elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    };

    if (section === 'story') handleScroll(storyRef);
    if (section === 'values') handleScroll(valuesRef);
    if (section === 'team') handleScroll(teamRef);
  }, [location]);

  return (
    <div className="min-h-screen bg-[#060609] text-white overflow-y-auto relative pb-24 select-none selection:bg-white/20">
      
      {/* 🔮 AUTHENTIC CHROME GLASSMORPHISM VECTOR BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#060609]">
        
        {/* ORB 1: Deep Metallic Sphere Layer - Back Left (Fades under the glass plate edge) */}
        <div className="absolute top-[20%] left-[-8vw] w-[45vw] h-[45vw] rounded-full z-0
          bg-gradient-to-br from-zinc-100 via-zinc-400 via-zinc-600 to-zinc-950
          shadow-[inset_-12px_-12px_35px_rgba(0,0,0,0.85),15px_30px_60px_rgba(0,0,0,0.95)] opacity-80" />
        
        {/* ORB 2: Elevated Ultra-Shine Chrome Sphere Layer - Back Right */}
        <div className="absolute top-[42%] -right-[12vw] w-[50vw] h-[50vw] rounded-full z-0
          bg-gradient-to-tr from-zinc-950 via-zinc-500 via-zinc-200 to-white
          shadow-[inset_-20px_-25px_50px_rgba(0,0,0,0.9),-15px_35px_55px_rgba(0,0,0,0.95)] opacity-85" />

        {/* ORB 3: Foreground Out-Of-Focus Floating Sphere (Passes in front of elements) */}
        <div className="absolute bottom-[5%] left-[18%] w-[20vw] h-[20vw] rounded-full z-40 blur-[5px]
          bg-gradient-to-b from-zinc-400 via-zinc-700 to-zinc-950 shadow-2xl opacity-40" />
        
        {/* Global Depth Vignette Layer (Prevents color splitting or background clipping) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#060609_98%)] z-10" />
      </div>

      {/* STICKY UTILITY NAV BAR HEADER */}
      <div className="sticky top-0 w-full z-50 px-4 py-4 bg-[#060609]/30 backdrop-blur-2xl border-b border-white/[0.04] flex justify-center shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        <div className="w-full max-w-xl flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="text-[9px] uppercase font-black tracking-widest text-zinc-300 hover:text-white px-5 py-2.5 bg-zinc-900/40 border border-white/10 rounded-full backdrop-blur-xl transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            ← Back
          </button>
          <div className="flex gap-1.5">
            <button onClick={() => storyRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-[8px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-3 py-2 bg-white/[0.02] border border-white/5 rounded-xl transition-all backdrop-blur-md">Story</button>
            <button onClick={() => valuesRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-[8px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-3 py-2 bg-white/[0.02] border border-white/5 rounded-xl transition-all backdrop-blur-md">Values</button>
            <button onClick={() => teamRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-[8px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-3 py-2 bg-white/[0.02] border border-white/5 rounded-xl transition-all backdrop-blur-md">Team</button>
          </div>
        </div>
      </div>

      {/* MASTER SCROLL MODULE CONTAINER PANEL */}
      <div className="w-full max-w-xl mx-auto px-4 relative z-30 space-y-10 mt-10">
        
        {/* SECTION 1: OUR STORY */}
        <div ref={storyRef} className="scroll-mt-24 transition-transform duration-500 hover:-translate-y-1">
          <div className="w-full p-7 bg-zinc-950/25 border border-white/10 rounded-3xl backdrop-blur-3xl backdrop-saturate-[180%] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.12)]">
            <span className="text-[8px] uppercase tracking-[0.35em] text-red-500 font-black block mb-2">Pillar One</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-md">Our Story</h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed tracking-wide text-left">
              Founded and directed by Jazmond Strong, the Strong Impact Foundation was established to bridge critical gaps within community development, youth alignment, and physical performance training. By building an unshakeable athletic foundation combined with strict tactical educational tracking modules, the program challenges regional youth to discover excellence both on the field gridiron and inside the classroom theater.
            </p>
          </div>
        </div>

        {/* SECTION 2: CORE VALUES */}
        <div ref={valuesRef} className="scroll-mt-24 transition-transform duration-500 hover:-translate-y-1">
          <div className="w-full p-7 bg-zinc-950/25 border border-white/10 rounded-3xl backdrop-blur-3xl backdrop-saturate-[180%] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.12)]">
            <span className="text-[8px] uppercase tracking-[0.35em] text-red-500 font-black block mb-2">Pillar Two</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-md">Core Values</h2>
            <div className="space-y-4 text-left text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.02] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"><span className="text-base shrink-0">🛡️</span><p><strong>Leadership:</strong> Cultivating baseline accountability and confidence required to direct positive local change.</p></div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.02] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"><span className="text-base shrink-0">📊</span><p><strong>Accountability:</strong> Owning personal choices, academic standard metrics, and athletic discipline requirements.</p></div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.02] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"><span className="text-base shrink-0">🤝</span><p><strong>Service:</strong> Giving back via holiday food drives, school supply distributions, and active youth volunteerism.</p></div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.02] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"><span className="text-base shrink-0">🏈</span><p><strong>Discipline:</strong> Translating athletic rigor directly into focused classroom performance and daily execution.</p></div>
            </div>
          </div>
        </div>

        {/* SECTION 3: MEET OUR TEAM */}
        <div ref={teamRef} className="scroll-mt-24 transition-transform duration-500 hover:-translate-y-1">
          <div className="w-full p-7 bg-zinc-950/25 border border-white/10 rounded-3xl backdrop-blur-3xl backdrop-saturate-[180%] space-y-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.12)]">
            <div className="text-left">
              <span className="text-[8px] uppercase tracking-[0.35em] text-red-500 font-black block mb-2">Pillar Three</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-md">Meet Our Team</h2>
            </div>
            
            <div className="space-y-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-left border-t border-white/10 pt-6 first:border-0 first:pt-0 group/member">
                  
                  {/* METALLIC PHOTO SLOT FRAME CONTAINER */}
                  <div 
                    className="w-20 h-20 rounded-2xl bg-gradient-to-b from-zinc-800 via-zinc-950 to-zinc-900 border border-white/10 flex items-center justify-center shrink-0 relative overflow-hidden shadow-2xl group-hover/member:border-white/20 transition-colors duration-300"
                    style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.8)' }}
                  >
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/member:scale-105" />
                    ) : (
                      <div className="flex flex-col items-center gap-1 opacity-30 group-hover/member:opacity-60 transition-opacity">
                        <span className="text-lg">👤</span>
                        <span className="text-[7px] uppercase tracking-widest font-black text-zinc-400">Photo Slot</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08] pointer-events-none" />
                  </div>

                  {/* DETAILS SPOTS FOR ADMIN EDITABILITY */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="font-black text-white uppercase text-sm tracking-wide transition-colors group-hover/member:text-red-400">{member.name}</h3>
                    <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-red-500 block mt-1 mb-2 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full inline-block">{member.role}</span>
                    <p className="text-xs text-zinc-400 font-semibold leading-relaxed tracking-wide pt-1">
                      {member.bio}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BOUNDARY */}
      <div className="w-full text-center mt-16 relative z-30">
        <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-black opacity-30">
          Building Stronger Foundations © 2026
        </span>
      </div>

    </div>
  );
}