import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useT, THEMES } from '../themes.js'
import { mod, fmt, profB, totalLevel } from '../utils.js'
import { SecHdr } from './UI.jsx'

const DICE = [
  { name: 'd4',   max: 4   },
  { name: 'd6',   max: 6   },
  { name: 'd8',   max: 8   },
  { name: 'd10',  max: 10  },
  { name: 'd12',  max: 12  },
  { name: 'd20',  max: 20  },
  { name: 'd100', max: 100 },
]

export const THEME_FX = {
  vcr:      { color: '#ff3c00', particles: [],                              label: 'ROLL' },
  moon:     { color: '#c8b8ff', particles: ['✦','★','✧','☽','✦','★','✧'],  label: 'CAST' },
  sakura:   { color: '#cc2878', particles: ['🌸','✿','🌸','🌸','✿','🌸'],   label: 'ROLL' },
  racing:   { color: '#00e5cc', particles: ['▶','▶','▶','▶','▶','▶'],       label: 'GO!'  },
  kuromi:   { color: '#c840ff', particles: ['⚡','✦','⚡','☠','⚡','✦'],     label: 'ROLL' },
  mymelody: { color: '#d82858', particles: ['♥','♡','♥','✿','♥','♡','♥'],  label: 'ROLL' },
}

// Shared hook for rolling logic — used by DiceRoller and TabCore
export function useRollEngine(rollMode, themeKey) {
  const fx = THEME_FX[themeKey] || THEME_FX.vcr

  const [rolling,    setRolling]    = useState(false)
  const [displayNum, setDisplayNum] = useState(null)   // number | [n,n]
  const [result,     setResult]     = useState(null)
  const [particles,  setParticles]  = useState([])
  const timerRef  = useRef(null)
  const glitchRef = useRef(null)

  useEffect(() => () => {
    clearTimeout(timerRef.current)
    clearInterval(glitchRef.current)
  }, [])

  const roll = useCallback((dieName, modVal, label = null) => {
    if (rolling) return
    const max = DICE.find(d => d.name === dieName)?.max
    if (!max) return

    const useTwo = dieName === 'd20' && rollMode !== 'normal'

    setRolling(true)
    setResult(null)

    if (fx.particles.length > 0) {
      setParticles(fx.particles.map((emoji, i) => ({
        id: i + Date.now(),
        emoji,
        angle: (i / fx.particles.length) * 360 + Math.random() * 20 - 10,
        dist: 55 + Math.random() * 35,
      })))
    }

    clearInterval(glitchRef.current)
    const flickerMs = themeKey === 'vcr' ? 55 : themeKey === 'racing' ? 65 : 90
    glitchRef.current = setInterval(() => {
      setDisplayNum(useTwo
        ? [Math.floor(Math.random() * max) + 1, Math.floor(Math.random() * max) + 1]
        : Math.floor(Math.random() * max) + 1
      )
    }, flickerMs)

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      clearInterval(glitchRef.current)
      const die1 = Math.floor(Math.random() * max) + 1
      const die2 = useTwo ? Math.floor(Math.random() * max) + 1 : null
      let keptIdx = 0, kept = die1
      if (useTwo) {
        if (rollMode === 'advantage') {
          keptIdx = die1 >= die2 ? 0 : 1
          kept = Math.max(die1, die2)
        } else {
          keptIdx = die1 <= die2 ? 0 : 1
          kept = Math.min(die1, die2)
        }
      }
      const total = kept + Number(modVal)
      setDisplayNum(null)
      setResult({ die1, die2, keptIdx, kept, total, die: dieName, mod: Number(modVal), mode: rollMode, label })
      setRolling(false)
      setParticles([])
    }, 700)
  }, [rolling, fx, themeKey, rollMode])

  return { rolling, displayNum, result, particles, roll, setResult, fx }
}

function ModeToggle({ rollMode, setRollMode, C }) {
  return (
    <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
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
            padding: '6px 4px', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
            transition: 'all 0.13s',
            boxShadow: rollMode === key ? `0 0 8px ${color}33` : 'none',
          }}>
          {label}
        </button>
      ))}
    </div>
  )
}

export function RollDisplay({ result, rolling, displayNum, particles, themeKey, C, fx, compact = false }) {
  if (!result && !rolling) return null
  const isCrit   = result && result.die === 'd20' && result.kept === 20
  const isFumble = result && result.die === 'd20' && result.kept === 1
  const resultColor = isCrit ? C.green : isFumble ? C.red : fx.color

  return (
    <div style={{
      background: C.card, border: `1px solid ${compact ? C.border : fx.color + '44'}`,
      borderLeft: `3px solid ${resultColor}`,
      padding: compact ? '10px 14px' : '18px',
      position: 'relative', overflow: 'hidden',
      marginBottom: compact ? 0 : 14,
    }}>
      {/* Racing/VCR overlays */}
      {themeKey === 'racing' && rolling && (
        <div className="dice-speed-lines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
      )}
      {themeKey === 'vcr' && rolling && (
        <div className="dice-vcr-flicker" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
      )}

      {/* Particles */}
      {particles.map(p => {
        const rad = (p.angle * Math.PI) / 180
        return (
          <div key={p.id}
            className={`dice-particle dice-particle-${themeKey}`}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              '--dx': `${Math.cos(rad) * p.dist}px`,
              '--dy': `${Math.sin(rad) * p.dist}px`,
              fontSize: themeKey === 'racing' ? 16 : 20,
              pointerEvents: 'none', zIndex: 2, color: fx.color, lineHeight: 1,
            }}
          >{p.emoji}</div>
        )
      })}

      <div style={{ textAlign: 'center', position: 'relative' }}>
        {/* Label */}
        {result?.label && (
          <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 }}>
            {result.label}
          </div>
        )}

        {/* Rolling */}
        {rolling && displayNum !== null && (
          Array.isArray(displayNum) ? (
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
              {displayNum.map((n, i) => (
                <div key={i} className={`dice-rolling-num dice-rolling-${themeKey}`}
                  style={{ fontSize: compact ? 48 : 64, fontWeight: 900, color: fx.color, lineHeight: 1, textShadow: `0 0 20px ${fx.color}88` }}>
                  {n}
                </div>
              ))}
            </div>
          ) : (
            <div className={`dice-rolling-num dice-rolling-${themeKey}`}
              style={{ fontSize: compact ? 56 : 80, fontWeight: 900, color: fx.color, lineHeight: 1, textShadow: `0 0 24px ${fx.color}88` }}>
              {displayNum}
            </div>
          )
        )}

        {/* Result */}
        {!rolling && result && (
          <div className={`dice-result-${themeKey}`}>
            {result.die2 !== null ? (
              /* Two dice (adv/disadv) */
              <>
                <div style={{ display: 'flex', gap: compact ? 12 : 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                  {[result.die1, result.die2].map((d, idx) => {
                    const isKept = idx === result.keptIdx
                    return (
                      <div key={idx} style={{
                        fontSize: isKept ? (compact ? 52 : 72) : (compact ? 26 : 36),
                        fontWeight: 900, lineHeight: 1,
                        color: isKept ? resultColor : C.textMuted,
                        textDecoration: !isKept ? 'line-through' : 'none',
                        opacity: isKept ? 1 : 0.35,
                        textShadow: isKept ? `0 0 24px ${resultColor}77` : 'none',
                        transition: 'all 0.2s',
                      }}>{d}</div>
                    )
                  })}
                </div>
                <div style={{ fontSize: compact ? 22 : 30, fontWeight: 700, color: resultColor }}>
                  {result.total}
                </div>
                {result.mod !== 0 && (
                  <div style={{ fontSize: 10, color: C.textDim, marginTop: 3 }}>
                    {result.kept} {result.mod > 0 ? `+${result.mod}` : result.mod} = {result.total}
                  </div>
                )}
                <div style={{ fontSize: 8, color: result.mode === 'advantage' ? C.green : C.red, letterSpacing: 2, marginTop: 4, textTransform: 'uppercase' }}>
                  {result.mode}
                </div>
              </>
            ) : (
              /* Single die */
              <>
                <div style={{
                  fontSize: compact ? 56 : 80, fontWeight: 900, lineHeight: 1,
                  color: resultColor,
                  textShadow: `0 0 30px ${resultColor}88, 0 0 60px ${resultColor}33`,
                }}>
                  {result.total}
                </div>
                {result.mod !== 0 && (
                  <div style={{ fontSize: 11, color: C.textDim, marginTop: 6 }}>
                    {result.die1} {result.mod > 0 ? `+${result.mod}` : result.mod} = {result.total}
                  </div>
                )}
                {isCrit   && <div style={{ fontSize: 11, color: C.green, letterSpacing: 4, textTransform: 'uppercase', marginTop: 5, textShadow: `0 0 10px ${C.green}` }}>✦ Critical! ✦</div>}
                {isFumble && <div style={{ fontSize: 11, color: C.red,   letterSpacing: 4, textTransform: 'uppercase', marginTop: 5 }}>Fumble!</div>}
                <div style={{ fontSize: 9, color: C.textMuted, marginTop: 5, letterSpacing: 1 }}>
                  {result.die}{result.mod !== 0 ? ` ${result.mod >= 0 ? '+' : ''}${result.mod}` : ''}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function DiceRoller({ char, rollMode, setRollMode }) {
  const C        = useT()
  const themeKey = Object.entries(THEMES).find(([, t]) => t.gold === C.gold)?.[0] || 'vcr'

  const lvl      = totalLevel(char)
  const pb       = profB(lvl)
  const strMod   = mod(char.stats.str)
  const dexMod   = mod(char.stats.dex)
  const spellMod = Math.max(mod(char.stats.int), mod(char.stats.wis), mod(char.stats.cha))
  const spellAtk = pb + spellMod
  const spellDC  = 8 + pb + spellMod

  const [selectedDie, setSelectedDie] = useState('d20')
  const [modifier,    setModifier]    = useState(0)
  const [history,     setHistory]     = useState([])

  const { rolling, displayNum, result, particles, roll, setResult, fx } =
    useRollEngine(rollMode, themeKey)

  const doRoll = (dieName, modVal) => {
    roll(dieName, modVal)
    setHistory(prev => {
      // history updated after roll finishes — use a deferred update via effect below
      return prev
    })
  }

  // Sync finished rolls into history
  const prevResult = useRef(null)
  useEffect(() => {
    if (result && result !== prevResult.current) {
      prevResult.current = result
      setHistory(prev => [{ ...result, id: Date.now() }, ...prev].slice(0, 8))
    }
  }, [result])

  const quickRoll = (m, die = 'd20') => {
    setSelectedDie(die)
    setModifier(m)
    roll(die, m)
  }

  return (
    <div>
      <SecHdr>Spell to Hit</SecHdr>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 22 }}>
        {[
          { label: 'SPELL ATK', val: spellAtk, sub: `+${pb} · +${spellMod} cast` },
          { label: 'STR ATK',   val: pb + strMod, sub: `+${pb} · +${strMod} str`   },
          { label: 'DEX ATK',   val: pb + dexMod, sub: `+${pb} · +${dexMod} dex`   },
          { label: 'SPELL DC',  val: spellDC,  sub: `8+${pb}+${spellMod}`, noRoll: true },
        ].map(({ label, val, sub, noRoll }) => (
          <div key={label}
            onClick={noRoll ? undefined : () => quickRoll(val)}
            className={noRoll ? '' : 'hov-btn'}
            style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderTop: `3px solid ${noRoll ? C.blue : fx.color}`,
              padding: '10px 12px', textAlign: 'center',
              cursor: noRoll ? 'default' : 'pointer',
            }}>
            <div style={{ fontSize: 8, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: noRoll ? C.blue : fx.color }}>{noRoll ? val : fmt(val)}</div>
            <div style={{ fontSize: 8, color: C.textMuted, marginTop: 3 }}>{sub}</div>
            {!noRoll && <div style={{ fontSize: 8, color: fx.color + '88', marginTop: 3, letterSpacing: 1 }}>click to roll</div>}
          </div>
        ))}
      </div>

      <SecHdr>Dice Roller</SecHdr>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '18px', marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
        {/* Racing/VCR overlays */}
        {themeKey === 'racing' && rolling && (
          <div className="dice-speed-lines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
        )}
        {themeKey === 'vcr' && rolling && (
          <div className="dice-vcr-flicker" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
        )}

        {/* Die selector */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 12, flexWrap: 'wrap' }}>
          {DICE.map(({ name }) => (
            <button key={name} onClick={() => { setSelectedDie(name); setResult(null) }}
              style={{
                background: selectedDie === name ? fx.color + '1a' : 'transparent',
                border: `1px solid ${selectedDie === name ? fx.color : C.border}`,
                color: selectedDie === name ? fx.color : C.textMuted,
                padding: '5px 11px', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 11, fontWeight: 700, letterSpacing: 1, transition: 'all 0.13s',
                boxShadow: selectedDie === name ? `0 0 10px ${fx.color}33` : 'none',
              }}>
              {name}
            </button>
          ))}
        </div>

        {/* Adv / disadv toggle */}
        <ModeToggle rollMode={rollMode} setRollMode={setRollMode} C={C} />

        {/* Result area */}
        <div style={{ position: 'relative', minHeight: 120, marginBottom: 14 }}>
          {particles.map(p => {
            const rad = (p.angle * Math.PI) / 180
            return (
              <div key={p.id}
                className={`dice-particle dice-particle-${themeKey}`}
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  '--dx': `${Math.cos(rad) * p.dist}px`,
                  '--dy': `${Math.sin(rad) * p.dist}px`,
                  fontSize: themeKey === 'racing' ? 16 : 20,
                  pointerEvents: 'none', zIndex: 2, color: fx.color, lineHeight: 1,
                }}
              >{p.emoji}</div>
            )
          })}

          <div style={{ textAlign: 'center', paddingTop: 10 }}>
            {rolling && displayNum !== null && (
              Array.isArray(displayNum) ? (
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
                  {displayNum.map((n, i) => (
                    <div key={i} className={`dice-rolling-num dice-rolling-${themeKey}`}
                      style={{ fontSize: 64, fontWeight: 900, color: fx.color, lineHeight: 1, textShadow: `0 0 20px ${fx.color}88` }}>
                      {n}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`dice-rolling-num dice-rolling-${themeKey}`}
                  style={{ fontSize: 80, fontWeight: 900, color: fx.color, lineHeight: 1, textShadow: `0 0 24px ${fx.color}88` }}>
                  {displayNum}
                </div>
              )
            )}

            {!rolling && result && (() => {
              const isCrit   = result.die === 'd20' && result.kept === 20
              const isFumble = result.die === 'd20' && result.kept === 1
              const rc = isCrit ? C.green : isFumble ? C.red : fx.color
              return (
                <div className={`dice-result-${themeKey}`}>
                  {result.die2 !== null ? (
                    <>
                      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                        {[result.die1, result.die2].map((d, idx) => {
                          const isKept = idx === result.keptIdx
                          return (
                            <div key={idx} style={{
                              fontSize: isKept ? 72 : 36, fontWeight: 900, lineHeight: 1,
                              color: isKept ? rc : C.textMuted,
                              textDecoration: !isKept ? 'line-through' : 'none',
                              opacity: isKept ? 1 : 0.35,
                              textShadow: isKept ? `0 0 24px ${rc}77` : 'none',
                            }}>{d}</div>
                          )
                        })}
                      </div>
                      <div style={{ fontSize: 30, fontWeight: 700, color: rc }}>{result.total}</div>
                      {result.mod !== 0 && (
                        <div style={{ fontSize: 11, color: C.textDim, marginTop: 4 }}>
                          {result.kept} {result.mod >= 0 ? `+${result.mod}` : result.mod} = {result.total}
                        </div>
                      )}
                      <div style={{ fontSize: 8, color: result.mode === 'advantage' ? C.green : C.red, letterSpacing: 2, marginTop: 4, textTransform: 'uppercase' }}>
                        {result.mode}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 80, fontWeight: 900, lineHeight: 1, color: rc, textShadow: `0 0 30px ${rc}88, 0 0 60px ${rc}33` }}>
                        {result.total}
                      </div>
                      {result.mod !== 0 && (
                        <div style={{ fontSize: 12, color: C.textDim, marginTop: 6 }}>
                          {result.die1} {result.mod >= 0 ? `+${result.mod}` : result.mod} = {result.total}
                        </div>
                      )}
                      {isCrit   && <div style={{ fontSize: 11, color: C.green, letterSpacing: 4, textTransform: 'uppercase', marginTop: 5, textShadow: `0 0 10px ${C.green}` }}>✦ Critical! ✦</div>}
                      {isFumble && <div style={{ fontSize: 11, color: C.red,   letterSpacing: 4, textTransform: 'uppercase', marginTop: 5 }}>Fumble!</div>}
                      <div style={{ fontSize: 9, color: C.textMuted, marginTop: 5, letterSpacing: 1 }}>
                        {result.die}{result.mod !== 0 ? ` ${result.mod >= 0 ? '+' : ''}${result.mod}` : ''}
                      </div>
                    </>
                  )}
                </div>
              )
            })()}

            {!rolling && !result && (
              <div style={{ fontSize: 56, color: C.textMuted, opacity: 0.2 }}>{selectedDie}</div>
            )}
          </div>
        </div>

        {/* Modifier + Roll button */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase' }}>MOD</span>
            <button onClick={() => setModifier(m => m - 1)}
              style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.text, padding: '5px 11px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 16, lineHeight: 1 }}>−</button>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.gold, minWidth: 44, textAlign: 'center' }}>{fmt(modifier)}</div>
            <button onClick={() => setModifier(m => m + 1)}
              style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.text, padding: '5px 11px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 16, lineHeight: 1 }}>+</button>
          </div>
          <button className="hov-btn" onClick={() => doRoll(selectedDie, modifier)} disabled={rolling}
            style={{
              flex: 1, background: rolling ? 'transparent' : fx.color + '1a',
              border: `2px solid ${rolling ? C.border : fx.color}`,
              color: rolling ? C.textMuted : fx.color,
              padding: '13px', cursor: rolling ? 'default' : 'pointer',
              fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
              letterSpacing: 3, textTransform: 'uppercase', transition: 'all 0.18s',
              boxShadow: rolling ? 'none' : `0 0 18px ${fx.color}33`,
            }}>
            {rolling ? '· · ·' : `${fx.label} ${selectedDie}`}
          </button>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>History</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {history.map((h, i) => {
              const hCrit   = h.die === 'd20' && h.kept === 20
              const hFumble = h.die === 'd20' && h.kept === 1
              return (
                <div key={h.id} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 12px', background: C.card, opacity: 1 - i * 0.1,
                  border: `1px solid ${hCrit ? C.green + '44' : hFumble ? C.red + '44' : C.border}`,
                  borderLeft: `3px solid ${hCrit ? C.green : hFumble ? C.red : fx.color + '55'}`,
                }}>
                  <span style={{ fontSize: 9, color: C.textMuted, minWidth: 32, letterSpacing: 1 }}>{h.die}</span>
                  {h.die2 !== null && (
                    <span style={{ fontSize: 9, color: C.textMuted }}>
                      [{h.keptIdx === 0 ? <b style={{ color: C.text }}>{h.die1}</b> : h.die1}/{h.keptIdx === 1 ? <b style={{ color: C.text }}>{h.die2}</b> : h.die2}]
                    </span>
                  )}
                  <span style={{ fontSize: 16, fontWeight: 700, color: hCrit ? C.green : hFumble ? C.red : C.text }}>{h.total}</span>
                  {h.mod !== 0 && <span style={{ fontSize: 10, color: C.textDim }}>({h.kept} {h.mod >= 0 ? `+${h.mod}` : h.mod})</span>}
                  {h.mode !== 'normal' && <span style={{ fontSize: 8, color: h.mode === 'advantage' ? C.green : C.red, letterSpacing: 1, textTransform: 'uppercase' }}>{h.mode.slice(0,3)}</span>}
                  {hCrit   && <span style={{ fontSize: 9, color: C.green, letterSpacing: 2, marginLeft: 'auto' }}>CRIT ✦</span>}
                  {hFumble && <span style={{ fontSize: 9, color: C.red,   letterSpacing: 2, marginLeft: 'auto' }}>FUMBLE</span>}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
