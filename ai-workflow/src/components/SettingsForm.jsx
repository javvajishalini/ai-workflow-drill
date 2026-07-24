import { useState, useId } from 'react';
import { validateForm } from '../utils/validation.js';
import './SettingsForm.css';

/**
 * Modern SettingsForm Component
 * Fully accessible, responsive, controlled form with real-time validation,
 * password strength indicator, and eye show/hide password toggle.
 */
export default function SettingsForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Accessible IDs
  const fullNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  // Validate form state using decoupled utility
  const { errors, isValid } = validateForm(formData);

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score === 1) return { score: 33, label: 'Weak', class: 'weak' };
    if (score === 2) return { score: 66, label: 'Medium', class: 'medium' };
    return { score: 100, label: 'Strong', class: 'strong' };
  };

  const strength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    if (isValid) {
      setIsSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    }
  };

  return (
    <div className="settings-card glassmorphism">
      <div className="card-top-badge">
        <span className="badge-dot"></span> Account Security
      </div>

      <div className="settings-header">
        <h2>Account Settings</h2>
        <p>Update your personal information and credentials</p>
      </div>

      {isSubmitted && (
        <div className="alert-success" role="alert">
          <svg className="alert-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          ✓ Account settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name Field */}
        <div className="form-group">
          <label htmlFor={fullNameId} className="form-label">
            Full Name <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <input
              id={fullNameId}
              type="text"
              name="fullName"
              className={`form-control ${touched.fullName && errors.fullName ? 'is-invalid' : ''}`}
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.fullName && errors.fullName)}
              aria-describedby={touched.fullName && errors.fullName ? `${fullNameId}-error` : undefined}
              placeholder="e.g. Jane Doe"
              required
            />
          </div>
          {touched.fullName && errors.fullName && (
            <p id={`${fullNameId}-error`} className="error-message" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Address Field */}
        <div className="form-group">
          <label htmlFor={emailId} className="form-label">
            Email Address <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>
            <input
              id={emailId}
              type="email"
              name="email"
              className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={touched.email && errors.email ? `${emailId}-error` : undefined}
              placeholder="e.g. jane@example.com"
              required
            />
          </div>
          {touched.email && errors.email && (
            <p id={`${emailId}-error`} className="error-message" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor={passwordId} className="form-label">
            Password <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
            <input
              id={passwordId}
              type={showPassword ? 'text' : 'password'}
              name="password"
              className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.password && errors.password)}
              aria-describedby={touched.password && errors.password ? `${passwordId}-error` : undefined}
              placeholder="At least 8 characters"
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>

          {/* Password Strength Meter */}
          {formData.password && (
            <div className="strength-meter">
              <div className="strength-bar-bg">
                <div
                  className={`strength-bar-fill ${strength.class}`}
                  style={{ width: `${strength.score}%` }}
                ></div>
              </div>
              <span className={`strength-label ${strength.class}`}>
                Strength: {strength.label}
              </span>
            </div>
          )}

          {touched.password && errors.password && (
            <p id={`${passwordId}-error`} className="error-message" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor={confirmPasswordId} className="form-label">
            Confirm Password <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </span>
            <input
              id={confirmPasswordId}
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
              aria-describedby={touched.confirmPassword && errors.confirmPassword ? `${confirmPasswordId}-error` : undefined}
              placeholder="Re-enter your password"
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <p id={`${confirmPasswordId}-error`} className="error-message" role="alert">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={!isValid}
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
