import React, { useState, useRef, useEffect } from 'react'
import { useT, THEMES } from '../themes.js'
import { VcrClock } from './VcrClock.jsx'

function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

export function Sidebar({ view, setView, themeKey, setThemeKey, chars, onCreate, onImport }) {
  const C = useT()
  const isVcr      = themeKey === 'vcr'
  const isRacing   = themeKey === 'racing'
  const isKuromi   = themeKey === 'kuromi'
  const isMyMelody = themeKey === 'mymelody'
  const isMoon     = themeKey === 'moon'
  const isSakura   = themeKey === 'sakura'
  const isNier2b   = themeKey === 'nier2b'
  const isA2       = themeKey === 'a2'
  const isTeto     = themeKey === 'teto'

  const [themeOpen, setThemeOpen] = useState(false)
  const themeRef   = useRef(null)
  const importRef  = useRef(null)

  useEffect(() => {
    if (!themeOpen) return
    const handle = e => { if (themeRef.current && !themeRef.current.contains(e.target)) setThemeOpen(false) }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [themeOpen])

  const handleImportFile = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result)
        onImport(Array.isArray(parsed) ? parsed : [parsed])
      } catch { alert('Invalid JSON file.') }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  /* nav item helper */
  const navItem = (id, icon, label, badge) => {
    const active = id === 'roster'
      ? (view === 'roster' || view === 'create' || view === 'sheet')
      : view === id
    return (
      <button key={id} className="sidebar-nav-item" onClick={() => setView(id)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', padding: '9px 14px', marginBottom: 2,
          background: active ? `${C.gold}18` : 'transparent',
          border: 'none', borderLeft: `2px solid ${active ? C.gold : 'transparent'}`,
          borderRadius: '0 6px 6px 0',
          color: active ? C.gold : C.textDim,
          cursor: 'pointer', fontSize: 13, textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 15, lineHeight: 1 }}>{icon}</span>
        <span style={{ flex: 1 }}>{label}</span>
        {badge > 0 && (
          <span style={{ fontSize: 10, background: `${C.gold}28`, color: C.gold, borderRadius: 10, padding: '1px 7px', fontWeight: 700 }}>
            {badge}
          </span>
        )}
      </button>
    )
  }

  /* new-char button label + style per theme */
  const newLabel = isVcr ? '> NEW_CHAR.EXE'
    : isRacing   ? '✦ New Character'
    : isKuromi   ? '★ Summon'
    : isMyMelody ? '♡ New Character'
    : isNier2b   ? '◈ Deploy Unit'
    : isA2       ? '◈ Deploy Unit'
    : isTeto     ? '♪ Enlist Chimera'
    : '+ New Character'

  const newStyle = isNier2b ? { border: '1px solid rgba(232,223,208,0.40)', background: 'rgba(232,223,208,0.06)', color: '#e8dfd0', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase' }
    : isA2    ? { border: '1px solid rgba(122,79,38,0.40)', background: 'rgba(122,79,38,0.08)', color: '#7a4f26', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase' }
    : isTeto  ? { border: '1px solid rgba(255,34,68,0.42)', background: 'rgba(255,34,68,0.08)', color: '#ff2244', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase', animation: 'teto-border-pulse 3s ease-in-out infinite' }
    : { background: `${C.gold}18`, border: `1px solid ${C.gold}44`, color: C.gold, fontSize: 12 }

  return (
    <aside className="app-sidebar" style={{ background: C.surface, borderRight: `1px solid ${C.border}`, zIndex: 100 }}>

      {/* ── Brand ── */}
      <div style={{ padding: '18px 16px 14px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <BrandMark themeKey={themeKey} C={C} />
      </div>

      {/* ── Nav + Actions ── */}
      <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {navItem('home',   '⌂', 'Home',       null)}
        {navItem('roster', '♟', 'Characters', chars.length || null)}
        {navItem('wiki',   '📖', 'Wiki',      null)}

        {/* New character CTA */}
        <div style={{ margin: '8px 12px 4px' }}>
          <button className="sidebar-nav-item" onClick={onCreate}
            style={{
              width: '100%', padding: '8px 12px', cursor: 'pointer',
              borderRadius: 6, fontWeight: 600, display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 6,
              fontFamily: isNier2b || isA2 ? "'Rajdhani',sans-serif" : isTeto ? "'Exo 2',sans-serif" : 'inherit',
              ...newStyle,
            }}
          >{newLabel}</button>
        </div>

        {/* Theme-specific status widget */}
        {(isVcr || isRacing || isNier2b || isA2 || isTeto) && (
          <div style={{ margin: '8px 14px 0', padding: '10px 0', borderTop: `1px solid ${C.border}44` }}>
            {isVcr    && <VcrClock />}
            {isRacing && <RacingStatus C={C} />}
            {isNier2b && <Nier2bStatus />}
            {isA2     && <A2Status />}
            {isTeto   && <TetoStatus />}
          </div>
        )}
      </nav>

      {/* ── Bottom controls ── */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: '12px 14px', flexShrink: 0 }}>
        {/* Theme selector */}
        <div ref={themeRef} style={{ position: 'relative', marginBottom: 8 }}>
          <button className="sidebar-nav-item" onClick={() => setThemeOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7, width: '100%',
              background: C.card, border: `1px solid ${themeOpen ? C.gold : C.border}`,
              padding: '7px 11px', borderRadius: 6, cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: C.gold, flexShrink: 0, boxShadow: `0 0 7px ${C.gold}` }} />
            <span style={{ fontSize: 11, color: C.textDim, flex: 1, letterSpacing: 1, userSelect: 'none' }}>Theme</span>
            <span style={{ fontSize: 9, color: C.textMuted, display: 'inline-block', transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)', transform: themeOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
          </button>

          {themeOpen && (
            <div className="theme-dropdown" style={{
              position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, right: 0,
              background: C.surface, border: `1px solid ${C.border}`,
              zIndex: 9999, borderRadius: 6, overflow: 'hidden',
              boxShadow: `0 -14px 44px rgba(0,0,0,0.50), 0 0 0 1px ${C.border}`,
              transformOrigin: 'bottom center',
            }}>
              <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
              {Object.entries(THEMES).map(([k, t], i, arr) => {
                const active = k === themeKey
                const isLast = i === arr.length - 1
                const afterDark = k === 'dark'
                return (
                  <React.Fragment key={k}>
                    <button className="sidebar-nav-item" onClick={() => { setThemeKey(k); setThemeOpen(false) }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%', padding: '8px 12px',
                        background: active ? `${t.gold}14` : 'transparent',
                        border: 'none',
                        borderBottom: !isLast && !afterDark ? `1px solid ${C.border}44` : 'none',
                        color: active ? t.gold : C.textDim,
                        cursor: 'pointer', fontSize: 12, textAlign: 'left',
                      }}
                    >
                      <span style={{ width: 12, height: 12, borderRadius: '50%', background: t.gold, flexShrink: 0, boxShadow: active ? `0 0 8px ${t.gold}` : 'none', outline: active ? `2px solid ${t.gold}55` : '2px solid transparent', outlineOffset: 2, transition: 'box-shadow 0.15s, outline 0.15s' }} />
                      <span style={{ flex: 1, letterSpacing: 0.5 }}>{t.name}</span>
                      {active && <span style={{ fontSize: 10, opacity: 0.7 }}>✓</span>}
                    </button>
                    {afterDark && (
                      <div style={{ borderTop: `1px solid ${C.border}`, padding: '3px 12px 2px' }}>
                        <span style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase' }}>Themes</span>
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          )}
        </div>

        {/* File actions */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          <input type="file" accept=".json" style={{ display: 'none' }} ref={importRef} onChange={handleImportFile} />
          <button className="sidebar-nav-item" onClick={() => importRef.current.click()}
            style={{ flex: 1, padding: '6px 0', fontSize: 11, background: 'transparent', border: `1px solid ${C.border}`, color: C.textDim, borderRadius: 4, cursor: 'pointer', textAlign: 'center' }}>
            ↑ Import
          </button>
          {chars.length > 0 && (
            <button className="sidebar-nav-item" onClick={() => downloadJson(chars, 'dnd-characters.json')}
              style={{ flex: 1, padding: '6px 0', fontSize: 11, background: 'transparent', border: `1px solid ${C.border}`, color: C.textDim, borderRadius: 4, cursor: 'pointer', textAlign: 'center' }}>
              ↓ Export
            </button>
          )}
        </div>

        <div style={{ fontSize: 9, color: C.textMuted, textAlign: 'center', letterSpacing: 1 }}>
          ⚔ D&D 2024 · saved locally
        </div>
      </div>
    </aside>
  )
}

/* ── Brand mark per theme ── */
function BrandMark({ themeKey, C }) {
  const isVcr    = themeKey === 'vcr'
  const isRacing = themeKey === 'racing'
  const isKuromi = themeKey === 'kuromi'
  const isMoon   = themeKey === 'moon'
  const isSakura = themeKey === 'sakura'
  const isNier2b = themeKey === 'nier2b'
  const isA2     = themeKey === 'a2'
  const isTeto   = themeKey === 'teto'
  const isMyMelody = themeKey === 'mymelody'

  const subtitle = isVcr ? 'CHARACTER MANAGER // v2.4.1'
    : isRacing   ? 'Racing Miku — Registry'
    : isKuromi   ? 'Dark Magic Registry'
    : isMyMelody ? 'Sweet Adventure Registry'
    : isMoon     ? '月夜 — Cosmic Registry'
    : isSakura   ? 'Sakura — Character Registry'
    : isNier2b   ? 'Unit Registry // YoRHa'
    : isA2       ? 'Unit Registry // Field Ops'
    : isTeto     ? 'Chimera Registry // UTAU'
    : 'CHARACTER MANAGER'

  /* theme-specific accent stripe color */
  const stripeColor = isRacing ? 'linear-gradient(180deg,#ff4fa3,#00e5cc)'
    : isKuromi   ? 'linear-gradient(180deg,#c840ff,#8a18cc)'
    : isMyMelody ? 'linear-gradient(180deg,#ff6b9d,#d82858)'
    : isTeto     ? 'linear-gradient(180deg,#ff2244,#cc1133,#ff2244)'
    : `linear-gradient(180deg,${C.gold},${C.goldDim})`

  const titleFont = isVcr || isKuromi ? "'Orbitron','Share Tech Mono',monospace"
    : isRacing || isNier2b || isA2 ? "'Rajdhani',sans-serif"
    : isMoon     ? "'Cinzel','Georgia',serif"
    : isMyMelody ? "'Nunito',sans-serif"
    : isTeto     ? "'Exo 2',sans-serif"
    : 'inherit'

  return (
    <div style={{ position: 'relative', paddingLeft: 14 }}>
      {/* Left accent stripe */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: stripeColor, borderRadius: 2, boxShadow: `0 0 10px ${C.gold}55` }} />

      {/* Emblem */}
      {isNier2b && (
        <div style={{ position: 'relative', width: 36, height: 36, marginBottom: 8 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(232,223,208,0.28)', animation: 'nier2b-spin-cw 24s linear infinite' }} />
          <div style={{ position: 'absolute', inset: 7, borderRadius: '50%', border: '1px solid rgba(232,223,208,0.16)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: 8, height: 8, marginTop: -4, marginLeft: -4, border: '1px solid rgba(232,223,208,0.65)', transform: 'rotate(45deg)', animation: 'nier2b-spin-ccw 14s linear infinite' }} />
        </div>
      )}
      {isA2 && (
        <div style={{ position: 'relative', width: 36, height: 36, marginBottom: 8 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed rgba(122,79,38,0.40)', animation: 'a2-spin-slow 55s linear infinite reverse' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: 10, height: 10, marginTop: -5, marginLeft: -5, border: '1px solid rgba(122,79,38,0.60)', borderTopColor: 'rgba(140,26,26,0.70)', animation: 'a2-inner-spin 28s linear infinite' }} />
        </div>
      )}
      {isTeto && (
        <div style={{ position: 'relative', width: 32, height: 32, marginBottom: 8 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(rgba(255,34,68,0) 0deg,rgba(255,34,68,0.55) 40deg,rgba(255,34,68,0) 80deg,rgba(255,34,68,0) 140deg,rgba(255,34,68,0.45) 180deg,rgba(255,34,68,0) 220deg,rgba(255,34,68,0) 270deg,rgba(255,34,68,0.50) 310deg,rgba(255,34,68,0) 360deg)', animation: 'teto-spin-cw 4s linear infinite', filter: 'blur(2px)' }} />
          <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '1px solid rgba(255,34,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(255,170,180,0.90)', animation: 'teto-note-bob 3s ease-in-out infinite' }}>♪</div>
        </div>
      )}

      {/* Title */}
      <div style={{
        fontSize: isRacing || isNier2b || isA2 ? 17 : isVcr || isKuromi ? 15 : 16,
        fontWeight: isMyMelody ? 800 : 700,
        color: C.gold, lineHeight: 1.1, letterSpacing: isNier2b || isA2 ? 3 : isRacing ? 2 : 0.5,
        fontFamily: titleFont,
        textShadow: C.gold !== '#4f7df4' ? `0 0 16px ${C.gold}44` : 'none',
      }}>
        {isMyMelody ? 'D&D 2024 ♡' : isTeto ? 'D&D 2024 ♪' : 'D&D 2024'}
      </div>
      <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, marginTop: 4, textTransform: 'uppercase', lineHeight: 1.3 }}>
        {subtitle}
      </div>
    </div>
  )
}

/* ── Compact status widgets ── */
function RacingStatus({ C }) {
  const [lap] = useState(() => Math.floor(Math.random() * 40) + 1)
  return (
    <div style={{ fontSize: 10, letterSpacing: 2, color: C.textMuted, textTransform: 'uppercase' }}>
      <span style={{ color: C.gold }}>✦</span> LAP {String(lap).padStart(2,'0')} <span style={{ color: '#ff4fa3' }}>◆ P1</span>
    </div>
  )
}

function Nier2bStatus() {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(232,223,208,0.35)', textTransform: 'uppercase', fontFamily: "'Rajdhani',sans-serif" }}>
      <span style={{ color: 'rgba(232,223,208,0.55)' }}>◈</span> YoRHa <span style={{ color: 'rgba(191,21,40,0.70)' }}>■ OPER.</span> 2B
    </div>
  )
}

function A2Status() {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(122,79,38,0.45)', textTransform: 'uppercase', fontFamily: "'Rajdhani',sans-serif" }}>
      <span style={{ color: 'rgba(122,79,38,0.65)' }}>◈</span> YoRHa <span style={{ color: 'rgba(140,26,26,0.70)' }}>■ ROGUE</span> A2
    </div>
  )
}

function TetoStatus() {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,34,68,0.40)', textTransform: 'uppercase', fontFamily: "'Exo 2',sans-serif" }}>
      <span style={{ display: 'inline-block', animation: 'teto-note-bob 3s ease-in-out infinite', color: 'rgba(255,34,68,0.70)' }}>♪</span> CHIMERA <span style={{ color: 'rgba(255,34,68,0.72)' }}>■ ONLINE</span>
    </div>
  )
}
