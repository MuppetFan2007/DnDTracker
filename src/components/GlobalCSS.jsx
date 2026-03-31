import React from 'react'

export function GlobalCSS() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&family=Rajdhani:wght@500;700&family=Nunito:wght@400;600;700;800&family=Cinzel:wght@400;600;700&family=Exo+2:wght@400;600;700;800&display=swap');

      *, *::before, *::after { box-sizing: border-box; }
      body { margin: 0; }

      /* Theme dropdown */
      @keyframes theme-dropdown-in {
        from { opacity: 0; transform: translateY(-8px) scale(0.96); }
        to   { opacity: 1; transform: translateY(0)   scale(1); }
      }
      .theme-dropdown {
        animation: theme-dropdown-in 0.18s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        transform-origin: top right;
      }
      .theme-dropdown button:hover {
        background: rgba(128,128,128,0.08) !important;
      }

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
         ── ✦ Galaxy / Deep Space theme ──
         ══════════════════════════════════════ */
      .moon-root { font-family: 'Cinzel', 'Georgia', serif !important; letter-spacing: 0.04em; }
      .moon-root input, .moon-root select, .moon-root textarea, .moon-root button {
        font-family: 'Cinzel', 'Georgia', serif !important;
      }
      .moon-root::-webkit-scrollbar-thumb { background: #7a6eff44; }

      /* Card hover — deep space glow */
      .moon-root .hov-card:hover {
        box-shadow:
          0 0 0 1px #7a6eff,
          0 0 30px #7a6eff55,
          0 12px 50px rgba(0,0,0,0.95) !important;
        border-color: #7a6eff !important;
        transform: translateY(-4px) !important;
      }
      .moon-root input:focus, .moon-root select:focus, .moon-root textarea:focus {
        border-color: #7a6eff !important;
        box-shadow: 0 0 0 2px #7a6eff22, 0 0 20px #7a6eff55 !important;
      }

      /* ── Galaxy Nebula — multi-color cosmic clouds ── */
      .moon-nebula {
        position: fixed; inset: 0;
        pointer-events: none; z-index: 0;
        background:
          radial-gradient(ellipse 55% 40% at  5% 10%, rgba(55,35,215,0.42) 0%, transparent 65%),
          radial-gradient(ellipse 40% 30% at 94%  8%, rgba(200,50,150,0.22) 0%, transparent 62%),
          radial-gradient(ellipse 50% 35% at 78% 94%, rgba(0,190,190,0.18) 0%, transparent 62%),
          radial-gradient(ellipse 42% 46% at 10% 86%, rgba(100,35,210,0.22) 0%, transparent 63%),
          radial-gradient(ellipse 30% 24% at 50% 46%, rgba(55,110,240,0.14) 0%, transparent 58%),
          radial-gradient(ellipse 24% 20% at 65% 20%, rgba(180,55,230,0.13) 0%, transparent 56%),
          radial-gradient(ellipse 20% 16% at 28% 68%, rgba(0,170,230,0.10) 0%, transparent 54%),
          radial-gradient(ellipse 16% 12% at 82% 55%, rgba(255,120,80,0.06) 0%, transparent 50%);
        animation: nebula-drift 38s ease-in-out infinite;
      }
      @keyframes nebula-drift {
        0%,100% { opacity: 0.70; transform: scale(1.00); }
        33%     { opacity: 1.00; transform: scale(1.04) translateX(10px);  }
        66%     { opacity: 0.78; transform: scale(0.97) translateX(-8px); }
      }

      /* ── Milky Way — diagonal galactic band ── */
      .moon-milkyway {
        position: fixed; inset: 0;
        pointer-events: none; z-index: 0;
        background: linear-gradient(
          108deg,
          transparent 5%,
          rgba(80,65,190,0.03)  18%,
          rgba(120,105,230,0.06) 28%,
          rgba(150,135,255,0.09) 40%,
          rgba(130,115,240,0.07) 52%,
          rgba(90,75,200,0.04)  62%,
          transparent 75%
        );
        filter: blur(28px);
        animation: milkyway-pulse 55s ease-in-out infinite;
      }
      @keyframes milkyway-pulse {
        0%,100% { opacity: 0.65; }
        50%     { opacity: 1.00; }
      }

      /* ── Space Aurora — shifting colour curtains at top ── */
      .moon-aurora {
        position: fixed; top: 0; left: 0; right: 0; height: 45vh;
        pointer-events: none; z-index: 0;
        background:
          linear-gradient(180deg,
            rgba(0,230,180,0.06)  0%,
            rgba(40,120,255,0.05) 22%,
            rgba(120,50,220,0.04) 46%,
            transparent 100%
          );
        filter: blur(14px);
        animation: aurora-wave 28s ease-in-out infinite;
      }
      @keyframes aurora-wave {
        0%,100% { transform: skewY(-1.5deg) scaleY(1.00); opacity: 0.55; }
        30%     { transform: skewY( 0.8deg) scaleY(1.18); opacity: 1.00; }
        65%     { transform: skewY(-0.8deg) scaleY(0.88); opacity: 0.62; }
      }

      /* ── Ringed Planet — deep background, top-right ── */
      .moon-planet {
        position: fixed; top: 40px; right: 40px;
        width: 60px; height: 60px; border-radius: 50%;
        background: radial-gradient(circle at 36% 34%,
          #8898be 0%, #4458a0 28%, #182478 58%, #040c28 100%
        );
        box-shadow:
          inset -10px -8px 20px rgba(0,0,25,0.92),
          0 0 0 1px rgba(80,110,200,0.22),
          0 0 24px 6px rgba(40,70,180,0.14),
          0 0 70px 30px rgba(20,40,140,0.07);
        pointer-events: none; z-index: 0; opacity: 0.55;
      }
      /* Atmospheric band */
      .moon-planet::before {
        content: '';
        position: absolute; top: 30%; left: 8%; right: 8%; height: 16%;
        border-radius: 50%; background: rgba(140,160,220,0.10);
        filter: blur(3px);
      }
      /* Ring */
      .moon-planet::after {
        content: '';
        position: absolute; top: 50%; left: 50%;
        width: 116px; height: 26px;
        border: 1.5px solid rgba(100,130,220,0.28);
        border-radius: 50%;
        transform: translate(-50%, -50%) rotateX(72deg);
        box-shadow:
          0 0 0 1px rgba(100,130,220,0.08),
          0 0 8px rgba(80,110,200,0.12);
      }

      /* ── Distant galaxy spiral — lower-right ── */
      .moon-galaxy-spiral {
        position: fixed; bottom: 60px; right: 30px;
        width: 130px; height: 130px; border-radius: 50%;
        pointer-events: none; z-index: 0;
        background:
          radial-gradient(ellipse 28% 28% at 50% 50%, rgba(210,200,255,0.14) 0%, transparent 60%),
          conic-gradient(from 0deg,
            transparent 0deg,   rgba(140,130,255,0.07) 50deg,
            transparent 90deg,  rgba(130,120,245,0.06) 140deg,
            transparent 180deg, rgba(140,130,255,0.07) 230deg,
            transparent 270deg, rgba(130,120,245,0.05) 320deg,
            transparent 360deg
          );
        animation: galaxy-spin 140s linear infinite;
        filter: blur(2.5px);
      }
      @keyframes galaxy-spin {
        from { transform: rotate(0deg) scale(1); }
        50%  { transform: rotate(180deg) scale(1.08); }
        to   { transform: rotate(360deg) scale(1); }
      }

      /* ── Large bright foreground stars — with colour variety ── */
      .moon-stars-lg {
        position: fixed; top: 0; left: 0;
        width: 2px; height: 2px; border-radius: 50%;
        background: rgba(255,255,255,0.96);
        pointer-events: none; z-index: 0;
        animation: star-twinkle-lg 8s ease-in-out infinite;
        box-shadow:
          120px  55px 0 1px   rgba(200,190,255,0.96),
          340px  30px 0 1.5px rgba(255,255,255,0.92),
          580px  80px 0 1px   rgba(180,220,255,0.90),
          900px  42px 0 1.5px rgba(255,255,255,0.94),
         1180px  65px 0 1px   rgba(200,190,255,0.92),
         1460px  38px 0 1.5px rgba(255,240,200,0.88),
         1740px  72px 0 1px   rgba(200,190,255,0.86),
          200px 180px 0 1.5px rgba(255,255,255,0.84),
          470px 210px 0 1px   rgba(180,220,255,0.90),
          750px 160px 0 1.5px rgba(255,255,255,0.86),
         1020px 195px 0 1px   rgba(200,190,255,0.82),
         1340px 170px 0 1.5px rgba(255,240,200,0.88),
         1620px 200px 0 1px   rgba(200,190,255,0.84),
           80px 350px 0 1.5px rgba(255,255,255,0.82),
          410px 390px 0 1px   rgba(180,220,255,0.86),
          700px 320px 0 1.5px rgba(255,255,255,0.84),
          980px 370px 0 1px   rgba(200,190,255,0.80),
         1260px 340px 0 1.5px rgba(255,255,255,0.86),
         1560px 380px 0 1px   rgba(255,240,200,0.82),
         1800px 310px 0 1.5px rgba(200,190,255,0.78),
          300px 510px 0 1px   rgba(180,220,255,0.80),
          820px 490px 0 1.5px rgba(255,255,255,0.82),
         1100px 520px 0 1px   rgba(200,190,255,0.76),
         1450px 480px 0 1.5px rgba(255,240,200,0.80);
      }
      @keyframes star-twinkle-lg {
        0%,100% { opacity: 0.40; transform: scale(1.0); }
        22%     { opacity: 1.00; transform: scale(1.6); }
        50%     { opacity: 0.55; transform: scale(0.9); }
        78%     { opacity: 0.92; transform: scale(1.35); }
      }

      /* ── Dense background star field ── */
      .moon-stars {
        position: fixed; top: 0; left: 0;
        width: 1px; height: 1px;
        background: transparent;
        pointer-events: none; z-index: 0;
        box-shadow:
           65px 180px 0 0.5px rgba(185,175,255,0.72),
          155px  95px 0 1px   rgba(210,205,255,0.62),
          240px 310px 0 0.5px rgba(185,175,255,0.66),
          380px  88px 0 1px   rgba(220,215,255,0.74),
          490px 460px 0 0.5px rgba(185,175,255,0.56),
          565px 220px 0 1px   rgba(210,205,255,0.64),
          680px 530px 0 0.5px rgba(185,175,255,0.60),
          815px 145px 0 1px   rgba(220,215,255,0.72),
          930px 600px 0 0.5px rgba(185,175,255,0.54),
         1040px 285px 0 1px   rgba(210,205,255,0.64),
         1160px 410px 0 0.5px rgba(185,175,255,0.66),
         1290px 195px 0 1px   rgba(220,215,255,0.60),
         1410px 565px 0 0.5px rgba(185,175,255,0.54),
         1550px  95px 0 1px   rgba(210,205,255,0.64),
         1660px 430px 0 0.5px rgba(185,175,255,0.60),
         1740px 270px 0 1px   rgba(220,215,255,0.66),
         1810px 590px 0 0.5px rgba(185,175,255,0.50),
           40px 690px 0 1px   rgba(210,205,255,0.56),
          175px 810px 0 0.5px rgba(185,175,255,0.50),
          310px 680px 0 1px   rgba(220,215,255,0.62),
          455px 880px 0 0.5px rgba(185,175,255,0.54),
          610px 740px 0 1px   rgba(210,205,255,0.56),
          770px 840px 0 0.5px rgba(185,175,255,0.50),
          940px 770px 0 1px   rgba(220,215,255,0.62),
         1110px 910px 0 0.5px rgba(185,175,255,0.50),
         1270px 665px 0 1px   rgba(210,205,255,0.56),
         1420px 790px 0 0.5px rgba(185,175,255,0.54),
         1600px 710px 0 1px   rgba(220,215,255,0.56),
         1790px 880px 0 0.5px rgba(185,175,255,0.46),
          330px  50px 0 1px   rgba(210,205,255,0.66),
          720px 480px 0 0.5px rgba(185,175,255,0.52),
          860px 260px 0 1px   rgba(210,205,255,0.60),
         1070px 640px 0 0.5px rgba(185,175,255,0.54),
         1380px 490px 0 1px   rgba(220,215,255,0.56),
         1700px 155px 0 0.5px rgba(185,175,255,0.50),
          520px 380px 0 1px   rgba(210,205,255,0.62),
          190px 540px 0 0.5px rgba(185,175,255,0.54),
         1490px 720px 0 1px   rgba(220,215,255,0.52),
          630px 930px 0 0.5px rgba(185,175,255,0.44),
          88px  420px 0 1px   rgba(255,240,200,0.42),
         1340px 350px 0 0.5px rgba(200,240,255,0.44),
          450px 150px 0 1px   rgba(255,220,180,0.38),
          970px 700px 0 0.5px rgba(200,240,255,0.40);
      }

      /* ── Shooting stars — three tracks ── */
      .moon-shooting {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none; z-index: 1; overflow: hidden;
      }
      .moon-shooting::before {
        content: '';
        position: absolute; top: 6%; left: -10%;
        width: 340px; height: 1.5px;
        background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 45%, rgba(200,190,255,0.72) 72%, transparent 100%);
        border-radius: 2px; opacity: 0;
        filter: drop-shadow(0 0 5px rgba(200,190,255,0.85));
        animation: shoot1 18s ease-in-out infinite 2s;
      }
      .moon-shooting::after {
        content: '';
        position: absolute; top: 20%; right: 100%;
        width: 240px; height: 1px;
        background: linear-gradient(90deg, transparent 0%, rgba(180,220,255,0.90) 50%, rgba(140,190,255,0.62) 78%, transparent 100%);
        border-radius: 2px; opacity: 0;
        filter: drop-shadow(0 0 4px rgba(180,220,255,0.82));
        animation: shoot2 18s ease-in-out infinite 10s;
      }
      @keyframes shoot1 {
        0%,100% { opacity:0; transform: translateX(0)    rotate(20deg); }
        1%      { opacity:1; }
        9%      { opacity:0; transform: translateX(118vw) rotate(20deg); }
      }
      @keyframes shoot2 {
        0%,100% { opacity:0; transform: translateX(0)    rotate(16deg); }
        1%      { opacity:1; }
        7%      { opacity:0; transform: translateX(112vw) rotate(16deg); }
      }

      /* Third shooting star track */
      .moon-shooting2 {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none; z-index: 1; overflow: hidden;
      }
      .moon-shooting2::before {
        content: '';
        position: absolute; top: 38%; left: -6%;
        width: 180px; height: 1px;
        background: linear-gradient(90deg, transparent 0%, rgba(200,180,255,0.85) 50%, rgba(160,140,255,0.55) 80%, transparent 100%);
        border-radius: 2px; opacity: 0;
        filter: drop-shadow(0 0 3px rgba(200,180,255,0.75));
        animation: shoot3 22s ease-in-out infinite 6s;
      }
      @keyframes shoot3 {
        0%,100% { opacity:0; transform: translateX(0)    rotate(14deg); }
        1%      { opacity:0.8; }
        6%      { opacity:0; transform: translateX(108vw) rotate(14deg); }
      }

      /* ── Nebula particle shimmer ── */
      .moon-shimmer {
        position: fixed; top: 0; left: 0;
        width: 1.5px; height: 1.5px; border-radius: 50%;
        background: rgba(140,130,255,0.82);
        pointer-events: none; z-index: 0;
        animation: moon-shimmer-pulse 20s ease-in-out infinite;
        box-shadow:
           88px 240px 0 1px   rgba(140,130,255,0.72),
          280px 110px 0 1.5px rgba(170,160,255,0.66),
          510px 320px 0 1px   rgba(0,200,200,0.40),
          750px 180px 0 1.5px rgba(170,160,255,0.70),
          980px 450px 0 1px   rgba(200,60,160,0.35),
         1200px 280px 0 1.5px rgba(170,160,255,0.62),
         1480px 390px 0 1px   rgba(140,130,255,0.60),
         1720px 130px 0 1.5px rgba(170,160,255,0.66),
          160px 580px 0 1px   rgba(0,180,220,0.38),
          430px 700px 0 1.5px rgba(170,160,255,0.62),
          680px 650px 0 1px   rgba(140,130,255,0.58),
          920px 750px 0 1.5px rgba(200,60,160,0.32),
         1150px 620px 0 1px   rgba(140,130,255,0.54),
         1400px 680px 0 1.5px rgba(170,160,255,0.56),
         1680px 730px 0 1px   rgba(0,200,200,0.36);
      }
      @keyframes moon-shimmer-pulse {
        0%,100% { opacity: 0.18; }
        40%     { opacity: 0.85; }
        70%     { opacity: 0.32; }
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

      /* ══════════════════════════════════════
         ── NieR:Automata 2B  "Glory to Mankind" ──
         ══════════════════════════════════════ */
      .nier2b-root {
        font-family: 'Rajdhani', 'Segoe UI', sans-serif !important;
        letter-spacing: 0.08em;
      }
      .nier2b-root input,
      .nier2b-root select,
      .nier2b-root textarea,
      .nier2b-root button {
        font-family: 'Rajdhani', 'Segoe UI', sans-serif !important;
      }
      .nier2b-root::-webkit-scrollbar { width: 4px; }
      .nier2b-root::-webkit-scrollbar-track { background: #09090b; }
      .nier2b-root::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #e8dfd028, #e8dfd055, #e8dfd028);
        border-radius: 2px;
      }

      /* ── Cinematic vignette ── */
      .nier2b-vignette {
        position: fixed; inset: 0;
        background: radial-gradient(ellipse 88% 88% at 50% 50%,
          transparent 30%, rgba(0,0,0,0.28) 62%, rgba(0,0,0,0.75) 100%);
        pointer-events: none; z-index: 1;
      }

      /* ── Fine drifting scanlines ── */
      .nier2b-scanlines {
        position: fixed; inset: 0;
        background: repeating-linear-gradient(
          0deg, transparent, transparent 2px,
          rgba(232,223,208,0.016) 2px, rgba(232,223,208,0.016) 3px
        );
        pointer-events: none; z-index: 9999;
        animation: nier2b-scan-drift 8s linear infinite;
      }
      @keyframes nier2b-scan-drift {
        from { background-position: 0 0; }
        to   { background-position: 0 30px; }
      }

      /* ── Diamond grid overlay ── */
      .nier2b-hexgrid {
        position: fixed; inset: 0;
        pointer-events: none; z-index: 0;
        background-image:
          linear-gradient(rgba(232,223,208,0.026) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232,223,208,0.026) 1px, transparent 1px),
          linear-gradient(45deg, rgba(232,223,208,0.011) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(232,223,208,0.011) 1px, transparent 1px);
        background-size: 48px 48px, 48px 48px, 48px 48px, 48px 48px;
        animation: nier2b-grid-breathe 22s ease-in-out infinite;
      }
      @keyframes nier2b-grid-breathe {
        0%,100% { opacity: 0.45; }
        50%     { opacity: 1.0; }
      }

      /* ── Falling white petals (YoRHa memory field) ── */
      .nier2b-petals {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none; z-index: 2; overflow: hidden;
      }
      .nier2b-petals::before {
        content: '';
        position: absolute; top: -5%; left: 0; right: 0; height: 110vh;
        background-image:
          radial-gradient(ellipse 4px 8px at  6%  3%, rgba(232,223,208,0.52) 0%, transparent 100%),
          radial-gradient(ellipse 3px 6px at 19%  8%, rgba(232,223,208,0.44) 0%, transparent 100%),
          radial-gradient(ellipse 5px 9px at 33%  1%, rgba(232,223,208,0.50) 0%, transparent 100%),
          radial-gradient(ellipse 3px 5px at 48%  6%, rgba(232,223,208,0.38) 0%, transparent 100%),
          radial-gradient(ellipse 4px 7px at 62%  2%, rgba(232,223,208,0.54) 0%, transparent 100%),
          radial-gradient(ellipse 3px 6px at 77%  9%, rgba(232,223,208,0.46) 0%, transparent 100%),
          radial-gradient(ellipse 5px 8px at 91%  4%, rgba(232,223,208,0.48) 0%, transparent 100%),
          radial-gradient(ellipse 3px 5px at 14% 18%, rgba(232,223,208,0.36) 0%, transparent 100%),
          radial-gradient(ellipse 4px 7px at 28% 14%, rgba(232,223,208,0.42) 0%, transparent 100%),
          radial-gradient(ellipse 3px 5px at 55% 17%, rgba(232,223,208,0.34) 0%, transparent 100%),
          radial-gradient(ellipse 4px 8px at 70% 12%, rgba(232,223,208,0.46) 0%, transparent 100%),
          radial-gradient(ellipse 3px 5px at 84% 19%, rgba(232,223,208,0.32) 0%, transparent 100%),
          radial-gradient(ellipse 3px 5px at 42% 22%, rgba(191,21,40,0.28) 0%, transparent 100%),
          radial-gradient(ellipse 2px 4px at 71% 16%, rgba(191,21,40,0.20) 0%, transparent 100%);
        background-size: 100% 100%; background-repeat: no-repeat;
        animation: nier2b-petal-fall1 88s linear infinite;
      }
      .nier2b-petals::after {
        content: '';
        position: absolute; top: -5%; left: 0; right: 0; height: 110vh;
        background-image:
          radial-gradient(ellipse 3px 6px at  9%  5%, rgba(232,223,208,0.46) 0%, transparent 100%),
          radial-gradient(ellipse 4px 8px at 24%  2%, rgba(232,223,208,0.40) 0%, transparent 100%),
          radial-gradient(ellipse 3px 5px at 38%  9%, rgba(232,223,208,0.36) 0%, transparent 100%),
          radial-gradient(ellipse 5px 9px at 52%  4%, rgba(232,223,208,0.52) 0%, transparent 100%),
          radial-gradient(ellipse 3px 6px at 66%  7%, rgba(232,223,208,0.38) 0%, transparent 100%),
          radial-gradient(ellipse 4px 7px at 80%  1%, rgba(232,223,208,0.48) 0%, transparent 100%),
          radial-gradient(ellipse 3px 5px at 95%  6%, rgba(232,223,208,0.42) 0%, transparent 100%),
          radial-gradient(ellipse 4px 7px at 17% 15%, rgba(232,223,208,0.38) 0%, transparent 100%),
          radial-gradient(ellipse 3px 5px at 44% 20%, rgba(232,223,208,0.30) 0%, transparent 100%),
          radial-gradient(ellipse 4px 8px at 61% 13%, rgba(232,223,208,0.44) 0%, transparent 100%),
          radial-gradient(ellipse 3px 5px at 88% 17%, rgba(232,223,208,0.34) 0%, transparent 100%),
          radial-gradient(ellipse 2px 4px at 31% 24%, rgba(191,21,40,0.18) 0%, transparent 100%);
        background-size: 100% 100%; background-repeat: no-repeat;
        animation: nier2b-petal-fall2 112s linear infinite 22s;
      }
      @keyframes nier2b-petal-fall1 {
        0%   { transform: translateY(-5vh) translateX(0px) rotate(-1deg); opacity: 0; }
        4%   { opacity: 0.90; }
        93%  { opacity: 0.75; }
        100% { transform: translateY(108vh) translateX(55px) rotate(7deg); opacity: 0; }
      }
      @keyframes nier2b-petal-fall2 {
        0%   { transform: translateY(-5vh) translateX(0px) rotate(2deg); opacity: 0; }
        4%   { opacity: 0.80; }
        93%  { opacity: 0.65; }
        100% { transform: translateY(108vh) translateX(-48px) rotate(-5deg); opacity: 0; }
      }

      /* ── Glitch sweep bars ── */
      .nier2b-glitch {
        position: fixed; inset: 0;
        pointer-events: none; z-index: 9997; overflow: hidden;
      }
      .nier2b-glitch::before {
        content: '';
        position: absolute; left: 0; right: 0; height: 1px;
        background: linear-gradient(90deg,
          transparent 0%, rgba(232,223,208,0.0) 8%,
          rgba(232,223,208,0.85) 40%, rgba(232,223,208,0.98) 50%,
          rgba(232,223,208,0.85) 60%, rgba(232,223,208,0.0) 92%, transparent 100%);
        top: 0; opacity: 0;
        animation: nier2b-sweep-a 18s ease-in-out infinite 1s;
      }
      .nier2b-glitch::after {
        content: '';
        position: absolute; left: 0; right: 0; height: 1px;
        background: linear-gradient(90deg,
          transparent 0%, rgba(191,21,40,0.0) 8%,
          rgba(191,21,40,0.75) 42%, rgba(191,21,40,0.95) 50%,
          rgba(191,21,40,0.75) 58%, rgba(191,21,40,0.0) 92%, transparent 100%);
        top: 0; opacity: 0;
        animation: nier2b-sweep-b 27s ease-in-out infinite 9s;
      }
      @keyframes nier2b-sweep-a {
        0%,100%  { opacity:0; top: 0%; }
        1.5%     { opacity:1;   top: 22%; transform: scaleX(1.0); }
        2.0%     { opacity:0;   transform: scaleX(0.55) translateX(-22px); }
        5.0%     { opacity:0.9; top: 57%; }
        5.4%     { opacity:0; }
        9.0%     { opacity:0.7; top: 81%; transform: scaleX(0.85); }
        9.3%     { opacity:0; }
      }
      @keyframes nier2b-sweep-b {
        0%,100%  { opacity:0; top: 0%; }
        2.5%     { opacity:0.7; top: 38%; }
        2.9%     { opacity:0;   transform: scaleX(1.3) translateX(16px); }
        6.5%     { opacity:0.6; top: 68%; }
        6.8%     { opacity:0; }
        12.0%    { opacity:0.75; top: 90%; }
        12.4%    { opacity:0; }
      }

      /* ── Floating ivory data fragments ── */
      .nier2b-particles {
        position: fixed; top: 0; left: 0;
        width: 2px; height: 2px;
        background: rgba(232,223,208,0.55);
        pointer-events: none; z-index: 0;
        animation: nier2b-float 36s ease-in-out infinite;
        box-shadow:
           145px  195px 0 1px   rgba(232,223,208,0.22),
           340px   88px 0 1.5px rgba(232,223,208,0.18),
           590px  320px 0 1px   rgba(232,223,208,0.26),
           810px  140px 0 1px   rgba(232,223,208,0.16),
          1050px  480px 0 1.5px rgba(232,223,208,0.20),
          1290px  230px 0 1px   rgba(232,223,208,0.18),
          1560px   90px 0 1.5px rgba(232,223,208,0.24),
          1790px  390px 0 1px   rgba(232,223,208,0.14),
           185px  545px 0 1.5px rgba(232,223,208,0.14),
           430px  700px 0 1px   rgba(232,223,208,0.18),
           710px  620px 0 1.5px rgba(232,223,208,0.12),
           960px  760px 0 1px   rgba(232,223,208,0.16),
          1230px  680px 0 1.5px rgba(232,223,208,0.13),
          1470px  790px 0 1px   rgba(232,223,208,0.11),
          1710px  540px 0 1.5px rgba(232,223,208,0.17),
           260px  440px 0 1px   rgba(191,21,40,0.28),
           680px  265px 0 1px   rgba(191,21,40,0.20),
          1130px  360px 0 1px   rgba(191,21,40,0.24),
          1550px  505px 0 1px   rgba(191,21,40,0.16),
            82px  865px 0 1.5px rgba(232,223,208,0.10),
           505px  925px 0 1px   rgba(232,223,208,0.12),
           915px  885px 0 1.5px rgba(232,223,208,0.09),
          1330px  835px 0 1px   rgba(232,223,208,0.13),
          1730px  895px 0 1.5px rgba(232,223,208,0.09);
      }
      @keyframes nier2b-float {
        0%,100% { opacity: 0.30; transform: translateY(0); }
        33%     { opacity: 0.70; transform: translateY(-10px); }
        66%     { opacity: 0.45; transform: translateY(6px); }
      }

      /* ── YoRHa machine core (lower-right) ── */
      .nier2b-core {
        position: fixed; bottom: 72px; right: 22px;
        width: 96px; height: 96px;
        pointer-events: none; z-index: 0;
      }
      /* Mid ring */
      .nier2b-core::before {
        content: '';
        position: absolute; inset: 12px;
        border-radius: 50%;
        border: 1px solid rgba(232,223,208,0.22);
        box-shadow:
          0 0 0 8px rgba(232,223,208,0.03),
          0 0 0 18px rgba(232,223,208,0.015),
          inset 0 0 22px rgba(232,223,208,0.04);
        animation: nier2b-spin-cw 38s linear infinite;
      }
      /* Inner counter-rotating diamond */
      .nier2b-core::after {
        content: '';
        position: absolute; top: 50%; left: 50%;
        width: 30px; height: 30px;
        margin-top: -15px; margin-left: -15px;
        border: 1px solid rgba(232,223,208,0.35);
        box-shadow:
          0 0 14px rgba(232,223,208,0.10),
          inset 0 0 8px rgba(232,223,208,0.06);
        animation: nier2b-spin-ccw 20s linear infinite;
      }
      @keyframes nier2b-spin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
      @keyframes nier2b-spin-ccw { from { transform: rotate(45deg);  } to { transform: rotate(-315deg); } }

      /* ── YoRHa tactical HUD frame bars ── */
      .nier2b-hud {
        position: fixed; inset: 0; pointer-events: none; z-index: 9998;
      }
      .nier2b-hud::before {
        content: '';
        position: absolute; top: 0; left: 0; right: 0; height: 2px;
        background: linear-gradient(90deg,
          transparent 0%, rgba(232,223,208,0.0) 6%,
          rgba(232,223,208,0.50) 24%, rgba(232,223,208,0.82) 50%,
          rgba(232,223,208,0.50) 76%, rgba(232,223,208,0.0) 94%, transparent 100%);
        animation: nier2b-hud-pulse 7s ease-in-out infinite;
      }
      .nier2b-hud::after {
        content: '';
        position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
        background: linear-gradient(90deg,
          transparent 0%, rgba(232,223,208,0.0) 6%,
          rgba(232,223,208,0.50) 24%, rgba(232,223,208,0.82) 50%,
          rgba(232,223,208,0.50) 76%, rgba(232,223,208,0.0) 94%, transparent 100%);
        animation: nier2b-hud-pulse 7s ease-in-out infinite 3.5s;
      }
      @keyframes nier2b-hud-pulse {
        0%,100% { opacity: 0.40; }
        50%     { opacity: 1.00; }
      }

      /* Card hover */
      .nier2b-root .hov-card:hover {
        box-shadow:
          0 0 0 1px rgba(232,223,208,0.75),
          0 0 22px rgba(232,223,208,0.08),
          0 0 55px rgba(232,223,208,0.03),
          0 8px 42px rgba(0,0,0,0.96) !important;
        border-color: rgba(232,223,208,0.75) !important;
        transform: translateY(-3px) !important;
        filter: brightness(1.06);
      }

      /* Input / select focus */
      .nier2b-root input:focus,
      .nier2b-root select:focus,
      .nier2b-root textarea:focus {
        border-color: rgba(232,223,208,0.65) !important;
        box-shadow: 0 0 0 2px rgba(232,223,208,0.08), 0 0 14px rgba(232,223,208,0.14) !important;
        outline: none;
      }

      /* Button hover */
      .nier2b-root .hov-btn:hover {
        opacity: 1 !important;
        text-shadow: 0 0 10px rgba(232,223,208,0.90), 0 0 28px rgba(232,223,208,0.38);
        filter: brightness(1.12);
      }

      /* Chip toggles */
      .nier2b-root .chip-toggle:hover {
        opacity: 1 !important;
        box-shadow: 0 0 12px rgba(232,223,208,0.14) !important;
        border-color: rgba(232,223,208,0.52) !important;
      }

      /* YoRHa heading glow */
      .nier2b-root .nier2b-glow-text {
        text-shadow: 0 0 16px rgba(232,223,208,0.62), 0 0 42px rgba(232,223,208,0.18);
        letter-spacing: 0.20em;
      }

      /* ── Dice: rolling glitch ── */
      @keyframes nier2b-roll-glitch {
        0%,100% { transform: skewX(0deg); filter: brightness(1); color: #e8dfd0; }
        20%     { transform: skewX(-5deg) scaleX(1.04); filter: brightness(1.7); color: #f0ece6; }
        40%     { transform: skewX(3deg); filter: brightness(0.65); color: #9c9488; }
        60%     { transform: skewX(-2deg) scaleX(0.96); filter: brightness(1.35); color: #e8dfd0; }
        80%     { transform: skewX(4deg) scaleX(1.02); filter: brightness(0.88); }
      }
      .dice-rolling-nier2b { animation: nier2b-roll-glitch 0.12s steps(1) infinite; }

      /* ── Dice: data-compile reveal ── */
      @keyframes nier2b-result-in {
        0%  { opacity: 0; transform: scaleY(0.15) scaleX(1.25); filter: brightness(3.5) blur(5px); }
        40% { opacity: 1; transform: scaleY(1.07) scaleX(0.97); filter: brightness(1.5) blur(0); }
        70% { transform: scaleY(0.97) scaleX(1.01); }
        100%{ transform: scaleY(1) scaleX(1); filter: brightness(1); }
      }
      .dice-result-nier2b { animation: nier2b-result-in 0.40s ease-out forwards; }

      /* ── Dice: data fragment particles ── */
      @keyframes dice-nier2b-fly {
        0%   { transform: translate(-50%,-50%) scale(1) rotate(0deg); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.3) rotate(90deg); opacity: 0; }
      }
      .dice-particle-nier2b { animation: dice-nier2b-fly 0.65s ease-out forwards; font-weight: 700; }

      /* ── Dice: scanline glitch overlay ── */
      @keyframes nier2b-dice-flicker {
        0%,100% { opacity: 0; }
        10%,30%,50%,70% { opacity: 0.09; }
        20%,40%,60%,80% { opacity: 0; }
      }
      .dice-nier2b-glitch-overlay {
        background: repeating-linear-gradient(
          0deg, transparent, transparent 2px,
          rgba(232,223,208,0.10) 2px, rgba(232,223,208,0.10) 4px
        );
        animation: nier2b-dice-flicker 0.12s steps(1) infinite;
      }

      /* ══════════════════════════════════════
         ── NieR:Automata A2  "Rogue Unit" ──
         ══════════════════════════════════════ */
      .a2-root {
        font-family: 'Rajdhani', 'Segoe UI', sans-serif !important;
        letter-spacing: 0.06em;
      }
      .a2-root input,
      .a2-root select,
      .a2-root textarea,
      .a2-root button {
        font-family: 'Rajdhani', 'Segoe UI', sans-serif !important;
      }
      .a2-root::-webkit-scrollbar { width: 4px; }
      .a2-root::-webkit-scrollbar-track { background: #eae5dc; }
      .a2-root::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #cdc7ba, #7a4f2666, #cdc7ba);
        border-radius: 2px;
      }

      /* ── Warm edge vignette ── */
      .a2-vignette {
        position: fixed; inset: 0;
        background: radial-gradient(ellipse 85% 85% at 50% 50%,
          transparent 28%, rgba(140,100,50,0.06) 58%, rgba(100,70,30,0.22) 100%);
        pointer-events: none; z-index: 1;
      }

      /* ── Grain / noise overlay ── */
      .a2-noise {
        position: fixed; inset: 0;
        pointer-events: none; z-index: 9999;
        opacity: 0.038;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 180px 180px;
      }

      /* ── Horizontal wind / sand streaks ── */
      .a2-wind {
        position: fixed; inset: 0;
        pointer-events: none; z-index: 0; overflow: hidden;
      }
      .a2-wind::before {
        content: '';
        position: absolute; top: 0; left: -60%; right: -60%; bottom: 0;
        background: repeating-linear-gradient(
          180deg,
          transparent 0px, transparent 18px,
          rgba(122,79,38,0.028) 18px, rgba(122,79,38,0.028) 19px,
          transparent 19px, transparent 34px,
          rgba(160,110,55,0.018) 34px, rgba(160,110,55,0.018) 35px,
          transparent 35px, transparent 58px,
          rgba(122,79,38,0.022) 58px, rgba(122,79,38,0.022) 59px
        );
        animation: a2-wind-drift 9s linear infinite;
      }
      .a2-wind::after {
        content: '';
        position: absolute; top: 0; left: -60%; right: -60%; bottom: 0;
        background: repeating-linear-gradient(
          180deg,
          transparent 0px, transparent 28px,
          rgba(140,90,40,0.016) 28px, rgba(140,90,40,0.016) 29px,
          transparent 29px, transparent 52px,
          rgba(122,79,38,0.020) 52px, rgba(122,79,38,0.020) 53px,
          transparent 53px, transparent 80px,
          rgba(100,68,30,0.014) 80px, rgba(100,68,30,0.014) 81px
        );
        animation: a2-wind-drift 14s linear infinite reverse 4s;
      }
      @keyframes a2-wind-drift {
        from { transform: translateX(0); }
        to   { transform: translateX(12%); }
      }

      /* ── Floating dust motes ── */
      .a2-dust {
        position: fixed; top: 0; left: 0;
        width: 2px; height: 2px;
        background: rgba(122,79,38,0.45);
        pointer-events: none; z-index: 0;
        animation: a2-dust-drift 28s ease-in-out infinite;
        box-shadow:
           120px  180px 0 1px   rgba(122,79,38,0.20),
           310px   72px 0 1.5px rgba(140,100,50,0.16),
           540px  290px 0 1px   rgba(122,79,38,0.22),
           780px  125px 0 1px   rgba(160,110,55,0.14),
          1020px  455px 0 1.5px rgba(122,79,38,0.18),
          1260px  210px 0 1px   rgba(140,90,40,0.16),
          1490px   82px 0 1.5px rgba(122,79,38,0.20),
          1740px  365px 0 1px   rgba(100,68,30,0.13),
           170px  520px 0 1.5px rgba(122,79,38,0.12),
           410px  680px 0 1px   rgba(140,100,50,0.15),
           680px  590px 0 1.5px rgba(122,79,38,0.11),
           930px  730px 0 1px   rgba(160,110,55,0.14),
          1200px  650px 0 1.5px rgba(122,79,38,0.12),
          1430px  770px 0 1px   rgba(100,68,30,0.10),
          1670px  520px 0 1.5px rgba(122,79,38,0.15),
           240px  420px 0 1px   rgba(140,80,30,0.18),
           650px  250px 0 1px   rgba(122,79,38,0.14),
          1090px  345px 0 1px   rgba(160,110,55,0.16),
          1500px  480px 0 1px   rgba(122,79,38,0.12),
            75px  840px 0 1.5px rgba(140,90,40,0.09),
           490px  900px 0 1px   rgba(122,79,38,0.10),
           890px  860px 0 1.5px rgba(100,68,30,0.08),
          1290px  815px 0 1px   rgba(122,79,38,0.11),
          1690px  875px 0 1.5px rgba(140,100,50,0.08);
      }
      @keyframes a2-dust-drift {
        0%,100% { opacity: 0.55; transform: translate(0, 0); }
        25%     { opacity: 0.90; transform: translate(6px, -5px); }
        50%     { opacity: 0.70; transform: translate(12px, 2px); }
        75%     { opacity: 0.85; transform: translate(5px, -8px); }
      }

      /* ── Battle-damaged core ornament (lower-right) ── */
      .a2-core {
        position: fixed; bottom: 72px; right: 22px;
        width: 96px; height: 96px;
        pointer-events: none; z-index: 0;
      }
      /* Outer broken ring — dashed */
      .a2-core::before {
        content: '';
        position: absolute; inset: 0;
        border-radius: 50%;
        border: 1px dashed rgba(122,79,38,0.35);
        box-shadow:
          0 0 0 8px rgba(122,79,38,0.03),
          inset 0 0 20px rgba(122,79,38,0.04);
        animation: a2-spin-slow 55s linear infinite reverse;
      }
      /* Inner tilted square — battle-scarred */
      .a2-core::after {
        content: '';
        position: absolute; top: 50%; left: 50%;
        width: 34px; height: 34px;
        margin-top: -17px; margin-left: -17px;
        border: 1px solid rgba(122,79,38,0.42);
        border-top-color: rgba(140,26,26,0.55);
        box-shadow:
          0 0 10px rgba(122,79,38,0.08),
          inset 0 0 6px rgba(122,79,38,0.05);
        animation: a2-inner-spin 28s linear infinite;
      }
      @keyframes a2-spin-slow { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
      @keyframes a2-inner-spin { from { transform: rotate(12deg); } to { transform: rotate(372deg); } }

      /* ── Worn HUD frame bars ── */
      .a2-hud {
        position: fixed; inset: 0; pointer-events: none; z-index: 9998;
      }
      .a2-hud::before {
        content: '';
        position: absolute; top: 0; left: 0; right: 0; height: 2px;
        background: linear-gradient(90deg,
          transparent 0%, rgba(122,79,38,0.0) 8%,
          rgba(122,79,38,0.55) 30%, rgba(122,79,38,0.80) 50%,
          rgba(122,79,38,0.55) 70%, rgba(122,79,38,0.0) 92%, transparent 100%);
        animation: a2-hud-flicker 11s ease-in-out infinite;
      }
      .a2-hud::after {
        content: '';
        position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
        background: linear-gradient(90deg,
          transparent 0%, rgba(122,79,38,0.0) 8%,
          rgba(122,79,38,0.55) 30%, rgba(122,79,38,0.80) 50%,
          rgba(122,79,38,0.55) 70%, rgba(122,79,38,0.0) 92%, transparent 100%);
        animation: a2-hud-flicker 11s ease-in-out infinite 5.5s;
      }
      @keyframes a2-hud-flicker {
        0%,100% { opacity: 0.35; }
        18%     { opacity: 0.90; }
        22%     { opacity: 0.55; }
        24%     { opacity: 0.95; }
        50%     { opacity: 0.65; }
      }

      /* Card hover */
      .a2-root .hov-card:hover {
        box-shadow:
          0 0 0 1px rgba(122,79,38,0.70),
          0 0 18px rgba(122,79,38,0.10),
          0 8px 32px rgba(100,70,30,0.18) !important;
        border-color: rgba(122,79,38,0.70) !important;
        transform: translateY(-3px) !important;
        filter: brightness(0.97);
      }

      /* Input / select focus */
      .a2-root input:focus,
      .a2-root select:focus,
      .a2-root textarea:focus {
        border-color: rgba(122,79,38,0.65) !important;
        box-shadow: 0 0 0 2px rgba(122,79,38,0.10), 0 0 10px rgba(122,79,38,0.12) !important;
        outline: none;
      }

      /* Button hover */
      .a2-root .hov-btn:hover {
        opacity: 1 !important;
        text-shadow: 0 0 8px rgba(122,79,38,0.55), 0 0 20px rgba(122,79,38,0.25);
        filter: brightness(0.92);
      }

      /* Chip toggles */
      .a2-root .chip-toggle:hover {
        opacity: 1 !important;
        box-shadow: 0 0 10px rgba(122,79,38,0.14) !important;
        border-color: rgba(122,79,38,0.50) !important;
      }

      /* A2 heading accent */
      .a2-root .a2-glow-text {
        text-shadow: 0 1px 4px rgba(122,79,38,0.35), 0 0 20px rgba(122,79,38,0.12);
        letter-spacing: 0.18em;
      }

      /* ── Dice: roll glitch (warm) ── */
      @keyframes a2-roll-glitch {
        0%,100% { transform: skewX(0deg);   filter: brightness(1);    color: #7a4f26; }
        20%     { transform: skewX(-4deg) scaleX(1.03); filter: brightness(0.7); color: #5a3b1c; }
        40%     { transform: skewX(3deg);   filter: brightness(1.25); color: #8c1a1a; }
        60%     { transform: skewX(-2deg) scaleX(0.97); filter: brightness(0.85); color: #7a4f26; }
        80%     { transform: skewX(3deg) scaleX(1.02); filter: brightness(1.1); }
      }
      .dice-rolling-a2 { animation: a2-roll-glitch 0.14s steps(1) infinite; }

      /* ── Dice: result stamp-in ── */
      @keyframes a2-result-in {
        0%  { opacity: 0; transform: scale(1.4) rotate(-3deg); filter: blur(4px); }
        40% { opacity: 1; transform: scale(0.96) rotate(1deg); filter: blur(0); }
        70% { transform: scale(1.02) rotate(-0.5deg); }
        100%{ transform: scale(1) rotate(0deg); }
      }
      .dice-result-a2 { animation: a2-result-in 0.35s ease-out forwards; }

      /* ── Dice: dust fragment particles ── */
      @keyframes dice-a2-fly {
        0%   { transform: translate(-50%,-50%) scale(1) rotate(0deg); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.2) rotate(120deg); opacity: 0; }
      }
      .dice-particle-a2 { animation: dice-a2-fly 0.55s ease-out forwards; font-weight: 700; }

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

      /* ══════════════════════════════════════════════════════
         ── Kasane Teto  "UTAU Chimera — Drill Your Soul" ──
         ══════════════════════════════════════════════════════ */

      /* Root font */
      .teto-root { font-family: 'Exo 2', 'Segoe UI', sans-serif !important; }
      .teto-root input, .teto-root select, .teto-root textarea, .teto-root button {
        font-family: 'Exo 2', 'Segoe UI', sans-serif !important;
      }
      .teto-root::-webkit-scrollbar-thumb { background: rgba(255,34,68,0.35); }

      /* ─── NEW TECHNIQUE 1: mix-blend-mode: screen on glow corona ─── */
      /* Creates additive light blending — the crimson bleeds into everything above it */
      .teto-glow {
        position: fixed; inset: 0; z-index: 0; pointer-events: none;
        background:
          radial-gradient(ellipse 65% 45% at 50% -2%, rgba(255,34,68,0.32) 0%, transparent 65%),
          radial-gradient(ellipse 45% 35% at -3% 45%, rgba(255,0,68,0.16) 0%, transparent 62%),
          radial-gradient(ellipse 45% 35% at 103% 45%, rgba(255,68,102,0.16) 0%, transparent 62%),
          radial-gradient(ellipse 35% 28% at 50% 103%, rgba(180,0,40,0.22) 0%, transparent 55%);
        mix-blend-mode: screen;
        animation: teto-glow-breathe 7s ease-in-out infinite;
      }
      @keyframes teto-glow-breathe {
        0%, 100% { opacity: 0.70; transform: scale(1); }
        50%       { opacity: 1;    transform: scale(1.05); }
      }

      /* ─── NEW TECHNIQUE 2: conic-gradient() spinning drill spirals ─── */
      /* conic-gradient sweeps color around a center point — zero uses elsewhere */
      .teto-drills {
        position: fixed; inset: 0; z-index: 0; pointer-events: none;
        overflow: hidden;
      }
      /* LEFT drill — Teto's left twin drill */
      .teto-drills::before {
        content: '';
        position: absolute;
        width: 520px; height: 520px; border-radius: 50%;
        top: 50%; left: -185px;
        transform: translateY(-50%);
        background: conic-gradient(
          rgba(255,34,68,0)    0deg,
          rgba(255,34,68,0.26) 38deg,
          rgba(255,34,68,0)    76deg,
          rgba(255,34,68,0)   114deg,
          rgba(255,34,68,0.19) 152deg,
          rgba(255,34,68,0)   190deg,
          rgba(255,34,68,0)   228deg,
          rgba(255,34,68,0.22) 266deg,
          rgba(255,34,68,0)   304deg,
          rgba(255,34,68,0)   342deg,
          rgba(255,34,68,0.14) 360deg
        );
        filter: blur(14px);
        animation: teto-drill-l 5.5s linear infinite;
      }
      /* RIGHT drill — Teto's right twin drill */
      .teto-drills::after {
        content: '';
        position: absolute;
        width: 520px; height: 520px; border-radius: 50%;
        top: 50%; right: -185px;
        transform: translateY(-50%);
        background: conic-gradient(
          rgba(255,102,136,0)    0deg,
          rgba(255,102,136,0.20) 38deg,
          rgba(255,102,136,0)    76deg,
          rgba(255,102,136,0)   114deg,
          rgba(255,102,136,0.15) 152deg,
          rgba(255,102,136,0)   190deg,
          rgba(255,102,136,0)   228deg,
          rgba(255,102,136,0.18) 266deg,
          rgba(255,102,136,0)   304deg,
          rgba(255,102,136,0)   342deg,
          rgba(255,102,136,0.12) 360deg
        );
        filter: blur(14px);
        animation: teto-drill-r 8s linear infinite reverse;
      }
      @keyframes teto-drill-l {
        from { transform: translateY(-50%) rotate(0deg); }
        to   { transform: translateY(-50%) rotate(360deg); }
      }
      @keyframes teto-drill-r {
        from { transform: translateY(-50%) rotate(0deg); }
        to   { transform: translateY(-50%) rotate(360deg); }
      }

      /* ─── NEW TECHNIQUE 3: perspective() + rotateX for 3D grid floor ─── */
      /* CSS 3D transforms on a flat gradient — creates a receding grid into the horizon */
      .teto-grid {
        position: fixed; bottom: 0; left: -15%; right: -15%;
        height: 48vh; z-index: 0; pointer-events: none; overflow: hidden;
      }
      .teto-grid::before {
        content: '';
        position: absolute; inset: -40% 0 0;
        background:
          repeating-linear-gradient(90deg,
            rgba(255,34,68,0.26) 0px, transparent 1px, transparent 80px),
          repeating-linear-gradient(0deg,
            rgba(255,34,68,0.26) 0px, transparent 1px, transparent 80px);
        transform: perspective(380px) rotateX(74deg);
        transform-origin: 50% 100%;
        animation: teto-grid-scroll 5s linear infinite;
      }
      /* Fade-out gradient so grid dissolves into the scene */
      .teto-grid::after {
        content: '';
        position: absolute; bottom: 0; left: 0; right: 0; height: 65%;
        background: linear-gradient(0deg, #0e0006 0%, transparent 100%);
      }
      @keyframes teto-grid-scroll {
        from { background-position: 0 0; }
        to   { background-position: 0 80px; }
      }

      /* ─── NEW TECHNIQUE 4: SVG data-URI background tile for musical notes ─── */
      /* Encodes actual ♪♫ glyphs into an SVG, tiles them, and drifts diagonally */
      /* Completely unlike any particle approach used elsewhere */
      .teto-notes {
        position: fixed; inset: 0; z-index: 0; pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Ctext x='14'  y='72'  font-size='22' fill='rgba(255%2C34%2C68%2C0.28)'%3E%E2%99%AA%3C/text%3E%3Ctext x='148' y='158' font-size='15' fill='rgba(255%2C102%2C136%2C0.22)'%3E%E2%99%AB%3C/text%3E%3Ctext x='72'  y='210' font-size='11' fill='rgba(255%2C34%2C68%2C0.16)'%3E%E2%99%AA%3C/text%3E%3Ctext x='188' y='38'  font-size='13' fill='rgba(255%2C68%2C102%2C0.20)'%3E%E2%99%AB%3C/text%3E%3Ctext x='32'  y='168' font-size='9'  fill='rgba(255%2C34%2C68%2C0.12)'%3E%E2%99%AA%3C/text%3E%3C/svg%3E");
        background-repeat: repeat;
        animation: teto-notes-drift 30s linear infinite;
      }
      @keyframes teto-notes-drift {
        from { background-position: 0 0; }
        to   { background-position: -240px -240px; }
      }

      /* ─── Diagonal scan band ─── */
      /* Unlike all existing scanlines (0°), this sweeps at –22° across the whole screen */
      .teto-scanband {
        position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
      }
      .teto-scanband::before {
        content: '';
        position: absolute; left: -100%; top: -5%;
        width: 300%; height: 2px;
        background: linear-gradient(90deg,
          transparent 0%, rgba(255,34,68,0) 15%,
          rgba(255,34,68,0.92) 45%, rgba(255,170,180,0.75) 50%,
          rgba(255,34,68,0.92) 55%, rgba(255,34,68,0) 85%, transparent 100%);
        transform: rotate(-22deg);
        transform-origin: center;
        filter: blur(0.6px);
        animation: teto-scan-sweep 12s ease-in-out infinite;
      }
      .teto-scanband::after {
        content: '';
        position: absolute; left: -100%; top: -5%;
        width: 300%; height: 1px;
        background: linear-gradient(90deg,
          transparent 0%, rgba(255,255,255,0) 20%,
          rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.90) 50%,
          rgba(255,255,255,0.65) 52%, rgba(255,255,255,0) 80%, transparent 100%);
        transform: rotate(-22deg);
        transform-origin: center;
        animation: teto-scan-sweep 12s ease-in-out infinite;
        animation-delay: 0.06s;
      }
      @keyframes teto-scan-sweep {
        0%   { top: -30%; opacity: 0; }
        8%   { opacity: 1; }
        92%  { opacity: 0.85; }
        100% { top: 130%; opacity: 0; }
      }

      /* ─── Shimmer sparks ─── */
      .teto-shimmer { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
      .teto-shimmer::before {
        content: ''; position: absolute; inset: 0;
        background-image:
          radial-gradient(circle 2px at  8% 14%, rgba(255,255,255,0.80) 0%, transparent 100%),
          radial-gradient(circle 1px at 21% 73%, rgba(255,68,102,0.85)  0%, transparent 100%),
          radial-gradient(circle 2px at 37% 41%, rgba(255,255,255,0.58) 0%, transparent 100%),
          radial-gradient(circle 1px at 53% 17%, rgba(255,34,68,0.75)   0%, transparent 100%),
          radial-gradient(circle 2px at 66% 87%, rgba(255,255,255,0.62) 0%, transparent 100%),
          radial-gradient(circle 1px at 80% 37%, rgba(255,102,136,0.78) 0%, transparent 100%),
          radial-gradient(circle 2px at 92% 61%, rgba(255,255,255,0.52) 0%, transparent 100%),
          radial-gradient(circle 1px at 14% 56%, rgba(255,34,68,0.68)   0%, transparent 100%),
          radial-gradient(circle 2px at 46% 94%, rgba(255,255,255,0.48) 0%, transparent 100%),
          radial-gradient(circle 1px at 74% 26%, rgba(255,68,102,0.72)  0%, transparent 100%),
          radial-gradient(circle 2px at 31% 88%, rgba(255,255,255,0.55) 0%, transparent 100%),
          radial-gradient(circle 1px at 62% 50%, rgba(255,34,68,0.60)   0%, transparent 100%);
        animation: teto-shimmer-pulse 4.5s ease-in-out infinite alternate;
      }
      @keyframes teto-shimmer-pulse {
        0%   { opacity: 0.22; }
        100% { opacity: 1; }
      }

      /* ─── Interaction styles ─── */
      .teto-root .hov-card:hover {
        box-shadow:
          0 0 0 1px rgba(255,34,68,0.75),
          0 0 30px rgba(255,34,68,0.38),
          0 12px 48px rgba(0,0,0,0.92) !important;
        border-color: rgba(255,34,68,0.75) !important;
        transform: translateY(-4px) !important;
      }
      .teto-root input:focus, .teto-root select:focus, .teto-root textarea:focus {
        border-color: rgba(255,34,68,0.72) !important;
        box-shadow: 0 0 0 2px rgba(255,34,68,0.15), 0 0 20px rgba(255,34,68,0.42) !important;
      }
      .teto-root .hov-btn:hover {
        color: #ff2244 !important;
        text-shadow: 0 0 10px rgba(255,34,68,0.62) !important;
      }
      .teto-root .chip-active {
        border-color: rgba(255,34,68,0.55) !important;
        background: rgba(255,34,68,0.10) !important;
        box-shadow: 0 0 12px rgba(255,34,68,0.26) !important;
      }

      /* ─── Keyframes for Roster components ─── */
      @keyframes teto-spin-cw  { to { transform: rotate(360deg); } }
      @keyframes teto-spin-ccw { to { transform: rotate(-360deg); } }
      @keyframes teto-note-bob {
        0%, 100% { transform: translateY(0) rotate(-10deg); }
        50%       { transform: translateY(-7px) rotate(10deg); }
      }
      @keyframes teto-border-pulse {
        0%, 100% { box-shadow: 0 0 0 1px rgba(255,34,68,0.40), 0 0 14px rgba(255,34,68,0.22); }
        50%       { box-shadow: 0 0 0 1px rgba(255,34,68,0.85), 0 0 28px rgba(255,34,68,0.48); }
      }

      /* ─── Dice ─── */
      @keyframes dice-rolling-teto {
        0%   { transform: perspective(200px) rotateX(0deg)   rotateY(0deg)   rotateZ(0deg)   scale(0.9); }
        25%  { transform: perspective(200px) rotateX(180deg) rotateY(90deg)  rotateZ(45deg)  scale(1.1); }
        50%  { transform: perspective(200px) rotateX(360deg) rotateY(180deg) rotateZ(90deg)  scale(0.95); }
        75%  { transform: perspective(200px) rotateX(540deg) rotateY(270deg) rotateZ(135deg) scale(1.05); }
        100% { transform: perspective(200px) rotateX(720deg) rotateY(360deg) rotateZ(180deg) scale(1); }
      }
      @keyframes dice-result-teto {
        0%   { transform: scale(0.4) rotate(-20deg); opacity: 0; }
        55%  { transform: scale(1.22) rotate(5deg);  opacity: 1; }
        78%  { transform: scale(0.94) rotate(-2deg); }
        100% { transform: scale(1)    rotate(0deg);  opacity: 1; }
      }
      @keyframes dice-particle-teto {
        0%   { transform: translate(0,0) scale(1); opacity: 0.9; }
        100% { transform: translate(var(--dx),var(--dy)) scale(0); opacity: 0; }
      }
    `}</style>
  )
}
