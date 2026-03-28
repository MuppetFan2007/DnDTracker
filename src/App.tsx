import React, { useState, useEffect, createContext, useContext } from "react";

// ─── INLINE SVG ICONS ────────────────────────────────────────────────────────
const Icon = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}>
    <path d={d} />
  </svg>
);

const Icons = {
  Users: () => <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  Star: () => <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  Zap: () => <Icon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  Map: () => <Icon d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16" />,
  Shield: () => <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  Wind: () => <Icon d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />,
  Music: () => <Icon d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />,
  Book: () => <Icon d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />,
  Feather: () => <Icon d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8L2 22M17.5 15H9" />,
  Crosshair: () => <Icon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v8M8 12h8" />,
  Heart: () => <Icon d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  Eye: () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
  Aperture: () => <Icon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16 3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />,
  User: () => <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  Award: () => <Icon d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12" />,
};

const DND_ICONS = {
  Barbarian: <Icons.Crosshair />,
  Bard: <Icons.Music />,
  Cleric: <Icons.Award />,
  Druid: <Icons.Feather />,
  Fighter: <Icons.Shield />,
  Monk: <Icons.Aperture />,
  Paladin: <Icons.Heart />,
  Ranger: <Icons.Wind />,
  Rogue: <Icons.User />,
  Sorcerer: <Icons.Zap />,
  Warlock: <Icons.Eye />,
  Wizard: <Icons.Book />,
};

// ─── THEMES ──────────────────────────────────────────────────────────────────
const THEMES = {
  vcr: {
    name: "VCR",
    bg: "#0a0a0a", surface: "#0f0f0f", card: "#111111",
    border: "#2a2a2a", borderHover: "#ff3c00",
    gold: "#ff3c00", goldDim: "#cc2e00",
    text: "#e8e8e8", textDim: "#888888", textMuted: "#444444",
    red: "#ff0044", green: "#00ff88", yellow: "#ffcc00", blue: "#00ccff",
    activeSkill: "#1a0800", activeBorder: "#ff3c00",
  },
  storm: {
    name: "Storm",
    bg: "#0b0c10", surface: "#111217", card: "#16171b",
    border: "#2b2e35", borderHover: "#5a6070",
    gold: "#c6b6f0", goldDim: "#9c8cd3",
    text: "#e6e6ee", textDim: "#9ea0ab", textMuted: "#7b7e89",
    red: "#f28b9b", green: "#6fbf9a", yellow: "#f4d07a", blue: "#9aaef8",
    activeSkill: "#1e1a2e", activeBorder: "#5a4e8a",
  },
  miku: {
    name: "Miku",
    bg: "#071018", surface: "#05242b", card: "#08333b",
    border: "#0f5e66", borderHover: "#19c0cc",
    gold: "#00d2d6", goldDim: "#00a5a9",
    text: "#e6fbff", textDim: "#9fd8dc", textMuted: "#4a8e92",
    red: "#ff9bb3", green: "#6ef7b5", yellow: "#ffd67a", blue: "#7dd3fc",
    activeSkill: "#052830", activeBorder: "#0f8e96",
  },
  pink: {
    name: "Kawaii",
    bg: "#fff0f6", surface: "#ffe4f0", card: "#ffd6ea",
    border: "#ffbfdc", borderHover: "#ff8fcf",
    gold: "#ff6fb3", goldDim: "#ff97c2",
    text: "#9b1554", textDim: "#d87aa6", textMuted: "#e8aac8",
    red: "#ff4d6d", green: "#6bd687", yellow: "#ffe066", blue: "#85d1ff",
    activeSkill: "#ffd6ea", activeBorder: "#ff6fb3",
  },
};

const ThemeCtx = createContext(THEMES.vcr);
const useT = () => useContext(ThemeCtx);

// ─── D&D DATA ─────────────────────────────────────────────────────────────────
const DND = {
  classes: [
    { name: "Barbarian", hitDie: 12, subclasses: ["Path of the Berserker", "Path of the Totem Warrior", "Path of the Wild Heart", "Path of the World Tree", "Path of the Zealot"] },
    { name: "Bard", hitDie: 8, subclasses: ["College of Dance", "College of Glamour", "College of Lore", "College of Valor", "College of Spirits"] },
    { name: "Cleric", hitDie: 8, subclasses: ["Life Domain", "Light Domain", "Trickery Domain", "War Domain", "Knowledge Domain", "Nature Domain", "Tempest Domain", "Death Domain"] },
    { name: "Druid", hitDie: 8, subclasses: ["Circle of the Land", "Circle of the Moon", "Circle of the Sea", "Circle of Stars", "Circle of Wildfire"] },
    { name: "Fighter", hitDie: 10, subclasses: ["Battle Master", "Champion", "Eldritch Knight", "Psi Warrior", "Echo Knight", "Rune Knight"] },
    { name: "Monk", hitDie: 8, subclasses: ["Warrior of the Open Hand", "Warrior of Shadow", "Warrior of the Elements", "Warrior of Mercy"] },
    { name: "Paladin", hitDie: 10, subclasses: ["Oath of Devotion", "Oath of the Ancients", "Oath of Glory", "Oath of Vengeance", "Oath of Conquest", "Oathbreaker"] },
    { name: "Ranger", hitDie: 10, subclasses: ["Beast Master", "Fey Wanderer", "Gloom Stalker", "Hunter", "Swarmkeeper"] },
    { name: "Rogue", hitDie: 8, subclasses: ["Arcane Trickster", "Assassin", "Soulknife", "Swashbuckler", "Thief"] },
    { name: "Sorcerer", hitDie: 6, subclasses: ["Aberrant Mind", "Clockwork Soul", "Draconic Bloodline", "Wild Magic", "Storm Sorcery"] },
    { name: "Warlock", hitDie: 8, subclasses: ["The Archfey", "The Celestial", "The Fiend", "The Great Old One", "The Undying"] },
    { name: "Wizard", hitDie: 6, subclasses: ["School of Abjuration", "School of Conjuration", "School of Divination", "School of Enchantment", "School of Evocation", "School of Illusion", "School of Necromancy", "School of Transmutation", "Bladesinging", "Order of Scribes"] },
  ],
  species: ["Aasimar", "Dragonborn", "Dwarf", "Elf", "Gnome", "Goliath", "Halfling", "Human", "Orc", "Tiefling", "Ardling", "Autognome", "Githyanki", "Astral Elf", "Plasmoid"],
  backgrounds: [
    { name: "Acolyte", skills: ["Insight", "Religion"] }, { name: "Artisan", skills: ["Investigation", "Persuasion"] },
    { name: "Charlatan", skills: ["Deception", "Sleight of Hand"] }, { name: "Criminal", skills: ["Deception", "Stealth"] },
    { name: "Entertainer", skills: ["Acrobatics", "Performance"] }, { name: "Farmer", skills: ["Animal Handling", "Nature"] },
    { name: "Guard", skills: ["Athletics", "Perception"] }, { name: "Guide", skills: ["Stealth", "Survival"] },
    { name: "Hermit", skills: ["Medicine", "Religion"] }, { name: "Merchant", skills: ["Animal Handling", "Persuasion"] },
    { name: "Noble", skills: ["History", "Persuasion"] }, { name: "Sage", skills: ["Arcana", "History"] },
    { name: "Sailor", skills: ["Acrobatics", "Perception"] }, { name: "Soldier", skills: ["Athletics", "Intimidation"] },
    { name: "Scribe", skills: ["Investigation", "Perception"] }, { name: "Wayfarer", skills: ["Insight", "Stealth"] },
  ],
  alignments: ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"],
  schools: ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"],
  skills: ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"],
  skillStat: { "Acrobatics": "dex", "Animal Handling": "wis", "Arcana": "int", "Athletics": "str", "Deception": "cha", "History": "int", "Insight": "wis", "Intimidation": "cha", "Investigation": "int", "Medicine": "wis", "Nature": "int", "Perception": "wis", "Performance": "cha", "Persuasion": "cha", "Religion": "int", "Sleight of Hand": "dex", "Stealth": "dex", "Survival": "wis" },
  classColors: { "Barbarian": "#ef4444", "Bard": "#a855f7", "Cleric": "#f59e0b", "Druid": "#22c55e", "Fighter": "#6b7280", "Monk": "#06b6d4", "Paladin": "#eab308", "Ranger": "#84cc16", "Rogue": "#94a3b8", "Sorcerer": "#ec4899", "Warlock": "#8b5cf6", "Wizard": "#3b82f6" },
  spellColors: { "Abjuration": "#3b82f6", "Conjuration": "#8b5cf6", "Divination": "#06b6d4", "Enchantment": "#ec4899", "Evocation": "#ef4444", "Illusion": "#a855f7", "Necromancy": "#22c55e", "Transmutation": "#f59e0b" },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
type CharClass = { name: string; level: number; subclass: string; subclassFeatures: string; };
type CharType = {
  id: string;
  name: string;
  species: string;
  classes: CharClass[];
  background: string;
  alignment: string;
  xp: number;
  stats: { str: number; dex: number; con: number; int: number; wis: number; cha: number; };
  hp: { current: number; max: number; temp: number };
  ac: number;
  speed: number;
  initiative: number;
  inspiration: boolean;
  deathSaves: { successes: number; failures: number };
  savingThrowProfs: string[];
  skillProfs: string[];
  languages: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  features: string;
  equipment: string;
  spells: any[];
  currency: { cp: number; sp: number; gp: number; pp: number };
  notes: string;
  createdAt: number;
};
const mod = (s: number) => Math.floor((s - 10) / 2);
const fmt = (n: number) => n >= 0 ? `+${n}` : `${n}`;
const uid = (): string => Math.random().toString(36).slice(2, 10);
const profB = (lvl: number) => Math.ceil(lvl / 4) + 1;
const STORE = "dnd2024_v4";
const loadLS = (): CharType[] => { try { return JSON.parse(localStorage.getItem(STORE) || "[]") || []; } catch { return []; } };
const saveLS = (cs: CharType[]) => localStorage.setItem(STORE, JSON.stringify(cs));
const totalLevel = (char: CharType) => (char.classes || [{ level: (char as any).level || 1 }]).reduce((s: number, c: CharClass) => s + (c.level || 0), 0);
const levelLabel = (l: number) => l === 0 ? "Cantrip" : `Level ${l}`;
const blank = () => ({
  id: uid(), name: "", species: "Human", classes: [{ name: "Fighter", level: 1, subclass: "", subclassFeatures: "" }],
  background: "Soldier", alignment: "True Neutral", xp: 0,
  stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
  hp: { current: 10, max: 10, temp: 0 }, ac: 10, speed: 30, initiative: 0,
  inspiration: false, deathSaves: { successes: 0, failures: 0 },
  savingThrowProfs: [], skillProfs: [], languages: "Common",
  personalityTraits: "", ideals: "", bonds: "", flaws: "",
  features: "", equipment: "", spells: [], currency: { cp: 0, sp: 0, gp: 0, pp: 0 },
  notes: "", createdAt: Date.now(),
});

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
function GlobalCSS() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
      body { margin: 0; }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #ff3c0055; }
      .vcr-root { font-family: 'Share Tech Mono', monospace !important; }
      .vcr-root input, .vcr-root select, .vcr-root textarea, .vcr-root button { font-family: 'Share Tech Mono', monospace !important; }
      .vcr-scanlines {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px);
        pointer-events: none; z-index: 9999;
      }
      @keyframes vcr-flicker { 0%,89%,91%,93%,100% { opacity:1; } 90% { opacity:0.82; } 92% { opacity:0.95; } }
      .vcr-flicker { animation: vcr-flicker 7s infinite; }
      @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
      .vcr-blink { animation: blink 1s step-end infinite; }
      @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      .fade-up { animation: fadeUp 0.2s ease forwards; }
      .hov-card { transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s !important; }
      .hov-card:hover { transform: translateY(-3px) !important; box-shadow: 0 8px 24px rgba(0,0,0,0.5) !important; }
      .hov-btn { transition: all 0.13s !important; cursor: pointer; }
      .hov-btn:hover { opacity: 0.8 !important; }
      .hov-btn:active { transform: scale(0.96) !important; }
      .chip-toggle { transition: all 0.13s !important; cursor: pointer; user-select: none; }
      .chip-toggle:hover { opacity: 0.85 !important; }
      input:focus, select:focus, textarea:focus { outline: none; }
      textarea { font-family: inherit; resize: vertical; }
      input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
    `}</style>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {

  // Type definitions
  type CharClass = { name: string; level: number; subclass: string; subclassFeatures: string; };
  type CharType = {
    id: string;
    name: string;
    species: string;
    classes: CharClass[];
    background: string;
    alignment: string;
    xp: number;
    stats: { str: number; dex: number; con: number; int: number; wis: number; cha: number; };
    hp: { current: number; max: number; temp: number };
    ac: number;
    speed: number;
    initiative: number;
    inspiration: boolean;
    deathSaves: { successes: number; failures: number };
    savingThrowProfs: string[];
    skillProfs: string[];
    languages: string;
    personalityTraits: string;
    ideals: string;
    bonds: string;
    flaws: string;
    features: string;
    equipment: string;
    spells: any[];
    currency: { cp: number; sp: number; gp: number; pp: number };
    notes: string;
    createdAt: number;
    customSpecies?: string;
  };

  const [themeKey, setThemeKey] = useState<keyof typeof THEMES>(() => { try { return (localStorage.getItem("dnd_theme") as keyof typeof THEMES) || "vcr"; } catch { return "vcr"; } });
  const C = THEMES[themeKey] || THEMES.vcr;
  const isVcr = themeKey === "vcr";
  const [chars, setChars] = useState<CharType[]>(loadLS);
  const [view, setView] = useState<string>("roster");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState<CharType | null>(null);
  const [step, setStep] = useState<number>(0);

  useEffect(() => { try { localStorage.setItem("dnd_theme", themeKey); } catch {} }, [themeKey]);
  useEffect(() => { saveLS(chars); }, [chars]);

  const saveChar = (char: CharType) => setChars((cs: CharType[]) => cs.some((c: CharType) => c.id === char.id) ? cs.map((c: CharType) => c.id === char.id ? char : c) : [...cs, char]);
  const deleteChar = (id: string) => setChars((cs: CharType[]) => cs.filter((c: CharType) => c.id !== id));

  return (
    <ThemeCtx.Provider value={C}>
      <GlobalCSS />
      {isVcr && <div className="vcr-scanlines" />}
      <div className={isVcr ? "vcr-root vcr-flicker" : ""}
        style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: isVcr ? "'Share Tech Mono', monospace" : "'Segoe UI', system-ui, sans-serif" }}>
        {view === "roster" && (
          <Roster chars={chars} themeKey={themeKey} setThemeKey={setThemeKey}
            onCreate={() => { setDraft(blank() as CharType); setStep(0); setView("create"); }}
            onOpen={(id: string) => { setActiveId(id); setView("sheet"); }}
            onDelete={deleteChar} />
        )}
        {view === "create" && draft && (
          <Creator draft={draft} setDraft={setDraft} step={step} setStep={setStep}
            onFinish={() => { saveChar(draft); setActiveId(draft.id); setView("sheet"); }}
            onCancel={() => setView("roster")} />
        )}
        {view === "sheet" && (() => {
          const char = chars.find((c: CharType) => c.id === activeId);
          if (!char) { setTimeout(() => setView("roster"), 0); return null; }
          return <Sheet char={char} onChange={saveChar} onBack={() => setView("roster")} />;
        })()}
      </div>
    </ThemeCtx.Provider>
  );
}

// ─── HP CIRCLE ────────────────────────────────────────────────────────────────
function FullCircleHP({ current, max, color, size = 88 }: { current: number; max: number; color: string; size?: number }) {
  const pct = max ? Math.max(0, Math.min(1, current / max)) : 0;
  const r = size * 0.41;
  const cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} overflow="visible">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={size * 0.09} />
        {pct > 0 && (
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={size * 0.09}
            strokeDasharray={`${pct * circ} ${(1 - pct) * circ}`} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 5px ${color}99)` }}
            transform={`rotate(-90 ${cx} ${cy})`} />
        )}
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: size * 0.21, fontWeight: 700, color, lineHeight: 1 }}>{current}</div>
        <div style={{ fontSize: size * 0.13, color: "rgba(255,255,255,0.3)" }}>/ {max}</div>
      </div>
    </div>
  );
}

// ─── VCR CLOCK ───────────────────────────────────────────────────────────────
function VcrClock() {
  const C = useT();
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 10, letterSpacing: 2 }}>
      <span style={{ color: C.red, fontWeight: 700 }}>● REC</span>
      <span style={{ color: C.gold }}>{pad(t.getHours())}:{pad(t.getMinutes())}:{pad(t.getSeconds())}</span>
      <span style={{ color: C.textMuted }}>SP ■■■□□</span>
      <span style={{ color: C.textMuted }}>TRACKING OK</span>
    </div>
  );
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function CLabel({ children }: { children: React.ReactNode }) {
  const C = useT();
  return <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4, marginTop: 12 }}>{children}</div>;
}
function CRow({ children, gap = 12 }: { children: React.ReactNode; gap?: number }) {
  return <div style={{ display: "flex", gap }}>{children}</div>;
}
function SecHdr({ children, mt = 4 }: { children: React.ReactNode; mt?: number }) {
  const C = useT();
  return <div style={{ fontSize: 10, color: C.gold, textTransform: "uppercase", letterSpacing: 3, marginBottom: 10, paddingBottom: 5, borderBottom: `1px solid ${C.gold}44`, marginTop: mt }}>{children}</div>;
}
function Chip({ children, active, onClick, color }: { children: React.ReactNode; active: boolean; onClick: () => void; color?: string }) {
  const C = useT();
  const ac = color || C.gold;
  return (
    <div className="chip-toggle" onClick={onClick} style={{
      padding: "7px 10px", textAlign: "center", fontSize: 11, lineHeight: 1.4, letterSpacing: 1,
      background: active ? ac + "22" : "transparent",
      border: `1px solid ${active ? ac : C.border}`,
      color: active ? ac : C.textDim,
      boxShadow: active ? `0 0 8px ${ac}33` : "none",
    }}>
      {children}
    </div>
  );
}
type BtnVariant = "gold" | "danger" | "default" | "ghost";
function Btn({ children, onClick, variant = "default", style = {}, disabled = false }: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: BtnVariant;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  const C = useT();
  const base = { padding: "8px 16px", fontSize: 11, fontFamily: "inherit", letterSpacing: 2, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, textTransform: "uppercase", border: "1px solid", transition: "all 0.13s", borderRadius: 0 };
  const variants: Record<BtnVariant, React.CSSProperties> = {
    gold: { background: "transparent", borderColor: C.gold, borderWidth: 2, color: C.gold, boxShadow: `0 0 10px ${C.gold}33` },
    danger: { background: "transparent", borderColor: C.red, color: C.red },
    default: { background: "transparent", borderColor: C.border, color: C.textDim },
    ghost: { background: "transparent", border: "none", color: C.textDim },
  };
  return (
    <button className="hov-btn" onClick={!disabled ? onClick : undefined} disabled={disabled}
      style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

function useInp() {
  const C = useT();
  return { background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: "8px 10px", fontSize: 12, width: "100%", fontFamily: "inherit", letterSpacing: 1, borderRadius: 0 };
}

// ─── ROSTER ──────────────────────────────────────────────────────────────────
interface RosterProps {
  chars: CharType[];
  onCreate: () => void;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  themeKey: keyof typeof THEMES;
  setThemeKey: (key: keyof typeof THEMES) => void;
}
function Roster({ chars, onCreate, onOpen, onDelete, themeKey, setThemeKey }: RosterProps) {
  const C = useT();
  const isVcr = themeKey === "vcr";
  const [search, setSearch] = useState("");
  const filtered: CharType[] = chars.filter((c: CharType) => (c.name || "").toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fade-up" style={{ minHeight: "100vh", padding: "28px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            {isVcr && <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 4, marginBottom: 6 }}>▓▓░ SYSTEM BOOT — LOADING CHARACTER DATABASE ░▓▓</div>}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {isVcr ? (
                <div style={{ borderLeft: `3px solid ${C.gold}`, paddingLeft: 14 }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: C.gold, letterSpacing: 5, fontFamily: "'Orbitron', monospace" }}>D&D 2024</div>
                  <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 3, marginTop: 3 }}>CHARACTER MANAGER // v2.4.1</div>
                </div>
              ) : (
                <>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg,${C.gold},${C.goldDim})`, display: "flex", alignItems: "center", justifyContent: "center", color: C.bg, boxShadow: `0 4px 16px ${C.gold}44` }}>
                    <Icons.Book />
                  </div>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: C.gold, fontFamily: "Georgia, serif" }}>D&D 2024 Manager</div>
                    <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Track your party · Manage spells · Stay alive</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {isVcr && <VcrClock />}
            <div style={{ display: "flex", gap: 5, background: C.surface, border: `1px solid ${C.border}`, padding: "4px 6px" }}>
              {Object.entries(THEMES).map(([k, t]) => (
                  <button key={k} className="hov-btn" onClick={() => setThemeKey(k as keyof typeof THEMES)} title={t.name}
                    style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${k === themeKey ? C.gold : "transparent"}`, background: t.gold, padding: 0, boxShadow: k === themeKey ? `0 0 6px ${t.gold}` : "none" }} />
                ))}
            </div>
            <Btn variant="gold" onClick={onCreate}>{isVcr ? "> NEW_CHAR.EXE" : "+ New Character"}</Btn>
          </div>
        </div>

        {chars.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
            {([
              ["Adventurers", chars.length, <Icons.Users key="u" />],
              ["Avg Level", chars.length ? Math.round(chars.reduce((s: number, c: CharType) => s + totalLevel(c), 0) / chars.length) : 0, <Icons.Star key="s" />],
              ["Spells Known", chars.reduce((s: number, c: CharType) => s + (c.spells || []).length, 0), <Icons.Zap key="z" />],
              ["Unique Classes", new Set(chars.flatMap((c: CharType) => (c.classes || []).map(cl => cl.name))).size, <Icons.Book key="b" />],
            ] as [string, number, React.ReactNode][]).map(([l, v, ic]) => (
              <div key={l as string} style={{ background: C.card, border: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: C.gold, fontSize: 20 }}>{ic}</span>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>{l}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {chars.length > 3 && (
          <input placeholder={isVcr ? "SEARCH_QUERY:_" : "Search adventurers..."}
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: "9px 14px", fontSize: 12, width: "100%", marginBottom: 18, fontFamily: "inherit", letterSpacing: 1, borderRadius: 0 }} />
        )}

        {chars.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            {isVcr ? (
              <>
                <div style={{ fontSize: 42, color: C.gold, opacity: 0.35, letterSpacing: 8, fontFamily: "'Orbitron',monospace", marginBottom: 14 }}>NO SIGNAL</div>
                <div className="vcr-blink" style={{ fontSize: 11, color: C.gold, letterSpacing: 4, marginBottom: 8 }}>INSERT TAPE ▶</div>
                <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: 3, marginBottom: 28 }}>CHARACTER DATABASE EMPTY</div>
                <Btn variant="gold" onClick={onCreate}>▶ INITIALIZE NEW CHARACTER</Btn>
              </>
            ) : (
              <>
                <div style={{ fontSize: 60, marginBottom: 16, opacity: 0.2, color: C.textDim }}><Icons.Map /></div>
                <div style={{ fontSize: 18, color: C.textDim, marginBottom: 8, fontFamily: "Georgia,serif" }}>The tavern is empty.</div>
                <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 24 }}>Create your first adventurer to begin.</div>
                <Btn variant="gold" onClick={onCreate}>Create Your First Character</Btn>
              </>
            )}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
            {filtered.map(c => <CharCard key={c.id} char={c} onOpen={onOpen} onDelete={onDelete} />)}
          </div>
        )}
      </div>
    </div>
  );
}

interface CharCardProps {
  char: CharType;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
}
function CharCard({ char, onOpen, onDelete }: CharCardProps) {
  const C = useT();
  const lvl = totalLevel(char);
  const hpPct = char.hp.max ? char.hp.current / char.hp.max * 100 : 0;
  const hpColor = hpPct > 60 ? C.green : hpPct > 30 ? C.yellow : C.red;
  const mainClass = (char.classes || [])[0]?.name || "Fighter";
  const cc = DND.classColors[mainClass as keyof typeof DND.classColors] || C.gold;
  const isMulti = (char.classes || []).length > 1;

  return (
    <div className="hov-card" onClick={() => onOpen(char.id)}
      style={{ background: C.card, border: `1px solid ${C.border}`, overflow: "hidden", cursor: "pointer" }}>
      <div style={{ height: 2, background: cc, boxShadow: `0 0 8px ${cc}88` }} />
      <div style={{ padding: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.gold, letterSpacing: 1, marginBottom: 2 }}>{char.name || "UNNAMED"}</div>
            <div style={{ fontSize: 10, color: C.textDim, letterSpacing: 1 }}>
              {char.species} // LV.{lvl}
              {isMulti && <span style={{ marginLeft: 6, fontSize: 9, color: C.gold, border: `1px solid ${C.gold}55`, padding: "1px 4px", letterSpacing: 1 }}>MULTI</span>}
            </div>
          </div>
          <span style={{ color: cc, opacity: 0.7, fontSize: 18 }}>{DND_ICONS[mainClass as keyof typeof DND_ICONS]}</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
          {(char.classes || []).map((cl: CharClass, i: number) => {
            const clc = DND.classColors[cl.name as keyof typeof DND.classColors] || C.gold;
            return (
              <span key={i} style={{ fontSize: 9, background: clc + "22", border: `1px solid ${clc}44`, padding: "2px 7px", color: clc, letterSpacing: 1, display: "flex", alignItems: "center", gap: 3 }}>
                {DND_ICONS[cl.name as keyof typeof DND_ICONS]} {cl.name} {cl.level}
              </span>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <FullCircleHP current={char.hp.current} max={char.hp.max} color={hpColor} size={62} />
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
            {[["AC", char.ac], ["SPD", `${char.speed}ft`]].map(([l, v]) => (
              <div key={l} style={{ background: C.surface, border: `1px solid ${C.border}`, padding: "6px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 2 }}>{l}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={e => { e.stopPropagation(); if (confirm("Delete this character?")) onDelete(char.id); }}
          style={{ background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 9, padding: 0, width: "100%", textAlign: "right", fontFamily: "inherit", letterSpacing: 2, transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = C.red}
          onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
          [X] DELETE
        </button>
      </div>
    </div>
  );
}

// ─── CREATOR ─────────────────────────────────────────────────────────────────
const STEPS = ["Identity", "Species & Class", "Ability Scores", "Proficiencies", "Spells", "Background", "Review"];

interface CreatorProps {
  draft: CharType;
  setDraft: React.Dispatch<React.SetStateAction<CharType | null>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onFinish: () => void;
  onCancel: () => void;
}
function Creator({ draft, setDraft, step, setStep, onFinish, onCancel }: CreatorProps) {
  const C = useT();
  const inp = useInp();
  const set = (k: keyof CharType, v: any) => setDraft((d) => d ? { ...d, [k]: v } : d);
  const setN = (o: keyof CharType, k: string, v: any) => setDraft((d) => d ? { ...d, [o]: { ...(d as any)[o], [k]: v } } : d);
  const canNext = step === 0 ? !!draft.name.trim() : true;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "12px 24px", display: "flex", alignItems: "center", gap: 14 }}>
        <Btn onClick={onCancel}>← Back</Btn>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 3, marginBottom: 2 }}>STEP {step + 1} / {STEPS.length}</div>
          <div style={{ fontSize: 13, color: C.gold, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{STEPS[step]}</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {STEPS.map((_, i) => (
            <div key={i} className={i < step ? "hov-btn" : ""} onClick={() => i < step && setStep(i)}
              style={{ width: 26, height: 4, background: i === step ? C.gold : i < step ? C.goldDim : C.border, cursor: i < step ? "pointer" : "default", boxShadow: i === step ? `0 0 6px ${C.gold}` : "none" }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "28px 24px", maxWidth: 680, width: "100%", margin: "0 auto" }}>
        <div className="fade-up" key={step}>
          {step === 0 && <StepIdentity draft={draft} set={set} inp={inp} />}
          {step === 1 && <StepClass draft={draft} set={set} inp={inp} />}
          {step === 2 && <StepStats draft={draft} set={set} setN={setN} inp={inp} />}
          {step === 3 && <StepProfs draft={draft} set={set} inp={inp} />}
          {step === 4 && (
            <div>
              <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Spells</div>
              <SpellEditor spells={draft.spells} onChange={(s: any) => set("spells", s)} />
            </div>
          )}
          {step === 5 && <StepBackground draft={draft} set={set} setN={setN} inp={inp} />}
          {step === 6 && <ReviewCard char={draft} />}
        </div>
      </div>

      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "12px 24px", display: "flex", justifyContent: "space-between" }}>
        <Btn onClick={() => step > 0 ? setStep(step - 1) : onCancel()}>{step > 0 ? "← Back" : "Cancel"}</Btn>
        {step < STEPS.length - 1
          ? <Btn variant={canNext ? "gold" : "default"} disabled={!canNext} onClick={() => setStep(step + 1)}>Next →</Btn>
          : <Btn variant="gold" onClick={onFinish}>Create Character ✓</Btn>}
      </div>
    </div>
  );
}

interface StepIdentityProps {
  draft: CharType;
  set: (k: keyof CharType, v: any) => void;
  inp: any;
}
function StepIdentity({ draft, set, inp }: StepIdentityProps) {
  const C = useT();
  return (
    <div>
      <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 18 }}>Who are they?</div>
      <CLabel>Character Name *</CLabel>
      <input style={{ ...inp, fontSize: 18, padding: "10px 12px", letterSpacing: 2 }} placeholder="ENTER NAME..." value={draft.name} onChange={e => set("name", e.target.value)} autoFocus />
      <CLabel>Alignment</CLabel>
      <select style={inp} value={draft.alignment} onChange={e => set("alignment", e.target.value)}>
        {DND.alignments.map(a => <option key={a}>{a}</option>)}
      </select>
      {["Personality Traits", "personalityTraits", "Describe your character..."], ["Ideals", "ideals", "What drives them?"], ["Bonds", "bonds", "Who do they care about?"], ["Flaws", "flaws", "Their weakness..."]].map(([l, k, p]) => (
        <div key={k}><CLabel>{l}</CLabel><textarea style={inp} rows={2} placeholder={p} value={draft[k as keyof CharType]} onChange={e => set(k as keyof CharType, e.target.value)} /></div>
      ))}
    </div>
  );
}

interface StepClassProps {
  draft: CharType;
  set: (k: keyof CharType, v: any) => void;
  inp: any;
}
function StepClass({ draft, set, inp }: StepClassProps) {
  const C = useT();
  const updateClass = (idx: number, field: string, val: any) => { const cls = [...draft.classes]; cls[idx] = { ...cls[idx], [field]: val }; set("classes", cls); };
  const addClass = () => set("classes", [...draft.classes, { name: "Fighter", level: 1, subclass: "", subclassFeatures: "" }]);
  const removeClass = (idx: number) => set("classes", draft.classes.filter((_, i) => i !== idx));

  return (
    <div>
      <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 18 }}>Species & Class</div>
      <CLabel>Species</CLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))", gap: 5, marginBottom: 6 }}>
        {DND.species.map(s => <Chip key={s} active={draft.species === s && !draft.customSpecies} onClick={() => { set("species", s); set("customSpecies", ""); }}>{s}</Chip>)}
      </div>
      <CLabel>Custom Species</CLabel>
      <input style={{ ...inp, marginBottom: 20 }} placeholder="e.g. Kenku, Changeling..." value={draft.customSpecies || ""} onChange={e => set("customSpecies", e.target.value)} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2 }}>Classes</div>
        <Btn onClick={addClass} style={{ padding: "4px 10px", fontSize: 10 }}>+ Add Class</Btn>
      </div>

      {draft.classes.map((cl, idx) => {
        const def = DND.classes.find(c => c.name === cl.name) || DND.classes[0];
        const cc = DND.classColors[cl.name as keyof typeof DND.classColors] || C.gold;
        return (
          <div key={idx} style={{ background: C.card, border: `1px solid ${C.border}`, padding: 12, marginBottom: 10, borderLeft: `3px solid ${cc}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ color: cc }}>{DND_ICONS[cl.name as keyof typeof DND_ICONS]}</span>
              <span style={{ color: cc, fontWeight: 700, fontSize: 11, letterSpacing: 2 }}>CLASS_{idx + 1}</span>
              {idx > 0 && <Btn variant="danger" onClick={() => removeClass(idx)} style={{ marginLeft: "auto", padding: "3px 8px", fontSize: 9 }}>✕ Remove</Btn>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(82px,1fr))", gap: 4, marginBottom: 10 }}>
              {DND.classes.map(c => (
                <Chip key={c.name} active={cl.name === c.name} color={DND.classColors[c.name]} onClick={() => updateClass(idx, "name", c.name)}>
                  <div style={{ fontSize: 16 }}>{DND_ICONS[c.name]}</div>
                  <div style={{ fontSize: 10, letterSpacing: 1 }}>{c.name}</div>
                  <div style={{ fontSize: 9, opacity: 0.5 }}>d{c.hitDie}</div>
                </Chip>
              ))}
            </div>
            <CRow>
              <div style={{ width: 72 }}><CLabel>Level</CLabel>
                <input type="number" min={1} max={20} style={inp} value={cl.level} onChange={e => updateClass(idx, "level", Math.min(20, Math.max(1, +e.target.value)))} /></div>
              <div style={{ flex: 1 }}><CLabel>Subclass</CLabel>
                <select style={inp} value={cl.subclass || ""} onChange={e => updateClass(idx, "subclass", e.target.value)}>
                  <option value="">— Choose later —</option>
                  {def.subclasses.map(s => <option key={s}>{s}</option>)}
                </select></div>
            </CRow>
          </div>
        );
      })}
    </div>
  );
}

function StepStats({ draft, set, setN, inp }) {
  const C = useT();
  const labels = { str: "Strength", dex: "Dexterity", con: "Constitution", int: "Intelligence", wis: "Wisdom", cha: "Charisma" };
  return (
    <div>
      <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Ability Scores</div>
      <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: 1, marginBottom: 16 }}>Standard Array: 15, 14, 13, 12, 10, 8</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
        {["str", "dex", "con", "int", "wis", "cha"].map(s => (
          <div key={s} style={{ background: C.card, border: `1px solid ${C.border}`, padding: "12px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>{labels[s]}</div>
            <input type="number" min={1} max={30} value={draft.stats[s]} onChange={e => setN("stats", s, Math.min(30, Math.max(1, +e.target.value)))}
              style={{ ...inp, textAlign: "center", fontSize: 26, fontWeight: 700, padding: "4px" }} />
            <div style={{ marginTop: 6, fontSize: 13, color: C.gold, fontWeight: 700 }}>{fmt(mod(draft.stats[s]))}</div>
          </div>
        ))}
      </div>
      <CRow>
        <div style={{ flex: 1 }}><CLabel>Max HP</CLabel><input type="number" style={inp} value={draft.hp.max} onChange={e => { setN("hp", "max", +e.target.value); setN("hp", "current", +e.target.value); }} /></div>
        <div style={{ flex: 1 }}><CLabel>Armor Class</CLabel><input type="number" style={inp} value={draft.ac} onChange={e => set("ac", +e.target.value)} /></div>
        <div style={{ flex: 1 }}><CLabel>Speed (ft)</CLabel><input type="number" style={inp} value={draft.speed} onChange={e => set("speed", +e.target.value)} /></div>
      </CRow>
    </div>
  );
}

function StepProfs({ draft, set, inp }) {
  const C = useT();
  const lvl = totalLevel(draft);
  return (
    <div>
      <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Proficiencies</div>
      <CLabel>Saving Throws</CLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
        {["str", "dex", "con", "int", "wis", "cha"].map(s => {
          const a = draft.savingThrowProfs.includes(s);
          return <Chip key={s} active={a} onClick={() => set("savingThrowProfs", a ? draft.savingThrowProfs.filter(x => x !== s) : [...draft.savingThrowProfs, s])}>
            {s.toUpperCase()}
          </Chip>;
        })}
      </div>
      <CLabel>Skills</CLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {DND.skills.map(sk => {
          const a = draft.skillProfs.includes(sk);
          const bonus = mod(draft.stats[DND.skillStat[sk]]) + (a ? profB(lvl) : 0);
          return (
            <div key={sk} className="chip-toggle" onClick={() => set("skillProfs", a ? draft.skillProfs.filter(x => x !== sk) : [...draft.skillProfs, sk])}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 9px", background: a ? C.activeSkill : C.card, border: `1px solid ${a ? C.activeBorder : C.border}` }}>
              <div style={{ width: 8, height: 8, flexShrink: 0, background: a ? C.gold : "transparent", border: `1.5px solid ${a ? C.gold : C.textMuted}` }} />
              <span style={{ flex: 1, fontSize: 11, color: a ? C.text : C.textDim, letterSpacing: 0.5 }}>{sk}</span>
              <span style={{ fontSize: 9, color: C.textMuted }}>{DND.skillStat[sk].toUpperCase()}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: a ? C.gold : C.textMuted, minWidth: 22, textAlign: "right" }}>{fmt(bonus)}</span>
            </div>
          );
        })}
      </div>
      <CLabel>Languages</CLabel>
      <input style={inp} placeholder="Common, Elvish..." value={draft.languages} onChange={e => set("languages", e.target.value)} />
    </div>
  );
}

function StepBackground({ draft, set, setN, inp }) {
  const C = useT();
  return (
    <div>
      <div style={{ fontSize: 18, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Background & Equipment</div>
      <CLabel>Background</CLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(118px,1fr))", gap: 5, marginBottom: 14 }}>
        {DND.backgrounds.map(b => <Chip key={b.name} active={draft.background === b.name} onClick={() => set("background", b.name)}>
          <div style={{ fontWeight: 600 }}>{b.name}</div>
          <div style={{ fontSize: 9, opacity: 0.6 }}>{b.skills.join(", ")}</div>
        </Chip>)}
      </div>
      {[["Equipment & Inventory", "equipment", "List starting equipment..."], ["Features & Traits", "features", "Class features, feats..."], ["Notes", "notes", "Anything else..."]].map(([l, k, p]) => (
        <div key={k}><CLabel>{l}</CLabel><textarea style={inp} rows={3} placeholder={p} value={draft[k]} onChange={e => set(k, e.target.value)} /></div>
      ))}
      <CLabel>Currency</CLabel>
      <CRow>
        {[["CP", "cp"], ["SP", "sp"], ["GP", "gp"], ["PP", "pp"]].map(([l, k]) => (
          <div key={k} style={{ flex: 1 }}><CLabel>{l}</CLabel><input type="number" style={inp} value={draft.currency[k]} onChange={e => setN("currency", k, +e.target.value)} /></div>
        ))}
      </CRow>
    </div>
  );
}

function ReviewCard({ char }) {
  const C = useT();
  const lvl = totalLevel(char);
  return (
    <div>
      <div style={{ fontSize: 20, color: C.gold, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}>{char.name || "Unnamed"}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 18 }}>
        {char.classes.map((cl, i) => (
          <span key={i} style={{ background: (DND.classColors[cl.name] || C.gold) + "22", border: `1px solid ${(DND.classColors[cl.name] || C.gold)}55`, padding: "3px 10px", fontSize: 10, color: DND.classColors[cl.name] || C.gold, letterSpacing: 2 }}>
            {cl.name} {cl.level}
          </span>
        ))}
        <span style={{ border: `1px solid ${C.border}`, padding: "3px 10px", fontSize: 10, color: C.textDim }}>{char.customSpecies || char.species}</span>
        <span style={{ border: `1px solid ${C.border}`, padding: "3px 10px", fontSize: 10, color: C.textDim }}>LV {lvl}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6, marginBottom: 18 }}>
        {["str", "dex", "con", "int", "wis", "cha"].map(s => (
          <div key={s} style={{ background: C.card, border: `1px solid ${C.border}`, padding: "10px 4px", textAlign: "center" }}>
            <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 5 }}>{s}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{char.stats[s]}</div>
            <div style={{ fontSize: 11, color: C.gold }}>{fmt(mod(char.stats[s]))}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
        {[["HP", char.hp.max], ["AC", char.ac], ["Speed", `${char.speed}ft`], ["Prof Bonus", `+${profB(lvl)}`], ["Background", char.background], ["Alignment", char.alignment]].map(([l, v]) => (
          <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, padding: "8px 10px" }}>
            <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2 }}>{l}</div>
            <div style={{ fontSize: 13, color: C.text, marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SPELL EDITOR ─────────────────────────────────────────────────────────────
function SpellEditor({ spells, onChange }) {
  const C = useT();
  const inp = useInp();
  const [form, setForm] = useState({ name: "", level: 0, school: "Evocation", prepared: false, castingTime: "1 action", range: "60 ft", components: "V, S", duration: "Instantaneous", description: "" });
  const [openMap, setOpenMap] = useState({});
  const [schoolFilter, setSchoolFilter] = useState("all");

  const add = () => {
    if (!form.name.trim()) return;
    onChange([...spells, { ...form, id: uid() }]);
    setForm(f => ({ ...f, name: "", description: "" }));
  };
  const remove = (id) => onChange(spells.filter(s => s.id !== id));
  const togglePrepared = (id) => onChange(spells.map(s => s.id === id ? { ...s, prepared: !s.prepared } : s));
  const toggleOpen = (id) => setOpenMap(o => ({ ...o, [id]: !o[id] }));

  const filtered = schoolFilter === "all" ? spells : spells.filter(s => s.school === schoolFilter);
  const grouped = filtered.reduce((acc, s) => { (acc[s.level] = acc[s.level] || []).push(s); return acc; }, {});
  const activeSchools = DND.schools.filter(s => spells.some(sp => sp.school === s));

  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 14, marginBottom: 18 }}>
        <div style={{ fontSize: 10, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>// Add Spell</div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
          <div><CLabel>Name</CLabel><input style={inp} placeholder="e.g. Fireball" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} onKeyDown={e => e.key === "Enter" && add()} /></div>
          <div><CLabel>Level</CLabel>
            <select style={inp} value={form.level} onChange={e => setForm(f => ({ ...f, level: +e.target.value }))}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(l => <option key={l} value={l}>{levelLabel(l)}</option>)}
            </select></div>
          <div><CLabel>School</CLabel>
            <select style={inp} value={form.school} onChange={e => setForm(f => ({ ...f, school: e.target.value }))}>
              {DND.schools.map(s => <option key={s}>{s}</option>)}
            </select></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
          {[["Casting Time", "castingTime"], ["Range", "range"], ["Components", "components"], ["Duration", "duration"]].map(([l, k]) => (
            <div key={k}><CLabel>{l}</CLabel><input style={inp} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} /></div>
          ))}
        </div>
        <CLabel>Description</CLabel>
        <textarea style={inp} rows={3} placeholder="Effects, higher level scaling..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 7, color: C.textDim, fontSize: 11, cursor: "pointer", letterSpacing: 1 }}>
            <input type="checkbox" checked={form.prepared} onChange={e => setForm(f => ({ ...f, prepared: e.target.checked }))} />
            Mark as Prepared
          </label>
          <Btn variant="gold" onClick={add}>+ Add Spell</Btn>
        </div>
      </div>

      {spells.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
          <button className="hov-btn" onClick={() => setSchoolFilter("all")}
            style={{ background: schoolFilter === "all" ? C.gold + "22" : "transparent", border: `1px solid ${schoolFilter === "all" ? C.gold : C.border}`, color: schoolFilter === "all" ? C.gold : C.textDim, padding: "3px 10px", fontSize: 10, fontFamily: "inherit", letterSpacing: 2, borderRadius: 0 }}>
            ALL ({spells.length})
          </button>
          {activeSchools.map(s => {
            const sc = DND.spellColors[s] || C.gold;
            const a = schoolFilter === s;
            return (
              <button key={s} className="hov-btn" onClick={() => setSchoolFilter(a ? "all" : s)}
                style={{ background: a ? sc + "22" : "transparent", border: `1px solid ${a ? sc : C.border}`, color: a ? sc : C.textDim, padding: "3px 10px", fontSize: 10, fontFamily: "inherit", letterSpacing: 1, borderRadius: 0 }}>
                {s} ({spells.filter((sp: any) => sp.school === s).length})
              </button>
            );
          })}
        </div>
      )}

      {Object.keys(grouped).sort((a, b) => +a - +b).map(lvl => {
        const grp = grouped[lvl] || [];
        if (!grp.length) return null;
        return (
          <div key={lvl} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 9, color: C.gold, textTransform: "uppercase", letterSpacing: 3, fontWeight: 700 }}>{levelLabel(+lvl)}</div>
              <div style={{ flex: 1, height: 1, background: C.border }} />
              <div style={{ fontSize: 9, color: C.textMuted }}>{grp.length} spell{grp.length !== 1 ? "s" : ""}</div>
            </div>
            {grp.map(sp => {
              const sc = DND.spellColors[sp.school] || C.gold;
              return (
                <div key={sp.id} style={{ background: C.card, border: `1px solid ${C.border}`, marginBottom: 5, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", cursor: "pointer" }} onClick={() => toggleOpen(sp.id)}>
                    <div style={{ width: 3, alignSelf: "stretch", background: sc, flexShrink: 0 }} />
                    <div className="hov-btn" onClick={e => { e.stopPropagation(); togglePrepared(sp.id); }}
                      style={{ width: 11, height: 11, border: `2px solid ${sp.prepared ? C.gold : C.textMuted}`, background: sp.prepared ? C.gold : "transparent", flexShrink: 0, padding: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 7, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, color: C.text, fontWeight: 600, letterSpacing: 1 }}>{sp.name}</span>
                        <span style={{ fontSize: 9, color: sc, background: sc + "22", padding: "1px 5px", letterSpacing: 1 }}>{sp.school}</span>
                        {sp.range && <span style={{ fontSize: 9, color: C.textMuted }}>{sp.range}</span>}
                      </div>
                      <div style={{ fontSize: 9, color: C.textMuted, marginTop: 1 }}>{sp.castingTime} · {sp.components} · {sp.duration}</div>
                    </div>
                    <span style={{ fontSize: 10, color: C.textMuted, display: "inline-block", transform: openMap[sp.id] ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                    <button onClick={e => { e.stopPropagation(); remove(sp.id); }}
                      style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 12, padding: "0 3px", fontFamily: "inherit", transition: "color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.color = C.red}
                      onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>✕</button>
                  </div>
                  {openMap[sp.id] && (
                    <div style={{ padding: "8px 14px 12px", borderTop: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{sp.description || <span style={{ color: C.textMuted, fontStyle: "italic" }}>No description.</span>}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      {spells.length === 0 && <div style={{ textAlign: "center", padding: "32px 0", color: C.textMuted, fontSize: 11, letterSpacing: 2 }}>NO SPELLS IN DATABASE</div>}
    </div>
  );
}

// ─── SHEET ────────────────────────────────────────────────────────────────────
function Sheet({ char, onChange, onBack }) {
  const C = useT();
  const inp = useInp();
  const [tab, setTab] = useState("core");
  const [editing, setEditing] = useState(false);

  const set = (k, v) => onChange({ ...char, [k]: v });
  const setN = (o, k, v) => onChange({ ...char, [o]: { ...char[o], [k]: v } });
  const lvl = totalLevel(char);
  const pb = profB(lvl);
  const getSave = (s) => mod(char.stats[s]) + (char.savingThrowProfs.includes(s) ? pb : 0);
  const getSkill = (sk) => mod(char.stats[DND.skillStat[sk]]) + (char.skillProfs.includes(sk) ? pb : 0);
  const hpPct = char.hp.max ? char.hp.current / char.hp.max * 100 : 0;
  const hpColor = hpPct > 60 ? C.green : hpPct > 30 ? C.yellow : C.red;
  const TABS = ["core", "skills", "spells", "character"];
  const updateClass = (idx, field, val) => { const cls = [...(char.classes || [])]; cls[idx] = { ...cls[idx], [field]: val }; set("classes", cls); };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "11px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Btn onClick={onBack}>← Back</Btn>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, color: C.gold, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>{char.name}</div>
            <div style={{ fontSize: 9, color: C.textMuted, display: "flex", gap: 6, flexWrap: "wrap", marginTop: 2, letterSpacing: 2, alignItems: "center" }}>
              <span>{char.customSpecies || char.species}</span>
              {(char.classes || []).map((cl, i) => (
                <span key={i} style={{ color: DND.classColors[cl.name] || C.gold }}>· {cl.name} {cl.level}</span>
              ))}
              <span>· LV {lvl}</span>
            </div>
          </div>
          <Btn variant={editing ? "gold" : "default"} onClick={() => setEditing(e => !e)}>{editing ? "✓ Done" : "✎ Edit"}</Btn>
        </div>
      </div>

      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "14px 20px" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <FullCircleHP current={char.hp.current} max={char.hp.max} color={hpColor} size={90} />
            {!editing ? (
              <div style={{ display: "flex", gap: 5 }}>
                <Btn onClick={() => setN("hp", "current", Math.max(0, char.hp.current - 1))} style={{ padding: "3px 10px" }}>−</Btn>
                <Btn onClick={() => setN("hp", "current", Math.min(char.hp.max, char.hp.current + 1))} style={{ padding: "3px 10px" }}>+</Btn>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <input type="number" value={char.hp.current} onChange={e => setN("hp", "current", +e.target.value)} style={{ ...inp, width: 50, textAlign: "center" }} />
                <span style={{ color: C.textMuted }}>/</span>
                <input type="number" value={char.hp.max} onChange={e => setN("hp", "max", +e.target.value)} style={{ ...inp, width: 50, textAlign: "center" }} />
              </div>
            )}
          </div>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {[["AC", "ac", char.ac], ["SPEED", "speed", `${char.speed}ft`], ["INIT", null, fmt(char.initiative + mod(char.stats.dex))], ["PROF", null, `+${pb}`]].map(([label, path, val]) => (
              <div key={label} style={{ background: C.surface, border: `1px solid ${C.border}`, padding: "9px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 3, marginBottom: 3 }}>{label}</div>
                {editing && path
                  ? <input type="number" value={char[path]} onChange={e => set(path, +e.target.value)} style={{ ...inp, textAlign: "center", fontSize: 17, padding: "2px" }} />
                  : <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{val}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, background: C.surface }}>
        {TABS.map(t => (
          <button key={t} className="hov-btn" onClick={() => setTab(t)}
            style={{ background: "transparent", border: "none", borderBottom: `2px solid ${tab === t ? C.gold : "transparent"}`, color: tab === t ? C.gold : C.textMuted, padding: "10px 18px", cursor: "pointer", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, fontFamily: "inherit" }}>
            {([
              ["Personality Traits", "personalityTraits", "Describe your character..."],
              ["Ideals", "ideals", "What drives them?"],
              ["Bonds", "bonds", "Who do they care about?"],
              ["Flaws", "flaws", "Their weakness..."]
            ] as [string, keyof CharType, string][]).map(([l, k, p]) => (
              <div key={k}><CLabel>{l}</CLabel><textarea style={inp} rows={2} placeholder={p} value={draft[k]} onChange={e => set(k, e.target.value)} /></div>
            ))}
            ] as [string, keyof CharType, string][]).map(([l, k, p]) => (
              <div key={k}><CLabel>{l}</CLabel><textarea style={inp} rows={2} placeholder={p} value={draft[k]} onChange={e => set(k, e.target.value)} /></div>
            ))}
            ] as [string, keyof CharType, string][]).map(([l, k, p]) => (
              <div key={k}><CLabel>{l}</CLabel><textarea style={inp} rows={2} placeholder={p} value={draft[k]} onChange={e => set(k, e.target.value)} /></div>
            ))}
          {tab === "core" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 7, marginBottom: 14 }}>
                {["str", "dex", "con", "int", "wis", "cha"].map(s => (
                  <div key={s} style={{ background: C.card, border: `1px solid ${C.border}`, padding: "10px 5px", textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 5 }}>{s}</div>
                    {editing
                      ? <input type="number" value={char.stats[s]} min={1} max={30} onChange={e => onChange({ ...char, stats: { ...char.stats, [s]: +e.target.value } })} style={{ ...inp, textAlign: "center", fontSize: 20, padding: "3px 2px" }} />
                      : <div style={{ fontSize: 24, fontWeight: 700, color: C.text }}>{char.stats[s]}</div>}
                    <div style={{ marginTop: 5, background: C.surface, padding: "1px 6px", display: "inline-block", border: `1px solid ${C.border}`, fontSize: 11, color: C.gold }}>{fmt(mod(char.stats[s]))}</div>
                    <div style={{ marginTop: 7, display: "flex", gap: 3, justifyContent: "center", alignItems: "center" }}>
                      <div className="hov-btn" onClick={() => onChange({ ...char, savingThrowProfs: char.savingThrowProfs.includes(s) ? char.savingThrowProfs.filter((x: string) => x !== s) : [...char.savingThrowProfs, s] })}
                        style={{ width: 9, height: 9, cursor: "pointer", border: `1px solid ${C.textMuted}`, background: char.savingThrowProfs.includes(s) ? C.gold : "transparent", transition: "all 0.15s" }} />
                      <span style={{ fontSize: 8, color: C.textMuted }}>SAVE {fmt(getSave(s))}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7, marginBottom: 12 }}>
                {[["Passive Perc.", 10 + getSkill("Perception")], ["Prof Bonus", `+${pb}`], ["Inspiration", char.inspiration ? "★ YES" : "No"]].map(([l, v]) => (
                  <div key={l} className={l === "Inspiration" ? "hov-btn" : ""} onClick={() => l === "Inspiration" && set("inspiration", !char.inspiration)}
                    style={{ background: C.card, border: `1px solid ${l === "Inspiration" && char.inspiration ? C.gold : C.border}`, padding: "9px 12px", textAlign: "center", cursor: l === "Inspiration" ? "pointer" : "default", boxShadow: l === "Inspiration" && char.inspiration ? `0 0 10px ${C.gold}44` : "none" }}>
                    <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 3 }}>{l}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: l === "Inspiration" && char.inspiration ? C.gold : C.text }}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 12 }}>
                  <SecHdr>Death Saves</SecHdr>
                  <div style={{ display: "flex", gap: 20 }}>
                    {[["Successes", "successes", C.green], ["Failures", "failures", C.red]].map(([label, key, color]) => (
                      <div key={key}>
                        <div style={{ fontSize: 9, color: C.textMuted, marginBottom: 5 }}>{label}</div>
                        <div style={{ display: "flex", gap: 5 }}>
                          {[0, 1, 2].map(i => (
                            <div key={i} className="hov-btn" onClick={() => setN("deathSaves", key, i + 1 === char.deathSaves[key] ? i : i + 1)}
                              style={{ width: 17, height: 17, cursor: "pointer", border: `2px solid ${i < char.deathSaves[key] ? color : C.textMuted}`, background: i < char.deathSaves[key] ? color : "transparent", transition: "all 0.15s" }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 12 }}>
                  <SecHdr>Temporary HP</SecHdr>
                  <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                    <input type="number" value={char.hp.temp} onChange={e => setN("hp", "temp", Math.max(0, +e.target.value))} style={{ ...inp, width: 80 }} />
                    {char.hp.temp > 0 && <span style={{ color: C.blue, fontSize: 11 }}>+{char.hp.temp} temp</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "skills" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {DND.skills.map(sk => {
                const a = char.skillProfs.includes(sk);
                const m = getSkill(sk);
                return (
                  <div key={sk} className="chip-toggle" onClick={() => set("skillProfs", a ? char.skillProfs.filter(x => x !== sk) : [...char.skillProfs, sk])}
                    style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 10px", background: a ? C.activeSkill : C.card, border: `1px solid ${a ? C.activeBorder : C.border}` }}>
                    <div style={{ width: 9, height: 9, flexShrink: 0, background: a ? C.gold : "transparent", border: `2px solid ${a ? C.gold : C.textMuted}`, transition: "all 0.15s" }} />
                    <span style={{ flex: 1, fontSize: 12, color: a ? C.text : C.textDim }}>{sk}</span>
                    <span style={{ fontSize: 9, color: C.textMuted }}>{DND.skillStat[sk].toUpperCase()}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: a ? C.gold : C.textMuted, minWidth: 24, textAlign: "right" }}>{fmt(m)}</span>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "spells" && <SpellEditor spells={char.spells || []} onChange={(s: any[]) => set("spells", s)} />}

          {tab === "character" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div>
                <SecHdr>Classes</SecHdr>
                {(char.classes || []).map((cl, idx) => {
                  const cc = DND.classColors[cl.name] || C.gold;
                  const def = DND.classes.find(c => c.name === cl.name) || { subclasses: [] };
                  return (
                    <div key={idx} style={{ background: C.card, border: `1px solid ${C.border}`, padding: 11, marginBottom: 7, borderLeft: `3px solid ${cc}` }}>
                      <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 7 }}>
                        <span style={{ color: cc }}>{DND_ICONS[cl.name]}</span>
                        {editing ? (
                          <>
                            <select value={cl.name} onChange={e => updateClass(idx, "name", e.target.value)} style={{ ...inp, flex: 1 }}>
                              {DND.classes.map(c => <option key={c.name}>{c.name}</option>)}
                            </select>
                            <input type="number" min={1} max={20} value={cl.level} onChange={e => updateClass(idx, "level", +e.target.value)} style={{ ...inp, width: 56 }} />
                          </>
                        ) : <span style={{ color: cc, fontWeight: 700, letterSpacing: 2, fontSize: 11 }}>{cl.name} {cl.level}</span>}
                      </div>
                      <input style={{ ...inp, marginBottom: 5 }} placeholder="Subclass name..."
                        value={cl.subclass || ""} onChange={e => updateClass(idx, "subclass", e.target.value)} disabled={!editing} />
                      <textarea style={{ ...inp, minHeight: 30 }} placeholder="Subclass features..."
                        value={cl.subclassFeatures || ""} onChange={e => updateClass(idx, "subclassFeatures", e.target.value)} disabled={!editing} />
                    </div>
                  );
                })}
                {editing && <Btn onClick={() => set("classes", [...(char.classes || []), { name: "Fighter", level: 1, subclass: "", subclassFeatures: "" }])} style={{ width: "100%", marginBottom: 10, padding: "6px" }}>+ Add Class</Btn>}

                <SecHdr mt={14}>Identity</SecHdr>
                {editing ? (
                  [["Name", "name", "text"], ["Species", "species", "text"], ["Background", "background", "text"], ["Alignment", "alignment", "text"], ["Languages", "languages", "text"], ["XP", "xp", "number"], ["Initiative Bonus", "initiative", "number"]].map(([l, k, t]) => (
                    <div key={k} style={{ marginBottom: 7 }}>
                      <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 2 }}>{l}</div>
                      <input type={t} value={char[k] ?? ""} onChange={e => set(k, t === "number" ? +e.target.value : e.target.value)} style={inp} />
                    </div>
                  ))
                ) : (
                  [["Species", char.customSpecies || char.species], ["Background", char.background], ["Alignment", char.alignment], ["Languages", char.languages], ["XP", char.xp]].map(([l, v]) => (
                    <div key={l} style={{ marginBottom: 9 }}>
                      <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 2 }}>{l}</div>
                      <div style={{ color: C.text, fontSize: 12 }}>{v || "—"}</div>
                    </div>
                  ))
                )}
              </div>

              <div>
                <SecHdr>Personality</SecHdr>
                {[["Traits", "personalityTraits"], ["Ideals", "ideals"], ["Bonds", "bonds"], ["Flaws", "flaws"]].map(([label, key]) => (
                  <div key={key} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 3 }}>{label}</div>
                    {editing
                      ? <textarea value={char[key] || ""} onChange={e => set(key, e.target.value)} rows={2} style={inp} />
                      : <div style={{ color: C.textDim, fontSize: 11, lineHeight: 1.6 }}>{char[key] || <span style={{ color: C.textMuted }}>—</span>}</div>}
                  </div>
                ))}
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <SecHdr>Features & Equipment</SecHdr>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
                  {[["Features & Traits", "features"], ["Equipment", "equipment"], ["Notes", "notes"]].map(([label, key]) => (
                    <div key={key}>
                      <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 3 }}>{label}</div>
                      {editing
                        ? <textarea value={char[key] || ""} onChange={e => set(key, e.target.value)} rows={4} style={inp} />
                        : <div style={{ color: C.textDim, fontSize: 11, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{char[key] || <span style={{ color: C.textMuted }}>—</span>}</div>}
                    </div>
                  ))}
                </div>
                <SecHdr>Currency</SecHdr>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["CP", "cp", "#b87333"], ["SP", "sp", "#aaa9ad"], ["GP", "gp", "#ffd700"], ["PP", "pp", "#e5e4e2"]].map(([label, key, color]) => (
                    <div key={key} style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, padding: "9px 12px", textAlign: "center" }}>
                      <div style={{ fontSize: 9, color, textTransform: "uppercase", letterSpacing: 3, marginBottom: 3, fontWeight: 700 }}>{label}</div>
                      {editing
                        ? <input type="number" value={char.currency[key]} onChange={e => setN("currency", key, +e.target.value)} style={{ ...inp, textAlign: "center", fontSize: 17 }} />
                        : <div style={{ fontSize: 20, fontWeight: 700, color }}>{char.currency[key]}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}