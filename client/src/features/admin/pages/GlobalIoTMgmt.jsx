import React from 'react';

export default function GlobalIoTMgmt() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="border-b border-slate-100 pb-6">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Global IoT Health</h2>
        <p className="text-slate-500 text-sm mt-1">Monitor connected sensors, telemetry pipeline latency, and active firmware versions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Firmware Release</p>
          <p className="font-mono text-2xl font-bold text-slate-800 mt-1">v4.2.1-Stable</p>
          <p className="text-[10px] text-slate-400 mt-1">Distributed to 94.8% of fleet</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">API Pipeline Latency</p>
          <p className="font-mono text-2xl font-bold text-slate-800 mt-1">42 ms</p>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">Optimal performance</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Failed Telemetry Packets</p>
          <p className="font-mono text-2xl font-bold text-red-650 mt-1">0.02%</p>
          <p className="text-[10px] text-slate-400 mt-1">Below target error budget</p>
        </div>
      </div>
    </div>
  );
}
