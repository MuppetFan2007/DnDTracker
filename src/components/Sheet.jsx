import React, { useState, useContext, useRef, useCallback, useEffect } from 'react'
import { useT, ThemeCtx, THEMES } from '../themes.js'
import { DND } from '../data/dnd.js'
import { mod, fmt, profB, totalLevel, uid } from '../utils.js'
import { DND_ICONS } from './Icons.jsx'
import { CLabel, SecHdr, Btn, useInp, FullCircleHP } from './UI.jsx'
import { SpellSlotsTab } from './SpellSlotsTab.jsx'
import { CombatTab } from './CombatTab.jsx'
import { DiceRoller, THEME_FX, useRollEngine } from './DiceRoller.jsx'
import { FeaturesTab } from './FeaturesTab.jsx'
import { SessionNotesTab } from './SessionNotesTab.jsx'
import { GearTab } from './GearTab.jsx'
import { LevelUpModal } from './LevelUpModal.jsx'
import { ConditionChips } from './ConditionChips.jsx'
import { CONDITIONS as COND_DATA } from '../data/conditions.js'

export function Sheet({ char, onChange, onBack }) {
  const C   = useT()
  const inp = useInp()
  const [tab,         setTab]         = useState('core')
  const [editing,     setEditing]     = useState(false)
  const [rollMode,    setRollMode]    = useState('normal')
  const [combatOpen,  setCombatOpen]  = useState(false)
  const [levelUpOpen, setLevelUpOpen] = useState(false)

  // detect which theme is active
  const themeKey = Object.entries(THEMES).find(([, t]) => t.gold === C.gold)?.[0] || ''
  const isRacing = themeKey === 'racing'

  const set  = (k, v)    => onChange({ ...char, [k]: v })
  const setN = (o, k, v) => onChange({ ...char, [o]: { ...char[o], [k]: v } })

  const lvl      = totalLevel(char)
  const pb       = profB(lvl)
  const getSave  = (s)  => mod(char.stats[s]) + (char.savingThrowProfs.includes(s) ? pb : 0)
  const getSkill = (sk) => mod(char.stats[DND.skillStat[sk]]) + ((char.skillExpert || []).includes(sk) ? pb * 2 : char.skillProfs.includes(sk) ? pb : 0)
  const hpPct    = char.hp.max ? char.hp.current / char.hp.max * 100 : 0
  const hpColor  = hpPct > 60 ? C.green : hpPct > 30 ? C.yellow : C.red

  const TABS = ['core', 'combat', 'gear', 'spells', 'dice', 'features', 'sessions', 'character']

  const updateClass = (idx, field, val) => {
    const cls = [...(char.classes || [])]
    cls[idx] = { ...cls[idx], [field]: val }
    set('classes', cls)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ── Header ── */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '11px 20px', boxShadow: isRacing ? `0 1px 0 #00e5cc22` : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Btn onClick={onBack} style={isRacing ? { borderRadius: 20 } : {}}>← Back</Btn>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, color: C.gold, fontWeight: 700, letterSpacing: isRacing ? 1 : 3, textTransform: 'uppercase', textShadow: isRacing ? `0 0 12px ${C.gold}88` : 'none' }}>
              {char.name}
              {isRacing && <span className="miku-sparkle" style={{ marginLeft: 8, fontSize: 10, color: '#ff4fa3' }}>✦</span>}
            </div>
            <div style={{ fontSize: 9, color: C.textMuted, display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2, letterSpacing: 2, alignItems: 'center' }}>
              <span>{char.customSpecies || char.species}</span>
              {(char.classes || []).map((cl, i) => (
                <span key={i} style={{ color: DND.classColors[cl.name] || C.gold }}>· {cl.name} {cl.level}</span>
              ))}
              <span>· LV {lvl}</span>
            </div>
          </div>
          <Btn variant={editing ? 'gold' : 'default'} onClick={() => setEditing(e => !e)} style={isRacing ? { borderRadius: 20 } : {}}>
            {editing ? '✓ Done' : '✎ Edit'}
          </Btn>
          <Btn variant="default" onClick={() => setLevelUpOpen(true)} style={{ ...(isRacing ? { borderRadius: 20 } : {}), fontSize: 10, letterSpacing: 2, color: '#22c55e', borderColor: '#22c55e55' }}>
            ↑ Lvl Up
          </Btn>
          <button onClick={() => setCombatOpen(true)} className="hov-btn"
            style={{
              background: '#ef444418', border: `2px solid #ef4444`,
              color: '#ef4444', padding: '7px 14px', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              boxShadow: '0 0 12px #ef444433',
              ...(isRacing ? { borderRadius: 20 } : {}),
            }}>
            ⚔ Combat
          </button>
        </div>
      </div>

      {/* ── Combat bar ── */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: '14px 20px' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <FullCircleHP current={char.hp.current} max={char.hp.max} color={hpColor} size={90} temp={char.hp.temp || 0} />
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
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 8 }}>
              {[['AC','ac',char.ac],['SPEED','speed',`${char.speed}ft`],['INIT',null,fmt(char.initiative + mod(char.stats.dex))],['PROF',null,`+${pb}`]].map(([label, path, val]) => (
                <div key={label} style={{ background: C.surface, border: `1px solid ${C.border}`, padding: '9px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 3 }}>{label}</div>
                  {editing && path
                    ? <input type="number" value={char[path]} onChange={e => set(path, +e.target.value)} style={{ ...inp, textAlign: 'center', fontSize: 17, padding: '2px' }} />
                    : <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{val}</div>}
                </div>
              ))}
            </div>
            <ConditionChips
              conditions={char.conditions || []}
              onChange={conds => set('conditions', conds)}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="sheet-tabs" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: C.surface }}>
        {TABS.map(t => (
          <button key={t} className="hov-btn" onClick={() => setTab(t)}
            style={{
              background: 'transparent', border: 'none',
              borderBottom: `2px solid ${tab === t ? C.gold : 'transparent'}`,
              color: tab === t ? C.gold : C.textMuted,
              padding: '10px 18px', cursor: 'pointer', fontSize: 10,
              textTransform: 'uppercase', letterSpacing: 2, fontFamily: 'inherit',
              textShadow: isRacing && tab === t ? `0 0 10px ${C.gold}88` : 'none',
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="sheet-content" style={{ padding: '20px' }}>
        <div className="fade-up" key={tab}>
          {tab === 'core'      && <TabCore      char={char} onChange={onChange} set={set} setN={setN} editing={editing} inp={inp} getSave={getSave} getSkill={getSkill} pb={pb} C={C} rollMode={rollMode} setRollMode={setRollMode} themeKey={themeKey} />}
          {tab === 'combat'    && <CombatTab    char={char} onChange={onChange} />}
          {tab === 'gear'      && <GearTab      char={char} onChange={onChange} />}
          {tab === 'spells'    && <SpellSlotsTab char={char} onChange={onChange} />}
          {tab === 'dice'      && <DiceRoller   char={char} rollMode={rollMode} setRollMode={setRollMode} />}
          {tab === 'features'  && <FeaturesTab  char={char} onChange={onChange} />}
          {tab === 'sessions'  && <SessionNotesTab char={char} onChange={onChange} />}
          {tab === 'character' && <TabCharacter char={char} set={set} setN={setN} editing={editing} inp={inp} updateClass={updateClass} C={C} />}
        </div>
      </div>

      {/* ── Level Up Modal ── */}
      {levelUpOpen && (
        <LevelUpModal
          char={char}
          onChange={(updated) => { onChange(updated); setLevelUpOpen(false) }}
          onClose={() => setLevelUpOpen(false)}
        />
      )}

      {/* ── Combat Side Panel ── */}
      {combatOpen && (
        <div onClick={() => setCombatOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, backdropFilter: 'blur(2px)' }}
        />
      )}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 340,
        background: C.surface, borderLeft: `2px solid #ef444466`,
        boxShadow: combatOpen ? '-8px 0 40px rgba(0,0,0,0.5)' : 'none',
        zIndex: 201, display: 'flex', flexDirection: 'column',
        transform: combatOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
        overflowY: 'auto',
      }}>
        {/* Panel header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 16px', borderBottom: `1px solid ${C.border}`,
          background: C.card, flexShrink: 0, position: 'sticky', top: 0, zIndex: 1 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', letterSpacing: 3, textTransform: 'uppercase' }}>
              ⚔ Combat
            </div>
            <div style={{ fontSize: 9, color: C.textMuted, marginTop: 1 }}>{char.name}</div>
          </div>
          <button onClick={() => setCombatOpen(false)}
            style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textMuted,
              padding: '5px 10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12 }}>✕</button>
        </div>
        {/* Panel body */}
        <div style={{ padding: '16px', flex: 1 }}>
          <CombatPanel char={char} onChange={onChange} onClose={() => setCombatOpen(false)} C={C} />
        </div>
      </div>
    </div>
  )
}

/* ── Tab: Core ── */
const STAT_GROUPS = [
  { stat: 'str', skills: ['Athletics'] },
  { stat: 'dex', skills: ['Acrobatics', 'Sleight of Hand', 'Stealth'] },
  { stat: 'con', skills: [] },
  { stat: 'int', skills: ['Arcana', 'History', 'Investigation', 'Nature', 'Religion'] },
  { stat: 'wis', skills: ['Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival'] },
  { stat: 'cha', skills: ['Deception', 'Intimidation', 'Performance', 'Persuasion'] },
]

function TabCore({ char, onChange, set, setN, editing, inp, getSave, getSkill, pb, C, rollMode, setRollMode, themeKey }) {
  const cycleSkill = (sk) => {
    const prof   = char.skillProfs.includes(sk)
    const expert = (char.skillExpert || []).includes(sk)
    if (expert) {
      onChange({ ...char,
        skillProfs:  char.skillProfs.filter(x => x !== sk),
        skillExpert: (char.skillExpert || []).filter(x => x !== sk),
      })
    } else if (prof) {
      onChange({ ...char, skillExpert: [...(char.skillExpert || []), sk] })
    } else {
      onChange({ ...char, skillProfs: [...char.skillProfs, sk] })
    }
  }

  const fx = THEME_FX[themeKey] || THEME_FX.vcr
  const { rolling, displayNum, result, particles, roll } = useRollEngine(rollMode, themeKey)

  const rollCheck = useCallback((label, bonus) => {
    roll('d20', bonus, label)
  }, [roll])

  const isCrit   = result && result.kept === 20
  const isFumble = result && result.kept === 1
  const rc = isCrit ? C.green : isFumble ? C.red : fx.color

  return (
    <div>
      {/* Adv / disadv toggle + last roll result */}
      <div style={{ display: 'grid', gridTemplateColumns: result || rolling ? '1fr 1fr' : '1fr', gap: 8, marginBottom: 12 }}>
        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: 5 }}>
          {[
            { key: 'disadvantage', label: 'DISADV', color: C.red   },
            { key: 'normal',       label: 'NORMAL', color: C.text  },
            { key: 'advantage',    label: 'ADV',    color: C.green },
          ].map(({ key, label, color }) => (
            <button key={key} className="hov-btn" onClick={() => setRollMode(key)}
              style={{
                flex: 1, background: rollMode === key ? color + '1a' : 'transparent',
                border: `1px solid ${rollMode === key ? color : C.border}`,
                color: rollMode === key ? color : C.textMuted,
                padding: '5px 4px', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                transition: 'all 0.13s',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Inline roll result */}
        {(rolling || result) && (
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderLeft: `3px solid ${rc}`,
            padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 10,
            position: 'relative', overflow: 'hidden',
          }}>
            {/* VCR flicker */}
            {themeKey === 'vcr' && rolling && (
              <div className="dice-vcr-flicker" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            )}
            {/* Particles */}
            {particles.map(p => {
              const rad = (p.angle * Math.PI) / 180
              return (
                <div key={p.id} className={`dice-particle dice-particle-${themeKey}`}
                  style={{
                    position: 'absolute', top: '50%', left: '30%',
                    '--dx': `${Math.cos(rad) * p.dist * 0.6}px`,
                    '--dy': `${Math.sin(rad) * p.dist * 0.6}px`,
                    fontSize: 14, pointerEvents: 'none', zIndex: 2, color: fx.color,
                  }}>{p.emoji}</div>
              )
            })}

            {result?.label && (
              <span style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1, textTransform: 'uppercase', flexShrink: 0 }}>
                {result.label}
              </span>
            )}

            {rolling && displayNum !== null && (
              Array.isArray(displayNum) ? (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {displayNum.map((n, i) => (
                    <span key={i} className={`dice-rolling-num dice-rolling-${themeKey}`}
                      style={{ fontSize: 26, fontWeight: 900, color: fx.color }}>{n}</span>
                  ))}
                </div>
              ) : (
                <span className={`dice-rolling-num dice-rolling-${themeKey}`}
                  style={{ fontSize: 26, fontWeight: 900, color: fx.color }}>{displayNum}</span>
              )
            )}

            {!rolling && result && (
              <div className={`dice-result-${themeKey}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {result.die2 !== null ? (
                  <>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      {[result.die1, result.die2].map((d, idx) => {
                        const isKept = idx === result.keptIdx
                        return (
                          <span key={idx} style={{
                            fontSize: isKept ? 26 : 14, fontWeight: 900,
                            color: isKept ? rc : C.textMuted,
                            textDecoration: !isKept ? 'line-through' : 'none',
                            opacity: isKept ? 1 : 0.4,
                          }}>{d}</span>
                        )
                      })}
                    </div>
                    <span style={{ fontSize: 22, fontWeight: 900, color: rc }}>= {result.total}</span>
                  </>
                ) : (
                  <span style={{ fontSize: 28, fontWeight: 900, color: rc,
                    textShadow: `0 0 16px ${rc}88` }}>{result.total}</span>
                )}
                {result.mod !== 0 && (
                  <span style={{ fontSize: 10, color: C.textDim }}>
                    ({result.kept}{result.mod >= 0 ? `+${result.mod}` : result.mod})
                  </span>
                )}
                {isCrit   && <span style={{ fontSize: 9, color: C.green, letterSpacing: 2 }}>CRIT ✦</span>}
                {isFumble && <span style={{ fontSize: 9, color: C.red,   letterSpacing: 2 }}>FUMBLE</span>}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3×2 stat + skills grid */}
      <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, marginBottom: 10 }}>
        {STAT_GROUPS.map(({ stat, skills }) => (
          <div key={stat} style={{ background: C.card, border: `1px solid ${C.border}`, padding: '8px 10px' }}>
            {/* Stat header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: skills.length ? 7 : 0, paddingBottom: skills.length ? 6 : 0, borderBottom: skills.length ? `1px solid ${C.border}` : 'none' }}>
              <div>
                <div style={{ fontSize: 8, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 3 }}>{stat}</div>
                {editing
                  ? <input type="number" value={char.stats[stat]} min={1} max={30}
                      onChange={e => onChange({ ...char, stats: { ...char.stats, [stat]: +e.target.value } })}
                      style={{ ...inp, textAlign: 'center', fontSize: 18, padding: '2px 3px', width: 52 }} />
                  : <div className="hov-btn" onClick={() => rollCheck(stat.toUpperCase(), mod(char.stats[stat]))}
                      title={`Roll ${stat.toUpperCase()} check`}
                      style={{ fontSize: 24, fontWeight: 700, color: C.text, lineHeight: 1, cursor: 'pointer' }}>
                      {char.stats[stat]}
                    </div>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="hov-btn" onClick={() => !editing && rollCheck(stat.toUpperCase(), mod(char.stats[stat]))}
                  style={{ fontSize: 15, fontWeight: 700, color: C.gold, marginBottom: 4, cursor: editing ? 'default' : 'pointer' }}>
                  {fmt(mod(char.stats[stat]))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                  <div className="hov-btn"
                    onClick={() => onChange({ ...char, savingThrowProfs: char.savingThrowProfs.includes(stat) ? char.savingThrowProfs.filter(x => x !== stat) : [...char.savingThrowProfs, stat] })}
                    style={{ width: 8, height: 8, cursor: 'pointer', border: `1px solid ${C.textMuted}`, background: char.savingThrowProfs.includes(stat) ? C.gold : 'transparent', transition: 'all 0.15s', flexShrink: 0 }} />
                  <span className="hov-btn" onClick={() => rollCheck(`${stat.toUpperCase()} Save`, getSave(stat))}
                    title={`Roll ${stat.toUpperCase()} saving throw`}
                    style={{ fontSize: 7, color: C.textMuted, whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    SAVE {fmt(getSave(stat))}
                  </span>
                </div>
              </div>
            </div>
            {/* Skills — dot cycles prof, name/bonus rolls */}
            {skills.map(sk => {
              const prof   = char.skillProfs.includes(sk)
              const expert = (char.skillExpert || []).includes(sk)
              const bonus  = getSkill(sk)
              const clr    = expert ? C.blue : prof ? C.gold : C.textMuted
              return (
                <div key={sk} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 2px' }}>
                  {/* Dot — click to cycle proficiency */}
                  <div className="hov-btn" onClick={() => cycleSkill(sk)}
                    title={expert ? 'Expertise — click to remove' : prof ? 'Proficient — click for Expertise' : 'Click to add proficiency'}
                    style={{
                      width: 8, height: 8, flexShrink: 0, transition: 'all 0.15s', cursor: 'pointer',
                      ...(expert
                        ? { background: C.blue, border: `1.5px solid ${C.blue}`, transform: 'rotate(45deg)' }
                        : { borderRadius: prof ? '50%' : 2, background: prof ? C.gold : 'transparent', border: `1.5px solid ${clr}` })
                    }} />
                  {/* Name + bonus — click to roll */}
                  <div className="hov-btn" onClick={() => rollCheck(sk, bonus)}
                    title={`Roll ${sk} (${fmt(bonus)})`}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                    <span style={{ flex: 1, fontSize: 10, color: expert ? C.blue : prof ? C.text : C.textDim }}>{sk}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: clr, minWidth: 22, textAlign: 'right' }}>{fmt(bonus)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, marginBottom: 10 }}>
        {[['Passive Perc.', 10 + getSkill('Perception')], ['Prof Bonus', `+${pb}`]].map(([l, v]) => (
          <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, padding: '7px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 2 }}>{l}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{v}</div>
          </div>
        ))}
        <div className="hov-btn" onClick={() => set('inspiration', !char.inspiration)}
          style={{ background: C.card, border: `1px solid ${char.inspiration ? C.gold : C.border}`, padding: '7px 10px', textAlign: 'center', cursor: 'pointer', boxShadow: char.inspiration ? `0 0 8px ${C.gold}44` : 'none' }}>
          <div style={{ fontSize: 8, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 2 }}>Inspiration</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: char.inspiration ? C.gold : C.text }}>{char.inspiration ? '★ YES' : 'No'}</div>
        </div>
      </div>

      {/* Death saves + Temp HP */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '10px 12px' }}>
          <SecHdr>Death Saves</SecHdr>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Successes','successes',C.green],['Failures','failures',C.red]].map(([label, key, color]) => (
              <div key={key}>
                <div style={{ fontSize: 9, color: C.textMuted, marginBottom: 5 }}>{label}</div>
                <div style={{ display: 'flex', gap: 5 }}>
                  {[0,1,2].map(i => (
                    <div key={i} className="hov-btn"
                      onClick={() => setN('deathSaves', key, i + 1 === char.deathSaves[key] ? i : i + 1)}
                      style={{ width: 16, height: 16, cursor: 'pointer', border: `2px solid ${i < char.deathSaves[key] ? color : C.textMuted}`, background: i < char.deathSaves[key] ? color : 'transparent', transition: 'all 0.15s' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '10px 12px' }}>
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

/* ── Tab: Character ── */
function TabCharacter({ char, set, setN, editing, inp, updateClass, C }) {
  return (
    <div className="char-tab-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
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
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
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

/* ── Tab: Encounter Tracker ── */

function CombatPanel({ char, onChange, onClose, C }) {
  const inp = useInp()
  const lvl = totalLevel(char)
  const pb  = profB(lvl)
  const dexMod = mod(char.stats.dex) + (char.initiative || 0)

  // ── Turn resources (persisted on char) ──
  const used    = char.combatUsed || {}
  const setUsed = (patch) => onChange({ ...char, combatUsed: { ...used, ...patch } })

  const RESOURCES = [
    { key: 'action',   label: 'Action',   color: '#4ade80' },
    { key: 'bonus',    label: 'Bonus',    color: '#60a5fa' },
    { key: 'reaction', label: 'Reaction', color: '#f472b6' },
  ]

  // ── HP quick adjust ──
  const hpPct   = char.hp.max ? char.hp.current / char.hp.max * 100 : 0
  const hpColor = hpPct > 60 ? C.green : hpPct > 30 ? C.yellow : C.red
  const setHp   = (v) => onChange({ ...char, hp: { ...char.hp, current: Math.max(0, Math.min(char.hp.max, v)) } })

  // ── Encounter tracker (local — session only) ──
  const [round,      setRound]      = useState(1)
  const [activeId,   setActiveId]   = useState(char.id)
  const [combatants, setCombatants] = useState([{
    id: char.id, name: char.name || 'Your Character',
    initiative: dexMod, hp: char.hp.current, maxHp: char.hp.max,
    ac: char.ac, conditions: [], isPlayer: true,
  }])
  const [newName, setNewName] = useState('')
  const [newInit, setNewInit] = useState('')
  const [newHp,   setNewHp]   = useState('')
  const [newAc,   setNewAc]   = useState('')

  const sorted    = [...combatants].sort((a, b) => b.initiative - a.initiative)
  const activeIdx = sorted.findIndex(c => c.id === activeId)

  const nextTurn = () => {
    const next = (activeIdx + 1) % sorted.length
    if (next === 0) setRound(r => r + 1)
    setActiveId(sorted[next].id)
  }
  const prevTurn = () => {
    if (activeIdx === 0) { setRound(r => Math.max(1, r - 1)); setActiveId(sorted[sorted.length - 1].id) }
    else setActiveId(sorted[activeIdx - 1].id)
  }

  const upd = (id, field, val) =>
    setCombatants(cs => cs.map(c => c.id === id ? { ...c, [field]: val } : c))

  const toggleCond = (id, cond) =>
    setCombatants(cs => cs.map(c => c.id === id
      ? { ...c, conditions: c.conditions.includes(cond) ? c.conditions.filter(x => x !== cond) : [...c.conditions, cond] }
      : c))

  const addCombatant = () => {
    if (!newName.trim()) return
    const hp = parseInt(newHp) || 10
    setCombatants(cs => [...cs, {
      id: uid(), name: newName.trim(),
      initiative: parseInt(newInit) || 0,
      hp, maxHp: hp, ac: parseInt(newAc) || 10,
      conditions: [], isPlayer: false,
    }])
    setNewName(''); setNewInit(''); setNewHp(''); setNewAc('')
  }

  const ghost = { background: 'transparent', border: 'none', fontFamily: 'inherit', padding: 0, outline: 'none' }
  const sec = (label) => (
    <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 3, textTransform: 'uppercase',
      paddingBottom: 6, marginBottom: 10, borderBottom: `1px solid ${C.border}` }}>
      {label}
    </div>
  )

  return (
    <div>
      {/* ── Turn Resources ── */}
      {sec('Turn Resources')}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
        {RESOURCES.map(({ key, label, color }) => {
          const isUsed = !!used[key]
          return (
            <div key={key} className="hov-btn" onClick={() => setUsed({ [key]: !isUsed })}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', cursor: 'pointer', transition: 'all 0.18s',
                background: isUsed ? 'transparent' : color + '18',
                border: `2px solid ${isUsed ? C.border : color}`,
                opacity: isUsed ? 0.45 : 1, position: 'relative', overflow: 'hidden',
              }}>
              {!isUsed && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: color, boxShadow: `0 0 8px ${color}` }} />}
              <div style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: isUsed ? C.textMuted : color,
                boxShadow: isUsed ? 'none' : `0 0 8px ${color}` }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: isUsed ? C.textMuted : color,
                textTransform: 'uppercase', letterSpacing: 2, flex: 1,
                textDecoration: isUsed ? 'line-through' : 'none' }}>
                {label}
              </span>
              <span style={{ fontSize: 9, color: isUsed ? C.textMuted : color + '88' }}>
                {isUsed ? 'used' : 'available'}
              </span>
            </div>
          )
        })}
        <button className="hov-btn" onClick={() => onChange({ ...char, combatUsed: {} })}
          style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textDim,
            padding: '8px', fontSize: 10, fontFamily: 'inherit', letterSpacing: 2,
            textTransform: 'uppercase', cursor: 'pointer', marginTop: 2 }}>
          ↺ New Turn
        </button>
      </div>

      {/* ── HP Quick Adjust ── */}
      {sec('Hit Points')}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <button onClick={() => setHp(char.hp.current - 1)}
          style={{ ...ghost, width: 34, height: 34, border: `1px solid ${C.border}`, color: C.red,
            fontSize: 20, cursor: 'pointer', textAlign: 'center', lineHeight: '34px' }}>−</button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: hpColor, lineHeight: 1 }}>{char.hp.current}</div>
          <div style={{ fontSize: 10, color: C.textMuted }}>/ {char.hp.max}{char.hp.temp ? ` · +${char.hp.temp} temp` : ''}</div>
        </div>
        <button onClick={() => setHp(char.hp.current + 1)}
          style={{ ...ghost, width: 34, height: 34, border: `1px solid ${C.border}`, color: C.green,
            fontSize: 20, cursor: 'pointer', textAlign: 'center', lineHeight: '34px' }}>+</button>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {[1,5,10].map(n => (
          <React.Fragment key={n}>
            <button className="hov-btn" onClick={() => setHp(char.hp.current - n)}
              style={{ flex: 1, background: C.red + '11', border: `1px solid ${C.red}44`, color: C.red,
                padding: '6px', fontSize: 10, fontFamily: 'inherit', cursor: 'pointer', fontWeight: 700 }}>
              −{n}
            </button>
            <button className="hov-btn" onClick={() => setHp(char.hp.current + n)}
              style={{ flex: 1, background: C.green + '11', border: `1px solid ${C.green}44`, color: C.green,
                padding: '6px', fontSize: 10, fontFamily: 'inherit', cursor: 'pointer', fontWeight: 700 }}>
              +{n}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* ── Initiative Tracker ── */}
      {sec('Initiative Tracker')}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
        <Btn onClick={prevTurn}>◀</Btn>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 8, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase' }}>Round</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{round}</div>
        </div>
        <div style={{ flex: 2, textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ fontSize: 8, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>Active</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {sorted[activeIdx]?.name || '—'}
          </div>
        </div>
        <Btn variant="gold" onClick={nextTurn}>▶</Btn>
      </div>

      {/* Combatant rows */}
      <div style={{ marginBottom: 10 }}>
        {sorted.map((c) => {
          const isActive = c.id === activeId
          const hPct = c.maxHp ? c.hp / c.maxHp * 100 : 0
          const hClr = hPct > 60 ? C.green : hPct > 30 ? C.yellow : C.red
          return (
            <div key={c.id} style={{
              display: 'flex', gap: 6, alignItems: 'center',
              background: isActive ? C.gold + '0f' : C.card,
              border: `1px solid ${isActive ? C.gold + '55' : C.border}`,
              borderLeft: `3px solid ${isActive ? C.gold : 'transparent'}`,
              padding: '6px 8px', marginBottom: 3, transition: 'all 0.15s',
            }}>
              <input type="number" value={c.initiative} onChange={e => upd(c.id, 'initiative', +e.target.value)}
                style={{ ...ghost, color: C.gold, fontSize: 13, fontWeight: 700, width: 30, textAlign: 'center' }} />
              <input value={c.name} onChange={e => upd(c.id, 'name', e.target.value)}
                style={{ ...ghost, color: c.isPlayer ? C.gold : C.text, fontSize: 11,
                  fontWeight: c.isPlayer ? 700 : 400, flex: 1, minWidth: 0 }} />
              <button onClick={() => upd(c.id, 'hp', Math.max(0, c.hp - 1))}
                style={{ ...ghost, color: C.textDim, fontSize: 14, cursor: 'pointer', width: 18, textAlign: 'center' }}>−</button>
              <span style={{ fontSize: 12, fontWeight: 700, color: hClr, minWidth: 22, textAlign: 'center' }}>{c.hp}</span>
              <button onClick={() => upd(c.id, 'hp', Math.min(c.maxHp, c.hp + 1))}
                style={{ ...ghost, color: C.textDim, fontSize: 14, cursor: 'pointer', width: 18, textAlign: 'center' }}>+</button>
              <span style={{ fontSize: 9, color: C.textMuted, minWidth: 20 }}>/{c.maxHp}</span>
              <select onChange={e => { if (e.target.value) { toggleCond(c.id, e.target.value); e.target.value = '' } }}
                style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textDim,
                  fontSize: 8, padding: '2px 3px', fontFamily: 'inherit', maxWidth: 55 }}>
                <option value="">+cond</option>
                {COND_DATA.filter(cd => !c.conditions.includes(cd.id)).map(cd => (
                  <option key={cd.id} value={cd.id}>{cd.label}</option>
                ))}
              </select>
              {!c.isPlayer && (
                <button onClick={() => { setCombatants(cs => cs.filter(x => x.id !== c.id)); if (activeId === c.id) setActiveId(sorted[0]?.id || char.id) }}
                  style={{ ...ghost, color: C.textMuted, fontSize: 12, cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.color = C.red}
                  onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>✕</button>
              )}
            </div>
          )
        })}
        {sorted.map(c => c.conditions.length > 0 && (
          <div key={c.id + '_cond'} style={{ display: 'flex', gap: 3, flexWrap: 'wrap', paddingLeft: 38, marginBottom: 3 }}>
            {c.conditions.map(cd => (
              <span key={cd} className="hov-btn" onClick={() => toggleCond(c.id, cd)}
                style={{ fontSize: 8, background: C.red + '22', border: `1px solid ${C.red}44`,
                  color: C.red, padding: '1px 5px', cursor: 'pointer', letterSpacing: 1 }}>
                {cd} ✕
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Add combatant */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
        <input placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addCombatant()}
          style={{ flex: '2 1 80px', background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: '5px 7px', fontSize: 10, fontFamily: 'inherit' }} />
        <input placeholder="Init" type="number" value={newInit} onChange={e => setNewInit(e.target.value)}
          style={{ width: 42, background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: '5px 6px', fontSize: 10, fontFamily: 'inherit' }} />
        <input placeholder="HP" type="number" value={newHp} onChange={e => setNewHp(e.target.value)}
          style={{ width: 42, background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: '5px 6px', fontSize: 10, fontFamily: 'inherit' }} />
        <input placeholder="AC" type="number" value={newAc} onChange={e => setNewAc(e.target.value)}
          style={{ width: 42, background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: '5px 6px', fontSize: 10, fontFamily: 'inherit' }} />
        <Btn variant="gold" onClick={addCombatant}>+</Btn>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Btn onClick={() => { setRound(1); setActiveId(sorted[0]?.id || char.id) }}>Reset</Btn>
        <Btn onClick={() => {
          setCombatants([{ id: char.id, name: char.name || 'Your Character', initiative: dexMod, hp: char.hp.current, maxHp: char.hp.max, ac: char.ac, conditions: [], isPlayer: true }])
          setRound(1); setActiveId(char.id)
        }}>Clear</Btn>
      </div>
    </div>
  )
}