import React, { useState } from 'react';

export default function IoTOpsAnalytics() {
  const [coverageData, setCoverageData] = useState([
    { id: 1, name: 'Submersible-G3 Hubs', clusterId: 'CLSTR-8820', current: 'v2.4.12-rc', latest: 'v2.5.0', status: 'Update Available', coverage: 100, statusColor: 'amber' },
    { id: 2, name: 'Industrial High-Pressure', clusterId: 'CLSTR-1194', current: 'v4.0.1', latest: 'v4.0.1', status: 'Up to Date', coverage: 92, statusColor: 'emerald' },
    { id: 3, name: 'SmartHome Consumer', clusterId: 'CLSTR-5541', current: 'v1.1.9', latest: 'v1.2.0', status: 'Deploying (48%)', coverage: 48, statusColor: 'blue' }
  ]);

  const deployPatch = (id) => {
    setCoverageData(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Deploying (0%)', coverage: 0, statusColor: 'blue' };
      }
      return item;
    }));
    
    // Simulate progress
    setTimeout(() => {
      setCoverageData(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, status: 'Deploying (65%)', coverage: 65 };
        }
        return item;
      }));
    }, 1500);

    setTimeout(() => {
      setCoverageData(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, status: 'Up to Date', coverage: 100, current: item.latest, statusColor: 'emerald' };
        }
        return item;
      }));
    }, 3500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Global Fleet Health</h2>
          <p className="text-slate-500 text-sm">Real-time status of 12,480 connected pump systems</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-wider">System Live</span>
        </div>
      </div>

      {/* Real-time Health Monitor (Bento Grid Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Uptime Large Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-primary bg-blue-50 p-2 rounded-lg">timer</span>
              <span className="text-emerald-600 font-mono text-xs font-semibold">+0.4% from avg</span>
            </div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Global Uptime</h3>
            <p className="font-mono text-4xl font-bold text-slate-800 leading-tight">
              99.98<span className="text-lg text-slate-400 font-medium">%</span>
            </p>
          </div>
          <div className="mt-6 h-12 w-full flex items-end gap-1">
            <div className="w-full bg-primary h-8 rounded-t-sm"></div>
            <div className="w-full bg-primary h-10 rounded-t-sm"></div>
            <div className="w-full bg-primary h-9 rounded-t-sm"></div>
            <div className="w-full bg-primary h-11 rounded-t-sm"></div>
            <div className="w-full bg-primary h-12 rounded-t-sm"></div>
            <div className="w-full bg-primary h-11 rounded-t-sm"></div>
            <div className="w-full bg-primary h-12 rounded-t-sm"></div>
          </div>
        </div>

        {/* Signal Strength Large Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-cyan-700 bg-cyan-50 p-2 rounded-lg">signal_cellular_alt</span>
              <span className="text-slate-400 font-mono text-xs font-semibold">Stable Fleet</span>
            </div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Avg Signal Strength</h3>
            <p className="font-mono text-4xl font-bold text-slate-800 leading-tight">
              -74<span className="text-lg text-slate-400 font-medium">dBm</span>
            </p>
          </div>
          <div className="mt-6">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-cyan-700"></div>
            </div>
            <div className="flex justify-between mt-2 font-mono text-[10px] text-slate-400">
              <span>Poor</span>
              <span>Fair</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>

        {/* Critical Faults Action Card */}
        <div className="bg-red-50 text-red-950 border border-red-100 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-red-600 bg-red-100 p-2 rounded-lg" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
              <span className="font-mono text-[10px] bg-red-600 text-white px-2 py-0.5 rounded uppercase font-bold tracking-wider">Urgent</span>
            </div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-red-700 mb-1">Critical Faults</h3>
            <p className="font-mono text-4xl font-bold text-red-900 leading-tight">14</p>
            <p className="text-xs text-red-700/80 mt-2">Requires manual intervention in Zone C and Zone F hubs.</p>
          </div>
          <button className="mt-6 w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-2 shadow-sm">
            View Fault Log <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Reporting Section: Data Viz */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Water Flow Trends Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-display font-bold text-slate-900 text-lg">Water Flow Trends</h3>
              <p className="text-slate-500 text-xs">Aggregate daily throughput (L/min) across global fleet</p>
            </div>
            <select className="bg-slate-100 text-slate-600 font-mono text-[10px] font-bold rounded-lg px-3 py-1.5 cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
            </select>
          </div>
          <div className="relative h-60 w-full flex items-end justify-between px-2">
            <div className="w-8 bg-primary/20 h-[50%] rounded-t-sm"></div>
            <div className="w-8 bg-primary/20 h-[60%] rounded-t-sm"></div>
            <div className="w-8 bg-primary h-[45%] rounded-t-sm"></div>
            <div className="w-8 bg-primary/20 h-[55%] rounded-t-sm"></div>
            <div className="w-8 bg-primary/20 h-[70%] rounded-t-sm"></div>
            <div className="w-8 bg-primary h-[85%] rounded-t-sm relative">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded font-mono whitespace-nowrap shadow-md">
                Peak: 12.4M
              </div>
            </div>
            <div className="w-8 bg-primary/20 h-[75%] rounded-t-sm"></div>
            <div className="w-8 bg-primary/20 h-[65%] rounded-t-sm"></div>
            <div className="w-8 bg-primary/20 h-[60%] rounded-t-sm"></div>
          </div>
          <div className="flex justify-between mt-4 font-mono text-[10px] text-slate-400 border-t border-slate-100 pt-3">
            <span>Day 01</span>
            <span>Day 07</span>
            <span>Day 14</span>
            <span>Day 21</span>
            <span>Day 30</span>
          </div>
        </div>

        {/* Energy Efficiency Widget */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-slate-900 text-lg">Energy Efficiency</h3>
            <p className="text-slate-500 text-xs">Power consumption ratio (kW/m³)</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center my-6">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eceef0" strokeDasharray="100, 100" strokeWidth="3"></path>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#004855" strokeDasharray="82, 100" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-2xl font-bold text-slate-800">0.82</span>
                <span className="font-mono text-[9px] text-slate-400">Target: 0.75</span>
              </div>
            </div>
          </div>
          <div className="space-y-3 w-full border-t border-slate-100 pt-4">
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>Model H-500 Avg</span>
              <span className="font-mono font-bold">0.88</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>Model X-200 Avg</span>
              <span className="font-mono font-bold">0.76</span>
            </div>
          </div>
        </div>
      </div>

      {/* Firmware Update Manager */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center bg-slate-50/50">
          <div>
            <h3 className="font-display font-bold text-slate-900 text-lg">Firmware Update Manager</h3>
            <p className="text-slate-500 text-xs">Centralized remote patching for edge controllers</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs hover:bg-slate-100 transition-colors">
              Provisioning Log
            </button>
            <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg text-xs transition-colors">
              Push Global Update
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Device Cluster</th>
                <th className="px-6 py-4 font-semibold">Current Version</th>
                <th className="px-6 py-4 font-semibold">Latest Stable</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Fleet Coverage</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {coverageData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 leading-tight">{item.name}</p>
                    <p className="font-mono text-[10px] text-slate-400">ID: {item.clusterId}</p>
                  </td>
                  <td className="px-6 py-4 font-mono">{item.current}</td>
                  <td className="px-6 py-4 font-mono">{item.latest}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      item.statusColor === 'amber' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                      item.statusColor === 'emerald' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      'bg-blue-50 text-primary border border-blue-100'
                    }`}>
                      {item.status.includes('Deploying') && (
                        <span className="material-symbols-outlined text-xs block mr-1 animate-spin">sync</span>
                      )}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${item.coverage}%` }}></div>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-800">{item.coverage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.statusColor === 'amber' ? (
                      <button
                        onClick={() => deployPatch(item.id)}
                        className="text-primary hover:text-primary-dark hover:underline font-bold text-xs font-mono uppercase tracking-wider"
                      >
                        Deploy Patch
                      </button>
                    ) : item.statusColor === 'blue' ? (
                      <button className="text-red-500 hover:text-red-700 hover:underline font-bold text-xs font-mono uppercase tracking-wider">
                        Cancel Push
                      </button>
                    ) : (
                      <span className="text-slate-400 font-bold text-xs font-mono uppercase tracking-wider select-none cursor-not-allowed">No Action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
