import React, { useState } from 'react'
import { useT } from '../themes.js'
import { DND } from '../data/dnd.js'
import { mod, fmt, profB, totalLevel } from '../utils.js'
import { SecHdr, useInp, Btn } from './UI.jsx'

// ─── DEFAULT ACTION REFERENCES ────────────────────────────────────────────────
// Based on D&D 2024 PHB combat actions available to all characters

const BASE_ACTIONS = [
  { id: 'attack',       name: 'Attack',        type: 'action',       desc: 'Make one melee or ranged attack (or more with Extra Attack).' },
  { id: 'cast',         name: 'Cast a Spell',  type: 'action',       desc: 'Cast a spell with a casting time of 1 Action.' },
  { id: 'dash',         name: 'Dash',          type: 'action',       desc: 'Gain extra movement equal to your Speed for the current turn.' },
  { id: 'disengage',    name: 'Disengage',     type: 'action',       desc: 'Your movement doesn\'t provoke Opportunity Attacks for the rest of the turn.' },
  { id: 'dodge',        name: 'Dodge',         type: 'action',       desc: 'Attacks against you have Disadvantage; you have Advantage on Dex saves. Ends if you\'re Incapacitated or your speed drops to 0.' },
  { id: 'help',         name: 'Help',          type: 'action',       desc: 'Give Advantage to an ally\'s next ability check or attack roll against a creature within 5 ft of you.' },
  { id: 'hide',         name: 'Hide',          type: 'action',       desc: 'Make a Dexterity (Stealth) check to hide from enemies.' },
  { id: 'influence',    name: 'Influence',     type: 'action',       desc: 'Use Charisma (Persuasion, Deception, or Intimidation) to shift a creature\'s attitude.' },
  { id: 'magic',        name: 'Magic',         type: 'action',       desc: 'Use a magic item, activate a magical feature, or cast a cantrip with a 1-action casting time.' },
  { id: 'ready',        name: 'Ready',         type: 'action',       desc: 'Choose a trigger and prepare a reaction for when it occurs.' },
  { id: 'search',       name: 'Search',        type: 'action',       desc: 'Make a Perception or Investigation check to find something.' },
  { id: 'study',        name: 'Study',         type: 'action',       desc: 'Make an Arcana, History, or Nature check to recall lore about a creature or phenomenon.' },
  { id: 'utilize',      name: 'Utilize',       type: 'action',       desc: 'Interact with a second object or feature of the environment. (First object interaction is free.)' },
]

const BASE_BONUS_ACTIONS = [
  { id: 'offhand',      name: 'Nick / Off-Hand Attack', type: 'bonus', desc: 'When you take the Attack action with a Light weapon, make one extra attack with a different Light weapon (free with Nick mastery, bonus action otherwise).' },
  { id: 'bonus-cast',   name: 'Cast a Spell',           type: 'bonus', desc: 'Cast a spell with a casting time of 1 Bonus Action (e.g., Healing Word, Misty Step).' },
  { id: 'cunning',      name: 'Cunning Action',          type: 'bonus', desc: '(Rogue) Dash, Disengage, or Hide as a Bonus Action.' },
  { id: 'second-wind',  name: 'Second Wind',             type: 'bonus', desc: '(Fighter) Regain HP equal to 1d10 + Fighter level. Recharges on Short or Long Rest.' },
  { id: 'fury',         name: 'Rage',                    type: 'bonus', desc: '(Barbarian) Enter a Rage, gaining resistance to B/P/S damage, Advantage on Str checks/saves, and bonus damage.' },
  { id: 'wildshape',    name: 'Wild Shape',              type: 'bonus', desc: '(Druid) Transform into a beast form. Uses vary by level.' },
]

const BASE_REACTIONS = [
  { id: 'opp-attack',   name: 'Opportunity Attack',  type: 'reaction', desc: 'When a creature you can see leaves your reach, make one melee attack against it.' },
  { id: 'readied',      name: 'Readied Action',      type: 'reaction', desc: 'Trigger your Readied action when the specified trigger occurs.' },
  { id: 'shield-spell', name: 'Shield (Spell)',      type: 'reaction', desc: '(Wizard/Sorcerer) Cast Shield when hit by an attack, gaining +5 AC until your next turn.' },
  { id: 'absorb-elems', name: 'Absorb Elements',     type: 'reaction', desc: '(Spellcaster) React to elemental damage, gaining resistance and adding damage to your next attack.' },
  { id: 'uncanny',      name: 'Uncanny Dodge',       type: 'reaction', desc: '(Rogue 5+) When hit by an attacker you can see, halve the attack\'s damage.' },
  { id: 'counter',      name: 'Counterspell',        type: 'reaction', desc: '(Spellcaster) React to a creature casting a spell within 60 ft to interrupt it.' },
]

const TYPE_CONFIG = {
  action:   { label: 'Actions',       color: '#4ade80', icon: '⚔' },
  bonus:    { label: 'Bonus Actions', color: '#60a5fa', icon: '⚡' },
  reaction: { label: 'Reactions',     color: '#f472b6', icon: '🛡' },
}

// ─── COMBAT TAB ───────────────────────────────────────────────────────────────
export function CombatTab({ char, onChange }) {
  const C   = useT()
  const inp = useInp()
  const lvl = totalLevel(char)
  const pb  = profB(lvl)

  // Combat resource tracking (action / bonus / reaction used this turn)
  const used     = char.combatUsed     || {}
  const setUsed  = (patch) => onChange({ ...char, combatUsed: { ...(char.combatUsed || {}), ...patch } })
  const resetTurn = () => onChange({ ...char, combatUsed: {} })

  // Custom actions the player adds
  const customs  = char.customActions || []
  const setCustoms = (list) => onChange({ ...char, customActions: list })

  const [addingType, setAddingType] = useState(null)
  const [newAction, setNewAction]   = useState({ name: '', desc: '' })
  const [activeSection, setActiveSection] = useState('action')

  const allByType = (type) => {
    const base   = [...BASE_ACTIONS, ...BASE_BONUS_ACTIONS, ...BASE_REACTIONS].filter(a => a.type === type)
    const custom = customs.filter(a => a.type === type)
    return [...base, ...custom]
  }

  const addCustom = () => {
    if (!newAction.name.trim()) return
    setCustoms([...customs, { id: 'c_' + Date.now(), name: newAction.name, desc: newAction.desc, type: addingType }])
    setNewAction({ name: '', desc: '' })
    setAddingType(null)
  }

  const removeCustom = (id) => setCustoms(customs.filter(a => a.id !== id))

  // Build passive modifiers display
  const atkBonus = fmt(pb + mod(char.stats.str))
  const atkBonusDex = fmt(pb + mod(char.stats.dex))
  const spellDC = 8 + pb + Math.max(mod(char.stats.int), mod(char.stats.wis), mod(char.stats.cha))

  return (
    <div>
      {/* ── Turn tracker ── */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '12px 16px', marginBottom: 18, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, flex: 1 }}>Turn Resources</div>
        {[
          { key: 'action',   label: 'Action',       color: TYPE_CONFIG.action.color },
          { key: 'bonus',    label: 'Bonus Action', color: TYPE_CONFIG.bonus.color },
          { key: 'reaction', label: 'Reaction',     color: TYPE_CONFIG.reaction.color },
        ].map(({ key, label, color }) => {
          const isUsed = !!used[key]
          return (
            <div key={key} className="hov-btn" onClick={() => setUsed({ [key]: !isUsed })}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', border: `2px solid ${isUsed ? C.textMuted : color}`, background: isUsed ? 'transparent' : color + '22', cursor: 'pointer', transition: 'all 0.15s' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: isUsed ? C.textMuted : color, boxShadow: isUsed ? 'none' : `0 0 8px ${color}` }} />
              <span style={{ fontSize: 11, color: isUsed ? C.textMuted : color, textTransform: 'uppercase', letterSpacing: 1, textDecoration: isUsed ? 'line-through' : 'none' }}>{label}</span>
            </div>
          )
        })}
        <button className="hov-btn" onClick={resetTurn}
          style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textDim, padding: '5px 12px', fontSize: 10, fontFamily: 'inherit', letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer' }}>
          ↺ New Turn
        </button>
      </div>

      {/* ── Quick combat stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 20 }}>
        {[
          ['STR Atk', atkBonus],
          ['DEX Atk', atkBonusDex],
          ['Spell DC', spellDC],
          ['Prof Bonus', fmt(pb)],
        ].map(([l, v]) => (
          <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, padding: '9px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 3 }}>{l}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.gold }}>{v}</div>
          </div>
        ))}
      </div>

      {/* ── Section tabs ── */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 16, borderBottom: `1px solid ${C.border}` }}>
        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
          <button key={type} className="hov-btn" onClick={() => setActiveSection(type)}
            style={{ background: 'transparent', border: 'none', borderBottom: `2px solid ${activeSection === type ? cfg.color : 'transparent'}`, color: activeSection === type ? cfg.color : C.textMuted, padding: '8px 16px', fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.15s' }}>
            {cfg.icon} {cfg.label} ({allByType(type).length})
          </button>
        ))}
      </div>

      {/* ── Action list ── */}
      {Object.entries(TYPE_CONFIG).map(([type, cfg]) => {
        if (activeSection !== type) return null
        const actions = allByType(type)
        return (
          <div key={type} className="fade-up">
            {actions.map(action => {
              const isCustom = action.id.startsWith('c_')
              return (
                <ActionCard
                  key={action.id}
                  action={action}
                  color={cfg.color}
                  C={C}
                  isCustom={isCustom}
                  onRemove={isCustom ? () => removeCustom(action.id) : null}
                />
              )
            })}

            {/* Add custom action */}
            {addingType === type ? (
              <div style={{ background: C.card, border: `1px solid ${cfg.color}44`, padding: 14, marginTop: 10 }}>
                <div style={{ fontSize: 10, color: cfg.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>New {cfg.label.slice(0, -1)}</div>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, marginBottom: 4, textTransform: 'uppercase' }}>Name</div>
                  <input style={inp} placeholder={`e.g. Sneak Attack, Divine Smite…`} value={newAction.name} onChange={e => setNewAction(n => ({ ...n, name: e.target.value }))} autoFocus />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, marginBottom: 4, textTransform: 'uppercase' }}>Description</div>
                  <textarea style={{ ...inp, resize: 'vertical' }} rows={2} placeholder="What does it do?" value={newAction.desc} onChange={e => setNewAction(n => ({ ...n, desc: e.target.value }))} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn variant="gold" onClick={addCustom} style={{ flex: 1 }}>+ Add</Btn>
                  <Btn onClick={() => setAddingType(null)}>Cancel</Btn>
                </div>
              </div>
            ) : (
              <button className="hov-btn" onClick={() => setAddingType(type)}
                style={{ width: '100%', marginTop: 10, background: 'transparent', border: `1px dashed ${C.border}`, color: C.textMuted, padding: '10px', fontSize: 11, fontFamily: 'inherit', letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer' }}>
                + Add Custom {cfg.label.slice(0, -1)}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── ACTION CARD ──────────────────────────────────────────────────────────────
function ActionCard({ action, color, C, isCustom, onRemove }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, marginBottom: 5, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
        <div style={{ width: 3, alignSelf: 'stretch', background: color, flexShrink: 0, boxShadow: `0 0 6px ${color}66` }} />
        <span style={{ flex: 1, fontSize: 13, color: C.text, fontWeight: 600, letterSpacing: 0.5 }}>{action.name}</span>
        {isCustom && (
          <span style={{ fontSize: 9, color: color, background: color + '22', padding: '1px 6px', letterSpacing: 1 }}>CUSTOM</span>
        )}
        <span style={{ fontSize: 10, color: C.textMuted, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>▾</span>
        {onRemove && (
          <button onClick={e => { e.stopPropagation(); onRemove() }}
            style={{ background: 'none', border: 'none', color: C.textMuted, cursor: 'pointer', fontSize: 13, padding: '0 3px', fontFamily: 'inherit', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = C.red}
            onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>✕</button>
        )}
      </div>
      {open && (
        <div style={{ padding: '6px 14px 12px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.7 }}>{action.desc}</div>
        </div>
      )}
    </div>
  )
}
