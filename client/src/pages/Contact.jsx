import { useState, useEffect } from 'react';
import SEOHelmet from '../components/seo/SEOHelmet';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    // Mock submission delay
    setTimeout(() => {
      setStatus({
        submitting: false,
        success: true,
        error: null
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="contact-page-container">
      <SEOHelmet
        title="Contact Us"
        description="Get in touch with the Konvert team. Email us at konvert.dev@gmail.com or WhatsApp us at +91 70556 67769. We respond within 2 hours."
        keywords="contact konvert, konvert support, konvert email, konvert whatsapp"
        canonical="/contact"
      />
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p className="contact-hero-sub">
            Have questions or feedback? Our co-founders are here to help you.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="contact-content-section">
        <div className="contact-grid">
          
          {/* Contact Details Column */}
          <div className="contact-info-col">
            <div className="contact-card border-email">
              <div className="card-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
              <div className="card-details">
                <h3>Email Us</h3>
                <p className="card-desc">For general inquiries, feature requests, or technical bugs.</p>
                <a href="mailto:konvert.dev@gmail.com" className="contact-link">
                  konvert.dev@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-card border-phone">
              <div className="card-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
              <div className="card-details">
                <h3>Call / WhatsApp</h3>
                <p className="card-desc">Direct line to co-founders for immediate developer queries.</p>
                <a href="tel:+917055667769" className="contact-link">
                  +91 70556 67769
                </a>
              </div>
            </div>

            <div className="contact-card border-hours">
              <div className="card-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>
              <div className="card-details">
                <h3>Response Time</h3>
                <p className="card-desc">
                  We are committed to delivering the best document tools. 
                  Both founders monitor incoming inquiries directly. 
                  <strong> Average response time: under 2 hours.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h2>Send a Message</h2>
              <p className="form-subtitle">Fill out the form below and we will contact you as soon as possible.</p>

              {status.success ? (
                <div className="form-success-state">
                  <div className="success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thank you for reaching out. We have received your message and will reply to your email address shortly.
                  </p>
                  <button 
                    onClick={() => setStatus((prev) => ({ ...prev, success: false }))} 
                    className="reset-btn"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  {status.error && <div className="form-error-alert">{status.error}</div>}
                  
                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        disabled={status.submitting}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        disabled={status.submitting}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      disabled={status.submitting}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your query or feedback here..."
                      rows="6"
                      required
                      disabled={status.submitting}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={`submit-btn ${status.submitting ? 'submitting' : ''}`}
                    disabled={status.submitting}
                  >
                    {status.submitting ? 'Sending message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
