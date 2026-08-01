import React, { useState } from 'react';

export default function InstallationManagement() {
  const [selectedJob, setSelectedJob] = useState({
    id: 1,
    client: 'Precision Tech AG',
    model: 'HydraFlow X1-Pro',
    date: '24 Oct',
    dist: '7.2 km'
  });

  const [selectedEngineer, setSelectedEngineer] = useState({
    id: 1,
    name: 'Klaus Schmidt',
    dist: '2.4 km'
  });

  const [selectedDay, setSelectedDay] = useState(25);

  const pendingQueue = [
    { id: 1, client: 'Precision Tech AG', model: 'HydraFlow X1-Pro', date: '24 Oct', dist: '7.2 km' },
    { id: 2, client: 'Müller Beverages', model: 'Industrial Lift 500', date: '26 Oct', dist: '14.8 km' },
    { id: 3, client: 'Greenway Logistics', model: 'Eco-Sump 2.0', date: '27 Oct', dist: '3.1 km' }
  ];

  const engineers = [
    { id: 1, name: 'Klaus Schmidt', status: 'Available', statusColor: 'emerald', dist: '2.4 km', load: '2 / 5', avatar: '/avatar-klaus.jpg' },
    { id: 2, name: 'Elena Weber', status: 'At Customer', statusColor: 'amber', dist: '8.1 km', load: '4 / 5', avatar: '/avatar-elena.jpg' },
    { id: 3, name: 'Marcus Hoffman', status: 'Available', statusColor: 'emerald', dist: '5.7 km', load: '1 / 5', avatar: '/avatar-marcus.jpg' }
  ];

  const handleConfirm = () => {
    alert(`Installation Scheduled!\nJob: ${selectedJob.client}\nEngineer: ${selectedEngineer.name}\nDate: Oct ${selectedDay}\nNotification sent to technician and customer.`);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Pending Sync</p>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-primary">12</span>
            <span className="text-xs text-slate-500 font-medium">New Orders</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Active Installs</p>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-cyan-700">08</span>
            <span className="text-xs text-slate-500 font-medium">In Progress</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Avg. TAT</p>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-slate-800">4.2</span>
            <span className="text-xs text-slate-500 font-medium">Days</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">Engineer Load</p>
          <div className="flex flex-col w-full mt-1">
            <span className="font-mono text-2xl font-bold text-slate-800">86%</span>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map Widget (Center Piece) */}
        <div className="col-span-12 lg:col-span-8 h-[400px] relative rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white/90 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
              <span className="font-display font-semibold text-xs text-slate-800">Dealer Hub: Stuttgart West</span>
            </div>
          </div>
          {/* Mock Map Background */}
          <div className="w-full h-full bg-slate-100">
            <img
              className="w-full h-full object-cover grayscale opacity-80"
              src="/installation-map.jpg"
              alt="Map"
            />
          </div>
          {/* Map Overlays */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5">
            <button className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 text-slate-600 transition-colors">
              <span className="material-symbols-outlined text-base block">add</span>
            </button>
            <button className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 text-slate-600 transition-colors">
              <span className="material-symbols-outlined text-base block">remove</span>
            </button>
            <button className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 text-slate-600 transition-colors">
              <span className="material-symbols-outlined text-base block">my_location</span>
            </button>
          </div>
        </div>

        {/* Pending Installations Queue */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-xl flex flex-col shadow-xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-display font-bold text-slate-900">Pending Queue</h3>
            <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded text-[10px] font-bold uppercase font-mono">
              12 Actionable
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[300px]">
            {pendingQueue.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                  selectedJob.id === job.id
                    ? 'border-primary bg-blue-50/10'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <h4 className="font-bold text-slate-800 text-xs">{job.client}</h4>
                  <span className="font-mono text-[10px] text-slate-400">{job.date}</span>
                </div>
                <p className="text-slate-500 text-xs mb-2">Model: {job.model}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                  <span>{job.dist} from hub</span>
                </div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button className="flex-1 py-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-md">
                    Assign
                  </button>
                  <button className="p-1.5 border border-slate-200 text-slate-500 rounded-md hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-xs block">visibility</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Engineers List */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="font-display font-bold text-slate-900">Available Engineers</h3>
              <p className="text-slate-500 text-xs">Real-time telemetry from fleet</p>
            </div>
            <button className="text-primary font-mono text-xs font-bold uppercase tracking-wider hover:underline">
              View Fleet View
            </button>
          </div>
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left min-w-[400px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                  <th className="pb-3">ENGINEER</th>
                  <th className="pb-3">STATUS</th>
                  <th className="pb-3">DISTANCE</th>
                  <th className="pb-3">WORKLOAD</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {engineers.map((eng) => (
                  <tr
                    key={eng.id}
                    onClick={() => setSelectedEngineer(eng)}
                    className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${
                      selectedEngineer.id === eng.id ? 'bg-blue-50/10' : ''
                    }`}
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img className="w-8 h-8 rounded-full border border-slate-200 object-cover" src={eng.avatar} alt={eng.name} />
                        <span className="font-bold text-slate-800">{eng.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          eng.statusColor === 'emerald' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                        }`}></span>
                        <span className={`text-xs font-bold ${
                          eng.statusColor === 'emerald' ? 'text-emerald-700' : 'text-amber-700'
                        }`}>{eng.status}</span>
                      </div>
                    </td>
                    <td className="py-4 font-mono text-slate-600">{eng.dist}</td>
                    <td className="py-4 font-mono text-slate-600">{eng.load}</td>
                    <td className="py-4 text-right">
                      <button className="text-primary font-mono text-xs font-bold uppercase tracking-wider hover:underline">
                        {selectedEngineer.id === eng.id ? 'Selected' : 'Select'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assign & Schedule Workflow */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-display font-bold text-slate-900">Assign &amp; Schedule</h3>
          </div>
          <div className="p-6 md:p-8 flex-1 space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-mono font-bold text-xs">1</div>
                <div className="flex-1 w-0.5 bg-slate-200 my-1"></div>
              </div>
              <div className="pb-4 flex-1">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-1">Select Order</h4>
                <p className="text-xs text-slate-500">Choose an installation from the pending queue.</p>
                <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-700 shadow-inner">
                  <span>{selectedJob.client} ({selectedJob.model})</span>
                  <span className="material-symbols-outlined text-primary text-base block">check_circle</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-mono font-bold text-xs">2</div>
                <div className="flex-1 w-0.5 bg-slate-200 my-1"></div>
              </div>
              <div className="pb-4 flex-1">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-1">Assign Engineer</h4>
                <p className="text-xs text-slate-500">Select an available technician for this region.</p>
                <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-700 shadow-inner">
                  <span>{selectedEngineer.name} ({selectedEngineer.dist} away)</span>
                  <span className="material-symbols-outlined text-primary text-base block">check_circle</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-mono font-bold text-xs">3</div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-1">Schedule Date</h4>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-2 font-mono">
                  {[24, 25, 26, 27].map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`flex-shrink-0 w-12 h-12 rounded-lg flex flex-col items-center justify-center text-xs transition-colors border ${
                        selectedDay === day
                          ? 'border-primary bg-primary text-white font-bold'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span className="text-[9px] uppercase">
                        {day === 24 ? 'MON' : day === 25 ? 'TUE' : day === 26 ? 'WED' : 'THU'}
                      </span>
                      <span className="text-sm font-bold leading-none">{day}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <span className="material-symbols-outlined text-sm">info</span>
              <span>Notification will be sent upon confirmation.</span>
            </div>
            <button
              onClick={handleConfirm}
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-lg shadow-md hover:shadow-primary/10 active:scale-98 transition-all"
            >
              Confirm Installation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
