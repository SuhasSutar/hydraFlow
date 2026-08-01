import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layout
import PortalLayout from './components/layout/PortalLayout';
import LoadingSplash from './components/common/LoadingSplash';

// Auth Pages
import SplashScreen from './features/auth/pages/SplashScreen';
import WelcomePage from './features/auth/pages/WelcomePage';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage';

// Portal Dashboards & Pages
import EcosystemOverview from './features/manufacturer/pages/EcosystemOverview';
import ProductsModels from './features/manufacturer/pages/ProductsModels';
import InstallationsLogistics from './features/manufacturer/pages/InstallationsLogistics';
import IoTOpsAnalytics from './features/manufacturer/pages/IoTOpsAnalytics';

import DashboardInventory from './features/dealer/pages/DashboardInventory';
import CustomerRegistrationSale from './features/dealer/pages/CustomerRegistrationSale';
import InstallationManagement from './features/dealer/pages/InstallationManagement';
import ProcurementOrderHistory from './features/dealer/pages/ProcurementOrderHistory';

import ServiceDashboard from './features/engineer/pages/ServiceDashboard';
import ActiveJobTelemetry from './features/engineer/pages/ActiveJobTelemetry';
import HistoricalJobsLog from './features/engineer/pages/HistoricalJobsLog';
import KnowledgeBaseChecklist from './features/engineer/pages/KnowledgeBaseChecklist';

import CustomerDashboard from './features/customer/pages/CustomerDashboard';
import PumpPerformanceTelemetry from './features/customer/pages/PumpPerformanceTelemetry';
import ServiceRequestTicket from './features/customer/pages/ServiceRequestTicket';
import AMCManagement from './features/customer/pages/AMCManagement';

import CompanyUserMgmt from './features/admin/pages/CompanyUserMgmt';
import AdminProducts from './features/admin/pages/AdminProducts';
import GovernanceMgmt from './features/admin/pages/GovernanceMgmt';
import GlobalIoTMgmt from './features/admin/pages/GlobalIoTMgmt';
import AdminSettings from './features/admin/pages/AdminSettings';

import GlobalDashboard from './features/global-ops/pages/GlobalDashboard';
import LiveTelemetryStream from './features/global-ops/pages/LiveTelemetryStream';
import GlobalAuditLog from './features/global-ops/pages/GlobalAuditLog';

// Helper: Role default routes mapping
const ROLE_DEFAULT_ROUTES = {
  SUPER_ADMIN: '/global-ops',
  ADMIN: '/admin',
  MANUFACTURER_USER: '/manufacturer',
  DEALER_USER: '/dealer',
  SERVICE_ENGINEER: '/service',
  CUSTOMER: '/customer',
};

/**
 * Route guard for routes that require authentication
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSplash />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

/**
 * Route guard for auth pages (redirects to home if already logged in)
 */
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return <LoadingSplash />;
  }

  if (isAuthenticated && user) {
    const defaultRoute = ROLE_DEFAULT_ROUTES[user.role] || '/';
    return <Navigate to={defaultRoute} replace />;
  }

  return children;
}

/**
 * Route guard based on user roles
 */
function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuthStore();

  if (!user || !allowedRoles.includes(user.role)) {
    const defaultRoute = user ? ROLE_DEFAULT_ROUTES[user.role] : '/login';
    return <Navigate to={defaultRoute} replace />;
  }

  return children;
}

/**
 * Root Route Redirector
 */
function HomeRedirect() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/splash" replace />;
  }

  const defaultRoute = ROLE_DEFAULT_ROUTES[user.role] || '/splash';
  return <Navigate to={defaultRoute} replace />;
}

export default function AppRouter() {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSplash />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route
          path="/splash"
          element={
            <PublicRoute>
              <SplashScreen />
            </PublicRoute>
          }
        />
        <Route
          path="/welcome"
          element={
            <PublicRoute>
              <WelcomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />

        {/* Protected Portal Layout Wrapper */}
        <Route
          element={
            <ProtectedRoute>
              <PortalLayout />
            </ProtectedRoute>
          }
        >
          {/* Default Redirect */}
          <Route path="/" element={<HomeRedirect />} />

          {/* Manufacturer Portal Routes */}
          <Route
            path="/manufacturer"
            element={
              <RoleRoute allowedRoles={['MANUFACTURER_USER']}>
                <EcosystemOverview />
              </RoleRoute>
            }
          />
          <Route
            path="/manufacturer/products"
            element={
              <RoleRoute allowedRoles={['MANUFACTURER_USER']}>
                <ProductsModels />
              </RoleRoute>
            }
          />
          <Route
            path="/manufacturer/logistics"
            element={
              <RoleRoute allowedRoles={['MANUFACTURER_USER']}>
                <InstallationsLogistics />
              </RoleRoute>
            }
          />
          <Route
            path="/manufacturer/iot"
            element={
              <RoleRoute allowedRoles={['MANUFACTURER_USER']}>
                <IoTOpsAnalytics />
              </RoleRoute>
            }
          />

          {/* Dealer Portal Routes */}
          <Route
            path="/dealer"
            element={
              <RoleRoute allowedRoles={['DEALER_USER']}>
                <DashboardInventory />
              </RoleRoute>
            }
          />
          <Route
            path="/dealer/register"
            element={
              <RoleRoute allowedRoles={['DEALER_USER']}>
                <CustomerRegistrationSale />
              </RoleRoute>
            }
          />
          <Route
            path="/dealer/installations"
            element={
              <RoleRoute allowedRoles={['DEALER_USER']}>
                <InstallationManagement />
              </RoleRoute>
            }
          />
          <Route
            path="/dealer/procurement"
            element={
              <RoleRoute allowedRoles={['DEALER_USER']}>
                <ProcurementOrderHistory />
              </RoleRoute>
            }
          />

          {/* Service Engineer Portal Routes */}
          <Route
            path="/service"
            element={
              <RoleRoute allowedRoles={['SERVICE_ENGINEER']}>
                <ServiceDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/service/jobs"
            element={
              <RoleRoute allowedRoles={['SERVICE_ENGINEER']}>
                <ActiveJobTelemetry />
              </RoleRoute>
            }
          />
          <Route
            path="/service/history"
            element={
              <RoleRoute allowedRoles={['SERVICE_ENGINEER']}>
                <HistoricalJobsLog />
              </RoleRoute>
            }
          />
          <Route
            path="/service/knowledge"
            element={
              <RoleRoute allowedRoles={['SERVICE_ENGINEER']}>
                <KnowledgeBaseChecklist />
              </RoleRoute>
            }
          />

          {/* Customer Portal Routes */}
          <Route
            path="/customer"
            element={
              <RoleRoute allowedRoles={['CUSTOMER']}>
                <CustomerDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/customer/pumps"
            element={
              <RoleRoute allowedRoles={['CUSTOMER']}>
                <PumpPerformanceTelemetry />
              </RoleRoute>
            }
          />
          <Route
            path="/customer/warranties"
            element={
              <RoleRoute allowedRoles={['CUSTOMER']}>
                <AMCManagement />
              </RoleRoute>
            }
          />
          <Route
            path="/customer/requests"
            element={
              <RoleRoute allowedRoles={['CUSTOMER']}>
                <ServiceRequestTicket />
              </RoleRoute>
            }
          />
          <Route
            path="/customer/amc"
            element={
              <RoleRoute allowedRoles={['CUSTOMER']}>
                <AMCManagement />
              </RoleRoute>
            }
          />
          <Route
            path="/customer/telemetry"
            element={
              <RoleRoute allowedRoles={['CUSTOMER']}>
                <PumpPerformanceTelemetry />
              </RoleRoute>
            }
          />
          <Route
            path="/customer/tickets"
            element={
              <RoleRoute allowedRoles={['CUSTOMER']}>
                <ServiceRequestTicket />
              </RoleRoute>
            }
          />

          {/* Admin Portal Routes */}
          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={['ADMIN']}>
                <CompanyUserMgmt />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <RoleRoute allowedRoles={['ADMIN']}>
                <AdminProducts />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/governance"
            element={
              <RoleRoute allowedRoles={['ADMIN']}>
                <GovernanceMgmt />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/iot"
            element={
              <RoleRoute allowedRoles={['ADMIN']}>
                <GlobalIoTMgmt />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <RoleRoute allowedRoles={['ADMIN']}>
                <AdminSettings />
              </RoleRoute>
            }
          />

          {/* Global Operations (Super Admin) Portal Routes */}
          <Route
            path="/global-ops"
            element={
              <RoleRoute allowedRoles={['SUPER_ADMIN']}>
                <GlobalDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/global-ops/live"
            element={
              <RoleRoute allowedRoles={['SUPER_ADMIN']}>
                <LiveTelemetryStream />
              </RoleRoute>
            }
          />
          <Route
            path="/global-ops/audit"
            element={
              <RoleRoute allowedRoles={['SUPER_ADMIN']}>
                <GlobalAuditLog />
              </RoleRoute>
            }
          />
        </Route>

        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
