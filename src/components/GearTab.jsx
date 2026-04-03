import React, { useState } from 'react'
import { useT } from '../themes.js'
import { mod, fmt, profB, totalLevel, uid } from '../utils.js'
import { SecHdr, Btn, useInp } from './UI.jsx'
import ShieldIcon      from '@mui/icons-material/Shield'
import SwordsIcon      from '@mui/icons-material/Construction'
import BackpackIcon    from '@mui/icons-material/Backpack'
import AddIcon         from '@mui/icons-material/Add'
import DeleteIcon      from '@mui/icons-material/Delete'
import CheckBoxIcon    from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

const WEAPON_BLANK = () => ({
  id: uid(), name: '', type: 'weapon',
  atkStat: 'str', dmgDice: '1d6', dmgType: 'Slashing',
  finesse: false, properties: '', equipped: false,
  quantity: 1, weight: 0, notes: '',
})
const ARMOR_BLANK = () => ({
  id: uid(), name: '', type: 'armor',
  armorType: 'light', baseAC: 11, addDex: true, maxDexBonus: null,
  equipped: false, quantity: 1, weight: 0, notes: '',
})
const ITEM_BLANK = () => ({
  id: uid(), name: '', type: 'item',
  quantity: 1, weight: 0, notes: '', equipped: false,
})

function computeArmorAC(items, dexMod) {
  const equipped = items.filter(i => i.equipped)
  const armors   = equipped.filter(i => i.type === 'armor' && i.armorType !== 'shield')
  const shields  = equipped.filter(i => i.type === 'armor' && i.armorType === 'shield')
  if (!armors.length) return null
  const base = armors[0]
  let ac = base.baseAC
  if (base.armorType === 'light')        ac += dexMod
  else if (base.armorType === 'medium')  ac += Math.min(dexMod, base.maxDexBonus ?? 2)
  shields.forEach(() => ac += 2)
  return ac
}

export function GearTab({ char, onChange }) {
  const C   = useT()
  const inp = useInp()
  const lvl = totalLevel(char)
  const pb  = profB(lvl)
  const equipment = Array.isArray(char.equipment) ? char.equipment : []
  const dexMod    = mod(char.stats?.dex ?? 10)
  const strMod    = mod(char.stats?.str ?? 10)

  const [addingType, setAddingType] = useState(null) // 'weapon' | 'armor' | 'item'
  const [draft, setDraft]           = useState(null)
  const [editing, setEditing]       = useState(null) // id of item being edited inline

  const setEq = (items) => onChange({ ...char, equipment: items })

  const startAdd = (type) => {
    const blank = type === 'weapon' ? WEAPON_BLANK() : type === 'armor' ? ARMOR_BLANK() : ITEM_BLANK()
    setDraft(blank)
    setAddingType(type)
    setEditing(null)
  }

  const saveAdd = () => {
    if (!draft.name.trim()) return
    setEq([...equipment, draft])
    setDraft(null); setAddingType(null)
  }

  const remove = (id) => setEq(equipment.filter(i => i.id !== id))

  const toggle = (id, field, val) =>
    setEq(equipment.map(i => i.id === id ? { ...i, [field]: val } : i))

  const computedAC = computeArmorAC(equipment, dexMod)

  const weapons = equipment.filter(i => i.type === 'weapon')
  const armors  = equipment.filter(i => i.type === 'armor')
  const items   = equipment.filter(i => i.type === 'item')

  const totalWeight = equipment.reduce((s, i) => s + (i.weight || 0) * (i.quantity || 1), 0)
  const carryLimit  = (char.stats?.str ?? 10) * 15

  const atkBonusFor = (item) => {
    const stat = item.finesse
      ? Math.max(mod(char.stats?.str ?? 10), mod(char.stats?.dex ?? 10))
      : item.atkStat === 'dex' ? dexMod
      : item.atkStat === 'spell' ? Math.max(mod(char.stats?.int ?? 10), mod(char.stats?.wis ?? 10), mod(char.stats?.cha ?? 10))
      : strMod
    return fmt(pb + stat)
  }

  const SectionHeader = ({ icon: Icon, label, color, count }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, paddingBottom: 7, borderBottom: `2px solid ${color}44` }}>
      <Icon style={{ fontSize: 16, color }} />
      <span style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 2 }}>{label}</span>
      <span style={{ fontSize: 9, color: C.textMuted, marginLeft: 'auto' }}>{count}</span>
    </div>
  )

  const EquipToggle = ({ item }) => (
    <button onClick={() => toggle(item.id, 'equipped', !item.equipped)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: item.equipped ? C.gold : C.textMuted, display: 'flex', alignItems: 'center' }}>
      {item.equipped ? <CheckBoxIcon style={{ fontSize: 16 }} /> : <CheckBoxOutlineBlankIcon style={{ fontSize: 16 }} />}
    </button>
  )

  const InlineField = ({ label, value, onChange: onCh, type = 'text', options }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 8, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</span>
      {options ? (
        <select value={value} onChange={e => onCh(e.target.value)}
          style={{ ...inp, padding: '4px 6px', fontSize: 11 }}>
          {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={e => onCh(type === 'number' ? +e.target.value : e.target.value)}
          style={{ ...inp, padding: '4px 6px', fontSize: 11 }} />
      )}
    </div>
  )

  const AddForm = ({ type }) => {
    const isWep   = type === 'weapon'
    const isArmor = type === 'armor'
    return (
      <div style={{ background: C.card, border: `1px solid ${C.gold}44`, borderRadius: 6, padding: '12px 14px', marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: C.gold, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>+ New {type}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8, marginBottom: 8 }}>
          <InlineField label="Name" value={draft.name} onChange={v => setDraft(d => ({ ...d, name: v }))} />
          {isWep && <>
            <InlineField label="Dmg Dice" value={draft.dmgDice} onChange={v => setDraft(d => ({ ...d, dmgDice: v }))} />
            <InlineField label="Dmg Type" value={draft.dmgType} onChange={v => setDraft(d => ({ ...d, dmgType: v }))}
              options={['Slashing','Piercing','Bludgeoning','Fire','Cold','Lightning','Acid','Poison','Necrotic','Radiant','Thunder','Force','Psychic']} />
            <InlineField label="Atk Stat" value={draft.atkStat} onChange={v => setDraft(d => ({ ...d, atkStat: v }))}
              options={[{value:'str',label:'Strength'},{value:'dex',label:'Dexterity'},{value:'spell',label:'Spell'}]} />
            <InlineField label="Properties" value={draft.properties} onChange={v => setDraft(d => ({ ...d, properties: v }))} />
          </>}
          {isArmor && <>
            <InlineField label="Base AC" value={draft.baseAC} onChange={v => setDraft(d => ({ ...d, baseAC: +v }))} type="number" />
            <InlineField label="Armor Type" value={draft.armorType} onChange={v => setDraft(d => ({ ...d, armorType: v }))}
              options={['light','medium','heavy','shield']} />
          </>}
          <InlineField label="Qty" value={draft.quantity} onChange={v => setDraft(d => ({ ...d, quantity: +v }))} type="number" />
          <InlineField label="Weight (lbs)" value={draft.weight} onChange={v => setDraft(d => ({ ...d, weight: +v }))} type="number" />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Btn variant="gold" onClick={saveAdd} style={{ flex: 1, padding: '6px' }}>Add</Btn>
          <Btn onClick={() => { setAddingType(null); setDraft(null) }} style={{ padding: '6px 10px' }}>✕</Btn>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* ── Summary bar ── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
        {[
          ['Items', equipment.length, C.textDim],
          ['Equipped', equipment.filter(i=>i.equipped).length, C.gold],
          ['Carry', `${totalWeight.toFixed(1)} / ${carryLimit} lbs`, totalWeight > carryLimit ? '#ef4444' : C.textDim],
          ...(computedAC != null ? [['Armor AC', computedAC, '#60a5fa']] : []),
        ].map(([label, val, color]) => (
          <div key={label} style={{ flex: '1 1 90px', background: C.card, border: `1px solid ${C.border}`, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color }}>{val}</div>
          </div>
        ))}
        {computedAC != null && (
          <button onClick={() => onChange({ ...char, ac: computedAC })}
            style={{
              alignSelf: 'center', padding: '6px 12px', fontSize: 10, cursor: 'pointer',
              background: '#60a5fa18', border: '1px solid #60a5fa55', color: '#60a5fa',
              borderRadius: 4, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'inherit',
            }}>
            Apply AC
          </button>
        )}
      </div>

      {/* ── Weapons ── */}
      <div style={{ marginBottom: 28 }}>
        <SectionHeader icon={SwordsIcon} label="Weapons" color="#ef4444" count={weapons.length} />
        {weapons.length === 0 && <EmptyState C={C} label="No weapons yet" />}
        {weapons.map(item => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 12px', marginBottom: 4,
            background: item.equipped ? '#ef444408' : C.card,
            border: `1px solid ${item.equipped ? '#ef444444' : C.border}`,
            borderRadius: 5, transition: 'background 0.15s',
          }}>
            <EquipToggle item={item} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: item.equipped ? C.text : C.textDim, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.name || 'Unnamed Weapon'}
              </div>
              <div style={{ fontSize: 9, color: C.textMuted, marginTop: 1 }}>
                {item.dmgDice} {item.dmgType}{item.finesse ? ' · Finesse' : ''}{item.properties ? ` · ${item.properties}` : ''}
              </div>
            </div>
            {item.equipped && (
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#ef4444' }}>{atkBonusFor(item)}</div>
                <div style={{ fontSize: 9, color: C.textMuted }}>to hit</div>
              </div>
            )}
            <button onClick={() => remove(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, display: 'flex', alignItems: 'center', opacity: 0.5 }}>
              <DeleteIcon style={{ fontSize: 14 }} />
            </button>
          </div>
        ))}
        {addingType === 'weapon' ? <AddForm type="weapon" /> : (
          <AddButton label="Add Weapon" color="#ef4444" onClick={() => startAdd('weapon')} C={C} />
        )}
      </div>

      {/* ── Armor ── */}
      <div style={{ marginBottom: 28 }}>
        <SectionHeader icon={ShieldIcon} label="Armor & Shields" color="#60a5fa" count={armors.length} />
        {armors.length === 0 && <EmptyState C={C} label="No armor yet" />}
        {armors.map(item => {
          const ac = item.armorType === 'shield' ? '+2'
            : item.armorType === 'light' ? item.baseAC + dexMod
            : item.armorType === 'medium' ? item.baseAC + Math.min(dexMod, item.maxDexBonus ?? 2)
            : item.baseAC
          return (
            <div key={item.id} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 12px', marginBottom: 4,
              background: item.equipped ? '#60a5fa08' : C.card,
              border: `1px solid ${item.equipped ? '#60a5fa44' : C.border}`,
              borderRadius: 5, transition: 'background 0.15s',
            }}>
              <EquipToggle item={item} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: item.equipped ? C.text : C.textDim }}>
                  {item.name || 'Unnamed Armor'}
                </div>
                <div style={{ fontSize: 9, color: C.textMuted, marginTop: 1 }}>
                  {item.armorType.charAt(0).toUpperCase() + item.armorType.slice(1)}
                  {item.weight > 0 ? ` · ${item.weight} lbs` : ''}
                </div>
              </div>
              {item.equipped && (
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#60a5fa' }}>AC {ac}</div>
                  <div style={{ fontSize: 9, color: C.textMuted }}>equipped</div>
                </div>
              )}
              <button onClick={() => remove(item.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, display: 'flex', alignItems: 'center', opacity: 0.5 }}>
                <DeleteIcon style={{ fontSize: 14 }} />
              </button>
            </div>
          )
        })}
        {addingType === 'armor' ? <AddForm type="armor" /> : (
          <AddButton label="Add Armor / Shield" color="#60a5fa" onClick={() => startAdd('armor')} C={C} />
        )}
      </div>

      {/* ── Items ── */}
      <div style={{ marginBottom: 28 }}>
        <SectionHeader icon={BackpackIcon} label="Items & Gear" color={C.gold} count={items.length} />
        {items.length === 0 && <EmptyState C={C} label="No items yet" />}
        {items.map(item => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 12px', marginBottom: 4,
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 5,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: C.textDim, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.name || 'Unnamed Item'}
              </div>
              {item.notes && <div style={{ fontSize: 9, color: C.textMuted, marginTop: 1 }}>{item.notes}</div>}
            </div>
            <span style={{ fontSize: 10, color: C.textMuted, flexShrink: 0 }}>×{item.quantity}</span>
            {item.weight > 0 && <span style={{ fontSize: 9, color: C.textMuted, flexShrink: 0 }}>{item.weight}lb</span>}
            <button onClick={() => remove(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, display: 'flex', alignItems: 'center', opacity: 0.5 }}>
              <DeleteIcon style={{ fontSize: 14 }} />
            </button>
          </div>
        ))}
        {addingType === 'item' ? <AddForm type="item" /> : (
          <AddButton label="Add Item" color={C.gold} onClick={() => startAdd('item')} C={C} />
        )}
      </div>

      {/* ── Equipment notes ── */}
      {(char.equipmentNotes || (typeof char.equipment === 'string' && char.equipment)) && (
        <div>
          <SecHdr mt={4}>Notes</SecHdr>
          <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {char.equipmentNotes || char.equipment}
          </div>
        </div>
      )}

      {/* ── Currency ── */}
      <div style={{ marginTop: 24 }}>
        <SecHdr>Currency</SecHdr>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['CP','cp','#b87333'],['SP','sp','#aaa9ad'],['GP','gp','#ffd700'],['PP','pp','#e5e4e2']].map(([label, key, color]) => {
            const total = equipment.reduce((s,i) => s,0) // placeholder
            return (
              <div key={key} style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, padding: '9px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 3, fontWeight: 700 }}>{label}</div>
                <input type="number" value={char.currency?.[key] ?? 0}
                  onChange={e => onChange({ ...char, currency: { ...char.currency, [key]: +e.target.value } })}
                  style={{ ...inp, textAlign: 'center', fontSize: 17, padding: '2px', background: 'transparent', border: 'none', color }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function EmptyState({ C, label }) {
  return (
    <div style={{ textAlign: 'center', padding: '12px 0', fontSize: 11, color: C.textMuted, opacity: 0.35, marginBottom: 8 }}>
      {label}
    </div>
  )
}

function AddButton({ label, color, onClick, C }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '7px 0', marginTop: 4,
      background: 'transparent', border: `1px dashed ${C.border}`,
      color: C.textMuted, cursor: 'pointer', fontSize: 10,
      fontFamily: 'inherit', letterSpacing: 2, textTransform: 'uppercase',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
      transition: 'color 0.12s, border-color 0.12s',
    }}
      onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color + '66' }}
      onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '' }}
    >
      <AddIcon style={{ fontSize: 13 }} /> {label}
    </button>
  )
}
