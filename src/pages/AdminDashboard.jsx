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

      // Clear structural overlaps
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
            <p className="text-emerald-400">Live Asset Asset Multi-Pipeline</p>
          </div>
          <div className="flex gap-4">
            <Link to="/" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 transition">← Back to Main Page</Link>
            <button onClick={() => setIsAuthenticated(false)} className="px-6 py-3 bg-zinc-900 hover:bg-red-900/50 rounded-2xl border border-white/20 transition">Lock Console</button>
          </div>
        </div>

        {/* Tab Layout Navigator */}
        <div className="flex gap-2 mb-8 border-b border-white/10 pb-4">
          <button onClick={() => setActiveTab('wheel')} className={`px-8 py-3 rounded-2xl font-medium transition ${activeTab === 'wheel' ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}>Wheel Photos (6 Slots)</button>
          <button onClick={() => setActiveTab('theater')} className={`px-8 py-3 rounded-2xl font-medium transition ${activeTab === 'theater' ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}>Theater Videos (2 Slots)</button>
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
                    {photo ? (
                      <img src={photo.url} alt={`Slot ${index + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500">Empty</div>
                    )}
                  </div>

                  <label className="block w-full bg-red-600 hover:bg-red-700 py-4 text-center rounded-2xl font-semibold cursor-pointer transition mb-3">
                    {photo ? 'Replace Image' : 'Upload Image'}
                    <input type="file" accept="image/*" onChange={(e) => handleWheelUpload(e, index)} className="hidden" />
                  </label>

                  <button onClick={() => handleDeleteSlot(index)} className="w-full bg-zinc-800 hover:bg-red-900 py-3 text-sm rounded-2xl border border-white/20 transition">
                    Delete Image
                  </button>
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
                    {video ? (
                      <video src={video.url} controls className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-zinc-500 text-sm">No Video Uploaded</div>
                    )}
                  </div>

                  <label className="block w-full bg-red-600 hover:bg-red-700 py-4 text-center rounded-2xl font-semibold cursor-pointer transition mb-3">
                    {video ? 'Replace Video Track' : 'Upload Video (.mp4)'}
                    <input type="file" accept="video/mp4" onChange={(e) => handleVideoUpload(e, index)} className="hidden" />
                  </label>

                  <button onClick={() => handleDeleteVideo(index)} className="w-full bg-zinc-800 hover:bg-red-900 py-3 text-sm rounded-2xl border border-white/20 transition">
                    Delete Video
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}