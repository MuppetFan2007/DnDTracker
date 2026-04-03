// Missing 2024 subclass features + all 2014 subclass features
// Merged into SUBCLASS_FEATURES in Wiki.jsx via spread

export const SUBCLASS_FEATURES_EXTRA = {

  // ═══════════════════════════════════════════════════════
  //  BARBARIAN — missing 2024 + 2014 additions
  // ═══════════════════════════════════════════════════════
  Barbarian: {

    "Path of the Totem Warrior": [
      { level: 3, name: "Spirit Seeker", desc: "You can cast Beast Sense and Speak with Animals as rituals. Wisdom is your spellcasting ability for them.", limited: false },
      { level: 3, name: "Totem Spirit", desc: "Choose a totem animal: Bear (Resistance to all damage except Psychic while raging), Eagle (Disengage and Dash as Bonus Action while raging, and Opportunity Attacks against you have Disadvantage), or Wolf (allies have Advantage on melee attacks against any enemy within 5 ft of you while you rage).", limited: false },
      { level: 6, name: "Aspect of the Beast", desc: "Bear: double carrying capacity, advantage on Strength checks for lifting/pushing. Eagle: see up to 1 mile clearly, dim light doesn't impose disadvantage on Perception. Wolf: track at a fast pace, and move stealthily at a normal pace.", limited: false },
      { level: 10, name: "Spirit Walker", desc: "You can cast Commune with Nature as a ritual. Wisdom is your spellcasting ability for it.", limited: false },
      { level: 14, name: "Totemic Attunement", desc: "Bear: enemies within 5 ft have Disadvantage on attacks against creatures other than you while you rage. Eagle: gain a Fly Speed equal to your walking Speed while raging if wearing light or no armor. Wolf: knock a Large or smaller creature Prone when you hit it with a melee weapon attack while raging.", limited: false },
    ],

    "Path of the Ancestral Guardian (2014)": [
      { level: 3, name: "Ancestral Protectors", desc: "While raging, the first creature you hit on each turn has Disadvantage on attack rolls against targets other than you, and those targets gain Resistance to the creature's attacks until the start of your next turn.", limited: false },
      { level: 6, name: "Spirit Shield", desc: "As a Reaction when a creature you can see within 30 ft takes damage, reduce that damage by 2d6. This increases to 3d6 at level 10 and 4d6 at level 14.", limited: false },
      { level: 10, name: "Consult the Spirits", desc: "As a Magic action, cast Clairvoyance or Detect Magic (your choice) without a spell slot. Recharges on Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 14, name: "Vengeful Ancestors", desc: "When your Spirit Shield reduces damage, the attacker takes Psychic damage equal to the damage your Spirit Shield prevented.", limited: false },
    ],

    "Path of the Storm Herald (2014)": [
      { level: 3, name: "Storm Aura", desc: "While raging, choose an aura (Desert: deal 2 Fire to a creature you can see within 10 ft; Sea: a creature you choose within 10 ft takes 1d6 Lightning or has Disadvantage on its next attack; Tundra: choose one creature within 10 ft to gain 2 Temporary HP). Scales with level.", limited: false },
      { level: 6, name: "Storm Soul", desc: "Desert: Resistance to Fire, immunity to hot environments. Sea: Resistance to Lightning, breathe underwater and gain a Swim Speed equal to your Speed. Tundra: Resistance to Cold, immunity to cold environments.", limited: false },
      { level: 10, name: "Shielding Storm", desc: "Creatures you choose within your Storm Aura also gain the damage Resistance of your Storm Soul feature.", limited: false },
      { level: 14, name: "Raging Storm", desc: "Desert: when hit by a melee attack, attacker makes Dex save or falls Prone. Sea: Reaction to deal Lightning damage equal to Str modifier to an attacker within 5 ft. Tundra: creatures in your aura that move must make a Str save or have Speed reduced to 0 until end of turn.", limited: false },
    ],

    "Path of Wild Magic (2014)": [
      { level: 3, name: "Magic Awareness", desc: "As a Magic Action, open your awareness to detect magic. Until your next turn, you know the location of any spell or magic item within 60 ft that isn't behind total cover. Usable Proficiency Bonus times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 3, name: "Wild Surge", desc: "Whenever you enter your Rage, roll a d8 and gain a random Wild Magic effect for the duration of the Rage (teleportation, spectral shield, bolts of force, or other chaotic magical manifestations).", limited: false },
      { level: 6, name: "Bolstering Magic", desc: "As a Bonus Action, touch a creature (including yourself). Roll a d3: on 1, they add 1d3 to attack rolls and ability checks for 10 minutes. On 2 or 3, they can roll a d3 to regain a spell slot of that level (once per Long Rest for each recipient).", limited: false },
      { level: 10, name: "Unstable Backlash", desc: "As a Reaction when you take damage or fail a saving throw while raging, you can trigger a Wild Surge, potentially ending the triggering effect and gaining a new random magical benefit.", limited: false },
      { level: 14, name: "Controlled Surge", desc: "Whenever you roll on the Wild Magic Surge table for Wild Surge, roll twice and choose either result.", limited: false },
    ],

    "Path of the Beast (2014)": [
      { level: 3, name: "Form of the Beast", desc: "While raging, manifest natural weapons: Bite (1d8 Piercing, regain HP equal to Proficiency Bonus on a hit once per turn), Claws (1d6 Slashing, make one extra attack with the other claw as a Bonus Action), or Tail (1d8 Piercing, Reaction to add 1d8 to your AC against one attack per turn).", limited: false },
      { level: 6, name: "Bestial Soul", desc: "Your natural weapons count as magical. Choose one: Swim Speed equal to Speed and breathe underwater; Climb Speed equal to Speed; jump distance tripled and no running start required.", limited: false },
      { level: 10, name: "Infectious Fury", desc: "When you hit a creature with natural weapons while raging, force a Wisdom save (DC 8 + Constitution modifier + Proficiency Bonus) or take 2d12 Psychic damage or immediately use its Reaction to attack another creature. Usable Proficiency Bonus times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 14, name: "Call the Hunt", desc: "When you enter Rage, choose up to Proficiency Bonus willing creatures within 30 ft; they each gain 5 Temporary HP. Until the Rage ends, when any of those creatures hits with an attack on their turn, you can give them your Reckless Attack bonus damage. Once per Long Rest.", limited: true, recharge: "long rest" },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  BARD — missing 2024 + 2014
  // ═══════════════════════════════════════════════════════
  Bard: {

    "College of Spirits": [
      { level: 3, name: "Guiding Whispers", desc: "You learn the Guidance cantrip, which doesn't count against your cantrips known. Charisma is your spellcasting ability for it.", limited: false },
      { level: 3, name: "Spiritual Focus", desc: "You can use a candle, crystal ball, skull, spirit board, or tarokka deck as a Spellcasting Focus. When you cast a Bard spell using this focus, roll a d6: on a 5 or 6, the spell deals an extra 1d6 of its damage type or restores an extra 1d6 HP.", limited: false },
      { level: 3, name: "Tales from Beyond", desc: "Spend one Bardic Inspiration use to roll on the Spirit Tales table and channel a tale. The effects vary widely — buffing allies, hindering foes, summoning spectral effects, or revealing information. You can hold only one tale at a time.", limited: true, recharge: "bardic inspiration" },
      { level: 6, name: "Spirit Session", desc: "Lead a seance using your Spiritual Focus over 1 minute with up to 5 willing creatures. Choose a spell from any class list of a level equal to or lower than the number of creatures in the seance; it is prepared for 24 hours. Once per Long Rest.", limited: true, recharge: "long rest" },
      { level: 14, name: "Mystical Connection", desc: "When you use Tales from Beyond, roll twice and choose either result. Additionally, once per Long Rest you can channel a tale without expending a Bardic Inspiration die.", limited: false },
    ],

    "College of Swords (2014)": [
      { level: 3, name: "Bonus Proficiencies", desc: "You gain proficiency with Medium armor and the Scimitar. If you are proficient with a Simple or Martial weapon, you can use it as your Spellcasting Focus.", limited: false },
      { level: 3, name: "Fighting Style", desc: "Adopt either the Dueling or Two-Weapon Fighting fighting style. These count as Bard features for you, not Fighter features.", limited: false },
      { level: 3, name: "Blade Flourish", desc: "When you take the Attack action, your Speed increases by 10 ft. Once per attack you can expend a Bardic Inspiration die for a Flourish: Defensive (add die to AC until your next turn), Slashing (deal extra damage equal to the die to the target and an adjacent creature), or Mobile (deal extra damage equal to the die and move up to 5 ft without provoking Opportunity Attacks).", limited: true, recharge: "bardic inspiration" },
      { level: 6, name: "Extra Attack", desc: "You can attack twice instead of once whenever you take the Attack action. You can replace one attack with casting a cantrip.", limited: false },
      { level: 14, name: "Master's Flourish", desc: "When you use a Blade Flourish, you can roll a d6 and use it as the Flourish die instead of expending a Bardic Inspiration die.", limited: false },
    ],

    "College of Whispers (2014)": [
      { level: 3, name: "Psychic Blades", desc: "When you hit a creature with a weapon attack, you can expend one Bardic Inspiration die to deal extra Psychic damage equal to the die roll + your Charisma modifier. You can do this only once per round.", limited: true, recharge: "bardic inspiration" },
      { level: 3, name: "Words of Terror", desc: "Spend 1 minute speaking privately with a humanoid that can understand you. Make a Charisma (Persuasion) check contested by their Insight. On a success, the target is Frightened of you or another creature for 1 hour. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 6, name: "Mantle of Whispers", desc: "As a Reaction when a humanoid dies within 30 ft, capture their shadow. As an Action, use it as a disguise lasting until removed or 1 hour. While disguised, you know surface thoughts of creatures interacting with you. You can hold only one shadow at a time.", limited: false },
      { level: 14, name: "Shadow Lore", desc: "As a Magic Action, whisper to a creature within 30 ft. It makes a Wisdom save (DC = your Charisma spell save DC) or becomes Charmed for 8 hours. While Charmed, it follows your commands (not suicidal ones) and believes you know its darkest secret. Once the Charm ends, it has no memory of being controlled. Once per Long Rest.", limited: true, recharge: "long rest" },
    ],

    "College of Creation (2014)": [
      { level: 3, name: "Mote of Potential", desc: "When you grant Bardic Inspiration, the die gains extra power: ability check = creature can roll the die twice, use higher result; attack roll = extra damage on a hit equal to the die; saving throw = creature gains Temporary HP equal to die + Charisma modifier on a success.", limited: false },
      { level: 3, name: "Performance of Creation", desc: "As a Magic Action, create one nonmagical item of up to 20 gp (a Simple weapon, an item from the equipment lists) in an unoccupied space within 10 ft. It lasts a number of hours equal to your Proficiency Bonus. Once per Long Rest (or spend a level 2+ spell slot to reuse).", limited: true, recharge: "long rest" },
      { level: 6, name: "Animating Performance", desc: "As a Magic Action, animate one Large or smaller nonmagical item within 30 ft. It functions as an Animated Object for 1 hour or until you dismiss it. You can also use a Bonus Action on each turn to issue it a telepathic command. Once per Long Rest (or spend a level 3+ spell slot).", limited: true, recharge: "long rest" },
      { level: 14, name: "Creative Crescendo", desc: "When you use Performance of Creation, create a number of additional items equal to your Charisma modifier (min 1). The items can be different types and sizes, though each must be within size and cost restrictions.", limited: false },
    ],

    "College of Eloquence (2014)": [
      { level: 3, name: "Silver Tongue", desc: "When you make a Charisma (Persuasion) or Charisma (Deception) check, treat a roll of 9 or lower on the die as a 10.", limited: false },
      { level: 3, name: "Unsettling Words", desc: "As a Bonus Action, expend one Bardic Inspiration die and choose a creature within 60 ft. Roll the die; subtract the result from the creature's next saving throw before the end of your next turn.", limited: true, recharge: "bardic inspiration" },
      { level: 6, name: "Unfailing Inspiration", desc: "When a creature with your Bardic Inspiration die uses it and fails the roll anyway, it retains the die. It doesn't expire unused — the creature can keep trying until it succeeds or the die expires naturally.", limited: false },
      { level: 6, name: "Universal Speech", desc: "As a Magic Action, choose Charisma modifier (min 1) creatures within 60 ft; they understand your language perfectly for 1 hour. Once per Long Rest (or spend any spell slot to reuse).", limited: true, recharge: "long rest" },
      { level: 14, name: "Infectious Inspiration", desc: "When a creature within 60 ft uses your Bardic Inspiration and succeeds on the roll, you can take a Reaction to grant a different creature within 60 ft a Bardic Inspiration die — without expending one of your own. Usable Charisma modifier times per Long Rest.", limited: true, recharge: "long rest" },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  CLERIC — missing 2024 + 2014
  // ═══════════════════════════════════════════════════════
  Cleric: {

    "Knowledge Domain": [
      { level: 3, name: "Knowledge Domain Spells", desc: "Always prepared: Command, Identify (level 3); Augury, Suggestion (level 5); Speak with Dead, Slow (level 7); Arcane Eye, Confusion (level 9); Legend Lore, Scrying (level 11).", limited: false },
      { level: 3, name: "Blessings of Knowledge", desc: "Learn two languages of your choice and gain proficiency in your choice of two of the following skills: Arcana, History, Nature, or Religion. Your Proficiency Bonus is doubled for any ability check using those skills.", limited: false },
      { level: 3, name: "Knowledge of the Ages", desc: "As a Magic Action, expend one Channel Divinity use; choose one skill or tool. For 10 minutes, you have proficiency with that skill or tool.", limited: true, recharge: "channel divinity" },
      { level: 6, name: "Read Thoughts", desc: "As a Magic Action, target a creature you can see within 60 ft; expend one Channel Divinity use. The creature makes a Wisdom save. On failure, read its surface thoughts (1 minute, Concentration). You can cast Suggestion on the target without a spell slot during this time.", limited: true, recharge: "channel divinity" },
      { level: 17, name: "Visions of the Past", desc: "As a Magic Action, enter a meditative state and experience visions related to an object you hold or the location around you, seeing up to Wisdom modifier minutes of events from the recent past. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
    ],

    "Nature Domain": [
      { level: 3, name: "Nature Domain Spells", desc: "Always prepared: Entangle, Speak with Animals (level 3); Barkskin, Spike Growth (level 5); Plant Growth, Wind Wall (level 7); Dominate Beast, Grasping Vine (level 9); Insect Plague, Tree Stride (level 11).", limited: false },
      { level: 3, name: "Acolyte of Nature", desc: "Learn one Druid cantrip. Gain proficiency in Animal Handling, Nature, or Survival (your choice).", limited: false },
      { level: 3, name: "Charm Animals and Plants", desc: "As a Magic Action, expend one Channel Divinity use. Each Beast or Plant creature within 30 ft makes a Wisdom save or is Charmed by you for 1 minute. While Charmed, it is Friendly to you and other creatures you designate.", limited: true, recharge: "channel divinity" },
      { level: 6, name: "Dampen Elements", desc: "As a Reaction when you or a creature within 30 ft takes Acid, Cold, Fire, Lightning, or Thunder damage, grant Resistance to that damage to the creature for that instance.", limited: false },
      { level: 17, name: "Master of Nature", desc: "Gain the ability to command animals and plants. Creatures Charmed by your Charm Animals and Plants automatically succeed on saving throws you impose. Charmed Beasts and Plants must obey your verbal commands (no action required to issue them).", limited: false },
    ],

    "Tempest Domain": [
      { level: 3, name: "Tempest Domain Spells", desc: "Always prepared: Fog Cloud, Thunderwave (level 3); Gust of Wind, Shatter (level 5); Call Lightning, Sleet Storm (level 7); Control Water, Ice Storm (level 9); Destructive Wave, Insect Plague (level 11).", limited: false },
      { level: 3, name: "Bonus Proficiencies", desc: "Gain proficiency with Martial weapons and Heavy armor.", limited: false },
      { level: 3, name: "Wrath of the Storm", desc: "As a Reaction when a creature within 5 ft hits you with an attack, deal Thunder or Lightning damage (your choice) equal to 2d8 to the attacker (Dexterity save for half). Usable Wisdom modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 3, name: "Destructive Wrath", desc: "Expend one Channel Divinity use when you roll Lightning or Thunder damage to deal maximum damage instead of rolling.", limited: true, recharge: "channel divinity" },
      { level: 6, name: "Thunderous Strike", desc: "When you deal Lightning damage to a Large or smaller creature, you can push it up to 10 ft away from you.", limited: false },
      { level: 17, name: "Stormborn", desc: "Gain a Fly Speed equal to your current Speed whenever you are outdoors and not underground or indoors.", limited: false },
    ],

    "Death Domain": [
      { level: 3, name: "Death Domain Spells", desc: "Always prepared: False Life, Inflict Wounds (level 3); Blindness/Deafness, Ray of Enfeeblement (level 5); Animate Dead, Vampiric Touch (level 7); Blight, Death Ward (level 9); Antilife Shell, Cloudkill (level 11).", limited: false },
      { level: 3, name: "Bonus Proficiency", desc: "Gain proficiency with Martial weapons.", limited: false },
      { level: 3, name: "Reaper", desc: "Learn one Necromancy cantrip. When you cast a Necromancy cantrip that targets only one creature, it can target two creatures within range and within 5 ft of each other.", limited: false },
      { level: 3, name: "Touch of Death", desc: "Expend one Channel Divinity use when you hit a creature with a melee attack: deal extra Necrotic damage equal to 5 + twice your Cleric level.", limited: true, recharge: "channel divinity" },
      { level: 6, name: "Inescapable Destruction", desc: "Necrotic damage you deal ignores Resistance to Necrotic damage.", limited: false },
      { level: 17, name: "Improved Reaper", desc: "When you cast a Necromancy spell of level 1 or higher targeting only one creature, it can instead target two creatures within range and within 5 ft of each other. If the spell has a material cost, you pay it once for both.", limited: false },
    ],

    "Forge Domain (2014)": [
      { level: 3, name: "Forge Domain Spells", desc: "Always prepared: Identify, Searing Smite (level 3); Heat Metal, Magic Weapon (level 5); Elemental Weapon, Protection from Energy (level 7); Fabricate, Wall of Fire (level 9); Animate Objects, Creation (level 11).", limited: false },
      { level: 3, name: "Bonus Proficiencies", desc: "Gain proficiency with Heavy armor and Smith's Tools.", limited: false },
      { level: 3, name: "Blessing of the Forge", desc: "Once per Long Rest, touch one nonmagical weapon or armor; it becomes magical, gaining either a +1 bonus to attack/damage rolls (weapon) or +1 AC (armor) until your next Long Rest.", limited: true, recharge: "long rest" },
      { level: 3, name: "Artisan's Blessing", desc: "As a 1-hour ritual using one Channel Divinity use, create a nonmagical item including Simple weapons, Thieves' Tools, or any item worth up to 100 gp. You must supply metal worth half the item's cost (consumed).", limited: true, recharge: "channel divinity" },
      { level: 6, name: "Soul of the Forge", desc: "Gain Resistance to Fire damage. While wearing Heavy armor, gain a +1 bonus to AC.", limited: false },
      { level: 17, name: "Saint of Forge and Fire", desc: "Immunity to Fire damage. While wearing Heavy armor, have Resistance to Bludgeoning, Piercing, and Slashing damage from nonmagical attacks.", limited: false },
    ],

    "Grave Domain (2014)": [
      { level: 3, name: "Grave Domain Spells", desc: "Always prepared: Bane, False Life (level 3); Gentle Repose, Ray of Enfeeblement (level 5); Revivify, Vampiric Touch (level 7); Blight, Death Ward (level 9); Antilife Shell, Raise Dead (level 11).", limited: false },
      { level: 3, name: "Circle of Mortality", desc: "Spells that restore HP to a creature at 0 HP restore the maximum possible amount. Learn Spare the Dying cantrip with a range of 30 ft and it can be cast as a Bonus Action.", limited: false },
      { level: 3, name: "Eyes of the Grave", desc: "As a Magic Action, detect undead within 60 ft (blocked by total cover). You know the type but not identity. Usable Wisdom modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 3, name: "Path to the Grave", desc: "As a Magic Action, expend one Channel Divinity use; curse a creature within 30 ft. The next time you or an ally hits it before your next turn, the creature gains Vulnerability to that attack's damage.", limited: true, recharge: "channel divinity" },
      { level: 6, name: "Sentinel at Death's Door", desc: "As a Reaction, negate a Critical Hit made against yourself or a creature within 30 ft (turning it into a normal hit). Usable Wisdom modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 17, name: "Keeper of Souls", desc: "Once per turn, when an enemy creature dies within 60 ft, you or one creature you can see within 60 ft regains HP equal to the enemy's number of Hit Dice.", limited: false },
    ],

    "Order Domain (2014)": [
      { level: 3, name: "Order Domain Spells", desc: "Always prepared: Command, Heroism (level 3); Hold Person, Zone of Truth (level 5); Mass Healing Word, Slow (level 7); Compulsion, Locate Creature (level 9); Dominate Person, Hold Monster (level 11).", limited: false },
      { level: 3, name: "Bonus Proficiencies", desc: "Gain proficiency with Heavy armor and Persuasion.", limited: false },
      { level: 3, name: "Voice of Authority", desc: "If you cast a spell with a slot of level 1 or higher targeting an ally, that ally can use its Reaction to make one weapon attack against a creature of your choice that you can see.", limited: false },
      { level: 3, name: "Order's Demand", desc: "Expend one Channel Divinity use. Each creature of your choice within 30 ft makes a Wisdom save or is Charmed by you until the end of your next turn. A Charmed creature's Speed drops to 0.", limited: true, recharge: "channel divinity" },
      { level: 6, name: "Embodiment of the Law", desc: "When you cast an Enchantment spell with a slot, you can cast it as a Bonus Action this turn (once per turn).", limited: false },
      { level: 17, name: "Order's Wrath", desc: "If you deal Divine Strike damage to a creature, you can also curse it until the start of your next turn: the next time an ally hits the cursed creature, it takes an extra 2d8 Psychic damage and the curse ends.", limited: false },
    ],

    "Peace Domain (2014)": [
      { level: 3, name: "Peace Domain Spells", desc: "Always prepared: Heroism, Sanctuary (level 3); Aid, Warding Bond (level 5); Beacon of Hope, Sending (level 7); Aura of Purity, Otiluke's Resilient Sphere (level 9); Greater Restoration, Rary's Telepathic Bond (level 11).", limited: false },
      { level: 3, name: "Implement of Peace", desc: "Gain proficiency in Insight, Performance, or Persuasion (your choice).", limited: false },
      { level: 3, name: "Emboldening Bond", desc: "As a Magic Action, forge a bond among up to Proficiency Bonus willing creatures you can see within 30 ft for 10 minutes. Bonded creatures add 1d4 to attack rolls, ability checks, or saving throws while within 30 ft of at least one other bonded creature. Once per Long Rest (or spend a spell slot to reuse).", limited: true, recharge: "long rest" },
      { level: 3, name: "Balm of Peace", desc: "As part of your movement on your turn, you can move up to your Speed without provoking Opportunity Attacks. When you move within 5 ft of a creature during this movement, you can restore HP equal to 2d6 + Wisdom modifier (once per creature per turn). Usable Wisdom modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 6, name: "Protective Bond", desc: "Bonded creatures protect each other. When a bonded creature would take damage, another bonded creature within 60 ft can use its Reaction to teleport to an unoccupied adjacent space and take the damage instead.", limited: false },
      { level: 17, name: "Expansive Bond", desc: "Your Emboldening Bond and Protective Bond can extend to any distance (not just 30 ft) and are not broken by planar travel.", limited: false },
    ],

    "Twilight Domain (2014)": [
      { level: 3, name: "Twilight Domain Spells", desc: "Always prepared: Faerie Fire, Sleep (level 3); Moonbeam, See Invisibility (level 5); Aura of Vitality, Leomund's Tiny Hut (level 7); Aura of Life, Greater Invisibility (level 9); Circle of Power, Mislead (level 11).", limited: false },
      { level: 3, name: "Bonus Proficiencies", desc: "Gain proficiency with Martial weapons and Heavy armor.", limited: false },
      { level: 3, name: "Eyes of Night", desc: "Gain Darkvision 300 ft. As a Magic Action, share this Darkvision with any number of willing creatures within 10 ft for 1 hour. Once per Long Rest (or spend any spell slot to reuse).", limited: true, recharge: "long rest" },
      { level: 3, name: "Vigilant Blessing", desc: "Grant a creature (including yourself) Advantage on the next Initiative roll it makes. Once per Long Rest; refresh when you finish initiative.", limited: true, recharge: "long rest" },
      { level: 3, name: "Twilight Sanctuary", desc: "As a Magic Action, expend one Channel Divinity use: create a 30 ft radius sphere of dim twilight centered on yourself for 1 minute. Allies in the sphere at the start of their turn gain either 1d6 + Cleric level Temporary HP or end the Charmed or Frightened condition.", limited: true, recharge: "channel divinity" },
      { level: 6, name: "Steps of Night", desc: "As a Bonus Action in dim light or darkness, grant yourself a Fly Speed of 40 ft until end of turn. Usable Proficiency Bonus times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 17, name: "Twilight Shroud", desc: "The sphere of your Twilight Sanctuary grants Half Cover to all creatures inside it.", limited: false },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  DRUID — missing 2024 + 2014
  // ═══════════════════════════════════════════════════════
  Druid: {

    "Circle of Wildfire": [
      { level: 3, name: "Circle of Wildfire Spells", desc: "Always prepared: Burning Hands, Cure Wounds (level 3); Flaming Sphere, Scorching Ray (level 5); Plant Growth, Revivify (level 7); Aura of Life, Fire Shield (level 9); Flame Strike, Mass Cure Wounds (level 11).", limited: false },
      { level: 3, name: "Summon Wildfire Spirit", desc: "As a Magic Action, expend one Wild Shape use to summon a Wildfire Spirit in an unoccupied space within 30 ft (stats in the subclass table). It acts on your turn; command it as a Bonus Action. Lasts 1 hour or until it reaches 0 HP.", limited: true, recharge: "wild shape" },
      { level: 6, name: "Enhanced Bond", desc: "While your Wildfire Spirit is alive, Druid spells you cast deal extra 1d8 Fire or Healing (your choice, once per cast) through it if the target is within 30 ft of the Spirit. You can also teleport up to 15 ft to an unoccupied space within 5 ft of the Spirit as part of casting a spell.", limited: false },
      { level: 10, name: "Cauterizing Flames", desc: "When a Small or larger creature dies within 30 ft, a spectral flame appears at its space for 1 minute. As a Reaction when you or a creature within 60 ft moves within 5 ft of the flame, extinguish it to heal that creature 2d10 + Wisdom modifier HP or deal 2d10 + Wisdom modifier Fire damage.", limited: false },
      { level: 14, name: "Blazing Revival", desc: "When your Wildfire Spirit drops to 0 HP and you would be reduced to 0 HP simultaneously, the Spirit instead explodes: each creature within 10 ft takes 2d10 Fire damage (Dexterity save for half), and you regain half your max HP. Once per Long Rest.", limited: true, recharge: "long rest" },
    ],

    "Circle of Spores (2014)": [
      { level: 3, name: "Halo of Spores", desc: "When a creature you can see moves within 10 ft of you, use a Reaction to deal Necrotic damage to it (1d4, scaling to 1d6/1d8/1d10 at levels 6/10/14) unless it succeeds on a Constitution save.", limited: false },
      { level: 3, name: "Symbiotic Entity", desc: "Expend one Wild Shape use to awaken your spores instead of transforming. Gain 4 × Druid level Temporary HP, Halo of Spores deals double damage, and melee attacks deal extra 1d6 Necrotic. Lasts 10 minutes or until Temp HP are depleted.", limited: true, recharge: "wild shape" },
      { level: 6, name: "Fungal Infestation", desc: "As a Reaction when a Small or Medium Beast or Humanoid dies within 10 ft, animate its corpse as a Zombie under your control for 1 hour. Usable Wisdom modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 10, name: "Spreading Spores", desc: "While Symbiotic Entity is active, as a Bonus Action release spores in a 10 ft cube within 30 ft that lasts 1 minute. Any creature in the cube that moves must make a save or take Halo of Spores damage (Halo of Spores no longer requires Reaction while active).", limited: false },
      { level: 14, name: "Fungal Body", desc: "Immunity to Blinded, Deafened, Frightened, and Poisoned conditions. Critical hits against you become normal hits.", limited: false },
    ],

    "Circle of Dreams (2014)": [
      { level: 3, name: "Balm of the Summer Court", desc: "Gain a pool of d6s equal to Druid level. As a Bonus Action, spend up to half your Druid level in dice; a creature within 120 ft regains HP equal to the dice rolled + Wisdom modifier and gains the same number as Temporary HP. Restore pool on Long Rest.", limited: true, recharge: "long rest" },
      { level: 6, name: "Hearth of Moonlight and Shadow", desc: "When you finish a Short or Long Rest, you can magically conjure an illusory campfire. While within 300 ft, you and friendly creatures cannot be located by divination magic, have dim light (cannot be seen from outside), and regain 1 extra HP per level of any spell slot spent during the rest.", limited: false },
      { level: 10, name: "Hidden Paths", desc: "As a Bonus Action, teleport up to 60 ft to an unoccupied space you can see. Or use a Magic Action to teleport a willing creature within 5 ft up to 30 ft to an unoccupied space you can see. Usable Wisdom modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 14, name: "Walker in Dreams", desc: "After a Short Rest, cast Dream, Scrying, or Teleportation Circle without a slot (once per Short Rest). The spells use Wisdom as the ability and target your most recent resting place.", limited: true, recharge: "short rest" },
    ],

    "Circle of Shepherd (2014)": [
      { level: 3, name: "Speech of the Woods", desc: "Learn to speak, read, and write Sylvan. You can also communicate simple ideas to Beasts using sounds and gestures. Beasts can communicate basic emotions and intentions back.", limited: false },
      { level: 3, name: "Spirit Totem", desc: "As a Bonus Action, magically summon a totem spirit to a point within 60 ft for 1 minute. Bear: all creatures within 30 ft of it gain Temp HP equal to 5 + Druid level when summoned. Hawk: when any creature in range makes an attack roll, grant Advantage as a Reaction once per round. Unicorn: healing spells you and allies cast within range restore 1 extra die of HP. Recharges on Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 6, name: "Mighty Summoner", desc: "Beasts and Fey you summon or create with a spell have 2 extra HP per Hit Die and their attacks count as magical for overcoming Resistance and Immunity.", limited: false },
      { level: 10, name: "Guardian Spirit", desc: "Your Spirit Totem protects the Beasts and Fey you summon. Summoned or created creatures within 30 ft of the totem that would drop to 0 HP can make a Constitution save; on a success, they drop to 1 HP instead. Once per creature per turn.", limited: false },
      { level: 14, name: "Faithful Summons", desc: "When you are reduced to 0 HP or Incapacitated against your will, immediately summon four Spirit Animals (a CR 2 or lower Beast of your choice for each). They appear within 20 ft and act on your initiative. They remain until you regain consciousness or 1 hour. Once per Long Rest.", limited: true, recharge: "long rest" },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  FIGHTER — missing 2024 + 2014
  // ═══════════════════════════════════════════════════════
  Fighter: {

    "Echo Knight": [
      { level: 3, name: "Manifest Echo", desc: "As a Bonus Action, manifest an echo of yourself (AC 14, 1 HP, uses your saves) in an unoccupied space within 15 ft. When you move, you can instead move the echo. When you take the Attack action, replace one attack with an attack from the echo's space. Dismiss as a Bonus Action.", limited: false },
      { level: 3, name: "Unleash Incarnation", desc: "When you take the Attack action, make one extra melee attack from the echo's space. Usable Constitution modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 7, name: "Echo Avatar", desc: "As a Magic Action, see and hear through your echo (instead of your own senses) for up to 10 minutes. The echo must be within 1,000 ft. Once per Long Rest.", limited: true, recharge: "long rest" },
      { level: 10, name: "Shadow Martyr", desc: "As a Reaction when a creature you can see within 5 ft of your echo is hit, the echo takes the damage instead (it is then destroyed). Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 15, name: "Reclaim Potential", desc: "When your echo is destroyed, gain 2d6 + Constitution modifier Temporary HP. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 18, name: "Legion of One", desc: "Create two echoes simultaneously. Both can be used for your bonus attacks on the same turn, and you choose which one a creature attacks when using Shadow Martyr.", limited: false },
    ],

    "Rune Knight": [
      { level: 3, name: "Bonus Proficiencies", desc: "Gain proficiency with Smith's Tools. Learn to read, write, and speak Giant.", limited: false },
      { level: 3, name: "Rune Carving", desc: "Learn two runes: Cloud (advantage on Persuasion/Deception; reaction to impose disadvantage on an attack against you), Fire (advantage on History/Arcana; reaction to deal 2d6 Fire on a hit), Frost (advantage on Athletics; reaction to Restrain a creature), Hill (advantage on Wisdom saves; reaction to reduce damage), Stone (advantage on Perception; reaction to turn a hit into a miss), or Storm (advantage on Athletics/Acrobatics; reaction to push 10 ft). Engrave runes on weapons, armor, or tools; refresh after Long Rest.", limited: true, recharge: "long rest" },
      { level: 3, name: "Giant's Might", desc: "As a Bonus Action, grow to Large size for 1 minute: advantage on Strength checks/saves, deal extra 1d6 on weapon attacks. Usable Proficiency Bonus times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 7, name: "Runic Shield", desc: "As a Reaction when another creature you can see within 60 ft is hit by an attack, force the attacker to reroll and use the lower result. Usable Proficiency Bonus times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 10, name: "Great Stature", desc: "Giant's Might now grows you to Huge size (if Large or smaller). Your height increases by 3d4 inches permanently.", limited: false },
      { level: 15, name: "Master of Runes", desc: "You can invoke each rune twice before a Short or Long Rest.", limited: false },
      { level: 18, name: "Runic Juggernaut", desc: "Giant's Might now grows you to Huge size (you become Large if already Huge). Extra weapon damage increases to 1d10. Add a third rune of your choice.", limited: false },
    ],

    "Arcane Archer (2014)": [
      { level: 3, name: "Arcane Archer Lore", desc: "Gain proficiency in Arcana or Nature (your choice) and learn either the Druidcraft or Prestidigitation cantrip.", limited: false },
      { level: 3, name: "Arcane Shot", desc: "Learn two Arcane Shot options. Use an Arcane Shot when you fire an arrow from a Short or Long bow as part of the Attack action; the effect triggers on a hit (or on a miss if stated). Two uses per Short or Long Rest; learn more options at higher levels.", limited: true, recharge: "short rest", usesFormula: "2 (more at 7, 10, 15, 18)" },
      { level: 7, name: "Magic Arrow", desc: "Your arrows become magical, overcoming Resistance and Immunity to nonmagical attacks.", limited: false },
      { level: 7, name: "Curving Shot", desc: "When you miss with an Arcane Shot, you can use a Bonus Action to reroll the attack against a different target within 60 ft of the original.", limited: false },
      { level: 15, name: "Ever-Ready Shot", desc: "If you have no Arcane Shot uses remaining when you roll Initiative, you regain one use.", limited: false },
    ],

    "Cavalier (2014)": [
      { level: 3, name: "Bonus Proficiency", desc: "Gain proficiency in Animal Handling, History, Insight, Performance, or Persuasion (your choice). If already proficient, gain Expertise instead.", limited: false },
      { level: 3, name: "Born to the Saddle", desc: "Advantage on saving throws to avoid falling off a mount. Mounting/dismounting costs only 5 ft of movement. Advantage on attack rolls against creatures smaller than your mount while mounted.", limited: false },
      { level: 3, name: "Unwavering Mark", desc: "When you hit a creature with a melee attack, mark it until end of your next turn. Marked creatures have Disadvantage on attacks against creatures other than you. If a marked creature deals damage to anyone but you on its turn, use a Bonus Action on your next turn to make one melee attack against it with Advantage. Usable Strength modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 7, name: "Warding Maneuver", desc: "As a Reaction, give yourself or a mount within 5 ft a 1d8 bonus to AC against one attack; if the attack still hits, the target has Resistance to that damage. Usable Constitution modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 10, name: "Hold the Line", desc: "Creatures provoke Opportunity Attacks when entering your reach. On a hit with an Opportunity Attack, their Speed drops to 0 for the rest of the turn.", limited: false },
      { level: 15, name: "Ferocious Charger", desc: "When you move 10+ ft in a straight line before hitting with a weapon attack, knock the target Prone (Strength save to resist; DC = 8 + Proficiency Bonus + Strength modifier). Once per turn.", limited: false },
      { level: 18, name: "Vigilant Defender", desc: "You can take up to a number of Opportunity Attacks equal to your Dexterity modifier (min 1) per round without using your Reaction, as long as no two targets are the same creature.", limited: false },
    ],

    "Samurai (2014)": [
      { level: 3, name: "Bonus Proficiency", desc: "Gain proficiency in History, Insight, Performance, or Persuasion (your choice). If already proficient, gain Expertise instead.", limited: false },
      { level: 3, name: "Fighting Spirit", desc: "As a Bonus Action, give yourself Advantage on all weapon attack rolls until end of turn and gain 5 Temporary HP (increases to 10 at level 10 and 15 at level 15). Usable 3 times per Long Rest.", limited: true, recharge: "long rest", usesFormula: "3" },
      { level: 7, name: "Elegant Courtier", desc: "Add Wisdom modifier to Charisma (Persuasion) checks. Gain proficiency in Wisdom saving throws (or Intelligence/Charisma if already proficient).", limited: false },
      { level: 10, name: "Tireless Spirit", desc: "If you have no Fighting Spirit uses remaining when you roll Initiative, you regain one use.", limited: false },
      { level: 15, name: "Rapid Strike", desc: "Once per turn, when you have Advantage on an attack roll and score a hit, forgo the Advantage to make one additional weapon attack as a Bonus Action.", limited: false },
      { level: 18, name: "Strength before Death", desc: "When you take damage that reduces you to 0 HP, you can delay falling unconscious until end of your next turn. During this time, take a turn as normal (though you die immediately if you take a Critical Hit). Once per Long Rest.", limited: true, recharge: "long rest" },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  MONK — 2014 additions
  // ═══════════════════════════════════════════════════════
  Monk: {

    "Way of the Sun Soul (2014)": [
      { level: 3, name: "Radiant Sun Bolt", desc: "Make a ranged spell attack (range 30 ft) dealing 1d6 + Dexterity or Wisdom modifier Radiant damage. This counts as Unarmed Strikes for features and can replace attacks in your Attack action. At level 5+, replace one attack with two Radiant Sun Bolt attacks as a Bonus Action for 1 Focus Point.", limited: false },
      { level: 6, name: "Searing Arc Strike", desc: "After taking the Attack action, spend 2 Focus Points to cast Burning Hands (save DC = Focus save DC). You can spend extra points to increase the slot level: 1 point per level above 1st.", limited: true, recharge: "focus points" },
      { level: 11, name: "Searing Sunburst", desc: "As a Magic Action, create a blinding orb of radiance at a point within 150 ft. Creatures in a 20-ft radius make a Constitution save or take 2d6 Radiant damage (no damage on success). Spend up to 3 Focus Points to add 2d6 Radiant per point.", limited: false },
      { level: 17, name: "Sun Shield", desc: "Shed bright light 30 ft and dim light 30 ft beyond (can dismiss/restore as a Bonus Action). When a creature hits you with a melee attack, deal 5 + Wisdom modifier Radiant damage to the attacker.", limited: false },
    ],

    "Way of the Drunken Master (2014)": [
      { level: 3, name: "Bonus Proficiencies", desc: "Gain proficiency in Performance. You gain proficiency with brewer's supplies if you don't already have it.", limited: false },
      { level: 3, name: "Drunken Technique", desc: "When you use Flurry of Blows, gain the benefit of the Disengage action and your Speed increases by 10 ft until end of turn.", limited: false },
      { level: 6, name: "Tipsy Sway", desc: "Leap to Your Feet: standing from Prone costs only 5 ft of movement. Redirect Attack: when a creature misses you with a melee attack, spend 1 Focus Point to redirect it against another creature within 5 ft (using the same attack roll).", limited: false },
      { level: 11, name: "Drunkard's Luck", desc: "When you make an ability check, attack roll, or saving throw with Disadvantage, spend 2 Focus Points to cancel the Disadvantage.", limited: true, recharge: "focus points" },
      { level: 17, name: "Intoxicated Frenzy", desc: "When you use Flurry of Blows, make up to three extra Unarmed Strikes (up to five total), provided each one targets a different creature.", limited: false },
    ],

    "Way of the Kensei (2014)": [
      { level: 3, name: "Path of the Kensei", desc: "Choose 2 weapons (one melee, one ranged; not Heavy) as Kensei weapons. They count as Monk weapons. Agile Parry: +2 AC if wielding a Kensei melee weapon after using your Unarmed Strike or Kensei weapon in the Attack action. Kensei's Shot: deal +1d4 damage on a Kensei ranged weapon attack as a Bonus Action. Way of the Brush: gain calligrapher's supplies or painter's supplies.", limited: false },
      { level: 6, name: "One with the Blade", desc: "Kensei weapons count as magical. Deft Strike: spend 1 Focus Point to deal extra damage equal to your Martial Arts die on a Kensei weapon hit (once per turn).", limited: false },
      { level: 11, name: "Sharpen the Blade", desc: "As a Bonus Action, spend 1–3 Focus Points to grant your Kensei weapon a bonus to attack and damage rolls equal to Focus Points spent for 1 minute. Only usable if the weapon doesn't already have a magic bonus.", limited: true, recharge: "focus points" },
      { level: 17, name: "Unerring Accuracy", desc: "Once per turn, if you miss with a Monk weapon attack, reroll the attack roll.", limited: false },
    ],

    "Way of the Astral Self (2014)": [
      { level: 3, name: "Arms of the Astral Self", desc: "Spend 1 Focus Point to summon spectral forearms and hands for 10 minutes. They have reach 10 ft, deal Force damage (Martial Arts die + Wisdom modifier, not Strength/Dexterity), can use Wisdom for attack/damage rolls with them, count as Unarmed Strikes, and deflect melee attacks (reduce damage by d4).", limited: true, recharge: "focus points" },
      { level: 6, name: "Visage of the Astral Self", desc: "Spend 1 Focus Point to summon a spectral visage for 10 minutes: Darkvision 120 ft, a 120-ft telepathy, advantage on Wisdom (Insight) and Charisma (Intimidation) checks, and you can speak any language you know.", limited: true, recharge: "focus points" },
      { level: 11, name: "Body of the Astral Self", desc: "While Arms of the Astral Self are active, your astral body protects you: when you take damage, reduce it by 1d10 + Wisdom modifier (Deflect Energy); attacks against you don't get advantage from being flanked (Astral Barrage upgrade unlocked at 17).", limited: false },
      { level: 17, name: "Awakened Astral Self", desc: "When you spend 3 Focus Points to manifest the Arms, Visage, and Body simultaneously, gain the ability to make 2 extra Unarmed Strikes (as part of an Attack action) using your Astral Arms.", limited: true, recharge: "focus points" },
    ],

    "Way of the Four Elements (2014)": [
      { level: 3, name: "Disciple of the Elements", desc: "Learn two Elemental Disciplines (e.g., Fist of Unbroken Air, Rush of the Gale Spirits, Shape the Flowing River, Sweeping Cinder Strike, Water Whip, Fangs of the Fire Snake). Each discipline has a Focus Point cost. Learn additional disciplines at levels 6, 11, and 17.", limited: true, recharge: "focus points" },
      { level: 3, name: "Elemental Attunement (Four Elements)", desc: "Minor manipulations of elements (examples: create a brief breeze, ignite a flammable object, chill water, create a ripple in water) at will require no Focus Points.", limited: false },
      { level: 6, name: "Elemental Disciplines (level 6)", desc: "Gain additional disciplines including options for fire, earth, air, and water. Higher-level disciplines like Flames of the Phoenix (Fireball) and Mist Stance (Gaseous Form) become available for more Focus Points.", limited: false },
      { level: 11, name: "Elemental Disciplines (level 11)", desc: "Gain access to powerful disciplines: Ride the Wind (Fly), Eternal Mountain Defense (Stoneskin), Wave of Rolling Earth (Wall of Stone).", limited: false },
      { level: 17, name: "Elemental Disciplines (level 17)", desc: "Gain access to Breath of Winter (Cone of Cold), Clench of the North Wind (Hold Monster), Gong of the Summit (Shatter), River of Hungry Flame (Wall of Fire).", limited: false },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  PALADIN — missing 2024 + 2014
  // ═══════════════════════════════════════════════════════
  Paladin: {

    "Oath of Conquest": [
      { level: 3, name: "Oath of Conquest Spells", desc: "Always prepared: Armor of Agathys, Command (level 3); Hold Person, Spiritual Weapon (level 5); Bestow Curse, Fear (level 9); Dominate Beast, Stoneskin (level 13); Cloudkill, Dominate Person (level 17).", limited: false },
      { level: 3, name: "Conquering Strike", desc: "Expend one Channel Divinity use when you hit a creature with a melee weapon attack: the creature is Frightened for 1 minute (Wisdom save to end on each of its turns). A Frightened creature has Speed 0 if you are within its line of sight.", limited: true, recharge: "channel divinity" },
      { level: 3, name: "Guided Strike", desc: "Expend one Channel Divinity use: add +10 to an attack roll you make, applying after seeing the initial roll but before success/fail.", limited: true, recharge: "channel divinity" },
      { level: 7, name: "Aura of Conquest", desc: "Frightened creatures within your Aura of Protection have Speed 0. When a Frightened creature starts its turn in the aura, it takes Psychic damage equal to half your Paladin level.", limited: false },
      { level: 15, name: "Scornful Rebuke", desc: "As a Reaction when you take damage while Concentrating on a spell, deal Psychic damage equal to your Charisma modifier (min 1) to every creature within your Aura of Protection.", limited: false },
      { level: 20, name: "Invincible Conqueror", desc: "As a Bonus Action (once per Long Rest, or restore with a level 5 spell slot), gain for 1 minute: Resistance to all damage, extra attack on the Attack action, and Critical Hits on rolls of 19–20.", limited: true, recharge: "long rest" },
    ],

    "Oathbreaker": [
      { level: 3, name: "Oathbreaker Spells", desc: "Always prepared: Hellish Rebuke, Inflict Wounds (level 3); Crown of Madness, Darkness (level 5); Animate Dead, Bestow Curse (level 9); Blight, Confusion (level 13); Contagion, Dominate Person (level 17).", limited: false },
      { level: 3, name: "Channel Divinity: Control Undead", desc: "Expend one Channel Divinity use as a Magic Action; a Undead creature within 30 ft makes a Wisdom save or falls under your control for 24 hours (or until you use this on another creature). A creature with CR ≥ your Paladin level is immune.", limited: true, recharge: "channel divinity" },
      { level: 3, name: "Channel Divinity: Dreadful Aspect", desc: "Expend one Channel Divinity use. Each creature of your choice within 30 ft makes a Wisdom save or becomes Frightened for 1 minute (repeat save at end of each turn). Frightened creatures must move away from you on their turns.", limited: true, recharge: "channel divinity" },
      { level: 7, name: "Aura of Hate", desc: "You and Fiends/Undead within your Aura of Protection add your Charisma modifier (min +1) as a bonus to melee weapon damage rolls.", limited: false },
      { level: 15, name: "Supernatural Resistance", desc: "Resistance to Bludgeoning, Piercing, and Slashing damage from nonmagical weapons.", limited: false },
      { level: 20, name: "Dread Lord", desc: "As a Bonus Action, create a 30 ft aura of gloom for 1 minute: dim light, enemies Frightened (must make Wis save at start of their turns or deal half damage), and your undead allies have Advantage on attacks. Once per Long Rest.", limited: true, recharge: "long rest" },
    ],

    "Oath of the Watchers (2014)": [
      { level: 3, name: "Oath of the Watchers Spells", desc: "Always prepared: Alarm, Detect Magic (level 3); Moonbeam, See Invisibility (level 5); Counterspell, Nondetection (level 9); Aura of Purity, Banishment (level 13); Hold Monster, Scrying (level 17).", limited: false },
      { level: 3, name: "Watcher's Will", desc: "Expend one Channel Divinity use; up to Charisma modifier creatures you can see within 30 ft gain Advantage on Intelligence, Wisdom, and Charisma saving throws for 1 minute.", limited: true, recharge: "channel divinity" },
      { level: 3, name: "Abjure the Extraplanar", desc: "Expend one Channel Divinity use; Aberrations, Celestials, Elementals, Fey, and Fiends within 30 ft make Wisdom saves or are Turned for 1 minute. A Turned creature flees and can't take Reactions.", limited: true, recharge: "channel divinity" },
      { level: 7, name: "Aura of the Sentinel", desc: "You and creatures within your Aura of Protection add your Proficiency Bonus to Initiative rolls.", limited: false },
      { level: 15, name: "Vigilant Rebuke", desc: "Whenever a creature you can see succeeds on an Intelligence, Wisdom, or Charisma saving throw, use a Reaction to deal 2d8 + Charisma modifier Force damage to the triggering creature.", limited: false },
      { level: 20, name: "Mortal Bulwark", desc: "As a Bonus Action (once per Long Rest, or restore with a level 5 spell slot), assume a supernal form for 1 minute: Truesight 120 ft, detect Aberrations/Celestials/Elementals/Fey/Fiends within 60 ft, Advantage on attacks against such creatures, and on a hit force them to make a Charisma save or be Banished.", limited: true, recharge: "long rest" },
    ],

    "Oath of Redemption (2014)": [
      { level: 3, name: "Oath of Redemption Spells", desc: "Always prepared: Sanctuary, Sleep (level 3); Calm Emotions, Hold Person (level 5); Counterspell, Hypnotic Pattern (level 9); Otiluke's Resilient Sphere, Stoneskin (level 13); Hold Monster, Wall of Force (level 17).", limited: false },
      { level: 3, name: "Emissary of Peace", desc: "Gain a +5 bonus to Charisma (Persuasion) checks made to diplomatically resolve a conflict.", limited: false },
      { level: 3, name: "Rebuke the Violent", desc: "As a Reaction when a creature within 30 ft deals damage with an attack, expend one Channel Divinity use to force the attacker to make a Wisdom save. On failure, it takes Radiant damage equal to the damage it just dealt.", limited: true, recharge: "channel divinity" },
      { level: 7, name: "Aura of the Guardian", desc: "As a Reaction when a creature within your Aura of Protection takes damage, you take that damage instead. Your resistance or immunities do not apply to the transferred damage.", limited: false },
      { level: 15, name: "Protective Spirit", desc: "At the end of your turn while below half HP and not Incapacitated, regain HP equal to 1d6 + half your Paladin level.", limited: false },
      { level: 20, name: "Emissary of Redemption", desc: "Become a living embodiment of peace for 1 minute (once per Long Rest). Resistance to all damage from creatures; if a creature deals damage to you, it takes Radiant damage equal to half the damage it dealt and must then make a Wisdom save or be Incapacitated until end of its next turn.", limited: true, recharge: "long rest" },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  RANGER — missing 2024 + 2014
  // ═══════════════════════════════════════════════════════
  Ranger: {

    "Swarmkeeper": [
      { level: 3, name: "Gathered Swarm", desc: "A swarm of nature spirits in animal form orbits you. Once per turn when you hit with an attack, the swarm deals an extra 1d6 (Piercing, Bludgeoning, or Slashing, your choice) and you choose one effect: push the target 15 ft, move yourself 5 ft without Opportunity Attacks, or transport the target 5 ft.", limited: false },
      { level: 3, name: "Swarmkeeper Spells", desc: "Always prepared: Faerie Fire, Mage Hand (level 3); Web (level 5); Gaseous Form (level 9); Arcane Eye (level 13); Insect Plague (level 17).", limited: false },
      { level: 7, name: "Writhing Tide", desc: "As a Bonus Action, use your swarm to grant yourself a Flying Speed of 10 ft for 1 minute. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 11, name: "Mighty Swarm", desc: "Gathered Swarm's damage increases to 1d8. Its push increases to 15 ft, your movement becomes 15 ft, and it can Prone the target instead of moving it.", limited: false },
      { level: 15, name: "Swarming Dispersal", desc: "As a Reaction when you take damage, reduce it by half and immediately teleport up to 30 ft to an unoccupied space you can see. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
    ],

    "Horizon Walker (2014)": [
      { level: 3, name: "Horizon Walker Spells", desc: "Always prepared: Protection from Evil and Good (level 3); Misty Step (level 5); Haste (level 9); Banishment (level 13); Teleportation Circle (level 17).", limited: false },
      { level: 3, name: "Detect Portal", desc: "As a Magic Action, sense the distance and direction to the closest planar portal within 1 mile. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 3, name: "Planar Warrior", desc: "As a Bonus Action before hitting with a weapon attack, convert all damage to Force damage and deal extra 1d8 Force on the hit. Scales to 2d8 at level 11.", limited: false },
      { level: 7, name: "Ethereal Step", desc: "At the start of your turn, step into the Ethereal Plane for a moment and return to the Material Plane in an unoccupied space within 30 ft of where you left (no action required). Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 11, name: "Distant Strike", desc: "When you take the Attack action, teleport up to 10 ft before each attack. If you attack two different creatures this way, make a bonus third attack.", limited: false },
      { level: 15, name: "Spectral Defense", desc: "As a Reaction when you take damage from a creature, gain Resistance to that damage type until end of your next turn.", limited: false },
    ],

    "Monster Slayer (2014)": [
      { level: 3, name: "Monster Slayer Spells", desc: "Always prepared: Protection from Evil and Good (level 3); Zone of Truth (level 5); Magic Circle (level 9); Banishment (level 13); Hold Monster (level 17).", limited: false },
      { level: 3, name: "Hunter's Sense", desc: "As a Magic Action, choose a creature within 60 ft: learn any damage Immunities, Resistances, or Vulnerabilities it has. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 3, name: "Slayer's Prey", desc: "As a Bonus Action, designate one creature within 60 ft as your prey until you use this again. Your first attack each turn against it deals +1d6 extra damage.", limited: false },
      { level: 7, name: "Supernatural Defense", desc: "Add 1d6 to saving throws against your Slayer's Prey target's spells/special abilities and to Concentration saves from damage it deals.", limited: false },
      { level: 11, name: "Magic-User's Nemesis", desc: "When you see a creature within 60 ft casting a spell or teleporting, use a Reaction to try to foil it: the creature makes a Wisdom save (DC = your Ranger spell save DC) or the spell/teleport is wasted. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 15, name: "Slayer's Counter", desc: "When your Slayer's Prey target forces you to make a saving throw, use a Reaction to attack it once with a weapon. On a hit, automatically succeed on the save.", limited: false },
    ],

    "Drakewarden (2014)": [
      { level: 3, name: "Drake Companion", desc: "Bond with a Drake Companion that grows alongside you. It uses the Drake Companion stat block and acts on your turn; command it as a Bonus Action (it otherwise Dodges). Restore it with a spell slot if it dies. Choose its damage type (Acid, Cold, Fire, Lightning, or Poison) and it can't be changed.", limited: false },
      { level: 3, name: "Drakewarden Spells", desc: "Always prepared: Absorb Elements, Speak with Animals (level 3); Dragon's Breath (level 5).", limited: false },
      { level: 7, name: "Bond of Fang and Scale", desc: "Drake Companion grows to Large size. While it is within 5 ft of you, you both have Resistance to its damage type. Cause it to deal extra 1d6 of its damage type on a hit once per turn.", limited: false },
      { level: 11, name: "Drake's Breath", desc: "As a Magic Action, cause your Drake to exhale a breath weapon (30-ft cone or 60-ft line, matching its damage type): 8d6 damage (Dex save for half). Also use the breath yourself without the drake. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 15, name: "Perfected Bond", desc: "Drake Companion grows to Huge. You can now mount it. It gains a Fly Speed. Once per turn, when it hits a creature, you can make an extra weapon attack against the same target (no action required).", limited: false },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  ROGUE — missing 2024 + 2014
  // ═══════════════════════════════════════════════════════
  Rogue: {

    "Swashbuckler": [
      { level: 3, name: "Fancy Footwork", desc: "When you make a melee attack against a creature, that creature cannot make Opportunity Attacks against you for the rest of your turn regardless of your movement.", limited: false },
      { level: 3, name: "Rakish Audacity", desc: "Add Charisma modifier to your Initiative. You can also apply Sneak Attack to melee attacks even when no ally is adjacent to your target, as long as no other creature is adjacent to you.", limited: false },
      { level: 9, name: "Panache", desc: "As a Magic Action, make a Charisma (Persuasion) check opposed by Wisdom (Insight). On success: non-hostile creature is Charmed for 1 minute; hostile creature is Charmed for 1 minute and must use all attacks against you if possible (ends if you attack it or an ally does). Broken if another creature acts against the target.", limited: false },
      { level: 13, name: "Elegant Maneuver", desc: "As a Bonus Action, Dash or Disengage; then gain Advantage on your next Dexterity (Acrobatics) or Strength (Athletics) check made this turn.", limited: false },
      { level: 17, name: "Master Duelist", desc: "When you miss with an attack roll, reroll it with Advantage. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
    ],

    "Inquisitive (2014)": [
      { level: 3, name: "Ear for Deceit", desc: "When you make a Wisdom (Insight) check to detect a lie, treat a d20 roll of 7 or lower as an 8.", limited: false },
      { level: 3, name: "Eye for Detail", desc: "As a Bonus Action, make a Wisdom (Perception) check to spot a hidden creature or object, or an Intelligence (Investigation) check to uncover or decipher clues.", limited: false },
      { level: 3, name: "Insightful Fighting", desc: "As a Bonus Action, make a Wisdom (Insight) check against a creature's Charisma (Deception). On success, you can use Sneak Attack against it even without an ally adjacent, for the next 1 minute.", limited: false },
      { level: 9, name: "Steady Eye", desc: "Advantage on Perception and Investigation checks while you haven't moved this turn.", limited: false },
      { level: 13, name: "Unerring Eye", desc: "As a Magic Action, detect magical deceptions within 30 ft (illusions, shapechanges, polymorphs; you sense that an illusion or transmutation is present but don't automatically see through it). Usable Wisdom modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 17, name: "Eye for Weakness", desc: "While Insightful Fighting is active, your Sneak Attack deals an extra 3d6 damage against that target.", limited: false },
    ],

    "Mastermind (2014)": [
      { level: 3, name: "Master of Intrigue", desc: "Gain proficiency with Disguise Kit, Forgery Kit, and two gaming sets. Learn two languages. You can mimic the speech patterns of others after 1 minute of listening.", limited: false },
      { level: 3, name: "Master of Tactics", desc: "Use the Help action as a Bonus Action. When helping a creature with an attack, the ally can be up to 30 ft away (not adjacent).", limited: false },
      { level: 9, name: "Insightful Manipulator", desc: "If you spend 1 minute studying a creature outside of combat, learn any two of the following: Charisma, Intelligence, Wisdom scores; class levels (if any); or one of its class features/traits.", limited: false },
      { level: 13, name: "Misdirection", desc: "As a Bonus Action, choose an adjacent creature that can see and hear you; it becomes the target for all opportunity attacks and enemy attacks made against you until start of your next turn.", limited: false },
      { level: 17, name: "Soul of Deceit", desc: "Your thoughts can't be read by telepathy or other means unless you allow it. Lie detectors automatically read you as telling the truth. You can also make an opposed Charisma (Deception) check against a mind-reading creature — on a success, send a false thought.", limited: false },
    ],

    "Scout (2014)": [
      { level: 3, name: "Skirmisher", desc: "When a creature ends its turn within 5 ft of you, use your Reaction to move up to half your Speed (this doesn't provoke Opportunity Attacks).", limited: false },
      { level: 3, name: "Survivalist", desc: "Gain proficiency in Nature and Survival. Your Proficiency Bonus is doubled for ability checks using those skills.", limited: false },
      { level: 9, name: "Superior Mobility", desc: "Your Speed increases by 10 ft. Gain a Climb Speed and Swim Speed equal to your Speed.", limited: false },
      { level: 13, name: "Ambush Master", desc: "Advantage on Initiative rolls. Allies within 30 ft who can hear or see you also gain Advantage on Initiative if you aren't Incapacitated (or just the first ally to attack if not all do).", limited: false },
      { level: 17, name: "Sudden Strike", desc: "When you take the Attack action, make one additional attack as a Bonus Action. This extra attack can benefit from Sneak Attack even if another attack already did this turn, as long as both target different creatures.", limited: false },
    ],

    "Phantom (2014)": [
      { level: 3, name: "Whispers of the Dead", desc: "Whenever you finish a Short or Long Rest, choose one skill or tool proficiency from a creature that died recently. You gain that proficiency until you use this feature again.", limited: false },
      { level: 3, name: "Wails from the Grave", desc: "Immediately after dealing Sneak Attack damage, deal half that Sneak Attack damage (Necrotic) to another creature within 30 ft of the original target. Usable Proficiency Bonus times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 9, name: "Tokens of the Departed", desc: "As a Reaction when a creature within 30 ft dies, capture their soul token. You can have Proficiency Bonus tokens at once. Spend a token to: gain Advantage on a death saving throw or Constitution save, or ask the dead soul one question (Speak with Dead effect). Tokens vanish on a Long Rest.", limited: false },
      { level: 13, name: "Ghost Walk", desc: "As a Bonus Action, become incorporeal for 10 minutes: fly (hover) 10 ft, pass through objects (can't end turn inside one), Resistance to Bludgeoning/Piercing/Slashing. Once per Long Rest (or spend a Wails token to restore).", limited: true, recharge: "long rest" },
      { level: 17, name: "Death's Friend", desc: "Wails from the Grave now affects a second creature at no extra cost. Also gain a free soul token at the start of combat if you have none.", limited: false },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  SORCERER — missing 2024 + 2014
  // ═══════════════════════════════════════════════════════
  Sorcerer: {

    "Storm Sorcery": [
      { level: 3, name: "Storm Spells", desc: "Always prepared: Fog Cloud, Shocking Grasp, Thunderwave (level 3); Gust of Wind, Shatter (level 5); Call Lightning, Sleet Storm (level 7); Control Water, Ice Storm (level 9).", limited: false },
      { level: 3, name: "Tempestuous Magic", desc: "When you cast a Sorcerer spell of level 1 or higher, you can use a Bonus Action to fly up to 10 ft without provoking Opportunity Attacks.", limited: false },
      { level: 6, name: "Heart of the Storm", desc: "Resistance to Lightning and Thunder damage. When you cast a Sorcerer spell of level 1 or higher that deals Lightning or Thunder damage, deal Lightning or Thunder damage (your choice) equal to half your Sorcerer level to each creature within 10 ft.", limited: false },
      { level: 6, name: "Storm Guide", desc: "Stop rain around you in a 20-ft radius (or resume it) as a Bonus Action. When there is wind, change its direction in a 100-ft radius as a Bonus Action (lasts until end of your next turn).", limited: false },
      { level: 14, name: "Storm's Fury", desc: "As a Reaction when hit by a melee attack, deal Lightning damage equal to your Sorcerer level to the attacker, and they must make a Strength save or be pushed 20 ft away.", limited: false },
      { level: 18, name: "Wind Soul", desc: "Immunity to Lightning and Thunder damage. Gain a magical Fly Speed of 60 ft (hover). As a Magic Action, reduce fly speed to 30 ft for 1 hour and grant up to 3 creatures within 30 ft a Fly Speed of 30 ft for 1 hour.", limited: false },
    ],

    "Divine Soul (2014)": [
      { level: 3, name: "Divine Magic", desc: "Your origin includes divine power. You gain access to the Cleric spell list, and when you choose spells, you can choose from both Sorcerer and Cleric lists. Additionally, choose one affinity (Good, Evil, Law, Chaos, Neutrality) that grants one additional spell always prepared based on your alignment.", limited: false },
      { level: 3, name: "Favored by the Gods", desc: "When you fail a saving throw or miss an attack, add 2d4 to the result (potentially turning failure into success). Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 6, name: "Empowered Healing", desc: "Once per turn when you or a creature within 5 ft of you rolls dice to restore HP with a spell, reroll any number of those dice once (using Sorcery Points, 1 point per spell). Use the higher result for each rerolled die.", limited: true, recharge: "sorcery points" },
      { level: 14, name: "Otherworldly Wings", desc: "As a Bonus Action, manifest luminous wings — feathery (Good/Neutral origin) or bat-like (Evil/Chaos origin). Gain a Fly Speed of 30 ft. The wings last until you dismiss them (no action required).", limited: false },
      { level: 18, name: "Unearthly Recovery", desc: "When you drop below half your max HP, use a Bonus Action to regain HP equal to half your max HP. Once per Long Rest.", limited: true, recharge: "long rest" },
    ],

    "Shadow Magic (2014)": [
      { level: 3, name: "Eyes of the Dark", desc: "Learn the Darkness spell, which doesn't count against spells known. Cast Darkness without a spell slot using 1 Sorcery Point. You can also see normally in magical Darkness you create with this feature.", limited: true, recharge: "sorcery points" },
      { level: 3, name: "Strength of the Grave", desc: "When reduced to 0 HP by damage that isn't Radiant or a Critical Hit, make a Charisma save (DC = 5 + damage taken) to drop to 1 HP instead. Once per Long Rest.", limited: true, recharge: "long rest" },
      { level: 6, name: "Hound of Ill Omen", desc: "Spend 3 Sorcery Points as a Bonus Action to summon a Dire Wolf-stat hound to chase a creature within 30 ft. While it's alive (its HP = half your Sorcerer level), that creature has Disadvantage on saves against your spells. The hound can't be harmed by nonmagical sources and moves through objects as if they were difficult terrain.", limited: true, recharge: "sorcery points" },
      { level: 14, name: "Shadow Walk", desc: "When you are in dim light or darkness, teleport up to 120 ft to another location in dim light or darkness as a Bonus Action.", limited: false },
      { level: 18, name: "Umbral Form", desc: "Spend 6 Sorcery Points as a Bonus Action to transform into a shadowy form for 1 minute: Resistance to all damage except Force and Radiant; move through other creatures and objects (costs 5 ft extra per 5 ft).", limited: true, recharge: "sorcery points" },
    ],

    "Lunar Sorcery (2014)": [
      { level: 3, name: "Moon Fire", desc: "Know the Sacred Flame cantrip; it doesn't count against your cantrips known. When you cast it, you can target two creatures within 5 ft of each other instead of one.", limited: false },
      { level: 3, name: "Lunar Embodiment", desc: "Learn additional spells based on the lunar phase (Full, New, or Crescent Moon). At the end of each Long Rest, choose which phase is active, determining which phase spells are prepared.", limited: false },
      { level: 6, name: "Waxing and Waning", desc: "Spend 1 Sorcery Point to switch your lunar phase immediately. Gain Resistance to Radiant, Necrotic, or Psychic damage (based on Full, New, or Crescent phase respectively).", limited: true, recharge: "sorcery points" },
      { level: 14, name: "Lunar Boons", desc: "When you cast a spell from your Lunar Embodiment list, you can spend 1 Sorcery Point to reduce its cost by 1 Sorcery Point or recover 1 expended spell slot of the spell's level (max 3rd level slot recovery).", limited: true, recharge: "sorcery points" },
      { level: 18, name: "Full Moon Soul", desc: "While in Full Moon phase, add a d10 to all damage you deal with spells. While in New Moon phase, become invisible when you use Cunning Action (while not attacking or casting). While in Crescent Moon phase, once per turn deal an extra 1d10 Psychic damage on a spell attack.", limited: false },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  WARLOCK — missing 2024 + 2014
  // ═══════════════════════════════════════════════════════
  Warlock: {

    "The Undying": [
      { level: 3, name: "Undying Spells", desc: "Always prepared: False Life, Ray of Sickness (level 3); Blindness/Deafness, Silence (level 5); Feign Death, Speak with Dead (level 7); Aura of Life, Death Ward (level 9); Contagion, Legend Lore (level 11).", limited: false },
      { level: 3, name: "Among the Dead", desc: "Learn the Spare the Dying cantrip. Undead have Disadvantage on saves against your spells. If an Undead targets you directly with an attack or harmful spell, it must make a Wisdom save or divert the effect to another creature (not itself). Usable Charisma modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 6, name: "Defy Death", desc: "When you succeed on a death saving throw or stabilize a creature at 0 HP (via Spare the Dying), regain HP equal to 1d8 + Constitution modifier. Once per Long Rest.", limited: true, recharge: "long rest" },
      { level: 10, name: "Undying Nature", desc: "No longer need to breathe, eat, drink, or sleep (though can still benefit from a long rest). Age at one-tenth the normal rate and can't be magically aged.", limited: false },
      { level: 14, name: "Indestructible Life", desc: "At the start of each of your turns, regain 1d8 + Constitution modifier HP if at 1+ HP. Additionally, reattach severed limbs in 1 minute, and regrow them in 1d6 days.", limited: false },
    ],

    "The Fathomless (2014)": [
      { level: 3, name: "Fathomless Spells", desc: "Always prepared: Create or Destroy Water, Thunderwave (level 3); Gust of Wind, Silence (level 5); Lightning Bolt, Sleet Storm (level 7); Control Water, Summon Elemental (Water only) (level 9); Bigby's Hand, Cone of Cold (level 11).", limited: false },
      { level: 3, name: "Tentacle of the Deeps", desc: "As a Magic Action, summon a spectral tentacle at a point within 60 ft. It lasts 1 minute; as a Bonus Action, attack with it: reach 10 ft, 1d8 + Charisma modifier Cold damage, and target's Speed is reduced by 10 ft until start of your next turn. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 3, name: "Gift of the Sea", desc: "Gain a Swim Speed of 40 ft and the ability to breathe underwater.", limited: false },
      { level: 6, name: "Oceanic Soul", desc: "Resistance to Cold damage. Speak and understand Aquan. While underwater, creatures that also breathe water understand your speech and vice versa.", limited: false },
      { level: 6, name: "Guardian Coil", desc: "When your Tentacle of the Deeps is summoned and you or a creature within 10 ft of it takes damage, reduce that damage by 1d8 as a Reaction.", limited: false },
      { level: 10, name: "Grasping Tentacles", desc: "Evard's Black Tentacles is always prepared. Cast it without expending a spell slot and without Concentration (duration becomes 1 minute) once per Long Rest. When you cast it, gain Temp HP equal to your Warlock level.", limited: true, recharge: "long rest" },
      { level: 14, name: "Fathomless Plunge", desc: "As a Magic Action, teleport yourself and up to 5 willing creatures within 30 ft to a body of water you can see within 1 mile (or the nearest body of water if none visible). Once per Short or Long Rest.", limited: true, recharge: "short rest" },
    ],

    "The Genie (2014)": [
      { level: 3, name: "Genie's Vessel", desc: "Your patron gives you a magical vessel (ring, lamp, etc.) usable as a Spellcasting Focus. It holds a pocket dimension where you can rest (4 hours = Long Rest effect). The vessel has HP equal to your Proficiency Bonus + Warlock level; destroyed if lost, remake during Long Rest.", limited: false },
      { level: 3, name: "Genie Spells", desc: "Gain spells based on genie type: Dao (Earth, Bludgeoning spells), Djinni (Air, Thunder/Lightning), Efreeti (Fire), or Marid (Water, Cold). Always prepared.", limited: false },
      { level: 3, name: "Bottled Respite", desc: "As a Magic Action, enter your vessel for up to Proficiency Bonus hours (must take a Short or Long Rest afterward). From inside, you can hear the outside but can't see. Others can enter only if you allow. Once per Long Rest.", limited: true, recharge: "long rest" },
      { level: 6, name: "Elemental Gift", desc: "Gain Resistance matching your genie type (Bludgeoning/Thunder/Fire/Cold). As a Bonus Action, gain a Fly Speed of 30 ft (hover) for 10 minutes. Usable Proficiency Bonus times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 10, name: "Sanctuary Vessel", desc: "When you enter your vessel, choose up to 5 willing creatures. Creatures inside heal 3d6 HP when finishing a Short Rest, and finish a Long Rest after only 8 hours in the vessel. The vessel's interior is its own demiplane.", limited: false },
      { level: 14, name: "Limited Wish", desc: "Declare a wish to your patron, casting any spell of level 6 or lower without material components as a free action. Once per 1d4 Long Rests.", limited: true, recharge: "long rest" },
    ],

    "The Hexblade (2014)": [
      { level: 3, name: "Hexblade's Curse", desc: "As a Bonus Action, curse a creature within 30 ft for 1 minute: add Proficiency Bonus to damage against it, score Critical Hits on 19–20, and if it dies you regain HP equal to your Warlock level + Charisma modifier. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 3, name: "Hex Warrior", desc: "Gain proficiency with Medium armor, Shields, and Martial weapons. When you touch one weapon during a Long Rest, use Charisma instead of Strength or Dexterity for attacks and damage with it until your next Long Rest. Automatic if using a Pact of the Blade weapon.", limited: false },
      { level: 6, name: "Accursed Specter", desc: "When you kill a creature, capture its specter (if it's a humanoid). The specter has half the dead creature's HP, flies at 40 ft, and deals 3d6 Necrotic + Charisma modifier psychic damage. Lasts until end of your next Long Rest or when it drops to 0 HP. Once per Long Rest.", limited: true, recharge: "long rest" },
      { level: 10, name: "Armor of Hexes", desc: "When a creature Cursed by your Hexblade's Curse hits you with an attack, roll a d6: on a 4+, the attack misses.", limited: false },
      { level: 14, name: "Master of Hexes", desc: "When a cursed creature dies, move the Hexblade's Curse to a new creature within 30 ft you can see (no action required). The creature still gains you the HP recovery if this triggers.", limited: false },
    ],

    "The Undead (2014)": [
      { level: 3, name: "Undead Spells", desc: "Always prepared: Bane, False Life (level 3); Blindness/Deafness, Phantasmal Force (level 5); Phantom Steed, Speak with Dead (level 7); Death Ward, Greater Invisibility (level 9); Antilife Shell, Cloudkill (level 11).", limited: false },
      { level: 3, name: "Form of Dread", desc: "As a Bonus Action, assume a terrifying undead form for 1 minute: gain Temp HP equal to 1d10 + Warlock level; once per turn on a hit, force a Wisdom save (DC = Spell Save DC) or the target is Frightened until end of its next turn; Immunity to the Frightened condition. Usable Proficiency Bonus times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 6, name: "Grave Touched", desc: "You don't need to eat, drink, or breathe. When you score a Critical Hit, change one damage die of the attack to Necrotic. While in Form of Dread, roll one additional damage die for Necrotic damage spells/attacks.", limited: false },
      { level: 10, name: "Necrotic Husk", desc: "Resistance to Necrotic damage. When reduced to 0 HP, use a Reaction to drop to 1 HP instead (Undead Fortitude) and shed a burst dealing 2d10 + Warlock level Necrotic to nearby creatures (Con save for half). Once per Long Rest.", limited: true, recharge: "long rest" },
      { level: 14, name: "Spirit Projection", desc: "As a Magic Action, project your spirit from your body for 1 hour: fly 40 ft (hover), Resistance to Bludgeoning/Piercing/Slashing and Necrotic, Immunity to Frightened and Prone, spells you cast deal +1d8 Necrotic, and your body is Unconscious (0 HP) until you return. Once per Long Rest.", limited: true, recharge: "long rest" },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  WIZARD — missing 2024 + 2014
  // ═══════════════════════════════════════════════════════
  Wizard: {

    "School of Conjuration": [
      { level: 3, name: "Conjuration Savant", desc: "Add two Conjuration school Wizard spells (level 2 or lower) to your spellbook for free. Whenever you gain access to a new spell slot level, add one Conjuration spell of a castable level for free.", limited: false },
      { level: 3, name: "Minor Conjuration", desc: "As a Magic Action, conjure a nonliving object no larger than 3 ft on a side and weighing no more than 10 lbs. It appears in an empty space within 10 ft and lasts 1 hour or until you use this feature again. It can't deal damage or be used as a component.", limited: false },
      { level: 6, name: "Benign Transposition", desc: "Teleport up to 30 ft to an unoccupied space you can see. Or swap places with a willing Small or Medium creature within 30 ft. Recharges on Long Rest, or when you cast a Conjuration spell of level 1 or higher.", limited: true, recharge: "long rest" },
      { level: 10, name: "Focused Conjuration", desc: "While you Concentrate on a Conjuration spell, your Concentration on that spell cannot be broken by taking damage.", limited: false },
      { level: 14, name: "Durable Summons", desc: "Any creature summoned or created by your Conjuration spell has 30 Temporary HP.", limited: false },
    ],

    "School of Enchantment": [
      { level: 3, name: "Enchantment Savant", desc: "Add two Enchantment school Wizard spells (level 2 or lower) to your spellbook for free. Whenever you gain access to a new spell slot level, add one Enchantment spell of a castable level for free.", limited: false },
      { level: 3, name: "Hypnotic Gaze", desc: "As a Magic Action, choose a creature within 5 ft; it makes a Wisdom save (DC = Spell Save DC) or is Charmed and Incapacitated (Speed 0) until start of your next turn. Maintain each subsequent turn with a Magic Action. Usable once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 6, name: "Instinctive Charm", desc: "As a Reaction when a creature within 30 ft makes an attack roll against you, redirect the attack to a different creature within 30 ft (attacker's choice of nearest, but no self-targeting). Attacker makes a Wisdom save; on success they're immune for 24 hours. Once per Long Rest.", limited: true, recharge: "long rest" },
      { level: 10, name: "Split Enchantment", desc: "When casting an Enchantment spell of level 1 or higher targeting only one creature, target a second creature within range with the same spell (no extra slot cost).", limited: false },
      { level: 14, name: "Alter Memories", desc: "When you cast an Enchantment spell that Charms a creature, have the target not remember being Charmed (Wisdom save to retain the memory). Additionally, extend the Charmed duration by a number of hours equal to your Intelligence modifier.", limited: false },
    ],

    "School of Necromancy": [
      { level: 3, name: "Necromancy Savant", desc: "Add two Necromancy school Wizard spells (level 2 or lower) to your spellbook for free. Whenever you gain access to a new spell slot level, add one Necromancy spell of a castable level for free.", limited: false },
      { level: 3, name: "Grim Harvest", desc: "Once per turn when you kill one or more creatures with a spell, regain HP equal to twice the spell's level (or three times for Necromancy spells). Doesn't apply to Undead or Constructs.", limited: false },
      { level: 6, name: "Undead Thralls", desc: "Animate Dead creates one additional undead. Undead you create with Necromancy spells gain: HP maximum increased by your Wizard level, and add your Proficiency Bonus to attack rolls.", limited: false },
      { level: 10, name: "Inured to Undeath", desc: "Resistance to Necrotic damage. Your HP maximum cannot be reduced.", limited: false },
      { level: 14, name: "Command Undead", desc: "As a Magic Action, choose an Undead creature within 60 ft (Charisma save to resist). On failure, the creature falls under your command for 24 hours, obeying your verbal commands. Undead with Intelligence 8+ repeat the save every 24 hours. Once per Long Rest.", limited: true, recharge: "long rest" },
    ],

    "School of Transmutation": [
      { level: 3, name: "Transmutation Savant", desc: "Add two Transmutation school Wizard spells (level 2 or lower) to your spellbook for free. Whenever you gain access to a new spell slot level, add one Transmutation spell of a castable level for free.", limited: false },
      { level: 3, name: "Minor Alchemy", desc: "Spend 10 minutes focusing on an object made entirely of wood, stone, iron/steel, copper, or silver to transform it into a different one of those materials. Reverts when you end Concentration or are more than 120 ft from it.", limited: false },
      { level: 6, name: "Transmuter's Stone", desc: "Spend 8 hours to craft a stone granting its bearer (you or one other creature) one of: Darkvision 60 ft, 10 ft extra speed, proficiency in Constitution saves, or Resistance to Acid/Cold/Fire/Lightning/Thunder (your choice daily). Destroy the old stone to make a new one.", limited: false },
      { level: 10, name: "Shapechanger", desc: "Add Polymorph to your spellbook for free. Cast it without expending a spell slot to transform only yourself — once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 14, name: "Master Transmuter", desc: "As a Magic Action, consume the Transmuter's Stone to produce one effect: transmute one non-magical object (up to 5-foot cube) into any other nonmagical substance; remove all curses/diseases/poisons from a touched creature; cast Raise Dead without a spell slot; or restore youth and vitality to a touched creature (reducing age by 3d10 years, min 13).", limited: false },
    ],

    "Bladesinging": [
      { level: 3, name: "Training in War and Song", desc: "Gain proficiency in Light armor, one Simple or Martial one-handed weapon, and Performance. Cannot be wearing medium/heavy armor or a shield when activating Bladesong.", limited: false },
      { level: 3, name: "Bladesong", desc: "As a Bonus Action (Proficiency Bonus times per Long Rest), activate a magical dance for 1 minute: +Intelligence modifier to AC, walking Speed +10 ft, Advantage on Acrobatics checks, +Intelligence modifier to Concentration checks.", limited: true, recharge: "long rest" },
      { level: 6, name: "Extra Attack", desc: "You can attack twice instead of once when you take the Attack action. You can replace one of the attacks with a cantrip.", limited: false },
      { level: 10, name: "Song of Defense", desc: "While Bladesong is active, use a Reaction when taking damage to expend a spell slot and reduce damage by 5× the slot's level.", limited: false },
      { level: 14, name: "Song of Victory", desc: "While Bladesong is active, add Intelligence modifier to melee weapon damage rolls.", limited: false },
    ],

    "Order of Scribes": [
      { level: 3, name: "Wizardly Quill", desc: "Summon a magic quill as a Bonus Action. It writes twice as fast as normal, doesn't require ink, and can magically copy spells into your spellbook in 2 minutes per spell level (half normal time and no cost). Only you can use this quill.", limited: false },
      { level: 3, name: "Awakened Spellbook", desc: "Your spellbook has a spark of consciousness. Use it as a Spellcasting Focus. When you cast a prepared Wizard spell using a slot, change its damage type to match another damage type in the spellbook. Also ritualize any Wizard spell in your spellbook (even if not normally a ritual).", limited: false },
      { level: 6, name: "Manifest Mind", desc: "As a Magic Action, project the mind of your spellbook to a spectral form within 300 ft for Proficiency Bonus minutes. It can fly 10 ft per turn. You can see through it, cast Wizard spells as if you were in its space, and have Advantage on saves to maintain Concentration. Usable Proficiency Bonus times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 10, name: "Master Scrivener", desc: "Once per Long Rest during a Short or Long Rest, create a temporary scroll from your spellbook containing a spell of level 1 or 2. Casting from it requires the spell's normal components; spell save DC and attack bonus use your stats. Vanishes at next Long Rest.", limited: true, recharge: "long rest" },
      { level: 14, name: "One with the Word", desc: "While your manifested mind is within 300 ft, protect yourself: as a Reaction when you take damage that would reduce you to 0 HP, erase a spell from your spellbook to drop to 1 HP instead (the erased spell can't be relearned short of recopying from another source). Once per Long Rest.", limited: true, recharge: "long rest" },
    ],

    "War Magic (2014)": [
      { level: 3, name: "Arcane Deflection", desc: "As a Reaction when hit by an attack or failing a save, gain +2 to AC or +4 to the save. After using this, only cast cantrips on your next turn.", limited: false },
      { level: 3, name: "Tactical Wit", desc: "Add Intelligence modifier to Initiative rolls.", limited: false },
      { level: 6, name: "Power Surge", desc: "Store power surges from Counterspell and Dispel Magic successes (max Intelligence modifier surges stored). When dealing damage with a Wizard cantrip, spend a surge to deal +Intelligence modifier extra damage of the cantrip's type.", limited: false },
      { level: 10, name: "Durable Magic", desc: "While Concentrating on a Wizard spell, gain +2 to AC and all saving throws.", limited: false },
      { level: 14, name: "Deflecting Shroud", desc: "When you use Arcane Deflection, each creature of your choice within 60 ft takes Force damage equal to half your Wizard level.", limited: false },
    ],

    "Chronurgy Magic (2014)": [
      { level: 3, name: "Chronal Shift", desc: "After a D20 Test is made by you or a creature within 30 ft, reroll the die and the target uses the new roll instead. Usable twice per Long Rest.", limited: true, recharge: "long rest", usesFormula: "2" },
      { level: 3, name: "Temporal Awareness", desc: "Add Intelligence modifier to Initiative rolls.", limited: false },
      { level: 6, name: "Momentary Stasis", desc: "As a Magic Action, force a Large-or-smaller creature within 60 ft to make a Constitution save (DC = Spell Save DC). On failure, it is Incapacitated and its Speed becomes 0 until the start of your next turn. Once per Long Rest (or spend a spell slot of level 1+ to reuse).", limited: true, recharge: "long rest" },
      { level: 10, name: "Arcane Abeyance", desc: "When casting a spell of level 4 or lower using a slot, condense it into a bead the size of a marble (lasts 24 hours). A creature holding it can use a Magic Action to release the spell (using your stats). Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 14, name: "Convergent Future", desc: "As a Reaction, choose the result of a D20 Test made by you or a creature within 60 ft that you can see rolling. Set the number to any number (the outcome doesn't require rolling). Gain one level of Exhaustion per use; remove by finishing a Long Rest.", limited: false },
    ],

    "Graviturgy Magic (2014)": [
      { level: 3, name: "Adjust Density", desc: "As a Magic Action, choose a creature within 30 ft: double its weight (Speed halved, Disadvantage on Dex saves, Advantage on Str checks/saves) or halve its weight (Speed +10 ft, Disadvantage on Str saves, Advantage on Dex checks/saves) for 1 minute. Once per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 6, name: "Gravity Well", desc: "When you cast a spell that originates from a point or area, immediately move each affected creature 5 ft toward the point of origin after the spell fires.", limited: false },
      { level: 10, name: "Violent Attraction", desc: "As a Reaction, add 1d10 to one damage roll of a weapon attack or falling damage within 60 ft. Usable Intelligence modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 14, name: "Event Horizon", desc: "As a Magic Action, emit a 30 ft gravitational warp for 1 minute (Concentration). Creatures moving within range must spend 2 ft of movement per ft moved. Creatures that start their turn in the field or enter it make a Strength save or take 2d10 Force and have Speed 0 until start of their next turn. Once per Long Rest (or spend a level 3+ slot to reuse).", limited: true, recharge: "long rest" },
    ],
  },
}
