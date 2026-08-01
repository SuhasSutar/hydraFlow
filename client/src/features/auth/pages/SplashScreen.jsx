import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing secure portal connection...');

  const messages = [
    'Initializing secure portal connection...',
    'Authenticating telemetry streams...',
    'Syncing dealer inventory data...',
    'Optimizing dashboard components...',
    'Finalizing environment...',
  ];

  useEffect(() => {
    let currentProgress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setStatusText('READY');
        setTimeout(() => {
          navigate('/welcome');
        }, 600);
      } else {
        const nextIndex = Math.min(
          Math.floor((currentProgress / 100) * messages.length),
          messages.length - 1
        );
        if (nextIndex !== messageIndex) {
          messageIndex = nextIndex;
          setStatusText(messages[messageIndex]);
        }
      }
      setProgress(currentProgress);
    }, 300);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="bg-surface-bright-custom text-dark min-h-screen flex flex-col overflow-hidden relative font-body">
      {/* Background Imagery Section */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-0 left-0 w-full h-full z-10" style={{ background: 'linear-gradient(to bottom, rgba(0, 60, 144, 0.1) 0%, var(--color-surface-bright) 100%)' }}></div>
        <div className="flex h-full w-full gap-4 opacity-20 m-0">
          <div className="w-1/3 h-full p-0">
            <div
              className="h-full w-full bg-cover"
              style={{
                backgroundImage: "url('/splash-col1.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
          <div className="w-1/3 h-full p-0">
            <div
              className="h-full w-full bg-cover"
              style={{
                backgroundImage: "url('/splash-col2.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
          <div className="w-1/3 h-full p-0">
            <div
              className="h-full w-full bg-cover"
              style={{
                backgroundImage: "url('/splash-col3.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Central Branding & Logo */}
      <main className="relative flex-1 flex flex-col items-center justify-center overflow-hidden z-20">
        <div className="flex flex-col items-center text-center px-3">
          {/* Animated Brand Identity */}
          <div className="mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary-container-custom rounded-lg flex items-center justify-center shadow border border-white border-opacity-10" style={{ width: '64px', height: '64px', transform: 'rotate(45deg)' }}>
                <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1", transform: 'rotate(-45deg)' }}>
                  water_drop
                </span>
              </div>
            </div>
            <h1 className="font-display text-primary-custom font-black tracking-tight" style={{ fontSize: '40px' }}>
              HydraFlow Systems
            </h1>
            <p className="font-mono text-secondary mt-3 tracking-widest uppercase font-bold" style={{ fontSize: '12px' }}>
              Advanced Water Management Infrastructure
            </p>
          </div>

          {/* Loading State */}
          <div className="bg-slate-100 rounded-full overflow-hidden mb-3" style={{ width: '256px', height: '4px' }}>
            <div
              className="h-full bg-primary-custom"
              style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}
            ></div>
          </div>
          <div className="font-mono text-secondary tracking-wider" style={{ fontSize: '10px', fontWeight: 'bold', height: '16px' }}>
            {statusText}
          </div>
        </div>

        {/* Bottom Detail Section */}
        <div className="absolute left-0 right-0 px-4 px-md-5 flex flex-col flex-md-row justify-between items-center align-items-md-end gap-4" style={{ bottom: '48px' }}>
          <div className="text-center text-md-start" style={{ maxWidth: '280px' }}>
            <h3 className="font-mono text-primary-custom mb-1 uppercase tracking-wider" style={{ fontSize: '11px', fontWeight: 'bold' }}>AUTHORIZED DEALER NETWORK</h3>
            <p className="text-secondary leading-relaxed mb-0" style={{ fontSize: '12px' }}>Accessing multi-tenant monitoring dashboard for North American Operations.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center md:items-end">
              <span className="font-mono text-muted uppercase tracking-widest" style={{ fontSize: '9px', fontWeight: 'bold' }}>SYSTEM STATUS</span>
              <div className="flex items-center text-primary-custom font-mono font-bold mt-1" style={{ fontSize: '12px' }}>
                <span className="bg-emerald-500 rounded-full mr-2" style={{ width: '8px', height: '8px', display: 'inline-block' }}></span>
                OPERATIONAL
              </div>
            </div>
            <div className="border-r border-outline-variant-custom hidden md:block" style={{ height: '40px', width: '1px' }}></div>
            <div className="text-center text-md-end">
              <span className="font-mono text-muted uppercase tracking-widest" style={{ fontSize: '9px', fontWeight: 'bold' }}>PORTAL VERSION</span>
              <div className="font-mono text-dark font-bold mt-1" style={{ fontSize: '12px' }}>v4.2.0-LTS</div>
            </div>
          </div>
        </div>

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 60, 144, 0.04) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          zIndex: -1
        }}></div>
      </main>

      {/* Footer Security Notice */}
      <div className="flex items-center justify-center bg-surface-container-low-custom border-t border-outline-variant-custom z-30 px-4" style={{ height: '64px' }}>
        <div className="flex items-center gap-2 text-secondary">
          <span className="material-symbols-outlined text-sm">lock</span>
          <p className="mb-0" style={{ fontSize: '11px' }}>
            Encrypted with Industrial-Grade 256-bit Security Protocols. Unauthorized access is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
