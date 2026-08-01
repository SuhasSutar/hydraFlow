import React, { useState } from 'react';

export default function PumpPerformanceTelemetry() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pumps, setPumps] = useState([
    {
      id: 1,
      name: "HF-Series X100",
      sn: "4892-A90",
      category: "Industrial Centrifugal",
      power: "12.5",
      flow: "140 m³/h",
      status: "Compatible",
      img: "/pump-telemetry-1.jpg"
    },
    {
      id: 2,
      name: "V-Pressure V2",
      sn: "1102-B42",
      category: "Multistage High Pressure",
      power: "24.0",
      flow: "85 m³/h",
      status: "Compatible",
      img: "/pump-telemetry-2.jpg"
    },
    {
      id: 3,
      name: "DeepFlow Sub",
      sn: "9931-C01",
      category: "Submersible",
      power: "7.5",
      flow: "210 m³/h",
      status: "Legacy Only",
      img: "/pump-telemetry-3.jpg"
    }
  ]);

  const [newModel, setNewModel] = useState({
    name: '',
    category: 'Centrifugal',
    power: '',
    flow: '',
    iot: true
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const model = {
      id: Date.now(),
      name: newModel.name || "Custom Pump",
      sn: `${Math.floor(1000 + Math.random() * 9000)}-Z${Math.floor(10 + Math.random() * 90)}`,
      category: newModel.category,
      power: newModel.power || "10.0",
      flow: `${newModel.flow || "100"} m³/h`,
      status: newModel.iot ? "Compatible" : "Legacy Only",
      img: "/pump-telemetry-3.jpg"
    };

    setPumps(prev => [model, ...prev]);
    setIsModalOpen(false);
    setNewModel({ name: '', category: 'Centrifugal', power: '', flow: '', iot: true });
  };

  const filteredPumps = pumps.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto relative">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Equipment Catalog</h2>
          <p className="text-slate-500 text-sm">Manage global pump models, technical specs, and IoT integration.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-xs transition-all shadow-md shadow-primary/10"
        >
          <span className="material-symbols-outlined text-white text-base">add</span>
          Register Pump
        </button>
      </div>

      {/* Dashboard Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Total Models</p>
          <p className="font-mono text-2xl font-bold text-slate-800 mt-1">124</p>
          <div className="flex items-center gap-1 mt-2 text-emerald-600 font-mono text-[9px] font-bold">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            <span>+4 this month</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">IoT Enabled</p>
          <p className="font-mono text-2xl font-bold text-slate-800 mt-1">82%</p>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-3.5 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '82%' }}></div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Active Warranties</p>
          <p className="font-mono text-2xl font-bold text-slate-800 mt-1">1,402</p>
          <div className="flex items-center gap-1 mt-2 text-slate-500 font-mono text-[9px] font-bold">
            <span className="material-symbols-outlined text-xs">check_circle</span>
            <span>98.2% valid</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Avg. Flow Rate</p>
          <p className="font-mono text-2xl font-bold text-slate-800 mt-1">450 <span className="text-xs text-slate-400 font-medium">m³/h</span></p>
          <div className="flex items-center gap-1 mt-2 text-slate-500 font-mono text-[9px] font-bold">
            <span className="material-symbols-outlined text-xs">query_stats</span>
            <span>Across all series</span>
          </div>
        </div>
      </div>

      {/* Product Table Section */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-slate-50/50">
          <div className="flex gap-2">
            <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 hover:bg-slate-50">
              <span className="material-symbols-outlined text-sm">filter_list</span> Filter
            </button>
            <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 hover:bg-slate-50">
              <span className="material-symbols-outlined text-sm">download</span> Export
            </button>
          </div>
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-hidden"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="p-4">Model Name</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Power (kW)</th>
                <th className="p-4 text-right">Flow Rate</th>
                <th className="p-4">IoT Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredPumps.map((pump) => (
                <tr key={pump.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded border border-slate-200 flex items-center justify-center p-1.5 shrink-0">
                        <img className="max-w-full max-h-full object-contain" src={pump.img} alt={pump.name} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 leading-tight">{pump.name}</p>
                        <p className="font-mono text-[10px] text-slate-400">SN: {pump.sn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-primary border border-blue-100 px-2.5 py-0.5 rounded text-[10px] font-bold">
                      {pump.category}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono font-medium">{pump.power}</td>
                  <td className="p-4 text-right font-mono font-medium">{pump.flow}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        pump.status === 'Compatible' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                      }`}></span>
                      <span className="text-xs text-slate-600">{pump.status}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-primary rounded hover:bg-slate-50 transition-colors">
                      <span className="material-symbols-outlined text-base block">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Add Modal Sidebar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
          ></div>
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 transition-transform duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="font-display font-bold text-slate-900 text-lg">Register New Pump Model</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all"
              >
                <span className="material-symbols-outlined text-lg block">close</span>
              </button>
            </div>

            <form onSubmit={handleRegister} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="font-mono text-[10px] font-bold text-primary border-b border-blue-100 pb-2 mb-4 uppercase tracking-wider">Basic Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Model Name</label>
                    <input 
                      type="text"
                      required
                      value={newModel.name}
                      onChange={(e) => setNewModel(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden" 
                      placeholder="e.g. Hydro-Flow X-1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Category</label>
                    <select 
                      value={newModel.category}
                      onChange={(e) => setNewModel(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden cursor-pointer"
                    >
                      <option>Centrifugal</option>
                      <option>Submersible</option>
                      <option>Multistage</option>
                      <option>Positive Displacement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Power Output (kW)</label>
                    <input 
                      type="number"
                      required
                      step="0.1"
                      value={newModel.power}
                      onChange={(e) => setNewModel(prev => ({ ...prev, power: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden" 
                      placeholder="12.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Max Flow Rate (m³/h)</label>
                    <input 
                      type="number"
                      required
                      value={newModel.flow}
                      onChange={(e) => setNewModel(prev => ({ ...prev, flow: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden" 
                      placeholder="140"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display font-bold text-slate-800 text-sm">IoT Compatibility</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={newModel.iot}
                      onChange={(e) => setNewModel(prev => ({ ...prev, iot: e.target.checked }))}
                      className="sr-only peer" 
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary" id="mqtt" />
                    <label htmlFor="mqtt">MQTT Support</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary" id="remote" />
                    <label htmlFor="remote">Remote Shutdown</label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[10px] font-bold text-primary border-b border-blue-100 pb-2 mb-4 uppercase tracking-wider">Documentation</h3>
                <div className="border-2 border-dashed border-slate-200 hover:border-primary rounded-xl p-8 text-center hover:bg-slate-50 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-3xl text-slate-400 mb-2 block">cloud_upload</span>
                  <p className="font-bold text-slate-700 text-xs">Upload Technical Manuals</p>
                  <p className="text-[10px] text-slate-400 mt-1">PDF, DWG or JPG up to 20MB</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-150 transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold text-xs transition-colors"
                >
                  Confirm &amp; Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
