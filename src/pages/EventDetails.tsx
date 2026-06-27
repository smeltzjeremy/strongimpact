import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PromotionalFlyer {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  actionText: string;
}

interface CalendarEvent {
  id: string;
  date: string; // Formatting Pattern: YYYY-MM-DD
  title: string;
  time: string;
  description: string;
}

interface SpecialGuest {
  id: number;
  name: string;
  background: string;
  bio: string;
  imageUrl: string;
  metric: string;
}

interface RegistrationLink {
  label: string;
  url: string;
}

export default function EventDetails(): React.JSX.Element {
  const navigate = useNavigate();

  // 🗓️ REAL CALENDAR TIME-TRACKING ENGINE STATE
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(5); // June (0-indexed tracking structure)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // 🛠️ ADMIN DATA BLOCK
  const promotionalFlyer: PromotionalFlyer = {
    title: "Summer Development Camp",
    subtitle: "Elite Athletic Skills Showcase",
    description: "Join collegiate and pro athlete coaches for intense position-specific training loops, speed mechanics work, and situational scrimmages.",
    imageUrl: "", 
    actionText: "Secure Placement Ring"
  };

  const calendarEvents: CalendarEvent[] = [
    {
      id: "ev-1",
      date: "2026-06-15",
      title: "Youth Football Camp",
      time: "09:00 AM - 01:00 PM",
      description: "Fundamental skill circuits, footwork drill pacing, and tactical team sets."
    },
    {
      id: "ev-2",
      date: "2026-06-22",
      title: "Mentorship Open Seminar",
      time: "06:00 PM - 08:00 PM",
      description: "Leadership strategy discussions, accountability checking, and academic preparation mapping."
    },
    {
      id: "ev-3",
      date: "2026-07-10",
      title: "Speed Velocity Mechanics Camp",
      time: "10:00 AM - 02:00 PM",
      description: "Explosive acceleration training and deceleration mechanics breakdown tracks."
    }
  ];

  const specialGuests: SpecialGuest[] = [
    {
      id: 1,
      name: "Guest Coach One",
      background: "Division 1 Athlete",
      bio: "Brings elite secondary-coverage route tactical knowledge and off-season training rigor directly to youth camps.",
      imageUrl: "",
      metric: "NCAA D1"
    },
    {
      id: 2,
      name: "Guest Coach Two",
      background: "Professional Consultant",
      bio: "Focuses on explosive first-step velocity metrics, mechanics optimization, and athletic character coaching.",
      imageUrl: "",
      metric: "PRO LEVEL"
    }
  ];

  const registrationLink: RegistrationLink = {
    label: "Looking to lock in your roster spot?",
    url: "https://forms.google.com"
  };

  // 🗓️ INTERACTIVE FLIP MECHANICS
  const handlePrevMonth = () => {
    setSelectedEvent(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedEvent(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const calendarRows = Math.ceil((daysInMonth + firstDayIndex) / 7);

  return (
    <div className="min-h-screen bg-[#040406] text-white flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto selection:bg-red-500/30 font-sans relative select-none">
      
      {/* 🔮 MULTI-LAYERED GLOW ENGINE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#040406]">
        <div className="absolute top-[-10%] right-[-10%] w-[85vw] h-[85vw] bg-radial from-red-600/20 via-red-950/5 to-transparent rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-15%] left-[-15%] w-[80vw] h-[80vw] bg-radial from-zinc-700/15 via-zinc-900/5 to-transparent rounded-full blur-[140px] mix-blend-screen" />

        {/* 3D NEON TUBE SIMULATION */}
        <svg className="absolute top-[20%] left-[-10%] w-[120%] h-[60%] opacity-40 mix-blend-screen blur-[1px]" viewBox="0 0 1000 500" fill="none">
          <path 
            d="M -50 150 Q 250 450 500 200 T 1050 300" 
            stroke="url(#crimsonGradient)" strokeWidth="28" strokeLinecap="round"
            className="opacity-70 animate-[pulse_6s_infinite_alternate]"
          />
          <defs>
            <linearGradient id="crimsonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#991b1b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      {/* HEADER BAR CONTROLS */}
      <div className="w-full max-w-xl flex justify-between items-center mt-2 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="text-[9px] uppercase font-black tracking-widest text-zinc-400 hover:text-white px-5 py-2.5 bg-zinc-900/40 border border-white/10 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
        >
          ← Back
        </button>
        <div className="px-3.5 py-1.5 bg-black/40 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-500 backdrop-blur-md">
          Portal System v3.2
        </div>
      </div>

      {/* MAIN HUB */}
      <div className="w-full max-w-xl flex flex-col justify-center items-center z-10 py-6 space-y-8">
        
        {/* PREMIUM METALLIC TYPOGRAPHY BANNER */}
        <div className="w-full text-left px-1">
          <span className="text-[9px] uppercase tracking-[0.35em] text-red-500 font-black block mb-2">Schedules & Action</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 drop-shadow-xl leading-none">
            FOUNDATION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600 font-black">EVENTS</span>
          </h1>
        </div>

        {/* 1. FLYER SHOWCASE MODULE */}
        <div className="w-full p-5 bg-gradient-to-b from-zinc-900/40 via-zinc-950/60 to-zinc-950/90 border border-white/10 rounded-[28px] backdrop-blur-3xl backdrop-saturate-[180%] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden text-left">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.04] via-transparent to-transparent pointer-events-none" />
          
          <div className="w-full h-44 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden shadow-inner mb-5">
            {promotionalFlyer.imageUrl ? (
              <img src={promotionalFlyer.imageUrl} alt={promotionalFlyer.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1.5 opacity-30 group-hover:opacity-50 transition-opacity">
                <span className="text-2xl">🖼️</span>
                <span className="text-[8px] uppercase tracking-[0.25em] font-black text-zinc-400">Featured Promotional Flyer Slot</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
          </div>

          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-black uppercase tracking-tight text-white">{promotionalFlyer.title}</h2>
            <span className="text-[9px] uppercase tracking-widest bg-zinc-900/80 border border-white/5 px-3 py-1 rounded-full font-black text-red-400 [filter:drop-shadow(0_0_4px_#ef4444)]">
              Next Track
            </span>
          </div>
          
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-500 block mb-2">{promotionalFlyer.subtitle}</span>
          <p className="text-xs text-zinc-400 font-medium leading-relaxed tracking-wide mb-6">{promotionalFlyer.description}</p>

          <a href={registrationLink.url} target="_blank" rel="noreferrer" className="w-full block text-center py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] shadow-xl shadow-black/40">
            {promotionalFlyer.actionText}
          </a>
        </div>

        {/* 2. DYNAMIC CALENDAR INTERACTIVE ENGINE (With Flip Controls Built-in) */}
        <div className="w-full p-5 bg-zinc-900/20 border border-white/10 rounded-[28px] backdrop-blur-3xl shadow-2xl text-left">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-100 min-w-[110px]">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              {/* INTERACTIVE CALENDAR SWITCH DIRECTION CAPSULES */}
              <div className="flex gap-1">
                <button 
                  onClick={handlePrevMonth}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black transition-all active:scale-90"
                >
                  ◀
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black transition-all active:scale-90"
                >
                  ▶
                </button>
              </div>
            </div>
            <span className="text-[8px] uppercase tracking-widest font-black text-zinc-500 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
              Live Agenda
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-black text-zinc-500 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, dIdx) => (
              <div key={dIdx} className="py-1 tracking-widest">{day}</div>
            ))}
          </div>

          <div className="space-y-1.5">
            {Array.from({ length: calendarRows }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: 7 }).map((_, colIndex) => {
                  const dayNumber = rowIndex * 7 + colIndex - firstDayIndex + 1;
                  const isCurrentMonthDay = dayNumber > 0 && dayNumber <= daysInMonth;
                  
                  const paddedDay = dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
                  const paddedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
                  const fullDateKey = `${currentYear}-${paddedMonth}-${paddedDay}`;
                  
                  const activeDayEvent = calendarEvents.find(ev => ev.date === fullDateKey);

                  return (
                    <div 
                      key={colIndex}
                      onClick={() => activeDayEvent && setSelectedEvent(activeDayEvent)}
                      className={`h-11 rounded-xl border flex flex-col justify-between p-1.5 transition-all relative ${
                        isCurrentMonthDay 
                          ? activeDayEvent 
                            ? 'bg-red-500/10 border-red-500/40 cursor-pointer hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                            : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                          : 'bg-transparent border-transparent opacity-0 pointer-events-none'
                      }`}
                    >
                      <span className={`text-[10px] font-bold leading-none ${activeDayEvent ? 'text-white font-black' : 'text-zinc-400'}`}>
                        {isCurrentMonthDay ? dayNumber : ''}
                      </span>
                      {activeDayEvent && (
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 self-end [filter:drop-shadow(0_0_3px_#ef4444)] animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {selectedEvent ? (
            <div className="mt-4 p-4 bg-zinc-950/60 border border-red-500/20 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 relative overflow-hidden">
              <button onClick={() => setSelectedEvent(null)} className="absolute top-3 right-3 text-[9px] uppercase font-black tracking-widest text-zinc-500 hover:text-white transition-colors">✕ Clear</button>
              <div className="text-[8px] uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-red-400 font-black inline-block mb-2">{selectedEvent.time}</div>
              <h4 className="text-sm font-black uppercase tracking-tight text-white">{selectedEvent.title}</h4>
              <p className="text-[11px] text-zinc-400 font-medium leading-relaxed tracking-wide mt-1">{selectedEvent.description}</p>
            </div>
          ) : (
            <div className="mt-4 p-3.5 bg-zinc-950/30 border border-white/5 rounded-2xl flex items-center space-x-3 text-zinc-500">
              <span className="text-xs">📅</span>
              <span className="text-[10px] font-bold tracking-wide">Select any highlighted operational camp marker to pull active schedules.</span>
            </div>
          )}
        </div>

        {/* 3. SPECIAL GUESTS DECK */}
        <div className="w-full space-y-3">
          <div className="text-left px-1">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">Special Guest Roster</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {specialGuests.map((guest, index) => (
              <div key={index} className="p-4 bg-zinc-900/30 border border-white/5 rounded-2xl backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between text-left h-[175px] transition-all duration-500 hover:-translate-y-1 hover:border-white/10 group/guest">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
                      {guest.imageUrl ? <img src={guest.imageUrl} alt={guest.name} className="w-full h-full object-cover" /> : <span className="text-xs opacity-40 group-hover/guest:opacity-70 transition-opacity">👤</span>}
                    </div>
                    <span className="text-[7px] uppercase tracking-widest font-black px-2 py-0.5 rounded bg-zinc-950 border border-white/5 text-zinc-400 group-hover/guest:text-red-400 transition-colors">{guest.metric}</span>
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-wide text-zinc-100 group-hover/guest:text-white">{guest.name}</h3>
                  <span className="text-[8px] font-black uppercase text-red-500/80 tracking-wide block mt-0.5">{guest.background}</span>
                  <p className="text-[10px] text-zinc-400 font-medium leading-snug mt-2 line-clamp-3 tracking-wide">{guest.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. REGISTRATION HUB MODULE */}
        <div className="w-full p-3.5 bg-zinc-950/60 border border-white/5 rounded-2xl backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex items-center justify-between transition-all hover:border-white/10 text-left">
          <div className="flex items-center space-x-3 min-w-0">
            <span className="text-zinc-500 text-xs pl-1">📝</span>
            <span className="text-xs font-bold text-zinc-400 truncate tracking-wide">{registrationLink.label}</span>
          </div>
          <a href={registrationLink.url} target="_blank" rel="noreferrer" className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] uppercase font-black tracking-widest text-zinc-300 cursor-pointer hover:bg-white/10 transition-all text-center whitespace-nowrap">
            Register Now
          </a>
        </div>

      </div>

      <div className="w-full text-center pb-2 z-10 mt-6">
        <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-black opacity-40">Strong Impact Core Framework • 2026</span>
      </div>
    </div>
  );
}