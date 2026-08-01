import React, { useState, useEffect } from 'react';

const DEFAULT_USERS = [
  { id: 1, name: "Alex Munroe", email: "munroe@north-pumps.com", role: "MANUFACTURER_USER", company: "Munich Heavy Ind.", permissions: { read: true, write: true, delete: false } },
  { id: 2, name: "Jane Doe", email: "jane@fieldservice.net", role: "SERVICE_ENGINEER", company: "Field Service Network", permissions: { read: true, write: true, delete: false } },
  { id: 3, name: "Suresh Kumar", email: "suresh@metropumps.com", role: "DEALER_USER", company: "Apex Water Solutions", permissions: { read: true, write: false, delete: false } }
];

const DEFAULT_COMPANIES = [
  { id: 1, name: "Munich Heavy Ind.", type: "MANUFACTURER", registrationNumber: "MFG-887192", status: "ACTIVE", subscriptionPlan: "ENTERPRISE" },
  { id: 2, name: "Apex Water Solutions", type: "DEALER", registrationNumber: "DLR-992104", status: "ACTIVE", subscriptionPlan: "PROFESSIONAL" },
  { id: 3, name: "Field Service Network", type: "SERVICE_PROVIDER", registrationNumber: "SRV-443198", status: "ACTIVE", subscriptionPlan: "BASIC" }
];

const TAB_METRICS = {
  sales: {
    card1: { title: 'Pending Orders', val: '156', color: 'text-slate-800' },
    card2: { title: 'In Transit', val: '42', color: 'text-slate-800' },
    card3: { title: 'Inventory Stock', val: '1,890', color: 'text-slate-800' },
    chart: [40, 60, 45, 80, 95, 70, 55]
  },
  installations: {
    card1: { title: 'Scheduled Inst.', val: '88', color: 'text-slate-800' },
    card2: { title: 'Completed Inst.', val: '310', color: 'text-slate-800' },
    card3: { title: 'Active Crews', val: '14', color: 'text-slate-800' },
    chart: [20, 35, 50, 60, 75, 85, 95]
  },
  warranty: {
    card1: { title: 'Active Warranties', val: '2,401', color: 'text-slate-800' },
    card2: { title: 'Claims Pending', val: '18', color: 'text-amber-700' },
    card3: { title: 'Claims Approved', val: '142', color: 'text-emerald-700' },
    chart: [15, 25, 10, 20, 30, 25, 15]
  },
  service: {
    card1: { title: 'Open Tickets', val: '24', color: 'text-red-650' },
    card2: { title: 'Assigned Tickets', val: '18', color: 'text-slate-850' },
    card3: { title: 'Resolved (24h)', val: '12', color: 'text-emerald-700' },
    chart: [60, 45, 75, 50, 65, 40, 24]
  },
  revenue: {
    card1: { title: 'Monthly ARR', val: '$350,000', color: 'text-slate-800' },
    card2: { title: 'Growth Rate', val: '+12%', color: 'text-emerald-700' },
    card3: { title: 'Pending Invoices', val: '28', color: 'text-slate-800' },
    chart: [30, 45, 60, 50, 70, 85, 90]
  }
};

export default function CompanyUserMgmt() {
  const [activeTab, setActiveTab] = useState('sales');
  const [searchQuery, setSearchQuery] = useState('');
  const [companySearchQuery, setCompanySearchQuery] = useState('');
  
  // Users state
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('admin_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  // Companies state
  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem('admin_companies');
    return saved ? JSON.parse(saved) : DEFAULT_COMPANIES;
  });

  useEffect(() => {
    localStorage.setItem('admin_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('admin_companies', JSON.stringify(companies));
  }, [companies]);

  // User Modals
  const [userModal, setUserModal] = useState({ open: false, mode: 'add', data: null });
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'SERVICE_ENGINEER', company: '', permissions: { read: true, write: false, delete: false } });

  // Company Modals
  const [companyModal, setCompanyModal] = useState({ open: false, mode: 'add', data: null });
  const [companyForm, setCompanyForm] = useState({ name: '', type: 'MANUFACTURER', registrationNumber: '', status: 'ACTIVE', subscriptionPlan: 'BASIC' });

  const handlePermissionChange = (userId, field) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          permissions: {
            ...u.permissions,
            [field]: !u.permissions[field]
          }
        };
      }
      return u;
    }));
  };

  // User CRUD handlers
  const openAddUser = () => {
    setUserForm({ name: '', email: '', role: 'SERVICE_ENGINEER', company: '', permissions: { read: true, write: false, delete: false } });
    setUserModal({ open: true, mode: 'add', data: null });
  };

  const openEditUser = (user) => {
    setUserForm({ ...user });
    setUserModal({ open: true, mode: 'edit', data: user });
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (userModal.mode === 'add') {
      const newUser = {
        ...userForm,
        id: Date.now()
      };
      setUsers(prev => [...prev, newUser]);
    } else {
      setUsers(prev => prev.map(u => u.id === userModal.data.id ? { ...u, ...userForm } : u));
    }
    setUserModal({ open: false, mode: 'add', data: null });
  };

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to remove this user?")) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  // Company CRUD handlers
  const openAddCompany = () => {
    setCompanyForm({ name: '', type: 'MANUFACTURER', registrationNumber: '', status: 'ACTIVE', subscriptionPlan: 'BASIC' });
    setCompanyModal({ open: true, mode: 'add', data: null });
  };

  const openEditCompany = (company) => {
    setCompanyForm({ ...company });
    setCompanyModal({ open: true, mode: 'edit', data: company });
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    if (companyModal.mode === 'add') {
      const newCompany = {
        ...companyForm,
        id: Date.now()
      };
      setCompanies(prev => [...prev, newCompany]);
    } else {
      setCompanies(prev => prev.map(c => c.id === companyModal.data.id ? { ...c, ...companyForm } : c));
    }
    setCompanyModal({ open: false, mode: 'add', data: null });
  };

  const handleDeleteCompany = (companyId) => {
    if (confirm("Are you sure you want to remove this company?")) {
      setCompanies(prev => prev.filter(c => c.id !== companyId));
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    c.registrationNumber.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    c.type.toLowerCase().includes(companySearchQuery.toLowerCase())
  );

  const activeMetrics = TAB_METRICS[activeTab];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1440px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Ecosystem Overview</h2>
          <p className="text-slate-500 text-sm">Real-time supervision across manufacturers, dealers, and field units.</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button className="px-4 py-2 bg-white text-primary font-bold rounded-md shadow-xs text-xs">Real-time</button>
          <button className="px-4 py-2 text-slate-500 font-bold rounded-md hover:bg-white/50 text-xs">24H History</button>
          <button className="px-4 py-2 text-slate-500 font-bold rounded-md hover:bg-white/50 text-xs">Weekly</button>
        </div>
      </div>

      {/* Bento Grid Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Network Health Image (Col 8) */}
        <div className="lg:col-span-8 h-64 rounded-xl overflow-hidden relative group shadow-xs">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            src="/admin-user-avatar.jpg" 
            alt="Ecosystem network health" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-6 text-white">
            <h3 className="font-display font-bold text-lg md:text-xl">Global Network Health</h3>
            <p className="text-slate-300 text-xs max-w-xl mt-1.5 leading-relaxed">Centralized monitoring of 12,400+ connected IoT devices across 4 continents. Current system uptime is 99.98%.</p>
          </div>
        </div>

        {/* Live Metrics Column (Col 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex-1 flex flex-col justify-between hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary p-2 bg-blue-50 rounded-lg">payments</span>
              <span className="text-emerald-600 font-mono text-[10px] font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">trending_up</span> 12%
              </span>
            </div>
            <div className="mt-4">
              <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">Total Revenue</p>
              <p className="font-mono text-xl font-bold text-slate-800 mt-1">$4,281,090</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex-1 flex flex-col justify-between hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-cyan-700 bg-cyan-50 rounded-lg p-2">build</span>
              <span className="text-red-650 font-mono text-[10px] font-bold flex items-center gap-0.5 animate-pulse">
                <span className="material-symbols-outlined text-xs">warning</span> 4
              </span>
            </div>
            <div className="mt-4">
              <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">Critical Faults</p>
              <p className="font-mono text-xl font-bold text-slate-850 mt-1">24 Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Reporting Section */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="border-b border-slate-200 px-6 bg-slate-50/50">
          <div className="flex gap-6 overflow-x-auto font-mono">
            {['sales', 'installations', 'warranty', 'service', 'revenue'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === tab 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-slate-500 hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="border border-slate-200 rounded-lg p-4 flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
              <div className="bg-blue-50 p-3 rounded-full text-primary shrink-0">
                <span className="material-symbols-outlined block text-lg">
                  {activeTab === 'sales' ? 'shopping_cart' : activeTab === 'installations' ? 'calendar_month' : activeTab === 'warranty' ? 'verified_user' : activeTab === 'service' ? 'error' : 'currency_exchange'}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{activeMetrics.card1.title}</p>
                <p className={`text-lg font-bold ${activeMetrics.card1.color}`}>{activeMetrics.card1.val}</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
              <div className="bg-cyan-50 p-3 rounded-full text-cyan-800 shrink-0">
                <span className="material-symbols-outlined block text-lg">
                  {activeTab === 'sales' ? 'local_shipping' : activeTab === 'installations' ? 'check_circle' : activeTab === 'warranty' ? 'report_problem' : activeTab === 'service' ? 'assignment_ind' : 'trending_up'}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{activeMetrics.card2.title}</p>
                <p className={`text-lg font-bold ${activeMetrics.card2.color}`}>{activeMetrics.card2.val}</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
              <div className="bg-slate-100 p-3 rounded-full text-slate-600 shrink-0">
                <span className="material-symbols-outlined block text-lg">
                  {activeTab === 'sales' ? 'inventory_2' : activeTab === 'installations' ? 'engineering' : activeTab === 'warranty' ? 'security' : activeTab === 'service' ? 'task_alt' : 'receipt_long'}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{activeMetrics.card3.title}</p>
                <p className={`text-lg font-bold ${activeMetrics.card3.color}`}>{activeMetrics.card3.val}</p>
              </div>
            </div>
          </div>

          {/* Mini Chart Area */}
          <div className="h-44 w-full bg-slate-50 rounded-xl relative overflow-hidden flex items-end px-4 gap-4 border border-slate-200">
            {activeMetrics.chart.map((h, i) => (
              <div 
                key={i} 
                className="flex-grow bg-primary rounded-t-xs transition-all duration-500" 
                style={{ height: `${h}%`, opacity: 0.2 + (i * 0.12) }}
              ></div>
            ))}
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
              <div className="w-full border-t border-dashed border-slate-200"></div>
              <div className="w-full border-t border-dashed border-slate-200"></div>
            </div>
          </div>
        </div>
      </section>

      {/* User Management Section */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-slate-900 text-lg">User Management</h3>
            <p className="text-slate-500 text-xs mt-0.5">Manage permissions and roles across the ecosystem.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-60 bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-hidden"
              />
            </div>
            <button 
              onClick={openAddUser}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-primary/10"
            >
              <span className="material-symbols-outlined text-sm">person_add</span> Add User
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="p-4">User Entity</th>
                <th className="p-4">Affiliated Company</th>
                <th className="p-4">Current Role</th>
                <th className="p-4 text-center">Permissions</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold font-mono">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 leading-tight">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-600">
                    {user.company || 'Global Administration'}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-primary border border-blue-100 text-[10px] font-bold rounded-full">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-6">
                      {['read', 'write', 'delete'].map((field) => (
                        <label key={field} className="flex items-center gap-1.5 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={user.permissions[field]}
                            onChange={() => handlePermissionChange(user.id, field)}
                            className="rounded-xs text-primary focus:ring-primary h-3.5 w-3.5 border-slate-300 cursor-pointer"
                          />
                          <span className="text-[10px] font-medium capitalize text-slate-600">{field}</span>
                        </label>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => openEditUser(user)}
                        className="p-1.5 text-slate-400 hover:text-primary rounded hover:bg-slate-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base block">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base block">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400 font-mono text-xs">No users found matching query.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Companies Management Section */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-slate-900 text-lg">Companies Management</h3>
            <p className="text-slate-500 text-xs mt-0.5">Supervise associated Manufacturers, Dealers, and Service Providers.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input 
                type="text" 
                placeholder="Search companies..."
                value={companySearchQuery}
                onChange={(e) => setCompanySearchQuery(e.target.value)}
                className="w-full sm:w-60 bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-hidden"
              />
            </div>
            <button 
              onClick={openAddCompany}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-primary/10"
            >
              <span className="material-symbols-outlined text-sm">domain_add</span> Add Company
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="p-4">Company Name</th>
                <th className="p-4">Registration No.</th>
                <th className="p-4">Entity Type</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-650 flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-base">domain</span>
                      </div>
                      <p className="font-bold text-slate-800">{company.name}</p>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-slate-500">{company.registrationNumber}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-650 border border-slate-200 text-[10px] font-bold rounded-full uppercase">
                      {company.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-primary">{company.subscriptionPlan}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      company.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => openEditCompany(company)}
                        className="p-1.5 text-slate-400 hover:text-primary rounded hover:bg-slate-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base block">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteCompany(company.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base block">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCompanies.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400 font-mono text-xs">No companies found matching query.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* User Add/Edit Modal */}
      {userModal.open && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-150 pb-3">
              <h3 className="font-display font-bold text-slate-900 text-base">
                {userModal.mode === 'add' ? 'Add Platform User' : 'Edit User Details'}
              </h3>
              <button 
                onClick={() => setUserModal({ open: false, mode: 'add', data: null })}
                className="text-slate-400 hover:text-slate-650 flex items-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                  placeholder="e.g. john@company.com"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Platform Role</label>
                <select 
                  value={userForm.role}
                  onChange={(e) => setUserForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                >
                  <option value="MANUFACTURER_USER">Manufacturer Admin</option>
                  <option value="DEALER_USER">Authorized Dealer</option>
                  <option value="SERVICE_ENGINEER">Service Engineer</option>
                  <option value="CUSTOMER">Customer Portal</option>
                  <option value="ADMIN">System Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Affiliated Company</label>
                <input 
                  type="text"
                  value={userForm.company}
                  onChange={(e) => setUserForm(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                  placeholder="e.g. Munich Heavy Ind."
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-2">Access Permissions</label>
                <div className="flex gap-4">
                  {['read', 'write', 'delete'].map(field => (
                    <label key={field} className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={userForm.permissions[field]}
                        onChange={() => setUserForm(prev => ({
                          ...prev,
                          permissions: {
                            ...prev.permissions,
                            [field]: !prev.permissions[field]
                          }
                        }))}
                        className="rounded-xs text-primary focus:ring-primary h-3.5 w-3.5 border-slate-300"
                      />
                      <span className="capitalize">{field}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setUserModal({ open: false, mode: 'add', data: null })}
                  className="px-4 py-2 border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-white hover:bg-primary-dark font-bold rounded-lg shadow-md shadow-primary/10"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Company Add/Edit Modal */}
      {companyModal.open && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-150 pb-3">
              <h3 className="font-display font-bold text-slate-900 text-base">
                {companyModal.mode === 'add' ? 'Register New Company' : 'Edit Company Info'}
              </h3>
              <button 
                onClick={() => setCompanyModal({ open: false, mode: 'add', data: null })}
                className="text-slate-400 hover:text-slate-650 flex items-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSaveCompany} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Company Name</label>
                <input 
                  type="text" 
                  required
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                  placeholder="e.g. Munich Heavy Ind."
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Registration / GST Number</label>
                <input 
                  type="text" 
                  required
                  value={companyForm.registrationNumber}
                  onChange={(e) => setCompanyForm(prev => ({ ...prev, registrationNumber: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                  placeholder="e.g. GST-99120A"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Entity Type</label>
                <select 
                  value={companyForm.type}
                  onChange={(e) => setCompanyForm(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                >
                  <option value="MANUFACTURER">Manufacturer (Pump OEM)</option>
                  <option value="DEALER">Distributor/Dealer</option>
                  <option value="SERVICE_PROVIDER">Service Provider</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Subscription Plan</label>
                <select 
                  value={companyForm.subscriptionPlan}
                  onChange={(e) => setCompanyForm(prev => ({ ...prev, subscriptionPlan: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                >
                  <option value="BASIC">Basic</option>
                  <option value="PROFESSIONAL">Professional</option>
                  <option value="ENTERPRISE">Enterprise</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Operational Status</label>
                <select 
                  value={companyForm.status}
                  onChange={(e) => setCompanyForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-hidden"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="SUSPENDED">Suspended</option>
                  <option value="DEACTIVATED">Deactivated</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setCompanyModal({ open: false, mode: 'add', data: null })}
                  className="px-4 py-2 border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-white hover:bg-primary-dark font-bold rounded-lg shadow-md shadow-primary/10"
                >
                  Save Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
