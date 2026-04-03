import React, { useState, useRef, useEffect } from 'react'
import { useT, THEMES } from '../themes.js'
import { VcrClock } from './VcrClock.jsx'
import HomeIcon       from '@mui/icons-material/Home'
import GroupIcon      from '@mui/icons-material/Group'
import MenuBookIcon   from '@mui/icons-material/MenuBook'
import FileUploadIcon   from '@mui/icons-material/FileUpload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import CasinoIcon          from '@mui/icons-material/Casino'
import ExpandMoreIcon      from '@mui/icons-material/ExpandMore'
import HistoryIcon         from '@mui/icons-material/History'
import SportsKabaddiIcon   from '@mui/icons-material/SportsKabaddi'
import SkipNextIcon        from '@mui/icons-material/SkipNext'
import PersonAddIcon       from '@mui/icons-material/PersonAdd'
import DeleteIcon          from '@mui/icons-material/Delete'
import AddIcon             from '@mui/icons-material/Add'
import RemoveIcon          from '@mui/icons-material/Remove'
import FavoriteIcon        from '@mui/icons-material/Favorite'
import WhatshotIcon        from '@mui/icons-material/Whatshot'
import LocalHospitalIcon   from '@mui/icons-material/LocalHospital'
import SwapVertIcon        from '@mui/icons-material/SwapVert'
import PeopleAltIcon       from '@mui/icons-material/PeopleAlt'
import { CONDITIONS } from '../data/conditions.js'

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
        {navItem('home',   <HomeIcon fontSize="small" />,      'Home',       null)}
        {navItem('roster', <GroupIcon fontSize="small" />,    'Characters', chars.length || null)}
        {navItem('party',  <PeopleAltIcon fontSize="small" />, 'Party',    chars.length > 0 ? chars.length : null)}
        {navItem('wiki',   <MenuBookIcon fontSize="small" />, 'Wiki',       null)}

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

        {/* ── Combat Tracker ── */}
        <CombatTracker C={C} />

        {/* ── Dice Roller ── */}
        <div style={{ paddingTop: 0 }}>
          <DiceRoller C={C} />
        </div>
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
            style={{ flex: 1, padding: '6px 0', fontSize: 11, background: 'transparent', border: `1px solid ${C.border}`, color: C.textDim, borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <FileUploadIcon style={{ fontSize: 14 }} /> Import
          </button>
          {chars.length > 0 && (
            <button className="sidebar-nav-item" onClick={() => downloadJson(chars, 'dnd-characters.json')}
              style={{ flex: 1, padding: '6px 0', fontSize: 11, background: 'transparent', border: `1px solid ${C.border}`, color: C.textDim, borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <FileDownloadIcon style={{ fontSize: 14 }} /> Export
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

/* ═══════════════════════════════════════════════════════════════════════
   COMBAT TRACKER
═══════════════════════════════════════════════════════════════════════ */
let _nextId = 1
function mkId() { return _nextId++ }

function CombatTracker({ C }) {
  const [open,        setOpen]        = useState(false)
  const [combatants,  setCombatants]  = useState([])
  const [currentIdx,  setCurrentIdx]  = useState(0)
  const [round,       setRound]       = useState(1)
  const [inCombat,    setInCombat]    = useState(false)
  const [addOpen,     setAddOpen]     = useState(false)
  const [newName,     setNewName]     = useState('')
  const [newInit,     setNewInit]     = useState('')
  const [newHp,       setNewHp]       = useState('')
  const [newType,     setNewType]     = useState('pc')
  const [condTarget,  setCondTarget]  = useState(null)  // id of combatant whose conditions panel is open
  const [hpTarget,    setHpTarget]    = useState(null)  // id editing HP delta
  const [hpDelta,     setHpDelta]     = useState('')
  const nameRef = useRef(null)

  const sorted = [...combatants].sort((a, b) => b.init - a.init)
  const activeCombatant = inCombat ? sorted[currentIdx % Math.max(sorted.length, 1)] : null

  function addCombatant() {
    const name = newName.trim() || (newType === 'pc' ? 'Hero' : 'Monster')
    const init = parseInt(newInit) || 0
    const hp   = parseInt(newHp)  || (newType === 'pc' ? 20 : 15)
    setCombatants(prev => [...prev, {
      id: mkId(), name, init, hp, maxHp: hp,
      type: newType, conditions: [], deathSaves: { s: 0, f: 0 },
    }])
    setNewName(''); setNewInit(''); setNewHp('')
    setTimeout(() => nameRef.current?.focus(), 50)
  }

  function remove(id) {
    setCombatants(prev => {
      const next = prev.filter(c => c.id !== id)
      return next
    })
  }

  function nextTurn() {
    setCurrentIdx(prev => {
      const next = (prev + 1) % Math.max(sorted.length, 1)
      if (next === 0) setRound(r => r + 1)
      return next
    })
  }

  function startCombat() {
    if (combatants.length === 0) return
    setCurrentIdx(0); setRound(1); setInCombat(true)
  }

  function endCombat() {
    setInCombat(false); setCurrentIdx(0); setRound(1)
  }

  function applyHp(id, delta) {
    setCombatants(prev => prev.map(c => {
      if (c.id !== id) return c
      const newHp = Math.min(c.maxHp, Math.max(0, c.hp + delta))
      return { ...c, hp: newHp }
    }))
    setHpTarget(null); setHpDelta('')
  }

  function toggleCondition(id, condId) {
    setCombatants(prev => prev.map(c => {
      if (c.id !== id) return c
      const has = c.conditions.includes(condId)
      return { ...c, conditions: has ? c.conditions.filter(x => x !== condId) : [...c.conditions, condId] }
    }))
  }

  function rollInitiative(id) {
    const roll = Math.ceil(Math.random() * 20)
    setCombatants(prev => prev.map(c => c.id === id ? { ...c, init: roll } : c))
  }

  function rollAllInit() {
    setCombatants(prev => prev.map(c => ({ ...c, init: Math.ceil(Math.random() * 20) })))
  }

  function hpBarColor(pct, C) {
    if (pct > 0.6) return '#22c55e'
    if (pct > 0.3) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div style={{ borderTop: `1px solid ${C.border}44` }}>

      {/* ── Header toggle ── */}
      <button onClick={() => setOpen(o => !o)} className="sidebar-nav-item"
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 9,
          padding: '9px 14px',
          background: open ? `${C.gold}0e` : 'transparent',
          border: 'none', borderLeft: `2px solid ${inCombat ? '#ef4444' : open ? C.gold + '99' : 'transparent'}`,
          color: open ? C.gold : C.textDim,
          cursor: 'pointer', fontSize: 13,
          transition: 'color 0.15s, background 0.15s, border-color 0.15s',
        }}>
        <SportsKabaddiIcon style={{ fontSize: 17 }} />
        <span style={{ flex: 1, textAlign: 'left', fontWeight: open ? 600 : 400 }}>Combat</span>
        {inCombat && (
          <span style={{
            fontSize: 9, padding: '2px 6px', borderRadius: 8,
            background: '#ef444420', color: '#ef4444',
            fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase',
            animation: 'teto-border-pulse 1.5s ease-in-out infinite',
          }}>R{round}</span>
        )}
        {!inCombat && combatants.length > 0 && (
          <span style={{ fontSize: 10, color: C.textMuted }}>{combatants.length}</span>
        )}
        <ExpandMoreIcon style={{ fontSize: 15, transition: 'transform 0.18s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {open && (
        <div style={{ padding: '4px 8px 10px' }}>

          {/* ── Combat control bar ── */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {!inCombat ? (
              <button onClick={startCombat} className="sidebar-nav-item"
                disabled={combatants.length === 0}
                style={{
                  flex: 1, padding: '5px 0', fontSize: 10, fontWeight: 700,
                  background: combatants.length ? '#ef444418' : 'transparent',
                  border: `1px solid ${combatants.length ? '#ef444455' : C.border}`,
                  color: combatants.length ? '#ef4444' : C.textMuted,
                  borderRadius: 4, cursor: combatants.length ? 'pointer' : 'default',
                  letterSpacing: 1, textTransform: 'uppercase',
                }}>
                ▶ Start
              </button>
            ) : (
              <>
                <button onClick={nextTurn} className="sidebar-nav-item"
                  style={{
                    flex: 2, padding: '5px 0', fontSize: 10, fontWeight: 700,
                    background: `${C.gold}18`, border: `1px solid ${C.gold}55`,
                    color: C.gold, borderRadius: 4, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
                    letterSpacing: 0.5,
                  }}>
                  <SkipNextIcon style={{ fontSize: 14 }} /> Next Turn
                </button>
                <button onClick={endCombat} className="sidebar-nav-item"
                  style={{
                    flex: 1, padding: '5px 0', fontSize: 10, fontWeight: 700,
                    background: 'transparent', border: `1px solid ${C.border}`,
                    color: C.textMuted, borderRadius: 4, cursor: 'pointer', letterSpacing: 0.5,
                  }}>
                  End
                </button>
              </>
            )}
            <button onClick={rollAllInit} className="sidebar-nav-item" title="Roll all initiatives"
              style={{
                padding: '5px 7px', fontSize: 10,
                background: C.card, border: `1px solid ${C.border}`,
                color: C.textDim, borderRadius: 4, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 2,
              }}>
              <SwapVertIcon style={{ fontSize: 13 }} />
            </button>
          </div>

          {/* ── Combatant list ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 7 }}>
            {sorted.length === 0 && (
              <div style={{ textAlign: 'center', padding: '10px 0', fontSize: 11, color: C.textMuted, opacity: 0.4 }}>
                No combatants yet
              </div>
            )}
            {sorted.map((c, i) => {
              const isActive   = inCombat && i === currentIdx % sorted.length
              const hpPct      = c.maxHp > 0 ? c.hp / c.maxHp : 0
              const hpColor    = hpBarColor(hpPct, C)
              const isDead     = c.hp === 0
              const isCondOpen = condTarget === c.id
              const isHpOpen   = hpTarget   === c.id

              return (
                <div key={c.id} style={{
                  borderRadius: 6, overflow: 'hidden',
                  border: `1px solid ${isActive ? '#ef444466' : C.border}`,
                  background: isActive ? '#ef444408' : C.card,
                  boxShadow: isActive ? '0 0 12px #ef444422' : 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  opacity: isDead ? 0.55 : 1,
                }}>
                  {/* Active pulse stripe */}
                  {isActive && (
                    <div style={{ height: 2, background: 'linear-gradient(90deg,#ef4444,#ef444400)', animation: 'teto-border-pulse 1.5s ease-in-out infinite' }} />
                  )}

                  <div style={{ padding: '6px 8px' }}>
                    {/* Name row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                      {/* Type dot */}
                      <span style={{
                        width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                        background: c.type === 'pc' ? C.gold : '#ef4444',
                        boxShadow: isActive ? `0 0 6px ${c.type === 'pc' ? C.gold : '#ef4444'}` : 'none',
                      }} />
                      <span style={{
                        flex: 1, fontSize: 12, fontWeight: isActive ? 700 : 500,
                        color: isActive ? C.text : C.textDim,
                        textDecoration: isDead ? 'line-through' : 'none',
                      }}>{c.name}</span>

                      {/* Initiative badge — click to reroll */}
                      <button onClick={() => rollInitiative(c.id)} title="Reroll initiative"
                        style={{
                          fontSize: 10, padding: '1px 5px', borderRadius: 3,
                          background: `${C.gold}14`, border: `1px solid ${C.gold}33`,
                          color: C.gold, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                        }}>
                        {c.init}
                      </button>
                      {/* HP toggle */}
                      <button onClick={() => { setHpTarget(isHpOpen ? null : c.id); setHpDelta('') }}
                        style={{
                          background: 'none', border: 'none', padding: 0,
                          cursor: 'pointer', color: hpColor, display: 'flex', alignItems: 'center',
                        }}>
                        <FavoriteIcon style={{ fontSize: 12 }} />
                      </button>
                      {/* Condition toggle */}
                      <button onClick={() => setCondTarget(isCondOpen ? null : c.id)}
                        style={{
                          background: 'none', border: 'none', padding: 0,
                          cursor: 'pointer', color: c.conditions.length ? '#f59e0b' : C.textMuted,
                          fontSize: 10, fontWeight: 700,
                        }}>
                        {c.conditions.length > 0 ? `+${c.conditions.length}` : '✦'}
                      </button>
                      {/* Delete */}
                      <button onClick={() => remove(c.id)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: C.textMuted, display: 'flex', alignItems: 'center', opacity: 0.5 }}>
                        <DeleteIcon style={{ fontSize: 12 }} />
                      </button>
                    </div>

                    {/* HP bar */}
                    <div style={{ height: 4, background: `${C.border}44`, borderRadius: 2, marginBottom: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${hpPct * 100}%`,
                        background: hpColor,
                        transition: 'width 0.3s, background 0.3s',
                        borderRadius: 2,
                      }} />
                    </div>
                    <div style={{ fontSize: 9, color: C.textMuted, textAlign: 'right' }}>
                      {isDead ? <span style={{ color: '#ef4444', fontWeight: 700 }}>DEAD / DOWN</span>
                               : <span>{c.hp} / {c.maxHp}</span>}
                    </div>

                    {/* Active conditions strip */}
                    {c.conditions.length > 0 && !isCondOpen && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
                        {c.conditions.map(cid => {
                          const cond = CONDITIONS.find(x => x.id === cid)
                          return cond ? (
                            <span key={cid} style={{
                              fontSize: 8, padding: '1px 5px', borderRadius: 10,
                              background: `${cond.color}28`, color: cond.color, fontWeight: 700,
                            }}>{cond.label}</span>
                          ) : null
                        })}
                      </div>
                    )}

                    {/* HP edit panel */}
                    {isHpOpen && (
                      <div style={{ marginTop: 6, display: 'flex', gap: 3, alignItems: 'center', padding: '5px 0', borderTop: `1px solid ${C.border}33` }}>
                        <button onClick={() => applyHp(c.id, -Math.abs(parseInt(hpDelta)||1))} className="sidebar-nav-item"
                          style={{ padding: '3px 7px', fontSize: 10, fontWeight: 700, background: '#ef444418', border: `1px solid #ef444455`, color: '#ef4444', borderRadius: 3, cursor: 'pointer', display:'flex', alignItems:'center', gap:2 }}>
                          <WhatshotIcon style={{fontSize:11}} /> Dmg
                        </button>
                        <input
                          value={hpDelta}
                          onChange={e => setHpDelta(e.target.value.replace(/\D/g,''))}
                          onKeyDown={e => { if(e.key==='Enter') applyHp(c.id, Math.abs(parseInt(hpDelta)||1)) }}
                          placeholder="amt"
                          style={{
                            width: 36, padding: '3px 5px', fontSize: 11, textAlign: 'center',
                            background: C.surface, border: `1px solid ${C.border}`,
                            color: C.text, borderRadius: 3, outline: 'none',
                          }}
                        />
                        <button onClick={() => applyHp(c.id, Math.abs(parseInt(hpDelta)||1))} className="sidebar-nav-item"
                          style={{ padding: '3px 7px', fontSize: 10, fontWeight: 700, background: '#22c55e18', border: `1px solid #22c55e55`, color: '#22c55e', borderRadius: 3, cursor: 'pointer', display:'flex', alignItems:'center', gap:2 }}>
                          <LocalHospitalIcon style={{fontSize:11}} /> Heal
                        </button>
                      </div>
                    )}

                    {/* Condition picker panel */}
                    {isCondOpen && (
                      <div style={{ marginTop: 6, padding: '6px 0 2px', borderTop: `1px solid ${C.border}33` }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                          {CONDITIONS.map(cond => {
                            const active = c.conditions.includes(cond.id)
                            return (
                              <button key={cond.id} onClick={() => toggleCondition(c.id, cond.id)}
                                className="sidebar-nav-item"
                                style={{
                                  fontSize: 8, padding: '2px 6px', borderRadius: 10, cursor: 'pointer',
                                  background: active ? `${cond.color}28` : 'transparent',
                                  border: `1px solid ${active ? cond.color + '88' : C.border}`,
                                  color: active ? cond.color : C.textMuted,
                                  fontWeight: active ? 700 : 400,
                                  transition: 'all 0.1s',
                                }}>
                                {cond.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Add combatant form ── */}
          <div style={{ borderTop: `1px solid ${C.border}33`, paddingTop: 7 }}>
            <button onClick={() => setAddOpen(o => !o)} className="sidebar-nav-item"
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 6px', fontSize: 10, fontWeight: 600,
                background: addOpen ? `${C.gold}10` : 'transparent',
                border: `1px solid ${addOpen ? C.gold + '44' : C.border}`,
                color: addOpen ? C.gold : C.textDim,
                borderRadius: 4, cursor: 'pointer',
                transition: 'all 0.12s',
              }}>
              <PersonAddIcon style={{ fontSize: 13 }} />
              <span style={{ flex: 1, textAlign: 'left' }}>Add Combatant</span>
              <ExpandMoreIcon style={{ fontSize: 13, transition: 'transform 0.15s', transform: addOpen ? 'rotate(180deg)' : 'none' }} />
            </button>

            {addOpen && (
              <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {/* PC / Monster toggle */}
                <div style={{ display: 'flex', gap: 3 }}>
                  {[['pc','Player'],['monster','Monster']].map(([val, label]) => (
                    <button key={val} onClick={() => setNewType(val)} className="sidebar-nav-item"
                      style={{
                        flex: 1, padding: '4px 0', fontSize: 9, fontWeight: newType===val ? 700 : 400,
                        background: newType===val ? (val==='pc' ? `${C.gold}18` : '#ef444418') : 'transparent',
                        border: `1px solid ${newType===val ? (val==='pc' ? C.gold+'66' : '#ef444466') : C.border}`,
                        color: newType===val ? (val==='pc' ? C.gold : '#ef4444') : C.textMuted,
                        borderRadius: 3, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.8,
                      }}>
                      {label}
                    </button>
                  ))}
                </div>
                {/* Name */}
                <input ref={nameRef} value={newName} onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && addCombatant()}
                  placeholder="Name"
                  style={{ padding: '5px 8px', fontSize: 11, background: C.surface, border: `1px solid ${C.border}`, color: C.text, borderRadius: 4, outline: 'none' }}
                />
                {/* Init + HP row */}
                <div style={{ display: 'flex', gap: 4 }}>
                  <input value={newInit} onChange={e => setNewInit(e.target.value)}
                    onKeyDown={e => e.key==='Enter' && addCombatant()}
                    placeholder="Init"
                    style={{ flex: 1, padding: '5px 8px', fontSize: 11, background: C.surface, border: `1px solid ${C.border}`, color: C.text, borderRadius: 4, outline: 'none' }}
                  />
                  <input value={newHp} onChange={e => setNewHp(e.target.value)}
                    onKeyDown={e => e.key==='Enter' && addCombatant()}
                    placeholder="HP"
                    style={{ flex: 1, padding: '5px 8px', fontSize: 11, background: C.surface, border: `1px solid ${C.border}`, color: C.text, borderRadius: 4, outline: 'none' }}
                  />
                  <button onClick={addCombatant} className="sidebar-nav-item"
                    style={{
                      padding: '5px 10px', background: `${C.gold}18`,
                      border: `1px solid ${C.gold}55`, color: C.gold,
                      borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center',
                    }}>
                    <AddIcon style={{ fontSize: 15 }} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Clear all */}
          {combatants.length > 0 && (
            <button onClick={() => { setCombatants([]); setInCombat(false); setCurrentIdx(0); setRound(1) }}
              style={{
                marginTop: 6, width: '100%', padding: '4px 0',
                fontSize: 9, background: 'none', border: `1px solid ${C.border}33`,
                color: C.textMuted, borderRadius: 3, cursor: 'pointer', letterSpacing: 1,
                textTransform: 'uppercase', opacity: 0.5,
              }}>
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   DICE ROLLER
═══════════════════════════════════════════════════════════════════════ */
const DICE_SIDES = [4, 6, 8, 10, 12, 20, 100]

function DiceRoller({ C }) {
  const [open,       setOpen]       = useState(false)
  const [mod,        setMod]        = useState(0)
  const [adv,        setAdv]        = useState(null)   // null | 'adv' | 'dis'
  const [history,    setHistory]    = useState([])
  const [rolling,    setRolling]    = useState(false)
  const [rollingDie, setRollingDie] = useState(null)
  const [displayNum, setDisplayNum] = useState(null)

  /* Spin random numbers while rolling */
  useEffect(() => {
    if (!rolling || !rollingDie) return
    const t = setInterval(() => setDisplayNum(Math.ceil(Math.random() * rollingDie)), 55)
    return () => clearInterval(t)
  }, [rolling, rollingDie])

  const rollDie = (sides) => {
    if (rolling) return
    setRolling(true)
    setRollingDie(sides)

    const r1 = Math.ceil(Math.random() * sides)
    const r2 = Math.ceil(Math.random() * sides)
    let base, note = null

    if (sides === 20 && adv === 'adv') {
      base = Math.max(r1, r2); note = `${r1},${r2}`
    } else if (sides === 20 && adv === 'dis') {
      base = Math.min(r1, r2); note = `${r1},${r2}`
    } else {
      base = r1
    }

    const total  = base + mod
    const isCrit = sides === 20 && base === 20
    const isFail = sides === 20 && base === 1
    const entry  = { id: Date.now(), sides, base, mod, total, note, isCrit, isFail, adv }

    setTimeout(() => {
      setDisplayNum(total)
      setHistory(prev => [entry, ...prev].slice(0, 8))
      setRolling(false)
      setRollingDie(null)
    }, 500)
  }

  const latest = history[0] || null
  const resultColor = latest?.isCrit ? C.gold : latest?.isFail ? '#ef4444' : C.text

  return (
    <div style={{ borderTop: `1px solid ${C.border}44` }}>

      {/* ── Toggle header ── */}
      <button onClick={() => setOpen(o => !o)} className="sidebar-nav-item"
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 9,
          padding: '9px 14px',
          background: open ? `${C.gold}0e` : 'transparent',
          border: 'none', borderLeft: `2px solid ${open ? C.gold + '99' : 'transparent'}`,
          color: open ? C.gold : C.textDim,
          cursor: 'pointer', fontSize: 13,
          transition: 'color 0.15s, background 0.15s, border-color 0.15s',
        }}>
        <CasinoIcon style={{ fontSize: 17 }} />
        <span style={{ flex: 1, textAlign: 'left', fontWeight: open ? 600 : 400 }}>Dice Roller</span>
        {/* Show last result in header when collapsed */}
        {!open && latest && (
          <span style={{
            fontSize: 11, fontWeight: 800,
            color: latest.isCrit ? C.gold : latest.isFail ? '#ef4444' : C.textMuted,
            textShadow: latest.isCrit ? `0 0 10px ${C.gold}88` : 'none',
          }}>
            {latest.total}
          </span>
        )}
        <ExpandMoreIcon style={{ fontSize: 15, transition: 'transform 0.18s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {open && (
        <div style={{ padding: '2px 10px 12px' }}>

          {/* ── Big result display ── */}
          <div style={{
            textAlign: 'center', minHeight: 76,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '8px 0 4px',
          }}>
            {displayNum != null ? (
              <>
                <div style={{
                  fontSize: 44, fontWeight: 900, lineHeight: 1, letterSpacing: -2,
                  color: rolling ? C.textMuted : resultColor,
                  textShadow: !rolling && latest?.isCrit ? `0 0 28px ${C.gold}99`
                            : !rolling && latest?.isFail ? '0 0 20px #ef444466'
                            : 'none',
                  transition: rolling ? 'none' : 'color 0.2s, text-shadow 0.25s',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {displayNum}
                </div>
                {!rolling && latest && (
                  <div style={{ fontSize: 10, color: C.textMuted, marginTop: 5, display: 'flex', gap: 5, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <span>d{latest.sides}</span>
                    {latest.mod !== 0 && (
                      <span style={{ color: latest.mod > 0 ? '#4ade80' : '#ef4444', fontWeight: 700 }}>
                        {latest.mod > 0 ? `+${latest.mod}` : latest.mod}
                      </span>
                    )}
                    {latest.note && <span style={{ color: C.textMuted, opacity: 0.7 }}>({latest.note})</span>}
                    {latest.isCrit && <span style={{ color: C.gold, fontWeight: 800, letterSpacing: 1.5 }}>✦ CRIT!</span>}
                    {latest.isFail && <span style={{ color: '#ef4444', fontWeight: 800, letterSpacing: 1.5 }}>✦ FUMBLE</span>}
                    {latest.adv === 'adv' && !latest.isCrit && <span style={{ color: '#4ade80', fontSize: 9, letterSpacing: 1 }}>ADV</span>}
                    {latest.adv === 'dis' && !latest.isFail && <span style={{ color: '#ef4444', fontSize: 9, letterSpacing: 1 }}>DIS</span>}
                  </div>
                )}
              </>
            ) : (
              <div style={{ fontSize: 11, color: C.textMuted, opacity: 0.35 }}>Pick a die to roll</div>
            )}
          </div>

          {/* ── Dice buttons ── */}
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 9 }}>
            {DICE_SIDES.map(d => {
              const isSpinning = rolling && rollingDie === d
              const isD20 = d === 20
              return (
                <button key={d} onClick={() => rollDie(d)} className="sidebar-nav-item"
                  style={{
                    padding: '5px 0', width: d === 100 ? 33 : 27,
                    fontSize: 9, fontWeight: 700, textAlign: 'center',
                    background: isSpinning ? `${C.gold}30` : isD20 ? `${C.gold}16` : C.card,
                    border: `1px solid ${isSpinning ? C.gold : isD20 ? C.gold + '55' : C.border}`,
                    color: isD20 || isSpinning ? C.gold : C.textDim,
                    borderRadius: 5,
                    cursor: rolling ? 'wait' : 'pointer',
                    opacity: rolling && !isSpinning ? 0.4 : 1,
                    transform: isSpinning ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: isSpinning ? `0 0 8px ${C.gold}55` : 'none',
                    transition: 'all 0.1s',
                  }}>
                  d{d}
                </button>
              )
            })}
          </div>

          {/* ── Modifier row ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 7, padding: '0 2px' }}>
            <span style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1.5, textTransform: 'uppercase', flex: 1 }}>Modifier</span>
            <button onClick={() => setMod(m => m - 1)} style={microBtn(C)}>−</button>
            <span style={{
              minWidth: 32, textAlign: 'center', fontSize: 12, fontWeight: 700,
              color: mod > 0 ? '#4ade80' : mod < 0 ? '#ef4444' : C.textMuted,
            }}>
              {mod > 0 ? `+${mod}` : mod}
            </span>
            <button onClick={() => setMod(m => m + 1)} style={microBtn(C)}>+</button>
            {mod !== 0 && (
              <button onClick={() => setMod(0)} style={{ ...microBtn(C), fontSize: 10, width: 18, height: 18 }}>✕</button>
            )}
          </div>

          {/* ── Advantage / Disadvantage toggle ── */}
          <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
            {[
              ['Normal', null,    C.gold],
              ['Adv',    'adv',   '#4ade80'],
              ['Dis',    'dis',   '#ef4444'],
            ].map(([label, val, color]) => (
              <button key={label} onClick={() => setAdv(adv === val ? null : val)}
                className="sidebar-nav-item"
                style={{
                  flex: 1, padding: '4px 0',
                  fontSize: 9, fontWeight: adv === val ? 700 : 400,
                  background: adv === val ? `${color}1e` : 'transparent',
                  border: `1px solid ${adv === val ? color + '88' : C.border}`,
                  color: adv === val ? color : C.textMuted,
                  borderRadius: 4, cursor: 'pointer',
                  textTransform: 'uppercase', letterSpacing: 0.8,
                  transition: 'all 0.12s',
                }}>
                {label}
              </button>
            ))}
          </div>

          {/* ── Roll history ── */}
          {history.length > 0 && (
            <div style={{ borderTop: `1px solid ${C.border}44`, paddingTop: 7 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                <HistoryIcon style={{ fontSize: 11, color: C.textMuted, marginRight: 4 }} />
                <span style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1.5, textTransform: 'uppercase', flex: 1 }}>History</span>
                <button onClick={() => { setHistory([]); setDisplayNum(null) }}
                  style={{ fontSize: 9, background: 'none', border: 'none', color: C.textMuted, cursor: 'pointer', padding: '0 2px', opacity: 0.6 }}>
                  clear
                </button>
              </div>
              {history.map((e, i) => (
                <div key={e.id} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '3px 5px', borderRadius: 4,
                  background: i === 0 ? `${C.gold}08` : 'transparent',
                  opacity: Math.max(0.22, 1 - i * 0.13),
                }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: C.textMuted, width: 23, flexShrink: 0 }}>d{e.sides}</span>
                  <span style={{
                    flex: 1, fontSize: i === 0 ? 13 : 11, fontWeight: i === 0 ? 800 : 500,
                    color: e.isCrit ? C.gold : e.isFail ? '#ef4444' : C.text,
                    textShadow: i === 0 && e.isCrit ? `0 0 10px ${C.gold}66` : 'none',
                  }}>
                    {e.total}
                  </span>
                  {e.mod !== 0 && (
                    <span style={{ fontSize: 9, color: e.mod > 0 ? '#4ade8088' : '#ef444488' }}>
                      {e.mod > 0 ? `+${e.mod}` : e.mod}
                    </span>
                  )}
                  {e.note && <span style={{ fontSize: 8, color: C.textMuted, opacity: 0.7 }}>({e.note})</span>}
                  {e.isCrit && <span style={{ fontSize: 8, color: C.gold, fontWeight: 800 }}>CRIT</span>}
                  {e.isFail && <span style={{ fontSize: 8, color: '#ef4444', fontWeight: 800 }}>FAIL</span>}
                  {e.adv === 'adv' && !e.isCrit && <span style={{ fontSize: 8, color: '#4ade8077' }}>ADV</span>}
                  {e.adv === 'dis' && !e.isFail && <span style={{ fontSize: 8, color: '#ef444477' }}>DIS</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function microBtn(C) {
  return {
    width: 22, height: 22, padding: 0, fontSize: 16, lineHeight: 1,
    background: C.card, border: `1px solid ${C.border}`,
    color: C.textDim, borderRadius: 3, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  }
}
