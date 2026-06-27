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
    <div className="min-h-screen bg-[#040408] text-white overflow-y-auto relative pb-16 select-none">
      
      {/* 🔮 GLASSMORPHISM ENGINE BACKGROUND (Frosted Plates + Silver Chrome Orbs) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[5vw] w-[45vw] h-[45vw] bg-zinc-200/20 rounded-full blur-[30px] animate-[pulse_8s_infinite_alternate]" />
        <div className="absolute top-[45%] -right-[10vw] w-[55vw] h-[55vw] bg-zinc-400/10 rounded-full blur-[50px] animate-[pulse_6s_infinite_alternate_1s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#040408_95%)]" />
      </div>

      {/* STICKY UTILITY HEADER */}
      <div className="sticky top-0 w-full z-50 px-4 py-4 bg-black/20 backdrop-blur-md border-b border-white/5 flex justify-center">
        <div className="w-full max-w-xl flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="text-[9px] uppercase font-black tracking-widest text-zinc-300 hover:text-white px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
          >
            ← Back
          </button>
          <div className="flex gap-2">
            <button onClick={() => storyRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-[8px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-3 py-1.5 bg-white/5 rounded-lg transition-all">Story</button>
            <button onClick={() => valuesRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-[8px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-3 py-1.5 bg-white/5 rounded-lg transition-all">Values</button>
            <button onClick={() => teamRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-[8px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-3 py-1.5 bg-white/5 rounded-lg transition-all">Team</button>
          </div>
        </div>
      </div>

      {/* MASTER SCROLL SHEET CONTAINER */}
      <div className="w-full max-w-xl mx-auto px-4 relative z-10 space-y-12 mt-6">
        
        {/* SECTION 1: OUR STORY */}
        <div ref={storyRef} className="scroll-mt-24">
          <div 
            className="w-full p-6 bg-white/[0.02] rounded-3xl backdrop-blur-3xl backdrop-saturate-[200%]"
            style={{
              border: '1px solid transparent',
              borderImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 50%, transparent) 1',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <span className="text-[8px] uppercase tracking-[0.3em] text-red-500 font-black block mb-2">Pillar One</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">Our Story</h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed tracking-wide text-left">
              Founded and directed by Jazmond Strong, the Strong Impact Foundation was established to bridge critical gaps within community development, youth alignment, and physical performance training. By building an unshakeable athletic foundation combined with strict tactical educational tracking modules, the program challenges regional youth to discover excellence both on the field gridiron and inside the classroom theater.
            </p>
          </div>
        </div>

        {/* SECTION 2: CORE VALUES */}
        <div ref={valuesRef} className="scroll-mt-24">
          <div 
            className="w-full p-6 bg-white/[0.02] rounded-3xl backdrop-blur-3xl backdrop-saturate-[200%]"
            style={{
              border: '1px solid transparent',
              borderImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 50%, transparent) 1',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <span className="text-[8px] uppercase tracking-[0.3em] text-red-500 font-black block mb-2">Pillar Two</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">Core Values</h2>
            <div className="space-y-4 text-left text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
              <p><strong>🛡️ Leadership:</strong> Cultivating baseline accountability and confidence required to direct positive local change.</p>
              <p><strong>📊 Accountability:</strong> Owning personal choices, academic standard metrics, and athletic discipline requirements.</p>
              <p><strong>🤝 Service:</strong> Giving back via holiday food drives, school supply distributions, and active youth volunteerism.</p>
              <p><strong>🏈 Discipline:</strong> Translating athletic rigor directly into focused classroom performance and continuous daily execution.</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: MEET OUR TEAM */}
        <div ref={teamRef} className="scroll-mt-24">
          <div 
            className="w-full p-6 bg-white/[0.02] rounded-3xl backdrop-blur-3xl backdrop-saturate-[200%] space-y-6"
            style={{
              border: '1px solid transparent',
              borderImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 50%, transparent) 1',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="text-left">
              <span className="text-[8px] uppercase tracking-[0.3em] text-red-500 font-black block mb-2">Pillar Three</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">Meet Our Team</h2>
            </div>
            
            <div className="space-y-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-left border-t border-white/5 pt-5 first:border-0 first:pt-0">
                  
                  {/* METALLIC PHOTO SLOT FRAME CONTAINER */}
                  <div 
                    className="w-20 h-20 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 relative shadow-inner"
                    style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.8)' }}
                  >
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <div className="text-[8px] uppercase tracking-widest font-black text-zinc-500">Photo Slot</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                  </div>

                  {/* DETAILS SPOTS FOR ADMIN EDITIBILITY */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-white uppercase text-sm tracking-wide">{member.name}</h3>
                    <span className="text-[10px] uppercase font-black tracking-widest text-red-500 block mt-1 mb-2">{member.role}</span>
                    <p className="text-xs text-zinc-400 font-semibold leading-relaxed tracking-wide">{member.bio}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BOUNDARY */}
      <div className="w-full text-center mt-12">
        <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-black opacity-30">
          Building Stronger Foundations © 2026
        </span>
      </div>

    </div>
  );
}