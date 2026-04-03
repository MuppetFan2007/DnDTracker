import React, { useState } from 'react'
import { useT } from '../themes.js'
import { CONDITIONS } from '../data/conditions.js'

/**
 * ConditionChips
 * Props:
 *   conditions: string[]        — active condition ids
 *   onChange: (string[]) => void  — omit for readonly
 *   size?: 'sm' | 'md'           — default 'sm'
 *   readonly?: boolean
 */
export function ConditionChips({ conditions = [], onChange, size = 'sm', readonly = false }) {
  const C = useT()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [tooltip, setTooltip] = useState(null) // condition id

  const toggle = (id) => {
    if (!onChange) return
    onChange(conditions.includes(id) ? conditions.filter(x => x !== id) : [...conditions, id])
  }

  const activeConds = CONDITIONS.filter(c => conditions.includes(c.id))
  const inactiveConds = CONDITIONS.filter(c => !conditions.includes(c.id))

  const chipStyle = (cond, active) => ({
    fontSize: size === 'md' ? 10 : 9,
    padding: size === 'md' ? '3px 9px' : '2px 7px',
    borderRadius: 10,
    background: active ? `${cond.color}28` : 'transparent',
    border: `1px solid ${active ? cond.color + '88' : C.border}`,
    color: active ? cond.color : C.textMuted,
    fontWeight: active ? 700 : 400,
    cursor: readonly ? 'default' : 'pointer',
    transition: 'all 0.12s',
    flexShrink: 0,
    position: 'relative',
  })

  return (
    <div>
      {/* Active conditions row */}
      {activeConds.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: readonly ? 0 : 6 }}>
          {activeConds.map(cond => (
            <div key={cond.id} style={{ position: 'relative' }}>
              <span
                onClick={() => !readonly && toggle(cond.id)}
                onMouseEnter={() => setTooltip(cond.id)}
                onMouseLeave={() => setTooltip(null)}
                style={chipStyle(cond, true)}
              >
                {cond.label}
                {!readonly && <span style={{ marginLeft: 3, opacity: 0.6, fontSize: 8 }}>✕</span>}
              </span>
              {tooltip === cond.id && (
                <div style={{
                  position: 'absolute', bottom: 'calc(100% + 5px)', left: '50%',
                  transform: 'translateX(-50%)',
                  background: C.surface, border: `1px solid ${cond.color}55`,
                  borderRadius: 5, padding: '6px 9px',
                  fontSize: 10, color: C.textDim, lineHeight: 1.5,
                  maxWidth: 220, whiteSpace: 'normal', wordBreak: 'break-word',
                  zIndex: 9999, pointerEvents: 'none',
                  boxShadow: `0 4px 16px rgba(0,0,0,0.4)`,
                }}>
                  <div style={{ fontWeight: 700, color: cond.color, marginBottom: 3 }}>{cond.label}</div>
                  {cond.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Readonly: done, no picker */}
      {readonly && activeConds.length === 0 && (
        <span style={{ fontSize: 9, color: C.textMuted, opacity: 0.4 }}>No conditions</span>
      )}

      {/* Toggle picker button */}
      {!readonly && (
        <div>
          <button
            onClick={() => setPickerOpen(o => !o)}
            style={{
              fontSize: 9, padding: '2px 8px', cursor: 'pointer',
              background: pickerOpen ? `${C.gold}14` : 'transparent',
              border: `1px solid ${pickerOpen ? C.gold + '55' : C.border}`,
              color: pickerOpen ? C.gold : C.textMuted,
              borderRadius: 4, letterSpacing: 1, textTransform: 'uppercase',
              transition: 'all 0.12s',
            }}
          >
            {pickerOpen ? '✕ Close' : '+ Conditions'}
          </button>

          {pickerOpen && (
            <div style={{
              marginTop: 8, padding: '8px 10px',
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 6,
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {CONDITIONS.map(cond => {
                  const active = conditions.includes(cond.id)
                  return (
                    <div key={cond.id} style={{ position: 'relative' }}>
                      <span
                        onClick={() => toggle(cond.id)}
                        onMouseEnter={() => setTooltip(cond.id)}
                        onMouseLeave={() => setTooltip(null)}
                        style={chipStyle(cond, active)}
                      >
                        {cond.label}
                      </span>
                      {tooltip === cond.id && (
                        <div style={{
                          position: 'absolute', bottom: 'calc(100% + 5px)', left: '50%',
                          transform: 'translateX(-50%)',
                          background: C.surface, border: `1px solid ${cond.color}55`,
                          borderRadius: 5, padding: '6px 9px',
                          fontSize: 10, color: C.textDim, lineHeight: 1.5,
                          maxWidth: 220, whiteSpace: 'normal', wordBreak: 'break-word',
                          zIndex: 9999, pointerEvents: 'none',
                          boxShadow: `0 4px 16px rgba(0,0,0,0.4)`,
                        }}>
                          <div style={{ fontWeight: 700, color: cond.color, marginBottom: 3 }}>{cond.label}</div>
                          {cond.desc}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
