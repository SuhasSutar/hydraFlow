import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-bright-custom text-dark font-body min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      <main className="flex-grow-1 flex flex-col lg:flex-row overflow-hidden relative z-10">
        {/* Left Side: Visual/Brand Side (Bento Grid) */}
        <section className="hidden lg:flex lg:w-7/12 relative bg-primary-container-custom items-center justify-center overflow-hidden p-5">
          {/* Background Texture Layer */}
          <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            ></div>
          </div>

          {/* Content Area */}
          <div className="relative z-10 w-full flex flex-col justify-between h-full py-5" style={{ maxWidth: '640px' }}>
            <div>
              <h1 className="font-display text-white mb-4 display-5" style={{ fontWeight: 700, lineHeight: 1.2 }}>
                Precision Control for <br />
                <span className="text-primary-light-custom">Industrial Water.</span>
              </h1>
              <p className="text-primary-light-custom opacity-90 mb-4 font-body" style={{ fontSize: '16px', lineHeight: 1.6 }}>
                The ultimate management platform for Manufacturers, Dealers, and Service Engineers. Real-time telemetry meets operational excellence.
              </p>
            </div>

            {/* Bento-style visual representation of data density */}
            <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', height: '384px' }}>
              {/* Main Telemetry Card */}
              <div className="bg-white bg-opacity-75 border rounded-lg p-4 flex flex-col justify-between shadow" style={{ gridColumn: 'span 4', gridRow: 'span 2', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                <div className="flex justify-between items-start">
                  <span className="font-mono text-primary-custom uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: 'bold' }}>Main Station Delta</span>
                  <span className="material-symbols-outlined text-primary-custom text-[24px]">monitoring</span>
                </div>
                <div>
                  <div className="font-mono text-dark mb-2" style={{ fontSize: '36px', fontWeight: 'bold', lineHeight: 1 }}>
                    1,240.8 <span className="text-secondary font-body font-normal" style={{ fontSize: '12px' }}>L/min</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-custom font-bold" style={{ fontSize: '12px' }}>
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    <span className="font-mono uppercase tracking-wider">Stable Flow Rate</span>
                  </div>
                </div>
                {/* Simulated Sparkline */}
                <div className="w-full bg-primary-custom bg-opacity-5 rounded p-2 flex items-end gap-2" style={{ height: '64px' }}>
                  <div className="flex-1 bg-primary-custom bg-opacity-20 rounded-top" style={{ height: '40%', transition: 'all 0.2s' }}></div>
                  <div className="flex-1 bg-primary-custom bg-opacity-20 rounded-top" style={{ height: '60%', transition: 'all 0.2s' }}></div>
                  <div className="flex-1 bg-primary-custom bg-opacity-20 rounded-top" style={{ height: '55%', transition: 'all 0.2s' }}></div>
                  <div className="flex-1 bg-primary-custom bg-opacity-20 rounded-top" style={{ height: '80%', transition: 'all 0.2s' }}></div>
                  <div className="flex-1 bg-primary-custom bg-opacity-20 rounded-top" style={{ height: '70%', transition: 'all 0.2s' }}></div>
                  <div className="flex-1 bg-primary-custom bg-opacity-30 rounded-top" style={{ height: '90%', transition: 'all 0.2s' }}></div>
                </div>
              </div>

              {/* Small Status Card */}
              <div className="bg-white bg-opacity-75 border rounded-lg p-3 shadow-sm flex flex-col items-center justify-center text-center" style={{ gridColumn: 'span 2', gridRow: 'span 1', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                <div className="bg-primary-light-custom rounded-full flex items-center justify-center mb-2" style={{ width: '40px', height: '40px' }}>
                  <span className="material-symbols-outlined text-primary-custom text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
                <span className="font-mono text-dark uppercase tracking-wider" style={{ fontSize: '10px', fontWeight: 'bold' }}>Systems Active</span>
              </div>

              {/* Map/Location Card */}
              <div className="rounded-lg overflow-hidden shadow relative border border-white-50" style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
                <div
                  className="w-full h-full bg-cover bg-center transition-transform"
                  style={{ backgroundImage: "url('/welcome-map.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" style={{ pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)', top: 0, left: 0, right: 0, bottom: 0 }}></div>
                <div className="absolute bottom-0 left-0 m-3 flex items-center gap-1 text-white">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="font-mono uppercase tracking-wider" style={{ fontSize: '10px', fontWeight: 'bold' }}>Grid Monitor</span>
                </div>
              </div>

              {/* Metric Detail */}
              <div className="bg-white bg-opacity-75 border rounded-lg p-3 shadow-sm flex flex-col justify-center" style={{ gridColumn: 'span 2', gridRow: 'span 1', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                <span className="font-mono text-secondary uppercase tracking-wider" style={{ fontSize: '10px', fontWeight: 'bold' }}>Pressure PSI</span>
                <div className="font-mono text-dark font-bold mt-1" style={{ fontSize: '24px' }}>45.2</div>
              </div>
            </div>

            {/* Bottom Brand Stripe */}
            <div className="flex justify-between items-center text-primary-light-custom opacity-75 font-mono uppercase tracking-widest pt-4 border-t border-white border-opacity-10 mt-4" style={{ fontSize: '10px', fontWeight: 'bold' }}>
              <div className="flex gap-4">
                <span>ISO 9001 Certified</span>
                <span>IoT Compliant</span>
                <span>Secure Endpoints</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Action Side */}
        <section className="w-full lg:w-5/12 bg-white flex flex-col px-4 py-5 justify-between min-h-screen lg:min-h-0">
          {/* Top Branding Header */}
          <div className="flex items-center gap-3">
            <div className="bg-primary-custom rounded-lg flex items-center justify-center shadow" style={{ width: '48px', height: '48px' }}>
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                waves
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-dark leading-tight" style={{ fontSize: '20px', fontWeight: 'bold' }}>HydraFlow</span>
              <span className="font-mono text-muted uppercase tracking-wider" style={{ fontSize: '9px', fontWeight: 'bold' }}>Systems Authorized Portal</span>
            </div>
          </div>

          {/* Main Form Content */}
          <div className="w-full mx-auto py-5 my-auto" style={{ maxWidth: '448px' }}>
            <div>
              <h2 className="font-display text-dark mb-2 tracking-tight" style={{ fontSize: '28px', fontWeight: 'bold' }}>Enterprise Access</h2>
              <p className="text-secondary leading-relaxed font-medium" style={{ fontSize: '14px' }}>
                Select your entry point to manage system operations, dealer inventory, or customer deployments.
              </p>
            </div>

            <div className="flex flex-col gap-3 my-4">
              {/* Login Action */}
              <button
                onClick={() => navigate('/login')}
                className="bg-primary-custom text-white w-full p-4 rounded-lg flex items-center justify-between shadow-sm cursor-pointer border-0 text-start"
                style={{ transition: 'all 0.2s' }}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[32px]">login</span>
                  <div>
                    <span className="block font-display" style={{ fontSize: '16px', fontWeight: 'bold' }}>Log In</span>
                    <span className="text-primary-light-custom opacity-90" style={{ fontSize: '12px', fontWeight: 500 }}>Existing Operator Access</span>
                  </div>
                </div>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              {/* Register Action */}
              <button
                onClick={() => navigate('/register')}
                className="border border-outline-variant-custom bg-white hover:bg-slate-50 text-dark w-full p-4 rounded-lg flex items-center justify-between cursor-pointer text-start"
                style={{ transition: 'all 0.2s' }}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[32px] text-primary-custom">app_registration</span>
                  <div>
                    <span className="block font-display" style={{ fontSize: '16px', fontWeight: 'bold' }}>Register</span>
                    <span className="text-secondary" style={{ fontSize: '12px', fontWeight: 500 }}>New Partner Enrollment</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary">chevron_right</span>
              </button>
            </div>

            {/* Value Props for Portal */}
            <div className="flex pt-4 border-t border-outline-variant-custom mt-4">
              <div className="w-1/2 flex flex-col gap-2">
                <span className="material-symbols-outlined text-primary-custom text-[24px]">verified</span>
                <h4 className="text-dark mb-0" style={{ fontSize: '12px', fontWeight: 'bold' }}>Compliance Ready</h4>
                <p className="text-secondary mb-0" style={{ fontSize: '11px', lineHeight: 1.4 }}>Automated reporting for regional water standards.</p>
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <span className="material-symbols-outlined text-primary-custom text-[24px]">speed</span>
                <h4 className="text-dark mb-0" style={{ fontSize: '12px', fontWeight: 'bold' }}>Instant Telemetry</h4>
                <p className="text-secondary mb-0" style={{ fontSize: '11px', lineHeight: 1.4 }}>Sub-second latency for critical pump monitoring.</p>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-between items-center gap-3 border-t border-outline-variant-custom pt-4">
            <p className="text-secondary mb-0" style={{ fontSize: '12px', fontWeight: 500 }}>© 2024 HydraFlow Systems Inc.</p>
            <div className="flex gap-3 font-mono uppercase tracking-wider" style={{ fontSize: '9px', fontWeight: 'bold' }}>
              <Link to="#" className="text-secondary no-underline hover:text-primary">Privacy</Link>
              <Link to="#" className="text-secondary no-underline hover:text-primary">Terms</Link>
              <Link to="#" className="text-secondary no-underline hover:text-primary">Technical Support</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Decorative Blur Backdrops for mobile viewports */}
      <div className="fixed inset-0 bg-surface-bright-custom lg:hidden" style={{ zIndex: -10 }}>
        <div className="absolute w-full h-full bg-primary-custom bg-opacity-5 rounded-full blur-3xl" style={{ top: '-10%', right: '-10%', filter: 'blur(80px)' }}></div>
        <div className="absolute w-full h-full bg-cyan-500 bg-opacity-5 rounded-full blur-3xl" style={{ bottom: '-10%', left: '-10%', filter: 'blur(80px)' }}></div>
      </div>
    </div>
  );
}
