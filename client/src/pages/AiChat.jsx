import { useState, useRef, useEffect } from 'react';
import { uploadPdfForChat, queryPdfChat } from '../services/api';
import './AiChat.css';

const QUICK_PROMPTS = [
  "Summarize this document",
  "What are the main key takeaways?",
  "List all action items and deadlines",
  "Explain this document simply"
];

export default function AiChat() {
  const [file, setFile] = useState(null);
  const [textContext, setTextContext] = useState('');
  const [status, setStatus] = useState('idle'); // idle | extracting | chat | error
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]); // [{ role: 'user' | 'model', content: string }]
  const [inputQuery, setInputQuery] = useState('');
  const [queryStatus, setQueryStatus] = useState('idle'); // idle | loading
  const chatEndRef = useRef(null);
  const fileRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, queryStatus]);

  async function handleFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setStatus('extracting');
    setError('');
    
    try {
      const data = await uploadPdfForChat(f);
      setTextContext(data.text);
      setStatus('chat');
      // Initialize with welcome message
      setHistory([
        {
          role: 'model',
          content: `Hi! I've read and analyzed **${f.name}** (${(data.originalLength / 1000).toFixed(1)}k characters). How can I help you understand this document today?`
        }
      ]);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to extract text from PDF');
      setStatus('error');
    }
  }

  async function sendQuery(queryText) {
    if (!queryText.trim() || queryStatus === 'loading') return;
    
    const userMessage = { role: 'user', content: queryText };
    setHistory(prev => [...prev, userMessage]);
    setInputQuery('');
    setQueryStatus('loading');
    setError('');

    try {
      const chatHistory = history.map(h => ({
        role: h.role,
        content: h.content
      }));
      const data = await queryPdfChat(textContext, queryText, chatHistory);
      setHistory(prev => [...prev, { role: 'model', content: data.response }]);
      setQueryStatus('idle');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to get answer from AI');
      setQueryStatus('idle');
    }
  }

  function handleReset() {
    setFile(null);
    setTextContext('');
    setHistory([]);
    setInputQuery('');
    setStatus('idle');
    setQueryStatus('idle');
    setError('');
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div className="ai-chat-page">
      {status === 'idle' && (
        <div className="chat-upload-container">
          <div className="ai-badge">✨ AI Powered</div>
          <h2>Chat with PDF</h2>
          <p className="subtitle">Upload any PDF and ask questions, summarize pages, or extract key facts instantly using AI.</p>
          
          <div className="chat-upload-card" onClick={() => fileRef.current?.click()}>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div className="chat-upload-icon">💬</div>
            <h3>Drop your PDF here or click to upload</h3>
            <p>Supports any standard text-based PDF</p>
          </div>
        </div>
      )}

      {status === 'extracting' && (
        <div className="chat-extracting-container">
          <div className="chat-loader-spinner" />
          <h3>Reading &amp; Analyzing Document...</h3>
          <p>Extracting text structure and setting up context for AI...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="chat-error-container">
          <div className="error-icon">⚠️</div>
          <h3>Failed to process PDF</h3>
          <p className="error-msg">{error}</p>
          <button className="reset-btn" onClick={handleReset}>Try Another File</button>
        </div>
      )}

      {status === 'chat' && (
        <div className="chat-workspace">
          {/* Sidebar */}
          <div className="chat-sidebar">
            <div className="sidebar-section">
              <span className="section-label">Active Document</span>
              <div className="doc-info-badge">
                <span className="doc-icon">📄</span>
                <span className="doc-name" title={file?.name}>{file?.name}</span>
              </div>
              <button className="change-doc-btn" onClick={handleReset}>
                🔄 Upload New PDF
              </button>
            </div>

            <div className="sidebar-section quick-prompts-section">
              <span className="section-label">Quick Prompts</span>
              <div className="quick-prompts-list">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    className="quick-prompt-btn"
                    onClick={() => sendQuery(prompt)}
                    disabled={queryStatus === 'loading'}
                  >
                    💡 {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat main area */}
          <div className="chat-main">
            <div className="chat-messages-container">
              {history.map((msg, idx) => (
                <div key={idx} className={`chat-message-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
                  <div className="message-avatar">
                    {msg.role === 'user' ? '👤' : '✦'}
                  </div>
                  <div className="message-text">
                    {msg.content.split('\n').map((line, lIdx) => {
                      let renderedLine = line;
                      const boldRegex = /\*\*(.*?)\*\*/g;
                      if (boldRegex.test(line)) {
                        const parts = line.split(boldRegex);
                        renderedLine = parts.map((part, pIdx) => {
                          return pIdx % 2 === 1 ? <strong key={pIdx}>{part}</strong> : part;
                        });
                      }
                      
                      return (
                        <p key={lIdx} style={{ margin: line.trim() === '' ? '12px 0' : '4px 0' }}>
                          {renderedLine}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}

              {queryStatus === 'loading' && (
                <div className="chat-message-bubble ai loading">
                  <div className="message-avatar">✦</div>
                  <div className="message-text">
                    <div className="skeleton-line short" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line medium" />
                  </div>
                </div>
              )}
              
              {error && (
                <div className="chat-query-error">
                  ⚠️ Error: {error}
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Input area */}
            <form
              className="chat-input-bar"
              onSubmit={(e) => {
                e.preventDefault();
                sendQuery(inputQuery);
              }}
            >
              <input
                type="text"
                placeholder="Ask a question about this document..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                disabled={queryStatus === 'loading'}
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || queryStatus === 'loading'}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
