import ToolCard from '../components/ui/ToolCard';
import { editMetadata } from '../services/api';
import './SubPage.css';

export default function Metadata() {
  return (
    <div className="sub-page">
      <h2>Metadata Editor</h2>
      <p className="sub-page-desc">
        Edit the title, author, subject, and keywords of your PDF.
      </p>
      <div className="sub-page-card">
        <ToolCard
          title="Edit Metadata"
          color="#9b59b6"
          icon="📝"
          fields={[
            { name: 'file', type: 'file', accept: '.pdf', required: true },
            { name: 'title',    type: 'text', placeholder: 'Title' },
            { name: 'author',   type: 'text', placeholder: 'Author' },
            { name: 'subject',  type: 'text', placeholder: 'Subject' },
            { name: 'keywords', type: 'text', placeholder: 'Keywords (comma-separated)' },
          ]}
          apiCall={(data) =>
            editMetadata(data.file, {
              title:    data.title,
              author:   data.author,
              subject:  data.subject,
              keywords: data.keywords,
            })
          }
        />
      </div>
    </div>
  );
}
