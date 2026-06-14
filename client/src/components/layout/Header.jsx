import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SignInModal from '../ui/SignInModal';
import logoImg from '../../assets/logo.png';
import './Header.css';

const CATEGORIES = [
  {
    title: 'PDF Tools',
    tools: [
      { label: 'Merge PDF',       path: '/merge',       icon: 'ME', color: '#e2514a' },
      { label: 'Split PDF',       path: '/split',       icon: 'SP', color: '#4a90e2' },
      { label: 'Compress PDF',    path: '/compress',    icon: 'CO', color: '#2ecc71' },
      { label: 'Rotate PDF',      path: '/rotate',      icon: 'RO', color: '#f39c12' },
      { label: 'Watermark',       path: '/watermark',   icon: 'WM', color: '#9b59b6' },
      { label: 'Page Numbers',    path: '/page-numbers',icon: 'PN', color: '#1abc9c' },
      { label: 'Protect PDF',     path: '/protect',     icon: 'PR', color: '#e74c3c' },
      { label: 'Unlock PDF',      path: '/unlock',      icon: 'UN', color: '#e67e22' },
      { label: 'Reorder Pages',   path: '/reorder',     icon: 'RE', color: '#f39c12' },
      { label: 'Extract Text',    path: '/extract',     icon: 'EX', color: '#2ecc71' },
      { label: 'Metadata',        path: '/metadata',    icon: 'MD', color: '#9b59b6' },
    ],
  },
  {
    title: 'Convert',
    tools: [
      { label: 'PDF → Word',      path: '/pdf-to-word',   icon: 'PW', color: '#005a9c' },
      { label: 'Word → PDF',      path: '/word-to-pdf',   icon: 'WP', color: '#2a5699' },
      { label: 'Excel → PDF',     path: '/excel-to-pdf',  icon: 'EP', color: '#1d6f42' },
      { label: 'PDF → Images',    path: '/pdf-to-images', icon: 'PI', color: '#3498db' },
      { label: 'Images → PDF',    path: '/images-to-pdf', icon: 'IP', color: '#3498db' },
      { label: 'Image Editor',    path: '/image-editor',  icon: 'IE', color: '#0ea5e9' },
      { label: 'Edit PDF',        path: '/edit-pdf',      icon: 'ED', color: '#8e44ad' },
    ],
  },
  {
    title: 'AI Tools',
    tools: [
      { label: 'AI Summarizer',   path: '/ai-summarizer', icon: 'AS', color: '#667eea' },
      { label: 'AI Translator',   path: '/ai-translator', icon: 'AT', color: '#764ba2' },
      { label: 'Chat with PDF',   path: '/ai-chat',       icon: 'CP', color: '#3b82f6' },
    ],
  },
];

export default function Header() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={logoImg} alt="Konvert Logo" className="brand-logo" />
          </Link>

          {/* Hamburger Icon */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>

            {CATEGORIES.map((cat) => (
              <div className="nav-dropdown" key={cat.title}>
                <button className="nav-dropdown-btn">
                  {cat.title}
                  <span className="nav-caret">▼</span>
                </button>
                <div className="nav-mega">
                  <div className="mega-cat-label">{cat.title}</div>
                  <div className="mega-tool-list">
                    {cat.tools.map((tool) => (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        className="mega-tool-link"
                      >
                        <div className="mega-tool-icon" style={{ background: `${tool.color}15`, color: tool.color }}>
                          {tool.icon}
                        </div>
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="nav-actions">
              <button 
                className="theme-toggle-btn" 
                onClick={toggleTheme} 
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                )}
              </button>

              <button className="nav-btn" onClick={() => { setShowModal(true); setIsMobileMenuOpen(false); }}>
                Sign In
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile menu backdrop */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}
      </header>

      {showModal && <SignInModal onClose={() => setShowModal(false)} />}
    </>
  );
}
