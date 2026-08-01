import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardInventory() {
  const navigate = useNavigate();

  const orders = [
    {
      id: "HF-2024-001",
      date: "Oct 24, 2026",
      model: "X1-Turbo Centrifugal",
      status: "In Transit",
      statusColor: "blue",
      img: "/alphaflow-inventory.jpg"
    },
    {
      id: "HF-2024-002",
      date: "Oct 23, 2026",
      model: "S3-Deep Submersible",
      status: "Delivered",
      statusColor: "emerald",
      img: "/hydracore-inventory.jpg"
    },
    {
      id: "HF-2024-003",
      date: "Oct 23, 2026",
      model: "X2-Pro High Flow",
      status: "Processing",
      statusColor: "amber",
      img: "/titan-inventory.jpg"
    }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Dealer Dashboard</h2>
          <p className="text-slate-500 text-sm">Industrial Operations Center • Northwest Region</p>
        </div>
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg">
          <button className="bg-white text-primary px-4 py-1.5 rounded-md shadow-xs font-mono text-[10px] font-bold uppercase tracking-wider">Last 24h</button>
          <button className="text-slate-500 hover:text-slate-700 px-4 py-1.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider transition-colors">Last 7d</button>
          <button className="text-slate-500 hover:text-slate-700 px-4 py-1.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider transition-colors">Monthly</button>
        </div>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-primary">
              <span className="material-symbols-outlined block">inventory_2</span>
            </div>
            <span className="text-emerald-600 text-xs font-bold font-mono flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span> +12%
            </span>
          </div>
          <h3 className="text-slate-400 font-mono text-xs uppercase tracking-wider mb-1">Active Stock</h3>
          <p className="font-mono text-3xl font-bold text-slate-800">1,284</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
              <span className="material-symbols-outlined block">local_shipping</span>
            </div>
            <span className="text-slate-400 text-xs font-mono flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span> 4 Pending
            </span>
          </div>
          <h3 className="text-slate-400 font-mono text-xs uppercase tracking-wider mb-1">Pending Shipments</h3>
          <p className="font-mono text-3xl font-bold text-slate-800">42</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-cyan-50 rounded-lg text-cyan-700">
              <span className="material-symbols-outlined block">receipt_long</span>
            </div>
            <span className="text-emerald-600 text-xs font-bold font-mono flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span> $12.4k
            </span>
          </div>
          <h3 className="text-slate-400 font-mono text-xs uppercase tracking-wider mb-1">Recent Sales</h3>
          <p className="font-mono text-3xl font-bold text-slate-800">156</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <span className="material-symbols-outlined block">engineering</span>
            </div>
            <span className="text-red-600 text-xs font-semibold font-mono flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">warning</span> 2 Priority
            </span>
          </div>
          <h3 className="text-slate-400 font-mono text-xs uppercase tracking-wider mb-1">Open Installs</h3>
          <p className="font-mono text-3xl font-bold text-slate-800">08</p>
        </div>
      </div>

      {/* Composite Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Orders Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-xs">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-display font-bold text-slate-900 text-lg">Recent Orders</h2>
            <button 
              onClick={() => navigate('/dealer/procurement')}
              className="text-primary font-mono text-xs font-bold uppercase tracking-wider hover:underline"
            >
              View All Orders
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Model</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">{order.id}</td>
                    <td className="px-6 py-4 text-slate-500">{order.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-100 rounded border border-slate-200 p-1 flex items-center justify-center">
                          <img className="max-w-full max-h-full object-contain" src={order.img} alt={order.model} />
                        </div>
                        <span className="font-bold text-slate-800">{order.model}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        order.statusColor === 'blue' ? 'bg-blue-50 text-primary border-blue-100' :
                        order.statusColor === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-slate-400 hover:text-primary rounded hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-base block">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Alerts & Actions */}
        <div className="space-y-6">
          {/* Stock Alert Section */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
              <span className="material-symbols-outlined text-red-500 text-lg">report_problem</span>
              <h2 className="font-display font-bold text-slate-900 text-base">Stock Alerts</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50/55 border border-red-100 rounded-lg">
                <div>
                  <p className="text-xs font-bold text-slate-800">X1-Turbo Unit</p>
                  <p className="text-slate-500 text-[10px]">Inventory: <span className="font-mono text-red-600 font-bold">02</span> / 20</p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider transition-all">Reorder</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div>
                  <p className="text-xs font-bold text-slate-800">P4-MultiStage</p>
                  <p className="text-slate-500 text-[10px]">Inventory: <span className="font-mono text-slate-800 font-bold">05</span> / 15</p>
                </div>
                <button className="border border-slate-200 text-slate-600 px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-slate-100 transition-all">Reorder</button>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-slate-900 rounded-xl p-6 text-white shadow-xs relative overflow-hidden group">
            <h2 className="font-display font-bold text-base mb-4 relative z-10">Operational Hub</h2>
            <div className="grid grid-cols-1 gap-3 relative z-10">
              <button 
                onClick={() => navigate('/dealer/register')}
                className="w-full bg-white hover:bg-slate-50 text-primary py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-base">add_shopping_cart</span>
                New Sale Entry
              </button>
              <button 
                onClick={() => navigate('/dealer/procurement')}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-base">local_mall</span>
                Bulk Stock Order
              </button>
              <button 
                onClick={() => navigate('/dealer/installations')}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-base">assignment_ind</span>
                Assign Engineer
              </button>
            </div>
            <div className="absolute right-0 bottom-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 translate-y-4">
              <span className="material-symbols-outlined text-[100px] block" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
            </div>
          </div>

          {/* Telemetry Mini Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-4">Live System Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Pressure Sensors</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[75%] h-full bg-primary animate-pulse"></div>
                  </div>
                  <span className="font-mono font-bold text-slate-800">98%</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Network Latency</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[25%] h-full bg-red-500"></div>
                  </div>
                  <span className="font-mono font-bold text-slate-800">24ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
