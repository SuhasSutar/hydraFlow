import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [telemetry, setTelemetry] = useState({
    pressure: 8.4,
    flow: 142,
    temp: 64.2
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => ({
        pressure: parseFloat((prev.pressure + (Math.random() - 0.5) * 0.2).toFixed(1)),
        flow: Math.round(prev.flow + (Math.random() - 0.5) * 2),
        temp: parseFloat((prev.temp + (Math.random() - 0.5) * 0.3).toFixed(1))
      }));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Fleet Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-primary bg-blue-50 p-2 rounded-lg">factory</span>
            <span className="text-slate-400 font-mono text-xs">+2 this month</span>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Total Pumps</p>
          <p className="font-mono text-3xl font-bold text-primary">42</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-red-600 bg-red-50 p-2 rounded-lg">error</span>
            <span className="text-red-600 font-mono text-xs font-semibold">Critical</span>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Active Alarms</p>
          <p className="font-mono text-3xl font-bold text-red-600">03</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-cyan-700 bg-cyan-50 p-2 rounded-lg">verified</span>
            <span className="text-slate-400 font-mono text-xs">92% Secure</span>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Warranty Status</p>
          <p className="font-mono text-3xl font-bold text-cyan-700">Active</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl shadow-xs flex flex-col justify-between relative overflow-hidden text-white">
          <div className="z-10">
            <p className="font-mono text-xs uppercase tracking-wider text-primary-fixed-dim opacity-80 mb-1">AMC Renewal</p>
            <p className="font-display text-xl font-bold">14 Days Left</p>
          </div>
          <button 
            onClick={() => navigate('/customer/amc')}
            className="z-10 mt-4 bg-white hover:bg-slate-100 text-slate-900 px-4 py-2 rounded-lg font-bold text-xs transition-colors"
          >
            Renew Now
          </button>
          <div className="absolute -right-4 -bottom-4 opacity-5 text-white">
            <span className="material-symbols-outlined text-[100px]">contract</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Health Widget (Primary Pump) */}
        <section className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div>
              <h3 className="font-display font-bold text-slate-950 text-lg">Live Health Monitoring</h3>
              <p className="text-slate-500 text-xs">Unit ID: #HF-88291-B | Industrial Booster Pump</p>
            </div>
            <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-100 animate-pulse">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              LIVE DATA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-2">Discharge Pressure</p>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-xl font-bold text-primary">{telemetry.pressure}</span>
                <span className="text-xs text-slate-400">BAR</span>
              </div>
              <div className="mt-4 h-12 w-full flex items-end gap-1">
                <div className="w-full bg-primary/20 h-[60%] rounded-sm"></div>
                <div className="w-full bg-primary/20 h-[75%] rounded-sm"></div>
                <div className="w-full bg-primary h-[80%] rounded-sm"></div>
                <div className="w-full bg-primary h-[60%] rounded-sm"></div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-2">Flow Rate</p>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-xl font-bold text-primary">{telemetry.flow}</span>
                <span className="text-xs text-slate-400">L/min</span>
              </div>
              <div className="mt-4 h-12 w-full flex items-end gap-1">
                <div className="w-full bg-primary/20 h-[50%] rounded-sm"></div>
                <div className="w-full bg-primary/20 h-[50%] rounded-sm"></div>
                <div className="w-full bg-primary h-[50%] rounded-sm"></div>
                <div className="w-full bg-primary h-[50%] rounded-sm"></div>
              </div>
            </div>

            <div className="p-4 bg-red-50/20 rounded-lg border border-red-100">
              <p className="font-mono text-[9px] text-red-600 uppercase tracking-wider mb-2">Motor Temp</p>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-xl font-bold text-red-600">{telemetry.temp}</span>
                <span className="text-xs text-red-400">°C</span>
              </div>
              <div className="mt-4 h-12 w-full flex items-end gap-1">
                <div className="w-full bg-red-500/20 h-[50%] rounded-sm"></div>
                <div className="w-full bg-red-500/20 h-[70%] rounded-sm"></div>
                <div className="w-full bg-red-600 h-full rounded-sm"></div>
              </div>
            </div>
          </div>

          <div className="w-full h-40 bg-slate-100 relative rounded-xl overflow-hidden border border-slate-200">
            <img className="w-full h-full object-cover opacity-60 mix-blend-luminosity" src="/blueprint-overlay.jpg" alt="Blueprint overlay" />
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10">
              <div className="text-center px-6 py-4 bg-white/90 backdrop-blur-xs rounded-xl border border-slate-200 shadow-md">
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Efficiency Score</p>
                <p className="font-display text-2xl font-bold text-primary">94.8%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section: Maintenance & Requests */}
        <section className="flex flex-col gap-6">
          {/* Service Status */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-slate-950 text-base">Service Status</h3>
                <button 
                  onClick={() => navigate('/customer/tickets')}
                  className="text-primary font-mono text-xs font-bold uppercase tracking-wider hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                    <span className="material-symbols-outlined text-base block">build</span>
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-800">Scheduled Overhaul</p>
                    <p className="text-slate-500 text-[10px]">Oct 24, 2026 • Unit #42</p>
                    <div className="mt-2 inline-block px-2.5 py-0.5 bg-blue-50 text-primary border border-blue-100 text-[9px] font-bold rounded font-mono">CONFIRMED</div>
                  </div>
                </div>

                <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                    <span className="material-symbols-outlined text-base block">emergency</span>
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-800">Emergency Repair</p>
                    <p className="text-slate-500 text-[10px]">Ticket #SR-9011 • Open</p>
                    <div className="mt-2 inline-block px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-100 text-[9px] font-bold rounded font-mono uppercase">In Progress</div>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/customer/tickets')}
              className="w-full mt-6 py-2.5 border-2 border-primary text-primary rounded-xl font-bold text-xs hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm block">add_circle</span>
              Raise Service Request
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="font-display font-bold text-slate-950 text-base mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <a 
                onClick={() => navigate('/customer/amc')}
                className="p-4 bg-slate-50 rounded-xl text-center hover:bg-slate-100 transition-colors group cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary mb-1 text-2xl group-hover:scale-110 transition-transform block">download</span>
                <p className="text-xs font-bold text-slate-500">Invoices</p>
              </a>
              <a 
                onClick={() => navigate('/customer/telemetry')}
                className="p-4 bg-slate-50 rounded-xl text-center hover:bg-slate-100 transition-colors group cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary mb-1 text-2xl group-hover:scale-110 transition-transform block">history</span>
                <p className="text-xs font-bold text-slate-500">History</p>
              </a>
              <a 
                onClick={() => navigate('/customer/tickets')}
                className="p-4 bg-slate-50 rounded-xl text-center hover:bg-slate-100 transition-colors group cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary mb-1 text-2xl group-hover:scale-110 transition-transform block">support_agent</span>
                <p className="text-xs font-bold text-slate-500">Support</p>
              </a>
              <a 
                onClick={() => navigate('/customer/tickets')}
                className="p-4 bg-slate-50 rounded-xl text-center hover:bg-slate-100 transition-colors group cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary mb-1 text-2xl group-hover:scale-110 transition-transform block">assignment_ind</span>
                <p className="text-xs font-bold text-slate-500">Engineers</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
