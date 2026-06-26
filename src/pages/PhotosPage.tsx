import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import ProceduralChromeBackground from '../components/ProceduralChromeBackground';
import VectorCloudLayer from '../components/VectorCloudLayer';
import PhotoWheel from '../components/PhotoWheel';

// Safe boundary wrapper to instantly prevent 3D elements from turning screens white
class CanvasErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  public state = { hasError: false };
  public static getDerivedStateFromError(_: Error): { hasError: boolean } {
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Canvas Error caught:", error, errorInfo);
  }
  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 bg-[#05050f] flex flex-col items-center justify-center text-center p-4">
          <p className="text-sm text-zinc-500 tracking-widest mb-2">3D CANVAS CAPTURE REGISTRATION</p>
          <div className="w-12 h-12 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
        </div>
      );
    }
    return this.children;
  }
}

export default function PhotosPage() {
  const [galleryUrls, setGalleryUrls] = useState<string[]>(Array(6).fill(''));
  const [activeTopIndex, setActiveTopIndex] = useState<number>(0);
  const [enlargedUrl, setEnlargedUrl] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          to="/gallery"
          className="px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-2xl text-sm transition"
        >
          ← Back to Gallery
        </Link>
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-10 touch-none">
        <CanvasErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            style={{ background: '#05050f' }}
          >
            <ProceduralChromeBackground />
            
            <group position={[-0.1, -2.5, 0]}>
              <VectorCloudLayer zPos={-2.6} solidColor="#8c1224" shadowOpacity={0.5} seed={5.2} />
              <VectorCloudLayer zPos={-2.35} solidColor="#b31931" shadowOpacity={0.46} seed={6.7} />

              <PhotoWheel 
                onUrlsLoaded={(urls) => setGalleryUrls(urls)}
                onActiveIndexChange={(index) => setActiveTopIndex(index)}
              />

              <VectorCloudLayer zPos={-1.05} solidColor="#d92341" shadowOpacity={0.38} seed={3.4} />
              <VectorCloudLayer zPos={-0.8} solidColor="#f03a58" shadowOpacity={0.34} seed={4.1} />
              <VectorCloudLayer zPos={0.65} solidColor="#ff5774" shadowOpacity={0.25} seed={1.8} />
              <VectorCloudLayer zPos={0.95} solidColor="#ff7a93" shadowOpacity={0.15} seed={0.9} />
            </group>
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center">
        <h1 className="text-6xl font-bold tracking-tighter text-white">PHOTOS</h1>
      </div>

      {/* Enlarge Button */}
      <div className="fixed bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => {
            const targetUrl = galleryUrls[activeTopIndex];
            if (targetUrl) setEnlargedUrl(targetUrl);
          }}
          className="px-10 py-5 bg-black/80 hover:bg-black border border-white/30 hover:border-red-500 text-white rounded-3xl text-sm font-semibold tracking-widest transition-all active:scale-95"
        >
          🔍 ENLARGE CURRENT PHOTO
        </button>
      </div>

      {/* Lightbox Modal */}
      {enlargedUrl && (
        <div
          onClick={() => setEnlargedUrl(null)}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-zoom-out"
        >
          <img 
            src={enlargedUrl} 
            alt="Enlarged" 
            className="max-w-[92%] max-h-[88%] rounded-lg shadow-2xl border border-white/10 object-contain"
          />
        </div>
      )}
    </div>
  );
}