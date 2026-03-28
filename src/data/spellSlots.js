// ─── SPELL SLOT TABLES ────────────────────────────────────────────────────────
// Full caster table (Bard, Cleric, Druid, Sorcerer, Wizard) — indexed by caster level 1-20
// Each row: [L1, L2, L3, L4, L5, L6, L7, L8, L9]
const FULL_CASTER_SLOTS = [
  // lv  1   2   3   4   5   6   7   8   9
  /*  1*/ [2, 0, 0, 0, 0, 0, 0, 0, 0],
  /*  2*/ [3, 0, 0, 0, 0, 0, 0, 0, 0],
  /*  3*/ [4, 2, 0, 0, 0, 0, 0, 0, 0],
  /*  4*/ [4, 3, 0, 0, 0, 0, 0, 0, 0],
  /*  5*/ [4, 3, 2, 0, 0, 0, 0, 0, 0],
  /*  6*/ [4, 3, 3, 0, 0, 0, 0, 0, 0],
  /*  7*/ [4, 3, 3, 1, 0, 0, 0, 0, 0],
  /*  8*/ [4, 3, 3, 2, 0, 0, 0, 0, 0],
  /*  9*/ [4, 3, 3, 3, 1, 0, 0, 0, 0],
  /* 10*/ [4, 3, 3, 3, 2, 0, 0, 0, 0],
  /* 11*/ [4, 3, 3, 3, 2, 1, 0, 0, 0],
  /* 12*/ [4, 3, 3, 3, 2, 1, 0, 0, 0],
  /* 13*/ [4, 3, 3, 3, 2, 1, 1, 0, 0],
  /* 14*/ [4, 3, 3, 3, 2, 1, 1, 0, 0],
  /* 15*/ [4, 3, 3, 3, 2, 1, 1, 1, 0],
  /* 16*/ [4, 3, 3, 3, 2, 1, 1, 1, 0],
  /* 17*/ [4, 3, 3, 3, 2, 1, 1, 1, 1],
  /* 18*/ [4, 3, 3, 3, 3, 1, 1, 1, 1],
  /* 19*/ [4, 3, 3, 3, 3, 2, 1, 1, 1],
  /* 20*/ [4, 3, 3, 3, 3, 2, 2, 1, 1],
]

// Warlock pact magic: [slots, slotLevel] indexed by warlock level 1-20
const WARLOCK_PACT = [
  /*  1*/ [1, 1],
  /*  2*/ [2, 1],
  /*  3*/ [2, 2],
  /*  4*/ [2, 2],
  /*  5*/ [2, 3],
  /*  6*/ [2, 3],
  /*  7*/ [2, 4],
  /*  8*/ [2, 4],
  /*  9*/ [2, 5],
  /* 10*/ [2, 5],
  /* 11*/ [3, 5],
  /* 12*/ [3, 5],
  /* 13*/ [3, 5],
  /* 14*/ [3, 5],
  /* 15*/ [3, 5],
  /* 16*/ [3, 5],
  /* 17*/ [4, 5],
  /* 18*/ [4, 5],
  /* 19*/ [4, 5],
  /* 20*/ [4, 5],
]

const FULL_CASTERS  = new Set(['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Wizard'])
const HALF_CASTERS  = new Set(['Paladin', 'Ranger'])
const THIRD_CASTERS = new Set(['Fighter', 'Rogue'])

// Subclasses that unlock third-caster spellcasting
const THIRD_CASTER_SUBCLASSES = new Set(['Eldritch Knight', 'Arcane Trickster'])

/**
 * Compute spell slots for a character's class list.
 * Returns { regularSlots: number[9], warlockSlots: {count, level}|null, casterLevel: number }
 */
export function computeSpellSlots(classes) {
  let casterLevel  = 0
  let warlockLevel = 0

  for (const cl of classes) {
    const lvl = cl.level || 0
    if (cl.name === 'Warlock') {
      warlockLevel = Math.max(warlockLevel, lvl)
    } else if (FULL_CASTERS.has(cl.name)) {
      casterLevel += lvl
    } else if (HALF_CASTERS.has(cl.name)) {
      casterLevel += Math.ceil(lvl / 2)          // 2024 rounds UP
    } else if (THIRD_CASTERS.has(cl.name) && THIRD_CASTER_SUBCLASSES.has(cl.subclass)) {
      casterLevel += Math.floor(lvl / 3)
    }
  }

  const regularSlots = casterLevel > 0
    ? [...FULL_CASTER_SLOTS[Math.min(casterLevel, 20) - 1]]
    : Array(9).fill(0)

  const warlockSlots = warlockLevel > 0
    ? { count: WARLOCK_PACT[warlockLevel - 1][0], level: WARLOCK_PACT[warlockLevel - 1][1] }
    : null

  return { regularSlots, warlockSlots, casterLevel }
}
