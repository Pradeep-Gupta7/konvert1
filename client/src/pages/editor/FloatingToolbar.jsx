import { useState, useRef } from 'react';
import { cssFontFamily, AVAILABLE_FONTS, FONT_SIZES } from './helpers';

export default function FloatingToolbar({ el, wrapRef, zoom, updateEl, deleteEl, dupEl, startDrag }) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const linkInputRef = useRef(null);

  if (!el || !wrapRef.current) return null;

  const isText = el.type === 'text';
  const isShape = el.type === 'rect' || el.type === 'ellipse';

  // Position above the element, centered horizontally
  const left = (el.x + el.w / 2) * zoom;
  const top = Math.max(4, (el.y - 56) * zoom);

  const u = (k, v) => updateEl(el.id, { [k]: v });

  const handleLinkSave = () => {
    if (linkUrl.trim()) {
      u('link', linkUrl.trim());
    }
    setShowLinkInput(false);
    setLinkUrl('');
  };

  const handleLinkOpen = () => {
    setLinkUrl(el.link || '');
    setShowLinkInput(true);
    setTimeout(() => linkInputRef.current?.focus(), 50);
  };

  return (
    <>
      <div
        className="ft-bar"
        style={{ left, top, transform: 'translateX(-50%)' }}
        onMouseDown={e => e.stopPropagation()}
      >
        {/* ── Text formatting controls ── */}
        {isText && (
          <>
            {/* Bold */}
            <button
              className={`ft-btn${el.bold ? ' on' : ''}`}
              onClick={() => u('bold', !el.bold)}
              title="Bold"
            >
              <b>B</b>
            </button>

            {/* Italic */}
            <button
              className={`ft-btn${el.italic ? ' on' : ''}`}
              onClick={() => u('italic', !el.italic)}
              title="Italic"
            >
              <i>I</i>
            </button>

            {/* Underline */}
            <button
              className={`ft-btn${el.underline ? ' on' : ''}`}
              onClick={() => u('underline', !el.underline)}
              title="Underline"
            >
              <span style={{ textDecoration: 'underline', fontWeight: 600 }}>U</span>
            </button>

            <div className="ft-sep" />

            {/* Font size */}
            <div className="ft-size-wrap" title="Font Size">
              <svg className="ft-sz-icon" viewBox="0 0 16 16" fill="none">
                <text x="1" y="11" fontSize="9" fontWeight="bold" fill="currentColor">T</text>
                <text x="8" y="13" fontSize="6" fill="currentColor">t</text>
              </svg>
              <select
                className="ft-select-sm"
                value={Math.round(el.fontSize)}
                onChange={e => u('fontSize', +e.target.value)}
              >
                {FONT_SIZES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Font family */}
            <div className="ft-aa-wrap" title="Font Family">
              <span className="ft-aa-label">Aa</span>
              <select
                className="ft-select-sm ft-font-select"
                value={el.fontFamily || 'Helvetica'}
                onChange={e => u('fontFamily', e.target.value)}
              >
                {AVAILABLE_FONTS.map(f => (
                  <option key={f.value} value={f.value} style={{ fontFamily: cssFontFamily(f.value) }}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="ft-sep" />

            {/* Color picker */}
            <label className="ft-color-wrap" title="Text Color">
              <svg viewBox="0 0 16 16" width="18" height="18" fill="none">
                <text x="4" y="10" fontSize="10" fontWeight="bold" fill={el.color || '#000'}>A</text>
                <rect x="2" y="13" width="12" height="2.5" rx="1" fill={el.color || '#000'} />
              </svg>
              <input
                type="color"
                value={el.color || '#000000'}
                onChange={e => u('color', e.target.value)}
                className="ft-color-input"
              />
            </label>

            <div className="ft-sep" />

            {/* Link */}
            <button
              className={`ft-btn${el.link ? ' on' : ''}`}
              onClick={handleLinkOpen}
              title={el.link ? `Link: ${el.link}` : 'Add Link'}
            >
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <path d="M6.5 9.5a3 3 0 004 .5l2-2a3 3 0 00-4.2-4.2L7 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M9.5 6.5a3 3 0 00-4-.5l-2 2a3 3 0 004.2 4.2L9 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </button>
          </>
        )}

        {/* ── Shape-specific controls ── */}
        {isShape && (
          <>
            {/* Border color */}
            <label className="ft-color-wrap" title="Border Color">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="2" stroke={el.borderColor || '#000'} strokeWidth="2" fill="none"/>
              </svg>
              <input
                type="color"
                value={el.borderColor || '#000000'}
                onChange={e => u('borderColor', e.target.value)}
                className="ft-color-input"
              />
            </label>

            {/* Fill color */}
            <label className="ft-color-wrap" title="Fill Color">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="2" fill={el.fillColor === 'transparent' ? '#eee' : el.fillColor} stroke="#999" strokeWidth="0.5"/>
              </svg>
              <input
                type="color"
                value={el.fillColor === 'transparent' ? '#ffffff' : (el.fillColor || '#ffffff')}
                onChange={e => u('fillColor', e.target.value)}
                className="ft-color-input"
              />
            </label>

            {/* Border width */}
            <div className="ft-size-wrap" title="Border Width">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <select className="ft-select-sm" value={el.borderWidth || 2} onChange={e => u('borderWidth', +e.target.value)}>
                {[1,2,3,4,5,6].map(w => <option key={w} value={w}>{w}px</option>)}
              </select>
            </div>

            <div className="ft-sep" />
          </>
        )}

        {/* ── Universal controls: Move / Duplicate / Delete ── */}
        <div className="ft-sep" />

        {/* Move indicator */}
        <button className="ft-btn" title="Drag the element to move" style={{ cursor: 'grab' }} onMouseDown={startDrag}>
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M6 4l2-2 2 2M6 12l2 2 2-2M4 6l-2 2 2 2M12 6l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Duplicate */}
        <button className="ft-btn" onClick={() => dupEl(el.id)} title="Duplicate">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            <path d="M5 11H3a1 1 0 01-1-1V3a1 1 0 011-1h7a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Delete */}
        <button className="ft-btn ft-del" onClick={() => deleteEl(el.id)} title="Delete">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path d="M3 5h10M6 5V3.5A.5.5 0 016.5 3h3a.5.5 0 01.5.5V5M4 5v8a1 1 0 001 1h6a1 1 0 001-1V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── Link URL input popover ── */}
      {showLinkInput && isText && (
        <div
          className="ft-link-popover"
          style={{ left, top: top + 48, transform: 'translateX(-50%)' }}
          onMouseDown={e => e.stopPropagation()}
        >
          <input
            ref={linkInputRef}
            type="url"
            className="ft-link-input"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleLinkSave(); if (e.key === 'Escape') setShowLinkInput(false); }}
          />
          <button className="ft-link-save" onClick={handleLinkSave}>✓</button>
          {el.link && (
            <button className="ft-link-remove" onClick={() => { u('link', ''); setShowLinkInput(false); }} title="Remove link">✕</button>
          )}
        </div>
      )}
    </>
  );
}
