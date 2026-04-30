export default function Toolbar({ activeTool, setActiveTool, onImageUpload, showFR, setShowFR, onUndo, hasElements }) {
  const t = (id, label, svg, extra) => (
    <button key={id} className={`tool-btn${activeTool === id ? ' active' : ''} ${extra||''}`}
      onClick={() => { if (id === 'image') { setActiveTool('image'); onImageUpload(); } else setActiveTool(id); }} title={label}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" dangerouslySetInnerHTML={{ __html: svg }} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="editor-toolbar">
      <div className="toolbar-pill">
        {t('text', 'Text', '<path d="M3 3h10M8 3v10M5 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>')}
      </div>

      {t('link', 'Links', '<path d="M6.5 9.5a3 3 0 004 .5l2-2a3 3 0 00-4.2-4.2L7 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M9.5 6.5a3 3 0 00-4-.5l-2 2a3 3 0 004.2 4.2L9 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>')}

      {t('image', 'Images', '<rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="5.5" cy="6.5" r="1.5" fill="currentColor"/><path d="M2 11l3-3 2 2 3-4 4 5" stroke="currentColor" stroke-width="1.2" fill="none"/>', 'has-dropdown')}

      {t('whiteout', 'Whiteout', '<rect x="2" y="3" width="12" height="10" rx="1" stroke="#ccc" stroke-width="1.3" fill="white"/><path d="M5 6h6M5 8h4" stroke="#ccc" stroke-width="1"/>')}

      {t('highlight', 'Annotate', '<path d="M10 2l4 4-8 8H2v-4l8-8z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 4l4 4" stroke="currentColor" stroke-width="1.2"/>', 'has-dropdown')}

      <div className="toolbar-pill">
        {t('rect', 'Shapes', '<rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1.3" fill="none"/>')}
        {t('ellipse', '', '<ellipse cx="8" cy="8" rx="6" ry="4.5" stroke="currentColor" stroke-width="1.3" fill="none"/>')}
        {t('strikethrough', '', '<path d="M3 8h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>')}
      </div>

      {t('select', 'Undo', '<path d="M4 6h6a3 3 0 010 6H7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M6 4L4 6l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>')}

      <button className={`tool-btn${showFR ? ' active' : ''}`} onClick={() => setShowFR(!showFR)} title="Find & Replace" style={{ marginLeft: 8 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.3" fill="none"/><path d="M10 10l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        <span>Find</span>
      </button>
    </div>
  );
}
