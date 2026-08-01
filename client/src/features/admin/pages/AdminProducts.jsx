import React, { useState, useEffect } from 'react';

const DEFAULT_PRODUCTS = [
  { id: 'PROD-001', name: 'Alpha Flow V3', manufacturer: 'Munich Heavy Ind.', stock: 24, status: 'In Stock', rating: '98%' },
  { id: 'PROD-002', name: 'HydraCore X-100', manufacturer: 'Stuttgart Fluidics', stock: 12, status: 'Low Stock', rating: '94%' },
  { id: 'PROD-003', name: 'Titan Centrifugal', manufacturer: 'Helsinki Engineering', stock: 0, status: 'Out of Stock', rating: '92%' }
];

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Products state with persistence
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('admin_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', manufacturer: '', stock: 0, status: 'In Stock', rating: '95%' });

  const handleOpenAddModal = () => {
    // Generate sequential product ID
    setForm({ name: '', manufacturer: '', stock: 0, status: 'In Stock', rating: '95%' });
    setModalOpen(true);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const count = products.length + 1;
    const newId = `PROD-${String(count).padStart(3, '0')}`;
    const newProduct = {
      id: newId,
      ...form,
      stock: parseInt(form.stock) || 0
    };
    setProducts(prev => [...prev, newProduct]);
    setModalOpen(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Global Product Catalog</h2>
          <p className="text-slate-500 text-sm">Supervise registered pump products and technical profiles across manufacturers.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-xs transition-all shadow-md shadow-primary/10"
        >
          <span className="material-symbols-outlined text-white text-base">add</span>
          Add Global Product
        </button>
      </div>

      {/* Main Table View */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-display font-bold text-slate-900 text-sm">Pump Product Templates</h3>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-60 bg-white border border-slate-200 rounded-lg pl-3 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-hidden"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="p-4">Product ID</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Manufacturer</th>
                <th className="p-4 text-right">Available Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">IoT Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900">{prod.id}</td>
                  <td className="p-4 font-bold text-slate-800">{prod.name}</td>
                  <td className="p-4 text-slate-500">{prod.manufacturer}</td>
                  <td className="p-4 text-right font-mono font-medium">{prod.stock}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      prod.status === 'In Stock' ? 'bg-emerald-50 text-emerald-700' :
                      prod.status === 'Low Stock' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {prod.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-primary">{prod.rating}</td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-450 font-mono text-xs">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-150 pb-3">
              <h3 className="font-display font-bold text-slate-900 text-base">Add Global Product Template</h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-650 flex items-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                  placeholder="e.g. Centrifugal Prime-V"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Manufacturer Name</label>
                <input 
                  type="text" 
                  required
                  value={form.manufacturer}
                  onChange={(e) => setForm(prev => ({ ...prev, manufacturer: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                  placeholder="e.g. Munich Heavy Ind."
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Available Warehouse Stock</label>
                <input 
                  type="number" 
                  required
                  value={form.stock}
                  onChange={(e) => setForm(prev => ({ ...prev, stock: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                  placeholder="e.g. 24"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Product Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">IoT Reliability Rating</label>
                <input 
                  type="text" 
                  required
                  value={form.rating}
                  onChange={(e) => setForm(prev => ({ ...prev, rating: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                  placeholder="e.g. 96%"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-white hover:bg-primary-dark font-bold rounded-lg shadow-md shadow-primary/10"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
