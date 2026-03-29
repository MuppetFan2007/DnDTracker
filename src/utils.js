export const mod    = (s) => Math.floor((s - 10) / 2)
export const fmt    = (n) => n >= 0 ? `+${n}` : `${n}`
export const uid    = () => Math.random().toString(36).slice(2, 10)
export const profB  = (lvl) => Math.ceil(lvl / 4) + 1
export const totalLevel = (char) =>
  (char.classes || [{ level: char.level || 1 }]).reduce((s, c) => s + (c.level || 0), 0)
export const levelLabel = (l) => l === 0 ? 'Cantrip' : `Level ${l}`

const STORE = 'dnd2024_v4'
export const loadLS = () => { try { return JSON.parse(localStorage.getItem(STORE) || '[]') || [] } catch { return [] } }
export const saveLS = (cs) => localStorage.setItem(STORE, JSON.stringify(cs))

export const blank = () => ({
  id: uid(), name: '', species: 'Human',
  classes: [{ name: 'Fighter', level: 1, subclass: '', subclassFeatures: '', classFeats: [], subclassFeats: [] }],
  background: 'Soldier', alignment: 'True Neutral', xp: 0,
  stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
  hp: { current: 10, max: 10, temp: 0 },
  ac: 10, speed: 30, initiative: 0,
  inspiration: false,
  deathSaves: { successes: 0, failures: 0 },
  savingThrowProfs: [], skillProfs: [],
  languages: 'Common',
  personalityTraits: '', ideals: '', bonds: '', flaws: '',
  features: '', equipment: '', spells: [],
  spellSlotsUsed: Array(9).fill(0),
  warlockSlotsUsed: 0,
  skillExpert: [],
  combatUsed: {},
  customActions: [],
  currency: { cp: 0, sp: 0, gp: 0, pp: 0 },
  speciesFeats: [], bgFeats: [], otherFeats: [],
  notes: '', sessions: [], createdAt: Date.now(),
})