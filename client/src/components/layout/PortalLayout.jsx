import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function PortalLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bright-custom">
      {/* Sidebar (Full Height, Fixed on Left) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area (Shifted to account for sidebar on desktop) */}
      <div className="flex flex-col flex-1 overflow-hidden ml-lg-sidebar relative">
        {/* TopBar (Aligns with main content, shifted on desktop) */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        {/* Content Outlet (Scrolls independently) */}
        <main className="flex-grow overflow-y-auto bg-surface-bright-custom p-3 md:p-4" style={{ outline: 'none' }}>
          <div className="w-full px-0" style={{ maxWidth: '1440px' }}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Drawer Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          style={{ cursor: 'pointer' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}


