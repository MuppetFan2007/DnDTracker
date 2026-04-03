import React, { useState, useMemo } from 'react'
import { useT } from '../themes.js'
import { mod, profB, totalLevel, uid } from '../utils.js'
import { DND } from '../data/dnd.js'
import { CLASS_FEATURES } from '../data/classFeatures.js'
import { FEATS } from '../data/feats.js'
import { Btn, SecHdr } from './UI.jsx'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CasinoIcon       from '@mui/icons-material/Casino'
import CheckIcon        from '@mui/icons-material/Check'
import CloseIcon        from '@mui/icons-material/Close'

/* ASI levels by class */
const ASI_LEVELS = {
  Fighter:  [4, 6, 8, 12, 14, 16, 19],
  Rogue:    [4, 8, 10, 12, 16, 19],
  _default: [4, 8, 12, 16, 19],
}
function getAsiLevels(className) {
  return ASI_LEVELS[className] || ASI_LEVELS._default
}

const STAT_LABELS = { str:'Strength', dex:'Dexterity', con:'Constitution', int:'Intelligence', wis:'Wisdom', cha:'Charisma' }

export function LevelUpModal({ char, onChange, onClose }) {
  const C  = useT()
  const classes = char.classes || []

  const [step,      setStep]      = useState(0)  // 0=class 1=hp 2=features 3=asi 4=confirm
  const [targetIdx, setTargetIdx] = useState(0)
  const [hpGain,    setHpGain]    = useState(null)
  const [asiMode,   setAsiMode]   = useState('asi') // 'asi' | 'feat'
  const [asiPicks,  setAsiPicks]  = useState({ a: '', b: '' })  // stat keys
  const [asiSingle, setAsiSingle] = useState('')               // stat for +2
  const [featPick,  setFeatPick]  = useState(null)
  const [featSearch, setFeatSearch] = useState('')

  const targetClass = classes[targetIdx] || classes[0]
  const newLevel    = (targetClass?.level || 0) + 1
  const hitDie      = DND.classes.find(c => c.name === targetClass?.name)?.hitDie || 8
  const conMod      = mod(char.stats?.con ?? 10)
  const avgHp       = Math.floor(hitDie / 2) + 1 + conMod
  const rollHp      = () => Math.max(1, Math.ceil(Math.random() * hitDie)) + conMod

  const isAsiLevel  = getAsiLevels(targetClass?.name).includes(newLevel)

  /* New features at this level */
  const newFeatures = useMemo(() => {
    const classFeats = (CLASS_FEATURES[targetClass?.name] || []).filter(f => f.level === newLevel)
    return classFeats
  }, [targetClass, newLevel])

  /* Steps to show */
  const steps = useMemo(() => {
    const s = []
    if (classes.length > 1) s.push('class')
    s.push('hp')
    if (newFeatures.length > 0) s.push('features')
    if (isAsiLevel) s.push('asi')
    s.push('confirm')
    return s
  }, [classes.length, newFeatures.length, isAsiLevel])

  const currentStep = steps[step]
  const isLast = step === steps.length - 1

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1))
  const back = () => setStep(s => Math.max(s - 1, 0))

  const confirm = () => {
    const updatedClasses = classes.map((cl, i) =>
      i === targetIdx ? { ...cl, level: cl.level + 1 } : cl
    )
    let updatedStats = { ...char.stats }
    let updatedFeats = [...(char.otherFeats || [])]

    if (isAsiLevel) {
      if (asiMode === 'asi') {
        if (asiPicks.a && asiPicks.b && asiPicks.a !== asiPicks.b) {
          updatedStats[asiPicks.a] = (updatedStats[asiPicks.a] || 10) + 1
          updatedStats[asiPicks.b] = (updatedStats[asiPicks.b] || 10) + 1
        } else if (asiSingle) {
          updatedStats[asiSingle] = (updatedStats[asiSingle] || 10) + 2
        }
      } else if (asiMode === 'feat' && featPick) {
        updatedFeats = [...updatedFeats, {
          id: uid(), name: featPick.name, desc: featPick.desc,
          limited: false, usesMax: 1, usesLeft: 1,
        }]
      }
    }

    onChange({
      ...char,
      classes: updatedClasses,
      stats: updatedStats,
      otherFeats: updatedFeats,
      hp: { ...char.hp, max: char.hp.max + (hpGain ?? avgHp) },
    })
  }

  const filteredFeats = FEATS.filter(f =>
    f.name.toLowerCase().includes(featSearch.toLowerCase()) ||
    f.desc.toLowerCase().includes(featSearch.toLowerCase())
  )

  const overlayStyle = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
    zIndex: 500, backdropFilter: 'blur(3px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px',
  }

  const panelStyle = {
    background: C.surface, border: `2px solid ${C.gold}66`,
    borderRadius: 10, width: '100%', maxWidth: 520,
    maxHeight: '90vh', overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
    boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${C.gold}22`,
  }

  return (
    <div style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={panelStyle}>
        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: `1px solid ${C.border}`,
          background: C.card, flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.gold, letterSpacing: 2, textTransform: 'uppercase' }}>
              ↑ Level Up
            </div>
            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>
              {targetClass?.name} → Level {newLevel}
            </div>
          </div>
          {/* Step dots */}
          <div style={{ display: 'flex', gap: 5 }}>
            {steps.map((s, i) => (
              <div key={s} style={{
                width: 7, height: 7, borderRadius: '50%',
                background: i <= step ? C.gold : C.border,
                transition: 'background 0.2s',
              }} />
            ))}
          </div>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, display: 'flex', alignItems: 'center' }}>
            <CloseIcon style={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

          {/* Step: Choose class */}
          {currentStep === 'class' && (
            <div>
              <SecHdr>Which class levels up?</SecHdr>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                {classes.map((cl, i) => (
                  <button key={i} onClick={() => { setTargetIdx(i); next() }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', cursor: 'pointer',
                      background: targetIdx === i ? `${C.gold}18` : C.card,
                      border: `1px solid ${targetIdx === i ? C.gold + '66' : C.border}`,
                      borderRadius: 6, color: C.text, fontFamily: 'inherit',
                      transition: 'all 0.12s',
                    }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%',
                      background: DND.classColors[cl.name] || C.gold }} />
                    <span style={{ flex: 1, textAlign: 'left', fontSize: 14, fontWeight: 600, color: DND.classColors[cl.name] || C.gold }}>
                      {cl.name}
                    </span>
                    <span style={{ fontSize: 12, color: C.textMuted }}>Lv {cl.level} → {cl.level + 1}</span>
                    <ArrowForwardIcon style={{ fontSize: 16, color: C.textMuted }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step: HP */}
          {currentStep === 'hp' && (
            <div>
              <SecHdr>Hit Points</SecHdr>
              <div style={{ fontSize: 12, color: C.textDim, marginBottom: 20, lineHeight: 1.6 }}>
                Hit Die: <strong style={{ color: C.gold }}>d{hitDie}</strong>
                · Constitution modifier: <strong style={{ color: conMod >= 0 ? '#22c55e' : '#ef4444' }}>{conMod >= 0 ? `+${conMod}` : conMod}</strong>
                · Average: <strong style={{ color: C.text }}>{avgHp}</strong>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                {/* Take average */}
                <button onClick={() => { setHpGain(avgHp); next() }}
                  style={{
                    padding: '18px 14px', cursor: 'pointer', textAlign: 'center',
                    background: hpGain === avgHp ? `${C.gold}18` : C.card,
                    border: `2px solid ${hpGain === avgHp ? C.gold : C.border}`,
                    borderRadius: 8, color: C.text, fontFamily: 'inherit',
                    transition: 'all 0.12s',
                  }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: C.gold, lineHeight: 1 }}>+{avgHp}</div>
                  <div style={{ fontSize: 10, color: C.textMuted, marginTop: 6, textTransform: 'uppercase', letterSpacing: 2 }}>Take Average</div>
                </button>

                {/* Roll */}
                <button onClick={() => { setHpGain(rollHp()); next() }}
                  style={{
                    padding: '18px 14px', cursor: 'pointer', textAlign: 'center',
                    background: C.card, border: `2px solid ${C.border}`,
                    borderRadius: 8, color: C.text, fontFamily: 'inherit',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold + '66' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border }}>
                  <CasinoIcon style={{ fontSize: 32, color: C.gold }} />
                  <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2 }}>Roll d{hitDie}</div>
                </button>
              </div>

              {hpGain !== null && (
                <div style={{
                  padding: '12px 16px', background: `${C.gold}14`,
                  border: `1px solid ${C.gold}44`, borderRadius: 6, textAlign: 'center',
                }}>
                  <span style={{ fontSize: 12, color: C.textDim }}>Rolled </span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: C.gold }}>+{hpGain}</span>
                  <span style={{ fontSize: 12, color: C.textDim }}> HP</span>
                  <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4 }}>
                    New max HP: {char.hp.max} + {hpGain} = {char.hp.max + hpGain}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step: New features */}
          {currentStep === 'features' && (
            <div>
              <SecHdr>New Features at Level {newLevel}</SecHdr>
              {newFeatures.length === 0 ? (
                <div style={{ color: C.textMuted, fontSize: 12, marginTop: 10 }}>No new class features at this level.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                  {newFeatures.map(f => (
                    <div key={f.name} style={{
                      background: C.card, border: `1px solid ${C.gold}33`,
                      borderRadius: 6, padding: '12px 14px',
                      borderLeft: `3px solid ${C.gold}`,
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, marginBottom: 6 }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.65 }}>{f.desc}</div>
                      {f.limited && (
                        <div style={{ fontSize: 10, color: C.textMuted, marginTop: 6, fontStyle: 'italic' }}>
                          {f.recharge?.toUpperCase()} · {f.usesFormula}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step: ASI / Feat */}
          {currentStep === 'asi' && (
            <div>
              <SecHdr>Ability Score Improvement</SecHdr>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 16 }}>
                Choose an Ability Score Improvement (+2 to one, or +1/+1 to two) or select a Feat.
              </div>

              {/* Toggle */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
                {[['asi','Ability Score Improvement'],['feat','Choose a Feat']].map(([val, label]) => (
                  <button key={val} onClick={() => setAsiMode(val)}
                    style={{
                      flex: 1, padding: '8px 0', cursor: 'pointer',
                      fontSize: 11, fontFamily: 'inherit', fontWeight: asiMode===val ? 700 : 400,
                      background: asiMode===val ? `${C.gold}18` : 'transparent',
                      border: `1px solid ${asiMode===val ? C.gold+'66' : C.border}`,
                      color: asiMode===val ? C.gold : C.textMuted,
                      borderRadius: 4, letterSpacing: 0.5,
                      transition: 'all 0.12s',
                    }}>
                    {label}
                  </button>
                ))}
              </div>

              {asiMode === 'asi' && (
                <div>
                  <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 10 }}>Current scores:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
                    {Object.entries(char.stats || {}).map(([stat, val]) => {
                      const isA = asiPicks.a === stat
                      const isB = asiPicks.b === stat
                      const isSingle = asiSingle === stat
                      const gainVal = isA || isB ? 1 : isSingle ? 2 : 0
                      return (
                        <button key={stat}
                          onClick={() => {
                            if (asiSingle === stat) { setAsiSingle(''); return }
                            if (asiPicks.a === stat) { setAsiPicks(p => ({ ...p, a: '' })); return }
                            if (asiPicks.b === stat) { setAsiPicks(p => ({ ...p, b: '' })); return }
                            if (!asiPicks.a)        { setAsiPicks(p => ({ ...p, a: stat })); return }
                            if (!asiPicks.b)        { setAsiPicks(p => ({ ...p, b: stat })); return }
                          }}
                          onDoubleClick={() => {
                            setAsiPicks({ a: '', b: '' })
                            setAsiSingle(asiSingle === stat ? '' : stat)
                          }}
                          style={{
                            padding: '10px 8px', cursor: 'pointer', textAlign: 'center',
                            background: (isA || isB || isSingle) ? `${C.gold}18` : C.card,
                            border: `1px solid ${(isA || isB || isSingle) ? C.gold+'66' : C.border}`,
                            borderRadius: 5, color: C.text, fontFamily: 'inherit',
                            transition: 'all 0.12s',
                          }}>
                          <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                            {stat.toUpperCase()}
                          </div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: (isA || isB || isSingle) ? C.gold : C.text }}>
                            {val + gainVal}
                            {gainVal > 0 && <span style={{ fontSize: 10, color: C.gold }}> (+{gainVal})</span>}
                          </div>
                          <div style={{ fontSize: 9, color: C.textMuted }}>{STAT_LABELS[stat]}</div>
                        </button>
                      )
                    })}
                  </div>
                  <div style={{ fontSize: 10, color: C.textMuted, fontStyle: 'italic' }}>
                    Click once to add +1 to two different stats. Double-click for +2 to one stat.
                  </div>
                </div>
              )}

              {asiMode === 'feat' && (
                <div>
                  <input
                    value={featSearch}
                    onChange={e => setFeatSearch(e.target.value)}
                    placeholder="Search feats..."
                    style={{
                      width: '100%', padding: '8px 10px', fontSize: 12, marginBottom: 12,
                      background: C.card, border: `1px solid ${C.border}`,
                      color: C.text, borderRadius: 4, outline: 'none',
                      boxSizing: 'border-box', fontFamily: 'inherit',
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 280, overflowY: 'auto' }}>
                    {filteredFeats.map(feat => (
                      <button key={feat.id} onClick={() => setFeatPick(featPick?.id === feat.id ? null : feat)}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 10,
                          padding: '10px 12px', cursor: 'pointer', textAlign: 'left',
                          background: featPick?.id === feat.id ? `${C.gold}18` : C.card,
                          border: `1px solid ${featPick?.id === feat.id ? C.gold+'66' : C.border}`,
                          borderRadius: 5, color: C.text, fontFamily: 'inherit',
                          transition: 'all 0.12s',
                        }}>
                        <div style={{
                          width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                          background: featPick?.id === feat.id ? C.gold : 'transparent',
                          border: `1.5px solid ${featPick?.id === feat.id ? C.gold : C.border}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {featPick?.id === feat.id && <CheckIcon style={{ fontSize: 10, color: C.surface }} />}
                        </div>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: featPick?.id === feat.id ? C.gold : C.text, marginBottom: 3 }}>
                            {feat.name}
                            {feat.prereq && <span style={{ fontSize: 9, color: C.textMuted, marginLeft: 6 }}>(Req: {feat.prereq})</span>}
                          </div>
                          <div style={{ fontSize: 10, color: C.textDim, lineHeight: 1.5 }}>{feat.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step: Confirm */}
          {currentStep === 'confirm' && (
            <div>
              <SecHdr>Summary</SecHdr>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                <SummaryRow label="Class Level" value={`${targetClass?.name} ${targetClass?.level} → ${newLevel}`} C={C} color={DND.classColors[targetClass?.name]} />
                <SummaryRow label="HP Gain" value={`+${hpGain ?? avgHp} (${char.hp.max} → ${char.hp.max + (hpGain ?? avgHp)})`} C={C} color="#22c55e" />
                {isAsiLevel && asiMode === 'asi' && (asiPicks.a || asiSingle) && (
                  <SummaryRow label="ASI" value={
                    asiSingle
                      ? `${STAT_LABELS[asiSingle]} +2`
                      : `${STAT_LABELS[asiPicks.a]} +1, ${STAT_LABELS[asiPicks.b] || '?'} +1`
                  } C={C} color={C.gold} />
                )}
                {isAsiLevel && asiMode === 'feat' && featPick && (
                  <SummaryRow label="Feat" value={featPick.name} C={C} color={C.gold} />
                )}
                {newFeatures.map(f => (
                  <SummaryRow key={f.name} label="New Feature" value={f.name} C={C} color="#a855f7" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 20px', borderTop: `1px solid ${C.border}`,
          background: C.card, flexShrink: 0,
          display: 'flex', gap: 8,
        }}>
          {step > 0 && (
            <Btn onClick={back} style={{ padding: '8px 16px' }}>← Back</Btn>
          )}
          <div style={{ flex: 1 }} />
          {isLast ? (
            <Btn variant="gold" onClick={confirm} style={{ padding: '8px 24px' }}>
              <CheckIcon style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }} />
              Level Up!
            </Btn>
          ) : (
            hpGain !== null || currentStep !== 'hp' ? (
              <Btn variant="gold" onClick={next} style={{ padding: '8px 24px' }}>
                Next <ArrowForwardIcon style={{ fontSize: 14, verticalAlign: 'middle', marginLeft: 4 }} />
              </Btn>
            ) : (
              <div style={{ fontSize: 11, color: C.textMuted, alignSelf: 'center' }}>
                Choose HP gain to continue
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, C, color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 14px', background: C.card,
      border: `1px solid ${C.border}`, borderRadius: 5,
      borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, width: 90, flexShrink: 0 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color }}>{value}</div>
    </div>
  )
}
