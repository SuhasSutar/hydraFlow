import React, { useState } from 'react';

export default function InstallationsLogistics() {
  const [activeTab, setActiveTab] = useState('installations');
  const [selectedInstallation, setSelectedInstallation] = useState({
    id: 1,
    name: 'Munich Water Works #04',
    sn: 'HF-7729-PX',
    status: 'ON-SITE',
    progress: 75,
    estDate: 'May 14',
    timeline: [
      { id: 1, title: 'Order Confirmed', date: 'Apr 22, 10:14 AM', done: true },
      { id: 2, title: 'Quality Control Passed', date: 'Apr 25, 02:30 PM', done: true },
      { id: 3, title: 'Site Survey & Logistics', date: 'May 02, 09:00 AM', done: true },
      { id: 4, title: 'Final Commissioning', date: 'Projected: May 14', done: false }
    ]
  });

  const installationsList = [
    {
      id: 1,
      name: 'Munich Water Works #04',
      sn: 'HF-7729-PX',
      status: 'ON-SITE',
      progress: 75,
      estDate: 'May 14',
      timeline: [
        { id: 1, title: 'Order Confirmed', date: 'Apr 22, 10:14 AM', done: true },
        { id: 2, title: 'Quality Control Passed', date: 'Apr 25, 02:30 PM', done: true },
        { id: 3, title: 'Site Survey & Logistics', date: 'May 02, 09:00 AM', done: true },
        { id: 4, title: 'Final Commissioning', date: 'Projected: May 14', done: false }
      ]
    },
    {
      id: 2,
      name: 'Dubai Marina Pressure Hub',
      sn: 'HF-9102-AQ',
      status: 'IN TRANSIT',
      progress: 32,
      estDate: 'May 18',
      timeline: [
        { id: 1, title: 'Order Confirmed', date: 'May 01, 11:45 AM', done: true },
        { id: 2, title: 'Quality Control Passed', date: 'May 03, 09:15 AM', done: true },
        { id: 3, title: 'Departed Warehouse', date: 'May 05, 04:00 PM', done: true },
        { id: 4, title: 'Arrived at Dubai Port', date: 'Projected: May 12', done: false },
        { id: 5, title: 'Final Site Delivery', date: 'Projected: May 18', done: false }
      ]
    },
    {
      id: 3,
      name: 'Tokyo Agri-Corp Sprinkler',
      sn: 'HF-1104-TK',
      status: 'SCHEDULED',
      progress: 10,
      estDate: 'Jun 02',
      timeline: [
        { id: 1, title: 'Order Confirmed', date: 'May 07, 08:30 AM', done: true },
        { id: 2, title: 'Awaiting Manufacturing Batch', date: 'Projected: May 15', done: false }
      ]
    }
  ];

  const inventoryList = [
    { sku: "HF-V2 Pump Unit", model: "HF-X100", location: "Port of Seattle", qty: 45 },
    { sku: "HF-V3 Industrial", model: "DeepDive Pro-90", location: "Chicago Hub", qty: 28 },
    { sku: "HF-V1 Compact", model: "RapidRelief 500", location: "Singapore Tech", qty: 15 }
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Map View Area (Main Content) */}
      <div className="flex-1 relative bg-slate-900 overflow-hidden flex flex-col justify-between p-6">
        {/* Map Image/Graphics Container */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 select-none pointer-events-none"
          style={{
            backgroundImage: "url('/installation-logistics-bg.jpg')",
            mixBlendMode: 'luminosity'
          }}
        ></div>
        
        {/* Map Header Overlay */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-display font-bold text-xl md:text-2xl text-white">Global Rollout</h2>
            <p className="text-slate-400 text-xs mt-0.5">Global logistics pipeline and installation maps.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-lg text-white text-xs">
              <span className="font-mono text-slate-400">Region:</span>
              <select className="bg-transparent border-none p-0 cursor-pointer focus:ring-0">
                <option className="bg-slate-900">All Regions</option>
                <option className="bg-slate-900">North America</option>
                <option className="bg-slate-900">EMEA</option>
                <option className="bg-slate-900">APAC</option>
              </select>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs rounded-lg transition-colors border border-slate-700">
              <span className="material-symbols-outlined text-sm">file_download</span>
              Export
            </button>
          </div>
        </div>

        {/* Live Status overlay cards on map */}
        <div className="relative z-10 w-full sm:w-64 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-2xl">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-xs text-white">Active Rollouts</h4>
              <p className="text-[10px] text-slate-400">Global Monitoring</p>
            </div>
            <span className="px-2 py-0.5 bg-emerald-500/25 border border-emerald-500/50 text-emerald-400 font-mono text-[9px] rounded font-bold">LIVE</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="font-mono text-[9px] text-slate-400">SHIPPED</p>
              <p className="font-mono text-2xl font-bold text-primary-fixed-dim">124</p>
            </div>
            <div>
              <p className="font-mono text-[9px] text-slate-400">ON-SITE</p>
              <p className="font-mono text-2xl font-bold text-cyan-400">48</p>
            </div>
          </div>
        </div>

        {/* Map zoom controls */}
        <div className="relative z-10 flex gap-2">
          <button className="w-8 h-8 bg-slate-800 border border-slate-700 shadow-xl rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-all">
            <span className="material-symbols-outlined text-base">add</span>
          </button>
          <button className="w-8 h-8 bg-slate-800 border border-slate-700 shadow-xl rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-all">
            <span className="material-symbols-outlined text-base">remove</span>
          </button>
        </div>
      </div>

      {/* Logistics Side Panel (Right) */}
      <aside className="w-96 bg-white border-l border-slate-200 flex flex-col h-full overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-display font-bold text-slate-900 text-lg">Logistics Queue</h3>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('installations')}
              className={`flex-1 py-2 font-mono text-[10px] font-bold border-b-2 transition-all ${
                activeTab === 'installations' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              INSTALLATIONS
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex-1 py-2 font-mono text-[10px] font-bold border-b-2 transition-all ${
                activeTab === 'inventory' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              WAREHOUSE STOCK
            </button>
          </div>
        </div>

        {/* Main List Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'installations' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block"></span>
                  In-Progress Rollouts
                </h4>
                <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {installationsList.length} Total
                </span>
              </div>
              <div className="space-y-3">
                {installationsList.map((inst) => (
                  <div
                    key={inst.id}
                    onClick={() => setSelectedInstallation(inst)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                      selectedInstallation.id === inst.id
                        ? 'border-primary bg-blue-50/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className={`font-bold text-xs group-hover:text-primary transition-colors ${
                          selectedInstallation.id === inst.id ? 'text-primary font-extrabold' : 'text-slate-800'
                        }`}>
                          {inst.name}
                        </p>
                        <p className="font-mono text-[10px] text-slate-400">Serial: {inst.sn}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                        inst.status === 'ON-SITE'
                          ? 'text-amber-700 bg-amber-50 border-amber-200'
                          : inst.status === 'IN TRANSIT'
                          ? 'text-primary bg-blue-50 border-blue-200'
                          : 'text-slate-600 bg-slate-50 border-slate-200'
                      }`}>
                        {inst.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>Progress</span>
                        <span>{inst.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${inst.progress}%` }}></div>
                      </div>
                      <p className="text-[9px] text-slate-400 italic">Est. Completion: {inst.estDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">inventory_2</span>
                Ready to Deploy
              </h4>
              <div className="divide-y divide-slate-100">
                {inventoryList.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 py-3 bg-white hover:bg-slate-50/50 transition-colors">
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-base block">settings_input_component</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{item.sku}</p>
                      <p className="text-[10px] text-slate-400 truncate">{item.model} • {item.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs font-bold text-slate-800">{item.qty}</p>
                      <p className="text-[9px] text-slate-400">units</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Installation Timeline */}
        <div className="bg-slate-50 p-6 border-t border-slate-200">
          <h5 className="font-mono text-[10px] font-bold text-primary mb-4 flex justify-between items-center tracking-wider uppercase">
            SELECTED: {selectedInstallation.name}
            <span className="material-symbols-outlined text-sm">info</span>
          </h5>
          <div className="relative space-y-4 pl-4 before:absolute before:left-[3px] before:top-1.5 before:bottom-1.5 before:w-[1px] before:bg-slate-200">
            {selectedInstallation.timeline.map((step) => (
              <div key={step.id} className="relative">
                <div className={`absolute -left-[17px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-xs ${
                  step.done ? 'bg-emerald-500' : 'bg-slate-300'
                }`}></div>
                <div className={step.done ? 'text-slate-800' : 'text-slate-400'}>
                  <p className="text-xs font-bold leading-none">{step.title}</p>
                  <p className="font-mono text-[9px] text-slate-400 mt-1">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
