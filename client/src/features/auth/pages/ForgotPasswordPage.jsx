import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../../api/axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = Request code, 2 = Enter code & reset
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setMsg('');
    setIsLoading(true);

    try {
      await api.post('/auth/forgot-password', { email });
      setStep(2);
      setMsg('Reset code has been simulated. Check backend console logs!');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setMsg('');
    setIsLoading(true);

    try {
      await api.post('/auth/reset-password', { email, code, newPassword });
      setMsg('Password updated! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Invalid or expired code');
    } finally {
      setIsLoading(false);
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

      {/* Forgot Password Container */}
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
            <p className="font-mono text-secondary mt-2 uppercase tracking-widest font-bold" style={{ fontSize: '9px' }}>
              {step === 1 ? 'Forgot Password' : 'Reset Password'}
            </p>
          </header>

          {errorMsg && (
            <div className="bg-red-50 text-red-800 border border-red-200 py-2 px-3 mb-4 rounded" style={{ fontSize: '12px' }}>
              {errorMsg}
            </div>
          )}

          {msg && (
            <div className="bg-blue-50 text-primary-custom border border-blue-200 py-2 px-3 mb-4 rounded text-primary-custom" style={{ fontSize: '12px' }}>
              {msg}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleRequestCode} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-secondary font-bold" style={{ fontSize: '12px' }}>Email Address</label>
                <div className="relative group w-full">
                  <span className="material-symbols-outlined absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}>
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full text-dark pl-12 pr-4 bg-white border border-outline-variant-custom rounded"
                    style={{ paddingTop: '12px', paddingBottom: '12px', fontSize: '14px', fontWeight: 500, outline: 'none' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-custom hover:bg-primary-dark-custom text-white font-semibold py-3 rounded shadow flex items-center justify-center gap-2 cursor-pointer border-0 mt-2"
                style={{ fontSize: '14px', opacity: isLoading ? 0.6 : 1 }}
              >
                <span>{isLoading ? 'Sending...' : 'Send Reset Code'}</span>
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-secondary font-bold" style={{ fontSize: '12px' }}>Verification Code</label>
                <div className="relative group w-full">
                  <span className="material-symbols-outlined absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}>
                    sms_failed
                  </span>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="6-digit verification code"
                    className="w-full text-dark pl-12 pr-4 bg-white border border-outline-variant-custom rounded"
                    style={{ paddingTop: '12px', paddingBottom: '12px', fontSize: '14px', fontWeight: 500, outline: 'none' }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-secondary font-bold" style={{ fontSize: '12px' }}>New Password</label>
                <div className="relative group w-full">
                  <span className="material-symbols-outlined absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}>
                    lock
                  </span>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full text-dark pl-12 pr-4 bg-white border border-outline-variant-custom rounded"
                    style={{ paddingTop: '12px', paddingBottom: '12px', fontSize: '14px', fontWeight: 500, outline: 'none' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-custom hover:bg-primary-dark-custom text-white font-semibold py-3 rounded shadow flex items-center justify-center gap-2 cursor-pointer border-0 mt-2"
                style={{ fontSize: '14px', opacity: isLoading ? 0.6 : 1 }}
              >
                <span>{isLoading ? 'Resetting...' : 'Update Password'}</span>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
              </button>
            </form>
          )}

          <div className="mt-4 text-center" style={{ fontSize: '12px' }}>
            <Link to="/login" className="text-primary-custom no-underline font-bold hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
