import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumCrimsonBackdrop from '../components/premium/PremiumCrimsonBackdrop';
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

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Sticky nav — same pattern as AboutDetails / ProgramDetails */}
        <div className="sticky top-0 z-50 flex justify-center border-b border-white/[0.06] bg-[#0a0406]/55 px-4 py-4 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
          <div className="flex w-full max-w-xl items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-full border border-white/[0.09] bg-zinc-950/50 px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-zinc-400 backdrop-blur-xl transition-all hover:scale-105 hover:text-white active:scale-95"
            >
              ← Back
            </button>
            <span className="rounded-full border border-white/[0.07] bg-zinc-950/45 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 backdrop-blur-md">
              Portal System v3.2
            </span>
          </div>
        </div>

        <main className="relative z-10 mx-auto w-full max-w-xl px-4 py-10 sm:px-8 sm:py-14 md:max-w-2xl">
          <header className="mb-10 text-center">
            <span className="bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-[8px] font-black uppercase tracking-[0.4em] text-transparent opacity-72">
              Schedules & Action
            </span>
            <h1 className="mt-3 bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-4xl font-black uppercase leading-none tracking-tighter text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
              FOUNDATION
            </h1>
            <p
              className="mt-3 bg-gradient-to-r from-red-800 via-red-700 to-red-900 bg-clip-text text-[10px] font-black uppercase tracking-[0.35em] text-transparent"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(127,29,29,0.4))' }}
            >
              EVENTS
            </p>
          </header>

          {/* Same vertical spread as AboutDetails: space-y-14 / sm:space-y-20 + alternating offsets */}
          <div className="relative space-y-20 pb-16 sm:space-y-28">
            {/* Card 1: Featured Flyer — offset right */}
            <div className="sm:ml-auto sm:max-w-[94%] md:-mr-6 lg:-mr-10">
              <SmokyGlassSurface
                glowColor="rgba(127, 29, 29, 0.3)"
                edgeAccent="rgba(153, 27, 27, 0.48)"
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  Featured Track
                </span>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                    {promotionalFlyer.title}
                  </h2>
                  <span className="rounded-md border border-white/[0.06] bg-zinc-950/60 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-red-800 shadow-inner">
                    Next Track
                  </span>
                </div>

                <div className="relative mb-4 flex h-28 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-inner">
                  {promotionalFlyer.imageUrl ? (
                    <img
                      src={promotionalFlyer.imageUrl}
                      alt={promotionalFlyer.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 opacity-25">
                      <span className="text-lg">🖼️</span>
                      <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500">
                        Featured Promotional Flyer Slot
                      </span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.05]" />
                </div>

                <span className="mb-2 block text-[8px] font-extrabold uppercase tracking-wider text-zinc-600">
                  {promotionalFlyer.subtitle}
                </span>
                <p className="mb-5 text-left text-xs font-medium leading-relaxed tracking-wide text-zinc-400 sm:text-sm">
                  {promotionalFlyer.description}
                </p>
                <a
                  href={registrationLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full rounded-xl bg-white py-3 text-center text-[9px] font-black uppercase tracking-widest text-black shadow-xl shadow-black/40 transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98]"
                >
                  {promotionalFlyer.actionText}
                </a>
              </SmokyGlassSurface>
            </div>

            {/* Card 2: Upcoming Calendar — offset left */}
            <div className="sm:mr-auto sm:max-w-[94%] md:-ml-6 lg:-ml-10">
              <SmokyGlassSurface
                glowColor="rgba(90, 10, 18, 0.3)"
                edgeAccent="rgba(127, 29, 29, 0.42)"
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  Schedule Hub
                </span>
                <h2 className="mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                  Upcoming Calendar
                </h2>

                <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="min-w-[110px] text-sm font-black uppercase tracking-widest text-zinc-200">
                      {monthNames[currentMonth]} {currentYear}
                    </h3>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-black transition-all hover:bg-white/10 active:scale-90"
                      >
                        ◀
                      </button>
                      <button
                        type="button"
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
                      type="button"
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
              </SmokyGlassSurface>
            </div>

            {/* Card 3: Special Guests — offset right */}
            <div className="sm:ml-auto sm:max-w-[94%] md:-mr-6 lg:-mr-10">
              <SmokyGlassSurface
                glowColor="rgba(127, 29, 29, 0.28)"
                edgeAccent="rgba(153, 27, 27, 0.45)"
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  Guest Roster
                </span>
                <h2 className="mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                  Special Guests
                </h2>

                <div className="space-y-6">
                  {specialGuests.map((guest) => (
                    <div
                      key={guest.id}
                      className="group/guest flex flex-col items-center gap-5 border-t border-white/10 pt-6 text-left first:border-0 first:pt-0 sm:flex-row sm:items-start"
                    >
                      <div
                        className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-800 via-zinc-950 to-zinc-900 shadow-2xl transition-colors duration-300 group-hover/guest:border-white/20"
                        style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.8)' }}
                      >
                        {guest.imageUrl ? (
                          <img
                            src={guest.imageUrl}
                            alt={guest.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover/guest:scale-105"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-1 opacity-30 transition-opacity group-hover/guest:opacity-60">
                            <span className="text-lg">👤</span>
                            <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500">
                              Photo Slot
                            </span>
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08]" />
                      </div>

                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                          <h3 className="text-sm font-black uppercase tracking-wide text-white transition-colors group-hover/guest:text-red-800">
                            {guest.name}
                          </h3>
                          <span className="rounded border border-white/[0.06] bg-zinc-950 px-2 py-0.5 text-[7px] font-black uppercase tracking-widest text-zinc-600">
                            {guest.metric}
                          </span>
                        </div>
                        <span className="mt-1 inline-block rounded-full border border-red-900/30 bg-red-900/15 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-800 sm:text-[10px]">
                          {guest.background}
                        </span>
                        <p className="pt-2 text-xs font-semibold leading-relaxed tracking-wide text-zinc-500">
                          {guest.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </SmokyGlassSurface>
            </div>

            {/* Card 4: Registration Hub — offset left */}
            <div className="sm:mr-auto sm:max-w-[94%] md:-ml-6 lg:-ml-10">
              <SmokyGlassSurface
                glowColor="rgba(90, 10, 18, 0.34)"
                edgeAccent="rgba(127, 29, 29, 0.42)"
                innerClassName="p-6 sm:p-7"
              >
                <span className="mb-2 block text-[8px] font-black uppercase tracking-[0.35em] text-red-800">
                  Action Portal
                </span>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-tighter text-transparent">
                    Registration Hub
                  </h2>
                  <span className="text-lg">📝</span>
                </div>
                <p className="mb-5 text-left text-xs font-medium leading-relaxed tracking-wide text-zinc-400 sm:text-sm">
                  {registrationLink.label}
                </p>
                <a
                  href={registrationLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full rounded-xl bg-white py-3 text-center text-[9px] font-black uppercase tracking-widest text-black shadow-xl shadow-black/40 transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98]"
                >
                  Register Now
                </a>
              </SmokyGlassSurface>
            </div>
          </div>
        </main>

        <footer className="relative z-10 pb-6 text-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 opacity-50">
            Building Stronger Foundations © 2026
          </span>
        </footer>
      </div>
    </div>
  );
}
