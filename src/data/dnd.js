export const DND = {
  classes: [
    { name: 'Barbarian', hitDie: 12, subclasses: ['Path of the Berserker', 'Path of the Totem Warrior', 'Path of the Wild Heart', 'Path of the World Tree', 'Path of the Zealot', 'Path of the Ancestral Guardian (2014)', 'Path of the Storm Herald (2014)', 'Path of Wild Magic (2014)', 'Path of the Beast (2014)'] },
    { name: 'Bard',      hitDie: 8,  subclasses: ['College of Dance', 'College of Glamour', 'College of Lore', 'College of Valor', 'College of Spirits', 'College of Swords (2014)', 'College of Whispers (2014)', 'College of Creation (2014)', 'College of Eloquence (2014)'] },
    { name: 'Cleric',    hitDie: 8,  subclasses: ['Life Domain', 'Light Domain', 'Trickery Domain', 'War Domain', 'Knowledge Domain', 'Nature Domain', 'Tempest Domain', 'Death Domain', 'Forge Domain (2014)', 'Grave Domain (2014)', 'Order Domain (2014)', 'Peace Domain (2014)', 'Twilight Domain (2014)'] },
    { name: 'Druid',     hitDie: 8,  subclasses: ['Circle of the Land', 'Circle of the Moon', 'Circle of the Sea', 'Circle of Stars', 'Circle of Wildfire', 'Circle of Spores (2014)', 'Circle of Dreams (2014)', 'Circle of Shepherd (2014)'] },
    { name: 'Fighter',   hitDie: 10, subclasses: ['Battle Master', 'Champion', 'Eldritch Knight', 'Psi Warrior', 'Echo Knight', 'Rune Knight', 'Arcane Archer (2014)', 'Cavalier (2014)', 'Samurai (2014)'] },
    { name: 'Monk',      hitDie: 8,  subclasses: ['Warrior of the Open Hand', 'Warrior of Shadow', 'Warrior of the Elements', 'Warrior of Mercy', 'Way of the Sun Soul (2014)', 'Way of the Drunken Master (2014)', 'Way of the Kensei (2014)', 'Way of the Astral Self (2014)', 'Way of the Four Elements (2014)'] },
    { name: 'Paladin',   hitDie: 10, subclasses: ['Oath of Devotion', 'Oath of the Ancients', 'Oath of Glory', 'Oath of Vengeance', 'Oath of Conquest', 'Oathbreaker', 'Oath of the Watchers (2014)', 'Oath of Redemption (2014)'] },
    { name: 'Ranger',    hitDie: 10, subclasses: ['Beast Master', 'Fey Wanderer', 'Gloom Stalker', 'Hunter', 'Swarmkeeper', 'Horizon Walker (2014)', 'Monster Slayer (2014)', 'Drakewarden (2014)'] },
    { name: 'Rogue',     hitDie: 8,  subclasses: ['Arcane Trickster', 'Assassin', 'Soulknife', 'Swashbuckler', 'Thief', 'Inquisitive (2014)', 'Mastermind (2014)', 'Scout (2014)', 'Phantom (2014)'] },
    { name: 'Sorcerer',  hitDie: 6,  subclasses: ['Aberrant Mind', 'Clockwork Soul', 'Draconic Bloodline', 'Wild Magic', 'Storm Sorcery', 'Divine Soul (2014)', 'Shadow Magic (2014)', 'Lunar Sorcery (2014)'] },
    { name: 'Warlock',   hitDie: 8,  subclasses: ['The Archfey', 'The Celestial', 'The Fiend', 'The Great Old One', 'The Undying', 'The Fathomless (2014)', 'The Genie (2014)', 'The Hexblade (2014)', 'The Undead (2014)'] },
    { name: 'Wizard',    hitDie: 6,  subclasses: ['School of Abjuration', 'School of Conjuration', 'School of Divination', 'School of Enchantment', 'School of Evocation', 'School of Illusion', 'School of Necromancy', 'School of Transmutation', 'Bladesinging', 'Order of Scribes', 'War Magic (2014)', 'Chronurgy Magic (2014)', 'Graviturgy Magic (2014)'] },
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
