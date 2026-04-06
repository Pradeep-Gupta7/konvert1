import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SignInModal from '../ui/SignInModal';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/reorder', label: 'Reorder' },
    { to: '/extract', label: 'Extract' },
    { to: '/metadata', label: 'Metadata' },
    { to: '/pdf-to-images', label: 'PDF → Images' },
  ];

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <div className="logo">K</div>
            <div className="brand-name">Konvert</div>
          </Link>
          <nav>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <button className="nav-btn" onClick={() => setShowModal(true)}>
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {showModal && <SignInModal onClose={() => setShowModal(false)} />}
    </>
  );
}
