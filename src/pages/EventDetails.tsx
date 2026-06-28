import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumCrimsonBackdrop from '../components/premium/PremiumCrimsonBackdrop';
import GlassBasePlate from '../components/premium/GlassBasePlate';
import FloatingGlassCard from '../components/premium/FloatingGlassCard';
import SmokyGlassSurface from '../components/premium/SmokyGlassSurface';

interface PromotionalFlyer {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  actionText: string;
}

interface CalendarEvent {
  id: string;
  date: string;
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

  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(5);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const promotionalFlyer: PromotionalFlyer = {
    title: 'Summer Development Camp',
    subtitle: 'Elite Athletic Skills Showcase',
    description:
      'Join collegiate and pro athlete coaches for intense position-specific training loops, speed mechanics work, and situational scrimmages.',
    imageUrl: '',
    actionText: 'Secure Placement Ring',
  };

  const calendarEvents: CalendarEvent[] = [
    {
      id: 'ev-1',
      date: '2026-06-15',
      title: 'Youth Football Camp',
      time: '09:00 AM - 01:00 PM',
      description: 'Fundamental skill circuits, footwork drill pacing, and tactical team sets.',
    },
    {
      id: 'ev-2',
      date: '2026-06-22',
      title: 'Mentorship Open Seminar',
      time: '06:00 PM - 08:00 PM',
      description: 'Leadership strategy discussions, accountability checking, and academic preparation mapping.',
    },
    {
      id: 'ev-3',
      date: '2026-07-10',
      title: 'Speed Velocity Mechanics Camp',
      time: '10:00 AM - 02:00 PM',
      description: 'Explosive acceleration training and deceleration mechanics breakdown tracks.',
    },
  ];

  const specialGuests: SpecialGuest[] = [
    {
      id: 1,
      name: 'Guest Coach One',
      background: 'Division 1 Athlete',
      bio: 'Brings elite secondary-coverage route tactical knowledge and off-season training rigor directly to youth camps.',
      imageUrl: '',
      metric: 'NCAA D1',
    },
    {
      id: 2,
      name: 'Guest Coach Two',
      background: 'Professional Consultant',
      bio: 'Focuses on explosive first-step velocity metrics, mechanics optimization, and athletic character coaching.',
      imageUrl: '',
      metric: 'PRO LEVEL',
    },
  ];

  const registrationLink: RegistrationLink = {
    label: 'Looking to lock in your roster spot?',
    url: 'https://forms.google.com',
  };

  const handlePrevMonth = (): void => {
    setSelectedEvent(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (): void => {
    setSelectedEvent(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const calendarRows = Math.ceil((daysInMonth + firstDayIndex) / 7);

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#0a0406] font-sans text-white selection:bg-red-900/40">
      <PremiumCrimsonBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col justify-between p-4 sm:p-6">
        <header className="mx-auto mt-2 flex w-full max-w-xl items-center justify-between md:max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-white/[0.09] bg-zinc-950/50 px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-zinc-400 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:text-white active:scale-95"
          >
            ← Back
          </button>
          <span className="rounded-full border border-white/[0.07] bg-zinc-950/45 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-500 backdrop-blur-md">
            Portal System v3.2
          </span>
        </header>

        <main className="relative z-10 mx-auto w-full max-w-xl px-2 py-10 sm:px-10 sm:py-16 md:max-w-2xl md:px-14 md:py-20">
          <div className="relative min-h-[640px] pb-8 sm:min-h-[600px]">
            {/* Flyer — floating top-right */}
            <div className="relative z-30 mb-8 w-full sm:absolute sm:-right-8 sm:-top-4 sm:mb-0 sm:w-[190px] md:-right-14 md:-top-6 md:w-[200px] lg:-right-20 lg:-top-8 lg:w-[210px]">
              <SmokyGlassSurface
                glowColor="rgba(127, 29, 29, 0.32)"
                edgeAccent="rgba(153, 27, 27, 0.5)"
                innerClassName="p-4"
              >
                <div className="relative mb-3 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-zinc-800 to-zinc-950 shadow-inner">
                  {promotionalFlyer.imageUrl ? (
                    <img
                      src={promotionalFlyer.imageUrl}
                      alt={promotionalFlyer.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 opacity-30">
                      <span className="text-xl">🖼️</span>
                      <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        Featured Promotional Flyer Slot
                      </span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
                </div>

                <div className="mb-2 flex items-start justify-between gap-2">
                  <h2 className="text-sm font-black uppercase tracking-tight text-white">
                    {promotionalFlyer.title}
                  </h2>
                  <span className="shrink-0 rounded-full border border-white/[0.06] bg-zinc-950/70 px-2 py-0.5 text-[7px] font-black uppercase tracking-widest text-red-800">
                    Next Track
                  </span>
                </div>
                <span className="mb-1 block text-[8px] font-extrabold uppercase tracking-wider text-zinc-600">
                  {promotionalFlyer.subtitle}
                </span>
                <p className="mb-3 text-[9px] font-medium leading-relaxed tracking-wide text-zinc-500">
                  {promotionalFlyer.description}
                </p>
                <a
                  href={registrationLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full rounded-xl bg-white py-2.5 text-center text-[8px] font-black uppercase tracking-widest text-black shadow-xl shadow-black/40 transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98]"
                >
                  {promotionalFlyer.actionText}
                </a>
              </SmokyGlassSurface>
            </div>

            <GlassBasePlate className="max-w-lg">
              <div className="mb-6 text-left">
                <span className="mb-2 block text-[9px] font-black uppercase tracking-[0.35em] text-red-800">
                  Schedules & Action
                </span>
                <h1 className="bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-4xl font-black uppercase leading-none tracking-tighter text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
                  FOUNDATION
                  <br />
                  <span className="bg-gradient-to-r from-red-800 via-red-700 to-red-900 bg-clip-text text-transparent">
                    EVENTS
                  </span>
                </h1>
              </div>

              {/* Calendar */}
              <div className="text-left">
                <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="min-w-[110px] text-sm font-black uppercase tracking-widest text-zinc-200">
                      {monthNames[currentMonth]} {currentYear}
                    </h3>
                    <div className="flex gap-1">
                      <button
                        onClick={handlePrevMonth}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-black transition-all hover:bg-white/10 active:scale-90"
                      >
                        ◀
                      </button>
                      <button
                        onClick={handleNextMonth}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-black transition-all hover:bg-white/10 active:scale-90"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                  <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-zinc-600">
                    Live Agenda
                  </span>
                </div>

                <div className="mb-2 grid grid-cols-7 gap-1.5 text-center text-[10px] font-black text-zinc-600">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, dIdx) => (
                    <div key={dIdx} className="py-1 tracking-widest">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  {Array.from({ length: calendarRows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-7 gap-1.5">
                      {Array.from({ length: 7 }).map((_, colIndex) => {
                        const dayNumber = rowIndex * 7 + colIndex - firstDayIndex + 1;
                        const isCurrentMonthDay = dayNumber > 0 && dayNumber <= daysInMonth;

                        const paddedDay = dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
                        const paddedMonth =
                          currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
                        const fullDateKey = `${currentYear}-${paddedMonth}-${paddedDay}`;

                        const activeDayEvent = calendarEvents.find((ev) => ev.date === fullDateKey);

                        return (
                          <div
                            key={colIndex}
                            onClick={() => activeDayEvent && setSelectedEvent(activeDayEvent)}
                            className={`relative flex h-11 flex-col justify-between rounded-xl border p-1.5 transition-all ${
                              isCurrentMonthDay
                                ? activeDayEvent
                                  ? 'cursor-pointer border-red-900/40 bg-red-900/15 shadow-[0_0_15px_rgba(127,29,29,0.12)] hover:bg-red-900/25'
                                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                                : 'pointer-events-none border-transparent bg-transparent opacity-0'
                            }`}
                          >
                            <span
                              className={`text-[10px] font-bold leading-none ${activeDayEvent ? 'font-black text-white' : 'text-zinc-500'}`}
                            >
                              {isCurrentMonthDay ? dayNumber : ''}
                            </span>
                            {activeDayEvent && (
                              <div className="h-1.5 w-1.5 animate-pulse self-end rounded-full bg-red-900 [filter:drop-shadow(0_0_3px_#7f1d1d)]" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {selectedEvent ? (
                  <div className="relative mt-4 overflow-hidden rounded-2xl border border-red-900/25 bg-zinc-950/55 p-4">
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="absolute right-3 top-3 text-[9px] font-black uppercase tracking-widest text-zinc-600 transition-colors hover:text-white"
                    >
                      ✕ Clear
                    </button>
                    <div className="mb-2 inline-block rounded border border-red-900/25 bg-red-900/15 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-red-800">
                      {selectedEvent.time}
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-tight text-white">
                      {selectedEvent.title}
                    </h4>
                    <p className="mt-1 text-[11px] font-medium leading-relaxed tracking-wide text-zinc-500">
                      {selectedEvent.description}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 flex items-center space-x-3 rounded-2xl border border-white/[0.06] bg-zinc-950/35 p-3.5 text-zinc-600">
                    <span className="text-xs">📅</span>
                    <span className="text-[10px] font-bold tracking-wide">
                      Select any highlighted operational camp marker to pull active schedules.
                    </span>
                  </div>
                )}
              </div>

              {/* Special Guests */}
              <div className="mt-8 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-600">
                  Special Guest Roster
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {specialGuests.map((guest) => (
                    <div
                      key={guest.id}
                      className="group/guest flex h-[175px] flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/10"
                    >
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-inner">
                            {guest.imageUrl ? (
                              <img
                                src={guest.imageUrl}
                                alt={guest.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-xs opacity-40 transition-opacity group-hover/guest:opacity-70">
                                👤
                              </span>
                            )}
                          </div>
                          <span className="rounded border border-white/[0.06] bg-zinc-950 px-2 py-0.5 text-[7px] font-black uppercase tracking-widest text-zinc-600 transition-colors group-hover/guest:text-red-800">
                            {guest.metric}
                          </span>
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-wide text-zinc-200 group-hover/guest:text-white">
                          {guest.name}
                        </h3>
                        <span className="mt-0.5 block text-[8px] font-black uppercase tracking-wide text-red-800/80">
                          {guest.background}
                        </span>
                        <p className="mt-2 line-clamp-3 text-[10px] font-medium leading-snug tracking-wide text-zinc-500">
                          {guest.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassBasePlate>

            {/* Registration — floating bottom-left */}
            <FloatingGlassCard
              href={registrationLink.url}
              glowColor="rgba(90, 10, 18, 0.34)"
              edgeAccent="rgba(127, 29, 29, 0.42)"
              className="relative z-30 mt-8 w-full sm:absolute sm:-bottom-16 sm:-left-10 sm:mt-0 sm:w-[200px] md:-bottom-20 md:-left-16 md:w-[210px] lg:-bottom-24 lg:-left-24"
              label={
                <>
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600 transition-colors duration-500 group-hover:text-red-800">
                    Registration
                  </span>
                  <span className="text-xs">📝</span>
                </>
              }
              title="Register Now"
              description={registrationLink.label}
            />
          </div>
        </main>

        <footer className="relative z-10 mt-6 pb-2 text-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 opacity-50">
            Strong Impact Core Framework • 2026
          </span>
        </footer>
      </div>
    </div>
  );
}