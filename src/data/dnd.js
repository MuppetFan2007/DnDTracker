export const DND = {
  classes: [
    { name: 'Barbarian', hitDie: 12, subclasses: ['Path of the Berserker', 'Path of the Totem Warrior', 'Path of the Wild Heart', 'Path of the World Tree', 'Path of the Zealot'] },
    { name: 'Bard',      hitDie: 8,  subclasses: ['College of Dance', 'College of Glamour', 'College of Lore', 'College of Valor', 'College of Spirits'] },
    { name: 'Cleric',    hitDie: 8,  subclasses: ['Life Domain', 'Light Domain', 'Trickery Domain', 'War Domain', 'Knowledge Domain', 'Nature Domain', 'Tempest Domain', 'Death Domain'] },
    { name: 'Druid',     hitDie: 8,  subclasses: ['Circle of the Land', 'Circle of the Moon', 'Circle of the Sea', 'Circle of Stars', 'Circle of Wildfire'] },
    { name: 'Fighter',   hitDie: 10, subclasses: ['Battle Master', 'Champion', 'Eldritch Knight', 'Psi Warrior', 'Echo Knight', 'Rune Knight'] },
    { name: 'Monk',      hitDie: 8,  subclasses: ['Warrior of the Open Hand', 'Warrior of Shadow', 'Warrior of the Elements', 'Warrior of Mercy'] },
    { name: 'Paladin',   hitDie: 10, subclasses: ['Oath of Devotion', 'Oath of the Ancients', 'Oath of Glory', 'Oath of Vengeance', 'Oath of Conquest', 'Oathbreaker'] },
    { name: 'Ranger',    hitDie: 10, subclasses: ['Beast Master', 'Fey Wanderer', 'Gloom Stalker', 'Hunter', 'Swarmkeeper'] },
    { name: 'Rogue',     hitDie: 8,  subclasses: ['Arcane Trickster', 'Assassin', 'Soulknife', 'Swashbuckler', 'Thief'] },
    { name: 'Sorcerer',  hitDie: 6,  subclasses: ['Aberrant Mind', 'Clockwork Soul', 'Draconic Bloodline', 'Wild Magic', 'Storm Sorcery'] },
    { name: 'Warlock',   hitDie: 8,  subclasses: ['The Archfey', 'The Celestial', 'The Fiend', 'The Great Old One', 'The Undying'] },
    { name: 'Wizard',    hitDie: 6,  subclasses: ['School of Abjuration', 'School of Conjuration', 'School of Divination', 'School of Enchantment', 'School of Evocation', 'School of Illusion', 'School of Necromancy', 'School of Transmutation', 'Bladesinging', 'Order of Scribes'] },
  ],

  species: ['Aasimar', 'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Goliath', 'Halfling', 'Human', 'Orc', 'Tiefling', 'Ardling', 'Autognome', 'Githyanki', 'Astral Elf', 'Plasmoid'],

  backgrounds: [
    { name: 'Acolyte',    skills: ['Insight', 'Religion'] },
    { name: 'Artisan',    skills: ['Investigation', 'Persuasion'] },
    { name: 'Charlatan',  skills: ['Deception', 'Sleight of Hand'] },
    { name: 'Criminal',   skills: ['Deception', 'Stealth'] },
    { name: 'Entertainer',skills: ['Acrobatics', 'Performance'] },
    { name: 'Farmer',     skills: ['Animal Handling', 'Nature'] },
    { name: 'Guard',      skills: ['Athletics', 'Perception'] },
    { name: 'Guide',      skills: ['Stealth', 'Survival'] },
    { name: 'Hermit',     skills: ['Medicine', 'Religion'] },
    { name: 'Merchant',   skills: ['Animal Handling', 'Persuasion'] },
    { name: 'Noble',      skills: ['History', 'Persuasion'] },
    { name: 'Sage',       skills: ['Arcana', 'History'] },
    { name: 'Sailor',     skills: ['Acrobatics', 'Perception'] },
    { name: 'Soldier',    skills: ['Athletics', 'Intimidation'] },
    { name: 'Scribe',     skills: ['Investigation', 'Perception'] },
    { name: 'Wayfarer',   skills: ['Insight', 'Stealth'] },
  ],

  alignments: ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'],

  schools: ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'],

  skills: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'],

  skillStat: {
    'Acrobatics': 'dex', 'Animal Handling': 'wis', 'Arcana': 'int', 'Athletics': 'str',
    'Deception': 'cha', 'History': 'int', 'Insight': 'wis', 'Intimidation': 'cha',
    'Investigation': 'int', 'Medicine': 'wis', 'Nature': 'int', 'Perception': 'wis',
    'Performance': 'cha', 'Persuasion': 'cha', 'Religion': 'int', 'Sleight of Hand': 'dex',
    'Stealth': 'dex', 'Survival': 'wis',
  },

  classColors: {
    'Barbarian': '#ef4444', 'Bard': '#a855f7', 'Cleric': '#f59e0b', 'Druid': '#22c55e',
    'Fighter': '#6b7280', 'Monk': '#06b6d4', 'Paladin': '#eab308', 'Ranger': '#84cc16',
    'Rogue': '#94a3b8', 'Sorcerer': '#ec4899', 'Warlock': '#8b5cf6', 'Wizard': '#3b82f6',
  },

  spellColors: {
    'Abjuration': '#3b82f6', 'Conjuration': '#8b5cf6', 'Divination': '#06b6d4',
    'Enchantment': '#ec4899', 'Evocation': '#ef4444', 'Illusion': '#a855f7',
    'Necromancy': '#22c55e', 'Transmutation': '#f59e0b',
  },
}
