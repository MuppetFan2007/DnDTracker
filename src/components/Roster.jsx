import React, { useState, useRef } from 'react'
import { useT, THEMES } from '../themes.js'
import { totalLevel } from '../utils.js'
import { DND_ICONS, Icons } from './Icons.jsx'
import { DND } from '../data/dnd.js'
import { Btn, FullCircleHP } from './UI.jsx'
import { VcrClock } from './VcrClock.jsx'

function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

export function Roster({ chars, onCreate, onOpen, onDelete, themeKey, setThemeKey, onImport }) {
  const C        = useT()
  const isVcr      = themeKey === 'vcr'
  const isRacing   = themeKey === 'racing'
  const isKuromi   = themeKey === 'kuromi'
  const isMyMelody = themeKey === 'mymelody'
  const [search, setSearch] = useState('')
  const [hoveredTheme, setHoveredTheme] = useState(null)
  const importRef = useRef(null)

  const handleImportFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result)
        onImport(Array.isArray(parsed) ? parsed : [parsed])
      } catch { alert('Invalid JSON file.') }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const filtered = chars.filter(c => (c.name || '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="fade-up roster-wrap" style={{ minHeight: '100vh', padding: '28px 32px' }}>
      <div>

        {/* ── Header ── */}
        <div className="roster-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            {isVcr && (
              <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 4, marginBottom: 6 }}>
                ▓▓░ SYSTEM BOOT — LOADING CHARACTER DATABASE ░▓▓
              </div>
            )}
            {isRacing && (
              <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 3, marginBottom: 6, textTransform: 'uppercase' }}>
                ◆ Racing Division — Character Registry ◆
              </div>
            )}
            {isKuromi && (
              <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 3, marginBottom: 6, textTransform: 'uppercase' }}>
                ☆ dark magic activated ☆
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {isVcr ? (
                <div style={{ borderLeft: `3px solid ${C.gold}`, paddingLeft: 14 }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: C.gold, letterSpacing: 5, fontFamily: "'Orbitron', monospace" }}>D&D 2024</div>
                  <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 3, marginTop: 3 }}>CHARACTER MANAGER // v2.4.1</div>
                </div>
              ) : isRacing ? (
                <RacingHeader C={C} />
              ) : isKuromi ? (
                <KuomiHeader C={C} />
              ) : isMyMelody ? (
                <MyMelodyHeader C={C} />
              ) : (
                <>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg,${C.gold},${C.goldDim})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.bg, boxShadow: `0 4px 16px ${C.gold}44` }}>
                    <Icons.Book />
                  </div>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: C.gold, fontFamily: 'Georgia, serif' }}>D&D 2024 Manager</div>
                    <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Track your party · Manage spells · Stay alive</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="roster-actions" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {isVcr    && <VcrClock />}
            {isRacing && <RacingLapCounter C={C} />}
            {/* Theme switcher */}
            <div style={{ position: 'relative', display: 'flex', gap: 5, background: C.surface, border: `1px solid ${C.border}`, padding: '4px 6px', borderRadius: isRacing || isMyMelody ? 20 : 0 }}>
              {Object.entries(THEMES).map(([k, t]) => (
                <button key={k} className="hov-btn" onClick={() => setThemeKey(k)}
                  onMouseEnter={() => setHoveredTheme(k)}
                  onMouseLeave={() => setHoveredTheme(null)}
                  style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${k === themeKey ? C.gold : 'transparent'}`, background: t.gold, padding: 0, boxShadow: k === themeKey ? `0 0 8px ${t.gold}` : 'none' }} />
              ))}
              {hoveredTheme && (() => {
                const ht = THEMES[hoveredTheme]
                const htFont = hoveredTheme === 'vcr' || hoveredTheme === 'kuromi'
                  ? "'Share Tech Mono', monospace"
                  : hoveredTheme === 'racing' || hoveredTheme === 'nier2b'
                  ? "'Rajdhani', sans-serif"
                  : hoveredTheme === 'moon'
                  ? "'Cinzel', Georgia, serif"
                  : hoveredTheme === 'mymelody' || hoveredTheme === 'sakura'
                  ? "'Nunito', sans-serif"
                  : "'Segoe UI', sans-serif"
                return (
                  <div className="fade-up" style={{
                    position: 'absolute', top: 'calc(100% + 10px)', left: '50%',
                    transform: 'translateX(-50%)',
                    background: ht.card,
                    border: `1px solid ${ht.gold}`,
                    color: ht.gold,
                    padding: '4px 12px',
                    fontSize: 11,
                    fontFamily: htFont,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    boxShadow: `0 0 14px ${ht.gold}44, 0 4px 16px rgba(0,0,0,0.6)`,
                    borderRadius: hoveredTheme === 'mymelody' || hoveredTheme === 'sakura' ? 20 : 0,
                  }}>
                    {ht.name}
                  </div>
                )
              })()}
            </div>
            <input type="file" accept=".json" style={{ display: 'none' }} ref={importRef} onChange={handleImportFile} />
            <Btn onClick={() => importRef.current.click()}>Import</Btn>
            {chars.length > 0 && <Btn onClick={() => downloadJson(chars, 'dnd-characters.json')}>Export All</Btn>}
            <Btn variant="gold" onClick={onCreate} style={
              isRacing   ? { borderRadius: 20, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1, padding: '8px 22px' }
            : isMyMelody ? { borderRadius: 20, fontWeight: 800 }
            : {}}>
              {isVcr ? '> NEW_CHAR.EXE' : isRacing ? '✦ New Character' : isKuromi ? '★ Summon Character' : isMyMelody ? '♡ New Character' : '+ New Character'}
            </Btn>
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
            placeholder={isVcr ? 'SEARCH_QUERY:_' : isRacing ? '✦ Search pilots...' : isKuromi ? '☆ Search the darkness...' : isMyMelody ? '♡ Search adventurers...' : 'Search adventurers...'}
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
            {filtered.map(c => <CharCard key={c.id} char={c} onOpen={onOpen} onDelete={onDelete} onExport={() => downloadJson(c, `${c.name || 'character'}.json`)} isRacing={isRacing} isKuromi={isKuromi} isMyMelody={isMyMelody} />)}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Racing Miku header block ── */
function RacingHeader({ C }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Diagonal accent stripe */}
      <div style={{ position: 'absolute', top: -4, left: -16, width: 4, height: '120%', background: `linear-gradient(180deg, #ff4fa3, #00e5cc)`, borderRadius: 2, boxShadow: '0 0 12px #00e5cc88' }} />
      <div style={{ paddingLeft: 8 }}>
        <div style={{
          fontSize: 28, fontWeight: 700, color: C.gold, letterSpacing: 2,
          lineHeight: 1, fontFamily: "'Rajdhani', sans-serif",
          textShadow: `0 0 20px ${C.gold}88, 0 0 40px ${C.gold}44`,
        }}>
          D&amp;D 2024
          <span className="miku-sparkle" style={{ marginLeft: 10, fontSize: 20, color: '#ff4fa3', verticalAlign: 'middle' }}>✦</span>
        </div>
        <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 3, marginTop: 3, textTransform: 'uppercase' }}>
          Racing Miku — Character Manager
        </div>
      </div>
    </div>
  )
}

/* ── Lap counter widget ── */
function RacingLapCounter({ C }) {
  const [lap] = useState(() => Math.floor(Math.random() * 40) + 1)
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 11, letterSpacing: 2, color: C.textMuted, textTransform: 'uppercase' }}>
      <span style={{ color: C.gold }}>✦</span>
      <span>LAP {String(lap).padStart(2,'0')}</span>
      <span style={{ color: '#ff4fa3' }}>◆ P1</span>
      <span>VOCALOID FC</span>
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
      <div style={{
        fontSize: 36, fontWeight: 700, color: C.gold, letterSpacing: 3,
        fontFamily: "'Rajdhani', sans-serif", marginBottom: 6,
        textShadow: `0 0 20px ${C.gold}66, 0 0 60px ${C.gold}33`,
      }}>
        GRID EMPTY
      </div>
      <div style={{ fontSize: 12, color: '#ff4fa3', letterSpacing: 2, marginBottom: 4 }}>No pilots registered</div>
      <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 1, marginBottom: 32 }}>Register your first character to hit the track</div>
      <Btn variant="gold" onClick={onCreate} style={{ borderRadius: 24, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 2, padding: '10px 32px' }}>
        ✦ Register Pilot
      </Btn>
    </div>
  )
}

/* ── Kuromi header ── */
function KuomiHeader({ C }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: -4, left: -16, width: 4, height: '120%', background: `linear-gradient(180deg, #c840ff, #8a18cc)`, borderRadius: 2, boxShadow: '0 0 14px #c840ff88' }} />
      <div style={{ paddingLeft: 8 }}>
        <div style={{ fontSize: 26, fontWeight: 900, color: C.gold, letterSpacing: 3, lineHeight: 1, textShadow: `0 0 18px ${C.gold}88, 0 0 40px ${C.gold}44` }}>
          D&amp;D 2024 <span style={{ fontSize: 18, opacity: 0.7 }}>☆</span>
        </div>
        <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 3, marginTop: 3, textTransform: 'uppercase' }}>
          Kuromi — Dark Magic Character Manager
        </div>
      </div>
    </div>
  )
}

/* ── Kuromi empty state ── */
function KuomiEmptyState({ C, onCreate }) {
  return (
    <div>
      <div style={{ fontSize: 72, marginBottom: 8, lineHeight: 1, filter: `drop-shadow(0 0 22px ${C.gold})`, animation: 'kuromi-skull-haunt 14s ease-in-out infinite' }}>💀</div>
      <div style={{ fontSize: 32, fontWeight: 900, color: C.gold, letterSpacing: 4, marginBottom: 6, textShadow: `0 0 18px ${C.gold}88` }}>
        NO SOULS FOUND
      </div>
      <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 2, marginBottom: 4 }}>The ritual circle is empty</div>
      <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1, marginBottom: 32 }}>Summon your first character to begin the dark adventure</div>
      <Btn variant="gold" onClick={onCreate} style={{ letterSpacing: 3 }}>★ Begin the Ritual</Btn>
    </div>
  )
}

/* ── My Melody header ── */
function MyMelodyHeader({ C }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: -4, left: -16, width: 4, height: '120%', background: `linear-gradient(180deg, #ff6b9d, #d82858)`, borderRadius: 2, boxShadow: '0 0 12px #d8285866' }} />
      <div style={{ paddingLeft: 8 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.gold, letterSpacing: 1, lineHeight: 1, fontFamily: "'Nunito', sans-serif" }}>
          D&amp;D 2024 <span style={{ fontSize: 20 }}>♡</span>
        </div>
        <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 2, marginTop: 3 }}>
          My Melody — Character Manager
        </div>
      </div>
    </div>
  )
}

/* ── My Melody empty state ── */
function MyMelodyEmptyState({ C, onCreate }) {
  return (
    <div>
      <div style={{ fontSize: 72, marginBottom: 8, lineHeight: 1 }}>🎀</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: C.gold, letterSpacing: 1, marginBottom: 6, fontFamily: "'Nunito', sans-serif" }}>
        No adventurers yet! ♡
      </div>
      <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 4 }}>The meadow is quiet and waiting~</div>
      <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 32 }}>Create your first character to start your sweet adventure</div>
      <Btn variant="gold" onClick={onCreate} style={{ borderRadius: 20, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>♡ Create Character</Btn>
    </div>
  )
}

export function CharCard({ char, onOpen, onDelete, onExport, isRacing, isKuromi, isMyMelody }) {
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

  return (
    <div
      className={cardClass}
      onClick={() => onOpen(char.id)}
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        overflow: 'hidden', cursor: 'pointer',
        borderRadius: rounded,
        boxShadow: isRacing  ? `0 0 0 1px ${C.border}, 0 4px 20px #00e5cc08`
          : isKuromi   ? `0 0 18px #c840ff1a`
          : 'none',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: isRacing || isMyMelody ? 4 : isKuromi ? 3 : 2,
        background: isRacing   ? `linear-gradient(90deg, ${cc}, #00e5cc, #ff4fa3)`
          : isKuromi   ? `linear-gradient(90deg, #8a18cc, #c840ff, #ff40cc)`
          : isMyMelody ? `linear-gradient(90deg, #ff6b9d, #ffb347, #ffd700, #98fb98, #87ceeb, #da70d6)`
          : cc,
        boxShadow: isKuromi ? `0 0 12px #c840ff88` : `0 0 8px ${cc}88`,
      }} />

      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <div style={{
              fontSize: 15, fontWeight: isMyMelody ? 800 : 700, color: C.gold, marginBottom: 2,
              letterSpacing: isRacing ? 0.5 : 1,
              textShadow: isRacing  ? `0 0 10px ${C.gold}66`
                : isKuromi ? `0 0 12px ${C.gold}99`
                : 'none',
              fontFamily: isMyMelody ? "'Nunito', sans-serif" : 'inherit',
            }}>
              {char.name || (isRacing ? 'UNNAMED PILOT' : isKuromi ? 'UNNAMED SOUL' : isMyMelody ? 'Unnamed ♡' : 'UNNAMED')}
              {isRacing   && <span className="miku-sparkle" style={{ marginLeft: 6, fontSize: 8, color: '#ff4fa3' }}>✦</span>}
              {isKuromi   && <span style={{ marginLeft: 5, fontSize: 9, color: '#c840ff', filter: 'drop-shadow(0 0 4px #c840ff)' }}>☆</span>}
              {isMyMelody && <span style={{ marginLeft: 4, fontSize: 11 }}>♡</span>}
            </div>
            <div style={{ fontSize: 10, color: C.textDim, letterSpacing: 1 }}>
              {char.customSpecies || char.species} // LV.{lvl}
              {isMulti && <span style={{ marginLeft: 6, fontSize: 9, color: C.gold, border: `1px solid ${C.gold}55`, padding: '1px 4px', borderRadius: rounded > 0 ? 6 : 0 }}>MULTI</span>}
            </div>
          </div>
          <span style={{
            color: cc, opacity: 0.8, fontSize: 18,
            filter: isRacing ? `drop-shadow(0 0 6px ${cc})` : isKuromi ? `drop-shadow(0 0 8px ${C.gold})` : 'none',
          }}>
            {DND_ICONS[mainClass]}
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {(char.classes || []).map((cl, i) => {
            const clc = DND.classColors[cl.name] || C.gold
            return (
              <span key={i} style={{ fontSize: 9, background: clc + '22', border: `1px solid ${clc}44`, padding: '2px 7px', color: clc, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 3, borderRadius: rounded > 0 ? 8 : 0 }}>
                {DND_ICONS[cl.name]} {cl.name} {cl.level}
              </span>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <FullCircleHP current={char.hp.current} max={char.hp.max} color={hpColor} size={62} temp={char.hp.temp || 0} />
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            {[['AC', char.ac], ['SPD', `${char.speed}ft`]].map(([l, v]) => (
              <div key={l} style={{ background: C.surface, border: `1px solid ${C.border}`, padding: '6px 8px', textAlign: 'center', borderRadius: rounded > 0 ? 8 : 0 }}>
                <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2 }}>{l}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={e => { e.stopPropagation(); onExport?.() }}
            style={{ background: 'transparent', border: 'none', color: C.textMuted, cursor: 'pointer', fontSize: 9, padding: 0, fontFamily: 'inherit', letterSpacing: 2, transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = C.gold}
            onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
          >
            {isRacing ? '↓ export' : isKuromi ? '↓ extract' : isMyMelody ? '↓ save ♡' : '[↓] EXPORT'}
          </button>
          <button
            onClick={e => { e.stopPropagation(); if (confirm('Delete this character?')) onDelete(char.id) }}
            style={{ background: 'transparent', border: 'none', color: C.textMuted, cursor: 'pointer', fontSize: 9, padding: 0, fontFamily: 'inherit', letterSpacing: 2, transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = C.red}
            onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
          >
            {isRacing ? '✕ retire' : isKuromi ? '☆ banish' : isMyMelody ? '✕ goodbye' : '[X] DELETE'}
          </button>
        </div>
      </div>
    </div>
  )
}