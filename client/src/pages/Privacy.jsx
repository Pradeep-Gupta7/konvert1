import { useEffect } from 'react';
import './Privacy.css';

export default function Privacy() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-page-container">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="privacy-hero-content">
          <h1>Privacy Policy</h1>
          <p className="privacy-hero-sub">
            Last Updated: June 14, 2026
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="privacy-content-section">
        <div className="privacy-content-inner">
          <p className="privacy-intro-text">
            At <strong>Konvert</strong>, we believe that your document security and privacy are paramount. 
            We are a privacy-first PDF and image toolkit designed to process your files securely. 
            Below, we explain transparently how we handle your data, keeping it simple, clear, and focused on our early-stage toolkit operations.
          </p>

          {/* 10-Minute Deletion Highlight */}
          <div className="privacy-highlight-box">
            <strong>🔒 Core Privacy Guarantee</strong>
            <p>
              Absolutely all files uploaded to Konvert are processed temporarily on our server and are 
              <strong> permanently deleted within 10 minutes</strong> via our automated cleanup scripts. 
              We do not inspect, copy, or keep backups of your document files.
            </p>
          </div>

          {/* Section 1: Types of Data */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">📁</span>
              1. Types of Data We Process
            </h2>
            <p>
              Depending on how you interact with our toolkit, we may temporarily process or store minimal data:
            </p>
            <ul>
              <li>
                <strong>Document Files:</strong> Files (PDFs, Word documents, Spreadsheets, Images) you upload to use our toolkit. These are processed locally or server-side, saved temporarily in secure output folders, and deleted automatically.
              </li>
              <li>
                <strong>AI Feature Contents:</strong> When you use our AI features (AI Summarizer, AI Translator, or Chat with PDF), we extract the readable text content of your PDF and securely send it statelessly to the Google Gemini API to generate the summary or translation. No document binary files are shared with Gemini.
              </li>
              <li>
                <strong>Registration Information:</strong> If you sign up or create an account, we securely store your email, name, and encrypted password.
              </li>
              <li>
                <strong>Contact/Support Data:</strong> If you contact us via support channels, we keep your email address and any message content to respond to you.
              </li>
            </ul>
          </div>

          {/* Section 2: Third-Party Integrations */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">🌐</span>
              2. Third-Party Integrations
            </h2>
            <p>
              We integrate with a minimal set of services to deliver our core features and monitor application health:
            </p>
            <ul>
              <li>
                <strong>Google Generative AI (Gemini):</strong> Powering our document summarizing, translation, and chat features. Text contents are processed statelessly and are not used by Google or Konvert to train models.
              </li>
              <li>
                <strong>Cloudflare:</strong> Used to optimize page loading, prevent DDoS attacks, and enforce secure SSL connections. Cloudflare may collect standard IP metrics for security validation.
              </li>
              <li>
                <strong>Sentry:</strong> Minimal error-reporting logs are collected if a backend or frontend crash occurs, helping our team fix bugs quickly.
              </li>
            </ul>
          </div>

          {/* Section 3: Data Security */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">🛡️</span>
              3. Data Security & Storage Location
            </h2>
            <p>
              We take appropriate organizational and technical measures to protect your data from unauthorized access or exposure:
            </p>
            <p>
              All uploads and temporary outputs are stored in isolated directories with random UUID filenames. 
              Connections to both the frontend client and backend API server are encrypted using SSL (HTTPS). 
              Our databases are protected with firewall controls.
            </p>
          </div>

          {/* Section 4: Your Rights */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">⚖️</span>
              4. Your Privacy Rights
            </h2>
            <p>
              Under global standards (including the GDPR), you have full control over your personal data. 
              For your document files, no action is needed as they are auto-deleted within 10 minutes. 
              For your account or support data, you have the right to:
            </p>
            <ul>
              <li>Request access to the personal data we store about you.</li>
              <li>Request correction or updates of inaccurate details.</li>
              <li>Request complete erasure/deletion of your account and registration history.</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">✉️</span>
              5. Owner and Contact Information
            </h2>
            <p>
              Konvert is built and maintained by co-founders Piyush Tripathi &amp; Pradeep Gupta. 
              If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
            </p>
            <div className="contact-highlight">
              <p><strong>Konvert Support Team</strong></p>
              <p>Email: <a href="mailto:konvert.dev@gmail.com">konvert.dev@gmail.com</a></p>
              <p>Phone: <a href="tel:+917055667769">+91 70556 67769</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
