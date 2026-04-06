import ToolCard from '../components/ui/ToolCard';
import { extractFromPdf } from '../services/api';
import './SubPage.css';

export default function Extract() {
  return (
    <div className="sub-page">
      <h2>Extract Text</h2>
      <p className="sub-page-desc">
        Extract all text from a PDF and download it as a <code>.txt</code> file inside a ZIP.
      </p>
      <div className="sub-page-card">
        <ToolCard
          title="Extract Content"
          color="#2ecc71"
          icon="📤"
          fields={[
            { name: 'file', type: 'file', accept: '.pdf', required: true },
          ]}
          apiCall={(data) => extractFromPdf(data.file)}
        />
      </div>
    </div>
  );
}
