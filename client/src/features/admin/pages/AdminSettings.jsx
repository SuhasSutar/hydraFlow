import React, { useState, useEffect } from 'react';

export default function AdminSettings() {
  const [enforceMfa, setEnforceMfa] = useState(() => {
    const saved = localStorage.getItem('settings_enforce_mfa');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [sessionExpiry, setSessionExpiry] = useState(() => {
    const saved = localStorage.getItem('settings_session_expiry');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('settings_enforce_mfa', JSON.stringify(enforceMfa));
    localStorage.setItem('settings_session_expiry', JSON.stringify(sessionExpiry));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">System Settings</h2>
          <p className="text-slate-500 text-sm mt-1">Configure workspace rules, authentication requirements, and security settings.</p>
        </div>
        {saveSuccess && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold font-mono text-[10px] uppercase px-4 py-2 rounded-lg animate-fade-in shrink-0">
            System settings saved successfully
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs max-w-2xl space-y-6">
        <h3 className="font-display font-bold text-slate-800 text-base border-b border-slate-100 pb-3">Security &amp; Auth</h3>
        <div className="space-y-4 text-xs text-slate-600">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={enforceMfa} 
              onChange={() => setEnforceMfa(prev => !prev)}
              className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" 
            />
            <div>
              <p className="font-bold text-slate-800">Enforce Multi-Factor Authentication (MFA)</p>
              <p className="text-slate-400 mt-0.5">Require all manufacturer admins and service engineers to complete MFA on login.</p>
            </div>
          </label>
          <div className="h-px bg-slate-100 my-2"></div>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={sessionExpiry} 
              onChange={() => setSessionExpiry(prev => !prev)}
              className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" 
            />
            <div>
              <p className="font-bold text-slate-800">Session Expiry Lockout</p>
              <p className="text-slate-400 mt-0.5">Auto log-out system sessions after 30 minutes of user inactivity.</p>
            </div>
          </label>
        </div>
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button 
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-bold text-xs transition-all shadow-md shadow-primary/10 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
