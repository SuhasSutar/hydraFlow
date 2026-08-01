import React, { useState } from 'react';

export default function AMCManagement() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [termYears, setTermYears] = useState(1);

  const plans = [
    {
      id: 'standard',
      name: 'Standard Care',
      price: 299,
      features: ['Semi-annual Inspections', 'Standard Parts Coverage', '48-hour Support SLA']
    },
    {
      id: 'premium',
      name: 'Premium Protect',
      price: 599,
      features: ['Quarterly Inspections', 'All Parts & Labor Covered', '24-hour Response SLA', 'Vibration Analysis']
    },
    {
      id: 'enterprise',
      name: 'Enterprise Shield',
      price: 1199,
      features: ['Monthly Inspections', 'Priority Technician Dispatch', '4-hour On-site SLA', 'Real-time AI telemetry warnings']
    }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[1];
  const totalPrice = currentPlan.price * termYears;

  const handleRenew = (e) => {
    e.preventDefault();
    alert(`Contract Renewed Successfully!\nPlan: ${currentPlan.name}\nTerm: ${termYears} Year(s)\nTotal Price: $${totalPrice}`);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Annual Maintenance Contracts (AMC)</h2>
          <p className="text-slate-500 text-sm">Review, extend, and manage active service agreements for your HydraFlow fleet.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-lg">
          <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></span>
          <span className="font-mono text-xs font-bold text-amber-700 uppercase tracking-wider">Renewal Due: 14 Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active AMC & Renew Form (Spans 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Contract Details */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="font-display font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              Active Service Plan Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">Contract ID</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5 font-mono">#AMC-990822</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">Assigned Team</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">Delta-Blue Munich</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">Next Scheduled Visit</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">Oct 24, 2026</p>
              </div>
            </div>
          </section>

          {/* Extend Contract Form */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-display font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Extend or Upgrade Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedPlan === plan.id
                      ? 'border-primary bg-blue-50/10'
                      : 'border-slate-200 bg-white hover:border-slate-350'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display font-bold text-sm text-slate-800">{plan.name}</span>
                      {selectedPlan === plan.id && (
                        <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                      )}
                    </div>
                    <ul className="text-[11px] text-slate-500 space-y-1.5 mt-4">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-primary text-xs shrink-0 mt-0.5">check</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-[10px] text-slate-400">per year</span>
                    <span className="font-mono font-bold text-lg text-slate-800">${plan.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Contract Term Length</label>
                <select
                  value={termYears}
                  onChange={(e) => setTermYears(parseInt(e.target.value))}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value={1}>1 Year Term</option>
                  <option value={2}>2 Year Term (Save 5%)</option>
                  <option value={3}>3 Year Term (Save 10%)</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Payment & Invoices (Spans 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Plan Summary Card */}
          <section className="bg-white border-2 border-primary/20 rounded-xl p-6 shadow-md relative overflow-hidden">
            <h3 className="font-display font-bold text-slate-900 text-base mb-6">Agreement Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Selected Plan</span>
                <span className="font-bold text-slate-800">{currentPlan.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Contract Term</span>
                <span className="font-bold text-slate-800">{termYears} Year(s)</span>
              </div>
              <div className="h-px bg-slate-100 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-sm text-slate-900">Total Price</span>
                <span className="font-mono font-bold text-lg text-primary">${totalPrice}</span>
              </div>
              <button
                onClick={handleRenew}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider transition-all mt-4 flex items-center justify-center gap-1.5 shadow-md shadow-primary/10"
              >
                Proceed to Payment
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </section>

          {/* Invoice History */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="font-display font-bold text-slate-900 text-sm mb-4">Previous AMC Billings</h3>
            <div className="divide-y divide-slate-100">
              <div className="py-3 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-800">#INV-2025-081</p>
                  <p className="text-[10px] text-slate-400 font-mono">Paid: Aug 24, 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-slate-800">$599.00</p>
                  <button className="text-primary hover:underline text-[10px] font-bold font-mono uppercase mt-0.5">Download</button>
                </div>
              </div>
              <div className="py-3 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-800">#INV-2024-114</p>
                  <p className="text-[10px] text-slate-400 font-mono">Paid: Aug 24, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-slate-800">$599.00</p>
                  <button className="text-primary hover:underline text-[10px] font-bold font-mono uppercase mt-0.5">Download</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
