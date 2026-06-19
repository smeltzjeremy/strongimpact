import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [uploading, setUploading] = useState(false);
  const [photosList, setPhotosList] = useState([]);
  const [videosList, setVideosList] = useState([]);
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

  const fetchMedia = async () => {
    try {
      const { data: photosData, error: pError } = await supabase.storage.from('gallery').list('photos');
      if (!pError && photosData) {
        const urls = photosData.map(file => ({
          name: file.name,
          url: supabase.storage.from('gallery').getPublicUrl(`photos/${file.name}`).data.publicUrl
        }));
        setPhotosList(urls);
      }

      const { data: videosData, error: vError } = await supabase.storage.from('gallery').list('videos');
      if (!vError && videosData) {
        const urls = videosData.map(file => ({
          name: file.name,
          url: supabase.storage.from('gallery').getPublicUrl(`videos/${file.name}`).data.publicUrl
        }));
        setVideosList(urls);
      }
    } catch (err) {
      console.error("Error fetching storage list:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMedia();
    }
  }, [isAuthenticated]);

  const handleUpload = async (event, folder) => {
    try {
      setUploading(true);
      const files = event.target.files;
      if (!files || files.length === 0) return;

      for (let file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, file);

        if (uploadError) throw uploadError;
      }

      alert('Uploaded successfully to live production database!');
      fetchMedia();
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName, folder) => {
    if (!window.confirm("Are you sure you want to remove this asset?")) return;
    try {
      const { error } = await supabase.storage.from('gallery').remove([`${folder}/${fileName}`]);
      if (error) throw error;
      fetchMedia();
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh', background: '#030305', color: '#fff',
        display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
          width: '100%', maxWidth: '400px', textAlign: 'center'
        }}>
          <h2 style={{ letterSpacing: '0.05em', marginBottom: '20px' }}>STRONG IMPACT</h2>
          <p style={{ color: '#ff3366', fontSize: '0.85rem', marginBottom: '20px' }}>Protected Control Dashboard</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Admin Access Token"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{
                width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '1rem', boxSizing: 'border-box',
                textAlign: 'center', marginBottom: '15px'
              }}
            />
            {loginError && <p style={{ color: '#ff3366', fontSize: '0.85rem', marginBottom: '15px' }}>{loginError}</p>}
            <button type="submit" style={{
              width: '100%', padding: '14px', borderRadius: '8px', border: 'none',
              background: 'linear-gradient(90deg, #ff3366, #ff5533)', color: '#fff',
              fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer'
            }}>
              Authorize Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#030305', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>STRONG IMPACT CMS</h1>
            <p style={{ margin: '5px 0 0 0', color: '#00ffcc', fontWeight: 'bold' }}>Live Storage Admin Node</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
            Lock Console
          </button>
        </div>

        <div style={{ display: 'flex', gap: '15px', margin: '30px 0' }}>
          <button onClick={() => setActiveTab('photos')} style={{
            padding: '12px 30px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
            background: activeTab === 'photos' ? '#ff3366' : 'rgba(255,255,255,0.03)',
            color: '#fff', border: '1px solid rgba(255,255,255,0.12)'
          }}>
            📁 Photos Folder ({photosList.length})
          </button>
          <button onClick={() => setActiveTab('videos')} style={{
            padding: '12px 30px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
            background: activeTab === 'videos' ? '#ff3366' : 'rgba(255,255,255,0.03)',
            color: '#fff', border: '1px solid rgba(255,255,255,0.12)'
          }}>
            🎥 Videos Folder ({videosList.length})
          </button>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.15)',
          borderRadius: '12px', padding: '40px', textAlign: 'center', position: 'relative', marginBottom: '40px'
        }}>
          <input
            type="file"
            multiple
            accept={activeTab === 'photos' ? "image/*" : "video/*"}
            onChange={(e) => handleUpload(e, activeTab)}
            disabled={uploading}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
          />
          <p style={{ fontSize: '1.2rem', margin: '0 0 10px 0' }}>
            {uploading ? "⏳ Transmitting assets..." : `Tap or Drag-and-Drop files here to upload to ${activeTab.toUpperCase()}`}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {activeTab === 'photos' && photosList.map((item) => (
            <div key={item.name} style={{ position: 'relative', background: '#0b0b10', borderRadius: '10px', overflow: 'hidden' }}>
              <img src={item.url} alt="thumbnail" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <button onClick={() => handleDelete(item.name, 'photos')} style={{ position: 'absolute', top: '10px', right: '10px', background: '#ff3366', color: '#fff', border: 'none', padding: '6px 10px', cursor: 'pointer', borderRadius: '4px' }}>🗑️</button>
            </div>
          ))}
          {activeTab === 'videos' && videosList.map((item) => (
            <div key={item.name} style={{ position: 'relative', background: '#0b0b10', borderRadius: '10px', overflow: 'hidden' }}>
              <video src={item.url} muted style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <button onClick={() => handleDelete(item.name, 'videos')} style={{ position: 'absolute', top: '10px', right: '10px', background: '#ff3366', color: '#fff', border: 'none', padding: '6px 10px', cursor: 'pointer', borderRadius: '4px' }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}