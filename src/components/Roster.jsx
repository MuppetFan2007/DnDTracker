import React, { useState } from 'react'
import { useT, THEMES } from '../themes.js'
import { totalLevel } from '../utils.js'
import { DND_ICONS, Icons } from './Icons.jsx'
import { DND } from '../data/dnd.js'
import { Btn, FullCircleHP } from './UI.jsx'
import { VcrClock } from './VcrClock.jsx'

export function Roster({ chars, onCreate, onOpen, onDelete, themeKey, setThemeKey }) {
  const C = useT()
  const isVcr = themeKey === 'vcr'
  const [search, setSearch] = useState('')
  const filtered = chars.filter(c => (c.name || '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="fade-up" style={{ minHeight: '100vh', padding: '28px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            {isVcr && (
              <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 4, marginBottom: 6 }}>
                ▓▓░ SYSTEM BOOT — LOADING CHARACTER DATABASE ░▓▓
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {isVcr ? (
                <div style={{ borderLeft: `3px solid ${C.gold}`, paddingLeft: 14 }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: C.gold, letterSpacing: 5, fontFamily: "'Orbitron', monospace" }}>D&D 2024</div>
                  <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 3, marginTop: 3 }}>CHARACTER MANAGER // v2.4.1</div>
                </div>
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

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {isVcr && <VcrClock />}
            {/* Theme switcher */}
            <div style={{ display: 'flex', gap: 5, background: C.surface, border: `1px solid ${C.border}`, padding: '4px 6px' }}>
              {Object.entries(THEMES).map(([k, t]) => (
                <button key={k} className="hov-btn" onClick={() => setThemeKey(k)} title={t.name}
                  style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${k === themeKey ? C.gold : 'transparent'}`, background: t.gold, padding: 0, boxShadow: k === themeKey ? `0 0 6px ${t.gold}` : 'none' }} />
              ))}
            </div>
            <Btn variant="gold" onClick={onCreate}>{isVcr ? '> NEW_CHAR.EXE' : '+ New Character'}</Btn>
          </div>
        </div>

        {/* ── Stats strip ── */}
        {chars.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
            {[
              ['Adventurers',    chars.length,                                                                   <Icons.Users key="u" />],
              ['Avg Level',      chars.length ? Math.round(chars.reduce((s, c) => s + totalLevel(c), 0) / chars.length) : 0, <Icons.Star key="s" />],
              ['Spells Known',   chars.reduce((s, c) => s + (c.spells || []).length, 0),                        <Icons.Zap key="z" />],
              ['Unique Classes', new Set(chars.flatMap(c => (c.classes || []).map(cl => cl.name))).size,        <Icons.Book key="b" />],
            ].map(([l, v, ic]) => (
              <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: C.gold, fontSize: 20 }}>{ic}</span>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginTop: 2 }}>{l}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Search ── */}
        {chars.length > 3 && (
          <input
            placeholder={isVcr ? 'SEARCH_QUERY:_' : 'Search adventurers...'}
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: '9px 14px', fontSize: 12, width: '100%', marginBottom: 18, fontFamily: 'inherit', letterSpacing: 1, borderRadius: 0 }}
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
            {filtered.map(c => <CharCard key={c.id} char={c} onOpen={onOpen} onDelete={onDelete} />)}
          </div>
        )}
      </div>
    </div>
  )
}

export function CharCard({ char, onOpen, onDelete }) {
  const C = useT()
  const lvl = totalLevel(char)
  const hpPct = char.hp.max ? char.hp.current / char.hp.max * 100 : 0
  const hpColor = hpPct > 60 ? C.green : hpPct > 30 ? C.yellow : C.red
  const mainClass = (char.classes || [])[0]?.name || 'Fighter'
  const cc = DND.classColors[mainClass] || C.gold
  const isMulti = (char.classes || []).length > 1

  return (
    <div className="hov-card" onClick={() => onOpen(char.id)}
      style={{ background: C.card, border: `1px solid ${C.border}`, overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ height: 2, background: cc, boxShadow: `0 0 8px ${cc}88` }} />
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.gold, letterSpacing: 1, marginBottom: 2 }}>{char.name || 'UNNAMED'}</div>
            <div style={{ fontSize: 10, color: C.textDim, letterSpacing: 1 }}>
              {char.customSpecies || char.species} // LV.{lvl}
              {isMulti && <span style={{ marginLeft: 6, fontSize: 9, color: C.gold, border: `1px solid ${C.gold}55`, padding: '1px 4px' }}>MULTI</span>}
            </div>
          </div>
          <span style={{ color: cc, opacity: 0.7, fontSize: 18 }}>{DND_ICONS[mainClass]}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {(char.classes || []).map((cl, i) => {
            const clc = DND.classColors[cl.name] || C.gold
            return (
              <span key={i} style={{ fontSize: 9, background: clc + '22', border: `1px solid ${clc}44`, padding: '2px 7px', color: clc, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
                {DND_ICONS[cl.name]} {cl.name} {cl.level}
              </span>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <FullCircleHP current={char.hp.current} max={char.hp.max} color={hpColor} size={62} />
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            {[['AC', char.ac], ['SPD', `${char.speed}ft`]].map(([l, v]) => (
              <div key={l} style={{ background: C.surface, border: `1px solid ${C.border}`, padding: '6px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2 }}>{l}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={e => { e.stopPropagation(); if (confirm('Delete this character?')) onDelete(char.id) }}
          style={{ background: 'transparent', border: 'none', color: C.textMuted, cursor: 'pointer', fontSize: 9, padding: 0, width: '100%', textAlign: 'right', fontFamily: 'inherit', letterSpacing: 2, transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = C.red}
          onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
        >
          [X] DELETE
        </button>
      </div>
    </div>
  )
}
