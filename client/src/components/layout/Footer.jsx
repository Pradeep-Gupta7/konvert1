import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import './Footer.css';

/* ── Navigation columns ── */
const FOOTER_COLUMNS = [
  {
    title: 'Company',
    icon: '🏢',
    links: [
      { label: 'About Us',    path: '/about' },
      { label: 'Contact Us',  path: '/contact' },
      { label: 'FAQ',         path: '/faq' },
      { label: 'Email Support', path: 'mailto:konvert.dev@gmail.com', external: true },
      { label: 'WhatsApp direct', path: 'https://wa.me/917055667769', external: true },
    ]
  },
  {
    title: 'Legal & Privacy',
    icon: '🛡️',
    links: [
      { label: 'Privacy Policy',   path: '/privacy' },
      { label: 'Terms & Conditions', path: '/terms' },
      { label: '10-Min Auto Deletion', path: '/privacy#security' },
    ]
  },
  {
    title: 'Popular Tools',
    icon: '✨',
    links: [
      { label: 'Merge PDF',     path: '/merge' },
      { label: 'Split PDF',     path: '/split' },
      { label: 'Compress PDF',  path: '/compress' },
      { label: 'Edit PDF',      path: '/edit-pdf' },
      { label: 'Image Editor',  path: '/image-editor' },
      { label: 'Chat with PDF', path: '/ai-chat' },
    ]
  }
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Top: brand + columns */}
      <div className="footer-top">

        {/* Brand */}
        <div className="footer-brand-col">
          <div className="footer-logo-row">
            <img src={logoImg} alt="Konvert Logo" className="footer-logo" />
          </div>
          <p className="footer-tagline">
            Every tool you need to work with PDFs and images — fast, free, and secure.
          </p>
          <div className="footer-socials">
            <a className="footer-social-btn instagram" href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a className="footer-social-btn linkedin" href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a className="footer-social-btn email" href="mailto:konvert.dev@gmail.com" title="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a className="footer-social-btn x" href="https://x.com" target="_blank" rel="noreferrer" title="X (Twitter)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a className="footer-social-btn whatsapp" href="https://wa.me/917055667769" target="_blank" rel="noreferrer" title="WhatsApp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.428 1.977 13.95 .951 11.32.951c-5.442 0-9.866 4.372-9.87 9.802 0 2.01.528 3.975 1.529 5.727L1.93 20.89l4.717-1.736zm10.598-6.143c-.27-.135-1.602-.79-1.85-.88-.25-.09-.43-.135-.61.135-.18.27-.7 1.705-.855 1.885-.157.18-.315.2-.585.065-1.09-.549-1.9-.956-2.67-2.274-.22-.376.22-.347.63-1.168.07-.15.03-.28-.01-.36-.04-.08-.43-1.03-.59-1.42-.16-.38-.34-.33-.46-.33-.12-.005-.26-.005-.4-.005s-.37.05-.56.25c-.2.2-1.77 1.73-1.77 4.21 0 2.48 1.8 4.88 2.05 5.22.25.34 3.55 5.42 8.61 7.42 1.2.48 2.14.76 2.87.99 1.21.38 2.31.33 3.18.2 1 .15 3.09 1.26 3.53 2.48.44 1.22.44 2.27.22 2.72-.22.45-1.77 1.73-2.05 1.88z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div className="footer-cat-col" key={col.title}>
            <div className="footer-cat-header">
              <span className="footer-cat-icon">{col.icon}</span>
              <span className="footer-cat-title">{col.title}</span>
            </div>

            <div className="footer-tool-list">
              {col.links.map((link) =>
                link.external ? (
                  <a
                    key={link.path + link.label}
                    href={link.path}
                    className="footer-tool-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.path + link.label}
                    to={link.path}
                    className="footer-tool-link"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <hr className="footer-divider" />

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-copy">
          © {new Date().getFullYear()} Konvert. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
