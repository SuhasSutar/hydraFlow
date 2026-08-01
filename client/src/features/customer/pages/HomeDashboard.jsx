import React from 'react';

export default function HomeDashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Customer Portal</h1>
        <p className="text-xs text-slate-500">Overview of registered pumps, warranties, and service history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-slate-200 rounded-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase">My Pumps</div>
          <div className="text-3xl font-bold text-primary mt-1">2 Pumps</div>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase">IoT Device Health</div>
          <div className="text-3xl font-bold text-green-600 mt-1">100% Good</div>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase">Active Warranty</div>
          <div className="text-3xl font-bold text-slate-700 mt-1">Until Dec 2027</div>
        </div>
      </div>
    </div>
  );
}
