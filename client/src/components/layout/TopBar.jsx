import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_DATABASE = [
  { type: 'Product', label: 'Alpha Flow V3 (#PROD-001)', route: '/admin/products' },
  { type: 'Product', label: 'HydraCore X-100 (#PROD-002)', route: '/admin/products' },
  { type: 'Product', label: 'Titan Centrifugal (#PROD-003)', route: '/admin/products' },
  { type: 'User', label: 'Alex Munroe (Manufacturer Admin)', route: '/admin' },
  { type: 'User', label: 'Jane Doe (Lead Engineer)', route: '/admin' },
  { type: 'User', label: 'Suresh Kumar (Authorized Dealer)', route: '/admin' },
  { type: 'Ticket', label: 'SRV-2026-0108: Leakage in pressure valve', route: '/admin/governance' },
  { type: 'Ticket', label: 'SRV-2026-0109: Scheduled overhaul checking', route: '/admin/governance' }
];

export default function TopBar({ onMenuClick }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const filtered = MOCK_DATABASE.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (route) => {
    navigate(route);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleResultClick(results[0].route);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 bg-white border-b relative" style={{ height: '64px', zIndex: 40 }}>
      {/* Menu & Search Container */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuClick}
          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded lg:hidden p-0 flex items-center justify-center"
          style={{ width: '32px', height: '32px' }}
        >
          <span className="material-symbols-outlined text-secondary" style={{ fontSize: '20px' }}>menu</span>
        </button>

        {/* Search Bar Container */}
        <div ref={containerRef} className="relative">
          <div className="flex items-center bg-slate-50 border rounded px-3 py-1.5" style={{ width: '280px', transition: 'all 0.2s' }}>
            <Search className="text-secondary" style={{ width: '16px', height: '16px' }} />
          <input
            type="text"
            placeholder="Search telemetry, tickets..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-0 shadow-none ps-2 w-full text-dark"
            style={{ fontSize: '12px', outline: 'none' }}
          />
        </div>

        {/* Floating Search Dropdown */}
        {showDropdown && searchQuery && (
          <div className="absolute left-0 bg-white border rounded shadow-lg py-2 overflow-y-auto" style={{ top: '48px', width: '320px', zIndex: 50, maxHeight: '240px' }}>
            <div className="px-3 py-1 border-b text-muted font-mono" style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              SEARCH RESULTS
            </div>
            {results.length > 0 ? (
              results.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(item.route)}
                  className="w-full text-start px-3 py-2 border-0 bg-transparent no-underline flex flex-col hover:bg-slate-50"
                  style={{ cursor: 'pointer' }}
                >
                  <span className="font-mono text-primary-custom bg-light px-1 rounded-sm mb-1 align-self-start" style={{ fontSize: '9px', fontWeight: 'bold' }}>
                    {item.type}
                  </span>
                  <span className="text-dark font-body truncate w-full" style={{ fontSize: '12px', fontWeight: 500 }}>
                    {item.label}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-secondary font-mono" style={{ fontSize: '12px' }}>
                No matching telemetry or tickets.
              </div>
            )}
          </div>
        )}
      </div>
    </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        {/* Notifications Icon */}
        <button className="bg-slate-50 hover:bg-slate-100 border rounded-full p-0 flex items-center justify-center relative" style={{ width: '32px', height: '32px' }}>
          <Bell className="text-secondary" style={{ width: '16px', height: '16px' }} />
          <span className="absolute bg-primary border border-white rounded-full" style={{ width: '8px', height: '8px', top: '6px', left: '20px' }}></span>
        </button>

        {/* User avatar summary */}
        <div className="flex items-center gap-3 ps-3 border-l">
          <div className="text-end hidden sm:block">
            <p className="font-display text-dark mb-0 font-semibold" style={{ fontSize: '12px', lineHeight: 1.2 }}>
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-secondary mb-0 capitalize" style={{ fontSize: '10px' }}>
              {user?.role?.toLowerCase()?.replace('_', ' ')}
            </p>
          </div>

          <div className="bg-slate-100 border rounded-full flex items-center justify-center font-display text-dark font-bold" style={{ width: '32px', height: '32px', fontSize: '12px' }}>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
