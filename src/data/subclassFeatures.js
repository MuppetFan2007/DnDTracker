// D&D 2024 Subclass Features by Class and Subclass
// Source: http://dnd2024.wikidot.com/

export const SUBCLASS_FEATURES = {
  Barbarian: {
    "Path of the Berserker": [
      { level: 3, name: "Frenzy", desc: "If you use Reckless Attack while your Rage is active, you deal extra damage to the first target you hit on your turn with a Strength-based attack. Roll a number of d6s equal to your Rage Damage bonus and add them together; the damage type matches the weapon or Unarmed Strike used.", limited: false },
      { level: 6, name: "Mindless Rage", desc: "You have Immunity to the Charmed and Frightened conditions while your Rage is active. If you are Charmed or Frightened when you enter your Rage, that condition ends on you.", limited: false },
      { level: 10, name: "Retaliation", desc: "When you take damage from a creature within 5 feet of you, you can take a Reaction to make one melee attack against that creature using a weapon or Unarmed Strike.", limited: false },
      { level: 14, name: "Intimidating Presence", desc: "As a Bonus Action, each creature of your choice in a 30-foot Emanation must make a Wisdom saving throw (DC 8 + Strength modifier + Proficiency Bonus) or be Frightened for 1 minute. The target repeats the save at the end of each of its turns. Recharges on Long Rest or by expending a Rage use.", limited: true, recharge: "long rest" },
    ],
    "Path of the Wild Heart": [
      { level: 3, name: "Animal Speaker", desc: "You can cast Beast Sense and Speak with Animals, but only as Rituals. Wisdom is your spellcasting ability for them.", limited: false },
      { level: 3, name: "Rage of the Wilds", desc: "When you activate your Rage, choose Bear (Resistance to most damage types), Eagle (Disengage and Dash as part of activating Rage, and as a Bonus Action while raging), or Wolf (allies have Advantage on attacks against enemies within 5 ft of you while you rage).", limited: false },
      { level: 6, name: "Aspect of the Wilds", desc: "Choose one option that persists until changed on a Long Rest: Owl (Darkvision 60 ft or +60 ft), Panther (Climb Speed equal to Speed), or Salmon (Swim Speed equal to Speed).", limited: false },
      { level: 10, name: "Nature Speaker", desc: "You can cast Commune with Nature but only as a Ritual. Wisdom is your spellcasting ability for it.", limited: false },
      { level: 14, name: "Power of the Wilds", desc: "When you activate your Rage, choose Falcon (Fly Speed equal to Speed if unarmored), Lion (enemies within 5 ft have Disadvantage on attacks against targets other than you), or Ram (hit a Large or smaller creature with a melee attack to knock it Prone).", limited: false },
    ],
    "Path of the World Tree": [
      { level: 3, name: "Vitality of the Tree", desc: "When you activate Rage, you gain Temporary Hit Points equal to your Barbarian level (Vitality Surge). At the start of each turn while raging, you can give another creature within 10 ft Temporary Hit Points equal to rolls of d6s equal to your Rage Damage bonus (Life-Giving Force); these vanish when Rage ends.", limited: false },
      { level: 6, name: "Branches of the Tree", desc: "As a Reaction when a creature starts its turn within 30 ft while you rage, force a Strength save (DC 8 + Strength modifier + Proficiency Bonus) or be teleported to an unoccupied space within 5 ft of you, and you can reduce its Speed to 0 until end of turn.", limited: false },
      { level: 10, name: "Battering Roots", desc: "Your reach is 10 ft greater with Heavy or Versatile melee weapons on your turn. When you hit with such a weapon, you can activate the Push or Topple mastery property in addition to another mastery property you are using.", limited: false },
      { level: 14, name: "Travel along the Tree", desc: "When you activate Rage and as a Bonus Action while raging, teleport up to 60 ft to a space you can see. Once per Rage, extend the range to 150 ft and bring up to six willing creatures within 10 ft, each teleporting to a space within 10 ft of your destination.", limited: false },
    ],
    "Path of the Zealot": [
      { level: 3, name: "Divine Fury", desc: "While raging, the first creature you hit each turn with a weapon or Unarmed Strike takes extra Necrotic or Radiant damage (your choice) equal to 1d6 plus half your Barbarian level.", limited: false },
      { level: 3, name: "Warrior of the Gods", desc: "You have a pool of four d12s. As a Bonus Action, expend and roll any number of dice to regain that many Hit Points. The pool regains all dice on a Long Rest; the maximum increases at levels 6 (5), 12 (6), and 17 (7).", limited: true, recharge: "long rest" },
      { level: 6, name: "Fanatical Focus", desc: "Once per active Rage, if you fail a saving throw you can reroll it with a bonus equal to your Rage Damage bonus and must use the new roll.", limited: true, recharge: "per rage" },
      { level: 10, name: "Zealous Presence", desc: "As a Bonus Action, up to ten creatures of your choice within 60 ft gain Advantage on attack rolls and saving throws until the start of your next turn. Recharges on Long Rest or by expending a Rage use.", limited: true, recharge: "long rest" },
      { level: 14, name: "Rage of the Gods", desc: "When you activate Rage, assume a divine warrior form for 1 minute or until 0 HP (once per Long Rest). You gain a Fly Speed equal to your Speed, Resistance to Necrotic/Psychic/Radiant damage, and can expend a Rage use as a Reaction to set a creature that would drop to 0 HP within 30 ft to your Barbarian level in HP instead.", limited: true, recharge: "long rest" },
    ],
  },

  Bard: {
    "College of Dance": [
      { level: 3, name: "Dazzling Footwork", desc: "While unarmored and without a Shield: Advantage on Charisma (Performance) checks involving dance; AC equals 10 + Dex + Cha modifier; make one Unarmed Strike when expending Bardic Inspiration; deal Bludgeoning damage on Unarmed Strikes equal to Bardic Inspiration die roll + Dex modifier (using Dex for attack rolls).", limited: false },
      { level: 6, name: "Inspiring Movement", desc: "As a Reaction when an enemy ends its turn within 5 ft of you, expend one Bardic Inspiration use to move up to half your Speed; one ally within 30 ft can also move up to half their Speed as a Reaction. None of this movement provokes Opportunity Attacks.", limited: true, recharge: "bardic inspiration" },
      { level: 6, name: "Tandem Footwork", desc: "When you roll Initiative without the Incapacitated condition, you can expend one Bardic Inspiration use to roll the die; you and each ally within 30 ft who can see or hear you gain a bonus to Initiative equal to the number rolled.", limited: true, recharge: "bardic inspiration" },
      { level: 14, name: "Leading Evasion", desc: "When you succeed on a Dexterity saving throw to take half damage you take none; on a failure, you take half. You can share this benefit with creatures within 5 ft making the same save. Requires you not to be Incapacitated.", limited: false },
    ],
    "College of Glamour": [
      { level: 3, name: "Beguiling Magic", desc: "Charm Person and Mirror Image are always prepared. After casting an Enchantment or Illusion spell with a spell slot, force a creature within 60 ft to make a Wisdom save or be Charmed or Frightened for 1 minute. Recharges on Long Rest or by expending one Bardic Inspiration use.", limited: true, recharge: "long rest" },
      { level: 3, name: "Mantle of Inspiration", desc: "As a Bonus Action, expend one Bardic Inspiration use and roll the die; choose up to Charisma modifier (min 1) creatures within 60 ft. Each gains twice the rolled number as Temporary Hit Points and can use a Reaction to move up to their Speed without provoking Opportunity Attacks.", limited: true, recharge: "bardic inspiration" },
      { level: 6, name: "Mantle of Majesty", desc: "Command is always prepared. As a Bonus Action, cast Command without a spell slot and take on an unearthly appearance for 1 minute (Concentration). During this time, cast Command as a Bonus Action without a slot; creatures Charmed by you auto-fail saves against it. Recharges on Long Rest or by expending a level 3+ spell slot.", limited: true, recharge: "long rest" },
      { level: 14, name: "Unbreakable Majesty", desc: "As a Bonus Action, assume a magically majestic presence for 1 minute or until Incapacitated. The first time each turn an attacker hits you, they must succeed on a Charisma save against your spell save DC or the attack misses. Recharges on Short or Long Rest.", limited: true, recharge: "short rest" },
    ],
    "College of Lore": [
      { level: 3, name: "Bonus Proficiencies", desc: "You gain proficiency with three skills of your choice.", limited: false },
      { level: 3, name: "Cutting Words", desc: "As a Reaction when a creature within 60 ft succeeds on an ability check, attack roll, or damage roll, expend one Bardic Inspiration use and roll the die; subtract the result from the creature's roll, potentially turning a success into a failure.", limited: true, recharge: "bardic inspiration" },
      { level: 6, name: "Magical Discoveries", desc: "Learn two spells from the Cleric, Druid, or Wizard spell list of a level for which you have slots. These spells are always prepared; you can replace one each Bard level.", limited: false },
      { level: 14, name: "Peerless Skill", desc: "When you fail an ability check or attack roll, expend one Bardic Inspiration use; roll the die and add it to the d20, potentially turning failure into success. If you still fail, the Bardic Inspiration is not expended.", limited: true, recharge: "bardic inspiration" },
    ],
    "College of Valor": [
      { level: 3, name: "Combat Inspiration", desc: "Creatures with a Bardic Inspiration die from you can use it for Defense (add rolled number to AC as a Reaction when hit) or Offense (add rolled number to an attack's damage immediately after hitting).", limited: false },
      { level: 3, name: "Martial Training", desc: "You gain proficiency with Martial weapons, Medium armor, and Shields. You can use a Simple or Martial weapon as a Spellcasting Focus for Bard spells.", limited: false },
      { level: 6, name: "Extra Attack", desc: "You can attack twice instead of once when taking the Attack action. You can replace one attack with casting a cantrip that has an action casting time.", limited: false },
      { level: 14, name: "Battle Magic", desc: "After you cast a spell with a casting time of an action, you can make one weapon attack as a Bonus Action.", limited: false },
    ],
  },

  Cleric: {
    "Life Domain": [
      { level: 3, name: "Life Domain Spells", desc: "Always prepared: Aid, Bless, Cure Wounds, Lesser Restoration (level 3); Mass Healing Word, Revivify (level 5); Aura of Life, Death Ward (level 7); Greater Restoration, Mass Cure Wounds (level 9).", limited: false },
      { level: 3, name: "Disciple of Life", desc: "When a spell you cast with a spell slot restores Hit Points, the creature regains additional HP equal to 2 plus the spell slot's level.", limited: false },
      { level: 3, name: "Preserve Life", desc: "As a Magic action, expend one Channel Divinity use to restore HP equal to five times your Cleric level among Bloodied creatures within 30 ft. Cannot restore any creature above half their HP maximum.", limited: true, recharge: "channel divinity" },
      { level: 6, name: "Blessed Healer", desc: "When you cast a spell with a slot that restores HP to others, you also regain HP equal to 2 plus the spell slot's level.", limited: false },
      { level: 17, name: "Supreme Healing", desc: "When you would roll dice to restore HP with a spell or Channel Divinity, use the highest possible number for each die instead of rolling.", limited: false },
    ],
    "Light Domain": [
      { level: 3, name: "Light Domain Spells", desc: "Always prepared: Burning Hands, Faerie Fire, Scorching Ray, See Invisibility (level 3); Daylight, Fireball (level 5); Arcane Eye, Wall of Fire (level 7); Flame Strike, Scrying (level 9).", limited: false },
      { level: 3, name: "Radiance of the Dawn", desc: "As a Magic action, expend one Channel Divinity use to emit a flash in a 30-ft Emanation, dispelling magical Darkness and dealing 2d10 + Cleric level Radiant damage (Constitution save for half) to chosen creatures.", limited: true, recharge: "channel divinity" },
      { level: 3, name: "Warding Flare", desc: "As a Reaction when a creature within 30 ft makes an attack roll, impose Disadvantage on the roll. Usable Wisdom modifier times (min 1) per Long Rest.", limited: true, recharge: "long rest" },
      { level: 6, name: "Improved Warding Flare", desc: "Warding Flare now recharges on Short or Long Rest. When you use it, the target of the triggering attack gains Temporary Hit Points equal to 2d6 + your Wisdom modifier.", limited: true, recharge: "short rest" },
      { level: 17, name: "Corona of Light", desc: "As a Magic action, emit sunlight (Bright 60 ft, Dim 30 ft) for 1 minute. Enemies in the Bright Light have Disadvantage on saves against your Radiance of the Dawn and Fire or Radiant damage spells. Usable Wisdom modifier times per Long Rest.", limited: true, recharge: "long rest" },
    ],
    "Trickery Domain": [
      { level: 3, name: "Trickery Domain Spells", desc: "Always prepared: Charm Person, Disguise Self, Invisibility, Pass without Trace (level 3); Hypnotic Pattern, Nondetection (level 5); Confusion, Dimension Door (level 7); Dominate Person, Modify Memory (level 9).", limited: false },
      { level: 3, name: "Blessing of the Trickster", desc: "As a Magic action, grant yourself or a willing creature within 30 ft Advantage on Dexterity (Stealth) checks until you finish a Long Rest or use this feature again.", limited: false },
      { level: 3, name: "Invoke Duplicity", desc: "As a Bonus Action, expend one Channel Divinity use to create an intangible illusion of yourself in an unoccupied space within 30 ft for 1 minute. Cast spells from its space, gain Advantage on attacks against creatures within 5 ft of it, and move it 30 ft as a Bonus Action.", limited: true, recharge: "channel divinity" },
      { level: 6, name: "Trickster's Transposition", desc: "Whenever you take the Bonus Action to create or move your Invoke Duplicity illusion, you can teleport to swap places with the illusion.", limited: false },
      { level: 17, name: "Improved Duplicity", desc: "You and allies have Advantage on attacks against creatures within 5 ft of the illusion (Shared Distraction). When the illusion ends, you or a creature within 5 ft regains HP equal to your Cleric level (Healing Illusion).", limited: false },
    ],
    "War Domain": [
      { level: 3, name: "War Domain Spells", desc: "Always prepared: Guiding Bolt, Magic Weapon, Shield of Faith, Spiritual Weapon (level 3); Crusader's Mantle, Spirit Guardians (level 5); Fire Shield, Freedom of Movement (level 7); Hold Monster, Steel Wind Strike (level 9).", limited: false },
      { level: 3, name: "Guided Strike", desc: "When you or a creature within 30 ft misses with an attack, expend one Channel Divinity use to give that roll a +10 bonus, potentially causing a hit. Using this for another creature's attack requires your Reaction.", limited: true, recharge: "channel divinity" },
      { level: 3, name: "War Priest", desc: "As a Bonus Action, make one attack with a weapon or Unarmed Strike. Usable Wisdom modifier times (min 1) per Short or Long Rest.", limited: true, recharge: "short rest" },
      { level: 6, name: "War God's Blessing", desc: "Expend a Channel Divinity use to cast Shield of Faith or Spiritual Weapon without a spell slot. The spell does not require Concentration and lasts 1 minute (ends early if recast, Incapacitated, or dead).", limited: true, recharge: "channel divinity" },
      { level: 17, name: "Avatar of Battle", desc: "You gain Resistance to Bludgeoning, Piercing, and Slashing damage.", limited: false },
    ],
  },

  Druid: {
    "Circle of the Land": [
      { level: 3, name: "Circle of the Land Spells", desc: "After each Long Rest, choose Arid, Polar, Temperate, or Tropical land. You always have the corresponding set of spells prepared (unique spell lists for each terrain type at levels 3, 5, 7, and 9).", limited: false },
      { level: 3, name: "Land's Aid", desc: "As a Magic action, expend one Wild Shape use; choose a point within 60 ft. In a 10-ft Sphere, creatures you choose make a Constitution save or take 2d6 Necrotic damage (half on success), and one creature of your choice regains 2d6 HP. Damage/healing increases to 3d6 at level 10 and 4d6 at level 14.", limited: true, recharge: "wild shape" },
      { level: 6, name: "Natural Recovery", desc: "Once per Long Rest, cast one of your Circle Spells (level 1+) without a spell slot. Also, after a Short Rest, recover expended spell slots with combined level up to half your Druid level (round up), none above level 6.", limited: true, recharge: "long rest" },
      { level: 10, name: "Nature's Ward", desc: "You are immune to the Poisoned condition and have Resistance to a damage type based on your land choice: Arid=Fire, Polar=Cold, Temperate=Lightning, Tropical=Poison.", limited: false },
      { level: 14, name: "Nature's Sanctuary", desc: "As a Magic action, expend one Wild Shape use to create a 15-ft Cube of spectral trees within 120 ft that lasts 1 minute. You and allies have Half Cover inside; allies gain your Nature's Ward Resistance. Move the cube 60 ft as a Bonus Action.", limited: true, recharge: "wild shape" },
    ],
    "Circle of the Moon": [
      { level: 3, name: "Circle Forms", desc: "Wild Shape forms can have a Challenge Rating up to your Druid level ÷ 3 (round down). Your AC equals 13 + Wisdom modifier if higher than the Beast's AC, and you gain Temporary Hit Points equal to three times your Druid level.", limited: false },
      { level: 3, name: "Circle of the Moon Spells", desc: "Always prepared: Cure Wounds, Moonbeam, Starry Wisp (level 3); Conjure Animals (level 5); Fount of Moonlight (level 7); Mass Cure Wounds (level 9). These can be cast while in Wild Shape.", limited: false },
      { level: 6, name: "Improved Circle Forms", desc: "In Wild Shape: each attack can deal its normal type or Radiant damage (Lunar Radiance); add your Wisdom modifier to Constitution saving throws (Increased Toughness).", limited: false },
      { level: 10, name: "Moonlight Step", desc: "As a Bonus Action, teleport up to 30 ft to an unoccupied space you can see and have Advantage on your next attack roll before end of turn. Usable Wisdom modifier times per Long Rest; restore uses by expending level 2+ spell slots.", limited: true, recharge: "long rest" },
      { level: 14, name: "Lunar Form", desc: "Once per turn, deal an extra 2d10 Radiant damage with a Wild Shape attack (Improved Lunar Radiance). When you use Moonlight Step, you can also teleport one willing creature within 10 ft to within 10 ft of your destination (Shared Moonlight).", limited: false },
    ],
    "Circle of the Sea": [
      { level: 3, name: "Circle of the Sea Spells", desc: "Always prepared: Fog Cloud, Gust of Wind, Ray of Frost, Thunderwave (level 3); Lightning Bolt, Water Breathing (level 5); Control Water, Ice Storm (level 7); Conjure Elemental, Hold Monster (level 9).", limited: false },
      { level: 3, name: "Wrath of the Sea", desc: "As a Bonus Action, expend one Wild Shape use to create a 5-ft Emanation of ocean spray for 10 minutes. As a Bonus Action, force a creature in the Emanation to make a Constitution save or take Cold damage (Wisdom modifier d6s) and be pushed 15 ft if Large or smaller.", limited: true, recharge: "wild shape" },
      { level: 6, name: "Aquatic Affinity", desc: "The Wrath of the Sea Emanation grows to 10 feet. You also gain a Swim Speed equal to your Speed.", limited: false },
      { level: 10, name: "Stormborn", desc: "While Wrath of the Sea is active, you gain a Fly Speed equal to your Speed and Resistance to Cold, Lightning, and Thunder damage.", limited: false },
      { level: 14, name: "Oceanic Gift", desc: "Manifest Wrath of the Sea around a willing creature within 60 ft instead of yourself; that creature gains all benefits using your spell save DC and Wisdom modifier. Expend two Wild Shape uses to manifest it around both of you simultaneously.", limited: false },
    ],
    "Circle of Stars": [
      { level: 3, name: "Star Map", desc: "Create a star chart Spellcasting Focus. While holding it, Guidance and Guiding Bolt are always prepared; cast Guiding Bolt without a spell slot Wisdom modifier times per Long Rest.", limited: false },
      { level: 3, name: "Starry Form", desc: "As a Bonus Action, expend one Wild Shape use to take a starry form for 10 minutes. Choose Archer (bonus Radiant ranged attack as Bonus Action, 1d8 + Wis), Chalice (heal 1d8 + Wis when casting healing spells with slots), or Dragon (treat d20 rolls of 9 or lower as 10 for Intelligence/Wisdom checks and Concentration saves).", limited: true, recharge: "wild shape" },
      { level: 6, name: "Cosmic Omen", desc: "After a Long Rest, roll a die. Until the next Long Rest, use a Reaction when a creature within 30 ft makes a D20 Test: add 1d6 (even roll/Weal) or subtract 1d6 (odd roll/Woe). Usable Wisdom modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 10, name: "Twinkling Constellations", desc: "Starry Form's Archer and Chalice dice improve to 2d8. While Dragon is active, gain a Fly Speed of 20 ft and can hover. At the start of each turn in Starry Form, you can change which constellation is active.", limited: false },
      { level: 14, name: "Full of Stars", desc: "While in Starry Form, you become partially incorporeal and gain Resistance to Bludgeoning, Piercing, and Slashing damage.", limited: false },
    ],
  },

  Fighter: {
    "Battle Master": [
      { level: 3, name: "Combat Superiority", desc: "Learn 3 maneuvers (more at levels 7, 10, 15) fueled by Superiority Dice (d8s; 4 dice, gaining more at levels 7 and 15). Regain all Superiority Dice on Short or Long Rest. Maneuver save DC = 8 + Str or Dex + Proficiency Bonus.", limited: true, recharge: "short rest" },
      { level: 3, name: "Student of War", desc: "Gain proficiency with one type of Artisan's Tools and one skill of your choice from the Fighter skill list.", limited: false },
      { level: 7, name: "Know Your Enemy", desc: "As a Bonus Action, discern whether a creature within 30 ft has Immunities, Resistances, or Vulnerabilities and what they are. Recharges on Long Rest or by expending one Superiority Die.", limited: true, recharge: "long rest" },
      { level: 10, name: "Improved Combat Superiority", desc: "Your Superiority Die size increases to d10.", limited: false },
      { level: 15, name: "Relentless", desc: "Once per turn when you use a maneuver, you can roll 1d8 and use that number instead of expending a Superiority Die.", limited: false },
      { level: 18, name: "Ultimate Combat Superiority", desc: "Your Superiority Die size increases to d12.", limited: false },
    ],
    "Champion": [
      { level: 3, name: "Improved Critical", desc: "Your attack rolls with weapons and Unarmed Strikes score a Critical Hit on a roll of 19 or 20.", limited: false },
      { level: 3, name: "Remarkable Athlete", desc: "You have Advantage on Initiative rolls and Strength (Athletics) checks. Immediately after scoring a Critical Hit, you can move up to half your Speed without provoking Opportunity Attacks.", limited: false },
      { level: 7, name: "Additional Fighting Style", desc: "You gain another Fighting Style feat of your choice.", limited: false },
      { level: 10, name: "Heroic Warrior", desc: "During combat, you can give yourself Heroic Inspiration whenever you start your turn without it.", limited: false },
      { level: 15, name: "Superior Critical", desc: "Your attack rolls with weapons and Unarmed Strikes now score a Critical Hit on a roll of 18–20.", limited: false },
      { level: 18, name: "Survivor", desc: "Advantage on Death Saving Throws; rolling 18–20 counts as a 20. At the start of each turn, regain HP equal to 5 + Constitution modifier if Bloodied and at 1+ HP (Heroic Rally).", limited: false },
    ],
    "Eldritch Knight": [
      { level: 3, name: "Spellcasting", desc: "Cast Wizard spells using Intelligence. Begin with 2 cantrips and 3 level 1 spells; gain more as you level. Regain all spell slots on Long Rest. Use an Arcane Focus as a Spellcasting Focus.", limited: true, recharge: "long rest" },
      { level: 3, name: "War Bond", desc: "Perform a 1-hour ritual to bond with one weapon (up to two total). You can't be disarmed of a bonded weapon unless Incapacitated, and can summon it to your hand as a Bonus Action if on the same plane.", limited: false },
      { level: 7, name: "War Magic", desc: "When you take the Attack action, you can replace one attack with casting a Wizard cantrip with an action casting time.", limited: false },
      { level: 10, name: "Eldritch Strike", desc: "When you hit a creature with a weapon attack, that creature has Disadvantage on the next saving throw it makes against a spell you cast before the end of your next turn.", limited: false },
      { level: 15, name: "Arcane Charge", desc: "When you use Action Surge, you can teleport up to 30 ft to an unoccupied space you can see before or after the additional action.", limited: false },
      { level: 18, name: "Improved War Magic", desc: "When you take the Attack action, you can replace two attacks with casting one level 1 or 2 Wizard spell with an action casting time.", limited: false },
    ],
    "Psi Warrior": [
      { level: 3, name: "Psionic Power", desc: "Gain Psionic Energy Dice (d6s at level 3, scaling up). Regain one die on Short Rest, all on Long Rest. Use them for: Protective Field (Reaction to reduce damage), Psionic Strike (bonus Force damage on hit), or Telekinetic Movement (Magic action to move object/creature 30 ft).", limited: true, recharge: "short rest" },
      { level: 7, name: "Telekinetic Adept", desc: "Psi-Powered Leap: as a Bonus Action, gain Fly Speed equal to twice your Speed until end of turn (Short/Long Rest or expend die to restore). Telekinetic Thrust: when Psionic Strike deals damage, force Strength save or knock Prone or push 10 ft horizontally.", limited: true, recharge: "short rest" },
      { level: 10, name: "Guarded Mind", desc: "Resistance to Psychic damage. If you start your turn Charmed or Frightened, expend a Psionic Energy Die to end both conditions on yourself.", limited: false },
      { level: 15, name: "Bulwark of Force", desc: "As a Bonus Action, grant up to Intelligence modifier creatures within 30 ft Half Cover for 1 minute. Recharges on Long Rest or by expending a Psionic Energy Die.", limited: true, recharge: "long rest" },
      { level: 18, name: "Telekinetic Master", desc: "Telekinesis is always prepared; cast it without a slot or components (Intelligence is the casting ability) once per Long Rest (or expend a die to restore). While Concentrating on it, make one weapon attack as a Bonus Action on each of your turns.", limited: true, recharge: "long rest" },
    ],
  },

  Monk: {
    "Warrior of Mercy": [
      { level: 3, name: "Implements of Mercy", desc: "Gain proficiency in Insight and Medicine skills and the Herbalism Kit.", limited: false },
      { level: 3, name: "Hand of Harm", desc: "Once per turn when you hit with an Unarmed Strike, expend 1 Focus Point to deal extra Necrotic damage equal to one Martial Arts die + Wisdom modifier.", limited: true, recharge: "focus points" },
      { level: 3, name: "Hand of Healing", desc: "As a Magic action, expend 1 Focus Point to touch a creature and restore HP equal to one Martial Arts die + Wisdom modifier. Can replace one Flurry of Blows strike with this for free.", limited: true, recharge: "focus points" },
      { level: 6, name: "Physician's Touch", desc: "Hand of Harm also inflicts Poisoned until end of your next turn. Hand of Healing can also end one of: Blinded, Deafened, Paralyzed, Poisoned, or Stunned on the target.", limited: false },
      { level: 11, name: "Flurry of Healing and Harm", desc: "Replace Flurry of Blows strikes with free Hand of Healing uses. Also use Hand of Harm on Flurry hits without spending a Focus Point (still once per turn). Combined uses equal Wisdom modifier (min 1) per Long Rest.", limited: true, recharge: "long rest" },
      { level: 17, name: "Hand of Ultimate Mercy", desc: "As a Magic action, touch a corpse that died within 24 hours and expend 5 Focus Points to revive it with 4d10 + Wisdom modifier HP, removing Blinded, Deafened, Paralyzed, Poisoned, or Stunned conditions. Once per Long Rest.", limited: true, recharge: "long rest" },
    ],
    "Warrior of Shadow": [
      { level: 3, name: "Shadow Arts", desc: "Expend 1 Focus Point to cast Darkness (you can see in it; move its area as a free action each turn). Gain Darkvision 60 ft (or +60 ft). Know the Minor Illusion cantrip (Wisdom spellcasting ability).", limited: true, recharge: "focus points" },
      { level: 6, name: "Shadow Step", desc: "While entirely in Dim Light or Darkness, teleport up to 60 ft as a Bonus Action to another such space you can see. Gain Advantage on your next melee attack before end of turn.", limited: false },
      { level: 11, name: "Improved Shadow Step", desc: "Expend 1 Focus Point with Shadow Step to ignore the dim/dark requirement. As part of the same Bonus Action, make an Unarmed Strike immediately after teleporting.", limited: true, recharge: "focus points" },
      { level: 17, name: "Cloak of Shadows", desc: "As a Magic action while in Dim Light or Darkness, expend 3 Focus Points to become Invisible for 1 minute (or until Incapacitated or ending turn in Bright Light). Also gain partial incorporeality and free Flurry of Blows (no Focus Points).", limited: true, recharge: "focus points" },
    ],
    "Warrior of the Elements": [
      { level: 3, name: "Manipulate Elements", desc: "You know the Elementalism cantrip. Wisdom is your spellcasting ability for it.", limited: false },
      { level: 3, name: "Elemental Attunement", desc: "Expend 1 Focus Point to imbue yourself with elemental energy for 10 minutes. Gain 10 ft extra reach on Unarmed Strikes and deal Acid/Cold/Fire/Lightning/Thunder damage with them; on a hit, force a Strength save or move the target 10 ft toward or away from you.", limited: true, recharge: "focus points" },
      { level: 6, name: "Elemental Burst", desc: "As a Magic action, expend 2 Focus Points to create a 20-ft radius elemental explosion centered on a point within 120 ft. Creatures make a Dexterity save or take damage equal to three Martial Arts die rolls (half on success).", limited: true, recharge: "focus points" },
      { level: 11, name: "Stride of the Elements", desc: "While Elemental Attunement is active, you also gain a Fly Speed and Swim Speed equal to your Speed.", limited: false },
      { level: 17, name: "Elemental Epitome", desc: "While Elemental Attunement is active: choose one elemental damage Resistance (changes each turn start); movement deals Martial Arts die damage of chosen type to creatures you pass within 5 ft (Destructive Stride); deal extra Martial Arts die damage once per turn on an Unarmed Strike (Empowered Strikes).", limited: false },
    ],
    "Warrior of the Open Hand": [
      { level: 3, name: "Open Hand Technique", desc: "When you hit with Flurry of Blows, impose one effect on the target: Addle (no Opportunity Attacks until its next turn), Push (Strength save or push 15 ft), or Topple (Dexterity save or Prone).", limited: false },
      { level: 6, name: "Wholeness of Body", desc: "As a Bonus Action, roll your Martial Arts die and regain that many HP plus your Wisdom modifier. Usable Wisdom modifier times (min 1) per Long Rest.", limited: true, recharge: "long rest" },
      { level: 11, name: "Fleet Step", desc: "When you take a Bonus Action other than Step of the Wind, you can also use Step of the Wind immediately after that Bonus Action.", limited: false },
      { level: 17, name: "Quivering Palm", desc: "When you hit with an Unarmed Strike, expend 4 Focus Points to start lethal vibrations in the target lasting Monk level days. As an action (or forgoing one attack), end them: the target makes a Constitution save or takes 10d12 Force damage (half on success). Only one creature at a time.", limited: true, recharge: "focus points" },
    ],
  },

  Paladin: {
    "Oath of Devotion": [
      { level: 3, name: "Oath of Devotion Spells", desc: "Always prepared: Protection from Evil and Good, Shield of Faith (level 3); Aid, Zone of Truth (level 5); Beacon of Hope, Dispel Magic (level 9); Freedom of Movement, Guardian of Faith (level 13); Commune, Flame Strike (level 17).", limited: false },
      { level: 3, name: "Sacred Weapon", desc: "When you take the Attack action, expend one Channel Divinity use to imbue a Melee weapon with positive energy for 10 minutes: add Charisma modifier to attack rolls (min +1) and deal Radiant or normal damage. The weapon emits Bright Light 20 ft and Dim Light 20 ft beyond.", limited: true, recharge: "channel divinity" },
      { level: 7, name: "Aura of Devotion", desc: "You and allies in your Aura of Protection are immune to the Charmed condition. A Charmed ally entering the aura has the condition suppressed while there.", limited: false },
      { level: 15, name: "Smite of Protection", desc: "Whenever you cast Divine Smite, you and allies in your Aura of Protection have Half Cover until the start of your next turn.", limited: false },
      { level: 20, name: "Holy Nimbus", desc: "As a Bonus Action (once per Long Rest, or restore with a level 5 spell slot), imbue your Aura with holy power for 10 minutes: Advantage on saves against Fiends/Undead, enemies starting turns in the aura take Charisma modifier + Proficiency Bonus Radiant damage, and the aura fills with sunlight.", limited: true, recharge: "long rest" },
    ],
    "Oath of Glory": [
      { level: 3, name: "Oath of Glory Spells", desc: "Always prepared: Guiding Bolt, Heroism (level 3); Enhance Ability, Magic Weapon (level 5); Haste, Protection from Energy (level 9); Compulsion, Freedom of Movement (level 13); Legend Lore, Yolande's Regal Presence (level 17).", limited: false },
      { level: 3, name: "Inspiring Smite", desc: "Immediately after casting Divine Smite, expend one Channel Divinity use to distribute 2d8 + Paladin level Temporary Hit Points among creatures of your choice within 30 ft.", limited: true, recharge: "channel divinity" },
      { level: 3, name: "Peerless Athlete", desc: "As a Bonus Action, expend one Channel Divinity use to gain Advantage on Strength (Athletics) and Dexterity (Acrobatics) checks and increase jump distances by 10 ft for 1 hour.", limited: true, recharge: "channel divinity" },
      { level: 7, name: "Aura of Alacrity", desc: "Your Speed increases by 10 ft. Allies entering or starting their turn in your Aura of Protection gain +10 ft Speed until end of their next turn.", limited: false },
      { level: 15, name: "Glorious Defense", desc: "As a Reaction when you or a creature within 10 ft is hit, add Charisma modifier (min +1) to that creature's AC, potentially causing a miss. If the attack misses, you can make one weapon attack against the attacker. Usable Charisma modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 20, name: "Living Legend", desc: "As a Bonus Action (once per Long Rest, or restore with a level 5 spell slot), gain for 10 minutes: Advantage on Charisma checks, ability to reroll failed saves as a Reaction, and cause one missed weapon attack to hit once per turn.", limited: true, recharge: "long rest" },
    ],
    "Oath of the Ancients": [
      { level: 3, name: "Oath of the Ancients Spells", desc: "Always prepared: Ensnaring Strike, Speak with Animals (level 3); Misty Step, Moonbeam (level 5); Plant Growth, Protection from Energy (level 9); Ice Storm, Stoneskin (level 13); Commune with Nature, Tree Stride (level 17).", limited: false },
      { level: 3, name: "Nature's Wrath", desc: "As a Magic action, expend one Channel Divinity use; each creature you choose within 15 ft must make a Strength save or be Restrained for 1 minute (repeat save at end of each of its turns).", limited: true, recharge: "channel divinity" },
      { level: 7, name: "Aura of Warding", desc: "You and allies in your Aura of Protection have Resistance to Necrotic, Psychic, and Radiant damage.", limited: false },
      { level: 15, name: "Undying Sentinel", desc: "When reduced to 0 HP and not killed outright, drop to 1 HP instead and regain HP equal to three times your Paladin level. Once per Long Rest. You also cannot be magically aged and stop visibly aging.", limited: true, recharge: "long rest" },
      { level: 20, name: "Elder Champion", desc: "As a Bonus Action (once per Long Rest, or restore with a level 5 spell slot), imbue Aura for 1 minute: enemies have Disadvantage on saves against your spells and Channel Divinity; regenerate 10 HP at the start of each turn; cast action spells as Bonus Actions.", limited: true, recharge: "long rest" },
    ],
    "Oath of Vengeance": [
      { level: 3, name: "Oath of Vengeance Spells", desc: "Always prepared: Bane, Hunter's Mark (level 3); Hold Person, Misty Step (level 5); Haste, Protection from Energy (level 9); Banishment, Dimension Door (level 13); Hold Monster, Scrying (level 17).", limited: false },
      { level: 3, name: "Vow of Enmity", desc: "When you take the Attack action, expend one Channel Divinity use to vow enmity against a creature within 30 ft; gain Advantage on attacks against it for 1 minute or until it drops to 0 HP (then transfer to another creature within 30 ft).", limited: true, recharge: "channel divinity" },
      { level: 7, name: "Relentless Avenger", desc: "When you hit with an Opportunity Attack, reduce the target's Speed to 0 until end of turn. You can then move up to half your Speed as part of the same Reaction without provoking Opportunity Attacks.", limited: false },
      { level: 15, name: "Soul of Vengeance", desc: "Immediately after a creature under your Vow of Enmity makes an attack roll (hit or miss), you can take a Reaction to make a melee attack against it if it's within range.", limited: false },
      { level: 20, name: "Avenging Angel", desc: "As a Bonus Action (once per Long Rest, or restore with a level 5 spell slot), gain for 10 minutes: Fly Speed of 60 ft with hover, and enemies starting turns in your Aura of Protection make a Wisdom save or become Frightened for 1 minute (attack rolls against them have Advantage).", limited: true, recharge: "long rest" },
    ],
  },

  Ranger: {
    "Beast Master": [
      { level: 3, name: "Primal Companion", desc: "Magically summon a Beast of the Land, Sea, or Sky. In combat it acts on your turn (Dodge unless you spend a Bonus Action or sacrifice an attack to command it). Restore it with a spell slot touch action if dead within 1 hour. Replace on Long Rest.", limited: false },
      { level: 7, name: "Exceptional Training", desc: "When commanding your beast as a Bonus Action, also allow it to Dash, Disengage, Dodge, or Help as its Bonus Action. Its attacks can deal Force damage or their normal type.", limited: false },
      { level: 11, name: "Bestial Fury", desc: "Your beast can use Beast's Strike twice when commanded. The first hit each turn against a Hunter's Mark target deals extra Force damage equal to the Hunter's Mark bonus.", limited: false },
      { level: 15, name: "Share Spells", desc: "When you cast a spell targeting yourself, you can also affect your Primal Companion if it is within 30 ft.", limited: false },
    ],
    "Fey Wanderer": [
      { level: 3, name: "Dreadful Strikes", desc: "When you hit a creature with a weapon, deal an extra 1d4 Psychic damage (once per turn per creature). Increases to 1d6 at Ranger level 11.", limited: false },
      { level: 3, name: "Fey Wanderer Spells", desc: "Always prepared: Charm Person (level 3); Misty Step (level 5); Summon Fey (level 9); Dimension Door (level 13); Mislead (level 17).", limited: false },
      { level: 3, name: "Otherworldly Glamour", desc: "Add Wisdom modifier (min +1) as a bonus to all Charisma checks. Gain proficiency in Deception, Performance, or Persuasion.", limited: false },
      { level: 7, name: "Beguiling Twist", desc: "Advantage on saves against Charmed and Frightened. When you or a visible creature within 120 ft succeeds on such a save, take a Reaction to force a different creature within 120 ft to make a Wisdom save or become Charmed or Frightened for 1 minute.", limited: false },
      { level: 11, name: "Fey Reinforcements", desc: "Cast Summon Fey without Material components. Once per Long Rest, cast it without a spell slot. Can modify it to not require Concentration (duration becomes 1 minute).", limited: true, recharge: "long rest" },
      { level: 15, name: "Misty Wanderer", desc: "Cast Misty Step without a spell slot Wisdom modifier times per Long Rest. When you cast it, bring one willing creature within 5 ft to within 5 ft of your destination.", limited: true, recharge: "long rest" },
    ],
    "Gloom Stalker": [
      { level: 3, name: "Dread Ambusher", desc: "At the start of your first turn of combat, Speed increases by 10 ft. You can deal an extra 2d6 Psychic damage (Dreadful Strike) on a hit Wisdom modifier times per Long Rest. Add Wisdom modifier to Initiative rolls.", limited: true, recharge: "long rest" },
      { level: 3, name: "Gloom Stalker Spells", desc: "Always prepared: Disguise Self (level 3); Rope Trick (level 5); Fear (level 9); Greater Invisibility (level 13); Seeming (level 17).", limited: false },
      { level: 3, name: "Umbral Sight", desc: "Gain Darkvision 60 ft (or +60 ft). While entirely in Darkness, you have the Invisible condition to creatures relying on Darkvision.", limited: false },
      { level: 7, name: "Iron Mind", desc: "Gain proficiency in Wisdom saving throws (or Intelligence/Charisma if already proficient).", limited: false },
      { level: 11, name: "Stalker's Flurry", desc: "Dreadful Strike damage becomes 2d8. When triggering Dreadful Strike, also choose: Sudden Strike (attack a different creature within 5 ft) or Mass Fear (target and creatures within 10 ft make Wisdom saves or become Frightened until start of your next turn).", limited: false },
      { level: 15, name: "Shadowy Dodge", desc: "As a Reaction when a creature makes an attack roll against you, impose Disadvantage on that roll. Whether it hits or misses, teleport up to 30 ft to an unoccupied space you can see.", limited: false },
    ],
    "Hunter": [
      { level: 3, name: "Hunter's Lore", desc: "While a creature is marked by Hunter's Mark, you know whether it has Immunities, Resistances, or Vulnerabilities and what they are.", limited: false },
      { level: 3, name: "Hunter's Prey", desc: "Choose one option (swappable on Short/Long Rest): Colossus Slayer (deal +1d8 damage once per turn to targets missing HP) or Horde Breaker (once per turn make a bonus attack against an adjacent different creature with the same weapon).", limited: false },
      { level: 7, name: "Defensive Tactics", desc: "Choose one option (swappable on Short/Long Rest): Escape the Horde (Opportunity Attacks have Disadvantage against you) or Multiattack Defense (after being hit, attacker has Disadvantage on all other attack rolls against you this turn).", limited: false },
      { level: 11, name: "Superior Hunter's Prey", desc: "Once per turn when you deal damage to a Hunter's Mark target, also deal that spell's extra damage to a different visible creature within 30 ft of the first.", limited: false },
      { level: 15, name: "Superior Hunter's Defense", desc: "As a Reaction when you take damage, gain Resistance to that damage type and all other damage of the same type until end of the current turn.", limited: false },
    ],
  },

  Rogue: {
    "Arcane Trickster": [
      { level: 3, name: "Spellcasting", desc: "Cast Wizard spells (Intelligence spellcasting ability). Start with Mage Hand and 2 cantrips, and 3 level 1 spells; expand as you level. Regain all spell slots on Long Rest.", limited: true, recharge: "long rest" },
      { level: 3, name: "Mage Hand Legerdemain", desc: "Cast Mage Hand as a Bonus Action and make it Invisible. Control it as a Bonus Action and make Dexterity (Sleight of Hand) checks through it.", limited: false },
      { level: 9, name: "Magical Ambush", desc: "If you have the Invisible condition when you cast a spell on a creature, that creature has Disadvantage on any saving throw it makes against that spell on the same turn.", limited: false },
      { level: 13, name: "Versatile Trickster", desc: "When you use the Trip option of Cunning Strike on a creature, you can also apply that Trip to another creature within 5 ft of your spectral Mage Hand.", limited: false },
      { level: 17, name: "Spell Thief", desc: "As a Reaction after a creature casts a spell targeting you or including you, force an Intelligence save (DC = your spell save DC). On a failure, negate the effect against you and steal the spell (if level 1+ and castable by you) for 8 hours; the creature cannot cast it for 8 hours. Once per Long Rest.", limited: true, recharge: "long rest" },
    ],
    "Assassin": [
      { level: 3, name: "Assassinate", desc: "Advantage on Initiative rolls. During the first round of combat, Advantage on attack rolls against creatures that haven't taken a turn; if Sneak Attack hits, deal extra damage equal to your Rogue level (same type as the weapon).", limited: false },
      { level: 3, name: "Assassin's Tools", desc: "Gain a Disguise Kit and a Poisoner's Kit along with proficiency in both.", limited: false },
      { level: 9, name: "Infiltration Expertise", desc: "Masterful Mimicry: unerringly mimic another's speech or handwriting after 1 hour of study. Roving Aim: your Speed is not reduced to 0 when using Steady Aim.", limited: false },
      { level: 13, name: "Envenom Weapons", desc: "When you use the Poison option of Cunning Strike, the target takes 2d6 Poison damage whenever it fails the saving throw (this damage ignores Resistance to Poison damage).", limited: false },
      { level: 17, name: "Death Strike", desc: "When you hit with Sneak Attack in the first round of combat, the target must make a Constitution save (DC 8 + Dex modifier + Proficiency Bonus) or have the attack's damage doubled against it.", limited: false },
    ],
    "Soulknife": [
      { level: 3, name: "Psionic Power", desc: "Gain Psionic Energy Dice (d6s at level 3, scaling up). Regain one on Short Rest, all on Long Rest. Psi-Bolstered Knack: after failing a proficiency-based check, roll a die and add it (expended only on success). Psychic Whispers: Magic action to establish telepathy with Proficiency Bonus creatures for hours equal to the die roll.", limited: true, recharge: "short rest" },
      { level: 3, name: "Psychic Blades", desc: "Manifest a Psychic Blade (Simple Melee, 1d6 Psychic, Finesse, Thrown 60/120) when taking the Attack action or making an Opportunity Attack. After attacking on your turn, make a bonus attack with a second blade (1d4) as a Bonus Action with a free hand.", limited: false },
      { level: 9, name: "Soul Blades", desc: "Homing Strikes: on a miss with Psychic Blade, roll a die and add it to the attack roll (expended only if it causes a hit). Psychic Teleportation: as a Bonus Action, expend and roll a die, throw a blade up to 10 times the result in feet, and teleport there.", limited: true, recharge: "psionic energy dice" },
      { level: 13, name: "Psychic Veil", desc: "As a Magic action, become Invisible for 1 hour or until dismissed (ends early if you deal damage or force a save). Once per Long Rest, or restore by expending a Psionic Energy Die.", limited: true, recharge: "long rest" },
      { level: 17, name: "Rend Mind", desc: "When you deal Sneak Attack damage with Psychic Blades, force a Wisdom save (DC 8 + Dex + Proficiency Bonus) or inflict Stunned for 1 minute (repeat save at end of each turn). Once per Long Rest or restore by expending three Psionic Energy Dice.", limited: true, recharge: "long rest" },
    ],
    "Thief": [
      { level: 3, name: "Fast Hands", desc: "As a Bonus Action: make a Dexterity (Sleight of Hand) check to pick a lock, disarm a trap, or pick a pocket; or take the Utilize action or use a magic item (Magic action).", limited: false },
      { level: 3, name: "Second Story Work", desc: "Gain a Climb Speed equal to your Speed. Determine jump distance using Dexterity instead of Strength.", limited: false },
      { level: 9, name: "Supreme Sneak", desc: "Gain the Stealth Attack Cunning Strike option (cost: 1d6): if Invisible from the Hide action, this attack does not end that condition if you end the turn behind Three-Quarters or Total Cover.", limited: false },
      { level: 13, name: "Use Magic Device", desc: "Attune to up to four magic items at once. 1-in-6 chance not to expend charges on magic item properties. Use any Spell Scroll with Intelligence as spellcasting ability (cantrips and level 1 reliably; higher levels require an Arcana check).", limited: false },
      { level: 17, name: "Thief's Reflexes", desc: "Take two turns during the first round of any combat: one at normal Initiative and one at Initiative minus 10.", limited: false },
    ],
  },

  Sorcerer: {
    "Aberrant Mind": [
      { level: 3, name: "Psionic Spells", desc: "Always prepared: Arms of Hadar, Calm Emotions, Detect Thoughts, Dissonant Whispers, Mind Sliver (level 3); Hunger of Hadar, Sending (level 5); Evard's Black Tentacles, Summon Aberration (level 7); Rary's Telepathic Bond, Telekinesis (level 9).", limited: false },
      { level: 3, name: "Telepathic Speech", desc: "As a Bonus Action, form a telepathic connection with a creature you can see within 30 ft for Sorcerer level minutes. Both can communicate telepathically within Charisma modifier miles (min 1). Ends if used on a different creature.", limited: false },
      { level: 6, name: "Psionic Sorcery", desc: "Cast level 1+ Psionic Spells by expending Sorcery Points equal to the spell's level (no Verbal, Somatic, or non-consumed Material components required).", limited: true, recharge: "sorcery points" },
      { level: 6, name: "Psychic Defenses", desc: "Resistance to Psychic damage. Advantage on saves against Charmed and Frightened conditions.", limited: false },
      { level: 14, name: "Revelation in Flesh", desc: "As a Bonus Action, spend 1+ Sorcery Points to alter your body for 10 minutes. Each point grants one benefit: Swim Speed (×2 your Speed + breathe underwater), Fly Speed (equal to Speed + hover), See Invisible (60 ft), or Wormlike Movement (squeeze through 1-inch spaces).", limited: true, recharge: "sorcery points" },
      { level: 18, name: "Warping Implosion", desc: "As a Magic action, teleport up to 120 ft; creatures within 30 ft of where you left make a Strength save or take 3d10 Force damage and are pulled toward your former space. Once per Long Rest or restore by spending 5 Sorcery Points.", limited: true, recharge: "long rest" },
    ],
    "Clockwork Soul": [
      { level: 3, name: "Clockwork Spells", desc: "Always prepared: Aid, Alarm, Lesser Restoration, Protection from Evil and Good (level 3); Dispel Magic, Protection from Energy (level 5); Freedom of Movement, Summon Construct (level 7); Greater Restoration, Wall of Force (level 9).", limited: false },
      { level: 3, name: "Restore Balance", desc: "As a Reaction when a creature within 60 ft is about to roll with Advantage or Disadvantage, cancel the effect so the roll is made normally. Usable Charisma modifier times per Long Rest.", limited: true, recharge: "long rest" },
      { level: 6, name: "Bastion of Law", desc: "As a Magic action, spend 1–5 Sorcery Points to create a ward of d8s (one per point) on yourself or a creature within 30 ft. When the warded creature takes damage, expend dice from the ward to reduce damage. Ward lasts until Long Rest or reused.", limited: true, recharge: "sorcery points" },
      { level: 14, name: "Trance of Order", desc: "As a Bonus Action, enter a trance for 1 minute: attack rolls against you can't benefit from Advantage, and you treat d20 rolls of 9 or lower as 10. Once per Long Rest or restore by spending 5 Sorcery Points.", limited: true, recharge: "long rest" },
      { level: 18, name: "Clockwork Cavalcade", desc: "As a Magic action, summon order spirits in a 30-ft Cube: restore up to 100 HP among chosen creatures, repair damaged objects, and dispel all spells of level 6 and lower on chosen targets. Once per Long Rest or restore by spending 7 Sorcery Points.", limited: true, recharge: "long rest" },
    ],
    "Draconic Bloodline": [
      { level: 3, name: "Draconic Resilience", desc: "Your HP maximum increases by 3 and by 1 per additional Sorcerer level. While unarmored, your base AC equals 10 + Dexterity modifier + Charisma modifier.", limited: false },
      { level: 3, name: "Draconic Spells", desc: "Always prepared: Alter Self, Chromatic Orb, Command, Dragon's Breath (level 3); Fear, Fly (level 5); Arcane Eye, Charm Monster (level 7); Legend Lore, Summon Dragon (level 9).", limited: false },
      { level: 6, name: "Elemental Affinity", desc: "Choose one draconic damage type (Acid, Cold, Fire, Lightning, or Poison). Gain Resistance to it and add Charisma modifier to one damage roll of spells dealing that type.", limited: false },
      { level: 14, name: "Dragon Wings", desc: "As a Bonus Action, sprout draconic wings for 1 hour granting a Fly Speed of 60 ft. Once per Long Rest or restore by spending 3 Sorcery Points.", limited: true, recharge: "long rest" },
      { level: 18, name: "Dragon Companion", desc: "Cast Summon Dragon without Material components. Once per Long Rest, cast it without a spell slot. Can modify the spell to not require Concentration (duration becomes 1 minute).", limited: true, recharge: "long rest" },
    ],
    "Wild Magic": [
      { level: 3, name: "Wild Magic Surge", desc: "Once per turn, after casting a Sorcerer spell with a spell slot, roll 1d20. On a 20, roll on the Wild Magic Surge table to create a chaotic magical effect.", limited: false },
      { level: 3, name: "Tides of Chaos", desc: "Give yourself Advantage on one D20 Test before rolling. Afterward, you must cast a Sorcerer spell with a slot or finish a Long Rest to use this again. Casting a spell with a slot before resting triggers an automatic Wild Magic Surge.", limited: true, recharge: "long rest" },
      { level: 6, name: "Bend Luck", desc: "As a Reaction, spend 1 Sorcery Point to roll 1d4 immediately after another creature rolls a D20 Test; apply the result as a bonus or penalty to that roll.", limited: true, recharge: "sorcery points" },
      { level: 14, name: "Controlled Chaos", desc: "Whenever you roll on the Wild Magic Surge table, roll twice and use either result.", limited: false },
      { level: 18, name: "Tamed Surge", desc: "After casting a Sorcerer spell with a spell slot, choose any effect from the Wild Magic Surge table instead of rolling (any row except the last; still make required rolls for the effect). Once per Long Rest.", limited: true, recharge: "long rest" },
    ],
  },

  Warlock: {
    "The Archfey": [
      { level: 3, name: "Archfey Spells", desc: "Always prepared: Calm Emotions, Faerie Fire, Misty Step, Phantasmal Force, Sleep (level 3); Blink, Plant Growth (level 5); Dominate Beast, Greater Invisibility (level 7); Dominate Person, Seeming (level 9).", limited: false },
      { level: 3, name: "Steps of the Fey", desc: "Cast Misty Step without a spell slot Charisma modifier times per Long Rest. Each cast adds one effect: Refreshing Step (1d10 Temp HP for you or a nearby creature) or Taunting Step (creatures near your origin have Disadvantage on attacks against others).", limited: true, recharge: "long rest" },
      { level: 6, name: "Misty Escape", desc: "Cast Misty Step as a Reaction when you take damage. Gain two additional Steps of the Fey options: Disappearing Step (Invisible until start of your next turn) or Dreadful Step (2d10 Psychic damage to creatures near origin or destination).", limited: true, recharge: "pact magic" },
      { level: 10, name: "Beguiling Defenses", desc: "Immunity to Charmed. As a Reaction when hit by an attack, halve the damage and force the attacker to make a Wisdom save or take Psychic damage equal to the damage you take. Once per Long Rest or restore by expending a Pact Magic spell slot.", limited: true, recharge: "long rest" },
      { level: 14, name: "Bewitching Magic", desc: "Immediately after casting an Enchantment or Illusion spell using an action and a spell slot, you can cast Misty Step as part of the same action without expending a spell slot.", limited: false },
    ],
    "The Celestial": [
      { level: 3, name: "Celestial Spells", desc: "Always prepared: Aid, Cure Wounds, Guiding Bolt, Lesser Restoration, Light, Sacred Flame (level 3); Daylight, Revivify (level 5); Guardian of Faith, Wall of Fire (level 7); Greater Restoration, Summon Celestial (level 9).", limited: false },
      { level: 3, name: "Healing Light", desc: "Maintain a pool of d6s equal to 1 + Warlock level. As a Bonus Action, expend up to Charisma modifier dice to heal yourself or a creature within 60 ft. Pool recharges on Long Rest.", limited: true, recharge: "long rest" },
      { level: 6, name: "Radiant Soul", desc: "Resistance to Radiant damage. Once per turn when a spell you cast deals Radiant or Fire damage, add your Charisma modifier to that spell's damage against one target.", limited: false },
      { level: 10, name: "Celestial Resilience", desc: "Gain Temporary HP equal to Warlock level + Charisma modifier when using Magical Cunning or finishing a Short or Long Rest. Up to five creatures you can see also gain Temp HP equal to half Warlock level + Charisma modifier.", limited: false },
      { level: 14, name: "Searing Vengeance", desc: "When you or an ally within 60 ft is about to make a Death Saving Throw, that creature regains half its max HP, can end Prone, and each enemy within 30 ft takes 2d8 + Charisma modifier Radiant damage and is Blinded until end of current turn. Once per Long Rest.", limited: true, recharge: "long rest" },
    ],
    "The Fiend": [
      { level: 3, name: "Fiend Spells", desc: "Always prepared: Burning Hands, Command, Scorching Ray, Suggestion (level 3); Fireball, Stinking Cloud (level 5); Fire Shield, Wall of Fire (level 7); Geas, Insect Plague (level 9).", limited: false },
      { level: 3, name: "Dark One's Blessing", desc: "When you reduce an enemy to 0 HP (or someone else does within 10 ft of you), gain Temporary Hit Points equal to Charisma modifier + Warlock level.", limited: false },
      { level: 6, name: "Dark One's Own Luck", desc: "After seeing a roll but before effects occur, add 1d10 to an ability check or saving throw. Usable Charisma modifier times per Long Rest (max once per roll).", limited: true, recharge: "long rest" },
      { level: 10, name: "Fiendish Resilience", desc: "After a Short or Long Rest, choose one damage type (not Force) to gain Resistance to until you choose again.", limited: false },
      { level: 14, name: "Hurl Through Hell", desc: "Once per turn when you hit with an attack, the target must make a Charisma save or disappear into the Lower Planes, taking 8d10 Psychic damage (if not a Fiend) and being Incapacitated until returning at end of your next turn. Once per Long Rest or restore by expending a Pact Magic slot.", limited: true, recharge: "long rest" },
    ],
    "The Great Old One": [
      { level: 3, name: "Great Old One Spells", desc: "Always prepared: Detect Thoughts, Dissonant Whispers, Phantasmal Force, Tasha's Hideous Laughter (level 3); Clairvoyance, Hunger of Hadar (level 5); Confusion, Summon Aberration (level 7); Modify Memory, Telekinesis (level 9).", limited: false },
      { level: 3, name: "Awakened Mind", desc: "As a Bonus Action, form a telepathic connection with a creature within 30 ft for Warlock level minutes. Both communicate telepathically within Charisma modifier miles (min 1). Ends early if used on another creature.", limited: false },
      { level: 3, name: "Psychic Spells", desc: "When you cast a Warlock spell that deals damage, change its damage type to Psychic. Enchantment and Illusion Warlock spells can be cast without Verbal or Somatic components.", limited: false },
      { level: 6, name: "Clairvoyant Combatant", desc: "When you bond telepathically with a creature via Awakened Mind, force a Wisdom save or it has Disadvantage on attacks against you while you have Advantage on attacks against it for the bond's duration. Once per Short or Long Rest, or restore by expending a Pact Magic slot.", limited: true, recharge: "short rest" },
      { level: 10, name: "Eldritch Hex", desc: "Hex is always prepared. When you cast Hex and choose an ability, the target also has Disadvantage on saving throws of that ability for the duration.", limited: false },
      { level: 10, name: "Thought Shield", desc: "Your thoughts cannot be read unless you allow it. Resistance to Psychic damage; when a creature deals Psychic damage to you, that creature takes the same amount.", limited: false },
      { level: 14, name: "Create Thrall", desc: "Cast Summon Aberration modified to not require Concentration (1 minute duration); the summoned Aberration gains Temp HP equal to Warlock level + Charisma modifier, and deals extra Psychic damage (equal to Hex bonus) on its first hit per turn against your Hex target.", limited: false },
    ],
  },

  Wizard: {
    "School of Abjuration": [
      { level: 3, name: "Abjuration Savant", desc: "Add two Abjuration school Wizard spells (level 2 or lower) to your spellbook for free. Whenever you gain access to a new spell slot level, add one Abjuration spell of a castable level for free.", limited: false },
      { level: 3, name: "Arcane Ward", desc: "When you cast an Abjuration spell with a slot, create a magical ward with max HP equal to twice Wizard level + Intelligence modifier. Ward absorbs all damage before you; recharge it by casting Abjuration spells (regain 2× slot level HP) or expending a spell slot as a Bonus Action. Create once per Long Rest.", limited: true, recharge: "long rest" },
      { level: 6, name: "Projected Ward", desc: "As a Reaction when a creature within 30 ft takes damage, your Arcane Ward absorbs that damage instead (remaining damage goes to the creature).", limited: false },
      { level: 10, name: "Spell Breaker", desc: "Counterspell and Dispel Magic are always prepared. Cast Dispel Magic as a Bonus Action; add Proficiency Bonus to its ability check. If either spell fails to stop a spell, the slot used is not expended.", limited: false },
      { level: 14, name: "Spell Resistance", desc: "Advantage on saving throws against spells, and Resistance to spell damage.", limited: false },
    ],
    "School of Divination": [
      { level: 3, name: "Divination Savant", desc: "Add two Divination school Wizard spells (level 2 or lower) to your spellbook for free. Whenever you gain access to a new spell slot level, add one Divination spell of a castable level for free.", limited: false },
      { level: 3, name: "Portent", desc: "After each Long Rest, roll two d20s and record the results. Before any D20 Test by you or a visible creature, replace the roll with one of your portent numbers (choose before rolling; one use per turn; each portent roll used once).", limited: true, recharge: "long rest" },
      { level: 6, name: "Expert Divination", desc: "When you cast a Divination spell using a level 2+ slot, regain one expended slot of a lower level (max level 5).", limited: false },
      { level: 10, name: "The Third Eye", desc: "As a Bonus Action, choose one benefit until Short or Long Rest (once per Short or Long Rest): Darkvision 120 ft, read any language, or cast See Invisibility without a slot.", limited: true, recharge: "short rest" },
      { level: 14, name: "Greater Portent", desc: "Roll three d20s for your Portent feature instead of two.", limited: false },
    ],
    "School of Evocation": [
      { level: 3, name: "Evocation Savant", desc: "Add two Evocation school Wizard spells (level 2 or lower) to your spellbook for free. Whenever you gain access to a new spell slot level, add one Evocation spell of a castable level for free.", limited: false },
      { level: 3, name: "Potent Cantrip", desc: "When you miss with a cantrip attack roll or the target succeeds on its save against a cantrip, the target still takes half the cantrip's damage (no additional effects).", limited: false },
      { level: 6, name: "Sculpt Spells", desc: "When casting an Evocation spell affecting other creatures you can see, choose up to 1 + spell level creatures to automatically succeed on their saves and take no damage (even when they would normally take half on a success).", limited: false },
      { level: 10, name: "Empowered Evocation", desc: "Add your Intelligence modifier to one damage roll of any Wizard Evocation school spell you cast.", limited: false },
      { level: 14, name: "Overchannel", desc: "When casting a Wizard spell of levels 1–5 that deals damage, deal maximum damage on the turn you cast it. First use per Long Rest: no penalty. Subsequent uses before Long Rest: take 2d12 Necrotic damage per spell level (increasing by 1d12 per additional use); ignores Resistance and Immunity.", limited: false },
    ],
    "School of Illusion": [
      { level: 3, name: "Illusion Savant", desc: "Add two Illusion school Wizard spells (level 2 or lower) to your spellbook for free. Whenever you gain access to a new spell slot level, add one Illusion spell of a castable level for free.", limited: false },
      { level: 3, name: "Improved Illusions", desc: "Cast Illusion spells without Verbal components; Illusion spells with 10+ ft range have their range increased by 60 ft. Know Minor Illusion (or another cantrip if already known); cast it as a Bonus Action and create both a sound and an image simultaneously.", limited: false },
      { level: 6, name: "Phantasmal Creatures", desc: "Summon Beast and Summon Fey are always prepared; cast either as an Illusion (spectral appearance). Cast each without a slot once per Long Rest (halves the creature's HP if cast this way).", limited: true, recharge: "long rest" },
      { level: 10, name: "Illusory Self", desc: "As a Reaction when a creature hits you with an attack, interpose an illusory duplicate to cause the attack to automatically miss, then the duplicate dissipates. Recharges on Short or Long Rest, or restore by expending a level 2+ slot.", limited: true, recharge: "short rest" },
      { level: 14, name: "Illusory Reality", desc: "When you cast an Illusion spell with a slot, choose one inanimate nonmagical object in the illusion and make it real as a Bonus Action while the spell is ongoing. The object lasts 1 minute but cannot deal damage or impose conditions.", limited: false },
    ],
  },
};
