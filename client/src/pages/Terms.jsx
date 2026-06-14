import { useEffect } from 'react';
import './Terms.css';

export default function Terms() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-page-container">
      {/* Hero Section */}
      <section className="terms-hero">
        <div className="terms-hero-content">
          <h1>Terms &amp; Conditions</h1>
          <p className="terms-hero-sub">
            General Terms and Conditions Applicable to the Services ("GTC")
          </p>
          <p className="terms-last-updated">
            Last Updated: June 14, 2026
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="terms-content-section">
        <div className="terms-content-inner">
          <p className="terms-intro-text">
            Welcome to <strong>Konvert</strong>. These General Terms and Conditions govern the use of the services, 
            software, and computer programs owned and operated by Konvert. Please read this document carefully 
            as it constitutes a legally binding contract between you and Konvert.
          </p>

          {/* Binding Agreement Alert */}
          <div className="terms-warning-box">
            <strong>⚠️ Binding Agreement &amp; Acceptance</strong>
            <p>
              By accessing, browsing, or using Konvert, you confirm that you have read, understood, and accepted 
              these Terms and Conditions in full. If you do not agree to these Terms or cannot comply with them, 
              please refrain from accessing or using our services.
            </p>
          </div>

          {/* Section 1: Our Data */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">🏢</span>
              1. Our Data
            </h2>
            <p>
              <strong>Konvert</strong> (hereinafter, "Konvert", "we", "us", or "our") is a document processing 
              and PDF/image toolkit managed and operated by co-founders <strong>Piyush Tripathi</strong> (CEO) and 
              <strong>Pradeep Gupta</strong> (CTO).
            </p>
            <p>
              For any legal or technical inquiries, support, or notices, you may contact our team at:
            </p>
            <ul>
              <li><strong>Support Email:</strong> <a href="mailto:konvert.dev@gmail.com">konvert.dev@gmail.com</a></li>
              <li><strong>Contact Number:</strong> <a href="tel:+917055667769">+91 70556 67769</a></li>
            </ul>
          </div>

          {/* Section 2: Scope & Eligible Users */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">⚖️</span>
              2. Scope &amp; Eligibility
            </h2>
            <p>
              These Terms govern the access, licensing, and usage of all programs, software-as-a-service (SaaS) utilities, 
              and AI-powered tools available on Konvert.
            </p>
            <p>
              You are permitted to contract or use Konvert's services only if:
            </p>
            <ul>
              <li>You are over 18 years of age, OR</li>
              <li>You are over 16 years of age and live independently, OR</li>
              <li>You use the services under the direct authorization and supervision of a parent or legal guardian who assumes all liability for your actions.</li>
            </ul>
            <p>
              Minors under the age of 16 are strictly prohibited from creating accounts or using the services without supervised adult guidance. 
              Konvert disclaims all liability arising from unauthorized use by underage individuals.
            </p>
          </div>

          {/* Section 3: Limited Use License */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">🔑</span>
              3. Limited Use License
            </h2>
            <p>
              Subject to compliance with these Terms, Konvert grants you a non-exclusive, time-limited, non-transferable, 
              non-assignable, and revocable license to access and use our software programs (the "License").
            </p>
            <p>
              This License does not transfer any Industrial or Intellectual Property rights to you. Konvert remains the exclusive 
              owner of all source codes, software architectures, user interfaces, tools, graphics, and trade names. Any copy, 
              distribution, public communication, translation, or alteration of the software is strictly prohibited without prior written consent.
            </p>
          </div>

          {/* Section 4: Acceptable & Fair Use */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">🛡️</span>
              4. Use of the Services &amp; Fair Use
            </h2>
            <p>
              You agree to use Konvert in good faith. To ensure high speed, availability, and fair resource allocation for 
              all users, the following activities are strictly prohibited:
            </p>
            <ul>
              <li>Using automated systems, crawlers, spiders, or scraping bots on the Konvert platforms or APIs.</li>
              <li>Converting or editing files at a rate that exceeds what a human can reasonably accomplish manually using conventional devices.</li>
              <li>Sharing user accounts or sharing passwords with unauthorized third parties.</li>
              <li>Abusing the servers by uploading files that contain malware, viruses, trojans, or worms.</li>
              <li>Using the services to generate, create, or disseminate synthetic media, deepfakes, or AI-generated content intended to deceive, defraud, or mislead others.</li>
            </ul>
            <p>
              Although some tools may be configured for offline processing cache, internet connectivity is required for most features. 
              We are not responsible for your network speeds or data charges.
            </p>
          </div>

          {/* Section 5: Reverse Engineering & AI Training Ban */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">🚫</span>
              5. Prohibition of Reverse Engineering &amp; AI Training
            </h2>
            <p>
              All core algorithms, text extractions, and document models are confidential property. You may not, nor allow third parties to:
            </p>
            <ul>
              <li>Decompile, disassemble, reverse engineer, or attempt to reconstruct the source code or underlying algorithms of Konvert.</li>
              <li>Monitor or track input/output patterns to recreate systems or clone application logic.</li>
              <li>Use the programs, processed results, or data derived from Konvert to create, train, test, or improve machine learning models or artificial intelligence architectures.</li>
            </ul>
          </div>

          {/* Section 6: User Accounts */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">👤</span>
              6. User Accounts
            </h2>
            <p>
              You may use the services as an unregistered visitor ("Free Account") or register via forms or third-party authenticators 
              (e.g., Google, email login) to create a "Registered Free Account".
            </p>
            <p>
              You are responsible for keeping your login credentials confidential. You release Konvert from any liability for unauthorized 
              access to your account resulting from negligence. If you suspect your account credentials have been compromised, please 
              notify us immediately at <a href="mailto:konvert.dev@gmail.com">konvert.dev@gmail.com</a>.
            </p>
          </div>

          {/* Section 7: User Content & Deletion Policy */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">📄</span>
              7. User Content &amp; 10-Minute Deletion Policy
            </h2>
            <p>
              You retain all ownership, intellectual property rights, and copyright over files, text, and documents you process 
              through our toolkit (the "Content"). Konvert does not inspect, read, or analyze your content, and we have no effective 
              knowledge of the information contained inside your documents.
            </p>
            <div className="terms-warning-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', borderLeftColor: '#22c55e', color: '#166534' }}>
              <strong>🔒 Deletion Guarantee</strong>
              <p style={{ color: '#166534' }}>
                Absolutely all document uploads and output files processed server-side are cached securely in temporary directories 
                with random UUID names. These files are <strong>permanently deleted within 10 minutes</strong> of processing. 
                We do not keep backups or restore files under any circumstances.
              </p>
            </div>
            <p>
              You are solely responsible for ensuring your files do not violate third-party copyright, trade secrets, or privacy laws. 
              You agree to indemnify Konvert and its co-founders against any claims, actions, or damages arising out of your document uploads.
            </p>
          </div>

          {/* Section 8: Fees and Subscriptions Disclaimer */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">💳</span>
              8. Fees &amp; Billing
            </h2>
            <p>
              All tools and services on Konvert are currently <strong>100% free to access and use</strong>. 
            </p>
            <p>
              If Konvert introduces premium plans, business subscriptions, API usage packages, or paid credits in the future, 
              the billing rules, automatic renewal cycles (monthly/annual models via Stripe), refund mechanisms (Money Back Guarantees), 
              and cancellations will be detailed in updated versions of these Terms and Conditions.
            </p>
          </div>

          {/* Section 9: Disclaimer of Warranties &amp; Liability */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">⚡</span>
              9. Disclaimer &amp; Limitation of Liability
            </h2>
            <p>
              Konvert services are provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding 
              the accuracy, availability, or error-free performance of our PDF tools or AI utilities.
            </p>
            <p>
              To the maximum extent permitted by law, Konvert and its co-founders (Piyush Tripathi &amp; Pradeep Gupta) shall not be 
              liable for any indirect, incidental, special, or consequential damages, including loss of data, document corruption, 
              server downtime, or business interruption arising out of the use or inability to use the services.
            </p>
          </div>

          {/* Section 10: Fraud & Abuse Prevention */}
          <div className="policy-block">
            <h2>
              <span className="policy-block-icon">⚠️</span>
              10. Fraud &amp; Abuse Prevention
            </h2>
            <p>
              In cases of attempted fraud, payment issues (if applicable), server overload attacks, or violations of these Terms, 
              Konvert reserves the right to suspend your access for up to two (2) years or permanently terminate your account. 
              Always ensure you are accessing the services via the official Konvert domain to avoid phishing.
            </p>
          </div>

          {/* Contact Highlight Box */}
          <div className="contact-highlight">
            <p><strong>Need Support?</strong></p>
            <p>For questions or assistance regarding these GTC terms, reach out to our founders:</p>
            <p>📧 Email: <a href="mailto:konvert.dev@gmail.com">konvert.dev@gmail.com</a></p>
            <p>📞 Phone: <a href="tel:+917055667769">+91 70556 67769</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
