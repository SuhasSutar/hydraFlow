import React, { useState, useEffect } from 'react';

export default function ActiveJobTelemetry() {
  const [metrics, setMetrics] = useState({
    temperature: 42.8,
    pressure: 342,
    voltage: 240.2,
    current: 12.5,
    rpm: 3450,
    flowRate: 185.0
  });

  // Simulated live data drift
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => ({
        temperature: parseFloat((prev.temperature + (Math.random() - 0.5) * 0.3).toFixed(1)),
        pressure: Math.round(prev.pressure + (Math.random() - 0.5) * 4),
        voltage: parseFloat((prev.voltage + (Math.random() - 0.5) * 0.1).toFixed(1)),
        current: parseFloat((prev.current + (Math.random() - 0.5) * 0.1).toFixed(1)),
        rpm: Math.round(prev.rpm + (Math.random() - 0.5) * 10),
        flowRate: parseFloat((prev.flowRate + (Math.random() - 0.5) * 0.5).toFixed(1))
      }));
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Breadcrumbs & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] uppercase tracking-wider mb-2">
            <span>Equipment</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span>High-Pressure Systems</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary font-bold">TX-900 Pump (#HP-29401)</span>
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Unit Real-Time Monitor</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Live Connection</span>
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-xs font-bold font-mono uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">file_download</span> 
            Export
          </button>
        </div>
      </div>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Visual & Health Score (Spans 8) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health Score Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400">OVERALL HEALTH</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Last calculated: 2 mins ago</p>
              </div>
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-100" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary transition-all duration-1000" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364" strokeDashoffset="36" strokeWidth="8"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-3xl font-bold text-primary">92</span>
                  <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">OPTIMAL</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 mt-4">
              <div className="flex justify-between text-xs mb-1 text-slate-600">
                <span>Efficiency Rating</span>
                <span className="font-bold text-slate-800">98.2%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[98%]"></div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative shadow-xs min-h-[220px] flex flex-col justify-end p-6">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" 
              src="/active-job-telemetry-map.jpg" 
              alt="TX-900 Pump cutaway"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-primary rounded-full ring-4 ring-primary/30"></span>
                <span className="text-white font-mono text-xs font-bold uppercase tracking-wider">Unit TX-900 Active</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">Currently operating at peak load. No mechanical stress detected in current cycle.</p>
            </div>
          </div>
        </div>

        {/* Alert History (Spans 4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 flex flex-col shadow-xs max-h-[340px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400">ALERT HISTORY</h3>
            <span className="text-xs font-bold text-primary hover:underline cursor-pointer">VIEW ALL</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            <div className="flex gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border-l-4 border-red-500">
              <span className="material-symbols-outlined text-red-500 text-base shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
              <div>
                <p className="text-xs font-bold text-slate-800">Pressure Spike Detected</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Internal pressure exceeded 450 PSI threshold.</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] font-mono text-slate-400">Today, 08:42 AM</span>
                  <span className="text-[9px] font-mono font-bold text-white bg-red-600 px-2 py-0.5 rounded">CRITICAL</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border-l-4 border-slate-400">
              <span className="material-symbols-outlined text-slate-400 text-base shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <div>
                <p className="text-xs font-bold text-slate-800">Vibration Anomaly</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Minor oscillation detected in Motor Housing B.</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] font-mono text-slate-400">Oct 24, 02:15 PM</span>
                  <span className="text-[9px] font-mono font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">STABLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Cards (6 Column Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Temperature */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:translate-y-[-2px] transition-transform duration-200">
          <div className="flex justify-between items-center mb-3">
            <span className="material-symbols-outlined text-primary bg-blue-50 p-1.5 rounded-lg text-base">device_thermostat</span>
            <span className="text-emerald-600 flex items-center text-[10px] font-bold font-mono">
              <span className="material-symbols-outlined text-[12px]">trending_down</span> 2%
            </span>
          </div>
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">Temperature</h4>
          <div className="flex items-baseline gap-0.5 font-mono">
            <span className="text-xl font-bold text-slate-800">{metrics.temperature}</span>
            <span className="text-xs text-slate-400">°C</span>
          </div>
          <div className="mt-3 h-8">
            <svg className="w-full h-full" viewBox="0 0 100 20">
              <path d="M0 15 Q 10 5, 20 12 T 40 8 T 60 14 T 80 5 T 100 10" fill="none" stroke="#003c90" strokeWidth="2"></path>
            </svg>
          </div>
        </div>

        {/* Pressure */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:translate-y-[-2px] transition-transform duration-200">
          <div className="flex justify-between items-center mb-3">
            <span className="material-symbols-outlined text-primary bg-blue-50 p-1.5 rounded-lg text-base">compress</span>
            <span className="text-red-600 flex items-center text-[10px] font-bold font-mono">
              <span className="material-symbols-outlined text-[12px]">trending_up</span> 5%
            </span>
          </div>
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">Pressure</h4>
          <div className="flex items-baseline gap-0.5 font-mono">
            <span className="text-xl font-bold text-slate-800">{metrics.pressure}</span>
            <span className="text-xs text-slate-400">PSI</span>
          </div>
          <div className="mt-3 h-8">
            <svg className="w-full h-full" viewBox="0 0 100 20">
              <path d="M0 10 Q 15 15, 30 5 T 50 12 T 70 8 T 100 2" fill="none" stroke="#003c90" strokeWidth="2"></path>
            </svg>
          </div>
        </div>

        {/* Voltage */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:translate-y-[-2px] transition-transform duration-200">
          <div className="flex justify-between items-center mb-3">
            <span className="material-symbols-outlined text-primary bg-blue-50 p-1.5 rounded-lg text-base">bolt</span>
            <span className="text-emerald-600 font-mono text-[9px] font-bold uppercase tracking-wider">STABLE</span>
          </div>
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">Voltage</h4>
          <div className="flex items-baseline gap-0.5 font-mono">
            <span className="text-xl font-bold text-slate-800">{metrics.voltage}</span>
            <span className="text-xs text-slate-400">V</span>
          </div>
          <div className="mt-3 h-8">
            <svg className="w-full h-full" viewBox="0 0 100 20">
              <path d="M0 10 L 10 10 L 20 10 L 30 10 L 40 10 L 50 10 L 60 10 L 70 10 L 100 10" fill="none" stroke="#003c90" strokeWidth="2"></path>
            </svg>
          </div>
        </div>

        {/* Current */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:translate-y-[-2px] transition-transform duration-200">
          <div className="flex justify-between items-center mb-3">
            <span className="material-symbols-outlined text-primary bg-blue-50 p-1.5 rounded-lg text-base">electric_meter</span>
            <span className="text-emerald-600 flex items-center text-[10px] font-bold font-mono">
              <span className="material-symbols-outlined text-[12px]">trending_down</span> 1%
            </span>
          </div>
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">Current</h4>
          <div className="flex items-baseline gap-0.5 font-mono">
            <span className="text-xl font-bold text-slate-800">{metrics.current}</span>
            <span className="text-xs text-slate-400">A</span>
          </div>
          <div className="mt-3 h-8">
            <svg className="w-full h-full" viewBox="0 0 100 20">
              <path d="M0 15 Q 20 18, 40 12 T 60 10 T 80 14 T 100 15" fill="none" stroke="#003c90" strokeWidth="2"></path>
            </svg>
          </div>
        </div>

        {/* RPM */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:translate-y-[-2px] transition-transform duration-200">
          <div className="flex justify-between items-center mb-3">
            <span className="material-symbols-outlined text-primary bg-blue-50 p-1.5 rounded-lg text-base">rotate_right</span>
            <span className="text-slate-500 font-mono text-[9px] font-bold uppercase tracking-wider">OPTIMAL</span>
          </div>
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">Motor RPM</h4>
          <div className="flex items-baseline gap-0.5 font-mono">
            <span className="text-xl font-bold text-slate-800">{metrics.rpm}</span>
            <span className="text-xs text-slate-400">RPM</span>
          </div>
          <div className="mt-3 h-8">
            <svg className="w-full h-full" viewBox="0 0 100 20">
              <path d="M0 5 Q 10 2, 20 5 T 40 8 T 60 5 T 80 2 T 100 5" fill="none" stroke="#003c90" strokeWidth="2"></path>
            </svg>
          </div>
        </div>

        {/* Flow Rate */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:translate-y-[-2px] transition-transform duration-200">
          <div className="flex justify-between items-center mb-3">
            <span className="material-symbols-outlined text-primary bg-blue-50 p-1.5 rounded-lg text-base">water_lux</span>
            <span className="text-emerald-600 flex items-center text-[10px] font-bold font-mono">
              <span className="material-symbols-outlined text-[12px]">trending_up</span> 12%
            </span>
          </div>
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">Water Flow</h4>
          <div className="flex items-baseline gap-0.5 font-mono">
            <span className="text-xl font-bold text-slate-800">{metrics.flowRate}</span>
            <span className="text-xs text-slate-400">L/m</span>
          </div>
          <div className="mt-3 h-8">
            <svg className="w-full h-full" viewBox="0 0 100 20">
              <path d="M0 18 Q 10 15, 20 16 T 40 10 T 60 5 T 80 8 T 100 12" fill="none" stroke="#003c90" strokeWidth="2"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div>
        <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-4">ENGINEER RECOMMENDATIONS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50/20 border border-blue-100 rounded-xl p-5 flex gap-4 shadow-xs">
            <div className="w-10 h-10 shrink-0 bg-blue-100/50 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">Optimize Voltage Input</h4>
              <p className="text-xs text-slate-500 leading-relaxed">System voltage is slightly exceeding efficiency norms. Consider lowering power delivery by 2.5% to extend motor bearing lifespan.</p>
              <button className="mt-4 text-primary font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:gap-1.5 transition-all">
                APPLY AUTO-TUNE <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="bg-cyan-50/20 border border-cyan-100 rounded-xl p-5 flex gap-4 shadow-xs">
            <div className="w-10 h-10 shrink-0 bg-cyan-100/50 rounded-full flex items-center justify-center text-cyan-700">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">Predictive Maintenance</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Based on vibration patterns, we recommend a seal inspection in the next 14 operating days to prevent potential leaks.</p>
              <button className="mt-4 text-cyan-700 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:gap-1.5 transition-all">
                SCHEDULE SERVICE <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex gap-4 shadow-xs">
            <div className="w-10 h-10 shrink-0 bg-slate-200/50 rounded-full flex items-center justify-center text-slate-600">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">Efficiency Baseline</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Current flow-to-power ratio is 4% above the monthly average. System performing at maximum efficiency profile.</p>
              <button className="mt-4 text-slate-600 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:gap-1.5 transition-all">
                VIEW FULL REPORT <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
