import React, { useState } from 'react';

export default function CustomerRegistrationSale() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [segment, setSegment] = useState('Residential');
  const [address, setAddress] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(1);
  const [selectedWarranty, setSelectedWarranty] = useState('standard');

  const products = [
    {
      id: 1,
      name: "HF-Series X100",
      description: "High-pressure residential pump. 1.5 HP, Smart-Connect enabled.",
      stockText: "In Stock: 12",
      price: 1249.00
    },
    {
      id: 2,
      name: "FlowMaster Z50",
      description: "Compact agricultural solution. Low energy consumption.",
      stockText: "Low Stock: 2",
      price: 899.00
    },
    {
      id: 3,
      name: "Turbo-V Dual",
      description: "Industrial dual-motor unit. Variable frequency drive.",
      stockText: "In Stock: 5",
      price: 3450.00
    }
  ];

  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];

  // Pricing calculations
  const basePrice = currentProduct.price;
  const installationFee = 150.00;
  const warrantyFee = selectedWarranty === 'extended' ? 199.00 : 0.00;
  const discount = basePrice * 0.10; // 10% dealer discount
  const totalSale = basePrice + installationFee + warrantyFee - discount;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Sale registered successfully!\nCustomer: ${customerName}\nProduct: ${currentProduct.name}\nTotal: $${totalSale.toFixed(2)}`);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-slate-100 pb-6">
        <div>
          <nav className="flex text-xs text-slate-400 mb-2 font-mono uppercase tracking-wider">
            <span className="hover:text-primary cursor-pointer">Sales</span>
            <span className="mx-2">/</span>
            <span className="text-slate-800">New Registration</span>
          </nav>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Register New Purchase</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 border border-slate-200 text-slate-600 font-bold text-xs rounded-lg hover:bg-slate-50 transition-colors">
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md shadow-primary/10"
          >
            Confirm Sale & Request Install
            <span className="material-symbols-outlined text-sm block">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Customer & Product Info */}
        <div className="lg:col-span-8 space-y-8">
          {/* Customer Info Form */}
          <section className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded bg-blue-50 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-lg block" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">Customer Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-hidden text-sm text-slate-800 placeholder-slate-400"
                  placeholder="e.g. Robert Jensen"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Email Address</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-hidden text-sm text-slate-800 placeholder-slate-400"
                  placeholder="r.jensen@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-hidden text-sm text-slate-800 placeholder-slate-400"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Customer Segment</label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-hidden text-sm text-slate-800 cursor-pointer"
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Agricultural</option>
                  <option>Industrial</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-500 mb-2">Installation Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-hidden text-sm text-slate-800 resize-none placeholder-slate-400"
                  placeholder="Street, Building, City, ZIP Code"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Product Selection */}
          <section className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded bg-blue-50 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-lg block" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">Product Selection</h3>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all flex flex-col justify-between ${
                      selectedProduct === product.id
                        ? 'border-primary bg-blue-50/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`font-display font-bold text-sm ${
                        selectedProduct === product.id ? 'text-primary' : 'text-slate-800'
                      }`}>
                        {product.name}
                      </span>
                      {selectedProduct === product.id ? (
                        <span className="material-symbols-outlined text-primary text-base block">check_circle</span>
                      ) : (
                        <div className="w-4 h-4 border border-slate-300 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{product.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className={`font-mono text-[9px] px-2 py-0.5 rounded ${
                        product.stockText.includes('Low')
                          ? 'bg-red-50 text-red-700 font-semibold'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {product.stockText}
                      </span>
                      <span className="font-mono font-bold text-sm text-slate-800">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-500 mb-2">Hardware Serial Number (Unique ID)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg font-mono focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-hidden text-sm text-slate-800 placeholder-slate-400"
                    placeholder="HF-SN-2026-X100"
                  />
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider">
                    <span className="material-symbols-outlined text-base">qr_code_scanner</span>
                    Scan
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">Located on the base plate label of the pump unit.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Summary & Warranty */}
        <div className="lg:col-span-4 space-y-6">
          {/* Warranty Activation */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative overflow-hidden">
            <h3 className="font-display font-bold text-lg text-slate-900 mb-6">Warranty & Service</h3>
            <div className="space-y-4">
              <div
                onClick={() => setSelectedWarranty('standard')}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer border transition-all ${
                  selectedWarranty === 'standard'
                    ? 'bg-blue-50/20 border-primary'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedWarranty === 'standard' ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <span className="material-symbols-outlined text-base block">verified_user</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-xs">Standard Warranty</p>
                    <p className="text-[10px] text-slate-500">2 Years Parts &amp; Labor</p>
                  </div>
                </div>
                {selectedWarranty === 'standard' ? (
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center border border-primary">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-4 h-4 border border-slate-300 rounded-full"></div>
                )}
              </div>

              <div
                onClick={() => setSelectedWarranty('extended')}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer border transition-all ${
                  selectedWarranty === 'extended'
                    ? 'bg-cyan-50/20 border-cyan-700'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedWarranty === 'extended' ? 'bg-cyan-700 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <span className="material-symbols-outlined text-base block">stars</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-xs">Extended Protection</p>
                    <p className="text-[10px] text-slate-500">5 Years + Annual Checkups</p>
                  </div>
                </div>
                {selectedWarranty === 'extended' ? (
                  <div className="w-4 h-4 bg-cyan-700 rounded-full flex items-center justify-center border border-cyan-700">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-4 h-4 border border-slate-300 rounded-full"></div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Base Price</span>
                  <span className="font-mono font-semibold text-slate-800">${basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Installation Fee</span>
                  <span className="font-mono font-semibold text-slate-800">${installationFee.toFixed(2)}</span>
                </div>
                {warrantyFee > 0 && (
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Warranty Premium</span>
                    <span className="font-mono font-semibold text-slate-800">${warrantyFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Dealer Discount</span>
                  <span className="font-mono font-semibold text-red-600">-${discount.toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-100 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-sm text-slate-900">Total Sale</span>
                  <span className="font-mono font-bold text-base text-primary">${totalSale.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Installation Details Quick Look */}
          <div className="bg-slate-900 text-slate-100 p-6 rounded-xl shadow-lg">
            <h4 className="font-mono text-[10px] font-bold text-primary-fixed-dim uppercase tracking-wider mb-4">Installation Availability</h4>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex flex-col items-center justify-center w-11 h-12 bg-slate-800 rounded-lg border border-slate-700/50">
                <span className="text-[9px] uppercase font-bold text-slate-400">Oct</span>
                <span className="text-lg font-bold leading-none text-white">24</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Earliest Availability</p>
                <p className="text-[10px] text-slate-400">Service Team: Delta-Blue</p>
              </div>
            </div>
            <div className="space-y-2.5 text-xs text-slate-400 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>Distance: 12.4 miles from hub</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>Estimated time: 2.5 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
