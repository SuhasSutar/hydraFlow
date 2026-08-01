import React from 'react';

export default function TodaysDashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Service Engineer Portal</h1>
        <p className="text-xs text-slate-500">Daily assignments queue and installation checkpoints</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-slate-200 rounded-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase">Assigned Jobs Today</div>
          <div className="text-3xl font-bold text-primary mt-1">4 Tickets</div>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase">Completed Tasks</div>
          <div className="text-3xl font-bold text-green-600 mt-1">2 completed</div>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase">Spare Parts stock</div>
          <div className="text-3xl font-bold text-slate-700 mt-1">45 items</div>
        </div>
      </div>
    </div>
  );
}
