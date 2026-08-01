import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = await login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setErrorMsg(res.error);
    }
  };

  return (
    <div className="bg-surface-bright-custom text-dark font-body min-h-screen flex items-center justify-center p-3 relative overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/login-bg.png')",
          }}
        ></div>
      </div>

      {/* Login Container */}
      <main className="relative z-10 w-full flex items-center justify-center" style={{ maxWidth: '480px' }}>
        <div className="glass-panel border border-outline-variant-custom rounded-xl shadow p-4 md:p-5 w-full">
          {/* Logo Section */}
          <header className="flex flex-col items-center text-center mb-4">
            <Link to="/welcome" className="flex flex-col items-center no-underline group cursor-pointer">
              <div className="mb-3 text-primary-custom transition-transform" style={{ transition: 'transform 0.2s' }}>
                <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  water_drop
                </span>
              </div>
              <h1 className="font-display font-bold text-dark tracking-tight mb-0" style={{ fontSize: '24px' }}>HydraFlow Systems</h1>
            </Link>
            <p className="font-mono text-secondary mt-2 uppercase tracking-widest font-bold" style={{ fontSize: '9px' }}>Authorized Dealer Portal</p>
          </header>

          {errorMsg && (
            <div className="bg-red-50 text-red-800 border border-red-200 py-2 px-3 mb-4 rounded" style={{ fontSize: '12px' }}>
              {errorMsg}
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Username/Email Field */}
            <div className="flex flex-col gap-1">
              <label className="text-secondary font-bold" htmlFor="email" style={{ fontSize: '12px' }}>
                Email or Username
              </label>
              <div className="relative group w-full">
                <span className="material-symbols-outlined absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}>
                  person
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your credentials"
                  className="w-full text-dark pl-12 pr-4 bg-white border border-outline-variant-custom rounded"
                  style={{ paddingTop: '12px', paddingBottom: '12px', fontSize: '14px', fontWeight: 500, outline: 'none' }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-secondary font-bold" htmlFor="password" style={{ fontSize: '12px' }}>
                  Password
                </label>
                <Link to="/forgot-password" className="text-primary-custom no-underline hover:underline font-semibold" style={{ fontSize: '12px' }}>
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group w-full">
                <span className="material-symbols-outlined absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}>
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-dark pl-12 pr-12 bg-white border border-outline-variant-custom rounded"
                  style={{ paddingTop: '12px', paddingBottom: '12px', fontSize: '14px', fontWeight: 500, outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-dark cursor-pointer p-0"
                >
                  <span className="material-symbols-outlined text-[20px] block">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center mb-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="cursor-pointer mr-2"
                style={{ width: '16px', height: '16px' }}
              />
              <label htmlFor="remember" className="text-secondary cursor-pointer select-none font-medium" style={{ fontSize: '12px' }}>
                Remember this device for 30 days
              </label>
            </div>

            {/* Primary Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-custom hover:bg-primary-dark-custom text-white font-semibold py-3 rounded shadow flex items-center justify-center gap-2 cursor-pointer border-0"
              style={{ fontSize: '14px', opacity: isLoading ? 0.6 : 1 }}
            >
              <span>{isLoading ? 'Signing In...' : 'Log In'}</span>
              <span className="material-symbols-outlined text-[20px]">login</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative text-center my-4">
            <div className="absolute top-1/2 left-0 w-full border-t border-outline-variant-custom -translate-y-1/2 z-0"></div>
            <span className="bg-white px-3 text-secondary font-mono relative z-10" style={{ fontSize: '10px', fontWeight: 'bold' }}>OR CORPORATE SIGN-IN</span>
          </div>

          {/* SSO/Social Section */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <button className="border border-outline-variant-custom bg-white hover:bg-slate-50 text-dark w-full py-2.5 px-3 rounded flex items-center justify-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-primary-custom text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  corporate_fare
                </span>
                <span className="text-secondary" style={{ fontSize: '12px', fontWeight: 'bold' }}>SSO</span>
              </button>
            </div>
            <div className="w-1/2">
              <button className="border border-outline-variant-custom bg-white hover:bg-slate-50 text-dark w-full py-2.5 px-3 rounded flex items-center justify-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-primary-custom text-[20px]">
                  badge
                </span>
                <span className="text-secondary" style={{ fontSize: '12px', fontWeight: 'bold' }}>Badge</span>
              </button>
            </div>
          </div>

          <div className="mt-4 text-center text-secondary" style={{ fontSize: '12px' }}>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-custom no-underline font-bold hover:underline">
              Register company
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
