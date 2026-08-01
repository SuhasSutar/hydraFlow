import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  LayoutDashboard,
  HardDrive,
  Users,
  Settings,
  ShieldCheck,
  Activity,
  LogOut,
  FolderLock,
  ClipboardList,
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Define sidebar menu options based on user roles
  const getMenuLinks = () => {
    switch (user?.role) {
      case 'SUPER_ADMIN':
        return [
          { to: '/global-ops', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/global-ops/live', label: 'Live telemetry', icon: Activity },
          { to: '/global-ops/audit', label: 'Audit logs', icon: FolderLock },
        ];
      case 'ADMIN':
        return [
          { to: '/admin', label: 'Users & Companies', icon: Users },
          { to: '/admin/products', label: 'Product & Warranty', icon: HardDrive },
          { to: '/admin/governance', label: 'Service Governance', icon: ClipboardList },
          { to: '/admin/iot', label: 'IoT Monitor', icon: Activity },
          { to: '/admin/settings', label: 'Settings', icon: Settings },
        ];
      case 'MANUFACTURER_USER':
        return [
          { to: '/manufacturer', label: 'Ecosystem overview', icon: LayoutDashboard },
          { to: '/manufacturer/products', label: 'Products & Models', icon: HardDrive },
          { to: '/manufacturer/logistics', label: 'Logistics', icon: ClipboardList },
          { to: '/manufacturer/iot', label: 'IoT Analytics', icon: Activity },
        ];
      case 'DEALER_USER':
        return [
          { to: '/dealer', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/dealer/register', label: 'Register sale', icon: Users },
          { to: '/dealer/installations', label: 'Installations', icon: ClipboardList },
          { to: '/dealer/procurement', label: 'Procurement', icon: HardDrive },
        ];
      case 'SERVICE_ENGINEER':
        return [
          { to: '/service', label: 'Today\'s jobs', icon: LayoutDashboard },
          { to: '/service/jobs', label: 'Assigned Queue', icon: ClipboardList },
          { to: '/service/inventory', label: 'Field stock', icon: HardDrive },
        ];
      case 'CUSTOMER':
        return [
          { to: '/customer', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/customer/pumps', label: 'My pumps', icon: HardDrive },
          { to: '/customer/warranties', label: 'Warranty & AMC', icon: ShieldCheck },
          { to: '/customer/requests', label: 'Request service', icon: ClipboardList },
        ];
      default:
        return [];
    }
  };

  const getRoleDetails = () => {
    switch (user?.role) {
      case 'SUPER_ADMIN':
        return { title: 'System Admin', subtitle: 'Global Governance', icon: 'shield' };
      case 'ADMIN':
        return { title: 'System Admin', subtitle: 'Global Governance', icon: 'shield' };
      case 'MANUFACTURER_USER':
        return { title: 'Manufacturer', subtitle: 'Global Supply', icon: 'precision_manufacturing' };
      case 'DEALER_USER':
        return { title: 'Dealer Portal', subtitle: 'Operations', icon: 'store' };
      case 'SERVICE_ENGINEER':
        return { title: 'Service Tech', subtitle: 'Field Dispatch', icon: 'engineering' };
      case 'CUSTOMER':
        return { title: 'Customer Portal', subtitle: 'My Systems', icon: 'water_drop' };
      default:
        return { title: 'Portal User', subtitle: 'Operations', icon: 'person' };
    }
  };

  const links = getMenuLinks();
  const roleDetails = getRoleDetails();

  return (
    <aside
      className={`fixed left-0 bg-surface-container-low-custom border-r border-outline-variant-custom flex flex-col z-40 sidebar-mobile ${isOpen ? 'show' : ''} lg:flex`}
      style={{ top: '0', height: '100vh', width: '256px' }}
    >
      {/* Brand Profile Block */}
      <div className="px-4 py-4 border-b border-outline-variant-custom">
        <div className="flex items-center gap-3">
          <div className="bg-primary-custom rounded flex items-center justify-center text-white" style={{ width: '40px', height: '40px' }}>
            <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {roleDetails.icon}
            </span>
          </div>
          <div>
            <p className="font-display font-bold text-dark mb-0" style={{ fontSize: '14px', lineHeight: 1.2 }}>{roleDetails.title}</p>
            <p className="text-secondary mb-0" style={{ fontSize: '11px', fontWeight: 500 }}>{roleDetails.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto flex flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 no-underline rounded text-dark font-medium transition-all hover-bg-surface-container-high ${
                  isActive
                    ? 'bg-primary-light-custom text-primary-custom border-l-4 border-primary ps-2 font-semibold'
                    : 'text-secondary'
                }`
              }
              style={{ fontSize: '14px' }}
            >
              {({ isActive }) => (
                <>
                  <Icon className={`transition-colors`} style={{ width: '20px', height: '20px', color: isActive ? 'var(--color-primary)' : 'var(--color-secondary)' }} />
                  <span>{link.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-outline-variant-custom flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-primary-light-custom border border-primary-custom rounded-full flex items-center justify-center font-display text-primary-custom uppercase" style={{ width: '36px', height: '36px', fontSize: '12px', fontWeight: 'bold' }}>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-dark font-semibold truncate mb-0" style={{ fontSize: '12px', lineHeight: 1.2 }}>
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-secondary truncate mb-0" style={{ fontSize: '10px' }}>{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-slate-50 hover:bg-slate-100 border rounded flex items-center justify-center gap-2 text-secondary py-2"
          style={{ fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}
        >
          <LogOut style={{ width: '14px', height: '14px' }} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
