import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">K</div>
          <span>Konvert</span>
        </div>
        <div className="footer-links">
          <a href="/">Tools</a>
          <a href="/">About</a>
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
        </div>
        <span className="footer-copy">
          © {new Date().getFullYear()} Konvert. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
