import React, { useState, useEffect } from 'react';

export default function GovernanceMgmt() {
  const [criticalTime, setCriticalTime] = useState(() => {
    const saved = localStorage.getItem('sla_critical_time');
    return saved ? parseInt(saved) : 4;
  });

  const [standardTime, setStandardTime] = useState(() => {
    const saved = localStorage.getItem('sla_standard_time');
    return saved ? parseInt(saved) : 7;
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('sla_critical_time', criticalTime);
    localStorage.setItem('sla_standard_time', standardTime);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Service Governance</h2>
          <p className="text-slate-500 text-sm mt-1">Configure active SLA thresholds, regional technician quotas, and contract policies.</p>
        </div>
        {saveSuccess && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold font-mono text-[10px] uppercase px-4 py-2 rounded-lg animate-fade-in shrink-0">
            SLA settings saved successfully
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SLA Config Card */}
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <h3 className="font-display font-bold text-slate-800 text-base border-b border-slate-100 pb-3">SLA Thresholds</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">Critical Fault Response Time (Hours)</label>
              <input 
                type="number" 
                value={criticalTime} 
                onChange={(e) => setCriticalTime(parseInt(e.target.value) || 0)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-hidden" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">Standard Maintenance Scheduling Window (Days)</label>
              <input 
                type="number" 
                value={standardTime} 
                onChange={(e) => setStandardTime(parseInt(e.target.value) || 0)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-hidden" 
              />
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-bold text-xs transition-all shadow-md shadow-primary/10 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              Save SLA Thresholds
            </button>
          </div>
        </form>

        {/* Compliance Guidelines */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <h3 className="font-display font-bold text-slate-800 text-base border-b border-slate-100 pb-3">Regional Policy Enforcement</h3>
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-primary">
              <p className="font-bold text-slate-800">EU-GDPR Data Compliance</p>
              <p className="mt-1">All telemetry logs from European Union assets must be anonymized before forwarding to third-party support partners.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-slate-400">
              <p className="font-bold text-slate-700">OSHA Safety Certifications</p>
              <p className="mt-1">Technicians must verify and log personal protective gear checks prior to entering Sector 7 high-pressure chambers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
