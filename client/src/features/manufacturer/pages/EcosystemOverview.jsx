import React from 'react';

export default function EcosystemOverview() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Ecosystem Overview</h2>
        <p className="text-slate-500 text-sm">Real-time operational status across global deployments.</p>
      </div>

      {/* Bento Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Pumps */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-primary rounded-lg">
              <span className="material-symbols-outlined block">water_pump</span>
            </div>
            <span className="flex items-center text-emerald-600 font-bold font-mono text-sm">
              <span className="material-symbols-outlined text-sm mr-1">trending_up</span>+12.5%
            </span>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Total Pumps Active</p>
            <h3 className="font-mono text-3xl font-bold text-slate-800">42,891</h3>
          </div>
          <div className="h-10 mt-4 w-full">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
              <path
                d="M0 35 Q 10 32, 20 30 T 40 25 T 60 28 T 80 15 T 100 5"
                fill="none"
                stroke="#003c90"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
        </div>

        {/* Pending Installations */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
              <span className="material-symbols-outlined block">pending_actions</span>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Pending Installations</p>
            <h3 className="font-mono text-3xl font-bold text-slate-800">184</h3>
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[75%]"></div>
            </div>
            <span className="font-mono text-[10px] text-slate-400">75% Complete</span>
          </div>
        </div>

        {/* Service Tickets */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between shadow-xs border-l-4 border-l-red-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <span className="material-symbols-outlined block">report_problem</span>
            </div>
            <span className="bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Urgent</span>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Open Service Tickets</p>
            <h3 className="font-mono text-3xl font-bold text-slate-800">24</h3>
          </div>
          <p className="mt-4 text-red-600 text-xs font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">schedule</span> Requires Immediate Action
          </p>
        </div>

        {/* Warranty Claims */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between shadow-xs">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-cyan-50 text-cyan-700 rounded-lg">
              <span className="material-symbols-outlined block">verified</span>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Warranty Claims</p>
            <h3 className="font-mono text-3xl font-bold text-slate-800">1,102</h3>
          </div>
          <p className="mt-4 text-slate-500 text-xs">
            $142,500 Processing Value
          </p>
        </div>
      </div>

      {/* Regional & Logs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Regional Performance Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-display font-bold text-slate-900">Regional Service Performance</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">MTD</button>
              <button className="px-3 py-1 hover:bg-slate-100 rounded text-xs font-bold text-slate-400">YTD</button>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              {/* Texas */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">Texas Hub (Central)</span>
                  <span className="font-mono text-sm text-primary font-bold">98.2% Efficiency</span>
                </div>
                <div className="w-full bg-slate-100 h-8 rounded-lg overflow-hidden flex">
                  <div className="bg-primary w-[98%] h-full flex items-center px-4">
                    <span className="text-[10px] text-white font-bold tracking-wider">OPTIMAL</span>
                  </div>
                </div>
              </div>
              {/* California */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">California Hub (Pacific)</span>
                  <span className="font-mono text-sm text-slate-600 font-bold">84.5% Efficiency</span>
                </div>
                <div className="w-full bg-slate-100 h-8 rounded-lg overflow-hidden flex">
                  <div className="bg-slate-500 w-[84%] h-full flex items-center px-4">
                    <span className="text-[10px] text-white font-bold tracking-wider">MAINTENANCE REQ.</span>
                  </div>
                </div>
              </div>
              {/* New York */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">New York Hub (Atlantic)</span>
                  <span className="font-mono text-sm text-cyan-700 font-bold">92.1% Efficiency</span>
                </div>
                <div className="w-full bg-slate-100 h-8 rounded-lg overflow-hidden flex">
                  <div className="bg-cyan-700 w-[92%] h-full flex items-center px-4">
                    <span className="text-[10px] text-white font-bold tracking-wider">STABLE</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-around border-t border-slate-100 pt-6">
              <div className="text-center">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Avg. Response Time</p>
                <p className="font-mono text-lg font-bold text-slate-800">2.4h</p>
              </div>
              <div className="h-10 w-[1px] bg-slate-100"></div>
              <div className="text-center">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">First-Fix Rate</p>
                <p className="font-mono text-lg font-bold text-slate-800">94.1%</p>
              </div>
              <div className="h-10 w-[1px] bg-slate-100"></div>
              <div className="text-center">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Engineer Utilization</p>
                <p className="font-mono text-lg font-bold text-slate-800">76.0%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Log */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-display font-bold text-slate-900">Operational Log</h3>
            <span className="p-1 bg-slate-100 rounded-full">
              <span className="material-symbols-outlined text-sm block">history</span>
            </span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[300px] divide-y divide-slate-100">
            {/* Log Item 1 */}
            <div className="p-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Critical Fault Detected</p>
                  <p className="text-xs text-slate-500">Pump ID: #TX-9902 | Cavitation Warning</p>
                  <p className="font-mono text-[9px] text-slate-400 mt-1">Just Now • Houston, TX</p>
                </div>
              </div>
            </div>
            {/* Log Item 2 */}
            <div className="p-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                <div>
                  <p className="text-xs font-bold text-slate-800">New Installation Certified</p>
                  <p className="text-xs text-slate-500">Site: Apollo Data Center | Engineer: M. Ross</p>
                  <p className="font-mono text-[9px] text-slate-400 mt-1">14 mins ago • Phoenix, AZ</p>
                </div>
              </div>
            </div>
            {/* Log Item 3 */}
            <div className="p-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-500 shrink-0"></div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Service Ticket Updated</p>
                  <p className="text-xs text-slate-500">#ST-4421 | Parts Shipped: Seal Kit K-2</p>
                  <p className="font-mono text-[9px] text-slate-400 mt-1">42 mins ago • Newark, NJ</p>
                </div>
              </div>
            </div>
            {/* Log Item 4 */}
            <div className="p-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-700 shrink-0"></div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Warranty Claim Approved</p>
                  <p className="text-xs text-slate-500">Unit #AL-0039 | Defective Impeller</p>
                  <p className="font-mono text-[9px] text-slate-400 mt-1">2 hours ago • Chicago, IL</p>
                </div>
              </div>
            </div>
          </div>
          <button className="p-4 border-t border-slate-100 text-primary font-bold text-center text-xs hover:bg-slate-50 transition-all font-mono uppercase tracking-wider">
            View Full Audit Trail
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden h-[350px] relative group shadow-xs">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-101"
          style={{
            backgroundImage: "url('/installation-logistics-bg.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-all"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h4 className="font-display font-bold text-lg md:text-xl mb-1.5">Live Fleet Distribution</h4>
          <div className="flex gap-4">
            <span className="flex items-center gap-2 text-xs text-white/90">
              <span className="w-2.5 h-2.5 bg-primary rounded-full inline-block"></span> 82% Industrial
            </span>
            <span className="flex items-center gap-2 text-xs text-white/90">
              <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full inline-block"></span> 18% Agricultural
            </span>
          </div>
        </div>
        <button className="absolute top-6 right-6 bg-white p-3 rounded-xl border border-slate-200 shadow-md hover:bg-slate-50 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-700">map</span>
          <span className="font-mono text-xs font-bold text-slate-800 uppercase tracking-wider">Expand Fleet Map</span>
        </button>
      </div>
    </div>
  );
}
