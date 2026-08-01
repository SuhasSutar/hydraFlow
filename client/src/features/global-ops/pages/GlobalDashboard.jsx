import React, { useState, useEffect } from 'react';

export default function GlobalDashboard() {
  const [alerts, setAlerts] = useState([
    { id: '#SYS-8821', title: 'Pressure Surge', time: '09:42:12', desc: 'Node P-442 (Chennai) reporting abnormal surge: 4.8 bar. Safety cutoff engaged.', type: 'error' },
    { id: '#CON-1002', title: 'Packet Loss', time: '09:38:05', desc: 'Gateway GW-A2 (Berlin) signal degradation (12% loss). Re-routing via backup B2.', type: 'warning' },
    { id: '#FWM-4491', title: 'Update Success', time: '09:30:11', desc: 'Firmware v2.4.1 verified on Cluster NA-East (440 nodes).', type: 'info' }
  ]);

  const [logs, setLogs] = useState([
    '[09:55:01] RECV_HEARTBEAT_FROM NODE_AF_991 - STATUS: OK',
    '[09:55:04] PROV_REQUEST NEW_NODE_X01 (MAC: 44:E2:11:00:AB)',
    '[09:55:05] AUTHENTICATING... RSA-4096 CHECK PASSED',
    '[09:55:06] ALLOCATING IP: 10.244.11.89 via DHCP_G_1',
    '[09:55:07] REGISTER_SUCCESS - ASSIGNED TO TENANT: "AquaCorp Industrial"',
    '[09:55:10] PULLING_INITIAL_FIRMWARE: v2.4.1.bin (18MB)',
    '[09:55:15] NODE_X01 ONLINE. SIGNAL: -44dBm'
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Add random telemetry log
      const timeStr = new Date().toLocaleTimeString('en-GB');
      const nodeNum = Math.floor(100 + Math.random() * 900);
      const newLog = `[${timeStr}] RECV_TELEMETRY_FROM NODE_AF_${nodeNum} - DATA_PKT_RCVD (144 bytes)`;
      setLogs(prev => [...prev.slice(-10), newLog]);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleAcknowledge = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-blue-50 text-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl block">router</span>
          </div>
          <div>
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">ACTIVE FLEET</p>
            <h3 className="font-mono text-xl font-bold text-slate-800">1,248,302</h3>
            <p className="text-[9px] text-primary flex items-center gap-0.5 font-bold font-mono">
              <span className="material-symbols-outlined text-xs">trending_up</span> +14.2k monthly
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-cyan-50 text-cyan-800 rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl block">hub</span>
          </div>
          <div>
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">GATEWAY UPTIME</p>
            <h3 className="font-mono text-xl font-bold text-slate-800">99.998%</h3>
            <p className="text-[9px] text-cyan-700 flex items-center gap-0.5 font-bold font-mono">
              <span className="material-symbols-outlined text-xs">check_circle</span> All regions nominal
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-red-50 text-red-650 rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl block animate-pulse text-red-600">warning</span>
          </div>
          <div>
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">CRITICAL FAULTS</p>
            <h3 className="font-mono text-xl font-bold text-red-650">0,014</h3>
            <p className="text-[9px] text-red-600 flex items-center gap-0.5 font-bold font-mono">
              <span className="material-symbols-outlined text-xs">emergency_home</span> Req. intervention
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-slate-100 text-slate-655 rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl block">update</span>
          </div>
          <div>
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">FIRMWARE ROLLOUT</p>
            <h3 className="font-mono text-xl font-bold text-slate-800">82%</h3>
            <p className="text-[9px] text-slate-400 flex items-center gap-0.5 font-bold font-mono">
              <span className="material-symbols-outlined text-xs">hourglass_empty</span> v2.4.1 in progress
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Global Node Topology Map (Col 8) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-slate-50/50">
            <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base">public</span>
              Global Node Topology &amp; Gateway Health
            </h3>
            <div className="flex gap-2 font-mono text-[9px]">
              <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded border border-slate-300 font-bold">LIVE TELEMETRY</span>
              <span className="px-2 py-0.5 bg-primary text-white rounded font-bold">RELIABILITY OVERLAY</span>
            </div>
          </div>
          <div className="flex-1 relative bg-slate-50 overflow-hidden flex items-center justify-center p-6">
            <img 
              className="max-h-full max-w-full object-contain opacity-55 mix-blend-luminosity" 
              src="/stitch-placeholder-300x300.svg" 
              alt="Global Map Layout" 
            />
            {/* KPI overlay absolute card */}
            <div className="absolute bottom-4 left-4 p-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl space-y-2.5 shadow-md w-60">
              <p className="font-mono text-[9px] font-bold text-slate-400 border-b border-slate-100 pb-1 uppercase tracking-wider">Regional Anomalies</p>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Southeast Asia
                </span>
                <span className="font-mono font-bold text-red-655">High</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Northern Europe
                </span>
                <span className="font-mono font-bold text-amber-600">Med</span>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Alert Stream (Col 4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-display font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-red-650 text-base">history</span>
              Critical Alert Stream
            </h3>
            <button 
              onClick={() => setAlerts([])}
              className="font-mono text-[9px] font-bold text-primary uppercase hover:underline"
            >
              Clear
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {alerts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-450 space-y-2 py-10">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
                <p className="text-xs font-bold">All alerts acknowledged</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-lg border-l-4 text-xs space-y-1.5 transition-colors ${
                    alert.type === 'error' ? 'border-red-500 bg-red-50/20' :
                    alert.type === 'warning' ? 'border-amber-500 bg-amber-50/20' :
                    'border-primary bg-blue-50/20'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`font-bold ${
                      alert.type === 'error' ? 'text-red-750' :
                      alert.type === 'warning' ? 'text-amber-750' : 'text-primary'
                    }`}>
                      {alert.id}: {alert.title}
                    </span>
                    <span className="font-mono text-[9px] text-slate-400">{alert.time}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{alert.desc}</p>
                  <div className="flex gap-2 pt-1.5">
                    <button 
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-2.5 py-0.5 bg-slate-900 text-white rounded text-[9px] font-mono font-bold uppercase tracking-wider"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Terminal Provisioning Logs & Cohorts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs flex flex-col h-80">
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
            <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base">terminal</span>
              Device Provisioning Logs
            </h3>
            <span className="font-mono text-[10px] text-slate-400">72 New / 1hr</span>
          </div>
          <div className="flex-1 font-mono text-[10px] bg-slate-950 text-emerald-400 p-4 rounded-xl overflow-y-auto space-y-1.5 shadow-inner">
            {logs.map((log, idx) => (
              <p key={idx} className="opacity-90 leading-relaxed">{log}</p>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs flex flex-col h-80 justify-between">
          <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <span className="material-symbols-outlined text-primary text-base">cloud_download</span>
            Firmware Deployment Cohorts
          </h3>
          <div className="space-y-4 flex-1 pt-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700">Stable Cohort (v2.4.0)</span>
                <span className="text-slate-400 font-mono">912,400 Devices (98%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700">Beta Cohort (v2.4.1-rc3)</span>
                <span className="text-slate-400 font-mono">32,200 Devices (65%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-700 h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-mono text-[9px] font-bold py-2 rounded-lg uppercase tracking-wider transition-colors shadow-md shadow-red-650/10">
              Force Update Critical
            </button>
            <button className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-750 font-mono text-[9px] font-bold py-2 rounded-lg uppercase tracking-wider transition-colors">
              Rollout Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
