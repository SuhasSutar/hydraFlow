import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'CUSTOMER',
    companyName: '',
    companyType: 'DEALER',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [alertsAccepted, setAlertsAccepted] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    // Map role and prepare payload
    const payload = { ...formData };
    
    // Automatically set company type based on selected role
    if (formData.role === 'CUSTOMER') {
      payload.companyType = 'CUSTOMER';
    } else if (formData.role === 'DEALER_USER') {
      payload.companyType = 'DEALER';
    } else if (formData.role === 'MANUFACTURER_USER') {
      payload.companyType = 'MANUFACTURER';
    }

    delete payload.confirmPassword;

    const res = await register(payload);
    if (res.success) {
      navigate('/');
    } else {
      setErrorMsg(res.error);
    }
  };

  const getStepProgress = () => {
    if (step === 1) return '33.33%';
    if (step === 2) return '66.66%';
    return '100%';
  };

  const getStepTitle = () => {
    if (step === 1) return 'Account Setup';
    if (step === 2) return 'Role & Organization';
    return 'Secure Access';
  };

  const getStepSubtitle = () => {
    if (step === 1) return 'Step 1 of 3: Personal Information';
    if (step === 2) return 'Step 2 of 3: Company Affiliation';
    return 'Step 3 of 3: Security & Agreements';
  };

  const getPasswordStrengthClasses = () => {
    const val = formData.password;
    const defaultClass = 'h-1 rounded-full bg-slate-100 border-0';
    let classes = [defaultClass, defaultClass, defaultClass, defaultClass];
    if (val.length === 0) return classes.map(c => c + ' bg-opacity-50');

    if (val.length >= 12 && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val)) {
      classes = classes.map(() => 'h-1 rounded-full bg-primary-custom');
    } else if (val.length > 10) {
      classes[0] = 'h-1 rounded-full bg-cyan-500';
      classes[1] = 'h-1 rounded-full bg-cyan-500';
      classes[2] = 'h-1 rounded-full bg-cyan-500';
    } else {
      if (val.length > 0) classes[0] = 'h-1 rounded-full bg-red-500';
      if (val.length > 6) classes[1] = 'h-1 rounded-full bg-red-500';
    }
    return classes;
  };

  const strengthClasses = getPasswordStrengthClasses();

  return (
    <div className="bg-surface-bright-custom text-dark font-body min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background Decorative Blur Gradients (for mobile viewports) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none lg:hidden">
        <div className="absolute w-full h-full bg-primary-custom bg-opacity-5 rounded-full blur-3xl" style={{ top: '-10%', right: '-10%', filter: 'blur(80px)' }}></div>
        <div className="absolute w-full h-full bg-cyan-500 bg-opacity-5 rounded-full blur-3xl" style={{ bottom: '-10%', left: '-10%', filter: 'blur(80px)' }}></div>
      </div>

      {/* Left Side: Branding & Info (takes 4/12 width on desktop, full-bleed bg-slate-50) */}
      <section className="w-full lg:w-4/12 bg-slate-50 border-r border-outline-variant-custom flex flex-col justify-between p-4 md:p-5 relative z-10" style={{ minHeight: '500px' }}>
        <div className="flex flex-col gap-4">
          <Link to="/welcome" className="flex items-center no-underline gap-2 group">
            <div className="bg-primary-custom flex-shrink-0 flex items-center justify-center rounded-lg shadow" style={{ width: '48px', height: '48px', transition: 'transform 0.2s' }}>
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                water_drop
              </span>
            </div>
            <span className="font-display text-dark tracking-tight mb-0 font-bold" style={{ fontSize: '24px' }}>HydraFlow Systems</span>
          </Link>

          <div className="flex flex-col gap-3">
            <h1 className="font-display text-primary-custom mb-0 font-bold" style={{ fontSize: '28px', lineHeight: 1.2 }}>
              Precision Water Management Starts Here
            </h1>
            <p className="text-secondary leading-relaxed mb-0 font-medium" style={{ fontSize: '14px' }}>
              Join the global network of manufacturers, dealers, and technicians optimizing industrial pump efficiency through IoT innovation.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-3">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary-custom text-[24px]">verified_user</span>
              <div>
                <p className="text-dark font-bold mb-0" style={{ fontSize: '13px' }}>Enterprise Security</p>
                <p className="text-secondary leading-relaxed mb-0 font-medium" style={{ fontSize: '12px' }}>Encrypted telemetry and multi-factor authentication for your infrastructure.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary-custom text-[24px]">monitoring</span>
              <div>
                <p className="text-dark font-bold mb-0" style={{ fontSize: '13px' }}>Real-time Analytics</p>
                <p className="text-secondary leading-relaxed mb-0 font-medium" style={{ fontSize: '12px' }}>Instant access to pressure, flow, and temperature diagnostics across fleets.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="relative rounded-lg overflow-hidden border border-outline-variant-custom shadow-sm" style={{ aspectRatio: '16/9' }}>
            <img
              className="w-full h-full object-cover"
              src="/register-branding.jpg"
              alt="Industrial pump"
            />
            <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)' }}></div>
            <div className="absolute bottom-0 left-0 m-3 text-white">
              <p className="font-mono uppercase tracking-widest font-bold mb-0 text-white opacity-80" style={{ fontSize: '9px' }}>Industrial-Grade Ecosystem</p>
              <p className="text-white italic font-light mb-0 mt-1" style={{ fontSize: '12px' }}>"The standard for smart water flow monitoring."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Registration Form Card (takes 8/12 width on desktop, full-bleed white background) */}
      <section className="w-full lg:w-8/12 bg-white flex flex-col justify-between p-4 md:p-5 relative z-10 min-h-screen lg:min-h-0">
        <div className="w-full mx-auto my-auto flex flex-col justify-center" style={{ maxWidth: '640px' }}>
          {/* Top Progress Bar */}
          <div className="bg-light rounded-pill overflow-hidden mb-4" style={{ height: '6px' }}>
            <div className="bg-primary-custom h-100" style={{ width: getStepProgress(), transition: 'width 0.5s ease-in-out' }}></div>
          </div>

          {/* Form Content */}
          <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="font-display font-bold text-dark mb-0" style={{ fontSize: '24px' }}>{getStepTitle()}</h2>
              <p className="text-secondary font-medium mb-0 mt-1" style={{ fontSize: '12px' }}>{getStepSubtitle()}</p>
            </div>
            <div className="flex items-center gap-2 text-secondary font-medium" style={{ fontSize: '12px' }}>
              <span>Already have an account?</span>
              <Link to="/login" className="text-primary-custom text-decoration-none font-bold hover-underline">
                Sign In
              </Link>
            </div>
          </div>

          {errorMsg && (
            <div className="alert alert-danger py-2 px-3 mb-4 rounded border-0" style={{ fontSize: '12px' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={step === 3 ? handleSubmit : handleNext} className="flex flex-col gap-6">
            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <section className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-body-sm font-bold text-on-surface-variant text-xs">First Name</label>
                    <input
                      type="text"
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm text-dark font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-body-sm font-bold text-on-surface-variant text-xs">Last Name</label>
                    <input
                      type="text"
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm text-dark font-medium"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-body-sm font-bold text-on-surface-variant text-xs">Work Email Address</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm text-dark font-medium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-body-sm font-bold text-on-surface-variant text-xs">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm text-dark font-medium"
                  />
                </div>
              </section>
            )}

            {/* STEP 2: Ecosystem Affiliation & Role */}
            {step === 2 && (
              <section className="flex flex-col gap-6">
                <p className="font-body-md text-on-surface-variant text-sm mb-2">
                  Select your primary role within the HydraFlow ecosystem. This determines your portal features.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Customer Card */}
                  <div className="w-full">
                    <label className="relative cursor-pointer group w-full h-full">
                      <input
                        type="radio"
                        name="role"
                        value="CUSTOMER"
                        checked={formData.role === 'CUSTOMER'}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className={`h-full border-2 rounded-xl p-6 transition-all flex flex-col justify-between ${formData.role === 'CUSTOMER' ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50'}`}>
                        <div>
                          <span className="material-symbols-outlined text-primary mb-3 text-3xl">home_max</span>
                          <p className="font-body-md font-bold text-on-surface text-sm">Customer</p>
                          <p className="font-body-sm text-on-surface-variant mt-2 text-xs leading-tight">Owner or manager of pump installations.</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Dealer Card */}
                  <div className="w-full">
                    <label className="relative cursor-pointer group w-full h-full">
                      <input
                        type="radio"
                        name="role"
                        value="DEALER_USER"
                        checked={formData.role === 'DEALER_USER'}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className={`h-full border-2 rounded-xl p-6 transition-all flex flex-col justify-between ${formData.role === 'DEALER_USER' ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50'}`}>
                        <div>
                          <span className="material-symbols-outlined text-primary mb-3 text-3xl">storefront</span>
                          <p className="font-body-md font-bold text-on-surface text-sm">Dealer</p>
                          <p className="font-body-sm text-on-surface-variant mt-2 text-xs leading-tight">Authorized seller and service provider.</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Manufacturer Card */}
                  <div className="w-full">
                    <label className="relative cursor-pointer group w-full h-full">
                      <input
                        type="radio"
                        name="role"
                        value="MANUFACTURER_USER"
                        checked={formData.role === 'MANUFACTURER_USER'}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className={`h-full border-2 rounded-xl p-6 transition-all flex flex-col justify-between ${formData.role === 'MANUFACTURER_USER' ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50'}`}>
                        <div>
                          <span className="material-symbols-outlined text-primary mb-3 text-3xl">factory</span>
                          <p className="font-body-md font-bold text-on-surface text-sm">Manufacturer</p>
                          <p className="font-body-sm text-on-surface-variant mt-2 text-xs leading-tight">Industrial pump producer and fleet admin.</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <label className="font-body-sm font-bold text-on-surface-variant text-xs">Company Name</label>
                  <input
                    type="text"
                    required
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Global Infrastructure Ltd."
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm text-dark font-medium"
                  />
                </div>
              </section>
            )}

            {/* STEP 3: Security & Credentials */}
            {step === 3 && (
              <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-body-sm font-bold text-on-surface-variant text-xs">Create Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm text-dark font-medium pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-dark cursor-pointer p-0"
                    >
                      <span className="material-symbols-outlined text-[20px] block">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-1 mt-2" style={{ height: '4px' }}>
                    <div className={strengthClasses[0]}></div>
                    <div className={strengthClasses[1]}></div>
                    <div className={strengthClasses[2]}></div>
                    <div className={strengthClasses[3]}></div>
                  </div>
                  <p className="text-on-surface-variant font-medium italic mt-1 mb-0 text-xs">Must be at least 12 characters with 1 symbol.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body-sm font-bold text-on-surface-variant text-xs">Confirm Password</label>
                  <input
                    type="password"
                    required
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm text-dark font-medium"
                  />
                </div>

                <div className="pt-4 border-t border-outline-variant flex flex-col gap-3 mt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      required
                      className="mt-1 w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer"
                    />
                    <span className="font-body-sm text-on-surface-variant text-xs leading-relaxed">
                      I agree to the{' '}
                      <Link to="#" className="text-primary hover:underline font-bold">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="#" className="text-primary hover:underline font-bold">
                        Privacy Policy
                      </Link>{' '}
                      regarding industrial data handling.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={alertsAccepted}
                      onChange={(e) => setAlertsAccepted(e.target.checked)}
                      className="mt-1 w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer"
                    />
                    <span className="font-body-sm text-on-surface-variant text-xs leading-relaxed">
                      Receive system maintenance alerts and industrial compliance updates via email.
                    </span>
                  </label>
                </div>
              </section>
            )}

            {/* Actions Navigation Bar */}
            <div className="flex items-center justify-between border-t border-outline-variant pt-6 mt-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="border border-primary text-primary hover:bg-primary/5 px-6 py-3 font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer text-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Back</span>
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 text-white font-bold px-8 py-3 rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer text-xs"
                >
                  <span>Continue</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/95 text-white font-bold px-8 py-3 rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer text-xs disabled:opacity-60"
                >
                  <span>{isLoading ? 'Creating...' : 'Create Account'}</span>
                  <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Bottom Footer Links */}
        <div className="mt-4 mb-2 flex justify-center gap-4 font-mono font-bold uppercase" style={{ fontSize: '10px' }}>
          <Link to="#" className="text-secondary no-underline hover:text-primary">Support</Link>
          <Link to="#" className="text-secondary no-underline hover:text-primary">API Docs</Link>
          <Link to="#" className="text-secondary no-underline hover:text-primary">Global Offices</Link>
        </div>
      </section>
    </div>
  );
}
