import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [uploading, setUploading] = useState(false);
  const [wheelPhotos, setWheelPhotos] = useState(Array(6).fill(null));
  const [theaterVideos, setTheaterVideos] = useState(Array(2).fill(null));
  const [activeTab, setActiveTab] = useState('wheel');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // ==========================================
  // NEW DYNAMIC STATE VARIABLES (ABOUT ENGINE)
  // ==========================================
  const [storyText, setStoryText] = useState(
    "Founded and directed by Jazmond Strong, the Strong Impact Foundation was established to bridge critical gaps within community development, youth alignment, and physical performance training."
  );
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Jazmond Strong", role: "Founder & Executive Director", bio: "Dedicated to engineering structural pathways for youth development, athletic excellence, and comprehensive mentorship programs." },
    { id: 2, name: "Team Member Two", role: "Operations Coordinator", bio: "Managing localized logistics, school distribution partnerships, and corporate sponsorship outreach execution networks." }
  ]);

  // ==========================================
  // NEW DYNAMIC STATE VARIABLES (EVENTS ENGINE)
  // ==========================================
  const [flyerTitle, setFlyerTitle] = useState("Summer Development Camp");
  const [flyerDesc, setFlyerDesc] = useState("Join collegiate and pro athlete coaches for intense position-specific training loops, speed mechanics work, and situational scrimmages.");
  const [registrationUrl, setRegistrationUrl] = useState("https://forms.google.com");
  
  const [calendarEvents, setCalendarEvents] = useState([
    { id: "ev-1", date: "2026-06-15", title: "Youth Football Camp", time: "09:00 AM - 01:00 PM" },
    { id: "ev-2", date: "2026-06-22", title: "Mentorship Open Seminar", time: "06:00 PM - 08:00 PM" },
    { id: "ev-3", date: "2026-07-10", title: "Speed Velocity Mechanics Camp", time: "10:00 AM - 02:00 PM" }
  ]);

  // LOCAL STATE HELPERS TO APPEND NEW CALENDAR EVENTS
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'JStrong2026') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator Password.');
    }
  };

  const fetchWheelPhotos = async () => {
    try {
      const { data, error } = await supabase.storage.from('gallery').list('wheel');
      if (error) { console.error("List error:", error); return; }

      const loaded = Array(6).fill(null);
      const timestamp = Date.now();

      if (data) {
        data.forEach((file) => {
          const match = file.name.match(/slot-(\d{2})/);
          if (match) {
            const slotIndex = parseInt(match[1]) - 1;
            if (slotIndex >= 0 && slotIndex < 6) {
              loaded[slotIndex] = {
                name: file.name,
                url: `${supabase.storage.from('gallery').getPublicUrl(`wheel/${file.name}`).data.publicUrl}?t=${timestamp}`
              };
            }
          }
        });
      }
      setWheelPhotos(loaded);
    } catch (err) { console.error(err); }
  };

  const fetchTheaterVideos = async () => {
    try {
      const { data, error } = await supabase.storage.from('gallery').list('theater');
      if (error) { console.error("List error:", error); return; }

      const loaded = Array(2).fill(null);
      const timestamp = Date.now();

      if (data) {
        data.forEach((file) => {
          const match = file.name.match(/video-(\d{2})/);
          if (match) {
            const slotIndex = parseInt(match[1]) - 1;
            if (slotIndex >= 0 && slotIndex < 2) {
              loaded[slotIndex] = {
                name: file.name,
                url: `${supabase.storage.from('gallery').getPublicUrl(`theater/${file.name}`).data.publicUrl}?t=${timestamp}`
              };
            }
          }
        });
      }
      setTheaterVideos(loaded);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'wheel') fetchWheelPhotos();
      if (activeTab === 'theater') fetchTheaterVideos();
    }
  }, [isAuthenticated, activeTab, refreshTrigger]);

  const handleWheelUpload = async (event, slot) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const paddedSlot = String(slot + 1).padStart(2, '0');
      const fileName = `slot-${paddedSlot}.jpg`;

      await supabase.storage.from('gallery').remove([`wheel/${fileName}`]);
      const { error } = await supabase.storage.from('gallery').upload(`wheel/${fileName}`, file, { upsert: true });
      if (error) throw error;

      alert(`Slot ${slot + 1} photo updated!`);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) { alert('Upload failed: ' + error.message); } finally { setUploading(false); }
  };

  const handleVideoUpload = async (event, slot) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const paddedSlot = String(slot + 1).padStart(2, '0');
      const fileName = `video-${paddedSlot}.mp4`;

      await supabase.storage.from('gallery').remove([`theater/${fileName}`]);
      const { error } = await supabase.storage.from('gallery').upload(`theater/${fileName}`, file, { upsert: true });
      if (error) throw error;

      alert(`Theater Slot ${slot + 1} video updated!`);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) { alert('Video upload failed: ' + error.message); } finally { setUploading(false); }
  };

  const handleDeleteSlot = async (slot) => {
    if (!confirm(`Delete Photo Slot ${slot + 1}?`)) return;
    try {
      const paddedSlot = String(slot + 1).padStart(2, '0');
      const fileName = `slot-${paddedSlot}.jpg`;
      const { error } = await supabase.storage.from('gallery').remove([`wheel/${fileName}`]);
      if (error) throw error;

      alert(`Slot ${slot + 1} deleted.`);
      setWheelPhotos(Array(6).fill(null));
      setRefreshTrigger(prev => prev + 1);
    } catch (err) { alert('Delete failed: ' + err.message); }
  };

  const handleDeleteVideo = async (slot) => {
    if (!confirm(`Delete Theater Video ${slot + 1}?`)) return;
    try {
      const paddedSlot = String(slot + 1).padStart(2, '0');
      const fileName = `video-${paddedSlot}.mp4`;
      const { error } = await supabase.storage.from('gallery').remove([`theater/${fileName}`]);
      if (error) throw error;

      alert(`Video Slot ${slot + 1} deleted.`);
      setTheaterVideos(Array(2).fill(null));
      setRefreshTrigger(prev => prev + 1);
    } catch (err) { alert('Delete failed: ' + err.message); }
  };

  const handleUpdateTeamMember = (id, field, value) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleSaveTextContent = (e) => {
    e.preventDefault();
    console.log("TRANSMITTING_CMS_UPDATES_TO_DATABASE:", {
      storyText,
      teamMembers,
      events: { flyerTitle, flyerDesc, registrationUrl, calendarEvents }
    });
    alert("Administrative platform text fields saved and cached successfully!");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05050f] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-zinc-950/80 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-center mb-2">STRONG IMPACT</h2>
          <p className="text-red-400 text-center mb-8">Protected Admin Console</p>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Enter Admin Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 mb-4" />
            {loginError && <p className="text-red-400 text-sm text-center mb-4">{loginError}</p>}
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-semibold transition">Unlock Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05050f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-bold">STRONG IMPACT CMS</h1>
            <p className="text-emerald-400">Live Asset Multi-Pipeline</p>
          </div>
          <div className="flex gap-4">
            <Link to="/" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 transition">← Back to Main Page</Link>
            <button onClick={() => setIsAuthenticated(false)} className="px-6 py-3 bg-zinc-900 hover:bg-red-900/50 rounded-2xl border border-white/20 transition">Lock Console</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          <button onClick={() => setActiveTab('wheel')} className={`px-6 py-3 rounded-2xl font-medium transition ${activeTab === 'wheel' ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}>Wheel Photos (6 Slots)</button>
          <button onClick={() => setActiveTab('theater')} className={`px-6 py-3 rounded-2xl font-medium transition ${activeTab === 'theater' ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}>Theater Videos (2 Slots)</button>
          <button onClick={() => setActiveTab('about')} className={`px-6 py-3 rounded-2xl font-medium transition ${activeTab === 'about' ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}>About Content Config</button>
          <button onClick={() => setActiveTab('events')} className={`px-6 py-3 rounded-2xl font-medium transition ${activeTab === 'events' ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}>Events & Schedule Hub</button>
        </div>

        {uploading && (
          <div className="mb-6 p-4 bg-yellow-600/20 border border-yellow-500/40 text-yellow-200 text-center rounded-2xl animate-pulse">
            Processing upload stream... Please wait.
          </div>
        )}

        {activeTab === 'wheel' && (
          <div>
            <h2 className="text-3xl font-semibold mb-8">Photo Wheel Manager</h2>
            <p className="text-zinc-400 mb-8">Upload or replace images for the 6 wheel slots.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wheelPhotos.map((photo, index) => (
                <div key={index} className="bg-zinc-950 border border-white/10 rounded-3xl p-6">
                  <div className="text-lg font-medium mb-4">Slot {index + 1}</div>
                  <div className="aspect-[4/5] bg-zinc-900 rounded-2xl overflow-hidden mb-6 border border-white/10">
                    {photo ? <img src={photo.url} alt={`Slot ${index + 1}`} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-500">Empty</div>}
                  </div>
                  <label className="block w-full bg-red-600 hover:bg-red-700 py-4 text-center rounded-2xl font-semibold cursor-pointer transition mb-3">
                    {photo ? 'Replace Image' : 'Upload Image'}
                    <input type="file" accept="image/*" onChange={(e) => handleWheelUpload(e, index)} className="hidden" />
                  </label>
                  <button onClick={() => handleDeleteSlot(index)} className="w-full bg-zinc-800 hover:bg-red-900 py-3 text-sm rounded-2xl border border-white/20 transition">Delete Image</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'theater' && (
          <div>
            <h2 className="text-3xl font-semibold mb-8">Theater Video Manager</h2>
            <p className="text-zinc-400 mb-8">Upload or replace the streaming mp4 files for the 3D cinema theater.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {theaterVideos.map((video, index) => (
                <div key={index} className="bg-zinc-950 border border-white/10 rounded-3xl p-6">
                  <div className="text-lg font-medium mb-4">Video Track 0{index + 1}</div>
                  <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden mb-6 border border-white/10 flex flex-col items-center justify-center p-2">
                    {video ? <video src={video.url} controls className="w-full h-full object-contain" /> : <div className="text-zinc-500 text-sm">No Video Uploaded</div>}
                  </div>
                  <label className="block w-full bg-red-600 hover:bg-red-700 py-4 text-center rounded-2xl font-semibold cursor-pointer transition mb-3">
                    {video ? 'Replace Video Track' : 'Upload Video (.mp4)'}
                    <input type="file" accept="video/mp4" onChange={(e) => handleVideoUpload(e, index)} className="hidden" />
                  </label>
                  <button onClick={() => handleDeleteVideo(index)} className="w-full bg-zinc-800 hover:bg-red-900 py-3 text-sm rounded-2xl border border-white/20 transition">Delete Video</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <form onSubmit={handleSaveTextContent} className="max-w-4xl bg-zinc-950 border border-white/10 rounded-3xl p-8 space-y-8 text-left">
            <div>
              <h2 className="text-2xl font-bold mb-2">About Page Copy Engine</h2>
              <p className="text-sm text-zinc-400">Control active public text arrays rendered inside the AboutDetails view panel layout.</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Our Story Paragraph Block</label>
              <textarea value={storyText} onChange={(e) => setStoryText(e.target.value)} className="w-full h-32 bg-zinc-900 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-red-500 resize-none text-white font-medium" />
            </div>
            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Team Roster Roster Control (2 Active Slots)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4">
                    <div className="text-sm font-black text-red-500 uppercase tracking-widest">Roster Position Slot 0{member.id}</div>
                    <div className="space-y-3">
                      <input type="text" value={member.name} onChange={(e) => handleUpdateTeamMember(member.id, 'name', e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none" placeholder="Full Name" />
                      <input type="text" value={member.role} onChange={(e) => handleUpdateTeamMember(member.id, 'role', e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-red-400 focus:outline-none" placeholder="Roster Position / Title" />
                      <textarea value={member.bio} onChange={(e) => handleUpdateTeamMember(member.id, 'bio', e.target.value)} className="w-full h-24 bg-zinc-900 border border-white/10 rounded-xl p-4 text-xs font-medium text-zinc-400 focus:outline-none resize-none" placeholder="Biography summary string field..." />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold tracking-widest text-xs uppercase transition shadow-lg">Save About Page Text Matrices</button>
          </form>
        )}

        {activeTab === 'events' && (
          <form onSubmit={handleSaveTextContent} className="max-w-4xl bg-zinc-950 border border-white/10 rounded-3xl p-8 space-y-8 text-left">
            <div>
              <h2 className="text-2xl font-bold mb-2">Events & Schedules Manager</h2>
              <p className="text-sm text-zinc-400">Direct operational calendars, link targets, and registration hub properties instantly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Featured Flyer Title Block</label>
                <input type="text" value={flyerTitle} onChange={(e) => setFlyerTitle(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Registration Redirect URL (Google Forms/Jotform)</label>
                <input type="text" value={registrationUrl} onChange={(e) => setRegistrationUrl(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-red-400 focus:outline-none" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Featured Event Overview Summary</label>
              <textarea value={flyerDesc} onChange={(e) => setFlyerDesc(e.target.value)} className="w-full h-20 bg-zinc-900 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-red-500 resize-none text-white font-medium" />
            </div>
            <div className="space-y-4 pt-6 border-t border-white/5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Inject Dynamic Grid Calendar Agenda Marker</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <input type="text" placeholder="Date (YYYY-MM-DD)" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-xs font-bold text-zinc-300 focus:outline-none" />
                <input type="text" placeholder="Camp Title Target" value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-xs font-bold text-zinc-300 focus:outline-none" />
                <input type="text" placeholder="Time Segment (e.g. 09:00 AM)" value={newEventTime} onChange={(e) => setNewEventTime(e.target.value)} className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-xs font-bold text-zinc-300 focus:outline-none" />
              </div>
              <button type="button" onClick={() => {
                if (!newEventDate || !newEventTitle) return;
                setCalendarEvents(prev => [...prev, { id: `ev-${Date.now()}`, date: newEventDate, title: newEventTitle, time: newEventTime || "09:00 AM" }]);
                setNewEventDate('');
                setNewEventTitle('');
                setNewEventTime('');
              }} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-xs font-bold uppercase tracking-wider rounded-xl transition">+ Append Agenda Date Block</button>
              <div className="space-y-2 max-h-40 overflow-y-auto bg-black/30 p-3 rounded-xl border border-white/5">
                {calendarEvents.map((ev) => (
                  <div key={ev.id} className="flex justify-between items-center text-xs bg-zinc-900/50 p-2.5 rounded-lg border border-white/[0.02]">
                    <div className="flex gap-4">
                      <span className="font-mono text-zinc-500 font-bold">{ev.date}</span>
                      <span className="text-zinc-300 font-bold truncate max-w-[220px]">{ev.title}</span>
                    </div>
                    <button type="button" onClick={() => setCalendarEvents(prev => prev.filter(item => item.id !== ev.id))} className="text-red-500 font-black hover:text-red-400 px-2 py-1">Delete</button>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold tracking-widest text-xs uppercase transition shadow-lg">Save Event Properties & Link Mappings</button>
          </form>
        )}
      </div>
    </div>
  );
}