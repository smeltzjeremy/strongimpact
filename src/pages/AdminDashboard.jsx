import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [uploading, setUploading] = useState(false);
  const [photosList, setPhotosList] = useState([]);
  const [activeTab, setActiveTab] = useState('photos');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'JStrong2026') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator Password.');
    }
  };

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase.storage.from('gallery').list('photos');
      if (!error && data) {
        const urls = data.map(file => ({
          name: file.name,
          url: supabase.storage.from('gallery').getPublicUrl(`photos/${file.name}`).data.publicUrl
        }));
        setPhotosList(urls);
      }
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPhotos();
    }
  }, [isAuthenticated]);

  const handleUpload = async (event) => {
    try {
      setUploading(true);
      const files = event.target.files;
      if (!files || files.length === 0) return;

      for (let file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const { error } = await supabase.storage
          .from('gallery')
          .upload(`photos/${fileName}`, file);
        
        if (error) throw error;
      }

      alert('Photos uploaded successfully!');
      fetchPhotos();
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName) => {
    if (!window.confirm("Delete this photo?")) return;
    try {
      const { error } = await supabase.storage.from('gallery').remove([`photos/${fileName}`]);
      if (error) throw error;
      fetchPhotos();
    } catch (error) {
      alert('Delete failed: ' + error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05050f] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-zinc-950/80 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-center mb-2">STRONG IMPACT</h2>
          <p className="text-red-400 text-center mb-8">Protected Admin Console</p>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 mb-4"
            />
            {loginError && <p className="text-red-400 text-sm text-center mb-4">{loginError}</p>}
            
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-semibold transition">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05050f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-bold">STRONG IMPACT CMS</h1>
            <p className="text-emerald-400">Live Photo Management</p>
          </div>
          <div className="flex gap-4">
            <Link to="/" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 transition">
              ← Back to Main Page
            </Link>
            <button onClick={() => setIsAuthenticated(false)} className="px-6 py-3 bg-zinc-900 hover:bg-red-900/50 rounded-2xl border border-white/20 transition">
              Lock Console
            </button>
          </div>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-white/30 rounded-3xl p-12 text-center mb-10 hover:border-red-500/50 transition">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <p className="text-2xl mb-2">{uploading ? "Uploading photos..." : "Drop photos here or click to upload"}</p>
          <p className="text-zinc-400">They will go directly into the main gallery/photos folder</p>
        </div>

        {/* Photos Grid */}
        <h2 className="text-2xl mb-6">Uploaded Photos ({photosList.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photosList.map((item) => (
            <div key={item.name} className="relative group bg-zinc-950 rounded-2xl overflow-hidden border border-white/10">
              <img 
                src={item.url} 
                alt={item.name} 
                className="w-full aspect-square object-cover"
              />
              <button 
                onClick={() => handleDelete(item.name)}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}