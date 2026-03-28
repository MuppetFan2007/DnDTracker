import React from 'react'
import { useT } from '../themes.js'
import { DND } from '../data/dnd.js'
import { mod, fmt, profB, totalLevel } from '../utils.js'
import { DND_ICONS } from './Icons.jsx'
import { CLabel, CRow, Chip, Btn, useInp } from './UI.jsx'
import { SpellEditor } from './SpellEditor.jsx'

const STEPS = ['Identity', 'Species & Class', 'Ability Scores', 'Proficiencies', 'Spells', 'Background', 'Review']

export function Creator({ draft, setDraft, step, setStep, onFinish, onCancel }) {
  const C = useT()
  const inp = useInp()
  const set  = (k, v)    => setDraft(d => ({ ...d, [k]: v }))
  const setN = (o, k, v) => setDraft(d => ({ ...d, [o]: { ...d[o], [k]: v } }))
  const canNext = step === 0 ? !!draft.name.trim() : true

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Progress bar */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <Btn onClick={onCancel}>← Back</Btn>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 3, marginBottom: 2 }}>STEP {step + 1} / {STEPS.length}</div>
          <div style={{ fontSize: 13, color: C.gold, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{STEPS[step]}</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {STEPS.map((_, i) => (
            <div key={i} className={i < step ? 'hov-btn' : ''} onClick={() => i < step && setStep(i)}
              style={{ width: 26, height: 4, background: i === step ? C.gold : i < step ? C.goldDim : C.border, cursor: i < step ? 'pointer' : 'default', boxShadow: i === step ? `0 0 6px ${C.gold}` : 'none' }} />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px', maxWidth: 680, width: '100%', margin: '0 auto' }}>
        <div className="fade-up" key={step}>
          {step === 0 && <StepIdentity  draft={draft} set={set}                inp={inp} />}
          {step === 1 && <StepClass     draft={draft} set={set}                inp={inp} />}
          {step === 2 && <StepStats     draft={draft} set={set} setN={setN}    inp={inp} />}
          {step === 3 && <StepProfs     draft={draft} set={set}                inp={inp} />}
          {step === 4 && (
            <div>
              <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Spells</div>
              <SpellEditor spells={draft.spells} onChange={s => set('spells', s)} />
            </div>
          )}
          {step === 5 && <StepBackground draft={draft} set={set} setN={setN}   inp={inp} />}
          {step === 6 && <ReviewCard char={draft} />}
        </div>
      </div>

      {/* Nav buttons */}
      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: '12px 24px', display: 'flex', justifyContent: 'space-between' }}>
        <Btn onClick={() => step > 0 ? setStep(step - 1) : onCancel()}>{step > 0 ? '← Back' : 'Cancel'}</Btn>
        {step < STEPS.length - 1
          ? <Btn variant={canNext ? 'gold' : 'default'} disabled={!canNext} onClick={() => setStep(step + 1)}>Next →</Btn>
          : <Btn variant="gold" onClick={onFinish}>Create Character ✓</Btn>}
      </div>
    </div>
  )
}

/* ── Step: Identity ── */
function StepIdentity({ draft, set, inp }) {
  const C = useT()
  return (
    <div>
      <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 18 }}>Who are they?</div>
      <CLabel>Character Name *</CLabel>
      <input style={{ ...inp, fontSize: 18, padding: '10px 12px', letterSpacing: 2 }} placeholder="ENTER NAME..." value={draft.name} onChange={e => set('name', e.target.value)} autoFocus />
      <CLabel>Alignment</CLabel>
      <select style={inp} value={draft.alignment} onChange={e => set('alignment', e.target.value)}>
        {DND.alignments.map(a => <option key={a}>{a}</option>)}
      </select>
      {[['Personality Traits','personalityTraits','Describe your character...'],['Ideals','ideals','What drives them?'],['Bonds','bonds','Who do they care about?'],['Flaws','flaws','Their weakness...']].map(([l, k, p]) => (
        <div key={k}><CLabel>{l}</CLabel><textarea style={inp} rows={2} placeholder={p} value={draft[k]} onChange={e => set(k, e.target.value)} /></div>
      ))}
    </div>
  )
}

/* ── Step: Class ── */
function StepClass({ draft, set, inp }) {
  const C = useT()
  const updateClass  = (idx, field, val) => { const cls = [...draft.classes]; cls[idx] = { ...cls[idx], [field]: val }; set('classes', cls) }
  const addClass     = () => set('classes', [...draft.classes, { name: 'Fighter', level: 1, subclass: '', subclassFeatures: '' }])
  const removeClass  = (idx) => set('classes', draft.classes.filter((_, i) => i !== idx))

  return (
    <div>
      <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 18 }}>Species & Class</div>

      <CLabel>Species</CLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))', gap: 5, marginBottom: 6 }}>
        {DND.species.map(s => (
          <Chip key={s} active={draft.species === s && !draft.customSpecies} onClick={() => { set('species', s); set('customSpecies', '') }}>{s}</Chip>
        ))}
      </div>
      <CLabel>Custom Species</CLabel>
      <input style={{ ...inp, marginBottom: 20 }} placeholder="e.g. Kenku, Changeling..." value={draft.customSpecies || ''} onChange={e => set('customSpecies', e.target.value)} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2 }}>Classes</div>
        <Btn onClick={addClass} style={{ padding: '4px 10px', fontSize: 10 }}>+ Add Class</Btn>
      </div>

      {draft.classes.map((cl, idx) => {
        const def = DND.classes.find(c => c.name === cl.name) || DND.classes[0]
        const cc  = DND.classColors[cl.name] || C.gold
        return (
          <div key={idx} style={{ background: C.card, border: `1px solid ${C.border}`, padding: 12, marginBottom: 10, borderLeft: `3px solid ${cc}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ color: cc }}>{DND_ICONS[cl.name]}</span>
              <span style={{ color: cc, fontWeight: 700, fontSize: 11, letterSpacing: 2 }}>CLASS_{idx + 1}</span>
              {idx > 0 && <Btn variant="danger" onClick={() => removeClass(idx)} style={{ marginLeft: 'auto', padding: '3px 8px', fontSize: 9 }}>✕ Remove</Btn>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(82px,1fr))', gap: 4, marginBottom: 10 }}>
              {DND.classes.map(c => (
                <Chip key={c.name} active={cl.name === c.name} color={DND.classColors[c.name]} onClick={() => updateClass(idx, 'name', c.name)}>
                  <div style={{ fontSize: 16 }}>{DND_ICONS[c.name]}</div>
                  <div style={{ fontSize: 10, letterSpacing: 1 }}>{c.name}</div>
                  <div style={{ fontSize: 9, opacity: 0.5 }}>d{c.hitDie}</div>
                </Chip>
              ))}
            </div>
            <CRow>
              <div style={{ width: 72 }}>
                <CLabel>Level</CLabel>
                <input type="number" min={1} max={20} style={inp} value={cl.level} onChange={e => updateClass(idx, 'level', Math.min(20, Math.max(1, +e.target.value)))} />
              </div>
              <div style={{ flex: 1 }}>
                <CLabel>Subclass</CLabel>
                <select style={inp} value={cl.subclass || ''} onChange={e => updateClass(idx, 'subclass', e.target.value)}>
                  <option value="">— Choose later —</option>
                  {def.subclasses.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </CRow>
          </div>
        )
      })}
    </div>
  )
}

/* ── Step: Stats ── */
function StepStats({ draft, set, setN, inp }) {
  const C = useT()
  const labels = { str:'Strength', dex:'Dexterity', con:'Constitution', int:'Intelligence', wis:'Wisdom', cha:'Charisma' }
  return (
    <div>
      <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 }}>Ability Scores</div>
      <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 1, marginBottom: 16 }}>Standard Array: 15, 14, 13, 12, 10, 8</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
        {['str','dex','con','int','wis','cha'].map(s => (
          <div key={s} style={{ background: C.card, border: `1px solid ${C.border}`, padding: '12px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>{labels[s]}</div>
            <input type="number" min={1} max={30} value={draft.stats[s]}
              onChange={e => setN('stats', s, Math.min(30, Math.max(1, +e.target.value)))}
              style={{ ...inp, textAlign: 'center', fontSize: 26, fontWeight: 700, padding: '4px' }} />
            <div style={{ marginTop: 6, fontSize: 13, color: C.gold, fontWeight: 700 }}>{fmt(mod(draft.stats[s]))}</div>
          </div>
        ))}
      </div>
      <CRow>
        <div style={{ flex: 1 }}><CLabel>Max HP</CLabel><input type="number" style={inp} value={draft.hp.max} onChange={e => { setN('hp','max',+e.target.value); setN('hp','current',+e.target.value) }} /></div>
        <div style={{ flex: 1 }}><CLabel>Armor Class</CLabel><input type="number" style={inp} value={draft.ac} onChange={e => set('ac', +e.target.value)} /></div>
        <div style={{ flex: 1 }}><CLabel>Speed (ft)</CLabel><input type="number" style={inp} value={draft.speed} onChange={e => set('speed', +e.target.value)} /></div>
      </CRow>
    </div>
  )
}

/* ── Step: Proficiencies ── */
function StepProfs({ draft, set, inp }) {
  const C   = useT()
  const lvl = totalLevel(draft)
  return (
    <div>
      <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Proficiencies</div>
      <CLabel>Saving Throws</CLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {['str','dex','con','int','wis','cha'].map(s => {
          const a = draft.savingThrowProfs.includes(s)
          return (
            <Chip key={s} active={a} onClick={() => set('savingThrowProfs', a ? draft.savingThrowProfs.filter(x => x !== s) : [...draft.savingThrowProfs, s])}>
              {s.toUpperCase()}
            </Chip>
          )
        })}
      </div>
      <CLabel>Skills</CLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        {DND.skills.map(sk => {
          const a     = draft.skillProfs.includes(sk)
          const bonus = mod(draft.stats[DND.skillStat[sk]]) + (a ? profB(lvl) : 0)
          return (
            <div key={sk} className="chip-toggle"
              onClick={() => set('skillProfs', a ? draft.skillProfs.filter(x => x !== sk) : [...draft.skillProfs, sk])}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 9px', background: a ? C.activeSkill : C.card, border: `1px solid ${a ? C.activeBorder : C.border}` }}>
              <div style={{ width: 8, height: 8, flexShrink: 0, background: a ? C.gold : 'transparent', border: `1.5px solid ${a ? C.gold : C.textMuted}` }} />
              <span style={{ flex: 1, fontSize: 11, color: a ? C.text : C.textDim }}>{sk}</span>
              <span style={{ fontSize: 9, color: C.textMuted }}>{DND.skillStat[sk].toUpperCase()}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: a ? C.gold : C.textMuted, minWidth: 22, textAlign: 'right' }}>{fmt(bonus)}</span>
            </div>
          )
        })}
      </div>
      <CLabel>Languages</CLabel>
      <input style={inp} placeholder="Common, Elvish..." value={draft.languages} onChange={e => set('languages', e.target.value)} />
    </div>
  )
}

/* ── Step: Backgrounds ── */
function StepBackground({ draft, set, setN, inp }) {
  const C = useT()
  return (
    <div>
      <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Background & Equipment</div>
      <CLabel>Background</CLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(118px,1fr))', gap: 5, marginBottom: 14 }}>
        {DND.backgrounds.map(b => (
          <Chip key={b.name} active={draft.background === b.name} onClick={() => set('background', b.name)}>
            <div style={{ fontWeight: 600 }}>{b.name}</div>
            <div style={{ fontSize: 9, opacity: 0.6 }}>{b.skills.join(', ')}</div>
          </Chip>
        ))}
      </div>
      {[['Equipment & Inventory','equipment','List starting equipment...'],['Features & Traits','features','Class features, feats...'],['Notes','notes','Anything else...']].map(([l, k, p]) => (
        <div key={k}><CLabel>{l}</CLabel><textarea style={inp} rows={3} placeholder={p} value={draft[k]} onChange={e => set(k, e.target.value)} /></div>
      ))}
      <CLabel>Currency</CLabel>
      <CRow>
        {[['CP','cp'],['SP','sp'],['GP','gp'],['PP','pp']].map(([l, k]) => (
          <div key={k} style={{ flex: 1 }}><CLabel>{l}</CLabel><input type="number" style={inp} value={draft.currency[k]} onChange={e => setN('currency', k, +e.target.value)} /></div>
        ))}
      </CRow>
    </div>
  )
}

/* ── Review ── */
function ReviewCard({ char }) {
  const C   = useT()
  const lvl = totalLevel(char)
  return (
    <div>
      <div style={{ fontSize: 20, color: C.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 14 }}>{char.name || 'Unnamed'}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
        {char.classes.map((cl, i) => (
          <span key={i} style={{ background: (DND.classColors[cl.name] || C.gold) + '22', border: `1px solid ${(DND.classColors[cl.name] || C.gold)}55`, padding: '3px 10px', fontSize: 10, color: DND.classColors[cl.name] || C.gold, letterSpacing: 2 }}>
            {cl.name} {cl.level}
          </span>
        ))}
        <span style={{ border: `1px solid ${C.border}`, padding: '3px 10px', fontSize: 10, color: C.textDim }}>{char.customSpecies || char.species}</span>
        <span style={{ border: `1px solid ${C.border}`, padding: '3px 10px', fontSize: 10, color: C.textDim }}>LV {lvl}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 6, marginBottom: 18 }}>
        {['str','dex','con','int','wis','cha'].map(s => (
          <div key={s} style={{ background: C.card, border: `1px solid ${C.border}`, padding: '10px 4px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 5 }}>{s}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{char.stats[s]}</div>
            <div style={{ fontSize: 11, color: C.gold }}>{fmt(mod(char.stats[s]))}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[['HP',char.hp.max],['AC',char.ac],['Speed',`${char.speed}ft`],['Prof Bonus',`+${profB(lvl)}`],['Background',char.background],['Alignment',char.alignment]].map(([l, v]) => (
          <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, padding: '8px 10px' }}>
            <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2 }}>{l}</div>
            <div style={{ fontSize: 13, color: C.text, marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
