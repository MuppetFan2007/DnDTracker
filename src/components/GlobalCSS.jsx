import React from 'react'

export function GlobalCSS() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&family=Rajdhani:wght@500;700&family=Nunito:wght@400;600;700;800&family=Cinzel:wght@400;600;700&display=swap');

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

      /* ══════════════════════════════════════
         ── 月夜 Tsukiyo · Moon/Space theme ──
         ══════════════════════════════════════ */
      .moon-root { font-family: 'Cinzel', 'Georgia', serif !important; letter-spacing: 0.04em; }
      .moon-root input, .moon-root select, .moon-root textarea, .moon-root button {
        font-family: 'Cinzel', 'Georgia', serif !important;
      }
      .moon-root::-webkit-scrollbar-thumb { background: #7a6eff44; }

      /* Neon-purple card hover */
      .moon-root .hov-card:hover {
        box-shadow:
          0 0 0 1px #7a6eff,
          0 0 28px #7a6eff44,
          0 10px 44px rgba(0,0,0,0.90) !important;
        border-color: #7a6eff !important;
        transform: translateY(-4px) !important;
      }
      .moon-root input:focus, .moon-root select:focus, .moon-root textarea:focus {
        border-color: #7a6eff !important;
        box-shadow: 0 0 0 2px #7a6eff22, 0 0 18px #7a6eff44 !important;
      }

      /* ── 月 Kanji watermark — enormous, spectral ── */
      .moon-kanji {
        position: fixed; bottom: -40px; right: -30px;
        font-size: 480px; line-height: 1;
        color: rgba(122,110,255,0.040);
        pointer-events: none; z-index: 0; user-select: none;
        font-family: 'Georgia', serif;
        animation: moon-kanji-breathe 26s ease-in-out infinite;
        filter: blur(1px);
      }
      @keyframes moon-kanji-breathe {
        0%,100% { opacity: 0.7;  transform: scale(1.00) rotate(-2deg); }
        40%     { opacity: 1.0;  transform: scale(1.04) rotate(-1deg); }
        70%     { opacity: 0.55; transform: scale(0.97) rotate(-3deg); }
      }

      /* ── Nebula aurora — drifting colour clouds ── */
      .moon-nebula {
        position: fixed; inset: 0;
        pointer-events: none; z-index: 0;
        background:
          radial-gradient(ellipse 58% 38% at  6% 10%, rgba(70,50,200,0.28) 0%, transparent 68%),
          radial-gradient(ellipse 42% 32% at 94%  6%, rgba(110,70,220,0.20) 0%, transparent 65%),
          radial-gradient(ellipse 50% 30% at 78% 90%, rgba(50,100,210,0.18) 0%, transparent 65%),
          radial-gradient(ellipse 38% 42% at 14% 85%, rgba(90,50,190,0.15) 0%, transparent 65%),
          radial-gradient(ellipse 28% 22% at 48% 44%, rgba(80,90,230,0.10) 0%, transparent 60%);
        animation: nebula-drift 30s ease-in-out infinite;
      }
      @keyframes nebula-drift {
        0%,100% { opacity: 0.65; transform: scale(1.00); }
        33%     { opacity: 1.00; transform: scale(1.03) translateX(8px);  }
        66%     { opacity: 0.75; transform: scale(0.98) translateX(-6px); }
      }

      /* ── Crescent moon — top right ── */
      .moon-orb {
        position: fixed; top: 22px; right: 100px;
        width: 110px; height: 110px; border-radius: 50%;
        background: #d0ccff;
        box-shadow: 0 0 0 1.5px rgba(200,185,255,0.55),
                    0 0 50px 14px rgba(122,110,255,0.28),
                    0 0 120px 60px rgba(80,60,200,0.12);
        pointer-events: none; z-index: 1;
      }
      .moon-orb::after {
        content: '';
        position: absolute; top: -5px; left: 20px;
        width: 104px; height: 104px; border-radius: 50%;
        background: #01020e;
      }

      /* ── Large bright foreground stars ── */
      .moon-stars-lg {
        position: fixed; top: 0; left: 0;
        width: 2px; height: 2px; border-radius: 50%;
        background: rgba(255,255,255,0.95);
        pointer-events: none; z-index: 0;
        animation: star-twinkle-lg 7s ease-in-out infinite;
        box-shadow:
          120px  55px 0 1px  rgba(200,185,255,0.95),
          340px  30px 0 1.5px rgba(255,255,255,0.90),
          580px  80px 0 1px  rgba(200,185,255,0.88),
          900px  42px 0 1.5px rgba(255,255,255,0.92),
         1180px  65px 0 1px  rgba(200,185,255,0.90),
         1460px  38px 0 1.5px rgba(255,255,255,0.88),
         1740px  72px 0 1px  rgba(200,185,255,0.85),
          200px 180px 0 1.5px rgba(255,255,255,0.82),
          470px 210px 0 1px  rgba(200,185,255,0.88),
          750px 160px 0 1.5px rgba(255,255,255,0.85),
         1020px 195px 0 1px  rgba(200,185,255,0.80),
         1340px 170px 0 1.5px rgba(255,255,255,0.88),
         1620px 200px 0 1px  rgba(200,185,255,0.82),
           80px 350px 0 1.5px rgba(255,255,255,0.80),
          410px 390px 0 1px  rgba(200,185,255,0.85),
          700px 320px 0 1.5px rgba(255,255,255,0.82),
          980px 370px 0 1px  rgba(200,185,255,0.78),
         1260px 340px 0 1.5px rgba(255,255,255,0.85),
         1560px 380px 0 1px  rgba(200,185,255,0.80),
         1800px 310px 0 1.5px rgba(255,255,255,0.75);
      }
      @keyframes star-twinkle-lg {
        0%,100% { opacity: 0.45; transform: scale(1.0); }
        28%     { opacity: 1.00; transform: scale(1.5); }
        55%     { opacity: 0.60; transform: scale(0.9); }
        80%     { opacity: 0.95; transform: scale(1.3); }
      }

      /* ── Small background star field ── */
      .moon-stars {
        position: fixed; top: 0; left: 0;
        width: 1px; height: 1px;
        background: transparent;
        pointer-events: none; z-index: 0;
        box-shadow:
           65px 180px 0 0.5px rgba(180,170,255,0.70),
          155px  95px 0 1px   rgba(210,200,255,0.60),
          240px 310px 0 0.5px rgba(180,170,255,0.65),
          380px  88px 0 1px   rgba(220,215,255,0.72),
          490px 460px 0 0.5px rgba(180,170,255,0.55),
          565px 220px 0 1px   rgba(210,200,255,0.62),
          680px 530px 0 0.5px rgba(180,170,255,0.58),
          815px 145px 0 1px   rgba(220,215,255,0.70),
          930px 600px 0 0.5px rgba(180,170,255,0.52),
         1040px 285px 0 1px   rgba(210,200,255,0.62),
         1160px 410px 0 0.5px rgba(180,170,255,0.65),
         1290px 195px 0 1px   rgba(220,215,255,0.58),
         1410px 565px 0 0.5px rgba(180,170,255,0.52),
         1550px  95px 0 1px   rgba(210,200,255,0.62),
         1660px 430px 0 0.5px rgba(180,170,255,0.58),
         1740px 270px 0 1px   rgba(220,215,255,0.65),
         1810px 590px 0 0.5px rgba(180,170,255,0.48),
           40px 690px 0 1px   rgba(210,200,255,0.55),
          175px 810px 0 0.5px rgba(180,170,255,0.48),
          310px 680px 0 1px   rgba(220,215,255,0.60),
          455px 880px 0 0.5px rgba(180,170,255,0.52),
          610px 740px 0 1px   rgba(210,200,255,0.55),
          770px 840px 0 0.5px rgba(180,170,255,0.48),
          940px 770px 0 1px   rgba(220,215,255,0.60),
         1110px 910px 0 0.5px rgba(180,170,255,0.48),
         1270px 665px 0 1px   rgba(210,200,255,0.55),
         1420px 790px 0 0.5px rgba(180,170,255,0.52),
         1600px 710px 0 1px   rgba(220,215,255,0.55),
         1790px 880px 0 0.5px rgba(180,170,255,0.45),
          330px  50px 0 1px   rgba(210,200,255,0.65),
          720px 480px 0 0.5px rgba(180,170,255,0.50),
          860px 260px 0 1px   rgba(210,200,255,0.58),
         1070px 640px 0 0.5px rgba(180,170,255,0.52),
         1380px 490px 0 1px   rgba(220,215,255,0.55),
         1700px 155px 0 0.5px rgba(180,170,255,0.48),
          520px 380px 0 1px   rgba(210,200,255,0.60),
          190px 540px 0 0.5px rgba(180,170,255,0.52),
         1490px 720px 0 1px   rgba(220,215,255,0.50),
          630px 930px 0 0.5px rgba(180,170,255,0.42);
      }

      /* ── Shooting stars ── */
      .moon-shooting {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none; z-index: 1; overflow: hidden;
      }
      .moon-shooting::before {
        content: '';
        position: absolute; top: 7%; left: -8%;
        width: 320px; height: 1.5px;
        background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.92) 50%, rgba(200,185,255,0.70) 75%, transparent 100%);
        border-radius: 2px;
        opacity: 0;
        filter: drop-shadow(0 0 4px rgba(200,185,255,0.8));
        animation: shoot1 16s ease-in-out infinite 1s;
      }
      .moon-shooting::after {
        content: '';
        position: absolute; top: 22%; right: 100%;
        width: 220px; height: 1px;
        background: linear-gradient(90deg, transparent 0%, rgba(180,170,255,0.88) 55%, rgba(140,130,255,0.60) 80%, transparent 100%);
        border-radius: 2px;
        opacity: 0;
        filter: drop-shadow(0 0 3px rgba(180,170,255,0.8));
        animation: shoot2 16s ease-in-out infinite 9.5s;
      }
      @keyframes shoot1 {
        0%,100% { opacity:0; transform: translateX(0)    rotate(18deg); }
        1%      { opacity:1; }
        10%     { opacity:0; transform: translateX(115vw) rotate(18deg); }
      }
      @keyframes shoot2 {
        0%,100% { opacity:0; transform: translateX(0)    rotate(15deg); }
        1%      { opacity:1; }
        8%      { opacity:0; transform: translateX(110vw) rotate(15deg); }
      }

      /* ── 星雲 (Nebula) particle shimmer ── */
      .moon-shimmer {
        position: fixed; top: 0; left: 0;
        width: 1.5px; height: 1.5px; border-radius: 50%;
        background: rgba(140,130,255,0.80);
        pointer-events: none; z-index: 0;
        animation: moon-shimmer-pulse 18s ease-in-out infinite;
        box-shadow:
           88px 240px 0 1px  rgba(140,130,255,0.70),
          280px 110px 0 1.5px rgba(170,160,255,0.65),
          510px 320px 0 1px  rgba(140,130,255,0.60),
          750px 180px 0 1.5px rgba(170,160,255,0.68),
          980px 450px 0 1px  rgba(140,130,255,0.62),
         1200px 280px 0 1.5px rgba(170,160,255,0.60),
         1480px 390px 0 1px  rgba(140,130,255,0.58),
         1720px 130px 0 1.5px rgba(170,160,255,0.65),
          160px 580px 0 1px  rgba(140,130,255,0.55),
          430px 700px 0 1.5px rgba(170,160,255,0.60),
          680px 650px 0 1px  rgba(140,130,255,0.58),
          920px 750px 0 1.5px rgba(170,160,255,0.55),
         1150px 620px 0 1px  rgba(140,130,255,0.52),
         1400px 680px 0 1.5px rgba(170,160,255,0.55),
         1680px 730px 0 1px  rgba(140,130,255,0.50);
      }
      @keyframes moon-shimmer-pulse {
        0%,100% { opacity: 0.20; }
        40%     { opacity: 0.80; }
        70%     { opacity: 0.35; }
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

      /* ══════════════════════════════════════
         ── Kuromi theme ──
         ══════════════════════════════════════ */
      .kuromi-root { font-family: 'Share Tech Mono', monospace !important; }
      .kuromi-root input,
      .kuromi-root select,
      .kuromi-root textarea,
      .kuromi-root button { font-family: 'Share Tech Mono', monospace !important; }
      .kuromi-root::-webkit-scrollbar-thumb { background: #c840ff55; }

      /* Neon purple card glow */
      .kuromi-root .hov-card:hover {
        box-shadow:
          0 0 0 1.5px #c840ff,
          0 0 22px #c840ff55,
          0 8px 36px rgba(0,0,0,0.90) !important;
        border-color: #c840ff !important;
        transform: translateY(-4px) !important;
      }

      /* Input focus neon ring */
      .kuromi-root input:focus,
      .kuromi-root select:focus,
      .kuromi-root textarea:focus {
        border-color: #c840ff !important;
        box-shadow: 0 0 0 2px #c840ff22, 0 0 14px #c840ff44 !important;
      }

      /* Dark magic shimmer — sweep on hover */
      .kuromi-shimmer { position: relative; overflow: hidden; }
      .kuromi-shimmer::before {
        content: '';
        position: absolute; top: -200%; left: -60%;
        width: 35%; height: 600%;
        background: linear-gradient(108deg,
          transparent 38%,
          rgba(200,64,255,0.11) 43%,
          rgba(255,64,180,0.07) 50%,
          rgba(138,24,204,0.11) 57%,
          transparent 62%
        );
        transform: rotate(12deg);
        transition: left 0.65s ease;
        pointer-events: none;
      }
      .kuromi-shimmer:hover::before { left: 130%; }

      /* Pulsing dark-magic aura in all four corners */
      .kuromi-aura {
        position: fixed; inset: 0;
        pointer-events: none; z-index: 0;
        background:
          radial-gradient(ellipse 52% 44% at   0%   0%, rgba(120,0,200,0.34) 0%, transparent 70%),
          radial-gradient(ellipse 52% 44% at 100% 100%, rgba(90,0,160,0.28)  0%, transparent 70%),
          radial-gradient(ellipse 36% 30% at 100%   0%, rgba(200,64,255,0.15) 0%, transparent 65%),
          radial-gradient(ellipse 36% 30% at   0% 100%, rgba(160,0,255,0.13) 0%, transparent 65%);
        animation: kuromi-aura-breathe 9s ease-in-out infinite;
      }
      @keyframes kuromi-aura-breathe {
        0%,100% { opacity: 0.52; }
        50%     { opacity: 1.00; }
      }

      /* Floating neon-purple particle field */
      .kuromi-particles {
        position: fixed; top: 0; left: 0;
        width: 2px; height: 2px; border-radius: 50%;
        background: rgba(200,64,255,0.90);
        pointer-events: none; z-index: 0;
        animation: kuromi-float-pulse 10s ease-in-out infinite;
        box-shadow:
           90px  150px 0 1px   rgba(200,64,255,0.85),
          280px   80px 0 1.5px rgba(220,80,255,0.75),
          450px  240px 0 1px   rgba(180,40,240,0.80),
          680px   60px 0 2px   rgba(200,64,255,0.70),
          880px  310px 0 1px   rgba(255,64,200,0.75),
         1100px  140px 0 1.5px rgba(200,64,255,0.80),
         1350px  250px 0 1px   rgba(220,80,255,0.70),
         1600px   90px 0 2px   rgba(180,40,240,0.75),
         1820px  200px 0 1px   rgba(200,64,255,0.65),
           50px  420px 0 1.5px rgba(255,64,200,0.70),
          220px  540px 0 1px   rgba(200,64,255,0.75),
          420px  380px 0 2px   rgba(220,80,255,0.65),
          650px  490px 0 1px   rgba(180,40,240,0.70),
          840px  440px 0 1.5px rgba(200,64,255,0.75),
         1060px  510px 0 1px   rgba(255,64,200,0.65),
         1300px  370px 0 2px   rgba(200,64,255,0.70),
         1520px  450px 0 1px   rgba(220,80,255,0.65),
         1780px  330px 0 1.5px rgba(180,40,240,0.60),
           35px  700px 0 1px   rgba(200,64,255,0.65),
          190px  770px 0 1.5px rgba(255,64,200,0.60),
          370px  630px 0 1px   rgba(200,64,255,0.70),
          600px  730px 0 2px   rgba(220,80,255,0.60),
          800px  670px 0 1px   rgba(180,40,240,0.65),
         1000px  750px 0 1.5px rgba(200,64,255,0.60),
         1200px  610px 0 1px   rgba(255,64,200,0.65);
      }
      @keyframes kuromi-float-pulse {
        0%,100% { opacity: 0.22; }
        35%     { opacity: 0.85; }
        65%     { opacity: 0.42; }
      }

      /* Haunting faint skull — bottom-right corner */
      .kuromi-skull {
        position: fixed; bottom: 58px; right: 42px;
        font-size: 145px; line-height: 1;
        pointer-events: none; z-index: 0;
        opacity: 0.05;
        filter: drop-shadow(0 0 24px #c840ff) drop-shadow(0 0 50px #c840ff66);
        animation: kuromi-skull-haunt 14s ease-in-out infinite;
        user-select: none;
      }
      @keyframes kuromi-skull-haunt {
        0%,100% { opacity: 0.04; transform: scale(1.00) rotate(-3deg); }
        30%     { opacity: 0.10; transform: scale(1.06) rotate( 2deg); }
        60%     { opacity: 0.06; transform: scale(0.97) rotate(-1deg); }
      }

      /* Lightning bolt pair — double-flash every ~22s */
      .kuromi-lightning {
        position: fixed; inset: 0;
        pointer-events: none; z-index: 1;
      }
      .kuromi-lightning::before {
        content: '';
        position: absolute; top: 4%; left: 9%;
        width: 58px; height: 265px;
        background: linear-gradient(180deg, rgba(200,64,255,0.95) 0%, #ffffff 40%, rgba(200,64,255,0.95) 100%);
        clip-path: polygon(56% 0%,68% 0%,46% 41%,74% 41%,24% 100%,38% 100%,58% 58%,28% 58%,56% 0%);
        filter: drop-shadow(0 0 10px #c840ff) drop-shadow(0 0 28px #c840ff88);
        opacity: 0;
        animation: kuromi-bolt 22s ease-in-out infinite 1s;
      }
      .kuromi-lightning::after {
        content: '';
        position: absolute; top: 3%; right: 13%;
        width: 46px; height: 210px;
        background: linear-gradient(180deg, rgba(255,64,200,0.95) 0%, #ffffffcc 40%, rgba(200,64,255,0.95) 100%);
        clip-path: polygon(56% 0%,68% 0%,46% 41%,74% 41%,24% 100%,38% 100%,58% 58%,28% 58%,56% 0%);
        filter: drop-shadow(0 0 8px #ff40cc) drop-shadow(0 0 22px #c840ff77);
        opacity: 0;
        animation: kuromi-bolt 22s ease-in-out infinite 12s;
      }
      @keyframes kuromi-bolt {
        0%,   88.0% { opacity: 0;   }
        88.5%        { opacity: 1.0; }
        89.0%        { opacity: 0.1; }
        89.5%        { opacity: 0.8; }
        90.0%        { opacity: 0.0; }
        100%         { opacity: 0;   }
      }

      /* ══════════════════════════════════════
         ── My Melody theme ──
         ══════════════════════════════════════ */
      .mymelody-root { font-family: 'Nunito', 'Segoe UI', sans-serif !important; font-weight: 600; }
      .mymelody-root input,
      .mymelody-root select,
      .mymelody-root textarea,
      .mymelody-root button { font-family: 'Nunito', 'Segoe UI', sans-serif !important; }
      .mymelody-root::-webkit-scrollbar { background: #ffe0ec; }
      .mymelody-root::-webkit-scrollbar-thumb { background: #d82858; }

      /* Rosy card hover */
      .mymelody-root .hov-card:hover {
        box-shadow:
          0 0 0 1.5px #d82858,
          0 6px 24px rgba(216,40,88,0.22),
          0 12px 42px rgba(255,120,160,0.14) !important;
        border-color: #d82858 !important;
      }

      /* Input focus */
      .mymelody-root input:focus,
      .mymelody-root select:focus,
      .mymelody-root textarea:focus {
        border-color: #d82858 !important;
        box-shadow: 0 0 0 2px rgba(216,40,88,0.20) !important;
      }

      /* Warm pink shimmer sweep */
      .mymelody-shimmer { position: relative; overflow: hidden; }
      .mymelody-shimmer::before {
        content: '';
        position: absolute; top: -200%; left: -60%;
        width: 35%; height: 600%;
        background: linear-gradient(108deg,
          transparent 38%,
          rgba(255,160,190,0.15) 43%,
          rgba(255,200,220,0.10) 50%,
          rgba(220,40,88,0.10) 57%,
          transparent 62%
        );
        transform: rotate(12deg);
        transition: left 0.65s ease;
        pointer-events: none;
      }
      .mymelody-shimmer:hover::before { left: 130%; }

      /* Rainbow stripe — top of viewport */
      .mymelody-rainbow {
        position: fixed; top: 0; left: 0; right: 0; height: 5px;
        background: linear-gradient(90deg, #ff6b9d, #ffb347, #ffd700, #98fb98, #87ceeb, #da70d6, #ff6b9d);
        background-size: 300% 100%;
        animation: melody-rainbow 7s linear infinite;
        pointer-events: none; z-index: 9999;
      }
      @keyframes melody-rainbow {
        0%   { background-position:   0% 50%; }
        100% { background-position: 300% 50%; }
      }

      /* Rising hearts — float slowly from bottom to top */
      .mymelody-hearts {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none; z-index: 0; overflow: hidden;
      }
      .mymelody-hearts::before,
      .mymelody-hearts::after {
        content: '';
        position: absolute;
        bottom: -5%; left: 0; right: 0; height: 100vh;
        background-image:
          radial-gradient(ellipse 10px 13px at 10% 98%, rgba(216,40,88,0.62) 0%, transparent 100%),
          radial-gradient(ellipse  8px 10px at 24% 95%, rgba(255,100,140,0.54) 0%, transparent 100%),
          radial-gradient(ellipse 12px 15px at 38% 97%, rgba(200,30,70,0.58) 0%, transparent 100%),
          radial-gradient(ellipse  7px  9px at 52% 99%, rgba(240,80,120,0.52) 0%, transparent 100%),
          radial-gradient(ellipse 11px 14px at 66% 96%, rgba(216,40,88,0.60) 0%, transparent 100%),
          radial-gradient(ellipse  8px 11px at 80% 98%, rgba(255,110,150,0.50) 0%, transparent 100%),
          radial-gradient(ellipse  9px 12px at 92% 97%, rgba(200,30,70,0.54) 0%, transparent 100%),
          radial-gradient(ellipse  6px  8px at 46% 94%, rgba(240,80,120,0.46) 0%, transparent 100%);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        animation: hearts-rise 38s ease-in-out infinite;
      }
      .mymelody-hearts::after {
        animation: hearts-rise 50s ease-in-out infinite 14s;
        background-image:
          radial-gradient(ellipse  9px 12px at  7% 97%, rgba(255,100,140,0.58) 0%, transparent 100%),
          radial-gradient(ellipse 11px 14px at 20% 99%, rgba(216,40,88,0.54) 0%, transparent 100%),
          radial-gradient(ellipse  7px  9px at 33% 96%, rgba(240,80,120,0.52) 0%, transparent 100%),
          radial-gradient(ellipse 10px 13px at 48% 98%, rgba(200,30,70,0.56) 0%, transparent 100%),
          radial-gradient(ellipse  8px 11px at 62% 97%, rgba(255,110,150,0.50) 0%, transparent 100%),
          radial-gradient(ellipse 13px 16px at 76% 95%, rgba(216,40,88,0.58) 0%, transparent 100%),
          radial-gradient(ellipse  6px  8px at 88% 99%, rgba(240,80,120,0.46) 0%, transparent 100%);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      @keyframes hearts-rise {
        0%   { transform: translateY(0)       rotate(0deg); opacity: 0; }
        5%   { opacity: 1; }
        92%  { opacity: 0.65; }
        100% { transform: translateY(-108vh) rotate(4deg); opacity: 0; }
      }

      /* Soft corner orbs — top-right + bottom-left */
      .mymelody-orbs {
        position: fixed; top: -100px; right: -100px;
        width: 460px; height: 460px; border-radius: 50%;
        background: radial-gradient(circle,
          rgba(255,160,200,0.34) 0%,
          rgba(255,120,170,0.16) 38%,
          transparent 65%
        );
        pointer-events: none; z-index: 0;
        animation: bloom-pulse 16s ease-in-out infinite;
      }
      .mymelody-orbs::after {
        content: '';
        position: fixed; bottom: -80px; left: -80px;
        width: 380px; height: 380px; border-radius: 50%;
        background: radial-gradient(circle,
          rgba(220,130,200,0.26) 0%,
          rgba(255,160,200,0.14) 38%,
          transparent 65%
        );
        animation: bloom-pulse 16s ease-in-out infinite 8s;
      }

      /* Scattered red-pink sparkle dots */
      .mymelody-sparkles {
        position: fixed; top: 0; left: 0;
        width: 2px; height: 2px; border-radius: 50%;
        background: rgba(216,40,88,0.88);
        pointer-events: none; z-index: 0;
        animation: mymelody-glitter 16s ease-in-out infinite;
        box-shadow:
          110px  200px 0 1.5px rgba(216,40,88,0.80),
          300px   90px 0 1px   rgba(255,100,140,0.70),
          480px  260px 0 1.5px rgba(200,30,70,0.75),
          700px   80px 0 2px   rgba(216,40,88,0.65),
          900px  330px 0 1px   rgba(255,100,140,0.70),
         1120px  160px 0 1.5px rgba(200,30,70,0.75),
         1380px  270px 0 1px   rgba(216,40,88,0.65),
         1620px  110px 0 2px   rgba(255,100,140,0.60),
         1840px  220px 0 1px   rgba(200,30,70,0.65),
           70px  440px 0 1.5px rgba(216,40,88,0.70),
          240px  560px 0 1px   rgba(255,100,140,0.65),
          440px  400px 0 2px   rgba(200,30,70,0.60),
          670px  510px 0 1px   rgba(216,40,88,0.65),
          860px  460px 0 1.5px rgba(255,100,140,0.60),
         1080px  530px 0 1px   rgba(200,30,70,0.65),
         1320px  390px 0 2px   rgba(216,40,88,0.60),
         1540px  470px 0 1px   rgba(255,100,140,0.55),
         1800px  350px 0 1.5px rgba(200,30,70,0.55),
           55px  720px 0 1px   rgba(216,40,88,0.60),
          210px  790px 0 1.5px rgba(255,100,140,0.55),
          390px  650px 0 1px   rgba(200,30,70,0.60),
          620px  750px 0 2px   rgba(216,40,88,0.55),
          820px  690px 0 1px   rgba(255,100,140,0.58),
         1020px  770px 0 1.5px rgba(200,30,70,0.55),
         1220px  630px 0 1px   rgba(216,40,88,0.60);
      }
      @keyframes mymelody-glitter {
        0%,100% { opacity: 0.28; }
        38%     { opacity: 0.72; }
        65%     { opacity: 0.44; }
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
        .combat-cols  { grid-template-columns: 1fr !important; }

        .sheet-content { padding: 12px !important; }

        .app-footer { justify-content: center; text-align: center; }
        .app-footer-mid { display: none; }
      }

      @media (max-width: 480px) {
        .stat-grid { grid-template-columns: repeat(2,1fr) !important; }
        .roster-stats { grid-template-columns: repeat(2,1fr) !important; }
      }

      /* ══════════════════════════════════════
         ── Dice Roller Animations ──
         ══════════════════════════════════════ */

      /* Shared particle burst */
      @keyframes dice-burst {
        0%   { transform: translate(-50%,-50%) scale(1);   opacity: 1; }
        100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.2); opacity: 0; }
      }
      .dice-particle { animation: dice-burst 0.75s ease-out forwards; display: inline-block; }

      /* Sakura — petals spin as they fly */
      @keyframes dice-petal {
        0%   { transform: translate(-50%,-50%) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) rotate(540deg) scale(0.2); opacity: 0; }
      }
      .dice-particle-sakura    { animation: dice-petal   0.85s ease-out forwards; }
      .dice-particle-mymelody  { animation: dice-petal   0.90s ease-out forwards; }

      /* Moon — stars rotate and fade */
      @keyframes dice-star {
        0%   { transform: translate(-50%,-50%) scale(0) rotate(0deg); opacity: 1; }
        60%  { opacity: 1; }
        100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.7) rotate(360deg); opacity: 0; }
      }
      .dice-particle-moon { animation: dice-star 0.80s ease-out forwards; }

      /* Kuromi — lightning zap */
      @keyframes dice-zap {
        0%   { transform: translate(-50%,-50%) scale(0.5); opacity: 1; }
        30%  { transform: translate(calc(-50% + var(--dx)*0.4), calc(-50% + var(--dy)*0.4)) scale(1.4); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.3); opacity: 0; }
      }
      .dice-particle-kuromi { animation: dice-zap 0.65s ease-out forwards; }

      /* Racing — speed arrows shoot horizontally */
      @keyframes dice-speed {
        0%   { transform: translate(-50%,-50%) scaleX(0.5); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scaleX(1.5); opacity: 0; }
      }
      .dice-particle-racing { animation: dice-speed 0.55s ease-out forwards; font-weight: 900; }

      /* ── Rolling number animations ── */

      /* VCR: glitch skew */
      @keyframes vcr-glitch-roll {
        0%,100% { transform: skewX(0deg) scaleX(1);      color: #ff3c00; filter: none; }
        15%     { transform: skewX(-8deg) scaleX(1.06);  color: #00ff88; filter: brightness(1.6); }
        35%     { transform: skewX(5deg);                 color: #00ccff; }
        55%     { transform: skewX(-4deg) scaleX(0.94);  color: #ff3c00; filter: brightness(0.7); }
        75%     { transform: skewX(6deg) scaleX(1.03);   color: #ff3c00; }
      }
      .dice-rolling-vcr { animation: vcr-glitch-roll 0.11s steps(1) infinite; }

      /* Moon: shimmer pulse */
      @keyframes moon-roll-pulse {
        0%,100% { text-shadow: 0 0 12px #7a6eff99; opacity: 0.75; }
        50%     { text-shadow: 0 0 40px #c8b8ff, 0 0 80px #7a6eff88; opacity: 1; }
      }
      .dice-rolling-moon { animation: moon-roll-pulse 0.22s ease-in-out infinite; }

      /* Sakura: gentle wobble */
      @keyframes sakura-roll-wobble {
        0%,100% { transform: rotate(-3deg); }
        50%     { transform: rotate(3deg); }
      }
      .dice-rolling-sakura { animation: sakura-roll-wobble 0.18s ease-in-out infinite; }

      /* Racing: rapid flash */
      @keyframes racing-roll-flash {
        0%,100% { transform: scaleX(1);    filter: brightness(1); }
        50%     { transform: scaleX(1.06); filter: brightness(1.5); }
      }
      .dice-rolling-racing { animation: racing-roll-flash 0.09s ease-in-out infinite; }

      /* Kuromi: dark pulse */
      @keyframes kuromi-roll-dark {
        0%,100% { text-shadow: 0 0 10px #c840ff; filter: brightness(1); }
        50%     { text-shadow: 0 0 30px #c840ff, 0 0 60px #8800cc; filter: brightness(1.4); }
      }
      .dice-rolling-kuromi { animation: kuromi-roll-dark 0.15s ease-in-out infinite; }

      /* My Melody: bouncy */
      @keyframes melody-roll-bounce {
        0%,100% { transform: scale(1) rotate(0deg); }
        25%     { transform: scale(1.08) rotate(-4deg); }
        75%     { transform: scale(0.94) rotate(4deg); }
      }
      .dice-rolling-mymelody { animation: melody-roll-bounce 0.20s ease-in-out infinite; }

      /* ── Result reveal animations ── */

      /* VCR: static-skew in */
      @keyframes vcr-result-in {
        0%  { opacity: 0; transform: skewX(-20deg) scaleX(0.6); filter: brightness(4); }
        40% { opacity: 1; transform: skewX(6deg)   scaleX(1.04); }
        70% { transform: skewX(-2deg); }
        100%{ transform: skewX(0)    scaleX(1); filter: brightness(1); }
      }
      .dice-result-vcr { animation: vcr-result-in 0.38s ease-out forwards; }

      /* Moon: blur-scale in */
      @keyframes moon-result-in {
        0%  { opacity: 0; transform: scale(0.5); filter: blur(12px); }
        60% { opacity: 1; transform: scale(1.08); filter: blur(0); }
        100%{ transform: scale(1); }
      }
      .dice-result-moon { animation: moon-result-in 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards; }

      /* Sakura: rotate-bounce in */
      @keyframes sakura-result-in {
        0%  { opacity: 0; transform: scale(0.6) rotate(-8deg); }
        65% { opacity: 1; transform: scale(1.1) rotate(2deg); }
        100%{ transform: scale(1) rotate(0); }
      }
      .dice-result-sakura { animation: sakura-result-in 0.42s cubic-bezier(0.34,1.56,0.64,1) forwards; }

      /* Racing: slide from left */
      @keyframes racing-result-in {
        0%  { opacity: 0; transform: translateX(-40px) scaleX(0.8); }
        60% { opacity: 1; transform: translateX(6px)   scaleX(1.02); }
        100%{ transform: translateX(0) scaleX(1); }
      }
      .dice-result-racing { animation: racing-result-in 0.32s ease-out forwards; }

      /* Kuromi: flash in with lightning */
      @keyframes kuromi-result-in {
        0%  { opacity: 0; transform: scale(1.5); filter: brightness(3); }
        30% { opacity: 1; transform: scale(0.9); filter: brightness(1.2); }
        60% { transform: scale(1.05); }
        100%{ transform: scale(1); filter: brightness(1); }
      }
      .dice-result-kuromi { animation: kuromi-result-in 0.40s ease-out forwards; }

      /* My Melody: spring pop */
      @keyframes melody-result-in {
        0%  { opacity: 0; transform: scale(0.4) rotate(15deg); }
        55% { opacity: 1; transform: scale(1.18) rotate(-4deg); }
        75% { transform: scale(0.94) rotate(2deg); }
        100%{ transform: scale(1) rotate(0); }
      }
      .dice-result-mymelody { animation: melody-result-in 0.48s cubic-bezier(0.34,1.56,0.64,1) forwards; }

      /* VCR flickering overlay during roll */
      @keyframes vcr-flicker {
        0%,100% { opacity: 0; }
        10%,30%,50%,70% { opacity: 0.06; }
        20%,40%,60%,80% { opacity: 0; }
      }
      .dice-vcr-flicker {
        background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,60,0,0.08) 2px, rgba(255,60,0,0.08) 4px);
        animation: vcr-flicker 0.1s steps(1) infinite;
      }

      /* Racing speed lines overlay */
      @keyframes speed-lines-anim {
        0%   { opacity: 0.7; transform: scaleX(0) translateX(-20px); }
        100% { opacity: 0;   transform: scaleX(1) translateX(0); }
      }
      .dice-speed-lines {
        background: repeating-linear-gradient(
          90deg, transparent, transparent 18px,
          rgba(0,229,204,0.12) 18px, rgba(0,229,204,0.12) 20px
        );
        animation: speed-lines-anim 0.18s ease-out infinite;
      }
    `}</style>
  )
}
