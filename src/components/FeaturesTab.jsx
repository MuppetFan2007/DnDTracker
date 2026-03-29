import React, { useState } from 'react'
import { useT } from '../themes.js'
import { DND } from '../data/dnd.js'
import { DND_ICONS } from './Icons.jsx'
import { uid } from '../utils.js'
import { useInp } from './UI.jsx'

const emptyFeat = () => ({ id: uid(), name: '', desc: '', limited: false, usesMax: 1, usesLeft: 1 })

function FeatCard({ feat, onUpdate, onRemove, accentColor, C, inp }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      background: open ? C.surface : C.card,
      border: `1px solid ${open ? accentColor + '55' : C.border}`,
      borderLeft: `2px solid ${open ? accentColor : accentColor + '44'}`,
      marginBottom: 5, transition: 'all 0.15s',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 10px', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}>
        <div style={{ flex: 1, fontSize: 11, fontWeight: 600,
          color: open ? accentColor : C.text,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          transition: 'color 0.15s',
        }}>
          {feat.name || <span style={{ color: C.textMuted, fontStyle: 'italic' }}>Unnamed feature</span>}
        </div>

        {/* Limited-use pips */}
        {feat.limited && (
          <div style={{ display: 'flex', gap: 3, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
            {Array.from({ length: Math.min(feat.usesMax, 10) }, (_, i) => {
              const filled = i < feat.usesLeft
              return (
                <div key={i} className="hov-btn"
                  onClick={() => onUpdate({ ...feat, usesLeft: filled ? feat.usesLeft - 1 : Math.min(feat.usesMax, feat.usesLeft + 1) })}
                  title={filled ? 'Click to use' : 'Click to restore'}
                  style={{
                    width: 9, height: 9, flexShrink: 0,
                    border: `1.5px solid ${accentColor}`,
                    background: filled ? accentColor : 'transparent',
                    cursor: 'pointer', transition: 'all 0.12s',
                    boxShadow: filled ? `0 0 4px ${accentColor}66` : 'none',
                  }} />
              )
            })}
            {feat.usesMax > 10 && (
              <span style={{ fontSize: 8, color: C.textMuted }}>{feat.usesLeft}/{feat.usesMax}</span>
            )}
          </div>
        )}

        <span style={{ fontSize: 9, color: C.textMuted, flexShrink: 0,
          transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
      </div>

      {/* Expanded body */}
      {open && (
        <div style={{ padding: '0 10px 12px 10px', borderTop: `1px solid ${C.border}33` }}>
          {/* Name */}
          <input
            value={feat.name}
            onChange={e => onUpdate({ ...feat, name: e.target.value })}
            placeholder="Feature name..."
            autoFocus
            style={{ ...inp, fontSize: 11, padding: '6px 8px', marginTop: 8, marginBottom: 7 }}
          />

          {/* Description */}
          <textarea
            value={feat.desc}
            onChange={e => onUpdate({ ...feat, desc: e.target.value })}
            placeholder="Description, mechanics, source..."
            rows={3}
            style={{ ...inp, fontSize: 11, resize: 'vertical', marginBottom: 9 }}
          />

          {/* Options row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: C.textDim, cursor: 'pointer', userSelect: 'none' }}>
              <input type="checkbox" checked={feat.limited}
                onChange={e => onUpdate({ ...feat, limited: e.target.checked, usesLeft: e.target.checked ? feat.usesMax : feat.usesLeft })} />
              Limited uses
            </label>

            {feat.limited && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>Max</span>
                  <input type="number" min={1} max={20} value={feat.usesMax}
                    onChange={e => {
                      const max = Math.max(1, +e.target.value)
                      onUpdate({ ...feat, usesMax: max, usesLeft: Math.min(feat.usesLeft, max) })
                    }}
                    style={{ ...inp, width: 50, textAlign: 'center', padding: '3px 4px', fontSize: 12 }} />
                </div>
                <button className="hov-btn" onClick={() => onUpdate({ ...feat, usesLeft: feat.usesMax })}
                  style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textDim,
                    padding: '3px 8px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 9, letterSpacing: 1 }}>
                  ↺ Restore
                </button>
              </>
            )}

            <button
              className="hov-btn"
              onClick={onRemove}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: C.textMuted,
                cursor: 'pointer', fontSize: 10, fontFamily: 'inherit', padding: '3px 0' }}
              onMouseEnter={e => e.currentTarget.style.color = C.red}
              onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
            >
              ✕ Remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function FeatureSection({ title, feats = [], onUpdate, accentColor, C, inp }) {
  const add = () => onUpdate([...feats, emptyFeat()])
  const upd = (id, patch) => onUpdate(feats.map(f => f.id === id ? patch : f))
  const del = (id) => onUpdate(feats.filter(f => f.id !== id))

  return (
    <div>
      <div style={{
        fontSize: 9, fontWeight: 700, color: accentColor, letterSpacing: 3, textTransform: 'uppercase',
        marginBottom: 8, paddingBottom: 5,
        borderBottom: `1px solid ${accentColor}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span>{title}</span>
        <span style={{ fontSize: 8, color: C.textMuted, fontWeight: 400, letterSpacing: 1 }}>
          {feats.length > 0 ? `${feats.filter(f => !f.limited || f.usesLeft > 0).length}/${feats.length}` : ''}
        </span>
      </div>

      {feats.length === 0 && (
        <div style={{ fontSize: 10, color: C.textMuted, padding: '6px 0', letterSpacing: 1 }}>
          No features yet.
        </div>
      )}

      {feats.map(feat => (
        <FeatCard key={feat.id} feat={feat} accentColor={accentColor} C={C} inp={inp}
          onUpdate={patch => upd(feat.id, patch)}
          onRemove={() => del(feat.id)} />
      ))}

      <button className="hov-btn" onClick={add}
        style={{
          width: '100%', marginTop: feats.length ? 4 : 0,
          background: 'transparent', border: `1px dashed ${C.border}`,
          color: C.textMuted, padding: '6px', fontSize: 9,
          fontFamily: 'inherit', letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
        }}>
        + Add Feature
      </button>
    </div>
  )
}

export function FeaturesTab({ char, onChange }) {
  const C   = useT()
  const inp = useInp()
  const classes = char.classes || []

  const updateClassFeats = (idx, key, feats) => {
    onChange({
      ...char,
      classes: classes.map((cl, i) => i === idx ? { ...cl, [key]: feats } : cl),
    })
  }

  const longRest = () => {
    const reset = (feats = []) => feats.map(f => ({ ...f, usesLeft: f.usesMax }))
    onChange({
      ...char,
      classes: classes.map(cl => ({
        ...cl,
        classFeats:    reset(cl.classFeats),
        subclassFeats: reset(cl.subclassFeats),
      })),
      speciesFeats: reset(char.speciesFeats),
      bgFeats:      reset(char.bgFeats),
      otherFeats:   reset(char.otherFeats),
    })
  }

  // Grid cols scale with class count
  const classCols = Math.min(Math.max(classes.length, 1), 3)

  return (
    <div>
      {/* Long Rest */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
        <button className="hov-btn" onClick={longRest}
          style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textDim,
            padding: '5px 14px', fontSize: 10, fontFamily: 'inherit', letterSpacing: 2,
            textTransform: 'uppercase', cursor: 'pointer' }}>
          ☀ Long Rest — Restore All
        </button>
      </div>

      {/* Per-class cards */}
      {classes.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${classCols}, 1fr)`, gap: 14, marginBottom: 20 }}>
          {classes.map((cl, idx) => {
            const cc = DND.classColors?.[cl.name] || C.gold
            return (
              <div key={idx} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderTop: `3px solid ${cc}`, padding: '14px',
              }}>
                {/* Class header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14,
                  paddingBottom: 10, borderBottom: `1px solid ${cc}33` }}>
                  <span style={{ fontSize: 20, color: cc, lineHeight: 1 }}>
                    {DND_ICONS[cl.name] || '⚔'}
                  </span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: cc, letterSpacing: 1, textTransform: 'uppercase' }}>
                      {cl.name} {cl.level}
                    </div>
                    {cl.subclass && (
                      <div style={{ fontSize: 9, color: C.textMuted, marginTop: 2 }}>{cl.subclass}</div>
                    )}
                  </div>
                  {/* Used feature count badge */}
                  {(() => {
                    const allFeats = [...(cl.classFeats || []), ...(cl.subclassFeats || [])]
                    const limited = allFeats.filter(f => f.limited)
                    if (!limited.length) return null
                    const spent = limited.filter(f => f.usesLeft < f.usesMax).length
                    return (
                      <div style={{ marginLeft: 'auto', fontSize: 9, color: spent ? C.yellow : C.green, letterSpacing: 1 }}>
                        {spent ? `${spent} spent` : 'full'}
                      </div>
                    )
                  })()}
                </div>

                {/* Base class features */}
                <FeatureSection
                  title="Class Features"
                  feats={cl.classFeats || []}
                  onUpdate={feats => updateClassFeats(idx, 'classFeats', feats)}
                  accentColor={cc}
                  C={C} inp={inp}
                />

                {/* Subclass features */}
                <div style={{ marginTop: 16 }}>
                  {cl.subclass ? (
                    <FeatureSection
                      title={`${cl.subclass}`}
                      feats={cl.subclassFeats || []}
                      onUpdate={feats => updateClassFeats(idx, 'subclassFeats', feats)}
                      accentColor={cc + 'cc'}
                      C={C} inp={inp}
                    />
                  ) : (
                    <div style={{ border: `1px dashed ${C.border}`, padding: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1 }}>
                        Set a subclass in the Character tab to unlock subclass features
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Species / Background / Other */}
      <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '14px' }}>
          <FeatureSection
            title={`${char.customSpecies || char.species || 'Species'} Traits`}
            feats={char.speciesFeats || []}
            onUpdate={feats => onChange({ ...char, speciesFeats: feats })}
            accentColor={C.blue}
            C={C} inp={inp}
          />
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '14px' }}>
          <FeatureSection
            title={`${char.background || 'Background'} Features`}
            feats={char.bgFeats || []}
            onUpdate={feats => onChange({ ...char, bgFeats: feats })}
            accentColor={C.green}
            C={C} inp={inp}
          />
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '14px' }}>
          <FeatureSection
            title="Other Traits"
            feats={char.otherFeats || []}
            onUpdate={feats => onChange({ ...char, otherFeats: feats })}
            accentColor={C.yellow}
            C={C} inp={inp}
          />
        </div>
      </div>
    </div>
  )
}
