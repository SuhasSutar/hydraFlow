import React, { useState } from 'react';

export default function ServiceRequestTicket() {
  const [step, setStep] = useState(1);
  const [selectedPump, setSelectedPump] = useState('p1');
  const [faultCategory, setFaultCategory] = useState('Power Failure');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(22);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Afternoon (13:00 - 17:00)');
  const [presenceConfirmed, setPresenceConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const nextStep = () => {
    if (step < 5) setStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-8 p-6">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md">
          <span className="material-symbols-outlined text-5xl font-bold">check</span>
        </div>
        <div className="space-y-3">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-primary">Request Submitted Successfully!</h2>
          <p className="text-slate-500 text-sm">
            Service Ticket <b>#SR-88219</b> has been raised. A technician has been assigned and will arrive on Monday, Oct {selectedDate} during the {selectedTimeSlot.split(' ')[0]} window.
          </p>
        </div>
        <div className="flex flex-col gap-3 max-w-xs mx-auto pt-4">
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-md shadow-primary/10"
          >
            Track Ticket Status
          </button>
          <button 
            onClick={() => { setSubmitted(false); setStep(1); }}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-bold text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-100 pb-6">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">New Service Request</h2>
        <p className="text-slate-500 text-sm mt-1">Complete the following steps to schedule a technical inspection.</p>
      </div>

      {/* Stepper Progress */}
      <div className="relative pb-4">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 z-0"></div>
        <div 
          className="absolute top-5 left-0 h-0.5 bg-primary z-0 transition-all duration-500 rounded-full" 
          style={{ width: `${((step - 1) / 4) * 100}%` }}
        ></div>
        <div className="relative z-10 flex justify-between items-center text-center">
          {[
            { num: 1, label: 'Asset' },
            { num: 2, label: 'Issue' },
            { num: 3, label: 'Photos' },
            { num: 4, label: 'Schedule' },
            { num: 5, label: 'Review' }
          ].map((item) => (
            <div key={item.num} className="flex flex-col items-center">
              <div 
                onClick={() => { if (item.num < step) setStep(item.num); }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs border-4 border-white shadow-sm cursor-pointer transition-all ${
                  step === item.num ? 'bg-primary text-white scale-110' :
                  step > item.num ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {step > item.num ? (
                  <span className="material-symbols-outlined text-white text-sm block">check</span>
                ) : item.num}
              </div>
              <span className={`text-[10px] font-mono uppercase tracking-wider mt-2 font-bold ${
                step === item.num ? 'text-primary' : 'text-slate-400'
              }`}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-xl shadow-xs min-h-[400px] flex flex-col justify-between">
        <div>
          {/* Step 1: Asset Selection */}
          {step === 1 && (
            <section className="space-y-6">
              <h3 className="font-display font-bold text-slate-800 text-lg">Select the affected pump</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setSelectedPump('p1')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 relative ${
                    selectedPump === 'p1' ? 'border-primary bg-blue-50/10' : 'border-slate-200 bg-white hover:border-slate-350'
                  }`}
                >
                  <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-3xl">settings_input_component</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Industrial Centrifugal V4</p>
                    <p className="font-mono text-[10px] text-slate-400">ID: HF-9920-A1</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold rounded uppercase">Active Warranty</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    {selectedPump === 'p1' ? (
                      <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                    ) : (
                      <div className="w-4 h-4 border border-slate-300 rounded-full"></div>
                    )}
                  </div>
                </div>

                <div
                  onClick={() => setSelectedPump('p2')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 relative ${
                    selectedPump === 'p2' ? 'border-primary bg-blue-50/10' : 'border-slate-200 bg-white hover:border-slate-350'
                  }`}
                >
                  <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                    <span className="material-symbols-outlined text-3xl">settings_input_component</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Submersible High-Flow</p>
                    <p className="font-mono text-[10px] text-slate-400">ID: HF-8841-B9</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200 text-[9px] font-bold rounded uppercase">Warranty Expired</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    {selectedPump === 'p2' ? (
                      <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                    ) : (
                      <div className="w-4 h-4 border border-slate-300 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Issue Description */}
          {step === 2 && (
            <section className="space-y-6">
              <h3 className="font-display font-bold text-slate-800 text-lg">Describe the issue</h3>
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-500">Category of Fault</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Overheating', 'Abnormal Noise', 'Low Pressure', 'External Leak', 'Power Failure', 'Other'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFaultCategory(cat)}
                      className={`py-2.5 px-4 border rounded-lg text-xs font-bold text-left flex items-center gap-2 transition-all ${
                        faultCategory === cat
                          ? 'border-primary bg-blue-50/20 text-primary'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {cat === 'Overheating' ? 'thermostat' :
                         cat === 'Abnormal Noise' ? 'noise_aware' :
                         cat === 'Low Pressure' ? 'speed' :
                         cat === 'External Leak' ? 'leak_add' :
                         cat === 'Power Failure' ? 'bolt' : 'more_horiz'}
                      </span>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Detailed Observation</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-4 text-xs focus:ring-1 focus:ring-primary outline-hidden text-slate-700 resize-none"
                  placeholder="e.g. Pump fails to start even after reset. Control panel shows E-04 error code..."
                  rows="4"
                ></textarea>
              </div>
            </section>
          )}

          {/* Step 3: Photo Upload */}
          {step === 3 && (
            <section className="space-y-6">
              <h3 className="font-display font-bold text-slate-800 text-lg">Upload Fault Evidence</h3>
              <p className="text-slate-500 text-xs">High-quality photos help our engineers diagnose the problem faster.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="aspect-square bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                  <span className="material-symbols-outlined text-3xl text-slate-400 block">add_a_photo</span>
                  <span className="text-[9px] font-mono uppercase tracking-wider font-bold mt-2 text-slate-400">Add Photo</span>
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-200">
                  <img className="w-full h-full object-cover" src="/error-e04.jpg" alt="Error E-04" />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-200">
                  <img className="w-full h-full object-cover" src="/centrifugal-pump.jpg" alt="Centrifugal pump" />
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5 block">info</span>
                <div className="text-xs text-slate-500 leading-relaxed">
                  <p className="font-bold text-slate-800">Photo Tips</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Capture the full asset and surrounding pipes.</li>
                    <li>Include a clear shot of the serial number plate.</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Step 4: Schedule Selection */}
          {step === 4 && (
            <section className="space-y-6">
              <h3 className="font-display font-bold text-slate-800 text-lg">Preferred Service Window</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-3">Select Date (October 2026)</label>
                  <div className="flex gap-3 overflow-x-auto pb-2 font-mono">
                    {[22, 23, 24, 25, 26].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDate(day)}
                        className={`min-w-[64px] py-3 border-2 rounded-xl flex flex-col items-center justify-center transition-colors ${
                          selectedDate === day
                            ? 'border-primary bg-primary text-white font-bold'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        <span className="text-[9px] uppercase font-bold">{day === 22 ? 'MON' : day === 23 ? 'TUE' : day === 24 ? 'WED' : day === 25 ? 'THU' : 'FRI'}</span>
                        <span className="text-base font-extrabold mt-1">{day}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-500">Select Time Slot</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Morning (09:00 - 12:00)', 'Afternoon (13:00 - 17:00)', 'Evening (18:00 - 20:00)'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-3 px-4 border-2 rounded-xl text-xs font-bold text-center transition-all ${
                          selectedTimeSlot === slot
                            ? 'border-primary bg-blue-50/20 text-primary font-bold'
                            : 'border-slate-200 bg-white hover:border-slate-350 text-slate-600'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Step 5: Summary Review */}
          {step === 5 && (
            <section className="space-y-6">
              <h3 className="font-display font-bold text-slate-800 text-lg">Review Request Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-250 rounded-xl text-xs">
                  <div>
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-1">ASSET</p>
                    <p className="font-bold text-slate-800">{selectedPump === 'p1' ? 'Industrial Centrifugal V4 (HF-9920-A1)' : 'Submersible High-Flow (HF-8841-B9)'}</p>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-primary hover:underline font-mono uppercase font-bold text-[10px]">Edit</button>
                </div>

                <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-250 rounded-xl text-xs">
                  <div>
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-1">ISSUE</p>
                    <p className="font-bold text-slate-800">{faultCategory}</p>
                    {description && <p className="text-slate-500 italic mt-1">"{description}"</p>}
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="text-primary hover:underline font-mono uppercase font-bold text-[10px]">Edit</button>
                </div>

                <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-250 rounded-xl text-xs">
                  <div>
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-1">SCHEDULE</p>
                    <p className="font-bold text-slate-800">Monday, {selectedDate}nd Oct | {selectedTimeSlot}</p>
                  </div>
                  <button type="button" onClick={() => setStep(4)} className="text-primary hover:underline font-mono uppercase font-bold text-[10px]">Edit</button>
                </div>

                <div className="flex justify-between items-center p-4 bg-emerald-50/20 border border-emerald-100 rounded-xl text-xs">
                  <div>
                    <p className="font-mono text-[9px] text-emerald-600 uppercase tracking-wider mb-1">SERVICE COST</p>
                    <p className="font-bold text-emerald-800">Covered under AMC/Warranty</p>
                  </div>
                  <span className="material-symbols-outlined text-emerald-700 text-base">verified</span>
                </div>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={presenceConfirmed}
                    onChange={(e) => setPresenceConfirmed(e.target.checked)}
                    className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                  />
                  <span>I confirm that someone will be present at the site to provide access to the technical team.</span>
                </label>
              </div>
            </section>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="mt-8 flex justify-between items-center border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={prevStep}
            className={`px-5 py-2 rounded-lg border border-slate-200 text-slate-600 font-bold text-xs transition-colors hover:bg-slate-50 ${
              step === 1 ? 'invisible' : ''
            }`}
          >
            Back
          </button>
          {step === 5 ? (
            <button
              type="button"
              onClick={handleRegister}
              disabled={!presenceConfirmed}
              className={`px-8 py-2.5 rounded-lg font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 ${
                presenceConfirmed 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/10' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              Submit Ticket
              <span className="material-symbols-outlined text-sm block">arrow_forward</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-primary/10 active:scale-98"
            >
              Continue
              <span className="material-symbols-outlined text-sm block">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
