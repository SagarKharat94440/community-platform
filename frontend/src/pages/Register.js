import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: ''
  });
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const { register, error, setError } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (error) setError('');
    if (localError) setLocalError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setLocalError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setLocalError('Email is required');
      return false;
    }
    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLocalLoading(true);

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.bio
    );

    if (!result.success) {
      setLocalLoading(false);
    }
  };

  if (localLoading) {
    return <LoadingSpinner />;
  }

  const displayError = error || localError;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Join Our Community</h1>
          <p>Create your LinkedIn Community account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {displayError && <div className="error-message">{displayError}</div>}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password (min 6 characters)"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio (Optional)</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows="3"
              maxLength="500"
            />
            <small className="char-count">{formData.bio.length}/500 characters</small>
          </div>

          <button type="submit" className="auth-button" disabled={localLoading}>
            {localLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;