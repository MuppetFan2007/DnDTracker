import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useT, THEMES } from '../themes.js'
import { mod, fmt, profB, totalLevel } from '../utils.js'
import { SecHdr } from './UI.jsx'

const DAMAGE_DICE = [
  { name: 'd4',  max: 4  },
  { name: 'd6',  max: 6  },
  { name: 'd8',  max: 8  },
  { name: 'd10', max: 10 },
  { name: 'd12', max: 12 },
]

export const THEME_FX = {
  vcr:      { color: '#ff3c00', particles: [],                              label: 'ROLL' },
  moon:     { color: '#c8b8ff', particles: ['✦','★','✧','☽','✦','★','✧'],  label: 'CAST' },
  sakura:   { color: '#cc2878', particles: ['🌸','✿','🌸','🌸','✿','🌸'],   label: 'ROLL' },
  racing:   { color: '#00e5cc', particles: ['▶','▶','▶','▶','▶','▶'],       label: 'GO!'  },
  kuromi:   { color: '#c840ff', particles: ['⚡','✦','⚡','☠','⚡','✦'],     label: 'ROLL' },
  mymelody: { color: '#d82858', particles: ['♥','♡','♥','✿','♥','♡','♥'],  label: 'ROLL' },
}

// Shared hook — d20 rolling with adv/disadv, used by DiceRoller and TabCore
export function useRollEngine(rollMode, themeKey) {
  const fx = THEME_FX[themeKey] || THEME_FX.vcr

  const [rolling,    setRolling]    = useState(false)
  const [displayNum, setDisplayNum] = useState(null)
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
    const max = dieName === 'd20' ? 20 : (DAMAGE_DICE.find(d => d.name === dieName)?.max ?? 20)
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
        if (rollMode === 'advantage') { keptIdx = die1 >= die2 ? 0 : 1; kept = Math.max(die1, die2) }
        else                          { keptIdx = die1 <= die2 ? 0 : 1; kept = Math.min(die1, die2) }
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
            padding: '7px 4px', cursor: 'pointer', fontFamily: 'inherit',
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

function Particles({ particles, themeKey, fx }) {
  return particles.map(p => {
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
  })
}

// ── exported so TabCore can use it ──────────────────────────────────────────
export function RollDisplay() { return null } // kept for import compat

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

  // ── d20 engine ──────────────────────────────────────────────────────────
  const { rolling, displayNum, result, particles, roll, setResult, fx } =
    useRollEngine(rollMode, themeKey)
  const [d20Mod, setD20Mod] = useState(0)

  // ── Damage multi-dice state ─────────────────────────────────────────────
  const [dmgDie,     setDmgDie]     = useState('d6')
  const [dmgCount,   setDmgCount]   = useState(1)
  const [dmgMod,     setDmgMod]     = useState(0)
  const [dmgRolling, setDmgRolling] = useState(false)
  const [dmgDisplay, setDmgDisplay] = useState(null)   // array during flicker
  const [dmgResult,  setDmgResult]  = useState(null)
  const [dmgParticles, setDmgParticles] = useState([])
  const dmgTimerRef  = useRef(null)
  const dmgGlitchRef = useRef(null)

  useEffect(() => () => {
    clearTimeout(dmgTimerRef.current)
    clearInterval(dmgGlitchRef.current)
  }, [])

  // ── Combined history ────────────────────────────────────────────────────
  const [history, setHistory] = useState([])
  const prevResult = useRef(null)
  useEffect(() => {
    if (result && result !== prevResult.current) {
      prevResult.current = result
      setHistory(prev => [{ type: 'd20', ...result, id: Date.now() }, ...prev].slice(0, 10))
    }
  }, [result])

  // ── Quick-roll (attack buttons → d20) ───────────────────────────────────
  const quickRoll = (m) => {
    setDmgResult(null)
    setD20Mod(m)
    roll('d20', m)
  }

  // ── Damage roll ─────────────────────────────────────────────────────────
  const rollDamage = () => {
    if (dmgRolling || rolling) return
    const max = DAMAGE_DICE.find(d => d.name === dmgDie)?.max ?? 6
    const count = Math.max(1, dmgCount)

    setResult(null)      // clear d20 display
    setDmgRolling(true)
    setDmgResult(null)

    if (fx.particles.length > 0) {
      const pList = fx.particles.slice(0, Math.min(count + 2, 8))
      setDmgParticles(pList.map((emoji, i) => ({
        id: i + Date.now(), emoji,
        angle: (i / pList.length) * 360 + Math.random() * 30 - 15,
        dist: 50 + Math.random() * 30,
      })))
    }

    clearInterval(dmgGlitchRef.current)
    const flickerMs = themeKey === 'vcr' ? 55 : themeKey === 'racing' ? 65 : 90
    dmgGlitchRef.current = setInterval(() => {
      setDmgDisplay(Array.from({ length: count }, () => Math.floor(Math.random() * max) + 1))
    }, flickerMs)

    clearTimeout(dmgTimerRef.current)
    dmgTimerRef.current = setTimeout(() => {
      clearInterval(dmgGlitchRef.current)
      const dice = Array.from({ length: count }, () => Math.floor(Math.random() * max) + 1)
      const total = dice.reduce((a, b) => a + b, 0) + dmgMod
      setDmgDisplay(null)
      setDmgResult({ dice, total, dieType: dmgDie, count, mod: dmgMod })
      setDmgRolling(false)
      setDmgParticles([])
      setHistory(prev => [{ type: 'dmg', dice, total, dieType: dmgDie, count, mod: dmgMod, id: Date.now() }, ...prev].slice(0, 10))
    }, 700)
  }

  const stepper = (val, set, min = -20, max = 20, label = 'MOD') => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{ fontSize: 8, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase', minWidth: 28 }}>{label}</span>
      <button onClick={() => set(v => Math.max(min, v - 1))}
        style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.text, padding: '5px 10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, lineHeight: 1 }}>−</button>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.gold, minWidth: 38, textAlign: 'center' }}>
        {label === 'MOD' ? fmt(val) : val}
      </div>
      <button onClick={() => set(v => Math.min(max, v + 1))}
        style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.text, padding: '5px 10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, lineHeight: 1 }}>+</button>
    </div>
  )

  // d20 result colors
  const isCrit   = result?.die === 'd20' && result?.kept === 20
  const isFumble = result?.die === 'd20' && result?.kept === 1
  const d20Color = isCrit ? C.green : isFumble ? C.red : fx.color

  // damage: highlight max rolls
  const dmgMax = DAMAGE_DICE.find(d => d.name === dmgDie)?.max ?? 6

  return (
    <div>
      {/* ── Attack Quick-Roll Buttons ───────────────────────────────────── */}
      <SecHdr>Attack Rolls</SecHdr>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 24 }}>
        {[
          { label: 'SPELL ATK', val: spellAtk,     sub: `+${pb} prof · +${spellMod} cast` },
          { label: 'STR ATK',   val: pb + strMod,  sub: `+${pb} prof · +${strMod} str`    },
          { label: 'DEX ATK',   val: pb + dexMod,  sub: `+${pb} prof · +${dexMod} dex`    },
          { label: 'SPELL DC',  val: spellDC,       sub: `8 + ${pb} + ${spellMod}`, dc: true },
        ].map(({ label, val, sub, dc }) => (
          <div key={label}
            onClick={dc ? undefined : () => quickRoll(val)}
            className={dc ? '' : 'hov-btn'}
            style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderTop: `3px solid ${dc ? C.blue : fx.color}`,
              padding: '10px 12px', textAlign: 'center',
              cursor: dc ? 'default' : 'pointer',
            }}>
            <div style={{ fontSize: 8, color: C.textMuted, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: dc ? C.blue : fx.color }}>{dc ? val : fmt(val)}</div>
            <div style={{ fontSize: 8, color: C.textMuted, marginTop: 3 }}>{sub}</div>
            {!dc && <div style={{ fontSize: 8, color: fx.color + '88', marginTop: 3, letterSpacing: 1 }}>click to roll</div>}
          </div>
        ))}
      </div>

      {/* ── d20 Roller ─────────────────────────────────────────────────── */}
      <SecHdr>d20 Check</SecHdr>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '18px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        {themeKey === 'racing' && rolling && <div className="dice-speed-lines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />}
        {themeKey === 'vcr'    && rolling && <div className="dice-vcr-flicker" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />}

        {/* Adv/disadv */}
        <ModeToggle rollMode={rollMode} setRollMode={setRollMode} C={C} />

        {/* Result area */}
        <div style={{ position: 'relative', minHeight: 110, textAlign: 'center', marginBottom: 16 }}>
          <Particles particles={particles} themeKey={themeKey} fx={fx} />

          {/* Flickering */}
          {rolling && displayNum !== null && (
            Array.isArray(displayNum) ? (
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                {displayNum.map((n, i) => (
                  <div key={i} className={`dice-rolling-num dice-rolling-${themeKey}`}
                    style={{ fontSize: 72, fontWeight: 900, color: fx.color, lineHeight: 1, textShadow: `0 0 22px ${fx.color}88` }}>
                    {n}
                  </div>
                ))}
              </div>
            ) : (
              <div className={`dice-rolling-num dice-rolling-${themeKey}`}
                style={{ fontSize: 90, fontWeight: 900, color: fx.color, lineHeight: 1, textShadow: `0 0 28px ${fx.color}88`, paddingTop: 6 }}>
                {displayNum}
              </div>
            )
          )}

          {/* Result */}
          {!rolling && result && (
            <div className={`dice-result-${themeKey}`} style={{ paddingTop: 6 }}>
              {result.label && (
                <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 }}>
                  {result.label}
                </div>
              )}
              {result.die2 !== null ? (
                /* Adv/disadv — two dice */
                <>
                  <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                    {[result.die1, result.die2].map((d, idx) => {
                      const kept = idx === result.keptIdx
                      return (
                        <div key={idx} style={{
                          fontSize: kept ? 80 : 40, fontWeight: 900, lineHeight: 1,
                          color: kept ? d20Color : C.textMuted,
                          textDecoration: !kept ? 'line-through' : 'none',
                          opacity: kept ? 1 : 0.35,
                          textShadow: kept ? `0 0 28px ${d20Color}77` : 'none',
                        }}>{d}</div>
                      )
                    })}
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: d20Color }}>{result.total}</div>
                  {result.mod !== 0 && (
                    <div style={{ fontSize: 11, color: C.textDim, marginTop: 4 }}>
                      {result.kept} {result.mod >= 0 ? `+${result.mod}` : result.mod} = {result.total}
                    </div>
                  )}
                  <div style={{ fontSize: 9, color: result.mode === 'advantage' ? C.green : C.red, letterSpacing: 2, marginTop: 5, textTransform: 'uppercase' }}>
                    {result.mode}
                  </div>
                </>
              ) : (
                /* Normal — one die */
                <>
                  <div style={{ fontSize: 90, fontWeight: 900, lineHeight: 1, color: d20Color, textShadow: `0 0 36px ${d20Color}88, 0 0 70px ${d20Color}33` }}>
                    {result.total}
                  </div>
                  {result.mod !== 0 && (
                    <div style={{ fontSize: 12, color: C.textDim, marginTop: 6 }}>
                      {result.die1} {result.mod >= 0 ? `+${result.mod}` : result.mod} = {result.total}
                    </div>
                  )}
                  {isCrit   && <div style={{ fontSize: 13, color: C.green, letterSpacing: 4, textTransform: 'uppercase', marginTop: 6, textShadow: `0 0 14px ${C.green}` }}>✦ Critical! ✦</div>}
                  {isFumble && <div style={{ fontSize: 13, color: C.red,   letterSpacing: 4, textTransform: 'uppercase', marginTop: 6 }}>Fumble!</div>}
                </>
              )}
            </div>
          )}

          {!rolling && !result && (
            <div style={{ fontSize: 64, color: C.textMuted, opacity: 0.15, paddingTop: 10, userSelect: 'none' }}>20</div>
          )}
        </div>

        {/* Modifier + Roll */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {stepper(d20Mod, setD20Mod, -20, 30)}
          <button className="hov-btn" onClick={() => roll('d20', d20Mod)} disabled={rolling}
            style={{
              flex: 1, background: rolling ? 'transparent' : fx.color + '1a',
              border: `2px solid ${rolling ? C.border : fx.color}`,
              color: rolling ? C.textMuted : fx.color,
              padding: '14px', cursor: rolling ? 'default' : 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
              letterSpacing: 3, textTransform: 'uppercase', transition: 'all 0.18s',
              boxShadow: rolling ? 'none' : `0 0 20px ${fx.color}33`,
            }}>
            {rolling ? '· · ·' : `${fx.label} D20`}
          </button>
        </div>
      </div>

      {/* ── Damage / Multi-Dice Roller ──────────────────────────────────── */}
      <SecHdr>Damage Dice</SecHdr>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '18px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        {themeKey === 'racing' && dmgRolling && <div className="dice-speed-lines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />}
        {themeKey === 'vcr'    && dmgRolling && <div className="dice-vcr-flicker" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />}

        {/* Die type selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {DAMAGE_DICE.map(({ name }) => (
            <button key={name} className="hov-btn" onClick={() => { setDmgDie(name); setDmgResult(null) }}
              style={{
                flex: 1, background: dmgDie === name ? fx.color + '1a' : 'transparent',
                border: `1px solid ${dmgDie === name ? fx.color : C.border}`,
                color: dmgDie === name ? fx.color : C.textMuted,
                padding: '7px 4px', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 11, fontWeight: 700, letterSpacing: 1, transition: 'all 0.13s',
                boxShadow: dmgDie === name ? `0 0 10px ${fx.color}33` : 'none',
              }}>
              {name}
            </button>
          ))}
        </div>

        {/* Count + mod steppers */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
          {stepper(dmgCount, setDmgCount, 1, 20, 'DICE')}
          {stepper(dmgMod,   setDmgMod,  -20, 30, 'MOD')}
          {/* formula preview */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: C.textMuted, letterSpacing: 2, fontWeight: 700 }}>
              {dmgCount}{dmgDie}{dmgMod !== 0 ? ` ${dmgMod >= 0 ? '+' : ''}${dmgMod}` : ''}
            </span>
          </div>
        </div>

        {/* Result area */}
        <div style={{ position: 'relative', minHeight: 90, textAlign: 'center', marginBottom: 14 }}>
          <Particles particles={dmgParticles} themeKey={themeKey} fx={fx} />

          {/* Flickering multiple dice */}
          {dmgRolling && dmgDisplay && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', paddingTop: 8 }}>
              {dmgDisplay.map((n, i) => (
                <div key={i} className={`dice-rolling-num dice-rolling-${themeKey}`}
                  style={{
                    fontSize: dmgCount > 6 ? 24 : dmgCount > 3 ? 32 : 48,
                    fontWeight: 900, color: fx.color, lineHeight: 1,
                    textShadow: `0 0 16px ${fx.color}88`,
                    minWidth: dmgCount > 6 ? 28 : 36, textAlign: 'center',
                  }}>
                  {n}
                </div>
              ))}
            </div>
          )}

          {/* Result: individual dice chips + total */}
          {!dmgRolling && dmgResult && (
            <div className={`dice-result-${themeKey}`}>
              {/* Individual die chips */}
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10 }}>
                {dmgResult.dice.map((d, i) => {
                  const isMax = d === dmgMax
                  const isMin = d === 1
                  return (
                    <div key={i} style={{
                      background: isMax ? fx.color + '22' : isMin ? C.red + '11' : C.surface,
                      border: `1px solid ${isMax ? fx.color : isMin ? C.red + '66' : C.border}`,
                      padding: '5px 10px', fontSize: 18, fontWeight: 700, lineHeight: 1,
                      color: isMax ? fx.color : isMin ? C.red : C.text,
                      minWidth: 36, textAlign: 'center',
                      boxShadow: isMax ? `0 0 8px ${fx.color}44` : 'none',
                    }}>{d}</div>
                  )
                })}
              </div>
              {/* Total */}
              <div style={{
                fontSize: 60, fontWeight: 900, lineHeight: 1,
                color: fx.color, textShadow: `0 0 24px ${fx.color}88, 0 0 50px ${fx.color}33`,
              }}>
                {dmgResult.total}
              </div>
              {/* Breakdown */}
              <div style={{ fontSize: 11, color: C.textDim, marginTop: 6 }}>
                {dmgResult.dice.join(' + ')}
                {dmgResult.mod !== 0 ? ` ${dmgResult.mod >= 0 ? '+' : ''}${dmgResult.mod}` : ''} = {dmgResult.total}
              </div>
            </div>
          )}

          {!dmgRolling && !dmgResult && (
            <div style={{ fontSize: 32, color: C.textMuted, opacity: 0.18, paddingTop: 12, userSelect: 'none', letterSpacing: 4 }}>
              {dmgCount}{dmgDie}
            </div>
          )}
        </div>

        {/* Roll button */}
        <button className="hov-btn" onClick={rollDamage} disabled={dmgRolling || rolling}
          style={{
            width: '100%',
            background: (dmgRolling || rolling) ? 'transparent' : fx.color + '1a',
            border: `2px solid ${(dmgRolling || rolling) ? C.border : fx.color}`,
            color: (dmgRolling || rolling) ? C.textMuted : fx.color,
            padding: '13px', cursor: (dmgRolling || rolling) ? 'default' : 'pointer',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase', transition: 'all 0.18s',
            boxShadow: (dmgRolling || rolling) ? 'none' : `0 0 18px ${fx.color}33`,
          }}>
          {dmgRolling ? '· · ·' : `${fx.label} ${dmgCount}${dmgDie}${dmgMod !== 0 ? (dmgMod > 0 ? ` + ${dmgMod}` : ` − ${Math.abs(dmgMod)}`) : ''}`}
        </button>
      </div>

      {/* ── Roll History ────────────────────────────────────────────────── */}
      {history.length > 0 && (
        <div>
          <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>History</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {history.map((h, i) => {
              if (h.type === 'd20') {
                const hCrit   = h.kept === 20
                const hFumble = h.kept === 1
                return (
                  <div key={h.id} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 12px', background: C.card, opacity: 1 - i * 0.08,
                    border: `1px solid ${hCrit ? C.green + '44' : hFumble ? C.red + '44' : C.border}`,
                    borderLeft: `3px solid ${hCrit ? C.green : hFumble ? C.red : fx.color + '66'}`,
                  }}>
                    <span style={{ fontSize: 9, color: C.textMuted, minWidth: 26, letterSpacing: 1 }}>d20</span>
                    {h.die2 !== null && (
                      <span style={{ fontSize: 9, color: C.textMuted }}>
                        [{h.keptIdx === 0 ? <b style={{ color: C.text }}>{h.die1}</b> : h.die1}/
                         {h.keptIdx === 1 ? <b style={{ color: C.text }}>{h.die2}</b> : h.die2}]
                      </span>
                    )}
                    <span style={{ fontSize: 16, fontWeight: 700, color: hCrit ? C.green : hFumble ? C.red : C.text }}>{h.total}</span>
                    {h.mod !== 0 && <span style={{ fontSize: 10, color: C.textDim }}>({h.kept} {h.mod >= 0 ? `+${h.mod}` : h.mod})</span>}
                    {h.label && <span style={{ fontSize: 9, color: C.textMuted }}>{h.label}</span>}
                    {h.mode !== 'normal' && <span style={{ fontSize: 8, color: h.mode === 'advantage' ? C.green : C.red, letterSpacing: 1, textTransform: 'uppercase' }}>{h.mode.slice(0,3)}</span>}
                    {hCrit   && <span style={{ fontSize: 9, color: C.green, letterSpacing: 2, marginLeft: 'auto' }}>CRIT ✦</span>}
                    {hFumble && <span style={{ fontSize: 9, color: C.red,   letterSpacing: 2, marginLeft: 'auto' }}>FUMBLE</span>}
                  </div>
                )
              }
              // damage roll
              return (
                <div key={h.id} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 12px', background: C.card, opacity: 1 - i * 0.08,
                  border: `1px solid ${C.border}`,
                  borderLeft: `3px solid ${C.yellow}66`,
                }}>
                  <span style={{ fontSize: 9, color: C.textMuted, minWidth: 36, letterSpacing: 1 }}>
                    {h.count}{h.dieType}{h.mod !== 0 ? (h.mod > 0 ? `+${h.mod}` : h.mod) : ''}
                  </span>
                  <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    {h.dice.map((d, di) => (
                      <span key={di} style={{ fontSize: 10, color: d === (DAMAGE_DICE.find(x => x.name === h.dieType)?.max ?? 0) ? fx.color : C.textDim,
                        fontWeight: d === (DAMAGE_DICE.find(x => x.name === h.dieType)?.max ?? 0) ? 700 : 400 }}>
                        {d}{di < h.dice.length - 1 ? '+' : ''}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: C.yellow, marginLeft: 4 }}>{h.total}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
