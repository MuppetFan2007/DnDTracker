import React, { useState } from 'react'
import { useT } from '../themes.js'
import { uid } from '../utils.js'
import { SecHdr, Btn } from './UI.jsx'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'

function emptySession(num) {
  return { id: uid(), number: num, date: new Date().toISOString().slice(0, 10), title: '', notes: '' }
}

export function SessionNotesTab({ char, onChange }) {
  const C = useT()
  const sessions = char.sessions || []
  const [expanded, setExpanded] = useState(null)

  const update = (updated) => onChange({ ...char, sessions: updated })

  const addSession = () => {
    const next = emptySession(sessions.length + 1)
    const updated = [next, ...sessions]
    update(updated)
    setExpanded(next.id)
  }

  const editSession = (id, field, val) => {
    update(sessions.map(s => s.id === id ? { ...s, [field]: val } : s))
  }

  const deleteSession = (id) => {
    const updated = sessions.filter(s => s.id !== id)
    // renumber
    update(updated.map((s, i) => ({ ...s, number: updated.length - i })))
    if (expanded === id) setExpanded(null)
  }

  const cardBorder = (s) => `1px solid ${C.border}`

  return (
    <div>
      {/* ── Header bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <SecHdr style={{ margin: 0 }}>Session Log</SecHdr>
          <div style={{
            background: C.gold + '1a', border: `1px solid ${C.gold}44`,
            padding: '4px 14px', fontSize: 11, fontWeight: 700,
            color: C.gold, letterSpacing: 2,
          }}>
            {sessions.length} SESSION{sessions.length !== 1 ? 'S' : ''}
          </div>
        </div>
        <button className="hov-btn" onClick={addSession}
          style={{
            background: C.gold + '18', border: `1px solid ${C.gold}66`,
            color: C.gold, padding: '8px 18px', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 11, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase',
          }}>
          + New Session
        </button>
      </div>

      {sessions.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          color: C.textMuted, fontSize: 13, letterSpacing: 1,
          border: `1px dashed ${C.border}`, background: C.card,
        }}>
          <HistoryEduIcon style={{ fontSize: 36, marginBottom: 12, opacity: 0.3, color: C.textMuted }} />
          No sessions logged yet.<br />
          <span style={{ fontSize: 11, opacity: 0.6 }}>Click "New Session" to record your first adventure.</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sessions.map((s) => {
          const isOpen = expanded === s.id
          return (
            <div key={s.id} style={{ background: C.card, border: cardBorder(s), overflow: 'hidden' }}>
              {/* Collapsed header */}
              <div
                onClick={() => setExpanded(isOpen ? null : s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 14px', cursor: 'pointer',
                  borderLeft: `3px solid ${C.gold}88`,
                  userSelect: 'none',
                }}
              >
                <div style={{
                  minWidth: 32, height: 32, background: C.gold + '18',
                  border: `1px solid ${C.gold}44`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 1,
                  flexShrink: 0,
                }}>
                  {s.number}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 700, color: s.title ? C.text : C.textMuted,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {s.title || `Session ${s.number}`}
                  </div>
                  <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>{s.date}</div>
                </div>
                {!isOpen && s.notes && (
                  <div style={{
                    fontSize: 10, color: C.textMuted, maxWidth: 200,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    display: 'none',
                  }}>
                    {s.notes}
                  </div>
                )}
                <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1 }}>{isOpen ? '▲' : '▼'}</div>
              </div>

              {/* Expanded edit area */}
              {isOpen && (
                <div style={{ padding: '0 14px 16px', borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: 'flex', gap: 12, marginTop: 14, marginBottom: 12, flexWrap: 'wrap' }}>
                    <div style={{ flex: 2, minWidth: 160 }}>
                      <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5 }}>Title</div>
                      <input
                        value={s.title}
                        onChange={e => editSession(s.id, 'title', e.target.value)}
                        placeholder={`Session ${s.number}`}
                        style={{
                          width: '100%', background: C.surface, border: `1px solid ${C.border}`,
                          color: C.text, padding: '7px 10px', fontFamily: 'inherit',
                          fontSize: 13, outline: 'none', boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 120 }}>
                      <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5 }}>Date</div>
                      <input
                        type="date"
                        value={s.date}
                        onChange={e => editSession(s.id, 'date', e.target.value)}
                        style={{
                          width: '100%', background: C.surface, border: `1px solid ${C.border}`,
                          color: C.text, padding: '7px 10px', fontFamily: 'inherit',
                          fontSize: 13, outline: 'none', colorScheme: 'dark', boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div style={{ flex: 0, minWidth: 42, display: 'flex', alignItems: 'flex-end' }}>
                      <button
                        onClick={() => deleteSession(s.id)}
                        className="hov-btn"
                        style={{
                          background: 'transparent', border: `1px solid ${C.red}44`,
                          color: C.red, padding: '7px 12px', cursor: 'pointer',
                          fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
                        }}
                      >✕</button>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5 }}>What happened</div>
                    <textarea
                      value={s.notes}
                      onChange={e => editSession(s.id, 'notes', e.target.value)}
                      placeholder="Write what happened this session..."
                      rows={6}
                      style={{
                        width: '100%', background: C.surface, border: `1px solid ${C.border}`,
                        color: C.text, padding: '10px 12px', fontFamily: 'inherit',
                        fontSize: 13, outline: 'none', resize: 'vertical',
                        lineHeight: 1.6, boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {s.notes.length > 0 && (
                    <div style={{ fontSize: 9, color: C.textMuted, textAlign: 'right', marginTop: 4, letterSpacing: 1 }}>
                      {s.notes.length} chars · ~{Math.ceil(s.notes.split(/\s+/).filter(Boolean).length)} words
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
