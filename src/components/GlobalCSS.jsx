import React from 'react'

export function GlobalCSS() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');

      *, *::before, *::after { box-sizing: border-box; }
      body { margin: 0; }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #ff3c0055; }

      /* VCR theme fonts */
      .vcr-root { font-family: 'Share Tech Mono', monospace !important; }
      .vcr-root input,
      .vcr-root select,
      .vcr-root textarea,
      .vcr-root button { font-family: 'Share Tech Mono', monospace !important; }

      /* Scanlines overlay — no flicker */
      .vcr-scanlines {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,0,0,0.06) 2px,
          rgba(0,0,0,0.06) 4px
        );
        pointer-events: none;
        z-index: 9999;
      }

      /* Blinking cursor for VCR empty state */
      @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
      .vcr-blink { animation: blink 1s step-end infinite; }

      /* Page transitions */
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .fade-up { animation: fadeUp 0.2s ease forwards; }

      /* Card hover */
      .hov-card { transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s !important; }
      .hov-card:hover { transform: translateY(-3px) !important; box-shadow: 0 8px 24px rgba(0,0,0,0.5) !important; }

      /* Button / clickable hover */
      .hov-btn { transition: all 0.13s !important; cursor: pointer; }
      .hov-btn:hover  { opacity: 0.8 !important; }
      .hov-btn:active { transform: scale(0.96) !important; }

      /* Chip toggles */
      .chip-toggle { transition: all 0.13s !important; cursor: pointer; user-select: none; }
      .chip-toggle:hover { opacity: 0.85 !important; }

      /* Inputs */
      input:focus, select:focus, textarea:focus { outline: none; }
      textarea { font-family: inherit; resize: vertical; }
      input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
    `}</style>
  )
}
