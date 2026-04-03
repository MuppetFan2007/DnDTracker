import React, { useState, useMemo } from 'react'
import { useT } from '../themes.js'
import { DND } from '../data/dnd.js'
import { CLASS_FEATURES } from '../data/classFeatures.js'
import { SUBCLASS_FEATURES } from '../data/subclassFeatures.js'
import { SUBCLASS_FEATURES_EXTRA } from '../data/subclassFeaturesMissing.js'
import { SPELLS } from '../data/spells.js'

/* Merge base subclass features with the extra ones (2014 + missing 2024) */
const ALL_SUBCLASS_FEATURES = (() => {
  const merged = {}
  const allKeys = new Set([...Object.keys(SUBCLASS_FEATURES), ...Object.keys(SUBCLASS_FEATURES_EXTRA)])
  for (const cls of allKeys) {
    merged[cls] = { ...(SUBCLASS_FEATURES[cls] || {}), ...(SUBCLASS_FEATURES_EXTRA[cls] || {}) }
  }
  return merged
})()
import { DND_ICONS } from './Icons.jsx'

/* ── Per-class metadata for new players ────────────────────────────── */
const CLASS_INFO = {
  Barbarian: {
    role: 'Striker / Tank',
    tagline: 'Charge in recklessly — your rage and sheer toughness do the rest.',
    primaryAbility: 'Strength',
    saves: ['Strength', 'Constitution'],
    armor: 'Light, Medium, Shields',
    spellcaster: false, spellAbility: null,
  },
  Bard: {
    role: 'Support / Face',
    tagline: 'Inspire allies, bend minds, and cast spells from an enormous list.',
    primaryAbility: 'Charisma',
    saves: ['Dexterity', 'Charisma'],
    armor: 'Light',
    spellcaster: true, spellAbility: 'Charisma',
  },
  Cleric: {
    role: 'Healer / Support',
    tagline: 'Channel divine power to heal, protect, and smite in your god\'s name.',
    primaryAbility: 'Wisdom',
    saves: ['Wisdom', 'Charisma'],
    armor: 'Light, Medium, Shields',
    spellcaster: true, spellAbility: 'Wisdom',
  },
  Druid: {
    role: 'Controller / Support',
    tagline: 'Shapeshift into beasts and bend nature\'s forces to control the battlefield.',
    primaryAbility: 'Wisdom',
    saves: ['Intelligence', 'Wisdom'],
    armor: 'Light, Medium, Shields (non-metal)',
    spellcaster: true, spellAbility: 'Wisdom',
  },
  Fighter: {
    role: 'Striker / Defender',
    tagline: 'Attack more than anyone else and master every weapon and fighting style.',
    primaryAbility: 'Strength or Dexterity',
    saves: ['Strength', 'Constitution'],
    armor: 'All armor, Shields',
    spellcaster: false, spellAbility: null,
  },
  Monk: {
    role: 'Striker / Skirmisher',
    tagline: 'Blur across the battlefield with rapid unarmed strikes powered by Focus Points.',
    primaryAbility: 'Dexterity & Wisdom',
    saves: ['Strength', 'Dexterity'],
    armor: 'None',
    spellcaster: false, spellAbility: null,
  },
  Paladin: {
    role: 'Striker / Healer',
    tagline: 'A holy warrior who smites enemies and radiates protective auras for allies.',
    primaryAbility: 'Strength & Charisma',
    saves: ['Wisdom', 'Charisma'],
    armor: 'All armor, Shields',
    spellcaster: true, spellAbility: 'Charisma',
  },
  Ranger: {
    role: 'Striker / Scout',
    tagline: 'Hunt favored enemies across any terrain with spells and precision weapons.',
    primaryAbility: 'Dexterity & Wisdom',
    saves: ['Strength', 'Dexterity'],
    armor: 'Light, Medium, Shields',
    spellcaster: true, spellAbility: 'Wisdom',
  },
  Rogue: {
    role: 'Striker / Infiltrator',
    tagline: 'Deal massive burst damage once per turn and excel at stealth and skills.',
    primaryAbility: 'Dexterity',
    saves: ['Dexterity', 'Intelligence'],
    armor: 'Light',
    spellcaster: false, spellAbility: null,
  },
  Sorcerer: {
    role: 'Blaster / Controller',
    tagline: 'Twist spells with Metamagic, fueled by innate magic from your bloodline.',
    primaryAbility: 'Charisma',
    saves: ['Constitution', 'Charisma'],
    armor: 'None',
    spellcaster: true, spellAbility: 'Charisma',
  },
  Warlock: {
    role: 'Blaster / Utility',
    tagline: 'Make a pact for power — short-rest spell slots and potent Invocations.',
    primaryAbility: 'Charisma',
    saves: ['Wisdom', 'Charisma'],
    armor: 'Light',
    spellcaster: true, spellAbility: 'Charisma',
  },
  Wizard: {
    role: 'Controller / Blaster',
    tagline: 'Prepare spells from the largest list in the game, backed by a spellbook.',
    primaryAbility: 'Intelligence',
    saves: ['Intelligence', 'Wisdom'],
    armor: 'None',
    spellcaster: true, spellAbility: 'Intelligence',
  },
}

const SCHOOL_COLORS = {
  Abjuration:   '#3b82f6', Conjuration:  '#8b5cf6',
  Divination:   '#06b6d4', Enchantment:  '#ec4899',
  Evocation:    '#ef4444', Illusion:     '#a855f7',
  Necromancy:   '#22c55e', Transmutation:'#f59e0b',
}

const LEVEL_LABEL = l => l === 0 ? 'Cantrip' : `Level ${l}`

/* ═══════════════════════════════════════════════════════════════════════
   Main export
═══════════════════════════════════════════════════════════════════════ */
export function Wiki() {
  const C = useT()
  const [tab, setTab]             = useState('classes')
  const [selectedClass, setClass] = useState('Barbarian')

  /* spell filters */
  const [search,      setSearch]  = useState('')
  const [lvlFilter,   setLvl]     = useState('all')
  const [schoolFilter,setSchool]  = useState('all')
  const [classFilter, setClsFilter] = useState('all')
  const [expandedSpell, setExpandedSpell] = useState(null)

  const filteredSpells = useMemo(() => SPELLS.filter(s => {
    if (lvlFilter   !== 'all' && s.level !== parseInt(lvlFilter))    return false
    if (schoolFilter !== 'all' && s.school !== schoolFilter)          return false
    if (classFilter  !== 'all' && !s.classes.includes(classFilter))   return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !s.desc.toLowerCase().includes(search.toLowerCase()))         return false
    return true
  }), [search, lvlFilter, schoolFilter, classFilter])

  const panelBg = { background: C.surface, borderRight: `1px solid ${C.border}` }

  return (
    <div className="fade-up" style={{ display: 'flex', height: '100%', minHeight: '100vh', overflow: 'hidden' }}>

      {/* ── Left panel ── */}
      <div style={{ width: 242, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', ...panelBg }}>

        {/* Header */}
        <div style={{ padding: '20px 16px 12px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.gold, letterSpacing: 0.5 }}>Wiki</div>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 2.5, marginTop: 2, textTransform: 'uppercase' }}>Reference & Guide</div>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', padding: '8px 10px', gap: 5, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          {[['classes','Classes'],['spells','Spells']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, padding: '6px 0', fontSize: 12, fontWeight: tab === id ? 700 : 400,
              background: tab === id ? `${C.gold}1e` : 'transparent',
              border: `1px solid ${tab === id ? C.gold + '99' : C.border}`,
              color: tab === id ? C.gold : C.textDim,
              borderRadius: 5, cursor: 'pointer',
            }}>{label}</button>
          ))}
        </div>

        {/* Scrollable panel content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {tab === 'classes'
            ? <ClassList selected={selectedClass} onSelect={c => { setClass(c); }} C={C} />
            : <SpellFilters
                search={search} setSearch={setSearch}
                lvlFilter={lvlFilter} setLvl={setLvl}
                schoolFilter={schoolFilter} setSchool={setSchool}
                classFilter={classFilter} setClsFilter={setClsFilter}
                count={filteredSpells.length}
                C={C}
              />
          }
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={{ flex: 1, overflowY: 'auto', minWidth: 0, background: C.bg }}>
        {tab === 'classes'
          ? <ClassDetail className={selectedClass} C={C} />
          : <SpellGrid spells={filteredSpells} expanded={expandedSpell} setExpanded={setExpandedSpell} C={C} />
        }
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   CLASS LIST (left panel)
═══════════════════════════════════════════════════════════════════════ */
function ClassList({ selected, onSelect, C }) {
  return (
    <div style={{ padding: '6px 0' }}>
      {DND.classes.map(cls => {
        const active = cls.name === selected
        const cc = DND.classColors[cls.name]
        const info = CLASS_INFO[cls.name]
        return (
          <button key={cls.name} onClick={() => onSelect(cls.name)}
            className="sidebar-nav-item"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '8px 14px', marginBottom: 1,
              background: active ? `${cc}18` : 'transparent',
              border: 'none', borderLeft: `3px solid ${active ? cc : 'transparent'}`,
              color: active ? C.text : C.textDim,
              cursor: 'pointer', textAlign: 'left',
            }}>
            <span style={{ color: active ? cc : C.textMuted, fontSize: 14, flexShrink: 0 }}>
              {DND_ICONS[cls.name]}
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: active ? 700 : 400, color: active ? C.text : C.textDim, lineHeight: 1.1 }}>{cls.name}</div>
              <div style={{ fontSize: 10, color: C.textMuted, marginTop: 1, letterSpacing: 0.3 }}>{info?.role}</div>
            </div>
            <div style={{
              marginLeft: 'auto', flexShrink: 0,
              fontSize: 9, padding: '2px 5px', borderRadius: 3,
              background: `${cc}22`, color: cc, fontWeight: 700, letterSpacing: 0.3,
            }}>d{cls.hitDie}</div>
          </button>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   CLASS DETAIL (right panel)
═══════════════════════════════════════════════════════════════════════ */
function ClassDetail({ className, C }) {
  const cls  = DND.classes.find(c => c.name === className)
  const info = CLASS_INFO[className]
  const features = CLASS_FEATURES[className] || []
  const subclassFeatures = ALL_SUBCLASS_FEATURES[className] || {}
  const cc = DND.classColors[className]

  if (!cls || !info) return null

  /* group features by level */
  const byLevel = {}
  for (const f of features) {
    if (!byLevel[f.level]) byLevel[f.level] = []
    byLevel[f.level].push(f)
  }

  return (
    <div style={{ padding: '0 0 60px' }}>

      {/* ── Header banner ── */}
      <div style={{ background: `${cc}12`, borderBottom: `1px solid ${cc}33`, padding: '28px 36px 24px', position: 'relative', overflow: 'hidden' }}>
        {/* decorative stripe */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${cc}, ${cc}44, transparent)` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 48, color: cc, opacity: 0.85, flexShrink: 0 }}>{DND_ICONS[className]}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: C.text, lineHeight: 1 }}>{className}</h1>
              <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 20, background: `${cc}28`, color: cc, fontWeight: 700, letterSpacing: 1 }}>{info.role}</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: C.textDim, lineHeight: 1.5 }}>{info.tagline}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 36px' }}>

        {/* ── At-a-glance stat row ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: '20px 0 24px', borderBottom: `1px solid ${C.border}` }}>
          {[
            ['Hit Die', `d${cls.hitDie}`, cc],
            ['Primary Ability', info.primaryAbility, C.gold],
            ['Saving Throws', info.saves.join(' & '), C.textDim],
            ['Armor', info.armor, C.textDim],
            ['Spellcaster', info.spellcaster ? 'Yes' : 'No', info.spellcaster ? C.green : C.textMuted],
            ...(info.spellcaster ? [['Spell Ability', info.spellAbility, C.gold]] : []),
          ].map(([label, val, color]) => (
            <div key={label} style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
              padding: '10px 14px', minWidth: 110,
            }}>
              <div style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color }}>{val}</div>
            </div>
          ))}
        </div>

        {/* ── Subclasses strip ── */}
        <div style={{ padding: '18px 0 0' }}>
          <SectionLabel text="Subclasses" C={C} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 10, marginBottom: 24 }}>
            {cls.subclasses.map(sc => (
              <div key={sc} style={{
                fontSize: 11, padding: '5px 11px', borderRadius: 20,
                background: `${cc}14`, border: `1px solid ${cc}33`,
                color: cc, fontWeight: 600,
              }}>{sc}</div>
            ))}
          </div>
        </div>

        {/* ── Class features ── */}
        <SectionLabel text="Class Features" C={C} />
        <div style={{ marginTop: 10 }}>
          {Object.keys(byLevel).sort((a,b) => +a-+b).map(lvl => (
            <LevelGroup key={lvl} level={+lvl} features={byLevel[lvl]} cc={cc} C={C} />
          ))}
        </div>

        {/* ── Subclass features ── */}
        {Object.keys(subclassFeatures).length > 0 && (
          <div style={{ marginTop: 36 }}>
            <SectionLabel text="Subclass Features" C={C} />
            <p style={{ fontSize: 12, color: C.textMuted, marginTop: 6, marginBottom: 14 }}>
              Subclass features are gained at levels 3, 6, 10, and 14 (varies by class). Click a subclass to expand its features.
            </p>
            {cls.subclasses.map(sc => (
              <SubclassAccordion key={sc} name={sc} features={subclassFeatures[sc] || []} cc={cc} C={C} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Level group for features ── */
function LevelGroup({ level, features, cc, C }) {
  return (
    <div style={{ display: 'flex', gap: 0, marginBottom: 2 }}>
      {/* Level badge column */}
      <div style={{ width: 68, flexShrink: 0, paddingTop: 11 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: cc, letterSpacing: 1.5,
          textTransform: 'uppercase', textAlign: 'right', paddingRight: 14,
          borderRight: `2px solid ${cc}44`, paddingBottom: 8,
        }}>
          {level === 1 ? 'Lv 1' : `Lv ${level}`}
        </div>
      </div>
      {/* Feature cards */}
      <div style={{ flex: 1, padding: '0 0 12px 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {features.map(f => <FeatureCard key={f.name} f={f} cc={cc} C={C} />)}
      </div>
    </div>
  )
}

/* ── Single feature card with expand ── */
function FeatureCard({ f, cc, C }) {
  const [open, setOpen] = useState(false)
  return (
    <div onClick={() => setOpen(o => !o)}
      style={{
        background: C.card, border: `1px solid ${open ? cc + '55' : C.border}`,
        borderRadius: 7, padding: '9px 13px', cursor: 'pointer',
        transition: 'border-color 0.15s',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, flex: 1 }}>{f.name}</div>
        {f.limited && (
          <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, background: `${C.gold}1a`, color: C.gold, fontWeight: 700, letterSpacing: 1, flexShrink: 0 }}>
            {f.recharge?.toUpperCase()}
          </span>
        )}
        <span style={{ fontSize: 10, color: C.textMuted, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }}>▾</span>
      </div>
      {open && (
        <div style={{ marginTop: 8, fontSize: 12, color: C.textDim, lineHeight: 1.65, borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
          {f.desc}
          {f.usesFormula && (
            <div style={{ marginTop: 6, fontSize: 11, color: C.textMuted, fontStyle: 'italic' }}>Uses: {f.usesFormula}</div>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Subclass accordion ── */
function SubclassAccordion({ name, features, cc, C }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ marginBottom: 6 }}>
      <button onClick={() => setOpen(o => !o)}
        className="sidebar-nav-item"
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '11px 14px', cursor: 'pointer', textAlign: 'left',
          background: open ? `${cc}14` : C.card,
          border: `1px solid ${open ? cc + '55' : C.border}`,
          borderRadius: open ? '7px 7px 0 0' : 7,
          color: C.text, transition: 'border-color 0.15s, background 0.15s',
        }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: cc, flexShrink: 0, boxShadow: open ? `0 0 8px ${cc}` : 'none' }} />
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{name}</span>
        <span style={{ fontSize: 11, color: C.textMuted }}>
          {features.length} feature{features.length !== 1 ? 's' : ''}
        </span>
        <span style={{ fontSize: 10, color: C.textMuted, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s' }}>▾</span>
      </button>
      {open && features.length > 0 && (
        <div style={{
          background: C.card, border: `1px solid ${cc}44`,
          borderTop: 'none', borderRadius: '0 0 7px 7px',
          padding: '8px 10px',
        }}>
          {features.map(f => (
            <SubclassFeatureRow key={f.name} f={f} cc={cc} C={C} />
          ))}
        </div>
      )}
    </div>
  )
}

function SubclassFeatureRow({ f, cc, C }) {
  const [open, setOpen] = useState(false)
  return (
    <div onClick={() => setOpen(o => !o)}
      style={{
        padding: '8px 10px', cursor: 'pointer', borderRadius: 5,
        borderBottom: `1px solid ${C.border}33`,
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: cc, letterSpacing: 0.5, flexShrink: 0 }}>Lv {f.level}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.text, flex: 1 }}>{f.name}</span>
        {f.limited && <span style={{ fontSize: 9, color: C.gold, padding: '1px 5px', background: `${C.gold}1a`, borderRadius: 3 }}>{f.recharge}</span>}
        <span style={{ fontSize: 9, color: C.textMuted, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.12s' }}>▾</span>
      </div>
      {open && (
        <div style={{ marginTop: 7, fontSize: 12, color: C.textDim, lineHeight: 1.65, paddingLeft: 30 }}>{f.desc}</div>
      )}
    </div>
  )
}

/* ── Utility section label ── */
function SectionLabel({ text, C }) {
  return (
    <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 700 }}>{text}</div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   SPELL FILTERS (left panel — spells tab)
═══════════════════════════════════════════════════════════════════════ */
function SpellFilters({ search, setSearch, lvlFilter, setLvl, schoolFilter, setSchool, classFilter, setClsFilter, count, C }) {
  const chip = (label, active, onClick, color) => (
    <button onClick={onClick} style={{
      fontSize: 10, padding: '4px 8px', borderRadius: 12, cursor: 'pointer',
      fontWeight: active ? 700 : 400,
      background: active ? (color ? `${color}28` : `${C.gold}28`) : 'transparent',
      border: `1px solid ${active ? (color || C.gold) + '99' : C.border}`,
      color: active ? (color || C.gold) : C.textMuted,
      transition: 'all 0.12s',
    }}>{label}</button>
  )

  return (
    <div style={{ padding: '10px 12px' }}>

      {/* Search */}
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search spells…"
        style={{
          width: '100%', padding: '7px 10px', fontSize: 12, marginBottom: 12,
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 6,
          color: C.text, outline: 'none', boxSizing: 'border-box',
        }}
      />

      {/* Level chips */}
      <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, marginBottom: 6, textTransform: 'uppercase' }}>Level</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
        {chip('All', lvlFilter === 'all', () => setLvl('all'), null)}
        {chip('Cantrip', lvlFilter === '0', () => setLvl('0'), null)}
        {[1,2,3,4,5,6,7,8,9].map(l => chip(`${l}`, lvlFilter === String(l), () => setLvl(String(l)), null))}
      </div>

      {/* School chips */}
      <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, marginBottom: 6, textTransform: 'uppercase' }}>School</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
        {chip('All', schoolFilter === 'all', () => setSchool('all'), null)}
        {DND.schools.map(s => chip(s, schoolFilter === s, () => setSchool(s), SCHOOL_COLORS[s]))}
      </div>

      {/* Class chips */}
      <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2, marginBottom: 6, textTransform: 'uppercase' }}>Class</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {chip('All', classFilter === 'all', () => setClsFilter('all'), null)}
        {DND.classes.map(c => chip(c.name, classFilter === c.name, () => setClsFilter(c.name), DND.classColors[c.name]))}
      </div>

      {/* Count */}
      <div style={{ marginTop: 16, fontSize: 11, color: C.textMuted, textAlign: 'center' }}>
        {count} spell{count !== 1 ? 's' : ''} found
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   SPELL GRID (right panel — spells tab)
═══════════════════════════════════════════════════════════════════════ */
function SpellGrid({ spells, expanded, setExpanded, C }) {
  if (spells.length === 0) {
    return (
      <div style={{ padding: '80px 40px', textAlign: 'center', color: C.textMuted }}>
        <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>✦</div>
        <div style={{ fontSize: 14 }}>No spells match your filters.</div>
        <div style={{ fontSize: 12, marginTop: 6 }}>Try clearing some filters.</div>
      </div>
    )
  }

  /* group by level for display */
  const byLevel = {}
  for (const s of spells) {
    if (!byLevel[s.level]) byLevel[s.level] = []
    byLevel[s.level].push(s)
  }

  return (
    <div style={{ padding: '24px 28px 60px' }}>
      {Object.keys(byLevel).sort((a,b) => +a-+b).map(lvl => (
        <div key={lvl} style={{ marginBottom: 28 }}>
          {/* Level header */}
          <div style={{
            fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.textMuted,
            fontWeight: 700, marginBottom: 10, paddingBottom: 6,
            borderBottom: `1px solid ${C.border}`,
          }}>
            {LEVEL_LABEL(+lvl)}
            <span style={{ marginLeft: 8, opacity: 0.5 }}>({byLevel[lvl].length})</span>
          </div>

          {/* Spell cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 8 }}>
            {byLevel[lvl].map(s => (
              <SpellCard key={s.name} spell={s} expanded={expanded === s.name} onToggle={() => setExpanded(expanded === s.name ? null : s.name)} C={C} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Individual spell card ── */
function SpellCard({ spell, expanded, onToggle, C }) {
  const sc = SCHOOL_COLORS[spell.school] || C.gold

  return (
    <div onClick={onToggle}
      style={{
        background: C.card, border: `1px solid ${expanded ? sc + '66' : C.border}`,
        borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: expanded ? `0 4px 16px ${sc}22` : 'none',
      }}>
      {/* top color bar */}
      <div style={{ height: 2, background: sc }} />
      <div style={{ padding: '10px 12px' }}>

        {/* Name row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
          {/* Level badge */}
          <span style={{
            fontSize: 9, fontWeight: 800, flexShrink: 0,
            padding: '2px 6px', borderRadius: 4,
            background: `${sc}22`, color: sc, letterSpacing: 0.5,
          }}>
            {spell.level === 0 ? 'C' : spell.level}
          </span>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.1 }}>{spell.name}</span>
          <span style={{
            fontSize: 9, padding: '2px 6px', borderRadius: 4,
            background: `${sc}16`, color: sc, flexShrink: 0,
          }}>{spell.school}</span>
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
          {[
            [spell.castTime, '⏱'],
            [spell.range,    '📐'],
            [spell.duration, '⌛'],
          ].map(([val, icon]) => (
            <span key={val} style={{ fontSize: 10, color: C.textMuted }}>
              <span style={{ opacity: 0.5, marginRight: 2 }}>{icon}</span>{val}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: expanded ? 8 : 0 }}>
          {spell.components && (
            <Tag label={spell.components} C={C} />
          )}
          {spell.concentration && <Tag label="Concentration" color={C.yellow} C={C} />}
          {spell.ritual       && <Tag label="Ritual" color={C.blue} C={C} />}
        </div>

        {/* Expanded: description + class list */}
        {expanded && (
          <>
            <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.7, marginTop: 10, paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
              {spell.desc}
            </div>
            <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {spell.classes.map(cls => (
                <span key={cls} style={{
                  fontSize: 9, padding: '2px 7px', borderRadius: 10,
                  background: `${DND.classColors[cls]}22`,
                  color: DND.classColors[cls], fontWeight: 600,
                }}>{cls}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Tag({ label, color, C }) {
  return (
    <span style={{
      fontSize: 9, padding: '2px 6px', borderRadius: 3,
      background: color ? `${color}20` : `${C.border}`,
      color: color || C.textMuted, fontWeight: color ? 600 : 400,
    }}>{label}</span>
  )
}
