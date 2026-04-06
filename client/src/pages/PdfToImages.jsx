import ToolCard from '../components/ui/ToolCard';
import { pdfToImages } from '../services/api';
import './SubPage.css';

export default function PdfToImages() {
  return (
    <div className="sub-page">
      <h2>PDF → Pages</h2>
      <p className="sub-page-desc">
        Split a PDF into individual single-page PDF files, returned as a ZIP download.
      </p>
      <div className="sub-page-card">
        <ToolCard
          title="Convert to Images"
          color="#3498db"
          icon="🖼️"
          fields={[
            { name: 'file', type: 'file', accept: '.pdf', required: true },
          ]}
          apiCall={(data) => pdfToImages(data.file)}
        />
      </div>
    </div>
  );
}
