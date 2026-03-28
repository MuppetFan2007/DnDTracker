import React, { useState } from 'react'
import { useT } from '../themes.js'
import { DND } from '../data/dnd.js'
import { uid, levelLabel } from '../utils.js'
import { CLabel, Btn, useInp } from './UI.jsx'

export function SpellEditor({ spells, onChange }) {
  const C = useT()
  const inp = useInp()

  const [form, setForm] = useState({
    name: '', level: 0, school: 'Evocation', prepared: false,
    castingTime: '1 action', range: '60 ft', components: 'V, S',
    duration: 'Instantaneous', description: '',
  })
  const [openMap, setOpenMap] = useState({})
  const [schoolFilter, setSchoolFilter] = useState('all')

  const add = () => {
    if (!form.name.trim()) return
    onChange([...spells, { ...form, id: uid() }])
    setForm(f => ({ ...f, name: '', description: '' }))
  }
  const remove         = (id) => onChange(spells.filter(s => s.id !== id))
  const togglePrepared = (id) => onChange(spells.map(s => s.id === id ? { ...s, prepared: !s.prepared } : s))
  const toggleOpen     = (id) => setOpenMap(o => ({ ...o, [id]: !o[id] }))

  const filtered      = schoolFilter === 'all' ? spells : spells.filter(s => s.school === schoolFilter)
  const grouped       = filtered.reduce((acc, s) => { (acc[s.level] = acc[s.level] || []).push(s); return acc }, {})
  const activeSchools = DND.schools.filter(s => spells.some(sp => sp.school === s))

  return (
    <div>
      {/* ── Add form ── */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 14, marginBottom: 18 }}>
        <div style={{ fontSize: 10, color: C.gold, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>// Add Spell</div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
          <div>
            <CLabel>Name</CLabel>
            <input style={inp} placeholder="e.g. Fireball" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && add()} />
          </div>
          <div>
            <CLabel>Level</CLabel>
            <select style={inp} value={form.level} onChange={e => setForm(f => ({ ...f, level: +e.target.value }))}>
              {[0,1,2,3,4,5,6,7,8,9].map(l => <option key={l} value={l}>{levelLabel(l)}</option>)}
            </select>
          </div>
          <div>
            <CLabel>School</CLabel>
            <select style={inp} value={form.school} onChange={e => setForm(f => ({ ...f, school: e.target.value }))}>
              {DND.schools.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
          {[['Casting Time','castingTime'],['Range','range'],['Components','components'],['Duration','duration']].map(([l, k]) => (
            <div key={k}>
              <CLabel>{l}</CLabel>
              <input style={inp} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
            </div>
          ))}
        </div>

        <CLabel>Description</CLabel>
        <textarea style={inp} rows={3} placeholder="Effects, higher level scaling..."
          value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 7, color: C.textDim, fontSize: 11, cursor: 'pointer', letterSpacing: 1 }}>
            <input type="checkbox" checked={form.prepared} onChange={e => setForm(f => ({ ...f, prepared: e.target.checked }))} />
            Mark as Prepared
          </label>
          <Btn variant="gold" onClick={add}>+ Add Spell</Btn>
        </div>
      </div>

      {/* ── School filter ── */}
      {spells.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
          <button className="hov-btn" onClick={() => setSchoolFilter('all')}
            style={{ background: schoolFilter === 'all' ? C.gold + '22' : 'transparent', border: `1px solid ${schoolFilter === 'all' ? C.gold : C.border}`, color: schoolFilter === 'all' ? C.gold : C.textDim, padding: '3px 10px', fontSize: 10, fontFamily: 'inherit', letterSpacing: 2, borderRadius: 0 }}>
            ALL ({spells.length})
          </button>
          {activeSchools.map(s => {
            const sc = DND.spellColors[s] || C.gold
            const a  = schoolFilter === s
            return (
              <button key={s} className="hov-btn" onClick={() => setSchoolFilter(a ? 'all' : s)}
                style={{ background: a ? sc + '22' : 'transparent', border: `1px solid ${a ? sc : C.border}`, color: a ? sc : C.textDim, padding: '3px 10px', fontSize: 10, fontFamily: 'inherit', letterSpacing: 1, borderRadius: 0 }}>
                {s} ({spells.filter(sp => sp.school === s).length})
              </button>
            )
          })}
        </div>
      )}

      {/* ── Spell list ── */}
      {Object.keys(grouped).sort((a, b) => +a - +b).map(lvl => {
        const grp = grouped[lvl] || []
        if (!grp.length) return null
        return (
          <div key={lvl} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 9, color: C.gold, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 700 }}>{levelLabel(+lvl)}</div>
              <div style={{ flex: 1, height: 1, background: C.border }} />
              <div style={{ fontSize: 9, color: C.textMuted }}>{grp.length} spell{grp.length !== 1 ? 's' : ''}</div>
            </div>

            {grp.map(sp => {
              const sc = DND.spellColors[sp.school] || C.gold
              return (
                <div key={sp.id} style={{ background: C.card, border: `1px solid ${C.border}`, marginBottom: 5, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 12px', cursor: 'pointer' }} onClick={() => toggleOpen(sp.id)}>
                    <div style={{ width: 3, alignSelf: 'stretch', background: sc, flexShrink: 0 }} />
                    <div className="hov-btn" onClick={e => { e.stopPropagation(); togglePrepared(sp.id) }}
                      style={{ width: 11, height: 11, border: `2px solid ${sp.prepared ? C.gold : C.textMuted}`, background: sp.prepared ? C.gold : 'transparent', flexShrink: 0, padding: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 12, color: C.text, fontWeight: 600, letterSpacing: 1 }}>{sp.name}</span>
                        <span style={{ fontSize: 9, color: sc, background: sc + '22', padding: '1px 5px', letterSpacing: 1 }}>{sp.school}</span>
                        {sp.range && <span style={{ fontSize: 9, color: C.textMuted }}>{sp.range}</span>}
                      </div>
                      <div style={{ fontSize: 9, color: C.textMuted, marginTop: 1 }}>{sp.castingTime} · {sp.components} · {sp.duration}</div>
                    </div>
                    <span style={{ fontSize: 10, color: C.textMuted, display: 'inline-block', transform: openMap[sp.id] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                    <button onClick={e => { e.stopPropagation(); remove(sp.id) }}
                      style={{ background: 'none', border: 'none', color: C.textMuted, cursor: 'pointer', fontSize: 12, padding: '0 3px', fontFamily: 'inherit', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = C.red}
                      onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>✕</button>
                  </div>
                  {openMap[sp.id] && (
                    <div style={{ padding: '8px 14px 12px', borderTop: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                        {sp.description || <span style={{ color: C.textMuted, fontStyle: 'italic' }}>No description.</span>}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}

      {spells.length === 0 && (
        <div style={{ textAlign: 'center', padding: '32px 0', color: C.textMuted, fontSize: 11, letterSpacing: 2 }}>
          NO SPELLS IN DATABASE
        </div>
      )}
    </div>
  )
}
