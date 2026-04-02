import React from 'react'
import { useT } from '../themes.js'
import { totalLevel } from '../utils.js'
import { Icons, DND_ICONS } from './Icons.jsx'
import { DND } from '../data/dnd.js'

export function Home({ chars, onCreate, onOpen, themeKey }) {
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

  const avgLvl    = chars.length ? Math.round(chars.reduce((s, c) => s + totalLevel(c), 0) / chars.length) : 0
  const totalSpells = chars.reduce((s, c) => s + (c.spells || []).length, 0)
  const uniqueClasses = new Set(chars.flatMap(c => (c.classes || []).map(cl => cl.name))).size
  const recent    = [...chars].reverse().slice(0, 4)

  /* per-theme hero text */
  const heroLine1 = isVcr      ? 'SYSTEM ONLINE.'
    : isRacing   ? 'Start your engines,'
    : isKuromi   ? 'The dark powers stir,'
    : isMyMelody ? 'Hello there!'
    : isMoon     ? 'The stars have aligned,'
    : isSakura   ? 'Petals fall softly,'
    : isNier2b   ? 'Unit online.'
    : isA2       ? 'Rogue unit operational.'
    : isTeto     ? 'Welcome, Chimera.'
    : 'Welcome back,'
  const heroLine2 = isVcr      ? 'ADVENTURER DETECTED.'
    : isRacing   ? 'Pilot.'
    : isKuromi   ? 'enter... if you dare.'
    : isMyMelody ? 'Ready to adventure? ♡'
    : isMoon     ? 'Traveler.'
    : isSakura   ? 'Adventurer. ♡'
    : isNier2b   ? 'Glory to Mankind.'
    : isA2       ? 'Begin mission.'
    : isTeto     ? '♪ Drill your destiny.'
    : 'Adventurer.'

  const ctaLabel = isVcr ? '> NEW_CHAR.EXE'
    : isRacing   ? '✦ New Character'
    : isKuromi   ? '★ Summon Character'
    : isMyMelody ? '♡ New Character'
    : isNier2b   ? '◈ Deploy Unit'
    : isA2       ? '◈ Deploy Unit'
    : isTeto     ? '♪ Enlist Chimera'
    : '+ New Character'

  const titleFont = isVcr || isKuromi ? "'Orbitron','Share Tech Mono',monospace"
    : isRacing || isNier2b || isA2 ? "'Rajdhani',sans-serif"
    : isMoon     ? "'Cinzel','Georgia',serif"
    : isMyMelody ? "'Nunito',sans-serif"
    : isTeto     ? "'Exo 2',sans-serif"
    : 'inherit'

  /* ── Empty state ── */
  if (chars.length === 0) {
    return (
      <div className="fade-up" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 48px' }}>
        <div style={{ textAlign: 'center', maxWidth: 540 }}>
          {/* decorative icon */}
          <div style={{ fontSize: 80, marginBottom: 28, opacity: 0.12, color: C.textDim, lineHeight: 1 }}>
            <Icons.Map />
          </div>

          <div style={{ fontFamily: titleFont, marginBottom: 18 }}>
            <div style={{ fontSize: isVcr ? 28 : 44, fontWeight: isMyMelody ? 800 : 700, color: C.gold, lineHeight: 1.15, letterSpacing: isNier2b || isA2 ? 4 : isVcr ? 3 : 0, textShadow: `0 0 40px ${C.gold}33`, marginBottom: 4 }}>
              {heroLine1}
            </div>
            <div style={{ fontSize: isVcr ? 22 : 36, fontWeight: isMyMelody ? 800 : 700, color: C.gold, lineHeight: 1.15, opacity: 0.7, letterSpacing: isNier2b || isA2 ? 4 : 0 }}>
              {heroLine2}
            </div>
          </div>

          <div style={{ fontSize: 15, color: C.textDim, lineHeight: 1.65, marginBottom: 8 }}>
            D&D 2024 Character Manager. Build your party,<br />track spells, and survive the dungeon.
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 36, letterSpacing: 0.5 }}>
            Create your first character to begin.
          </div>

          <button onClick={onCreate} style={{
            padding: '13px 36px', cursor: 'pointer', fontSize: 14, fontWeight: 700,
            background: `${C.gold}18`, border: `1px solid ${C.gold}66`, color: C.gold,
            borderRadius: isRacing || isMyMelody ? 28 : 6,
            letterSpacing: isNier2b || isA2 || isTeto ? 4 : 1,
            textTransform: isNier2b || isA2 || isTeto ? 'uppercase' : 'none',
            fontFamily: isNier2b || isA2 ? "'Rajdhani',sans-serif" : isTeto ? "'Exo 2',sans-serif" : titleFont,
            boxShadow: `0 0 28px ${C.gold}22`,
            transition: 'background 0.15s, box-shadow 0.15s',
          }}>
            {ctaLabel}
          </button>
        </div>
      </div>
    )
  }

  /* ── Populated state ── */
  return (
    <div className="fade-up" style={{ padding: '40px 48px' }}>

      {/* ── Hero row ── */}
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', marginBottom: 48 }}>

        {/* Left: welcome + CTA */}
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <div style={{ fontFamily: titleFont }}>
            <div style={{ fontSize: isVcr ? 24 : 38, fontWeight: isMyMelody ? 800 : 700, color: C.gold, lineHeight: 1.2, letterSpacing: isNier2b || isA2 ? 3 : isVcr ? 2 : 0, textShadow: `0 0 40px ${C.gold}30`, marginBottom: 2 }}>
              {heroLine1}
            </div>
            <div style={{ fontSize: isVcr ? 18 : 30, fontWeight: isMyMelody ? 800 : 700, color: C.gold, lineHeight: 1.2, opacity: 0.68, letterSpacing: isNier2b || isA2 ? 3 : 0 }}>
              {heroLine2}
            </div>
          </div>
          <div style={{ fontSize: 13, color: C.textDim, marginTop: 16, marginBottom: 24, lineHeight: 1.6 }}>
            {chars.length} character{chars.length !== 1 ? 's' : ''} ready for adventure · Average level {avgLvl}
          </div>
          <button onClick={onCreate} style={{
            padding: '10px 28px', cursor: 'pointer', fontSize: 13, fontWeight: 700,
            background: `${C.gold}18`, border: `1px solid ${C.gold}55`, color: C.gold,
            borderRadius: isRacing || isMyMelody ? 24 : 6,
            letterSpacing: isNier2b || isA2 || isTeto ? 4 : 1,
            textTransform: isNier2b || isA2 || isTeto ? 'uppercase' : 'none',
            fontFamily: isNier2b || isA2 ? "'Rajdhani',sans-serif" : isTeto ? "'Exo 2',sans-serif" : 'inherit',
            boxShadow: `0 0 20px ${C.gold}1a`,
            transition: 'background 0.15s, box-shadow 0.15s',
          }}>
            {ctaLabel}
          </button>
        </div>

        {/* Right: stat blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flexShrink: 0, width: 240 }}>
          {[
            ['Party',   chars.length,    <Icons.Users key="u" />],
            ['Avg Lv',  avgLvl,          <Icons.Star  key="s" />],
            ['Spells',  totalSpells,     <Icons.Zap   key="z" />],
            ['Classes', uniqueClasses,   <Icons.Book  key="b" />],
          ].map(([label, val, icon]) => (
            <div key={label} className="home-stat-card" style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: isRacing || isMyMelody ? 12 : 6,
              padding: '14px 16px',
              boxShadow: `0 2px 12px rgba(0,0,0,0.15)`,
            }}>
              <div style={{ color: C.gold, fontSize: 18, marginBottom: 6, opacity: 0.8 }}>{icon}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: C.text, lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginTop: 5 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent characters ── */}
      <div>
        <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>
          Recent Characters
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
          {recent.map(c => (
            <HomeCharCard key={c.id} char={c} onOpen={onOpen} themeKey={themeKey} C={C} />
          ))}
        </div>
        {chars.length > 4 && (
          <div style={{ marginTop: 16, fontSize: 11, color: C.textMuted }}>
            +{chars.length - 4} more in{' '}
            <span style={{ color: C.gold, cursor: 'pointer', textDecoration: 'underline' }}>Characters</span>
          </div>
        )}
      </div>
    </div>
  )
}

function HomeCharCard({ char, onOpen, themeKey, C }) {
  const isRacing   = themeKey === 'racing'
  const isMyMelody = themeKey === 'mymelody'
  const isNier2b   = themeKey === 'nier2b'
  const isA2       = themeKey === 'a2'
  const isTeto     = themeKey === 'teto'
  const isKuromi   = themeKey === 'kuromi'

  const mainClass  = (char.classes || [])[0]?.name || 'Fighter'
  const lvl        = char.classes ? char.classes.reduce((s, cl) => s + (cl.level || 0), 0) : 0
  const cc         = DND.classColors[mainClass] || C.gold
  const hpPct      = char.hp?.max ? char.hp.current / char.hp.max * 100 : 0
  const hpColor    = hpPct > 60 ? C.green : hpPct > 30 ? C.yellow : C.red

  const isNierAny  = isNier2b || isA2
  const accentColor = isNier2b ? '#e8dfd0' : isA2 ? '#7a4f26' : isTeto ? '#ff2244' : cc

  return (
    <div className="home-char-card" onClick={() => onOpen(char.id)}
      style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: isRacing || isMyMelody ? 12 : 6,
        overflow: 'hidden',
        clipPath: isTeto ? 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' : 'none',
        boxShadow: isNier2b ? '0 4px 18px rgba(0,0,0,0.70)' : isA2 ? '0 4px 16px rgba(100,70,30,0.12)' : '0 2px 12px rgba(0,0,0,0.12)',
      }}
    >
      {/* Top color bar */}
      <div style={{
        height: 2,
        background: isRacing ? `linear-gradient(90deg,${cc},#00e5cc,#ff4fa3)` : isKuromi ? 'linear-gradient(90deg,#8a18cc,#c840ff,#ff40cc)' : isMyMelody ? 'linear-gradient(90deg,#ff6b9d,#ffd700,#87ceeb)' : isNierAny ? `linear-gradient(90deg,transparent,${accentColor}55,transparent)` : isTeto ? 'linear-gradient(90deg,rgba(255,34,68,0.80),rgba(255,120,150,0.70),rgba(255,34,68,0.80))' : cc,
        boxShadow: `0 0 6px ${accentColor}66`,
      }} />
      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 16, color: isNierAny ? `${accentColor}88` : cc, opacity: isNierAny ? 1 : 0.85 }}>
            {DND_ICONS[mainClass]}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: isNierAny ? accentColor : isTeto ? '#ff2244' : C.gold, letterSpacing: isNierAny || isTeto ? 1 : 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {char.name || 'Unnamed'}
            </div>
            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 1 }}>
              {char.customSpecies || char.species} · Lv {lvl}
            </div>
          </div>
        </div>

        {/* HP bar */}
        <div style={{ height: 3, background: `${C.border}`, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.min(hpPct,100)}%`, background: hpColor, borderRadius: 2, transition: 'width 0.3s' }} />
        </div>
        <div style={{ fontSize: 9, color: C.textMuted, marginTop: 4, letterSpacing: 1 }}>
          HP {char.hp?.current ?? '—'} / {char.hp?.max ?? '—'}
        </div>
      </div>
    </div>
  )
}
