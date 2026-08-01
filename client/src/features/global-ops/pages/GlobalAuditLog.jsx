import React from 'react';

export default function GlobalAuditLog() {
  const auditLogs = [
    { timestamp: '2026-07-29 12:00:15', user: 'admin@hydraflow.com', action: 'Modified SLA Thresholds', scope: 'Global Policy', ip: '192.168.1.45' },
    { timestamp: '2026-07-29 11:45:00', user: 'munich_admin@mheavy.de', action: 'Uploaded Firmware v4.2.1', scope: 'Edge Controller Package', ip: '10.88.42.12' },
    { timestamp: '2026-07-29 10:12:34', user: 'delhi_dealer@pumps.in', action: 'Approved Extended Warranty Request', scope: 'Unit SN: CP-1100-M', ip: '202.54.10.89' }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="border-b border-slate-100 pb-6">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Security Audit Log</h2>
        <p className="text-slate-500 text-sm mt-1">Platform-wide governance tracking and system modifications log.</p>
      </div>

      {/* Main Logs Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Authorized User</th>
                <th className="p-4">Action Performed</th>
                <th className="p-4">Scope</th>
                <th className="p-4 text-right">Access IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {auditLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-4 font-mono text-slate-400">{log.timestamp}</td>
                  <td className="p-4 font-bold text-slate-800">{log.user}</td>
                  <td className="p-4 font-medium text-slate-700">{log.action}</td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-blue-50 text-primary border border-blue-100 rounded text-[9px] font-bold">{log.scope}</span></td>
                  <td className="p-4 text-right font-mono text-slate-450">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
