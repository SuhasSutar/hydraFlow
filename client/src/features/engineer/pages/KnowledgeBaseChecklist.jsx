import React, { useState } from 'react';

export default function KnowledgeBaseChecklist() {
  const [activeCategory, setActiveCategory] = useState('all');

  const bulletins = [
    {
      id: "SB-2026-04",
      title: "X-Series Cooling Calibration",
      description: "Revised thermal thresholds for secondary cooling fan triggers.",
      type: "pdf",
      category: "cooling"
    },
    {
      id: "SB-2026-09",
      title: "Vibration Analysis Guide",
      description: "Step-by-step diagnostic video for bearing wear estimation.",
      type: "video",
      category: "vibration"
    },
    {
      id: "SB-2026-12",
      title: "Cavitation Sensor Recalibration",
      description: "Manual procedure for pressure transducer signal correction.",
      type: "pdf",
      category: "sensor"
    }
  ];

  const filteredBulletins = activeCategory === 'all' 
    ? bulletins 
    : bulletins.filter(b => b.category === activeCategory);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Technical Guides &amp; Bulletins</h2>
          <p className="text-slate-500 text-sm">Access official assembly blueprints, wiring diagrams, and sensor calibration standards.</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-xs transition-all shadow-md shadow-primary/10">
          <span className="material-symbols-outlined text-white text-base">cloud_download</span>
          Download Full Library
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Guides & Bulletins Filter & Grid (Spans 8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2 font-mono">
            {['all', 'cooling', 'vibration', 'sensor'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeCategory === cat
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBulletins.map((item) => (
              <div key={item.id} className="p-4 bg-white border border-slate-200 hover:border-primary rounded-xl transition-all flex items-start gap-4 shadow-xs group cursor-pointer">
                <div className="w-12 h-12 bg-slate-150 rounded flex items-center justify-center text-primary group-hover:bg-blue-50 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-xl block">
                    {item.type === 'video' ? 'play_circle' : 'picture_as_pdf'}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">{item.id}</span>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight mt-0.5 truncate">{item.title}</h4>
                  <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Blueprints Banner */}
          <div className="bg-slate-900 text-white rounded-xl p-8 relative overflow-hidden group shadow-xs">
            <div className="relative z-10 max-w-lg space-y-3">
              <h3 className="font-display font-bold text-xl">Technical Blueprints Library</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Instantly access the full library of high-precision assembly blueprints, logic circuits, and electrical specifications for active HydraFlow models.</p>
              <div className="pt-4 flex gap-3">
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm block">description</span>
                  Assembly Blueprints
                </button>
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm block">account_tree</span>
                  Wiring Logic Schemes
                </button>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-48 h-48 opacity-10 translate-x-8 translate-y-8 text-white group-hover:opacity-15 transition-opacity">
              <span className="material-symbols-outlined text-[150px] block" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
            </div>
          </div>
        </div>

        {/* Right: Warranty & Claims Stats (Spans 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Claim Approval Rate</h3>
              <p className="font-mono text-3xl font-bold text-slate-800 leading-tight">94.2%</p>
            </div>
            <div className="relative py-8 flex justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle className="text-slate-100" cx="56" cy="56" fill="transparent" r="50" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-primary" cx="56" cy="56" fill="transparent" r="50" stroke="currentColor" strokeDasharray="314" strokeDashoffset="18" strokeWidth="8"></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xl font-bold text-slate-800">94%</span>
              </div>
            </div>
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Approved Claims</span>
                <span className="font-mono font-bold text-primary">842</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Denied Claims</span>
                <span className="font-mono font-bold text-red-600">52</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-4">Warranty Expiry Alerts</h3>
            <div className="space-y-4">
              <div className="p-3 bg-red-50/50 rounded-lg border-l-4 border-red-500 text-xs">
                <p className="font-bold text-red-800">1,248 Units Expiring (Q4)</p>
                <p className="text-slate-500 mt-1">High spike in legacy centrifugal warranties nearing expiration dates.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-slate-400 text-xs">
                <p className="font-bold text-slate-700">Submersible Warranty Update</p>
                <p className="text-slate-500 mt-1">All v3.0 telemetry controllers extended by 6 months automatically.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
