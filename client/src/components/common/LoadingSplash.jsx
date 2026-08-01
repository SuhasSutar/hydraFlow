import React from 'react';

export default function LoadingSplash() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white select-none" style={{ zIndex: 9999 }}>
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle at center, rgba(0, 60, 144, 0.2) 0%, rgba(33, 37, 41, 0.95) 100%)' }}></div>
      
      {/* Grid Pattern overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none z-0" style={{ 
        backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', 
        backgroundSize: '24px 24px' 
      }}></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4" style={{ maxWidth: '384px' }}>
        {/* Animated Glowing Logo */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="absolute rounded-full bg-primary-custom bg-opacity-20 blur-lg" style={{ filter: 'blur(16px)', width: '96px', height: '96px' }}></div>
          <div className="bg-primary-custom rounded-full flex items-center justify-center shadow border border-white border-opacity-10" style={{ width: '80px', height: '80px' }}>
            <span className="material-symbols-outlined text-4xl text-white block select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
              water_drop
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h2 className="font-display text-white mb-1" style={{ fontSize: '24px', fontWeight: 900 }}>HydraFlow Systems</h2>
          <p className="font-mono text-info uppercase tracking-widest font-bold mb-0" style={{ fontSize: '9px' }}>Industrial IoT Platform</p>
        </div>

        {/* Loading status */}
        <div className="w-full pt-3">
          <div className="bg-slate-700 bg-opacity-20 rounded-full overflow-hidden mx-auto mb-2" style={{ width: '160px', height: '4px' }}>
            <div className="h-full bg-primary-custom rounded-full animate-progress" style={{ width: '40%' }}></div>
          </div>
          <p className="font-mono text-secondary tracking-wider" style={{ fontSize: '10px' }}>Initializing Secure Connection...</p>
        </div>
      </div>
    </div>
  );
}
