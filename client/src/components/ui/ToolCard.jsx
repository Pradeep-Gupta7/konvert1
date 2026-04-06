import { useState, useRef } from 'react';
import { deleteUploadedFile } from '../../services/api';
import './ToolCard.css';

export default function ToolCard({ title, color, icon, description, apiCall, fields }) {
  const [status, setStatus]             = useState('idle');
  const [message, setMessage]           = useState('');
  const [blobUrl, setBlobUrl]           = useState(null);
  const [downloadName, setDownloadName] = useState('');
  const [storageNames, setStorageNames] = useState([]);
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('processing');
    setMessage('Processing…');
    try {
      const form = formRef.current;
      const formData = {};
      for (const field of fields) {
        if (field.type === 'file') {
          const input = form.querySelector(`[name="${field.name}"]`);
          formData[field.name] = field.multiple
            ? Array.from(input.files)
            : input.files[0];
        } else {
          const input = form.querySelector(`[name="${field.name}"]`);
          if (input) formData[field.name] = input.value;
        }
      }
      const result = await apiCall(formData);
      const url = URL.createObjectURL(result.blob);
      setBlobUrl(url);
      setDownloadName(result.filename);
      setStorageNames(result.storageNames);
      setStatus('done');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.error || err.message || 'An error occurred');
    }
  }

  async function handleDelete() {
    setMessage('Deleting…');
    try {
      for (const name of storageNames) await deleteUploadedFile(name);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      setBlobUrl(null);
      setStorageNames([]);
      setStatus('idle');
      setMessage('');
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      setMessage('Delete failed: ' + (err.message || err));
    }
  }

  return (
    <div
      className={`tool-card${status === 'processing' ? ' processing' : ''}`}
      style={{ '--card-color': color }}
    >
      <div className="tool-icon-box">
        {typeof icon === 'string'
          ? <span className="tool-icon-emoji">{icon}</span>
          : icon}
      </div>

      <h3>{title}</h3>
      {description && <p className="tool-description">{description}</p>}

      <form ref={formRef} onSubmit={handleSubmit} className="tool-form">
        {fields.map((field) => {
          if (field.type === 'select') {
            return (
              <select key={field.name} name={field.name} defaultValue={field.options?.[0]?.value}>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            );
          }
          return (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              accept={field.accept || undefined}
              multiple={field.multiple || false}
              placeholder={field.placeholder || ''}
              required={field.required || false}
            />
          );
        })}
        <button type="submit" className="submit-btn" disabled={status === 'processing'}>
          {status === 'processing' && <span className="spinner" />}
          {status === 'processing' ? 'Processing…' : 'Convert'}
        </button>
      </form>

      <div className="result-area">
        {status === 'error'      && <span className="error-text">{message}</span>}
        {status === 'processing' && <span className="processing-text">{message}</span>}
        {status === 'done' && blobUrl && (
          <div className="result-row">
            <a className="download-link" href={blobUrl} download={downloadName}>⬇ Download</a>
            <button className="delete-btn" onClick={handleDelete}>🗑</button>
          </div>
        )}
      </div>
    </div>
  );
}
