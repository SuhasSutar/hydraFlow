import React, { useState, useEffect } from 'react';
import { useProductStore } from '../../../store/productStore';

export default function ProductsModels() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { models, isLoading, error, fetchModels, createModel, clearError } = useProductStore();

  const [newModel, setNewModel] = useState({
    modelName: '',
    modelNumber: '',
    categoryName: 'Centrifugal',
    powerHp: '',
    flowRateLpm: '',
    mrp: '',
    dealerPrice: '',
    description: '',
    isIoTEnabled: true,
    status: 'DRAFT',
  });

  // Fetch models from database on mount
  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const handleRegister = async (e) => {
    e.preventDefault();
    clearError();

    const result = await createModel(newModel);

    if (result.success) {
      setIsModalOpen(false);
      setSuccessMsg(`"${result.data.modelName}" registered successfully!`);
      setTimeout(() => setSuccessMsg(''), 4000);
      setNewModel({
        modelName: '',
        modelNumber: '',
        categoryName: 'Centrifugal',
        powerHp: '',
        flowRateLpm: '',
        mrp: '',
        dealerPrice: '',
        description: '',
        isIoTEnabled: true,
        status: 'DRAFT',
      });
    }
  };

  // Derive icon from category name
  const getCategoryIcon = (catName) => {
    const name = (catName || '').toLowerCase();
    if (name.includes('submersible')) return 'waves';
    if (name.includes('centrifugal')) return 'settings_input_component';
    if (name.includes('positive') || name.includes('displacement')) return 'tire_repair';
    if (name.includes('multistage')) return 'local_fire_department';
    return 'inventory_2';
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'ACTIVE': return { label: 'Active', color: 'emerald', pulse: true };
      case 'DRAFT': return { label: 'Draft', color: 'slate', pulse: false };
      case 'DISCONTINUED': return { label: 'Discontinued', color: 'red', pulse: false };
      default: return { label: status, color: 'slate', pulse: false };
    }
  };

  const filteredModels = models.filter(m =>
    (m.modelName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.modelNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.category?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const iotEnabledCount = models.filter(m => m.isIoTEnabled).length;
  const iotPercent = models.length > 0 ? Math.round((iotEnabledCount / models.length) * 100) : 0;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto relative">
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span className="text-sm font-semibold">{successMsg}</span>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">error</span>
          <span className="text-sm font-semibold">{error}</span>
          <button onClick={clearError} className="ml-2 text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Product Management</h2>
          <p className="text-slate-500 text-sm">Master catalog and specification control for the HydraFlow pump fleet.</p>
        </div>
        <button 
          onClick={() => { clearError(); setIsModalOpen(true); }}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all active:scale-98 shadow-md shadow-primary/10"
        >
          <span className="material-symbols-outlined text-white">add</span>
          Register New Model
        </button>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-start shadow-xs">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Total Models</p>
            <h3 className="font-mono text-3xl font-bold text-slate-800">{models.length}</h3>
            <div className="flex items-center gap-1 text-emerald-600 mt-2">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              <span className="font-mono text-[10px] uppercase font-bold">Live from Database</span>
            </div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-primary">
            <span className="material-symbols-outlined block">inventory_2</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-start shadow-xs">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">IoT Enabled %</p>
            <h3 className="font-mono text-3xl font-bold text-slate-800">{iotPercent}%</h3>
            <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-primary h-full" style={{ width: `${iotPercent}%` }}></div>
            </div>
          </div>
          <div className="p-3 bg-cyan-50 rounded-lg text-cyan-700">
            <span className="material-symbols-outlined block">router</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-start shadow-xs">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Active Models</p>
            <h3 className="font-mono text-3xl font-bold text-slate-800">{models.filter(m => m.status === 'ACTIVE').length}</h3>
            <div className="flex items-center gap-1 text-emerald-600 mt-2">
              <span className="material-symbols-outlined text-xs">check_circle</span>
              <span className="font-mono text-[10px] uppercase font-bold">Production Ready</span>
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg text-slate-600">
            <span className="material-symbols-outlined block">security</span>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <h4 className="font-display font-bold text-lg text-slate-900">Model Catalog</h4>
            <span className="bg-slate-200 px-2 py-0.5 rounded text-[9px] font-bold font-mono text-slate-600 uppercase">
              {isLoading ? 'LOADING...' : `${filteredModels.length} OF ${models.length}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-64">
              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-md text-xs focus:ring-1 focus:ring-primary outline-hidden"
              />
            </div>
            <button className="flex items-center gap-1 px-3 py-1 border border-slate-200 rounded-md text-xs text-slate-600 hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filters
            </button>
            <button className="flex items-center gap-1 px-3 py-1 border border-slate-200 rounded-md text-xs text-slate-600 hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-sm">file_download</span>
              Export
            </button>
          </div>
        </div>

        {isLoading && models.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <span className="material-symbols-outlined text-4xl block mb-2 animate-spin">progress_activity</span>
            <p className="text-sm">Loading product models from database...</p>
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <span className="material-symbols-outlined text-4xl block mb-2">inventory_2</span>
            <p className="text-sm">No product models found. Register your first model above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-mono text-xs">
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Model Name</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Power (HP)</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Flow (LPM)</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">MRP (₹)</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {filteredModels.map((model) => {
                  const statusCfg = getStatusConfig(model.status);
                  return (
                    <tr key={model.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-base block">
                              {getCategoryIcon(model.category?.name)}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{model.modelName}</p>
                            <p className="font-mono text-[10px] text-slate-400">SN: {model.modelNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 bg-blue-50 text-primary border border-blue-100 rounded-full text-[10px] font-bold">
                          {model.category?.name || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-medium">{model.powerHp ?? '—'}</td>
                      <td className="px-6 py-4 text-right font-mono font-medium">{model.flowRateLpm ?? '—'}</td>
                      <td className="px-6 py-4 text-right font-mono font-medium">
                        {model.mrp != null ? `₹${Number(model.mrp).toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            statusCfg.color === 'emerald' ? 'bg-emerald-500' :
                            statusCfg.color === 'red' ? 'bg-red-500' : 'bg-slate-300'
                          } ${statusCfg.pulse ? 'animate-pulse' : ''}`}></span>
                          <span className="text-xs text-slate-500">{statusCfg.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-1 text-slate-400 hover:text-primary hover:bg-blue-50 rounded transition-all">
                          <span className="material-symbols-outlined text-base block">edit_square</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
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
              <h2 className="font-display font-bold text-slate-900 text-lg">Register New Model</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all"
              >
                <span className="material-symbols-outlined text-lg block">close</span>
              </button>
            </div>

            <form onSubmit={handleRegister} className="flex-1 overflow-y-auto p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}

              <div>
                <h3 className="font-mono text-[10px] font-bold text-primary border-b border-blue-100 pb-2 mb-4 uppercase tracking-wider">Core Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Model Name *</label>
                    <input 
                      type="text"
                      required
                      value={newModel.modelName}
                      onChange={(e) => setNewModel(prev => ({ ...prev, modelName: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden" 
                      placeholder="e.g. AquaForce 500X"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Model Number *</label>
                    <input 
                      type="text"
                      required
                      value={newModel.modelNumber}
                      onChange={(e) => setNewModel(prev => ({ ...prev, modelNumber: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden" 
                      placeholder="e.g. HF-AF-500X"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Category</label>
                    <select 
                      value={newModel.categoryName}
                      onChange={(e) => setNewModel(prev => ({ ...prev, categoryName: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden cursor-pointer"
                    >
                      <option>Centrifugal</option>
                      <option>Submersible Pumps</option>
                      <option>Positive Displacement</option>
                      <option>Multistage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Status</label>
                    <select 
                      value={newModel.status}
                      onChange={(e) => setNewModel(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden cursor-pointer"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="ACTIVE">Active</option>
                      <option value="DISCONTINUED">Discontinued</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[10px] font-bold text-primary border-b border-blue-100 pb-2 mb-4 uppercase tracking-wider">Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Power (HP)</label>
                    <input 
                      type="number"
                      step="0.1"
                      value={newModel.powerHp}
                      onChange={(e) => setNewModel(prev => ({ ...prev, powerHp: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden" 
                      placeholder="5.0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Flow Rate (LPM)</label>
                    <input 
                      type="number"
                      step="0.1"
                      value={newModel.flowRateLpm}
                      onChange={(e) => setNewModel(prev => ({ ...prev, flowRateLpm: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden" 
                      placeholder="120.0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[10px] font-bold text-primary border-b border-blue-100 pb-2 mb-4 uppercase tracking-wider">Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">MRP (₹) *</label>
                    <input 
                      type="number"
                      required
                      step="0.01"
                      value={newModel.mrp}
                      onChange={(e) => setNewModel(prev => ({ ...prev, mrp: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden" 
                      placeholder="45000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Dealer Price (₹) *</label>
                    <input 
                      type="number"
                      required
                      step="0.01"
                      value={newModel.dealerPrice}
                      onChange={(e) => setNewModel(prev => ({ ...prev, dealerPrice: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden" 
                      placeholder="32000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Description</label>
                <textarea
                  value={newModel.description}
                  onChange={(e) => setNewModel(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-primary outline-hidden resize-none"
                  rows={3}
                  placeholder="Optional description of the product model..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="iotEnabled"
                  checked={newModel.isIoTEnabled}
                  onChange={(e) => setNewModel(prev => ({ ...prev, isIoTEnabled: e.target.checked }))}
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <label htmlFor="iotEnabled" className="text-sm text-slate-600 cursor-pointer">IoT Enabled (telemetry compatible)</label>
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
                  disabled={isLoading}
                  className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold text-xs transition-colors disabled:opacity-60"
                >
                  {isLoading ? 'Saving...' : 'Confirm & Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
