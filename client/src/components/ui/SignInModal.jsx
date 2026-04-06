import { useState } from 'react';
import './SignInModal.css';

export default function SignInModal({ onClose }) {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode]       = useState('signin');
  const [message, setMessage] = useState('');

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage(
      mode === 'signin'
        ? '✅ Signed in successfully! (demo mode)'
        : '✅ Account created! (demo mode)'
    );
    setTimeout(() => { setMessage(''); onClose(); }, 1800);
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-label="Sign In">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        <div className="modal-logo">K</div>

        <h2 className="modal-title">
          {mode === 'signin' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="modal-subtitle">
          {mode === 'signin'
            ? 'Sign in to access your Konvert account'
            : "Join Konvert — it's free"}
        </p>

        {message ? (
          <p style={{ textAlign: 'center', padding: '16px 0', color: '#2ecc71', fontWeight: 600 }}>
            {message}
          </p>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-field">
              <label htmlFor="modal-email">Email address</label>
              <input
                id="modal-email" type="email" placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                required autoComplete="email"
              />
            </div>
            <div className="modal-field">
              <div className="modal-field-row">
                <label htmlFor="modal-password">Password</label>
                {mode === 'signin' && (
                  <span className="modal-forgot">Forgot password?</span>
                )}
              </div>
              <input
                id="modal-password" type="password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              />
            </div>
            <button type="submit" className="modal-submit">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
            <div className="modal-divider">or</div>
            <p className="modal-signup-text">
              {mode === 'signin' ? (
                <>Don&apos;t have an account?{' '}
                  <span onClick={() => setMode('signup')}>Sign up free</span>
                </>
              ) : (
                <>Already have an account?{' '}
                  <span onClick={() => setMode('signin')}>Sign in</span>
                </>
              )}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
