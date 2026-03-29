import React, { useState } from 'react'
import { useT } from '../themes.js'
import { DND } from '../data/dnd.js'
import { mod, fmt, profB, totalLevel } from '../utils.js'
import { SecHdr, useInp, Btn } from './UI.jsx'

const BASE_ACTIONS = [
  { id: 'attack',    name: 'Attack',       type: 'action',   icon: '⚔️', desc: 'Make one melee or ranged attack (or more with Extra Attack).' },
  { id: 'cast',      name: 'Cast a Spell', type: 'action',   icon: '✨', desc: 'Cast a spell with a casting time of 1 Action.' },
  { id: 'dash',      name: 'Dash',         type: 'action',   icon: '💨', desc: 'Gain extra movement equal to your Speed for the current turn.' },
  { id: 'disengage', name: 'Disengage',    type: 'action',   icon: '🌀', desc: "Your movement doesn't provoke Opportunity Attacks for the rest of the turn." },
  { id: 'dodge',     name: 'Dodge',        type: 'action',   icon: '🛡️', desc: "Attacks against you have Disadvantage; you have Advantage on Dex saves. Ends if you're Incapacitated or speed drops to 0." },
  { id: 'help',      name: 'Help',         type: 'action',   icon: '🤝', desc: 'Give Advantage to an ally\'s next ability check or attack roll against a creature within 5 ft.' },
  { id: 'hide',      name: 'Hide',         type: 'action',   icon: '👁️', desc: 'Make a Dexterity (Stealth) check to become hidden.' },
  { id: 'influence', name: 'Influence',    type: 'action',   icon: '💬', desc: 'Use Charisma (Persuasion, Deception, or Intimidation) to shift a creature\'s attitude.' },
  { id: 'magic',     name: 'Magic',        type: 'action',   icon: '🔮', desc: 'Use a magic item, activate a magical feature, or cast a cantrip.' },
  { id: 'ready',     name: 'Ready',        type: 'action',   icon: '⏱️', desc: 'Choose a trigger and prepare a reaction for when it occurs.' },
  { id: 'search',    name: 'Search',       type: 'action',   icon: '🔍', desc: 'Make a Perception or Investigation check to find something.' },
  { id: 'study',     name: 'Study',        type: 'action',   icon: '📚', desc: 'Make an Arcana, History, or Nature check to recall lore.' },
  { id: 'utilize',   name: 'Utilize',      type: 'action',   icon: '🖐️', desc: 'Interact with a second object or feature of the environment.' },
]

const BASE_BONUS_ACTIONS = [
  { id: 'offhand',     name: 'Nick / Off-Hand',  type: 'bonus', icon: '⚡', desc: 'When you take the Attack action with a Light weapon, make one extra attack with a different Light weapon.' },
  { id: 'bonus-cast',  name: 'Cast a Spell',     type: 'bonus', icon: '✨', desc: 'Cast a spell with a casting time of 1 Bonus Action (e.g., Healing Word, Misty Step).' },
  { id: 'cunning',     name: 'Cunning Action',   type: 'bonus', icon: '🗡️', desc: '(Rogue) Dash, Disengage, or Hide as a Bonus Action.' },
  { id: 'second-wind', name: 'Second Wind',      type: 'bonus', icon: '💪', desc: '(Fighter) Regain 1d10 + Fighter level HP. Recharges on Short or Long Rest.' },
  { id: 'fury',        name: 'Rage',             type: 'bonus', icon: '🔥', desc: '(Barbarian) Enter a Rage — resistance to B/P/S, Advantage on Str checks/saves, bonus damage.' },
  { id: 'wildshape',   name: 'Wild Shape',       type: 'bonus', icon: '🐾', desc: '(Druid) Transform into a beast form. Uses vary by level.' },
]

const BASE_REACTIONS = [
  { id: 'opp-attack',   name: 'Opportunity Attack', type: 'reaction', icon: '⚡', desc: 'When a creature you can see leaves your reach, make one melee attack against it.' },
  { id: 'readied',      name: 'Readied Action',     type: 'reaction', icon: '⏱️', desc: 'Trigger your Readied action when the specified trigger occurs.' },
  { id: 'shield-spell', name: 'Shield',             type: 'reaction', icon: '🛡️', desc: '(Wizard/Sorcerer) Cast when hit by an attack — gain +5 AC until your next turn.' },
  { id: 'absorb-elems', name: 'Absorb Elements',    type: 'reaction', icon: '💎', desc: '(Spellcaster) React to elemental damage, gaining resistance and bonus attack damage.' },
  { id: 'uncanny',      name: 'Uncanny Dodge',      type: 'reaction', icon: '👁️', desc: '(Rogue 5+) When hit by an attacker you can see, halve the damage.' },
  { id: 'counter',      name: 'Counterspell',       type: 'reaction', icon: '🚫', desc: '(Spellcaster) React to a creature casting a spell within 60 ft to interrupt it.' },
]

const TYPE_CONFIG = {
  action:   { label: 'Actions',       short: 'Action',   color: '#4ade80', bg: '#4ade8018' },
  bonus:    { label: 'Bonus Actions', short: 'Bonus',    color: '#60a5fa', bg: '#60a5fa18' },
  reaction: { label: 'Reactions',     short: 'Reaction', color: '#f472b6', bg: '#f472b618' },
}

export function CombatTab({ char, onChange }) {
  const C   = useT()
  const inp = useInp()
  const lvl = totalLevel(char)
  const pb  = profB(lvl)

  const used      = char.combatUsed || {}
  const setUsed   = (patch) => onChange({ ...char, combatUsed: { ...(char.combatUsed || {}), ...patch } })
  const resetTurn = () => onChange({ ...char, combatUsed: {} })

  const customs    = char.customActions || []
  const setCustoms = (list) => onChange({ ...char, customActions: list })

  const [addingType, setAddingType] = useState(null)
  const [newAction,  setNewAction]  = useState({ name: '', desc: '' })

  const allByType = (type) => [
    ...[...BASE_ACTIONS, ...BASE_BONUS_ACTIONS, ...BASE_REACTIONS].filter(a => a.type === type),
    ...customs.filter(a => a.type === type),
  ]

  const addCustom = () => {
    if (!newAction.name.trim()) return
    setCustoms([...customs, { id: 'c_' + Date.now(), name: newAction.name, desc: newAction.desc, type: addingType, icon: '⚙️' }])
    setNewAction({ name: '', desc: '' })
    setAddingType(null)
  }

  const atkBonus    = fmt(pb + mod(char.stats.str))
  const atkBonusDex = fmt(pb + mod(char.stats.dex))
  const spellDC     = 8 + pb + Math.max(mod(char.stats.int), mod(char.stats.wis), mod(char.stats.cha))

  return (
    <div>
      {/* ── Turn resource dock ── */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
        {Object.entries(TYPE_CONFIG).map(([key, cfg]) => {
          const isUsed = !!used[key]
          return (
            <div key={key} className="hov-btn" onClick={() => setUsed({ [key]: !isUsed })}
              style={{
                flex: '1 1 120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '12px 16px', cursor: 'pointer', transition: 'all 0.18s',
                background: isUsed ? 'transparent' : cfg.bg,
                border: `2px solid ${isUsed ? C.border : cfg.color}`,
                opacity: isUsed ? 0.45 : 1,
                position: 'relative', overflow: 'hidden',
              }}>
              {/* Glow bar at top */}
              {!isUsed && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: cfg.color, boxShadow: `0 0 8px ${cfg.color}` }} />}
              <div style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                background: isUsed ? C.textMuted : cfg.color,
                boxShadow: isUsed ? 'none' : `0 0 10px ${cfg.color}, 0 0 20px ${cfg.color}66` }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: isUsed ? C.textMuted : cfg.color,
                textTransform: 'uppercase', letterSpacing: 2,
                textDecoration: isUsed ? 'line-through' : 'none' }}>
                {cfg.short}
              </span>
            </div>
          )
        })}
        <button className="hov-btn" onClick={resetTurn}
          style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textDim,
            padding: '12px 16px', fontSize: 11, fontFamily: 'inherit', letterSpacing: 2,
            textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          ↺ New Turn
        </button>
      </div>

      {/* ── Combat stats strip ── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
        {[
          ['STR Attack', atkBonus,    TYPE_CONFIG.action.color],
          ['DEX Attack', atkBonusDex, TYPE_CONFIG.action.color],
          ['Spell DC',   spellDC,     TYPE_CONFIG.bonus.color],
          ['Prof Bonus', fmt(pb),     TYPE_CONFIG.reaction.color],
        ].map(([l, v, clr]) => (
          <div key={l} style={{ flex: '1 1 80px', background: C.card, border: `1px solid ${C.border}`,
            borderTop: `3px solid ${clr}`, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>{l}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: clr }}>{v}</div>
          </div>
        ))}
      </div>

      {/* ── 3-column card grid ── */}
      <div className="combat-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, alignItems: 'start' }}>
        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
          <div key={type}>
            {/* Column header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
              paddingBottom: 8, borderBottom: `2px solid ${cfg.color}44` }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color,
                boxShadow: `0 0 8px ${cfg.color}` }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: cfg.color, textTransform: 'uppercase', letterSpacing: 2 }}>
                {cfg.label}
              </span>
              <span style={{ fontSize: 9, color: C.textMuted, marginLeft: 'auto' }}>
                {allByType(type).length}
              </span>
            </div>

            {/* Cards */}
            {allByType(type).map(action => (
              <ActionCard key={action.id} action={action} cfg={cfg} C={C}
                isCustom={action.id.startsWith('c_')}
                onRemove={action.id.startsWith('c_') ? () => setCustoms(customs.filter(a => a.id !== action.id)) : null}
              />
            ))}

            {/* Add custom */}
            {addingType === type ? (
              <div style={{ background: C.card, border: `1px solid ${cfg.color}55`, padding: 12, marginTop: 6 }}>
                <div style={{ fontSize: 9, color: cfg.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                  + New {cfg.short}
                </div>
                <input style={{ ...inp, marginBottom: 6 }} placeholder="Name..." autoFocus
                  value={newAction.name} onChange={e => setNewAction(n => ({ ...n, name: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && addCustom()} />
                <textarea style={{ ...inp, resize: 'vertical', marginBottom: 8 }} rows={2}
                  placeholder="Description..." value={newAction.desc}
                  onChange={e => setNewAction(n => ({ ...n, desc: e.target.value }))} />
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="gold" onClick={addCustom} style={{ flex: 1, padding: '6px' }}>Add</Btn>
                  <Btn onClick={() => setAddingType(null)} style={{ padding: '6px 10px' }}>✕</Btn>
                </div>
              </div>
            ) : (
              <button className="hov-btn" onClick={() => setAddingType(type)}
                style={{ width: '100%', marginTop: 6, background: 'transparent',
                  border: `1px dashed ${C.border}`, color: C.textMuted, padding: '8px',
                  fontSize: 10, fontFamily: 'inherit', letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer' }}>
                + custom
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ActionCard({ action, cfg, C, isCustom, onRemove }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="hov-btn" style={{
      background: open ? cfg.bg : C.card,
      border: `1px solid ${open ? cfg.color + '66' : C.border}`,
      borderLeft: `3px solid ${open ? cfg.color : cfg.color + '44'}`,
      marginBottom: 5, overflow: 'hidden', cursor: 'pointer',
      transition: 'all 0.15s',
      boxShadow: open ? `0 4px 16px ${cfg.color}1a` : 'none',
    }} onClick={() => setOpen(o => !o)}>
      {/* Card row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px' }}>
        <span style={{ fontSize: 15, flexShrink: 0, lineHeight: 1 }}>{action.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: open ? cfg.color : C.text,
            transition: 'color 0.15s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {action.name}
          </div>
          {!open && (
            <div style={{ fontSize: 9, color: C.textMuted, marginTop: 1,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {action.desc.slice(0, 55)}{action.desc.length > 55 ? '…' : ''}
            </div>
          )}
        </div>
        {isCustom && (
          <span style={{ fontSize: 8, color: cfg.color, background: cfg.color + '22',
            padding: '1px 4px', letterSpacing: 1, flexShrink: 0 }}>✎</span>
        )}
        {onRemove && (
          <button onClick={e => { e.stopPropagation(); onRemove() }}
            style={{ background: 'none', border: 'none', color: C.textMuted, cursor: 'pointer',
              fontSize: 11, padding: '0 2px', transition: 'color 0.15s', flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = C.red}
            onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>✕</button>
        )}
        <span style={{ fontSize: 9, color: C.textMuted, flexShrink: 0,
          transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
      </div>
      {/* Expanded description */}
      {open && (
        <div style={{ padding: '0 10px 10px 34px', borderTop: `1px solid ${cfg.color}33` }}>
          <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.75, paddingTop: 8 }}>
            {action.desc}
          </div>
        </div>
      )}
    </div>
  )
}
