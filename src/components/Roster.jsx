import React, { useState } from 'react'
import { useT } from '../themes.js'
import { totalLevel } from '../utils.js'
import { DND_ICONS, Icons } from './Icons.jsx'
import { DND } from '../data/dnd.js'
import { Btn, FullCircleHP } from './UI.jsx'

function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

export function Roster({ chars, onCreate, onOpen, onDelete, themeKey }) {
  const C        = useT()
  const isVcr      = themeKey === 'vcr'
  const isRacing   = themeKey === 'racing'
  const isKuromi   = themeKey === 'kuromi'
  const isMyMelody = themeKey === 'mymelody'
  const isNier2b   = themeKey === 'nier2b'
  const isA2       = themeKey === 'a2'
  const isTeto     = themeKey === 'teto'
  const [search, setSearch] = useState('')

  const filtered = chars.filter(c => (c.name || '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="fade-up" style={{ padding: '28px 32px' }}>

      {/* ── Page title ── */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.gold }}>Characters</div>
        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 3 }}>
          {chars.length > 0 ? `${chars.length} character${chars.length !== 1 ? 's' : ''}` : 'No characters yet'}
        </div>
      </div>

      {/* ── Stats strip ── */}
      {chars.length > 0 && (
        <div className="roster-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
          {[
            ['Adventurers',    chars.length,                                                                   <Icons.Users key="u" />],
            ['Avg Level',      chars.length ? Math.round(chars.reduce((s, c) => s + totalLevel(c), 0) / chars.length) : 0, <Icons.Star key="s" />],
            ['Spells Known',   chars.reduce((s, c) => s + (c.spells || []).length, 0),                        <Icons.Zap key="z" />],
            ['Unique Classes', new Set(chars.flatMap(c => (c.classes || []).map(cl => cl.name))).size,        <Icons.Book key="b" />],
          ].map(([l, v, ic]) => (
            <div key={l}
              className={isRacing ? 'racing-card-holo' : isKuromi ? 'kuromi-shimmer' : isMyMelody ? 'mymelody-shimmer' : ''}
              style={{ background: C.card, border: `1px solid ${C.border}`, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderRadius: isRacing || isMyMelody ? 12 : 0, boxShadow: isRacing ? `0 0 0 1px ${C.border}, 0 4px 20px #00e5cc0a` : isKuromi ? `0 0 16px #c840ff22` : 'none' }}>
              <span style={{ color: C.gold, fontSize: 20 }}>{ic}</span>
              <div>
                <div className={isRacing ? 'miku-glow-text' : ''} style={{ fontSize: 22, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginTop: 2 }}>{l}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Search ── */}
      {chars.length > 3 && (
        <input
          placeholder={isVcr ? 'SEARCH_QUERY:_' : isRacing ? '✦ Search pilots...' : isKuromi ? '☆ Search the darkness...' : isMyMelody ? '♡ Search adventurers...' : isNier2b ? '◈ Search unit registry...' : isA2 ? '◈ Search unit registry...' : isTeto ? '♪ Search chimera registry...' : 'Search adventurers...'}
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: '9px 16px', fontSize: 13, width: '100%', marginBottom: 18, fontFamily: 'inherit', letterSpacing: 1, borderRadius: isRacing || isMyMelody ? 24 : 0 }}
        />
      )}

      {/* ── Empty state / Grid ── */}
      {chars.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          {isVcr ? (
            <>
              <div style={{ fontSize: 42, color: C.gold, opacity: 0.35, letterSpacing: 8, fontFamily: "'Orbitron',monospace", marginBottom: 14 }}>NO SIGNAL</div>
              <div className="vcr-blink" style={{ fontSize: 11, color: C.gold, letterSpacing: 4, marginBottom: 8 }}>INSERT TAPE ▶</div>
              <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 3, marginBottom: 28 }}>CHARACTER DATABASE EMPTY</div>
              <Btn variant="gold" onClick={onCreate}>▶ INITIALIZE NEW CHARACTER</Btn>
            </>
          ) : isRacing ? (
            <RacingEmptyState C={C} onCreate={onCreate} />
          ) : isKuromi ? (
            <KuomiEmptyState C={C} onCreate={onCreate} />
          ) : isMyMelody ? (
            <MyMelodyEmptyState C={C} onCreate={onCreate} />
          ) : isNier2b ? (
            <Nier2bEmptyState onCreate={onCreate} />
          ) : isA2 ? (
            <A2EmptyState onCreate={onCreate} />
          ) : isTeto ? (
            <TetoEmptyState onCreate={onCreate} />
          ) : (
            <>
              <div style={{ fontSize: 60, marginBottom: 16, opacity: 0.2, color: C.textDim }}><Icons.Map /></div>
              <div style={{ fontSize: 18, color: C.textDim, marginBottom: 8, fontFamily: 'Georgia,serif' }}>The tavern is empty.</div>
              <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 24 }}>Create your first adventurer to begin.</div>
              <Btn variant="gold" onClick={onCreate}>Create Your First Character</Btn>
            </>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 16 }}>
          {filtered.map(c => <CharCard key={c.id} char={c} onOpen={onOpen} onDelete={onDelete} onExport={() => downloadJson(c, `${c.name || 'character'}.json`)} isRacing={isRacing} isKuromi={isKuromi} isMyMelody={isMyMelody} isNier2b={isNier2b} isA2={isA2} isTeto={isTeto} />)}
        </div>
      )}
    </div>
  )
}

/* ── Teto empty state ── */
function TetoEmptyState({ onCreate }) {
  return (
    <div>
      <div style={{ position: 'relative', width: 92, height: 92, margin: '0 auto 28px' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(rgba(255,34,68,0) 0deg,rgba(255,34,68,0.48) 45deg,rgba(255,34,68,0) 90deg,rgba(255,34,68,0) 135deg,rgba(255,34,68,0.38) 180deg,rgba(255,34,68,0) 225deg,rgba(255,34,68,0) 270deg,rgba(255,34,68,0.42) 315deg,rgba(255,34,68,0) 360deg)', animation: 'teto-spin-cw 5s linear infinite', filter: 'blur(3px)' }} />
        <div style={{ position: 'absolute', inset: 14, borderRadius: '50%', background: 'conic-gradient(rgba(255,102,136,0) 0deg,rgba(255,102,136,0.62) 60deg,rgba(255,102,136,0) 120deg,rgba(255,102,136,0) 180deg,rgba(255,102,136,0.52) 240deg,rgba(255,102,136,0) 300deg,rgba(255,102,136,0) 360deg)', animation: 'teto-spin-ccw 3.2s linear infinite', filter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', inset: 28, borderRadius: '50%', border: '1px solid rgba(255,34,68,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: 'rgba(255,170,180,0.85)', textShadow: '0 0 14px rgba(255,34,68,0.75)', animation: 'teto-note-bob 2.5s ease-in-out infinite' }}>♪</div>
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,34,68,0.35)', letterSpacing: 6, marginBottom: 18, textTransform: 'uppercase', fontFamily: "'Exo 2', sans-serif" }}>— Chimera Registry Empty —</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: '#ff2244', letterSpacing: 4, marginBottom: 12, fontFamily: "'Exo 2', sans-serif", textShadow: '0 0 24px rgba(255,34,68,0.58)' }}>NO CHIMERAS DEPLOYED</div>
      <div style={{ fontSize: 12, color: 'rgba(255,136,153,0.58)', letterSpacing: 1, marginBottom: 6, fontStyle: 'italic' }}>"My voice will reach you, even from the depths of despair."</div>
      <div style={{ fontSize: 10, color: 'rgba(255,34,68,0.30)', letterSpacing: 2, marginBottom: 38, textTransform: 'uppercase' }}>Enlist your first chimera to begin the adventure ♪</div>
      <Btn variant="gold" onClick={onCreate} style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 4, padding: '10px 36px', textTransform: 'uppercase', border: '1px solid rgba(255,34,68,0.52)', background: 'rgba(255,34,68,0.08)', color: '#ff2244', boxShadow: '0 0 26px rgba(255,34,68,0.22)', animation: 'teto-border-pulse 3s ease-in-out infinite' }}>♪ Enlist Chimera</Btn>
    </div>
  )
}

/* ── A2 empty state ── */
function A2EmptyState({ onCreate }) {
  return (
    <div>
      <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 28px' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed rgba(122,79,38,0.35)', animation: 'a2-spin-slow 55s linear infinite reverse' }} />
        <div style={{ position: 'absolute', inset: 12, borderRadius: '50%', border: '1px solid rgba(122,79,38,0.20)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 22, height: 22, marginTop: -11, marginLeft: -11, border: '1px solid rgba(122,79,38,0.55)', borderTopColor: 'rgba(140,26,26,0.70)', boxShadow: '0 0 10px rgba(122,79,38,0.18)', animation: 'a2-inner-spin 28s linear infinite' }} />
      </div>
      <div style={{ fontSize: 10, color: 'rgba(122,79,38,0.40)', letterSpacing: 6, marginBottom: 18, textTransform: 'uppercase', fontFamily: "'Rajdhani', sans-serif" }}>— Unit Registry Empty —</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#7a4f26', letterSpacing: 5, marginBottom: 12, fontFamily: "'Rajdhani', sans-serif", textShadow: '0 1px 8px rgba(122,79,38,0.22)' }}>NO UNITS REGISTERED</div>
      <div style={{ fontSize: 12, color: 'rgba(122,79,38,0.50)', letterSpacing: 1, marginBottom: 6, fontStyle: 'italic' }}>"There's no point in saving a world not worth saving."</div>
      <div style={{ fontSize: 10, color: 'rgba(122,79,38,0.32)', letterSpacing: 2, marginBottom: 38, textTransform: 'uppercase' }}>Deploy your first unit to begin field operations</div>
      <Btn variant="gold" onClick={onCreate} style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 5, padding: '10px 36px', textTransform: 'uppercase', border: '1px solid rgba(122,79,38,0.50)', background: 'rgba(122,79,38,0.08)', color: '#7a4f26', boxShadow: '0 2px 16px rgba(122,79,38,0.14)' }}>◈ Deploy Unit</Btn>
    </div>
  )
}

/* ── NieR:Automata 2B empty state ── */
function Nier2bEmptyState({ onCreate }) {
  return (
    <div>
      <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 28px' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(232,223,208,0.22)', animation: 'nier2b-spin-cw 24s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 12, borderRadius: '50%', border: '1px solid rgba(232,223,208,0.14)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 22, height: 22, marginTop: -11, marginLeft: -11, border: '1px solid rgba(232,223,208,0.50)', transform: 'rotate(45deg)', boxShadow: '0 0 12px rgba(232,223,208,0.25)', animation: 'nier2b-spin-ccw 14s linear infinite' }} />
      </div>
      <div style={{ fontSize: 10, color: 'rgba(232,223,208,0.28)', letterSpacing: 6, marginBottom: 18, textTransform: 'uppercase', fontFamily: "'Rajdhani', sans-serif" }}>— Unit Registry Empty —</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#e8dfd0', letterSpacing: 5, marginBottom: 12, fontFamily: "'Rajdhani', sans-serif", textShadow: '0 0 22px rgba(232,223,208,0.38)' }}>NO UNITS REGISTERED</div>
      <div style={{ fontSize: 12, color: 'rgba(232,223,208,0.38)', letterSpacing: 1, marginBottom: 6, fontStyle: 'italic' }}>"Everything that lives is designed to end."</div>
      <div style={{ fontSize: 10, color: 'rgba(232,223,208,0.22)', letterSpacing: 2, marginBottom: 38, textTransform: 'uppercase' }}>Deploy your first YoRHa unit to begin operations</div>
      <Btn variant="gold" onClick={onCreate} style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 5, padding: '10px 36px', textTransform: 'uppercase', border: '1px solid rgba(232,223,208,0.50)', background: 'rgba(232,223,208,0.06)', color: '#e8dfd0', boxShadow: '0 0 20px rgba(232,223,208,0.10)' }}>◈ Deploy Unit</Btn>
    </div>
  )
}

/* ── Racing empty state ── */
function RacingEmptyState({ C, onCreate }) {
  return (
    <div>
      <div style={{ fontSize: 64, marginBottom: 6, lineHeight: 1 }}>
        <span className="miku-sparkle" style={{ color: C.gold, filter: `drop-shadow(0 0 16px ${C.gold})` }}>✦</span>
      </div>
      <div style={{ fontSize: 36, fontWeight: 700, color: C.gold, letterSpacing: 3, fontFamily: "'Rajdhani', sans-serif", marginBottom: 6, textShadow: `0 0 20px ${C.gold}66, 0 0 60px ${C.gold}33` }}>GRID EMPTY</div>
      <div style={{ fontSize: 12, color: '#ff4fa3', letterSpacing: 2, marginBottom: 4 }}>No pilots registered</div>
      <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 1, marginBottom: 32 }}>Register your first character to hit the track</div>
      <Btn variant="gold" onClick={onCreate} style={{ borderRadius: 24, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 2, padding: '10px 32px' }}>✦ Register Pilot</Btn>
    </div>
  )
}

/* ── Kuromi empty state ── */
function KuomiEmptyState({ C, onCreate }) {
  return (
    <div>
      <div style={{ fontSize: 72, marginBottom: 8, lineHeight: 1, filter: `drop-shadow(0 0 22px ${C.gold})`, animation: 'kuromi-skull-haunt 14s ease-in-out infinite' }}>💀</div>
      <div style={{ fontSize: 32, fontWeight: 900, color: C.gold, letterSpacing: 4, marginBottom: 6, textShadow: `0 0 18px ${C.gold}88` }}>NO SOULS FOUND</div>
      <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 2, marginBottom: 4 }}>The ritual circle is empty</div>
      <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1, marginBottom: 32 }}>Summon your first character to begin the dark adventure</div>
      <Btn variant="gold" onClick={onCreate} style={{ letterSpacing: 3 }}>★ Begin the Ritual</Btn>
    </div>
  )
}

/* ── My Melody empty state ── */
function MyMelodyEmptyState({ C, onCreate }) {
  return (
    <div>
      <div style={{ fontSize: 72, marginBottom: 8, lineHeight: 1 }}>🎀</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: C.gold, letterSpacing: 1, marginBottom: 6, fontFamily: "'Nunito', sans-serif" }}>No adventurers yet! ♡</div>
      <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 4 }}>The meadow is quiet and waiting~</div>
      <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 32 }}>Create your first character to start your sweet adventure</div>
      <Btn variant="gold" onClick={onCreate} style={{ borderRadius: 20, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>♡ Create Character</Btn>
    </div>
  )
}

export function CharCard({ char, onOpen, onDelete, onExport, isRacing, isKuromi, isMyMelody, isNier2b, isA2, isTeto }) {
  const C = useT()
  const lvl = totalLevel(char)
  const hpPct = char.hp.max ? char.hp.current / char.hp.max * 100 : 0
  const hpColor = hpPct > 60 ? C.green : hpPct > 30 ? C.yellow : C.red
  const mainClass = (char.classes || [])[0]?.name || 'Fighter'
  const cc = DND.classColors[mainClass] || C.gold
  const isMulti = (char.classes || []).length > 1

  const rounded = isRacing || isMyMelody ? 14 : 0
  const cardClass = isRacing ? 'hov-card racing-card-holo'
    : isKuromi   ? 'hov-card kuromi-shimmer'
    : isMyMelody ? 'hov-card mymelody-shimmer'
    : 'hov-card'

  const isNierAny = isNier2b || isA2
  const nierColor  = isNier2b ? 'rgba(232,223,208,' : 'rgba(122,79,38,'
  const nierAccent = isNier2b ? '#e8dfd0' : '#7a4f26'
  const nierRed    = isNier2b ? 'rgba(191,21,40,0.85)' : 'rgba(140,26,26,0.85)'

  return (
    <div
      className={cardClass}
      onClick={() => onOpen(char.id)}
      style={{
        background: C.card,
        border: isNierAny ? `1px solid ${nierColor}0.14)` : isTeto ? '1px solid rgba(255,34,68,0.18)' : `1px solid ${C.border}`,
        overflow: 'hidden', cursor: 'pointer',
        borderRadius: rounded,
        clipPath: isTeto ? 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)' : 'none',
        boxShadow: isRacing  ? `0 0 0 1px ${C.border}, 0 4px 20px #00e5cc08`
          : isKuromi   ? `0 0 18px #c840ff1a`
          : isNier2b   ? '0 4px 24px rgba(0,0,0,0.80)'
          : isA2       ? '0 4px 20px rgba(100,70,30,0.14)'
          : isTeto     ? '0 4px 28px rgba(255,34,68,0.14), 0 0 0 1px rgba(255,34,68,0.10)'
          : 'none',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: isRacing || isMyMelody ? 4 : isKuromi ? 3 : 2,
        background: isRacing   ? `linear-gradient(90deg, ${cc}, #00e5cc, #ff4fa3)`
          : isKuromi   ? `linear-gradient(90deg, #8a18cc, #c840ff, #ff40cc)`
          : isMyMelody ? `linear-gradient(90deg, #ff6b9d, #ffb347, #ffd700, #98fb98, #87ceeb, #da70d6)`
          : isNier2b   ? `linear-gradient(90deg, transparent, rgba(232,223,208,0.55), transparent)`
          : isA2       ? `linear-gradient(90deg, transparent, rgba(122,79,38,0.60), rgba(140,26,26,0.40), rgba(122,79,38,0.60), transparent)`
          : isTeto     ? `linear-gradient(90deg, rgba(255,34,68,0.80), rgba(255,120,150,0.70), rgba(255,34,68,0.80))`
          : cc,
        boxShadow: isKuromi  ? `0 0 12px #c840ff88`
          : isNier2b  ? '0 0 8px rgba(232,223,208,0.20)'
          : isA2      ? '0 0 8px rgba(122,79,38,0.22)'
          : isTeto    ? '0 0 12px rgba(255,34,68,0.50)'
          : `0 0 8px ${cc}88`,
      }} />
      {/* Teto diagonal cut corner accent */}
      {isTeto && (
        <div style={{ position: 'absolute', top: 0, right: 0, width: 18, height: 18,
          background: 'linear-gradient(225deg, rgba(255,34,68,0.50) 45%, transparent 45%)',
          pointerEvents: 'none', zIndex: 2 }} />
      )}

      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <div style={{
              fontSize: 15, fontWeight: isMyMelody ? 800 : 700,
              color: isNierAny ? nierAccent : isTeto ? '#ff2244' : C.gold,
              marginBottom: 2,
              letterSpacing: isRacing ? 0.5 : isNierAny ? 3 : isTeto ? 2 : 1,
              textShadow: isRacing  ? `0 0 10px ${C.gold}66`
                : isKuromi  ? `0 0 12px ${C.gold}99`
                : isNier2b  ? '0 0 14px rgba(232,223,208,0.45)'
                : isA2      ? '0 1px 6px rgba(122,79,38,0.30)'
                : isTeto    ? '0 0 16px rgba(255,34,68,0.58)'
                : 'none',
              fontFamily: isMyMelody ? "'Nunito', sans-serif" : isNierAny ? "'Rajdhani', sans-serif" : isTeto ? "'Exo 2', sans-serif" : 'inherit',
            }}>
              {isNierAny && <span style={{ fontSize: 10, opacity: 0.5, marginRight: 6 }}>◈</span>}
              {isTeto && <span style={{ fontSize: 11, opacity: 0.7, marginRight: 5, animation: 'teto-note-bob 3s ease-in-out infinite', display: 'inline-block' }}>♪</span>}
              {char.name || (isRacing ? 'UNNAMED PILOT' : isKuromi ? 'UNNAMED SOUL' : isMyMelody ? 'Unnamed ♡' : isNierAny ? 'UNIT UNNAMED' : isTeto ? 'UNNAMED CHIMERA' : 'UNNAMED')}
              {isRacing   && <span className="miku-sparkle" style={{ marginLeft: 6, fontSize: 8, color: '#ff4fa3' }}>✦</span>}
              {isKuromi   && <span style={{ marginLeft: 5, fontSize: 9, color: '#c840ff', filter: 'drop-shadow(0 0 4px #c840ff)' }}>☆</span>}
              {isMyMelody && <span style={{ marginLeft: 4, fontSize: 11 }}>♡</span>}
            </div>
            <div style={{ fontSize: 10, color: isNierAny ? `${nierColor}0.38)` : isTeto ? 'rgba(255,136,153,0.55)' : C.textDim, letterSpacing: isNierAny ? 2 : isTeto ? 2 : 1 }}>
              {char.customSpecies || char.species} // LV.{lvl}
              {isMulti && <span style={{ marginLeft: 6, fontSize: 9, color: isNierAny ? `${nierColor}0.55)` : isTeto ? 'rgba(255,34,68,0.60)' : C.gold, border: isNierAny ? `1px solid ${nierColor}0.25)` : isTeto ? '1px solid rgba(255,34,68,0.30)' : `1px solid ${C.gold}55`, padding: '1px 4px', borderRadius: rounded > 0 ? 6 : 0 }}>MULTI</span>}
            </div>
          </div>
          <span style={{
            color: isNierAny ? `${nierColor}0.50)` : isTeto ? 'rgba(255,34,68,0.45)' : cc,
            opacity: isNierAny || isTeto ? 1 : 0.8,
            fontSize: 18,
            filter: isRacing   ? `drop-shadow(0 0 6px ${cc})`
              : isKuromi  ? `drop-shadow(0 0 8px ${C.gold})`
              : isNier2b  ? 'drop-shadow(0 0 6px rgba(232,223,208,0.30))'
              : isA2      ? 'drop-shadow(0 0 4px rgba(122,79,38,0.25))'
              : isTeto    ? 'drop-shadow(0 0 6px rgba(255,34,68,0.40))'
              : 'none',
          }}>
            {DND_ICONS[mainClass]}
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {(char.classes || []).map((cl, i) => {
            const clc = isNierAny ? `${nierColor}0.65)` : isTeto ? 'rgba(255,34,68,0.65)' : (DND.classColors[cl.name] || C.gold)
            return (
              <span key={i} style={{ fontSize: 9, background: isNierAny ? `${nierColor}0.07)` : isTeto ? 'rgba(255,34,68,0.08)' : clc + '22', border: isNierAny ? `1px solid ${nierColor}0.20)` : isTeto ? '1px solid rgba(255,34,68,0.22)' : `1px solid ${clc}44`, padding: '2px 7px', color: clc, letterSpacing: isNierAny || isTeto ? 2 : 1, display: 'flex', alignItems: 'center', gap: 3, borderRadius: rounded > 0 ? 8 : 0 }}>
                {DND_ICONS[cl.name]} {cl.name} {cl.level}
              </span>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <FullCircleHP current={char.hp.current} max={char.hp.max} color={isNierAny ? `${nierColor}0.70)` : isTeto ? 'rgba(255,34,68,0.70)' : hpColor} size={62} temp={char.hp.temp || 0} />
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            {[['AC', char.ac], ['SPD', `${char.speed}ft`]].map(([l, v]) => (
              <div key={l} style={{ background: isNierAny ? `${nierColor}0.05)` : isTeto ? 'rgba(255,34,68,0.05)' : C.surface, border: isNierAny ? `1px solid ${nierColor}0.14)` : isTeto ? '1px solid rgba(255,34,68,0.14)' : `1px solid ${C.border}`, padding: '6px 8px', textAlign: 'center', borderRadius: rounded > 0 ? 8 : 0 }}>
                <div style={{ fontSize: 9, color: isNierAny ? `${nierColor}0.38)` : isTeto ? 'rgba(255,34,68,0.40)' : C.textMuted, letterSpacing: 2 }}>{l}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: isNierAny ? nierAccent : isTeto ? '#ff2244' : C.text }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={e => { e.stopPropagation(); onExport?.() }}
            style={{ background: 'transparent', border: 'none', color: C.textMuted, cursor: 'pointer', fontSize: 9, padding: 0, fontFamily: isNierAny || isTeto ? "'Exo 2', sans-serif" : 'inherit', letterSpacing: isNierAny || isTeto ? 3 : 2, transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = isNierAny ? nierAccent : isTeto ? '#ff2244' : C.gold}
            onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
          >
            {isRacing ? '↓ export' : isKuromi ? '↓ extract' : isMyMelody ? '↓ save ♡' : isNierAny ? '↓ extract data' : isTeto ? '♪ export' : '[↓] EXPORT'}
          </button>
          <button
            onClick={e => { e.stopPropagation(); if (confirm('Delete this character?')) onDelete(char.id) }}
            style={{ background: 'transparent', border: 'none', color: C.textMuted, cursor: 'pointer', fontSize: 9, padding: 0, fontFamily: isNierAny || isTeto ? "'Exo 2', sans-serif" : 'inherit', letterSpacing: isNierAny || isTeto ? 3 : 2, transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = isNierAny ? nierRed : isTeto ? 'rgba(255,34,68,0.90)' : C.red}
            onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
          >
            {isRacing ? '✕ retire' : isKuromi ? '☆ banish' : isMyMelody ? '✕ goodbye' : isNierAny ? '◈ terminate' : isTeto ? '♪ dismiss' : '[X] DELETE'}
          </button>
        </div>
      </div>
    </div>
  )
}
