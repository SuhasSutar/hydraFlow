import React, { useState } from 'react';

export default function ServiceDashboard() {
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Initial Visual Inspection & External Cleaning', checked: true },
    { id: 2, text: 'Disassemble Pump Housing & Shaft Seal', checked: false },
    { id: 3, text: 'Replace Worn Bearings (B-Type Stainless)', checked: false },
    { id: 4, text: 'Recalibrate Pressure Sensor & Test Flow', checked: false }
  ]);

  const [replacedParts, setReplacedParts] = useState([
    { id: 1, name: 'Radial Bearing X-9', sku: 'HYD-882-01', qty: 1, img: '/radial-bearing.jpg' },
    { id: 2, name: 'O-Ring Gasket Kit', sku: 'GSK-77-P', qty: 2, img: '/oring-gasket.jpg' },
    { id: 3, name: 'Digital Manometer', sku: 'SNS-90-V2', qty: 1, img: '/digital-manometer.jpg' }
  ]);

  const toggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const removePart = (id) => {
    setReplacedParts(prev => prev.filter(part => part.id !== id));
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Service Workflow: Job #RT-4921</h2>
          <p className="text-slate-500 text-sm">Industrial Pump Station - Unit 04-B (Central District)</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all shadow-md shadow-primary/10">
          <span className="material-symbols-outlined text-white">support_agent</span>
          Request Remote Support
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Reported Issue Summary */}
        <section className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 text-primary">
              <span className="material-symbols-outlined text-red-600">report_problem</span>
              <h2 className="font-display font-bold text-slate-950 text-base">Reported Issue</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-red-50/50 rounded-lg border-l-4 border-red-500">
                <p className="font-bold text-red-800 text-xs mb-1">Critical Vibration Alert</p>
                <p className="text-slate-600 text-xs">Customer reports unusual rhythmic grinding noise and 15% efficiency drop during peak hours.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 rounded p-3">
                  <p className="text-slate-400 mb-1">Reported On</p>
                  <p className="font-bold text-slate-800">Oct 24, 08:15 AM</p>
                </div>
                <div className="bg-slate-50 rounded p-3">
                  <p className="text-slate-400 mb-1">Priority</p>
                  <p className="font-bold text-red-600 font-mono">Emergency</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Diagnostics Panel */}
        <section className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined">monitoring</span>
              <h2 className="font-display font-bold text-slate-950 text-base">Live Diagnostics</h2>
            </div>
            <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-100 animate-pulse">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Live IoT Data
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric 1 */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex justify-between items-start mb-2 text-xs">
                <span className="text-slate-500">Pressure</span>
                <span className="text-[10px] text-slate-400 font-mono">Target: 4.2 bar</span>
              </div>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-2xl font-bold text-primary">3.8</span>
                <span className="text-[10px] font-bold text-slate-400">BAR</span>
              </div>
              <div className="mt-4 h-12 w-full bg-slate-100 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 w-full h-full"></div>
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                  <path d="M0 15 Q25 5 50 15 T100 5" fill="none" stroke="#003c90" strokeWidth="1.5"></path>
                </svg>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-red-50/30 rounded-xl p-4 border border-red-100">
              <div className="flex justify-between items-start mb-2 text-xs">
                <span className="text-slate-500">Temperature</span>
                <span className="text-[10px] text-red-600 font-mono">Baseline: 65°C</span>
              </div>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-2xl font-bold text-red-600">82.4</span>
                <span className="text-[10px] font-bold text-red-500">°C</span>
              </div>
              <div className="mt-4 h-12 w-full bg-red-50 rounded relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                  <path d="M0 10 L10 18 L20 5 L30 15 L40 2 L50 12 L60 18 L70 8 L80 12 L90 5 L100 15" fill="none" stroke="#ba1a1a" strokeWidth="1.5"></path>
                </svg>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex justify-between items-start mb-2 text-xs">
                <span className="text-slate-500">Vibration (RMS)</span>
                <span className="text-[10px] text-slate-400 font-mono">Baseline: 2.1 mm/s</span>
              </div>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-2xl font-bold text-primary">6.8</span>
                <span className="text-[10px] font-bold text-slate-400">MM/S</span>
              </div>
              <div className="mt-4 h-12 w-full bg-slate-100 rounded relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                  <path d="M0 10 L5 2 L10 18 L15 5 L20 15 L25 2 L30 18 L35 8 L40 12 L45 2 L50 18 L55 5 L60 15 L65 2 L70 18 L75 8 L80 12 L85 2 L90 18 L95 5 L100 10" fill="none" stroke="#003c90" strokeWidth="1.5"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fault Log Analysis */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-6 text-primary border-b border-slate-100 pb-3">
            <span className="material-symbols-outlined">troubleshoot</span>
            <h2 className="font-display font-bold text-slate-950 text-base">Fault Log Analysis</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-4 p-3 hover:bg-slate-50 transition-colors rounded-lg border-b border-slate-100 last:border-none">
              <span className="font-mono text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">10:42:01</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800">ERR_BEARING_TEMP_CRITICAL</p>
                <p className="text-[11px] text-slate-500">Main shaft assembly exceed thermal threshold (80°C).</p>
              </div>
              <span className="text-[9px] font-mono uppercase font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded">Critical</span>
            </div>

            <div className="flex items-start gap-4 p-3 hover:bg-slate-50 transition-colors rounded-lg border-b border-slate-100 last:border-none">
              <span className="font-mono text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">09:15:33</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800">WRN_FLOW_RECOIL_DETECTED</p>
                <p className="text-[11px] text-slate-500">Potential cavitation or blockage in intake pipe sub-system.</p>
              </div>
              <span className="text-[9px] font-mono uppercase font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">Warning</span>
            </div>

            <div className="flex items-start gap-4 p-3 hover:bg-slate-50 transition-colors rounded-lg border-b border-slate-100 last:border-none">
              <span className="font-mono text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">06:00:00</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800">SYS_MAINTENANCE_DUE</p>
                <p className="text-[11px] text-slate-500">Routine 5,000-hour bearing lubrication scheduled.</p>
              </div>
              <span className="text-[9px] font-mono uppercase font-bold text-primary bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">Info</span>
            </div>
          </div>
        </section>

        {/* Resolution Checklist */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-6 text-primary border-b border-slate-100 pb-3">
            <span className="material-symbols-outlined">checklist</span>
            <h2 className="font-display font-bold text-slate-950 text-base">Resolution Checklist</h2>
          </div>
          <div className="space-y-3">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  item.checked
                    ? 'border-emerald-500 bg-emerald-50/20 text-slate-400 line-through'
                    : 'border-slate-200 hover:border-primary text-slate-700 bg-white'
                }`}
              >
                {item.checked ? (
                  <span className="material-symbols-outlined text-emerald-500 text-lg block">check_box</span>
                ) : (
                  <span className="material-symbols-outlined text-slate-400 text-lg block">check_box_outline_blank</span>
                )}
                <span className="text-xs font-bold leading-none">{item.text}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Parts Replaced Selector */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined">precision_manufacturing</span>
            <h2 className="font-display font-bold text-slate-950 text-base">Parts Inventory &amp; Replacement</h2>
          </div>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors">
            <span className="material-symbols-outlined text-sm">add</span>
            Add From Inventory
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {replacedParts.map((part) => (
            <div key={part.id} className="border border-slate-200 rounded-xl p-4 flex gap-4 items-center bg-white shadow-inner">
              <div className="h-14 w-14 bg-slate-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-slate-150">
                <img className="max-w-full max-h-full object-contain" src={part.img} alt={part.name} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{part.name}</p>
                <p className="font-mono text-[9px] text-slate-400">SKU: {part.sku}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-blue-50 text-primary border border-blue-100 px-2 py-0.5 rounded">
                    {part.qty} Unit{part.qty > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => removePart(part.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                  >
                    <span className="material-symbols-outlined text-sm block">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="border-2 border-dashed border-slate-200 hover:border-primary rounded-xl p-4 flex items-center justify-center bg-slate-50/50 cursor-pointer transition-colors">
            <span className="text-slate-400 hover:text-primary text-xs font-bold font-mono uppercase tracking-wider flex flex-col items-center gap-1.5">
              <span className="material-symbols-outlined text-2xl block">post_add</span>
              Scan QR to Add Part
            </span>
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <footer className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 pb-20 sm:pb-0">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-600">
            <span className="material-symbols-outlined text-lg block">lock_clock</span>
          </div>
          <div>
            <p className="font-mono text-xs font-bold text-slate-800">Elapsed Repair Time: 01:42:05</p>
            <p className="text-[10px] text-slate-400">SLA Deadline: Oct 25, 12:00 PM</p>
          </div>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors">
            Save Progress
          </button>
          <button
            onClick={() => alert('Final Report Submitted!')}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-xs transition-all shadow-md shadow-primary/10"
          >
            Submit Final Report
          </button>
        </div>
      </footer>
    </div>
  );
}
