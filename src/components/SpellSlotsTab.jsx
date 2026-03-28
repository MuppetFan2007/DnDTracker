import React from 'react'
import { useT } from '../themes.js'
import { computeSpellSlots } from '../data/spellSlots.js'
import { SecHdr } from './UI.jsx'
import { SpellEditor } from './SpellEditor.jsx'

const LEVEL_ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th']
const SLOT_COLORS    = ['#4ade80','#34d399','#22d3ee','#60a5fa','#a78bfa','#e879f9','#f472b6','#fb923c','#facc15']

export function SpellSlotsTab({ char, onChange }) {
  const C = useT()
  const classes = char.classes || []
  const { regularSlots, warlockSlots, casterLevel } = computeSpellSlots(classes)

  const used        = char.spellSlotsUsed  || Array(9).fill(0)
  const warlockUsed = char.warlockSlotsUsed || 0

  const setUsed = (idx, val) => {
    const next = [...used]
    next[idx]  = Math.max(0, Math.min(regularSlots[idx], val))
    onChange({ ...char, spellSlotsUsed: next })
  }

  const setWarlockUsed = (val) => {
    const max = warlockSlots?.count || 0
    onChange({ ...char, warlockSlotsUsed: Math.max(0, Math.min(max, val)) })
  }

  const longRest  = () => onChange({ ...char, spellSlotsUsed: Array(9).fill(0), warlockSlotsUsed: 0 })
  const shortRest = () => onChange({ ...char, warlockSlotsUsed: 0 })

  const hasAnySlots = casterLevel > 0 || warlockSlots

  return (
    <div>
      {!hasAnySlots ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: C.textMuted }}>
          <div style={{ fontSize: 32, marginBottom: 10, opacity: 0.3 }}>🔮</div>
          <div style={{ fontSize: 13, letterSpacing: 1 }}>No spellcasting classes detected.</div>
          <div style={{ fontSize: 11, marginTop: 6, opacity: 0.7 }}>Add a spellcasting class in the Character tab.</div>
        </div>
      ) : (
        <>
          {/* ── Rest buttons ── */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 18, justifyContent: 'flex-end' }}>
            {warlockSlots && (
              <button className="hov-btn" onClick={shortRest}
                style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textDim, padding: '5px 14px', fontSize: 10, fontFamily: 'inherit', letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 0 }}>
                ☽ Short Rest
              </button>
            )}
            <button className="hov-btn" onClick={longRest}
              style={{ background: C.gold + '22', border: `1px solid ${C.gold}`, color: C.gold, padding: '5px 14px', fontSize: 10, fontFamily: 'inherit', letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 0 }}>
              ☀ Long Rest
            </button>
          </div>

          {/* ── Regular slots ── */}
          {casterLevel > 0 && (
            <div style={{ marginBottom: 24 }}>
              <SecHdr>Spell Slots — Caster Level {casterLevel}</SecHdr>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {regularSlots.map((total, i) => {
                  if (total === 0) return null
                  const spent     = used[i] || 0
                  const remaining = total - spent
                  return (
                    <SlotCard
                      key={i}
                      label={LEVEL_ORDINALS[i]}
                      total={total}
                      spent={spent}
                      remaining={remaining}
                      color={SLOT_COLORS[i]}
                      C={C}
                      onUse={() => setUsed(i, spent + 1)}
                      onRestore={() => setUsed(i, spent - 1)}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Warlock Pact Magic ── */}
          {warlockSlots && (
            <div style={{ marginBottom: 24 }}>
              <SecHdr>
                Pact Magic — {LEVEL_ORDINALS[warlockSlots.level - 1]} Level Slots
              </SecHdr>
              <div style={{ display: 'flex', gap: 10 }}>
                <SlotCard
                  label="Pact Slots"
                  total={warlockSlots.count}
                  spent={warlockUsed}
                  remaining={warlockSlots.count - warlockUsed}
                  color="#a78bfa"
                  C={C}
                  wide
                  note="Recharge on Short Rest"
                  onUse={() => setWarlockUsed(warlockUsed + 1)}
                  onRestore={() => setWarlockUsed(warlockUsed - 1)}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Spells list ── */}
      <SecHdr mt={8}>Spells</SecHdr>
      <SpellEditor spells={char.spells || []} onChange={s => onChange({ ...char, spells: s })} />
    </div>
  )
}

// ─── SLOT CARD ────────────────────────────────────────────────────────────────
function SlotCard({ label, total, spent, remaining, color, C, onUse, onRestore, wide, note }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`,
      padding: '12px 14px', flex: wide ? 1 : undefined,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Colour accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: color, boxShadow: `0 0 8px ${color}88` }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 2 }}>{label}</div>
          {note && <div style={{ fontSize: 9, color: C.textMuted, opacity: 0.6 }}>{note}</div>}
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: remaining > 0 ? color : C.textMuted, lineHeight: 1, textShadow: remaining > 0 ? `0 0 10px ${color}66` : 'none' }}>
          {remaining}<span style={{ fontSize: 10, color: C.textMuted, fontWeight: 400 }}>/{total}</span>
        </div>
      </div>

      {/* Pip bubbles — click to toggle */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
        {Array.from({ length: total }, (_, i) => {
          const isSpent = i >= remaining
          return (
            <div key={i}
              className="hov-btn"
              onClick={isSpent ? onRestore : onUse}
              title={isSpent ? 'Click to restore' : 'Click to expend'}
              style={{
                width: 18, height: 18, borderRadius: 3,
                background: isSpent ? 'transparent' : color,
                border: `2px solid ${isSpent ? C.textMuted : color}`,
                boxShadow: isSpent ? 'none' : `0 0 6px ${color}66`,
                transition: 'all 0.15s', cursor: 'pointer',
              }}
            />
          )
        })}
      </div>

      {/* Expend / Restore buttons */}
      <div style={{ display: 'flex', gap: 5 }}>
        <button className="hov-btn" onClick={onUse} disabled={remaining <= 0}
          style={{ flex: 1, background: remaining > 0 ? color + '22' : 'transparent', border: `1px solid ${remaining > 0 ? color : C.border}`, color: remaining > 0 ? color : C.textMuted, padding: '3px 0', fontSize: 11, fontFamily: 'inherit', cursor: remaining > 0 ? 'pointer' : 'not-allowed', opacity: remaining > 0 ? 1 : 0.4 }}>
          − Expend
        </button>
        <button className="hov-btn" onClick={onRestore} disabled={spent <= 0}
          style={{ flex: 1, background: 'transparent', border: `1px solid ${spent > 0 ? C.border : C.border}`, color: spent > 0 ? C.textDim : C.textMuted, padding: '3px 0', fontSize: 11, fontFamily: 'inherit', cursor: spent > 0 ? 'pointer' : 'not-allowed', opacity: spent > 0 ? 1 : 0.4 }}>
          + Restore
        </button>
      </div>
    </div>
  )
}