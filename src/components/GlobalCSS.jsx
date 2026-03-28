import React from 'react'

export function GlobalCSS() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&family=Rajdhani:wght@500;700&display=swap');

      *, *::before, *::after { box-sizing: border-box; }
      body { margin: 0; }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #ff3c0055; }

      /* ── VCR theme ── */
      .vcr-root { font-family: 'Share Tech Mono', monospace !important; }
      .vcr-root input,
      .vcr-root select,
      .vcr-root textarea,
      .vcr-root button { font-family: 'Share Tech Mono', monospace !important; }

      .vcr-scanlines {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: repeating-linear-gradient(
          0deg, transparent, transparent 2px,
          rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px
        );
        pointer-events: none; z-index: 9999;
      }

      /* ── Moon theme ── */
      .moon-root::-webkit-scrollbar-thumb { background: #f0e4c033; }

      /* Simple yellow crescent — two overlapping circles */
      .moon-orb {
        position: fixed; top: 30px; right: 110px;
        width: 130px; height: 130px;
        border-radius: 50%;
        background: #f0dc78;
        pointer-events: none; z-index: 1;
      }
      /* Dark circle offset to cut the crescent shape */
      .moon-orb::after {
        content: '';
        position: absolute;
        top: -6px; left: 22px;
        width: 122px; height: 122px;
        border-radius: 50%;
        background: #010915;
      }

      /* Star field — plain static dots, no animation */
      .moon-stars {
        position: fixed; top: 0; left: 0;
        width: 1px; height: 1px;
        background: transparent;
        pointer-events: none; z-index: 0;
        box-shadow:
          65px  180px 0 1px rgba(240,228,192,0.65),
          155px  95px 0 1px rgba(240,228,192,0.55),
          240px 310px 0 1px rgba(240,228,192,0.60),
          380px  88px 0 1px rgba(240,228,192,0.70),
          490px 460px 0 1px rgba(240,228,192,0.50),
          565px 220px 0 1px rgba(240,228,192,0.60),
          680px 530px 0 1px rgba(240,228,192,0.55),
          815px 145px 0 1px rgba(240,228,192,0.70),
          930px 600px 0 1px rgba(240,228,192,0.50),
          1040px 285px 0 1px rgba(240,228,192,0.60),
          1160px 410px 0 1px rgba(240,228,192,0.65),
          1290px 195px 0 1px rgba(240,228,192,0.55),
          1410px 565px 0 1px rgba(240,228,192,0.50),
          1550px  95px 0 1px rgba(240,228,192,0.60),
          1660px 430px 0 1px rgba(240,228,192,0.55),
          1740px 270px 0 1px rgba(240,228,192,0.65),
          1810px 590px 0 1px rgba(240,228,192,0.45),
          40px   690px 0 1px rgba(240,228,192,0.55),
          175px  810px 0 1px rgba(240,228,192,0.45),
          310px  680px 0 1px rgba(240,228,192,0.60),
          455px  880px 0 1px rgba(240,228,192,0.50),
          610px  740px 0 1px rgba(240,228,192,0.55),
          770px  840px 0 1px rgba(240,228,192,0.45),
          940px  770px 0 1px rgba(240,228,192,0.60),
          1110px 910px 0 1px rgba(240,228,192,0.45),
          1270px 665px 0 1px rgba(240,228,192,0.55),
          1420px 790px 0 1px rgba(240,228,192,0.50),
          1600px 710px 0 1px rgba(240,228,192,0.55),
          1790px 880px 0 1px rgba(240,228,192,0.45),
          330px   50px 0 1px rgba(240,228,192,0.65);
      }

      /* ── Sakura Miku theme — magical girl light mode ── */
      .sakura-root::-webkit-scrollbar { background: #ffe4ef; }
      .sakura-root::-webkit-scrollbar-thumb { background: #e090b8; }

      /* Light pink card hover */
      .sakura-root .hov-card:hover {
        box-shadow:
          0 0 0 1px #d94090,
          0 6px 22px rgba(204,40,120,0.18),
          0 12px 40px rgba(255,120,180,0.10) !important;
        border-color: #d94090 !important;
      }

      /* Input focus in sakura */
      .sakura-root input:focus,
      .sakura-root select:focus,
      .sakura-root textarea:focus {
        border-color: #d94090 !important;
        box-shadow: 0 0 0 2px rgba(217,64,144,0.18) !important;
      }

      /* Drifting petals — more opaque for light bg */
      .sakura-petals {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none; z-index: 9998; overflow: hidden;
      }
      .sakura-petals::before,
      .sakura-petals::after {
        content: '';
        position: absolute;
        top: -10px; left: 0; right: 0; height: 100vh;
        background-image:
          radial-gradient(ellipse 6px 10px at  8% 5%,  rgba(210,60,120,0.55) 0%, transparent 100%),
          radial-gradient(ellipse 5px  7px at 22% 12%, rgba(230,80,140,0.48) 0%, transparent 100%),
          radial-gradient(ellipse 7px 11px at 41%  3%, rgba(200,50,110,0.52) 0%, transparent 100%),
          radial-gradient(ellipse 4px  6px at 58%  8%, rgba(240,90,150,0.44) 0%, transparent 100%),
          radial-gradient(ellipse 6px  9px at 73%  2%, rgba(215,65,125,0.50) 0%, transparent 100%),
          radial-gradient(ellipse 5px  8px at 88%  7%, rgba(225,75,135,0.46) 0%, transparent 100%),
          radial-gradient(ellipse 7px 10px at 15% 18%, rgba(205,55,115,0.40) 0%, transparent 100%),
          radial-gradient(ellipse 5px  7px at 35% 22%, rgba(235,85,145,0.36) 0%, transparent 100%),
          radial-gradient(ellipse 6px  9px at 65% 15%, rgba(210,60,120,0.42) 0%, transparent 100%),
          radial-gradient(ellipse 4px  6px at 80% 20%, rgba(240,90,150,0.38) 0%, transparent 100%);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        animation: sakura-drift1 55s ease-in-out infinite;
        transform-origin: top center;
      }
      .sakura-petals::after {
        animation: sakura-drift2 72s ease-in-out infinite 12s;
        background-image:
          radial-gradient(ellipse 5px  8px at 12%  8%, rgba(220,70,130,0.50) 0%, transparent 100%),
          radial-gradient(ellipse 6px 10px at 30%  4%, rgba(200,50,112,0.46) 0%, transparent 100%),
          radial-gradient(ellipse 4px  6px at 50% 10%, rgba(235,85,145,0.42) 0%, transparent 100%),
          radial-gradient(ellipse 7px 10px at 68%  6%, rgba(210,58,118,0.52) 0%, transparent 100%),
          radial-gradient(ellipse 5px  7px at 85%  3%, rgba(225,75,135,0.46) 0%, transparent 100%),
          radial-gradient(ellipse 6px  9px at 25% 16%, rgba(205,55,115,0.38) 0%, transparent 100%),
          radial-gradient(ellipse 4px  6px at 45% 20%, rgba(238,88,148,0.34) 0%, transparent 100%),
          radial-gradient(ellipse 5px  8px at 75% 14%, rgba(215,65,125,0.40) 0%, transparent 100%);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      @keyframes sakura-drift1 {
        0%   { transform: translateY(-5vh) translateX(0px)  rotate(-1deg); opacity: 0; }
        5%   { opacity: 1; }
        92%  { opacity: 0.7; }
        100% { transform: translateY(105vh) translateX(45px) rotate(5deg);  opacity: 0; }
      }
      @keyframes sakura-drift2 {
        0%   { transform: translateY(-5vh) translateX(0px)   rotate(1deg); opacity: 0; }
        5%   { opacity: 1; }
        92%  { opacity: 0.6; }
        100% { transform: translateY(105vh) translateX(-35px) rotate(-4deg); opacity: 0; }
      }

      /* Magical-girl sparkle dots scattered across page */
      .sakura-sparkles {
        position: fixed; top: 0; left: 0;
        width: 2px; height: 2px; border-radius: 50%;
        background: rgba(204,40,120,0.90);
        pointer-events: none; z-index: 0;
        animation: sparkle-twinkle 12s ease-in-out infinite;
        box-shadow:
          130px 190px 0 1.5px rgba(220,60,130,0.80),
          290px  75px 0 1px   rgba(255,130,180,0.70),
          460px 340px 0 2px   rgba(200,40,110,0.75),
          700px 140px 0 1.5px rgba(240,100,160,0.65),
          850px 410px 0 1px   rgba(210,55,120,0.70),
          1080px 220px 0 2px  rgba(255,110,170,0.60),
          1260px 480px 0 1px  rgba(220,60,130,0.68),
          1460px 130px 0 1.5px rgba(240,90,150,0.62),
          1640px 360px 0 1px  rgba(205,45,115,0.65),
          200px  570px 0 1.5px rgba(255,130,180,0.55),
          390px  720px 0 1px  rgba(220,70,130,0.60),
          580px  640px 0 2px  rgba(200,40,110,0.58),
          780px  800px 0 1px  rgba(240,100,160,0.50),
          960px  690px 0 1.5px rgba(210,55,120,0.55),
          1150px 840px 0 1px  rgba(255,110,170,0.48),
          1360px 760px 0 1.5px rgba(220,60,130,0.52),
          50px   430px 0 1px  rgba(255,140,185,0.60),
          1750px 260px 0 1.5px rgba(200,45,115,0.55),
          920px   60px 0 1px  rgba(240,90,150,0.65),
          1530px 590px 0 2px  rgba(215,65,125,0.50);
      }
      @keyframes sparkle-twinkle {
        0%,100% { opacity: 0.35; transform: scale(1);    }
        25%     { opacity: 0.80; transform: scale(1.40); }
        50%     { opacity: 0.50; transform: scale(0.90); }
        75%     { opacity: 0.90; transform: scale(1.20); }
      }

      /* Pulsing bloom — top-left + bottom-right */
      .sakura-bloom {
        position: fixed; top: -80px; left: -80px;
        width: 420px; height: 420px;
        border-radius: 50%;
        background: radial-gradient(circle,
          rgba(255,160,210,0.35) 0%,
          rgba(255,120,180,0.18) 30%,
          rgba(220,80,150,0.08) 55%,
          transparent 70%
        );
        pointer-events: none; z-index: 0;
        animation: bloom-pulse 18s ease-in-out infinite;
      }
      .sakura-bloom::after {
        content: '';
        position: fixed; bottom: -80px; right: -80px;
        width: 360px; height: 360px;
        border-radius: 50%;
        background: radial-gradient(circle,
          rgba(200,140,255,0.22) 0%,
          rgba(255,160,210,0.14) 35%,
          transparent 65%
        );
        animation: bloom-pulse 18s ease-in-out infinite 9s;
      }
      @keyframes bloom-pulse {
        0%,100% { transform: scale(1);    opacity: 0.7; }
        50%     { transform: scale(1.12); opacity: 1.0; }
      }

      /* ── Racing Miku theme ── */
      .racing-root {
        font-family: 'Rajdhani', 'Segoe UI', sans-serif !important;
        letter-spacing: 0.03em;
      }
      .racing-root input,
      .racing-root select,
      .racing-root textarea,
      .racing-root button {
        font-family: 'Rajdhani', 'Segoe UI', sans-serif !important;
      }

      /* Speed lines overlay */
      .racing-speedlines {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none; z-index: 9998; overflow: hidden;
      }
      .racing-speedlines::before {
        content: '';
        position: absolute; top: 0; left: -100%; right: -100%; bottom: 0;
        background: repeating-linear-gradient(
          88deg,
          transparent 0px,
          transparent 120px,
          rgba(0,229,204,0.018) 120px,
          rgba(0,229,204,0.018) 121px,
          transparent 121px,
          transparent 180px,
          rgba(0,229,204,0.012) 180px,
          rgba(0,229,204,0.012) 181px
        );
        animation: speed-scroll 3s linear infinite;
      }
      @keyframes speed-scroll {
        from { transform: translateX(0); }
        to   { transform: translateX(180px); }
      }

      /* Bottom gradient bar (racing stripe) */
      .racing-stripe {
        position: fixed; bottom: 0; left: 0; right: 0; height: 3px;
        background: linear-gradient(90deg, #ff4fa3, #00e5cc, #39d0ff, #ff4fa3);
        background-size: 300% 100%;
        animation: stripe-slide 4s linear infinite;
        pointer-events: none; z-index: 9998;
      }
      @keyframes stripe-slide {
        0%   { background-position: 0% 50%; }
        100% { background-position: 300% 50%; }
      }

      /* Card hover in Racing Miku */
      .racing-root .hov-card:hover {
        box-shadow:
          0 0 0 1px #00e5cc,
          0 0 20px #00e5cc44,
          0 8px 32px rgba(0,0,0,0.6) !important;
        border-color: #00e5cc !important;
        transform: translateY(-4px) !important;
      }

      /* Holographic shimmer on cards */
      .racing-card-holo {
        position: relative; overflow: hidden;
      }
      .racing-card-holo::before {
        content: '';
        position: absolute; top: -200%; left: -60%;
        width: 40%; height: 600%;
        background: linear-gradient(
          105deg,
          transparent 40%,
          rgba(0,229,204,0.06) 45%,
          rgba(255,79,163,0.04) 50%,
          rgba(57,208,255,0.06) 55%,
          transparent 60%
        );
        transform: rotate(10deg);
        transition: left 0.5s ease;
        pointer-events: none;
      }
      .racing-card-holo:hover::before {
        left: 130%;
      }

      /* Sparkle effect on hover-btn in racing mode */
      .racing-root .hov-btn {
        position: relative;
        overflow: visible;
      }
      .racing-root .hov-btn:hover {
        opacity: 1 !important;
        text-shadow: 0 0 8px #00e5cc, 0 0 20px #00e5cc88;
        filter: brightness(1.15);
      }

      /* Sparkle pseudo-particles */
      .miku-sparkle {
        position: relative;
        display: inline-block;
      }
      .miku-sparkle::before,
      .miku-sparkle::after {
        content: '✦';
        position: absolute;
        font-size: 10px;
        color: #00e5cc;
        pointer-events: none;
        opacity: 0;
        transition: none;
      }
      .miku-sparkle::before {
        top: -8px; right: -6px;
        animation: sparkle-a 2.4s ease-in-out infinite;
      }
      .miku-sparkle::after {
        bottom: -8px; left: -4px;
        animation: sparkle-b 2.4s ease-in-out infinite 1.2s;
      }
      @keyframes sparkle-a {
        0%,100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
        30%      { opacity: 1; transform: scale(1.2) rotate(30deg); }
        60%      { opacity: 0; transform: scale(0.8) rotate(60deg) translateY(-4px); }
      }
      @keyframes sparkle-b {
        0%,100% { opacity: 0; transform: scale(0.5) rotate(0deg); color: #ff4fa3; }
        30%      { opacity: 1; transform: scale(1.1) rotate(-20deg); color: #39d0ff; }
        60%      { opacity: 0; transform: scale(0.7) rotate(-50deg) translateY(4px); color: #00e5cc; }
      }

      /* Glowing teal text for Racing Miku headings */
      .racing-root .miku-glow-text {
        text-shadow: 0 0 10px #00e5cc99, 0 0 30px #00e5cc44;
      }

      /* Chip toggles in racing mode */
      .racing-root .chip-toggle:hover {
        opacity: 1 !important;
        box-shadow: 0 0 12px #00e5cc55 !important;
        border-color: #00e5cc99 !important;
      }

      /* Input glow in racing mode */
      .racing-root input:focus,
      .racing-root select:focus,
      .racing-root textarea:focus {
        border-color: #00e5cc !important;
        box-shadow: 0 0 0 2px #00e5cc22, 0 0 12px #00e5cc33 !important;
      }

      /* Scrollbar for racing */
      .racing-root::-webkit-scrollbar-thumb { background: #00e5cc44; }

      /* ── Shared ── */
      @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
      .vcr-blink { animation: blink 1s step-end infinite; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .fade-up { animation: fadeUp 0.2s ease forwards; }

      .hov-card { transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s !important; }
      .hov-card:hover { transform: translateY(-3px) !important; box-shadow: 0 8px 24px rgba(0,0,0,0.5) !important; }

      .hov-btn { transition: all 0.13s !important; cursor: pointer; }
      .hov-btn:hover  { opacity: 0.8 !important; }
      .hov-btn:active { transform: scale(0.96) !important; }

      .chip-toggle { transition: all 0.13s !important; cursor: pointer; user-select: none; }
      .chip-toggle:hover { opacity: 0.85 !important; }

      input:focus, select:focus, textarea:focus { outline: none; }
      textarea { font-family: inherit; resize: vertical; }
      input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }

      /* ── Footer ── */
      .app-footer {
        border-top: 1px solid;
        padding: 13px 24px;
        display: flex; justify-content: space-between; align-items: center;
        gap: 12px; flex-wrap: wrap;
        font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
      }

      /* ── Mobile / responsive ── */
      @media (max-width: 768px) {
        .roster-wrap  { padding: 16px 14px !important; }
        .roster-header { flex-direction: column !important; gap: 14px !important; }
        .roster-actions { flex-wrap: wrap !important; justify-content: flex-start !important; }
        .roster-stats { grid-template-columns: repeat(2,1fr) !important; }

        .sheet-tabs button { padding: 9px 10px !important; font-size: 9px !important; letter-spacing: 1px !important; }
        .sheet-tabs { overflow-x: auto; scrollbar-width: none; }
        .sheet-tabs::-webkit-scrollbar { display: none; }

        .stat-grid    { grid-template-columns: repeat(2,1fr) !important; }
        .char-tab-grid { grid-template-columns: 1fr !important; }
        .features-grid { grid-template-columns: 1fr !important; }

        .sheet-content { padding: 12px !important; }

        .app-footer { justify-content: center; text-align: center; }
        .app-footer-mid { display: none; }
      }

      @media (max-width: 480px) {
        .stat-grid { grid-template-columns: repeat(2,1fr) !important; }
        .roster-stats { grid-template-columns: repeat(2,1fr) !important; }
      }
    `}</style>
  )
}
