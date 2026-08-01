import React, { useState } from 'react';

export default function ProcurementOrderHistory() {
  const [quantities, setQuantities] = useState({
    1: 0,
    2: 2,
    3: 0
  });

  const catalog = [
    {
      id: 1,
      name: "FlowMax XL-5000",
      sku: "HF-IP-XL5-B",
      app: "Deep Well / Industrial",
      stock: "In Stock",
      stockColor: "emerald",
      price: 1450.00,
      img: "/alphaflow-v3.jpg"
    },
    {
      id: 2,
      name: "AquaGuard V2",
      sku: "HF-RS-AQ2-S",
      app: "Residential Booster",
      stock: "Low Stock",
      stockColor: "amber",
      price: 680.00,
      img: "/hydracore-x100.jpg"
    },
    {
      id: 3,
      name: "SubHydro 300",
      sku: "HF-IP-SH3-W",
      app: "Wastewater Management",
      stock: "In Stock",
      stockColor: "emerald",
      price: 2100.00,
      img: "/titan-centrifugal.jpg"
    }
  ];

  const handleQtyChange = (id, val) => {
    const num = Math.max(0, parseInt(val) || 0);
    setQuantities(prev => ({ ...prev, [id]: num }));
  };

  const incrementQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  // Cart Calculations
  const cartItems = catalog.map(item => ({
    ...item,
    qty: quantities[item.id] || 0
  })).filter(item => item.qty > 0);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const freight = subtotal > 0 ? (subtotal > 5000 ? 0.00 : 145.00) : 0.00;
  const discount = subtotal * 0.05; // 5% bulk discount
  const total = subtotal + freight - discount;

  const orderHistory = [
    { id: "#ORD-90822-HY", date: "Oct 24, 2026", items: "8x FlowMax XL-5000, 12x Repair Kits", total: 15420.00, status: "Paid Full" },
    { id: "#ORD-88741-HY", date: "Sep 12, 2026", items: "4x SubHydro 300, 2x Pressure Gauges", total: 9120.50, status: "Paid Full" }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Header Section with Tracking Overview */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-6">
        <div>
          <p className="text-primary font-mono text-xs font-bold uppercase tracking-wider mb-1">Procurement Management</p>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Restock &amp; Inventory Control</h3>
        </div>
        {/* Delivery Tracking Card */}
        <div className="w-full md:w-96 bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-800">Active Delivery: #HF-9042</span>
            <span className="text-[10px] font-mono font-bold text-primary bg-blue-50 px-2 py-0.5 rounded border border-blue-100">In Transit</span>
          </div>
          <div className="relative h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
            <div className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000" style={{ width: '65%' }}></div>
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 font-mono">
            <span>Factory (OH)</span>
            <span className="font-bold text-primary">Warehouse Dispatch</span>
            <span>Dealer (MN)</span>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Master Catalog & History */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Master Catalog View */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center bg-slate-50/50">
              <h4 className="font-display font-bold text-slate-900 text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">precision_manufacturing</span>
                Master Catalog
              </h4>
              <select className="text-xs border border-slate-200 rounded-lg bg-white px-3 py-1.5 focus:ring-1 focus:ring-primary focus:border-primary outline-hidden text-slate-700 font-semibold cursor-pointer">
                <option>Industrial Pumps</option>
                <option>Agricultural Pumps</option>
                <option>Residential Systems</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                    <th className="px-6 py-4">Model &amp; SKU</th>
                    <th className="px-6 py-4">Application</th>
                    <th className="px-6 py-4">Stock Status</th>
                    <th className="px-6 py-4">Wholesale Price</th>
                    <th className="px-6 py-4 text-right">Order Qty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {catalog.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded border border-slate-200 flex items-center justify-center p-1.5 shrink-0">
                            <img className="max-w-full max-h-full object-contain" src={item.img} alt={item.name} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{item.name}</p>
                            <p className="font-mono text-[10px] text-slate-400">SKU: {item.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{item.app}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border ${
                          item.stockColor === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.stockColor === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          {item.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-800">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <input
                            type="number"
                            min="0"
                            value={quantities[item.id] || 0}
                            onChange={(e) => handleQtyChange(item.id, e.target.value)}
                            className="w-14 py-1 text-center border border-slate-200 rounded-md font-mono text-xs focus:ring-1 focus:ring-primary outline-hidden"
                          />
                          <button
                            onClick={() => incrementQty(item.id)}
                            className="p-1 text-primary hover:bg-blue-50 rounded transition-colors"
                          >
                            <span className="material-symbols-outlined text-base block">add_circle</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
              <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 font-mono uppercase tracking-wider">
                View All Models (42)
                <span className="material-symbols-outlined text-sm block">expand_more</span>
              </button>
            </div>
          </section>

          {/* Order History Section */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h4 className="font-display font-bold text-slate-900 text-lg">Order History</h4>
              <button className="text-xs font-bold text-primary font-mono uppercase tracking-wider hover:bg-blue-50/50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors">
                Export CSV
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {orderHistory.map((order, index) => (
                <div key={index} className="p-6 flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 hover:bg-slate-50/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-base block">receipt_long</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{order.id}</p>
                      <p className="font-mono text-[10px] text-slate-400">Delivered: {order.date}</p>
                    </div>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <p className="font-mono text-[9px] text-slate-400 uppercase mb-1">Items</p>
                    <p className="text-xs text-slate-700">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-sm text-primary">${order.total.toFixed(2)}</p>
                    <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest font-mono">{order.status}</span>
                  </div>
                  <button className="flex items-center gap-1.5 border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all font-mono uppercase tracking-wider text-slate-600">
                    <span className="material-symbols-outlined text-sm">download</span>
                    PDF Invoice
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Shopping Cart & Totals */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Bulk Order Cart Interface */}
          <section className="bg-white border-2 border-primary/20 rounded-xl shadow-lg sticky top-0 overflow-hidden">
            <div className="p-6 bg-primary text-white">
              <h4 className="font-display font-bold text-base flex items-center gap-3">
                <span className="material-symbols-outlined text-xl">shopping_basket</span>
                Order Summary
              </h4>
              <p className="text-[10px] opacity-80 mt-1 font-mono uppercase tracking-wider">Pending Restock Order for MN-Warehouse-1</p>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6 border-b border-slate-100 pb-6 max-h-[250px] overflow-y-auto">
                {cartItems.length > 0 ? (
                  cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-start text-xs">
                      <div className="flex-1">
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-slate-400 font-mono text-[10px]">Qty: {item.qty} x ${item.price.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-slate-800">${(item.price * item.qty).toFixed(2)}</p>
                        <button
                          onClick={() => handleQtyChange(item.id, 0)}
                          className="text-red-500 text-[10px] hover:underline font-mono uppercase font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic text-center py-4">Select items from catalog to start order...</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Freight (Bulk LTL)</span>
                  <span className="font-mono font-semibold text-slate-800">${freight.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Volume Discount (5%)</span>
                    <span className="font-mono font-semibold text-emerald-600">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="h-px bg-slate-100 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-sm text-slate-900">Total</span>
                  <span className="font-mono font-bold text-base text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {subtotal > 0 && subtotal < 5000 && (
                  <div className="p-3 bg-blue-50 border border-blue-100 text-primary rounded-lg flex gap-2.5 items-start">
                    <span className="material-symbols-outlined text-sm mt-0.5 block">info</span>
                    <p className="text-[10px] leading-relaxed">Orders over $5,000 qualify for free freight. Add ${(5000 - subtotal).toFixed(2)} more to unlock.</p>
                  </div>
                )}
                <button
                  disabled={cartItems.length === 0}
                  onClick={() => alert('Order Placed Successfully!')}
                  className={`w-full py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/10 ${
                    cartItems.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-primary hover:bg-primary-dark text-white active:scale-98'
                  }`}
                >
                  Proceed to Checkout
                  <span className="material-symbols-outlined text-sm block">arrow_forward</span>
                </button>
                <button
                  disabled={cartItems.length === 0}
                  className="w-full bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 py-2.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Save Draft Order
                </button>
              </div>
            </div>
          </section>

          {/* Procurement Support */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-xs">
            <h5 className="font-display font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-500 text-base">support_agent</span>
              Procurement Help
            </h5>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Having issues with pricing or availability for large contracts?</p>
            <a className="text-primary hover:text-primary-dark font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group" href="#">
              Contact Region Manager
              <span className="material-symbols-outlined text-sm block group-hover:translate-x-1 transition-transform">trending_flat</span>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
