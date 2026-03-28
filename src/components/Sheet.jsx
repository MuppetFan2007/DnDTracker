import React, { useState } from 'react'
import { useT } from '../themes.js'
import { DND } from '../data/dnd.js'
import { mod, fmt, profB, totalLevel } from '../utils.js'
import { DND_ICONS } from './Icons.jsx'
import { CLabel, SecHdr, Btn, useInp, FullCircleHP } from './UI.jsx'
import { SpellEditor } from './SpellEditor.jsx'

export function Sheet({ char, onChange, onBack }) {
  const C   = useT()
  const inp = useInp()
  const [tab,     setTab]     = useState('core')
  const [editing, setEditing] = useState(false)

  const set  = (k, v)    => onChange({ ...char, [k]: v })
  const setN = (o, k, v) => onChange({ ...char, [o]: { ...char[o], [k]: v } })

  const lvl      = totalLevel(char)
  const pb       = profB(lvl)
  const getSave  = (s)  => mod(char.stats[s]) + (char.savingThrowProfs.includes(s) ? pb : 0)
  const getSkill = (sk) => mod(char.stats[DND.skillStat[sk]]) + (char.skillProfs.includes(sk) ? pb : 0)
  const hpPct    = char.hp.max ? char.hp.current / char.hp.max * 100 : 0
  const hpColor  = hpPct > 60 ? C.green : hpPct > 30 ? C.yellow : C.red

  const TABS = ['core', 'skills', 'spells', 'character']

  const updateClass = (idx, field, val) => {
    const cls = [...(char.classes || [])]
    cls[idx] = { ...cls[idx], [field]: val }
    set('classes', cls)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ── Header ── */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '11px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Btn onClick={onBack}>← Back</Btn>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, color: C.gold, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>{char.name}</div>
            <div style={{ fontSize: 9, color: C.textMuted, display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2, letterSpacing: 2, alignItems: 'center' }}>
              <span>{char.customSpecies || char.species}</span>
              {(char.classes || []).map((cl, i) => (
                <span key={i} style={{ color: DND.classColors[cl.name] || C.gold }}>· {cl.name} {cl.level}</span>
              ))}
              <span>· LV {lvl}</span>
            </div>
          </div>
          <Btn variant={editing ? 'gold' : 'default'} onClick={() => setEditing(e => !e)}>
            {editing ? '✓ Done' : '✎ Edit'}
          </Btn>
        </div>
      </div>

      {/* ── Combat bar ── */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: '14px 20px' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <FullCircleHP current={char.hp.current} max={char.hp.max} color={hpColor} size={90} />
            {!editing ? (
              <div style={{ display: 'flex', gap: 5 }}>
                <Btn onClick={() => setN('hp', 'current', Math.max(0, char.hp.current - 1))} style={{ padding: '3px 10px' }}>−</Btn>
                <Btn onClick={() => setN('hp', 'current', Math.min(char.hp.max, char.hp.current + 1))} style={{ padding: '3px 10px' }}>+</Btn>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                <input type="number" value={char.hp.current} onChange={e => setN('hp', 'current', +e.target.value)} style={{ ...inp, width: 50, textAlign: 'center' }} />
                <span style={{ color: C.textMuted }}>/</span>
                <input type="number" value={char.hp.max} onChange={e => setN('hp', 'max', +e.target.value)} style={{ ...inp, width: 50, textAlign: 'center' }} />
              </div>
            )}
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {[['AC','ac',char.ac],['SPEED','speed',`${char.speed}ft`],['INIT',null,fmt(char.initiative + mod(char.stats.dex))],['PROF',null,`+${pb}`]].map(([label, path, val]) => (
              <div key={label} style={{ background: C.surface, border: `1px solid ${C.border}`, padding: '9px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 3 }}>{label}</div>
                {editing && path
                  ? <input type="number" value={char[path]} onChange={e => set(path, +e.target.value)} style={{ ...inp, textAlign: 'center', fontSize: 17, padding: '2px' }} />
                  : <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{val}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: C.surface }}>
        {TABS.map(t => (
          <button key={t} className="hov-btn" onClick={() => setTab(t)}
            style={{ background: 'transparent', border: 'none', borderBottom: `2px solid ${tab === t ? C.gold : 'transparent'}`, color: tab === t ? C.gold : C.textMuted, padding: '10px 18px', cursor: 'pointer', fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, fontFamily: 'inherit' }}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div style={{ padding: '20px', maxWidth: 860, margin: '0 auto' }}>
        <div className="fade-up" key={tab}>
          {tab === 'core'      && <TabCore      char={char} onChange={onChange} set={set} setN={setN} editing={editing} inp={inp} getSave={getSave} getSkill={getSkill} pb={pb} hpColor={hpColor} C={C} />}
          {tab === 'skills'    && <TabSkills    char={char} set={set} getSkill={getSkill} C={C} />}
          {tab === 'spells'    && <SpellEditor  spells={char.spells || []} onChange={s => set('spells', s)} />}
          {tab === 'character' && <TabCharacter char={char} set={set} setN={setN} editing={editing} inp={inp} updateClass={updateClass} C={C} />}
        </div>
      </div>
    </div>
  )
}

/* ── Tab: Core ── */
function TabCore({ char, onChange, set, setN, editing, inp, getSave, getSkill, pb, hpColor, C }) {
  return (
    <div>
      {/* Ability scores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 7, marginBottom: 14 }}>
        {['str','dex','con','int','wis','cha'].map(s => (
          <div key={s} style={{ background: C.card, border: `1px solid ${C.border}`, padding: '10px 5px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 5 }}>{s}</div>
            {editing
              ? <input type="number" value={char.stats[s]} min={1} max={30} onChange={e => onChange({ ...char, stats: { ...char.stats, [s]: +e.target.value } })} style={{ ...inp, textAlign: 'center', fontSize: 20, padding: '3px 2px' }} />
              : <div style={{ fontSize: 24, fontWeight: 700, color: C.text }}>{char.stats[s]}</div>}
            <div style={{ marginTop: 5, background: C.surface, padding: '1px 6px', display: 'inline-block', border: `1px solid ${C.border}`, fontSize: 11, color: C.gold }}>{fmt(mod(char.stats[s]))}</div>
            <div style={{ marginTop: 7, display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
              <div className="hov-btn"
                onClick={() => onChange({ ...char, savingThrowProfs: char.savingThrowProfs.includes(s) ? char.savingThrowProfs.filter(x => x !== s) : [...char.savingThrowProfs, s] })}
                style={{ width: 9, height: 9, cursor: 'pointer', border: `1px solid ${C.textMuted}`, background: char.savingThrowProfs.includes(s) ? C.gold : 'transparent', transition: 'all 0.15s' }} />
              <span style={{ fontSize: 8, color: C.textMuted }}>SAVE {fmt(getSave(s))}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, marginBottom: 12 }}>
        {[['Passive Perc.', 10 + getSkill('Perception')], ['Prof Bonus', `+${pb}`], ['Inspiration', char.inspiration ? '★ YES' : 'No']].map(([l, v]) => (
          <div key={l} className={l === 'Inspiration' ? 'hov-btn' : ''} onClick={() => l === 'Inspiration' && set('inspiration', !char.inspiration)}
            style={{ background: C.card, border: `1px solid ${l === 'Inspiration' && char.inspiration ? C.gold : C.border}`, padding: '9px 12px', textAlign: 'center', cursor: l === 'Inspiration' ? 'pointer' : 'default', boxShadow: l === 'Inspiration' && char.inspiration ? `0 0 10px ${C.gold}44` : 'none' }}>
            <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 3 }}>{l}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: l === 'Inspiration' && char.inspiration ? C.gold : C.text }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Death saves + Temp HP */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 12 }}>
          <SecHdr>Death Saves</SecHdr>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Successes','successes',C.green],['Failures','failures',C.red]].map(([label, key, color]) => (
              <div key={key}>
                <div style={{ fontSize: 9, color: C.textMuted, marginBottom: 5 }}>{label}</div>
                <div style={{ display: 'flex', gap: 5 }}>
                  {[0,1,2].map(i => (
                    <div key={i} className="hov-btn"
                      onClick={() => setN('deathSaves', key, i + 1 === char.deathSaves[key] ? i : i + 1)}
                      style={{ width: 17, height: 17, cursor: 'pointer', border: `2px solid ${i < char.deathSaves[key] ? color : C.textMuted}`, background: i < char.deathSaves[key] ? color : 'transparent', transition: 'all 0.15s' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 12 }}>
          <SecHdr>Temporary HP</SecHdr>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <input type="number" value={char.hp.temp} onChange={e => setN('hp', 'temp', Math.max(0, +e.target.value))} style={{ ...inp, width: 80 }} />
            {char.hp.temp > 0 && <span style={{ color: C.blue, fontSize: 11 }}>+{char.hp.temp} temp</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Tab: Skills ── */
function TabSkills({ char, set, getSkill, C }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
      {DND.skills.map(sk => {
        const a = char.skillProfs.includes(sk)
        const m = getSkill(sk)
        return (
          <div key={sk} className="chip-toggle"
            onClick={() => set('skillProfs', a ? char.skillProfs.filter(x => x !== sk) : [...char.skillProfs, sk])}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px', background: a ? C.activeSkill : C.card, border: `1px solid ${a ? C.activeBorder : C.border}` }}>
            <div style={{ width: 9, height: 9, flexShrink: 0, background: a ? C.gold : 'transparent', border: `2px solid ${a ? C.gold : C.textMuted}`, transition: 'all 0.15s' }} />
            <span style={{ flex: 1, fontSize: 12, color: a ? C.text : C.textDim }}>{sk}</span>
            <span style={{ fontSize: 9, color: C.textMuted }}>{DND.skillStat[sk].toUpperCase()}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: a ? C.gold : C.textMuted, minWidth: 24, textAlign: 'right' }}>{fmt(m)}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ── Tab: Character ── */
function TabCharacter({ char, set, setN, editing, inp, updateClass, C }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      {/* Left col */}
      <div>
        <SecHdr>Classes</SecHdr>
        {(char.classes || []).map((cl, idx) => {
          const cc  = DND.classColors[cl.name] || C.gold
          return (
            <div key={idx} style={{ background: C.card, border: `1px solid ${C.border}`, padding: 11, marginBottom: 7, borderLeft: `3px solid ${cc}` }}>
              <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginBottom: 7 }}>
                <span style={{ color: cc }}>{DND_ICONS[cl.name]}</span>
                {editing ? (
                  <>
                    <select value={cl.name} onChange={e => updateClass(idx, 'name', e.target.value)} style={{ ...inp, flex: 1 }}>
                      {DND.classes.map(c => <option key={c.name}>{c.name}</option>)}
                    </select>
                    <input type="number" min={1} max={20} value={cl.level} onChange={e => updateClass(idx, 'level', +e.target.value)} style={{ ...inp, width: 56 }} />
                  </>
                ) : <span style={{ color: cc, fontWeight: 700, letterSpacing: 2, fontSize: 11 }}>{cl.name} {cl.level}</span>}
              </div>
              <input style={{ ...inp, marginBottom: 5 }} placeholder="Subclass name..."
                value={cl.subclass || ''} onChange={e => updateClass(idx, 'subclass', e.target.value)} disabled={!editing} />
              <textarea style={{ ...inp, minHeight: 30 }} placeholder="Subclass features..."
                value={cl.subclassFeatures || ''} onChange={e => updateClass(idx, 'subclassFeatures', e.target.value)} disabled={!editing} />
            </div>
          )
        })}
        {editing && (
          <Btn onClick={() => set('classes', [...(char.classes || []), { name: 'Fighter', level: 1, subclass: '', subclassFeatures: '' }])} style={{ width: '100%', marginBottom: 10, padding: '6px' }}>
            + Add Class
          </Btn>
        )}

        <SecHdr mt={14}>Identity</SecHdr>
        {editing ? (
          [['Name','name','text'],['Species','species','text'],['Background','background','text'],['Alignment','alignment','text'],['Languages','languages','text'],['XP','xp','number'],['Initiative Bonus','initiative','number']].map(([l, k, t]) => (
            <div key={k} style={{ marginBottom: 7 }}>
              <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 2 }}>{l}</div>
              <input type={t} value={char[k] ?? ''} onChange={e => set(k, t === 'number' ? +e.target.value : e.target.value)} style={inp} />
            </div>
          ))
        ) : (
          [['Species', char.customSpecies || char.species],['Background',char.background],['Alignment',char.alignment],['Languages',char.languages],['XP',char.xp]].map(([l, v]) => (
            <div key={l} style={{ marginBottom: 9 }}>
              <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 2 }}>{l}</div>
              <div style={{ color: C.text, fontSize: 12 }}>{v || '—'}</div>
            </div>
          ))
        )}
      </div>

      {/* Right col */}
      <div>
        <SecHdr>Personality</SecHdr>
        {[['Traits','personalityTraits'],['Ideals','ideals'],['Bonds','bonds'],['Flaws','flaws']].map(([label, key]) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 3 }}>{label}</div>
            {editing
              ? <textarea value={char[key] || ''} onChange={e => set(key, e.target.value)} rows={2} style={inp} />
              : <div style={{ color: C.textDim, fontSize: 11, lineHeight: 1.6 }}>{char[key] || <span style={{ color: C.textMuted }}>—</span>}</div>}
          </div>
        ))}
      </div>

      {/* Full width bottom */}
      <div style={{ gridColumn: '1 / -1' }}>
        <SecHdr>Features & Equipment</SecHdr>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
          {[['Features & Traits','features'],['Equipment','equipment'],['Notes','notes']].map(([label, key]) => (
            <div key={key}>
              <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 3 }}>{label}</div>
              {editing
                ? <textarea value={char[key] || ''} onChange={e => set(key, e.target.value)} rows={4} style={inp} />
                : <div style={{ color: C.textDim, fontSize: 11, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{char[key] || <span style={{ color: C.textMuted }}>—</span>}</div>}
            </div>
          ))}
        </div>

        <SecHdr>Currency</SecHdr>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['CP','cp','#b87333'],['SP','sp','#aaa9ad'],['GP','gp','#ffd700'],['PP','pp','#e5e4e2']].map(([label, key, color]) => (
            <div key={key} style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, padding: '9px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, color, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 3, fontWeight: 700 }}>{label}</div>
              {editing
                ? <input type="number" value={char.currency[key]} onChange={e => setN('currency', key, +e.target.value)} style={{ ...inp, textAlign: 'center', fontSize: 17 }} />
                : <div style={{ fontSize: 20, fontWeight: 700, color }}>{char.currency[key]}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
