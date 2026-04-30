import { Link } from 'react-router-dom';
import ToolCard from '../components/ui/ToolCard';
import {
  mergePdfs, splitPdf, compressPdf, rotatePdf,
  watermarkPdf, paginatePdf, protectPdf, unlockPdf, imagesToPdf, pdfToWord
} from '../services/api';
import './Home.css';

const tools = [
  {
    title: 'Merge PDF',
    color: '#e2514a',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="14" height="18" rx="2" fill="white" fillOpacity="0.9"/>
        <rect x="28" y="8" width="14" height="18" rx="2" fill="white" fillOpacity="0.9"/>
        <path d="M13 26v6l11 6 11-6v-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: 'Combine multiple PDFs into one unified document.',
    fields: [
      { name: 'files', type: 'file', accept: '.pdf', multiple: true, required: true },
    ],
    apiCall: (data) => mergePdfs(data.files),
  },
  {
    title: 'PDF to Word',
    color: '#005a9c', // Word blue
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 8v32l-14 4V4l14 4z" fill="white" fillOpacity="0.8"/>
        <path d="M26 12h12v24H26" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M12 18l3 12h2l2-7 2 7h2l3-12h-2l-2 9-2-7h-2l-2 7-2-9h-2z" fill="white"/>
      </svg>
    ),
    description: 'Convert PDF to an editable Word document containing text and images.',
    fields: [
      { name: 'file', type: 'file', accept: '.pdf', required: true },
    ],
    apiCall: (data) => pdfToWord(data.file),
  },
  {
    title: 'Split PDF',
    color: '#4a90e2',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="6" width="32" height="36" rx="3" fill="white" fillOpacity="0.9"/>
        <line x1="8" y1="20" x2="40" y2="20" stroke="#4a90e2" strokeWidth="2.5"/>
        <line x1="24" y1="20" x2="24" y2="42" stroke="#4a90e2" strokeWidth="2" strokeDasharray="3 2"/>
      </svg>
    ),
    description: 'Extract specific pages by range.',
    fields: [
      { name: 'file', type: 'file', accept: '.pdf', required: true },
      { name: 'ranges', type: 'text', placeholder: 'e.g., 1-3,5,8-10' },
    ],
    apiCall: (data) => splitPdf(data.file, data.ranges),
  },
  {
    title: 'Compress PDF',
    color: '#2ecc71',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="6" width="32" height="36" rx="3" fill="white" fillOpacity="0.9"/>
        <path d="M18 18l6 6 6-6M18 28l6-6 6 6" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: 'Reduce file size by recompressing embedded images.',
    fields: [
      { name: 'file', type: 'file', accept: '.pdf', required: true },
      {
        name: 'level',
        type: 'select',
        options: [
          { value: 'screen',   label: 'Maximum Compression' },
          { value: 'ebook',    label: 'Recommended' },
          { value: 'printer',  label: 'Good Quality' },
          { value: 'prepress', label: 'Best Quality' },
        ],
      },
    ],
    apiCall: (data) => compressPdf(data.file, data.level),
  },
  {
    title: 'Rotate PDF',
    color: '#f39c12',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="28" height="28" rx="3" fill="white" fillOpacity="0.9"/>
        <path d="M30 10 A14 14 0 0 1 38 24" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <polyline points="38,18 38,24 32,24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: 'Rotate all pages by a given angle.',
    fields: [
      { name: 'file', type: 'file', accept: '.pdf', required: true },
      {
        name: 'degrees',
        type: 'select',
        options: [
          { value: '90', label: '90°' },
          { value: '180', label: '180°' },
          { value: '270', label: '270°' },
        ],
      },
    ],
    apiCall: (data) => rotatePdf(data.file, data.degrees),
  },
  {
    title: 'Watermark',
    color: '#9b59b6',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="6" width="32" height="36" rx="3" fill="white" fillOpacity="0.9"/>
        <text x="24" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9b59b6" opacity="0.7" fontFamily="Inter, sans-serif">WM</text>
      </svg>
    ),
    description: 'Add a text watermark to every page.',
    fields: [
      { name: 'file', type: 'file', accept: '.pdf', required: true },
      { name: 'text', type: 'text', placeholder: 'Watermark text' },
    ],
    apiCall: (data) => watermarkPdf(data.file, data.text),
  },
  {
    title: 'Page Numbers',
    color: '#1abc9c',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="6" width="32" height="36" rx="3" fill="white" fillOpacity="0.9"/>
        <line x1="14" y1="16" x2="34" y2="16" stroke="#1abc9c" strokeWidth="2" strokeLinecap="round"/>
        <line x1="14" y1="22" x2="34" y2="22" stroke="#1abc9c" strokeWidth="2" strokeLinecap="round"/>
        <line x1="14" y1="28" x2="28" y2="28" stroke="#1abc9c" strokeWidth="2" strokeLinecap="round"/>
        <text x="36" y="40" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1abc9c" fontFamily="Inter,sans-serif">1</text>
      </svg>
    ),
    description: 'Add page numbers to the bottom right.',
    fields: [
      { name: 'file', type: 'file', accept: '.pdf', required: true },
    ],
    apiCall: (data) => paginatePdf(data.file),
  },
  {
    title: 'Protect PDF',
    color: '#e74c3c',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6L10 12v12c0 8 6 15 14 18 8-3 14-10 14-18V12L24 6z" fill="white" fillOpacity="0.9"/>
        <rect x="19" y="22" width="10" height="8" rx="1.5" fill="#e74c3c"/>
        <path d="M20 22v-3a4 4 0 018 0v3" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    description: 'Encrypt your PDF with a password.',
    fields: [
      { name: 'file', type: 'file', accept: '.pdf', required: true },
      { name: 'password', type: 'password', placeholder: 'Password', required: true },
    ],
    apiCall: (data) => protectPdf(data.file, data.password),
  },
  {
    title: 'Unlock PDF',
    color: '#e67e22',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="22" width="24" height="18" rx="3" fill="white" fillOpacity="0.9"/>
        <path d="M18 22v-5a6 6 0 0112 0" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="24" cy="31" r="2.5" fill="#e67e22"/>
      </svg>
    ),
    description: 'Remove password protection from PDF.',
    fields: [
      { name: 'file', type: 'file', accept: '.pdf', required: true },
      { name: 'password', type: 'password', placeholder: 'Known password' },
    ],
    apiCall: (data) => unlockPdf(data.file, data.password),
  },
  {
    title: 'Images → PDF',
    color: '#3498db',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="24" height="20" rx="3" fill="white" fillOpacity="0.8"/>
        <rect x="18" y="18" width="24" height="20" rx="3" fill="white" fillOpacity="0.95"/>
        <circle cx="14" cy="17" r="3" fill="#3498db" opacity="0.6"/>
        <path d="M10 26l4-4 4 4 4-6 4 6" stroke="#3498db" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: 'Convert images to a single PDF.',
    fields: [
      { name: 'images', type: 'file', accept: 'image/*', multiple: true, required: true },
    ],
    apiCall: (data) => imagesToPdf(data.images),
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <h1>Every tool you need to work with PDFs</h1>
        <p className="hero-sub">
          All are <strong>100% FREE</strong> and easy to use! Merge, split, compress,
          protect, and convert PDFs with just a few clicks.
        </p>
      </section>

      {/* Tool Grid */}
      <section className="tools-section">
        <div className="tools-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}

          {/* Edit PDF — links to dedicated editor */}
          <Link to="/edit-pdf" className="tool-card edit-pdf-link" style={{ '--card-color': '#8e44ad', textDecoration: 'none' }}>
            <div className="tool-icon-box">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="6" width="32" height="36" rx="3" fill="white" fillOpacity="0.9"/>
                <path d="M30 14l4 4-12 12H18v-4l12-12z" fill="#8e44ad" opacity="0.85"/>
                <path d="M14 38h20" stroke="#8e44ad" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Edit PDF</h3>
            <p className="tool-description">Open a PDF and add or edit text directly on any page.</p>
            <div className="edit-pdf-badge">Open Editor →</div>
          </Link>
        </div>
      </section>

      {/* Feature Banner */}
      <section className="feature-banner">
        <div className="feature-banner-inner">
          <div className="feature-item">
            <span className="feature-icon">🔒</span>
            <div>
              <strong>Secure & Private</strong>
              <p>Files are processed locally and deleted after download.</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <div>
              <strong>Fast Processing</strong>
              <p>High-performance Node.js backend for instant results.</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🆓</span>
            <div>
              <strong>Always Free</strong>
              <p>All tools are completely free, no account required.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
