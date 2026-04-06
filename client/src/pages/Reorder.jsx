import ToolCard from '../components/ui/ToolCard';
import { reorderPdf } from '../services/api';
import './SubPage.css';

export default function Reorder() {
  return (
    <div className="sub-page">
      <h2>Reorder / Delete Pages</h2>
      <p className="sub-page-desc">
        Enter new order as comma-separated page numbers (e.g., <code>3,1,4</code>) — to drop pages, simply omit them.
      </p>
      <div className="sub-page-card">
        <ToolCard
          title="Reorder Pages"
          color="#f39c12"
          icon="🔀"
          fields={[
            { name: 'file', type: 'file', accept: '.pdf', required: true },
            { name: 'order', type: 'text', placeholder: 'e.g., 3,1,2' },
          ]}
          apiCall={(data) => reorderPdf(data.file, data.order)}
        />
      </div>
    </div>
  );
}
