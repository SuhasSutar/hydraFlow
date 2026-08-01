import React, { useState, useEffect } from 'react';

export default function LiveTelemetryStream() {
  const [dataPoints, setDataPoints] = useState([
    { region: 'NA-East', active: 480, latency: '35ms', status: 'Optimal' },
    { region: 'EU-West', active: 312, latency: '42ms', status: 'Optimal' },
    { region: 'AP-South', active: 184, latency: '120ms', status: 'Warning' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDataPoints(prev => prev.map(dp => ({
        ...dp,
        active: dp.active + Math.round((Math.random() - 0.5) * 4)
      })));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="border-b border-slate-100 pb-6">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Live Telemetry Feed</h2>
        <p className="text-slate-500 text-sm mt-1">Real-time supervision of connected IoT gateways and ingress messaging pipelines.</p>
      </div>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dataPoints.map((dp) => (
          <div key={dp.region} className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-display font-bold text-slate-800 text-sm">{dp.region} Gateway</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                dp.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {dp.status}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Active Streams</span>
              <span className="font-mono text-xl font-bold text-slate-800">{dp.active}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Latency</span>
              <span className="font-mono text-xs font-bold text-primary">{dp.latency}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
