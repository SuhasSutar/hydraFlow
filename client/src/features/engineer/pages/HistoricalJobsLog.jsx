import React, { useState } from 'react';

export default function HistoricalJobsLog() {
  const [selectedPumpId, setSelectedPumpId] = useState(1);

  const pumps = [
    {
      id: 1,
      name: "HydraCore Pro X1",
      sn: "HP-9042-X",
      status: "Operational",
      statusColor: "emerald",
      location: "Sector 7, Chicago Plant",
      load: "84% Load",
      pressure: "142.5",
      flow: "1,240",
      temp: "68.2",
      efficiency: 94.8,
      prediction: "Based on vibration patterns and thermal trends, a secondary bearing replacement is recommended within the next 450 operating hours to maintain peak efficiency."
    },
    {
      id: 2,
      name: "Vortex Flow 2000",
      sn: "VF-2210-B",
      status: "Maintenance",
      statusColor: "amber",
      location: "Main Storage, Denver",
      load: "Scheduled: 14:00",
      pressure: "115.0",
      flow: "950",
      temp: "74.8",
      efficiency: 88.2,
      prediction: "Rotor recalibration and shaft alignment scheduled for next interval to resolve minor axial vibration."
    },
    {
      id: 3,
      name: "CentriMax M1",
      sn: "CP-1100-M",
      status: "Offline",
      statusColor: "red",
      location: "Waste Mgmt, Dallas",
      load: "Critical Fault: P04",
      pressure: "0.0",
      flow: "0",
      temp: "92.1",
      efficiency: 0.0,
      prediction: "Thermal overload detected. System shut down. Inspect digital manometer and motor cooling shroud before reboot."
    }
  ];

  const currentPump = pumps.find(p => p.id === selectedPumpId) || pumps[0];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="border-b border-slate-100 pb-6">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Fleet Management &amp; Monitoring</h2>
        <p className="text-slate-500 text-sm mt-1">Real-time health monitoring for 24 industrial pump units across 4 locations.</p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Units List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-slate-950 text-base">Active Units</h3>
            <div className="flex gap-2">
              <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded text-[10px] font-bold font-mono">ALL 24</span>
              <span className="bg-blue-50 text-primary border border-blue-100 px-2.5 py-0.5 rounded text-[10px] font-bold font-mono">18 ONLINE</span>
            </div>
          </div>

          <div className="space-y-3">
            {pumps.map((pump) => (
              <div
                key={pump.id}
                onClick={() => setSelectedPumpId(pump.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedPumpId === pump.id
                    ? 'border-primary bg-blue-50/10 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className={`font-bold text-sm ${
                      selectedPumpId === pump.id ? 'text-primary' : 'text-slate-800'
                    }`}>
                      {pump.name}
                    </h4>
                    <p className="font-mono text-[10px] text-slate-400">SN: {pump.sn}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase py-0.5 px-2 rounded border ${
                    pump.status === 'Operational' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    pump.status === 'Maintenance' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      pump.statusColor === 'emerald' ? 'bg-emerald-500 animate-pulse' :
                      pump.statusColor === 'amber' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></span>
                    {pump.status}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-xs text-slate-500">
                    <p className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> {pump.location}</p>
                    <p className="mt-1 font-mono text-[10px] font-bold text-primary">{pump.load}</p>
                  </div>
                  <div className="w-24 h-8 shrink-0">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
                      <path
                        d={pump.status === 'Offline' ? "M0,28 L100,28" : "M0,20 Q10,15 20,22 T40,18 T60,25 T80,15 T100,20"}
                        fill="none"
                        stroke={pump.status === 'Offline' ? '#ba1a1a' : '#003c90'}
                        strokeWidth="1.5"
                        strokeDasharray={pump.status === 'Offline' ? '4' : '0'}
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Telemetry Details Panel */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div>
              <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider">Live Telemetry</span>
              <h2 className="font-display font-bold text-slate-900 text-xl mt-0.5">{currentPump.sn}</h2>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  currentPump.status === 'Operational' ? 'bg-emerald-500 animate-pulse' :
                  currentPump.status === 'Maintenance' ? 'bg-amber-500' : 'bg-red-500'
                }`}></span>
                {currentPump.status === 'Operational' ? 'System Operational • No alerts' :
                 currentPump.status === 'Maintenance' ? 'Scheduled Service • Ongoing' :
                 'Critical Fault Detected • Offline'}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-xs font-mono uppercase tracking-wider transition-colors">
                Download Logs
              </button>
              <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg text-xs font-mono uppercase tracking-wider transition-all">
                Request Service
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pressure */}
            <div className="bg-slate-50 p-5 border border-slate-200 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="material-symbols-outlined text-primary text-lg">speed</span>
                <span className="text-emerald-600 font-mono text-[10px] font-bold">+2.4%</span>
              </div>
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Current Pressure</p>
              <div className="flex items-baseline gap-1 mt-1 font-mono">
                <h4 className="text-2xl font-bold text-slate-800">{currentPump.pressure}</h4>
                <span className="text-xs text-slate-500">PSI</span>
              </div>
            </div>

            {/* Flow Rate */}
            <div className="bg-slate-50 p-5 border border-slate-200 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="material-symbols-outlined text-primary text-lg">water_drop</span>
                <span className="text-primary font-mono text-[10px] font-bold">STABLE</span>
              </div>
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Flow Rate</p>
              <div className="flex items-baseline gap-1 mt-1 font-mono">
                <h4 className="text-2xl font-bold text-slate-800">{currentPump.flow}</h4>
                <span className="text-xs text-slate-500">GPM</span>
              </div>
            </div>

            {/* Temperature */}
            <div className="bg-slate-50 p-5 border border-slate-200 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="material-symbols-outlined text-primary text-lg">device_thermostat</span>
                <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                  parseFloat(currentPump.temp) > 80 ? 'text-red-500' : 'text-slate-500'
                }`}>
                  {parseFloat(currentPump.temp) > 80 ? 'HOT' : 'WARM'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Internal Temp</p>
              <div className="flex items-baseline gap-1 mt-1 font-mono">
                <h4 className="text-2xl font-bold text-slate-800">{currentPump.temp}</h4>
                <span className="text-xs text-slate-500">°C</span>
              </div>
            </div>

            {/* Energy Efficiency */}
            <div className="bg-slate-50 p-5 border border-slate-200 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="material-symbols-outlined text-primary text-lg">bolt</span>
                <span className="text-emerald-600 font-mono text-[10px] font-bold uppercase tracking-wider">OPTIMAL</span>
              </div>
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Energy Efficiency</p>
              <div className="flex items-baseline gap-1 mt-1 font-mono">
                <h4 className="text-2xl font-bold text-slate-800">{currentPump.efficiency}%</h4>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50/50 border-l-4 border-primary rounded-r-lg">
            <h5 className="text-primary font-bold text-xs flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">info</span> AI Prediction
            </h5>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{currentPump.prediction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
