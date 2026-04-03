import React, { useState, useMemo } from 'react'
import { useT } from '../themes.js'
import { mod, fmt, profB, totalLevel } from '../utils.js'
import { FullCircleHP } from './UI.jsx'
import { DND } from '../data/dnd.js'
import { DND_ICONS } from './Icons.jsx'
import { ConditionChips } from './ConditionChips.jsx'
import { computeSpellSlots } from '../data/spellSlots.js'
import { CONDITIONS } from '../data/conditions.js'
import BedtimeIcon        from '@mui/icons-material/Bedtime'
import SkipNextIcon       from '@mui/icons-material/SkipNext'
import OpenInNewIcon      from '@mui/icons-material/OpenInNew'
import WhatshotIcon       from '@mui/icons-material/Whatshot'
import LocalHospitalIcon  from '@mui/icons-material/LocalHospital'
import BoltIcon           from '@mui/icons-material/Bolt'
import PersonAddIcon      from '@mui/icons-material/PersonAdd'

export function Party({ chars, onSave, onOpen, themeKey }) {
  const C = useT()

  if (chars.length === 0) {
    return (
      <div className="fade-up" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '40px',
      }}>
        <div style={{ textAlign: 'center', opacity: 0.45 }}>
          <div style={{ fontSize: 60, marginBottom: 20, color: C.textMuted }}>⚔</div>
          <div style={{ fontSize: 16, color: C.textMuted, letterSpacing: 2 }}>No characters in party</div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 8 }}>Create characters first</div>
        </div>
      </div>
    )
  }

  const longRestAll = () => {
    chars.forEach(c => onSave({
      ...c,
      hp: { ...c.hp, current: c.hp.max, temp: 0 },
      spellSlotsUsed: Array(9).fill(0),
      warlockSlotsUsed: 0,
      combatUsed: {},
      conditions: [],
    }))
  }

  const newTurnAll = () => {
    chars.forEach(c => onSave({ ...c, combatUsed: {} }))
  }

  return (
    <div className="fade-up" style={{ padding: '24px 28px', minHeight: '100vh' }}>
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.gold, letterSpacing: 1 }}>Party</div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 3, marginTop: 2, textTransform: 'uppercase' }}>
            Session Companion · {chars.length} adventurer{chars.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={newTurnAll} style={headerBtn(C, '#60a5fa')}>
            <SkipNextIcon style={{ fontSize: 14 }} /> New Turn
          </button>
          <button onClick={longRestAll} style={headerBtn(C, C.gold)}>
            <BedtimeIcon style={{ fontSize: 14 }} /> Long Rest All
          </button>
        </div>
      </div>

      {/* ── Party condition overview strip ── */}
      <PartyConditionStrip chars={chars} C={C} />

      {/* ── Character cards grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
        {chars.map(char => (
          <PartyCard key={char.id} char={char} onSave={onSave} onOpen={onOpen} C={C} />
        ))}
      </div>
    </div>
  )
}

/* ── Party-wide condition overview ── */
function PartyConditionStrip({ chars, C }) {
  const entries = chars.flatMap(c =>
    (c.conditions || []).map(cid => {
      const cond = CONDITIONS.find(x => x.id === cid)
      return cond ? { cond, charName: c.name } : null
    }).filter(Boolean)
  )
  if (entries.length === 0) return null

  return (
    <div style={{
      background: C.card, border: `1px solid #ef444433`,
      borderRadius: 6, padding: '10px 16px', marginBottom: 18,
      borderLeft: '3px solid #ef4444',
    }}>
      <div style={{ fontSize: 9, color: '#ef4444', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>
        ⚠ Active Conditions
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {entries.map(({ cond, charName }, i) => (
          <span key={i} style={{
            fontSize: 9, padding: '2px 8px', borderRadius: 10,
            background: `${cond.color}22`, border: `1px solid ${cond.color}55`,
            color: cond.color, fontWeight: 600,
          }}>
            {charName}: {cond.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Individual character card ── */
function PartyCard({ char, onSave, onOpen, C }) {
  const [hpDelta,   setHpDelta]   = useState('')
  const [hpMode,    setHpMode]    = useState(null) // null | 'damage' | 'heal'
  const [showSlots, setShowSlots] = useState(false)

  const lvl      = totalLevel(char)
  const pb       = profB(lvl)
  const dexMod   = mod(char.stats?.dex ?? 10)
  const hpPct    = char.hp.max ? char.hp.current / char.hp.max : 0
  const hpColor  = hpPct > 0.6 ? '#22c55e' : hpPct > 0.3 ? '#f59e0b' : '#ef4444'
  const mainClass = (char.classes || [])[0]?.name || 'Fighter'
  const cc       = DND.classColors[mainClass] || C.gold

  const used    = char.combatUsed || {}
  const setUsed = (patch) => onSave({ ...char, combatUsed: { ...used, ...patch } })
  const newTurn = () => onSave({ ...char, combatUsed: {} })

  const adjustHp = (delta) => {
    const next = Math.max(0, Math.min(char.hp.max, char.hp.current + delta))
    onSave({ ...char, hp: { ...char.hp, current: next } })
    setHpDelta(''); setHpMode(null)
  }

  const { regularSlots, warlockSlots } = useMemo(
    () => computeSpellSlots(char.classes || []),
    [char.classes]
  )

  const slotLevels = regularSlots
    .map((total, i) => ({ level: i + 1, total, used: char.spellSlotsUsed?.[i] ?? 0 }))
    .filter(s => s.total > 0)
    .slice(0, 5)

  const spendSlot  = (i) => {
    const next = [...(char.spellSlotsUsed || Array(9).fill(0))]
    if (next[i] < regularSlots[i]) { next[i]++; onSave({ ...char, spellSlotsUsed: next }) }
  }
  const restoreSlot = (i) => {
    const next = [...(char.spellSlotsUsed || Array(9).fill(0))]
    if (next[i] > 0) { next[i]--; onSave({ ...char, spellSlotsUsed: next }) }
  }

  const hasConds = (char.conditions || []).length > 0

  return (
    <div style={{
      background: C.card, border: `1px solid ${hasConds ? '#f59e0b55' : C.border}`,
      borderRadius: 8, overflow: 'hidden',
      boxShadow: hasConds ? '0 0 16px rgba(245,158,11,0.12)' : '0 2px 12px rgba(0,0,0,0.2)',
      transition: 'border-color 0.2s',
    }}>
      {/* Top accent stripe */}
      <div style={{ height: 2, background: `linear-gradient(90deg,${cc},${cc}44,transparent)` }} />

      <div style={{ padding: '14px 16px' }}>
        {/* ── Name row ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <FullCircleHP current={char.hp.current} max={char.hp.max} color={hpColor} size={72} temp={char.hp.temp || 0} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ fontSize: 15, color: cc }}>{DND_ICONS[mainClass]}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {char.name || 'Unnamed'}
              </span>
            </div>
            <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 8 }}>
              {(char.classes || []).map(cl => `${cl.name} ${cl.level}`).join(' / ')} · LV{lvl}
            </div>

            {/* Stat row */}
            <div style={{ display: 'flex', gap: 6 }}>
              {[['AC', char.ac], ['SPD', `${char.speed}ft`], ['INIT', fmt((char.initiative||0)+dexMod)], ['PROF', `+${pb}`]].map(([l, v]) => (
                <div key={l} style={{
                  background: C.surface, border: `1px solid ${C.border}`,
                  padding: '4px 7px', textAlign: 'center', borderRadius: 3,
                }}>
                  <div style={{ fontSize: 7, color: C.textMuted, letterSpacing: 1.5, textTransform: 'uppercase' }}>{l}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Open sheet button */}
          <button onClick={() => onOpen(char.id)}
            style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 4, padding: '6px 8px', cursor: 'pointer', color: C.textMuted, display: 'flex', alignItems: 'center' }}>
            <OpenInNewIcon style={{ fontSize: 14 }} />
          </button>
        </div>

        {/* ── Conditions ── */}
        <div style={{ marginBottom: 12 }}>
          <ConditionChips
            conditions={char.conditions || []}
            onChange={conds => onSave({ ...char, conditions: conds })}
            size="sm"
          />
        </div>

        {/* ── Action economy ── */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 12, alignItems: 'center' }}>
          {[
            { key: 'action',   label: 'Action',   color: '#4ade80' },
            { key: 'bonus',    label: 'Bonus',    color: '#60a5fa' },
            { key: 'reaction', label: 'Reaction', color: '#f472b6' },
          ].map(({ key, label, color }) => {
            const isUsed = !!used[key]
            return (
              <button key={key} onClick={() => setUsed({ [key]: !isUsed })}
                style={{
                  flex: 1, padding: '5px 0', fontSize: 9, cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: isUsed ? 400 : 700,
                  background: isUsed ? 'transparent' : `${color}18`,
                  border: `1px solid ${isUsed ? C.border : color + '66'}`,
                  color: isUsed ? C.textMuted : color,
                  textDecoration: isUsed ? 'line-through' : 'none',
                  textTransform: 'uppercase', letterSpacing: 0.8, borderRadius: 3,
                  transition: 'all 0.1s',
                }}>
                {label}
              </button>
            )
          })}
          <button onClick={newTurn}
            style={{
              padding: '5px 9px', fontSize: 9, cursor: 'pointer',
              fontFamily: 'inherit', background: 'transparent',
              border: `1px solid ${C.border}`, color: C.textMuted,
              letterSpacing: 0.8, textTransform: 'uppercase', borderRadius: 3,
              display: 'flex', alignItems: 'center', gap: 3,
            }}>
            <SkipNextIcon style={{ fontSize: 12 }} />
          </button>
        </div>

        {/* ── HP quick adjust ── */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {[-10, -5, -1].map(n => (
              <button key={n} onClick={() => adjustHp(n)}
                style={{ ...quickBtn(C), background: '#ef444415', border: '1px solid #ef444433', color: '#ef4444' }}>
                {n}
              </button>
            ))}
            <input
              value={hpDelta}
              onChange={e => setHpDelta(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="amt"
              style={{
                flex: 1, padding: '4px 6px', textAlign: 'center', fontSize: 11,
                background: C.surface, border: `1px solid ${C.border}`,
                color: C.text, borderRadius: 3, fontFamily: 'inherit', minWidth: 0,
              }}
            />
            {[+1, +5, +10].map(n => (
              <button key={n} onClick={() => adjustHp(n)}
                style={{ ...quickBtn(C), background: '#22c55e15', border: '1px solid #22c55e33', color: '#22c55e' }}>
                +{n}
              </button>
            ))}
          </div>
          {hpDelta && (
            <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
              <button onClick={() => adjustHp(-Math.abs(+hpDelta))}
                style={{ flex: 1, ...quickBtnFull(C, '#ef4444') }}>
                <WhatshotIcon style={{ fontSize: 12 }} /> Dmg {hpDelta}
              </button>
              <button onClick={() => adjustHp(+Math.abs(+hpDelta))}
                style={{ flex: 1, ...quickBtnFull(C, '#22c55e') }}>
                <LocalHospitalIcon style={{ fontSize: 12 }} /> Heal {hpDelta}
              </button>
            </div>
          )}
        </div>

        {/* ── Spell slots ── */}
        {slotLevels.length > 0 && (
          <div>
            <button onClick={() => setShowSlots(s => !s)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 5, marginBottom: showSlots ? 7 : 0 }}>
              <BoltIcon style={{ fontSize: 12, color: '#a855f7' }} />
              <span style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                Slots {showSlots ? '▴' : '▾'}
              </span>
            </button>
            {showSlots && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {slotLevels.map(({ level, total, used: usedCount }) => {
                  const avail = total - usedCount
                  return (
                    <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 9, color: C.textMuted, width: 14, flexShrink: 0, textAlign: 'right' }}>{level}</span>
                      <div style={{ display: 'flex', gap: 3 }}>
                        {Array.from({ length: total }).map((_, i) => {
                          const filled = i < avail
                          return (
                            <button key={i}
                              onClick={() => filled ? spendSlot(level-1) : restoreSlot(level-1)}
                              style={{
                                width: 12, height: 12, borderRadius: '50%', cursor: 'pointer', border: 'none', padding: 0,
                                background: filled ? '#a855f7' : 'transparent',
                                outline: `1.5px solid ${filled ? '#a855f7' : '#a855f744'}`,
                                boxShadow: filled ? '0 0 5px #a855f766' : 'none',
                              }}
                            />
                          )
                        })}
                      </div>
                      <span style={{ fontSize: 9, color: C.textMuted }}>
                        {avail}/{total}
                      </span>
                    </div>
                  )
                })}
                {warlockSlots && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderTop: `1px solid ${C.border}44`, paddingTop: 5 }}>
                    <span style={{ fontSize: 9, color: '#ec4899', width: 14, flexShrink: 0, textAlign: 'right' }}>W</span>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {Array.from({ length: warlockSlots.count }).map((_, i) => {
                        const usedW = char.warlockSlotsUsed || 0
                        const filled = i >= usedW
                        return (
                          <button key={i}
                            onClick={() => {
                              const next = filled ? usedW + 1 : usedW - 1
                              onSave({ ...char, warlockSlotsUsed: Math.max(0, Math.min(warlockSlots.count, next)) })
                            }}
                            style={{
                              width: 12, height: 12, borderRadius: 2, cursor: 'pointer', border: 'none', padding: 0,
                              background: filled ? '#ec4899' : 'transparent',
                              outline: `1.5px solid ${filled ? '#ec4899' : '#ec489944'}`,
                            }}
                          />
                        )
                      })}
                    </div>
                    <span style={{ fontSize: 9, color: '#ec4899' }}>Pact (Lv{warlockSlots.level})</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function headerBtn(C, color) {
  return {
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '7px 14px', fontSize: 11, cursor: 'pointer',
    background: `${color}14`, border: `1px solid ${color}55`,
    color, borderRadius: 4, fontFamily: 'inherit',
    fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
  }
}

function quickBtn(C) {
  return {
    padding: '4px 6px', fontSize: 10, cursor: 'pointer',
    borderRadius: 3, fontFamily: 'inherit', fontWeight: 700,
    flexShrink: 0,
  }
}

function quickBtnFull(C, color) {
  return {
    padding: '5px 0', fontSize: 10, cursor: 'pointer',
    background: `${color}15`, border: `1px solid ${color}44`,
    color, borderRadius: 3, fontFamily: 'inherit',
    fontWeight: 600, display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: 4,
  }
}
