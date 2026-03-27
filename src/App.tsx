import { useState, useEffect, createContext, useContext } from "react";
import { FiUsers, FiStar, FiZap, FiMap, FiShield, FiWind, FiMusic, FiBookOpen, FiFeather, FiCrosshair, FiHeart, FiEye, FiBook, FiAperture, FiUser, FiAward } from "react-icons/fi";

// ─── THEMES ──────────────────────────────────────────────────────────────────
const THEMES = {
  storm: { name:"Storm", bg:"#0b0c10", surface:"#111217", card:"#16171b", border:"#2b2e35", borderHover:"#5a6070", gold:"#c6b6f0", goldDim:"#9c8cd3", text:"#e6e6ee", textDim:"#9ea0ab", textMuted:"#7b7e89", red:"#f28b9b", green:"#6fbf9a", yellow:"#f4d07a", blue:"#9aaef8", activeSkill:"#1e1a2e", activeBorder:"#5a4e8a" },
  miku: { name:"Miku", bg:"#071018", surface:"#05242b", card:"#08333b", border:"#0f5e66", borderHover:"#19c0cc", gold:"#00d2d6", goldDim:"#00a5a9", text:"#e6fbff", textDim:"#9fd8dc", textMuted:"#4a8e92", red:"#ff9bb3", green:"#6ef7b5", yellow:"#ffd67a", blue:"#7dd3fc", activeSkill:"#052830", activeBorder:"#0f8e96" },
  parchment: { 
  name: "Kawaii Pink", 
  bg: "#fff0f6",        // soft pink background
  surface: "#ffe4f0",   // slightly darker card surface
  card: "#ffd6ea",      // light pink cards
  border: "#ffbfdc",    // pastel pink borders
  borderHover: "#ff8fcf", // brighter pink on hover
  gold: "#ff6fb3",      // cute accent color
  goldDim: "#ff97c2",   // softer accent
  text: "#9b1554",      // deep pink text
  textDim: "#d87aa6",   // lighter text for dim info
  textMuted: "#f2c6db", // muted text
  red: "#ff4d6d",       // cute red
  green: "#6bd687",     // soft green accent
  yellow: "#ffe066",    // pastel yellow
  blue: "#85d1ff",      // soft blue
  activeSkill: "#ffd6ea", // highlight for active skill
  activeBorder: "#ff6fb3" // active border accent
},
};

const ThemeCtx = createContext(THEMES.dark);
const useT = () => useContext(ThemeCtx);

// ─── D&D 2024 DATA ────────────────────────────────────────────────────────────
const DND = {
  classes: [
    { name:"Barbarian", hitDie:12, saves:["str","con"], spellcaster:false, subclasses:["Path of the Berserker","Path of the Totem Warrior","Path of the Wild Heart","Path of the World Tree","Path of the Zealot"] },
    { name:"Bard", hitDie:8, saves:["dex","cha"], spellcaster:true, spellStat:"cha", subclasses:["College of Dance","College of Glamour","College of Lore","College of Valor","College of Spirits"] },
    { name:"Cleric", hitDie:8, saves:["wis","cha"], spellcaster:true, spellStat:"wis", subclasses:["Life Domain","Light Domain","Trickery Domain","War Domain","Knowledge Domain","Nature Domain","Tempest Domain","Death Domain"] },
    { name:"Druid", hitDie:8, saves:["int","wis"], spellcaster:true, spellStat:"wis", subclasses:["Circle of the Land","Circle of the Moon","Circle of the Sea","Circle of Stars","Circle of Wildfire"] },
    { name:"Fighter", hitDie:10, saves:["str","con"], spellcaster:false, subclasses:["Battle Master","Champion","Eldritch Knight","Psi Warrior","Echo Knight","Rune Knight"] },
    { name:"Monk", hitDie:8, saves:["str","dex"], spellcaster:false, subclasses:["Warrior of the Open Hand","Warrior of Shadow","Warrior of the Elements","Warrior of Mercy"] },
    { name:"Paladin", hitDie:10, saves:["wis","cha"], spellcaster:true, spellStat:"cha", subclasses:["Oath of Devotion","Oath of the Ancients","Oath of Glory","Oath of Vengeance","Oath of Conquest","Oathbreaker"] },
    { name:"Ranger", hitDie:10, saves:["str","dex"], spellcaster:true, spellStat:"wis", subclasses:["Beast Master","Fey Wanderer","Gloom Stalker","Hunter","Swarmkeeper"] },
    { name:"Rogue", hitDie:8, saves:["dex","int"], spellcaster:false, subclasses:["Arcane Trickster","Assassin","Soulknife","Swashbuckler","Thief"] },
    { name:"Sorcerer", hitDie:6, saves:["con","cha"], spellcaster:true, spellStat:"cha", subclasses:["Aberrant Mind","Clockwork Soul","Draconic Bloodline","Wild Magic","Storm Sorcery"] },
    { name:"Warlock", hitDie:8, saves:["wis","cha"], spellcaster:true, spellStat:"cha", subclasses:["The Archfey","The Celestial","The Fiend","The Great Old One","The Undying"] },
    { name:"Wizard", hitDie:6, saves:["int","wis"], spellcaster:true, spellStat:"int", subclasses:["School of Abjuration","School of Conjuration","School of Divination","School of Enchantment","School of Evocation","School of Illusion","School of Necromancy","School of Transmutation","Bladesinging","Order of Scribes"] },
  ],
  species: ["Aasimar","Dragonborn","Dwarf","Elf","Gnome","Goliath","Halfling","Human","Orc","Tiefling","Ardling","Autognome","Githyanki","Astral Elf","Plasmoid"],
  backgrounds: [
    {name:"Acolyte",skills:["Insight","Religion"]},{name:"Artisan",skills:["Investigation","Persuasion"]},
    {name:"Charlatan",skills:["Deception","Sleight of Hand"]},{name:"Criminal",skills:["Deception","Stealth"]},
    {name:"Entertainer",skills:["Acrobatics","Performance"]},{name:"Farmer",skills:["Animal Handling","Nature"]},
    {name:"Guard",skills:["Athletics","Perception"]},{name:"Guide",skills:["Stealth","Survival"]},
    {name:"Hermit",skills:["Medicine","Religion"]},{name:"Merchant",skills:["Animal Handling","Persuasion"]},
    {name:"Noble",skills:["History","Persuasion"]},{name:"Sage",skills:["Arcana","History"]},
    {name:"Sailor",skills:["Acrobatics","Perception"]},{name:"Soldier",skills:["Athletics","Intimidation"]},
    {name:"Scribe",skills:["Investigation","Perception"]},{name:"Wayfarer",skills:["Insight","Stealth"]},
  ],
  alignments:["Lawful Good","Neutral Good","Chaotic Good","Lawful Neutral","True Neutral","Chaotic Neutral","Lawful Evil","Neutral Evil","Chaotic Evil"],
  schools:["Abjuration","Conjuration","Divination","Enchantment","Evocation","Illusion","Necromancy","Transmutation"],
  skills:["Acrobatics","Animal Handling","Arcana","Athletics","Deception","History","Insight","Intimidation","Investigation","Medicine","Nature","Perception","Performance","Persuasion","Religion","Sleight of Hand","Stealth","Survival"],
  skillStat:{"Acrobatics":"dex","Animal Handling":"wis","Arcana":"int","Athletics":"str","Deception":"cha","History":"int","Insight":"wis","Intimidation":"cha","Investigation":"int","Medicine":"wis","Nature":"int","Perception":"wis","Performance":"cha","Persuasion":"cha","Religion":"int","Sleight of Hand":"dex","Stealth":"dex","Survival":"wis"},
  icons:{"Barbarian":"⚔","Bard":"🎵","Cleric":"✝","Druid":"🌿","Fighter":"🛡","Monk":"☯","Paladin":"⚜","Ranger":"🏹","Rogue":"🗡","Sorcerer":"✨","Warlock":"👁","Wizard":"📖"},
  classColors:{"Barbarian":"#ef4444","Bard":"#a855f7","Cleric":"#f59e0b","Druid":"#22c55e","Fighter":"#6b7280","Monk":"#06b6d4","Paladin":"#eab308","Ranger":"#84cc16","Rogue":"#64748b","Sorcerer":"#ec4899","Warlock":"#8b5cf6","Wizard":"#3b82f6"},
  spellColors:{"Abjuration":"#3b82f6","Conjuration":"#8b5cf6","Divination":"#06b6d4","Enchantment":"#ec4899","Evocation":"#ef4444","Illusion":"#a855f7","Necromancy":"#22c55e","Transmutation":"#f59e0b"},
};

// Replace DND.icons with React icon components
const DND_ICONS = {
  Barbarian: <FiCrosshair />,
  Bard: <FiMusic />,
  Cleric: <FiAward />,
  Druid: <FiFeather />,
  Fighter: <FiShield />,
  Monk: <FiAperture />,
  Paladin: <FiHeart />,
  Ranger: <FiWind />,
  Rogue: <FiUser />,
  Sorcerer: <FiZap />,
  Warlock: <FiEye />,
  Wizard: <FiBookOpen />,
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const mod = s => Math.floor((s-10)/2);
const fmt = n => n>=0?`+${n}`:`${n}`;
const uid = () => Math.random().toString(36).slice(2,10);
const profB = lvl => Math.ceil(lvl/4)+1;
const STORE = "dnd2024_v3";
const loadLS = () => { try { return JSON.parse(localStorage.getItem(STORE))||[]; } catch { return []; } };
const saveLS = cs => localStorage.setItem(STORE, JSON.stringify(cs));
const totalLevel = char => (char.classes||[{level:char.level||1}]).reduce((s,c)=>s+(c.level||0),0);
const levelLabel = l => l===0?"Cantrip":`Level ${l}`;
const blank = () => ({
  id:uid(), name:"", species:"Human", classes:[{name:"Fighter",level:1,subclass:""}],
  background:"Soldier", alignment:"True Neutral", xp:0,
  stats:{str:10,dex:10,con:10,int:10,wis:10,cha:10},
  hp:{current:10,max:10,temp:0}, ac:10, speed:30, initiative:0,
  inspiration:false, deathSaves:{successes:0,failures:0},
  savingThrowProfs:[], skillProfs:[], languages:"Common",
  personalityTraits:"", ideals:"", bonds:"", flaws:"",
  features:"", equipment:"", spells:[], currency:{cp:0,sp:0,gp:0,pp:0},
  notes:"", createdAt:Date.now(),
});

// ─── CSS ─────────────────────────────────────────────────────────────────────
const GlobalCSS = () => (
  <style>{`
    *{box-sizing:border-box;}body{margin:0;}
    ::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:#3a3028;border-radius:3px;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
    .fade-up{animation:fadeUp 0.2s ease forwards;}
    .hov-card{transition:transform 0.18s,box-shadow 0.18s,border-color 0.18s!important;}
    .hov-card:hover{transform:translateY(-5px)!important;box-shadow:0 10px 28px rgba(0,0,0,0.35)!important;}
    .hov-btn{transition:background 0.14s,transform 0.12s,box-shadow 0.14s,border-color 0.14s,opacity 0.14s!important;cursor:pointer;}
    .hov-btn:hover{transform:scale(1.04)!important;opacity:0.92!important;}
    .hov-btn:active{transform:scale(0.96)!important;}
    .hov-glow:hover{box-shadow:0 0 14px rgba(201,169,110,0.22)!important;border-color:rgba(201,169,110,0.5)!important;}
    .chip-toggle{transition:background 0.13s,border-color 0.13s,color 0.13s,transform 0.11s!important;cursor:pointer;user-select:none;}
    .chip-toggle:hover{transform:scale(1.05)!important;}
    .chip-toggle:active{transform:scale(0.95)!important;}
    .tab-btn{transition:color 0.15s,border-color 0.15s,background 0.15s!important;}
    .tab-btn:hover{background:rgba(201,169,110,0.07)!important;}
    input:focus,select:focus,textarea:focus{outline:none;border-color:rgba(201,169,110,0.5)!important;}
    textarea{font-family:inherit;}
    input[type=number]::-webkit-inner-spin-button{opacity:0.3;}
  `}</style>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [themeKey, setThemeKey] = useState(() => localStorage.getItem("dnd_theme")||"dark");
  const C = THEMES[themeKey]||THEMES.dark;
  useEffect(()=>{ localStorage.setItem("dnd_theme",themeKey); },[themeKey]);

  const [chars, setChars] = useState(loadLS);
  const [view, setView] = useState("roster");
  const [activeId, setActiveId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [step, setStep] = useState(0);
  useEffect(()=>{ saveLS(chars); },[chars]);

  const saveChar = char => setChars(cs => cs.find(c=>c.id===char.id)?cs.map(c=>c.id===char.id?char:c):[...cs,char]);
  const deleteChar = id => setChars(cs=>cs.filter(c=>c.id!==id));

  return (
    <ThemeCtx.Provider value={C}>
      <GlobalCSS />
      <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
        {view==="roster" && <Roster chars={chars} themeKey={themeKey} setThemeKey={setThemeKey}
          onCreate={()=>{ setDraft(blank()); setStep(0); setView("create"); }}
          onOpen={id=>{ setActiveId(id); setView("sheet"); }}
          onDelete={deleteChar} />}
        {view==="create" && draft && <Creator draft={draft} setDraft={setDraft} step={step} setStep={setStep}
          onFinish={()=>{ saveChar(draft); setActiveId(draft.id); setView("sheet"); }}
          onCancel={()=>setView("roster")} />}
        {view==="sheet" && (()=>{
          const char = chars.find(c=>c.id===activeId);
          if(!char){ setView("roster"); return null; }
          return <Sheet char={char} onChange={saveChar} onBack={()=>setView("roster")} />;
        })()}
      </div>
    </ThemeCtx.Provider>
  );
}

// ─── FULL CIRCLE HP ──────────────────────────────────────────────────────────
function FullCircleHP({ current, max, color, size = 88 }) {
  const pct = max ? Math.max(0, Math.min(1, current / max)) : 0;
  const r = size * 0.41;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} overflow="visible">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={size * 0.09} />
        {pct > 0 && (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={size * 0.09}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 5px ${color}99)` }}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )}
      </svg>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: size * 0.21, fontWeight: 700, color, fontFamily: "Georgia,serif" }}>{current}</div>
        <div style={{ fontSize: size * 0.13, color: "rgba(255,255,255,0.25)" }}>/ {max}</div>
      </div>
    </div>
  );
}

// ─── ROSTER ──────────────────────────────────────────────────────────────────
function Roster({ chars, onCreate, onOpen, onDelete, themeKey, setThemeKey }) {
  const C = useT();
  const [search, setSearch] = useState("");
  const filtered = chars.filter(c=>(c.name||"").toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fade-up" style={{minHeight:"100vh",background:C.bg,padding:"30px 32px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:54,height:54,borderRadius:16,background:`linear-gradient(135deg,${C.gold},${C.goldDim})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,boxShadow:`0 6px 20px ${C.gold}44`}}>
              <FiBookOpen />
            </div>
            <div>
              <h1 style={{margin:0,fontSize:28,fontFamily:"Georgia,serif",color:C.gold,letterSpacing:1}}>D&D 2024 Manager</h1>
              <p style={{margin:"3px 0 0",color:C.textMuted,fontSize:13}}>Track your party · Manage spells · Stay alive</p>
            </div>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{display:"flex",gap:5,background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"4px 6px"}}>
              {Object.entries(THEMES).map(([k,t])=>(
                <button key={k} className="hov-btn" onClick={()=>setThemeKey(k)} title={t.name}
                  style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${k===themeKey?C.gold:"transparent"}`,background:t.gold,padding:0,boxShadow:k===themeKey?`0 0 7px ${t.gold}99`:"none"}} />
              ))}
            </div>
            <button className="hov-btn" onClick={onCreate}
              style={{background:C.gold,border:"none",color:"#0d0b08",borderRadius:9,padding:"10px 22px",fontSize:14,fontWeight:700,fontFamily:"inherit",boxShadow:`0 4px 14px ${C.gold}55`}}>
              + New Character
            </button>
          </div>
        </div>

        {/* Stats strip */}
        {chars.length>0&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
            {[
              ["Adventurers", chars.length, <FiUsers key="users" />],
              ["Avg Level", chars.length?Math.round(chars.reduce((s,c)=>s+totalLevel(c),0)/chars.length):0, <FiStar key="star" />],
              ["Spells Known", chars.reduce((s,c)=>s+(c.spells||[]).length,0), <FiZap key="zap" />],
              ["Unique Classes", new Set(chars.flatMap(c=>(c.classes||[]).map(cl=>cl.name))).size, <FiBookOpen key="book" />],
            ].map(([l,v,ic])=>(
              <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:24}}>{ic}</span>
                <div><div style={{fontSize:24,fontWeight:700,color:C.gold,fontFamily:"Georgia,serif",lineHeight:1}}>{v}</div>
                <div style={{fontSize:11,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginTop:2}}>{l}</div></div>
              </div>
            ))}
          </div>
        )}

        {chars.length>3&&(
          <input placeholder="Search adventurers..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,padding:"9px 14px",fontSize:13,width:"100%",marginBottom:20,fontFamily:"inherit"}} />
        )}

        {chars.length===0?(
          <div style={{textAlign:"center",padding:"100px 0",color:C.textMuted}}>
            <div style={{fontSize:72,marginBottom:20,opacity:0.3}}><FiMap /></div>
            <p style={{fontSize:20,color:C.textDim,marginBottom:8,fontFamily:"Georgia,serif"}}>The tavern is empty.</p>
            <p style={{fontSize:13,marginBottom:28}}>Create your first adventurer to begin your journey.</p>
            <button className="hov-btn" onClick={onCreate}
              style={{background:C.gold,border:"none",color:"#0d0b08",borderRadius:9,padding:"13px 32px",fontSize:15,fontWeight:700,fontFamily:"inherit",boxShadow:`0 6px 20px ${C.gold}55`}}>
              Create Your First Character
            </button>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(275px,1fr))",gap:18}}>
            {filtered.map(c=><CharCard key={c.id} char={c} onOpen={onOpen} onDelete={onDelete}/>)}
          </div>
        )}
      </div>
    </div>
  );
}

function CharCard({ char, onOpen, onDelete }) {
  const C = useT();
  const lvl = totalLevel(char);
  const hpPct = char.hp.max?Math.max(0,Math.min(100,char.hp.current/char.hp.max*100)):0;
  const hpColor = hpPct>60?C.green:hpPct>30?C.yellow:C.red;
  const mainClass = (char.classes||[])[0]?.name||"Fighter";
  const cc = DND.classColors[mainClass]||C.gold;
  const isMulti = (char.classes||[]).length>1;

  return (
    <div className="hov-card" onClick={()=>onOpen(char.id)}
      style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",cursor:"pointer",position:"relative"}}>
      <div style={{height:4,background:`linear-gradient(90deg,${cc},${cc}66)`}}/>
      <div style={{padding:"15px 16px 13px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:C.gold,fontFamily:"Georgia,serif",marginBottom:3}}>{char.name||"Unnamed"}</div>
            <div style={{fontSize:12,color:C.textDim}}>
              {char.customSpecies||char.species} · Lv {lvl}
              {isMulti&&<span style={{marginLeft:6,fontSize:10,color:C.gold,border:`1px solid ${C.gold}55`,borderRadius:4,padding:"1px 5px"}}>MULTI</span>}
            </div>
          </div>
          <div style={{fontSize:26,opacity:0.65}}>{DND_ICONS[mainClass]||<FiCrosshair />}</div>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>
          {(char.classes||[{name:mainClass,level:lvl}]).map((cl,i)=>(
            <span key={i} style={{fontSize:10,background:`${DND.classColors[cl.name]||C.gold}22`,border:`1px solid ${DND.classColors[cl.name]||C.gold}44`,borderRadius:20,padding:"2px 8px",color:DND.classColors[cl.name]||C.gold,display:'flex',alignItems:'center',gap:4}}>
              {DND_ICONS[cl.name]||<FiCrosshair />} {cl.name} {cl.level}
            </span>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <FullCircleHP current={char.hp.current} max={char.hp.max} color={hpColor} size={66}/>
          <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {[
              [<FiShield key="ac" />,"AC",char.ac],
              [<FiWind key="speed" />,"Speed",`${char.speed}ft`],
            ].map(([icon,label,v])=>(
              <div key={label} style={{background:C.surface,borderRadius:8,padding:"7px 10px",textAlign:"center",display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div style={{fontSize:14,color:C.textMuted,display:'flex',alignItems:'center',gap:4}}>{icon} {label}</div>
                <div style={{fontSize:16,fontWeight:700,color:C.text,fontFamily:"Georgia,serif"}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={e=>{e.stopPropagation();if(confirm("Delete this character?"))onDelete(char.id);}}
          style={{background:"transparent",border:"none",color:C.textMuted,cursor:"pointer",fontSize:11,padding:0,width:"100%",textAlign:"right",transition:"color 0.15s",fontFamily:"inherit"}}
          onMouseEnter={e=>e.currentTarget.style.color=C.red} onMouseLeave={e=>e.currentTarget.style.color=C.textMuted}>
          ✕ delete
        </button>
      </div>
    </div>
  );
}

// ─── SHARED UI ───────────────────────────────────────────────────────────────
function CLabel({children}){
  const C=useT();
  return <div style={{fontSize:11,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:5,marginTop:13}}>{children}</div>;
}
function CRow({children,gap=12}){ return <div style={{display:"flex",gap}}>{children}</div>; }
function SecHdr({children,mt=4}){
  const C=useT();
  return <div style={{fontSize:11,color:C.textMuted,textTransform:"uppercase",letterSpacing:2,marginBottom:10,paddingBottom:5,borderBottom:`1px solid ${C.border}`,marginTop:mt}}>{children}</div>;
}
function Chip({children,active,onClick,color}){
  const C=useT();
  return (
    <div className="chip-toggle" onClick={onClick}
      style={{padding:"8px 10px",borderRadius:8,textAlign:"center",fontSize:12,lineHeight:1.4,
        background:active?(color||C.gold)+"22":"transparent",
        border:`1px solid ${active?(color||C.gold):C.border}`,
        color:active?(color||C.gold):C.textDim}}>
      {children}
    </div>
  );
}
function Btn({children,onClick,variant="default",style={},className="hov-btn",disabled=false}){
  const C=useT();
  const styles = {
    gold:{background:C.gold,border:"none",color:"#0d0b08",fontWeight:700,boxShadow:`0 3px 10px ${C.gold}44`},
    danger:{background:"transparent",border:`1px solid ${C.red}`,color:C.red},
    default:{background:"transparent",border:`1px solid ${C.border}`,color:C.textDim},
    ghost:{background:"transparent",border:"none",color:C.textDim},
  };
  return (
    <button className={className} onClick={onClick} disabled={disabled}
      style={{...styles[variant],borderRadius:8,padding:"8px 18px",fontSize:13,fontFamily:"inherit",cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.45:1,...style}}>
      {children}
    </button>
  );
}

// ─── CREATOR ─────────────────────────────────────────────────────────────────
const STEPS = ["Identity","Species & Class","Ability Scores","Proficiencies","Spells","Background","Review"];

function Creator({draft,setDraft,step,setStep,onFinish,onCancel}){
  const C=useT();
  const set=(k,v)=>setDraft(d=>({...d,[k]:v}));
  const setN=(o,k,v)=>setDraft(d=>({...d,[o]:{...d[o],[k]:v}}));
  const canNext = step===0?!!draft.name.trim():true;
  const inp={background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,padding:"8px 11px",fontSize:13,width:"100%",fontFamily:"inherit"};

  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"14px 28px",display:"flex",alignItems:"center",gap:16}}>
        <Btn onClick={onCancel}>← Back</Btn>
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:C.textMuted,letterSpacing:1,textTransform:"uppercase",marginBottom:2}}>Step {step+1} / {STEPS.length}</div>
          <div style={{fontSize:16,color:C.gold,fontFamily:"Georgia,serif",fontWeight:700}}>{STEPS[step]}</div>
        </div>
        <div style={{display:"flex",gap:5}}>
          {STEPS.map((_,i)=>(
            <div key={i} className="hov-btn" onClick={()=>i<step&&setStep(i)}
              style={{width:28,height:7,borderRadius:4,background:i===step?C.gold:i<step?C.goldDim:C.border,cursor:i<step?"pointer":"default",transition:"background 0.2s"}}/>
          ))}
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"32px 28px",maxWidth:700,width:"100%",margin:"0 auto"}}>
        <div className="fade-up" key={step}>
          {step===0&&<CreatorIdentity draft={draft} set={set} inp={inp}/>}
          {step===1&&<CreatorClass draft={draft} set={set} inp={inp}/>}
          {step===2&&<CreatorStats draft={draft} set={set} setN={setN} inp={inp}/>}
          {step===3&&<CreatorProfs draft={draft} set={set} inp={inp}/>}
          {step===4&&<div><h2 style={{margin:"0 0 16px",fontFamily:"Georgia,serif",color:C.gold,fontSize:24}}>Spells</h2><SpellEditor spells={draft.spells} onChange={s=>set("spells",s)}/></div>}
          {step===5&&<CreatorBg draft={draft} set={set} setN={setN} inp={inp}/>}
          {step===6&&<ReviewCard char={draft}/>}
        </div>
      </div>

      <div style={{background:C.surface,borderTop:`1px solid ${C.border}`,padding:"14px 28px",display:"flex",justifyContent:"space-between"}}>
        <Btn onClick={()=>step>0?setStep(s=>s-1):onCancel()}>{step>0?"← Back":"Cancel"}</Btn>
        {step<STEPS.length-1
          ?<Btn variant={canNext?"gold":"default"} disabled={!canNext} onClick={()=>canNext&&setStep(s=>s+1)}>Next →</Btn>
          :<Btn variant="gold" onClick={onFinish}>Create Character ✓</Btn>}
      </div>
    </div>
  );
}

function CreatorIdentity({draft,set,inp}){
  const C=useT();
  return (
    <div>
      <h2 style={{margin:"0 0 20px",fontFamily:"Georgia,serif",color:C.gold,fontSize:24}}>Who are they?</h2>
      <CLabel>Character Name *</CLabel>
      <input style={{...inp,fontSize:22,padding:"10px 14px",fontFamily:"Georgia,serif"}} placeholder="Enter a name..." value={draft.name} onChange={e=>set("name",e.target.value)} autoFocus/>
      <CRow>
        <div style={{flex:1}}><CLabel>Alignment</CLabel>
          <select style={inp} value={draft.alignment} onChange={e=>set("alignment",e.target.value)}>
            {DND.alignments.map(a=><option key={a}>{a}</option>)}
          </select></div>
      </CRow>
      {[["Personality Traits","personalityTraits","Describe your character..."],["Ideals","ideals","What drives them?"],["Bonds","bonds","Who do they care about?"],["Flaws","flaws","Their weakness..."]].map(([l,k,p])=>(
        <div key={k}><CLabel>{l}</CLabel><textarea style={{...inp,resize:"vertical"}} rows={2} placeholder={p} value={draft[k]} onChange={e=>set(k,e.target.value)}/></div>
      ))}
    </div>
  );
}

function CreatorClass({draft,set,inp}){
  const C=useT();
  const updateClass=(idx,field,val)=>{ const cls=[...(draft.classes||[])]; cls[idx]={...cls[idx],[field]:val}; set("classes",cls); };
  const addClass=()=>set("classes",[...(draft.classes||[]),{name:"Fighter",level:1,subclass:""}]);
  const removeClass=idx=>set("classes",(draft.classes||[]).filter((_,i)=>i!==idx));

  return (
    <div>
      <h2 style={{margin:"0 0 20px",fontFamily:"Georgia,serif",color:C.gold,fontSize:24}}>Species & Class</h2>
      <CLabel>Species</CLabel>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(108px,1fr))",gap:6,marginBottom:8}}>
        {DND.species.map(s=><Chip key={s} active={draft.species===s&&!draft.customSpecies} onClick={()=>{ set("species",s); set("customSpecies",""); }}>{s}</Chip>)}
      </div>
      <CLabel>Custom Species (optional)</CLabel>
      <input style={{...inp,marginBottom:24}} placeholder="e.g. Kenku, Changeling..." value={draft.customSpecies||""} onChange={e=>set("customSpecies",e.target.value)}/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:11,color:C.textMuted,textTransform:"uppercase",letterSpacing:1}}>Classes — multiclass supported</div>
        <Btn onClick={addClass} style={{padding:"4px 12px",fontSize:12}}>+ Add Class</Btn>
      </div>

      {(draft.classes||[]).map((cl,idx)=>{
        const def=DND.classes.find(c=>c.name===cl.name)||DND.classes[0];
        const cc=DND.classColors[cl.name]||C.gold;
        return (
          <div key={idx} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:14,marginBottom:10,borderLeft:`3px solid ${cc}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:18}}>{DND_ICONS[cl.name]||"⚔"}</span>
              <span style={{color:cc,fontWeight:700,fontSize:14}}>Class {idx+1}</span>
              {idx>0&&<Btn variant="danger" onClick={()=>removeClass(idx)} style={{marginLeft:"auto",padding:"3px 10px",fontSize:11}}>✕ Remove</Btn>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(90px,1fr))",gap:5,marginBottom:10}}>
              {DND.classes.map(c=>(
                <Chip key={c.name} active={cl.name===c.name} color={DND.classColors[c.name]} onClick={()=>updateClass(idx,"name",c.name)}>
                  <div style={{fontSize:18}}>{DND_ICONS[c.name]}</div>
                  <div style={{fontSize:11,fontWeight:600}}>{c.name}</div>
                  <div style={{fontSize:10,opacity:0.6}}>d{c.hitDie}</div>
                </Chip>
              ))}
            </div>
            <CRow>
              <div style={{width:80}}><CLabel>Level</CLabel>
                <input type="number" min={1} max={20} style={inp} value={cl.level} onChange={e=>updateClass(idx,"level",Math.min(20,Math.max(1,+e.target.value)))}/></div>
              <div style={{flex:1}}><CLabel>Subclass</CLabel>
                <select style={inp} value={cl.subclass||""} onChange={e=>updateClass(idx,"subclass",e.target.value)}>
                  <option value="">— Choose later —</option>
                  {def.subclasses.map(s=><option key={s}>{s}</option>)}
                </select></div>
            </CRow>
          </div>
        );
      })}
    </div>
  );
}

function CreatorStats({draft,set,setN,inp}){
  const C=useT();
  const labels={str:"Strength",dex:"Dexterity",con:"Constitution",int:"Intelligence",wis:"Wisdom",cha:"Charisma"};
  return (
    <div>
      <h2 style={{margin:"0 0 6px",fontFamily:"Georgia,serif",color:C.gold,fontSize:24}}>Ability Scores</h2>
      <p style={{color:C.textDim,fontSize:13,marginTop:0,marginBottom:16}}>Standard Array: 15, 14, 13, 12, 10, 8</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
        {["str","dex","con","int","wis","cha"].map(s=>(
          <div key={s} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 10px",textAlign:"center"}}>
            <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{labels[s]}</div>
            <input type="number" min={1} max={30} value={draft.stats[s]} onChange={e=>setN("stats",s,Math.min(30,Math.max(1,+e.target.value)))}
              style={{...inp,textAlign:"center",fontSize:28,fontWeight:700,padding:"4px",fontFamily:"Georgia,serif"}}/>
            <div style={{marginTop:8,fontSize:14,color:C.gold,fontWeight:700}}>{fmt(mod(draft.stats[s]))}</div>
          </div>
        ))}
      </div>
      <CRow>
        <div style={{flex:1}}><CLabel>Max HP</CLabel><input type="number" style={inp} value={draft.hp.max} onChange={e=>{ setN("hp","max",+e.target.value); setN("hp","current",+e.target.value); }}/></div>
        <div style={{flex:1}}><CLabel>Armor Class</CLabel><input type="number" style={inp} value={draft.ac} onChange={e=>set("ac",+e.target.value)}/></div>
        <div style={{flex:1}}><CLabel>Speed (ft)</CLabel><input type="number" style={inp} value={draft.speed} onChange={e=>set("speed",+e.target.value)}/></div>
      </CRow>
    </div>
  );
}

function CreatorProfs({draft,set,inp}){
  const C=useT();
  const lvl=totalLevel(draft);
  return (
    <div>
      <h2 style={{margin:"0 0 16px",fontFamily:"Georgia,serif",color:C.gold,fontSize:24}}>Proficiencies</h2>
      <CLabel>Saving Throws</CLabel>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
        {["str","dex","con","int","wis","cha"].map(s=>{
          const a=draft.savingThrowProfs.includes(s);
          return <Chip key={s} active={a} onClick={()=>set("savingThrowProfs",a?draft.savingThrowProfs.filter(x=>x!==s):[...draft.savingThrowProfs,s])}>
            {{str:"STR",dex:"DEX",con:"CON",int:"INT",wis:"WIS",cha:"CHA"}[s]}
          </Chip>;
        })}
      </div>
      <CLabel>Skills</CLabel>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
        {DND.skills.map(sk=>{
          const a=draft.skillProfs.includes(sk);
          const bonus=mod(draft.stats[DND.skillStat[sk]])+(a?profB(lvl):0);
          return (
            <div key={sk} className="chip-toggle" onClick={()=>set("skillProfs",a?draft.skillProfs.filter(x=>x!==sk):[...draft.skillProfs,sk])}
              style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:7,background:a?C.activeSkill:C.card,border:`1px solid ${a?C.activeBorder:C.border}`}}>
              <div style={{width:9,height:9,borderRadius:"50%",flexShrink:0,background:a?C.gold:"transparent",border:`1.5px solid ${a?C.gold:C.textMuted}`}}/>
              <span style={{flex:1,fontSize:13,color:a?C.text:C.textDim}}>{sk}</span>
              <span style={{fontSize:10,color:C.textMuted}}>{DND.skillStat[sk].toUpperCase()}</span>
              <span style={{fontSize:13,fontWeight:600,color:a?C.gold:C.textMuted,minWidth:24,textAlign:"right"}}>{fmt(bonus)}</span>
            </div>
          );
        })}
      </div>
      <CLabel>Languages</CLabel>
      <input style={inp} placeholder="Common, Elvish..." value={draft.languages} onChange={e=>set("languages",e.target.value)}/>
    </div>
  );
}

function CreatorBg({draft,set,setN,inp}){
  const C=useT();
  return (
    <div>
      <h2 style={{margin:"0 0 16px",fontFamily:"Georgia,serif",color:C.gold,fontSize:24}}>Background & Equipment</h2>
      <CLabel>Background</CLabel>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(126px,1fr))",gap:6,marginBottom:16}}>
        {DND.backgrounds.map(b=><Chip key={b.name} active={draft.background===b.name} onClick={()=>set("background",b.name)}>
          <div style={{fontWeight:600}}>{b.name}</div><div style={{fontSize:10,opacity:0.6}}>{b.skills.join(", ")}</div>
        </Chip>)}
      </div>
      {[["Equipment & Inventory","equipment","List starting equipment..."],["Features & Traits","features","Class features, feats..."],["Notes","notes","Anything else..."]].map(([l,k,p])=>(
        <div key={k}><CLabel>{l}</CLabel><textarea style={{...inp,resize:"vertical"}} rows={3} placeholder={p} value={draft[k]} onChange={e=>set(k,e.target.value)}/></div>
      ))}
      <CLabel>Currency</CLabel>
      <CRow>
        {[["CP","cp"],["SP","sp"],["GP","gp"],["PP","pp"]].map(([l,k])=>(
          <div key={k} style={{flex:1}}><CLabel>{l}</CLabel><input type="number" style={inp} value={draft.currency[k]} onChange={e=>setN("currency",k,+e.target.value)}/></div>
        ))}
      </CRow>
    </div>
  );
}

function ReviewCard({char}){
  const C=useT();
  const lvl=totalLevel(char);
  return (
    <div>
      <h2 style={{margin:"0 0 16px",fontFamily:"Georgia,serif",color:C.gold,fontSize:26}}>{char.name||"Unnamed"}</h2>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
        {(char.classes||[]).map((cl,i)=>(
          <span key={i} style={{background:`${DND.classColors[cl.name]||C.gold}22`,border:`1px solid ${DND.classColors[cl.name]||C.gold}55`,borderRadius:20,padding:"3px 12px",fontSize:13,color:DND.classColors[cl.name]||C.gold}}>
            {cl.name} {cl.level}
          </span>
        ))}
        <span style={{border:`1px solid ${C.border}`,borderRadius:20,padding:"3px 12px",fontSize:13,color:C.textDim}}>{char.customSpecies||char.species}</span>
        <span style={{border:`1px solid ${C.border}`,borderRadius:20,padding:"3px 12px",fontSize:13,color:C.textDim}}>Lv {lvl}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:20}}>
        {["str","dex","con","int","wis","cha"].map(s=>(
          <div key={s} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 6px",textAlign:"center"}}>
            <div style={{fontSize:9,color:C.textMuted,textTransform:"uppercase",letterSpacing:1}}>{s}</div>
            <div style={{fontSize:20,fontWeight:700,color:C.text,fontFamily:"Georgia,serif"}}>{char.stats[s]}</div>
            <div style={{fontSize:12,color:C.gold}}>{fmt(mod(char.stats[s]))}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
        {[["HP",char.hp.max],["AC",char.ac],["Speed",`${char.speed}ft`],["Prof Bonus",`+${profB(lvl)}`],["Background",char.background],["Alignment",char.alignment]].map(([l,v])=>(
          <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 12px"}}>
            <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:1}}>{l}</div>
            <div style={{fontSize:14,color:C.text,marginTop:2}}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SPELL EDITOR ─────────────────────────────────────────────────────────────
function SpellEditor({spells,onChange}){
  const C=useT();
  const [form,setForm]=useState({name:"",level:0,school:"Evocation",prepared:false,castingTime:"1 action",range:"60 ft",components:"V, S",duration:"Instantaneous",description:""});
  const [open,setOpen]=useState({});
  const [schoolFilter,setSchoolFilter]=useState("all");
  const inp={background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,padding:"7px 10px",fontSize:13,width:"100%",fontFamily:"inherit"};

  const add=()=>{ if(!form.name.trim())return; onChange([...spells,{...form,id:uid()}]); setForm(f=>({...f,name:"",description:""})); };
  const remove=id=>onChange(spells.filter(s=>s.id!==id));
  const togglePrepared=id=>onChange(spells.map(s=>s.id===id?{...s,prepared:!s.prepared}:s));
  const toggleOpen=id=>setOpen(o=>({...o,[id]:!o[id]}));

  const filtered=schoolFilter==="all"?spells:spells.filter(s=>s.school===schoolFilter);
  const grouped=filtered.reduce((acc,s)=>{ (acc[s.level]=acc[s.level]||[]).push(s); return acc; },{});
  const activeSchools=DND.schools.filter(s=>spells.some(sp=>sp.school===s));

  return (
    <div>
      {/* Add form */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:20}}>
        <div style={{fontSize:12,color:C.gold,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Add Spell</div>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:10,marginBottom:10}}>
          <div><CLabel>Name</CLabel><input style={inp} placeholder="e.g. Fireball" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&add()}/></div>
          <div><CLabel>Level</CLabel>
            <select style={inp} value={form.level} onChange={e=>setForm(f=>({...f,level:+e.target.value}))}>
              {[0,1,2,3,4,5,6,7,8,9].map(l=><option key={l} value={l}>{levelLabel(l)}</option>)}
            </select></div>
          <div><CLabel>School</CLabel>
            <select style={inp} value={form.school} onChange={e=>setForm(f=>({...f,school:e.target.value}))}>
              {DND.schools.map(s=><option key={s}>{s}</option>)}
            </select></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
          {[["Casting Time","castingTime"],["Range","range"],["Components","components"],["Duration","duration"]].map(([l,k])=>(
            <div key={k}><CLabel>{l}</CLabel><input style={inp} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/></div>
          ))}
        </div>
        <CLabel>Description</CLabel>
        <textarea style={{...inp,resize:"vertical"}} rows={3} placeholder="Effects, higher level scaling..." value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12}}>
          <label style={{display:"flex",alignItems:"center",gap:8,color:C.textDim,fontSize:13,cursor:"pointer"}}>
            <input type="checkbox" checked={form.prepared} onChange={e=>setForm(f=>({...f,prepared:e.target.checked}))}/>
            Mark as Prepared
          </label>
          <Btn variant="gold" onClick={add}>+ Add Spell</Btn>
        </div>
      </div>

      {/* School filter */}
      {spells.length>0&&(
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
          <button className="hov-btn" onClick={()=>setSchoolFilter("all")}
            style={{background:schoolFilter==="all"?C.gold+"22":"transparent",border:`1px solid ${schoolFilter==="all"?C.gold:C.border}`,color:schoolFilter==="all"?C.gold:C.textDim,borderRadius:20,padding:"4px 12px",fontSize:12,fontFamily:"inherit"}}>
            All ({spells.length})
          </button>
          {activeSchools.map(s=>{
            const sc=DND.spellColors[s]||C.gold;
            const a=schoolFilter===s;
            return (
              <button key={s} className="hov-btn" onClick={()=>setSchoolFilter(a?"all":s)}
                style={{background:a?sc+"22":"transparent",border:`1px solid ${a?sc:C.border}`,color:a?sc:C.textDim,borderRadius:20,padding:"4px 12px",fontSize:12,fontFamily:"inherit"}}>
                {s} ({spells.filter(sp=>sp.school===s).length})
              </button>
            );
          })}
        </div>
      )}

      {/* Spell list by level */}
      {Object.keys(grouped).sort((a,b)=>+a-+b).map(lvl=>{
        const grp=grouped[lvl]||[];
        if(!grp.length)return null;
        return (
          <div key={lvl} style={{marginBottom:18}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <div style={{fontSize:11,color:C.textMuted,textTransform:"uppercase",letterSpacing:2,fontWeight:700,whiteSpace:"nowrap"}}>{levelLabel(+lvl)}</div>
              <div style={{flex:1,height:1,background:C.border}}/>
              <div style={{fontSize:11,color:C.textMuted}}>{grp.length} spell{grp.length!==1?"s":""}</div>
            </div>
            {grp.map(sp=>{
              const sc=DND.spellColors[sp.school]||C.gold;
              return (
                <div key={sp.id} className="hov-glow" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:9,marginBottom:6,overflow:"hidden",transition:"all 0.15s"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer"}} onClick={()=>toggleOpen(sp.id)}>
                    <div style={{width:4,alignSelf:"stretch",borderRadius:2,background:sc,flexShrink:0}}/>
                    <div className="hov-btn" onClick={e=>{e.stopPropagation();togglePrepared(sp.id);}}
                      style={{width:13,height:13,borderRadius:"50%",border:`2px solid ${sp.prepared?C.gold:C.textMuted}`,background:sp.prepared?C.gold:"transparent",flexShrink:0,transition:"all 0.15s",padding:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"baseline",gap:8,flexWrap:"wrap"}}>
                        <span style={{fontSize:14,color:C.text,fontWeight:600}}>{sp.name}</span>
                        <span style={{fontSize:11,color:sc,background:sc+"22",borderRadius:4,padding:"1px 6px"}}>{sp.school}</span>
                        {sp.range&&<span style={{fontSize:11,color:C.textMuted}}>{sp.range}</span>}
                      </div>
                      <div style={{fontSize:11,color:C.textMuted,marginTop:2}}>{sp.castingTime} · {sp.components} · {sp.duration}</div>
                    </div>
                    <span style={{fontSize:12,color:C.textMuted,display:"inline-block",transform:open[sp.id]?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}}>▾</span>
                    <button onClick={e=>{e.stopPropagation();remove(sp.id);}} style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:14,padding:"0 4px",fontFamily:"inherit",transition:"color 0.15s"}}
                      onMouseEnter={e=>e.currentTarget.style.color=C.red} onMouseLeave={e=>e.currentTarget.style.color=C.textMuted}>✕</button>
                  </div>
                  {open[sp.id]&&(
                    <div style={{padding:"0 14px 14px",borderTop:`1px solid ${C.border}`,paddingTop:12}}>
                      <div style={{fontSize:13,color:C.textDim,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{sp.description||<span style={{color:C.textMuted,fontStyle:"italic"}}>No description provided.</span>}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      {spells.length===0&&<div style={{textAlign:"center",padding:"36px 0",color:C.textMuted,fontSize:13}}>No spells added yet.</div>}
    </div>
  );
}

// ─── SHEET ────────────────────────────────────────────────────────────────────
function Sheet({char,onChange,onBack}){
  const C=useT();
  const [tab,setTab]=useState("core");
  const [editing,setEditing]=useState(false);

  const set=(k,v)=>onChange({...char,[k]:v});
  const setN=(o,k,v)=>onChange({...char,[o]:{...char[o],[k]:v}});
  const lvl=totalLevel(char);
  const pb2=profB(lvl);
  const getSave=s=>mod(char.stats[s])+(char.savingThrowProfs.includes(s)?pb2:0);
  const getSkill=sk=>mod(char.stats[DND.skillStat[sk]])+(char.skillProfs.includes(sk)?pb2:0);
  const hpPct=char.hp.max?Math.max(0,Math.min(100,char.hp.current/char.hp.max*100)):0;
  const hpColor=hpPct>60?C.green:hpPct>30?C.yellow:C.red;
  const TABS=["core","skills","spells","character"];
  const inp={background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,padding:"7px 10px",fontSize:13,width:"100%",fontFamily:"inherit"};
  const updateClass=(idx,field,val)=>{ const cls=[...(char.classes||[])]; cls[idx]={...cls[idx],[field]:val}; set("classes",cls); };

  return (
    <div style={{minHeight:"100vh",background:C.bg}}>
      {/* Header */}
      <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"12px 22px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Btn onClick={onBack}>← Back</Btn>
          <div style={{flex:1}}>
            <div style={{fontSize:20,color:C.gold,fontFamily:"Georgia,serif",fontWeight:700}}>{char.name}</div>
            <div style={{fontSize:12,color:C.textMuted,display:"flex",gap:6,flexWrap:"wrap",marginTop:2}}>
              <span>{char.customSpecies||char.species}</span>·
              {(char.classes||[]).map((cl,i)=>(
                <span key={i} style={{color:DND.classColors[cl.name]||C.gold}}>{DND_ICONS[cl.name]} {cl.name} {cl.level}</span>
              ))}
              · Lv {lvl}
            </div>
          </div>
          <Btn variant={editing?"gold":"default"} onClick={()=>setEditing(e=>!e)}>{editing?"✓ Done":"✎ Edit"}</Btn>
        </div>
      </div>

      {/* Combat bar */}
      <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"16px 22px"}}>
        <div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap",maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
            <FullCircleHP current={char.hp.current} max={char.hp.max} color={hpColor} size={96}/>
            {!editing?(
              <div style={{display:"flex",gap:6}}>
                <Btn onClick={()=>setN("hp","current",Math.max(0,char.hp.current-1))} style={{padding:"3px 12px"}}>−</Btn>
                <Btn onClick={()=>setN("hp","current",Math.min(char.hp.max,char.hp.current+1))} style={{padding:"3px 12px"}}>+</Btn>
              </div>
            ):(
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <input type="number" value={char.hp.current} onChange={e=>setN("hp","current",+e.target.value)} style={{...inp,width:52,textAlign:"center"}}/>
                <span style={{color:C.textMuted}}>/</span>
                <input type="number" value={char.hp.max} onChange={e=>setN("hp","max",+e.target.value)} style={{...inp,width:52,textAlign:"center"}}/>
              </div>
            )}
          </div>
          <div style={{flex:1,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,minWidth:0}}>
            {[["🛡 Armor Class","ac",char.ac],["💨 Speed","speed",`${char.speed}ft`],["⚡ Initiative","initiative",fmt(char.initiative+mod(char.stats.dex))],["📖 Prof Bonus",null,`+${pb2}`]].map(([label,path,val])=>(
              <div key={label} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
                <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{label}</div>
                {editing&&path?(
                  <input type="number" value={char[path]} onChange={e=>set(path,+e.target.value)} style={{...inp,textAlign:"center",fontSize:18,padding:"3px"}}/>
                ):<div style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"Georgia,serif"}}>{val}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,paddingLeft:20,background:C.surface}}>
        {TABS.map(t=>(
          <button key={t} className="tab-btn" onClick={()=>setTab(t)}
            style={{background:"transparent",border:"none",borderBottom:`2px solid ${tab===t?C.gold:"transparent"}`,color:tab===t?C.gold:C.textMuted,padding:"11px 18px",cursor:"pointer",fontSize:13,textTransform:"capitalize",fontFamily:"inherit"}}>
            {t}
          </button>
        ))}
      </div>

      <div style={{padding:"22px",maxWidth:900,margin:"0 auto"}}>
        <div className="fade-up" key={tab}>

          {tab==="core"&&(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:16}}>
                {["str","dex","con","int","wis","cha"].map(s=>(
                  <div key={s} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 6px",textAlign:"center"}}>
                    <div style={{fontSize:9,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{s}</div>
                    {editing?<input type="number" value={char.stats[s]} min={1} max={30} onChange={e=>onChange({...char,stats:{...char.stats,[s]:+e.target.value}})} style={{...inp,textAlign:"center",fontSize:20,fontWeight:700,padding:"4px 2px"}}/>
                    :<div style={{fontSize:26,fontWeight:700,color:C.text,fontFamily:"Georgia,serif"}}>{char.stats[s]}</div>}
                    <div style={{marginTop:6,background:C.surface,borderRadius:20,padding:"2px 8px",display:"inline-block",border:`1px solid ${C.border}`,fontSize:12,color:C.gold}}>{fmt(mod(char.stats[s]))}</div>
                    <div style={{marginTop:8,display:"flex",gap:3,justifyContent:"center",alignItems:"center"}}>
                      <div className="hov-btn" onClick={()=>!editing&&onChange({...char,savingThrowProfs:char.savingThrowProfs.includes(s)?char.savingThrowProfs.filter(x=>x!==s):[...char.savingThrowProfs,s]})}
                        style={{width:9,height:9,borderRadius:"50%",cursor:"pointer",border:`1px solid ${C.textMuted}`,background:char.savingThrowProfs.includes(s)?C.gold:"transparent",transition:"all 0.15s"}}/>
                      <span style={{fontSize:9,color:C.textMuted}}>SAVE {fmt(getSave(s))}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                {[["Passive Perception",10+getSkill("Perception")],["Proficiency Bonus",`+${pb2}`],["Inspiration",char.inspiration?"★ Inspired!":"No"]].map(([l,v])=>(
                  <div key={l} className={l==="Inspiration"?"hov-btn":""} onClick={()=>l==="Inspiration"&&set("inspiration",!char.inspiration)}
                    style={{background:C.card,border:`1px solid ${l==="Inspiration"&&char.inspiration?C.gold:C.border}`,borderRadius:8,padding:"10px 14px",textAlign:"center",cursor:l==="Inspiration"?"pointer":"default"}}>
                    <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{l}</div>
                    <div style={{fontSize:20,fontWeight:700,color:l==="Inspiration"&&char.inspiration?C.gold:C.text}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:14}}>
                  <SecHdr>Death Saves</SecHdr>
                  <div style={{display:"flex",gap:24}}>
                    {[["Successes","successes",C.green],["Failures","failures",C.red]].map(([label,key,color])=>(
                      <div key={key}>
                        <div style={{fontSize:12,color:C.textMuted,marginBottom:6}}>{label}</div>
                        <div style={{display:"flex",gap:6}}>
                          {[0,1,2].map(i=>(
                            <div key={i} className="hov-btn" onClick={()=>setN("deathSaves",key,i+1===char.deathSaves[key]?i:i+1)}
                              style={{width:18,height:18,borderRadius:"50%",cursor:"pointer",border:`2px solid ${i<char.deathSaves[key]?color:C.textMuted}`,background:i<char.deathSaves[key]?color:"transparent",transition:"all 0.15s"}}/>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:14}}>
                  <SecHdr>Temporary HP</SecHdr>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <input type="number" value={char.hp.temp} onChange={e=>setN("hp","temp",Math.max(0,+e.target.value))} style={{...inp,width:90}}/>
                    {char.hp.temp>0&&<span style={{color:C.blue,fontSize:13}}>+{char.hp.temp} temp</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab==="skills"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
              {DND.skills.map(sk=>{
                const a=char.skillProfs.includes(sk);
                const m=getSkill(sk);
                return (
                  <div key={sk} className="chip-toggle" onClick={()=>set("skillProfs",a?char.skillProfs.filter(x=>x!==sk):[...char.skillProfs,sk])}
                    style={{display:"flex",alignItems:"center",gap:8,padding:"8px 11px",borderRadius:8,background:a?C.activeSkill:C.card,border:`1px solid ${a?C.activeBorder:C.border}`}}>
                    <div style={{width:10,height:10,borderRadius:"50%",flexShrink:0,background:a?C.gold:"transparent",border:`2px solid ${a?C.gold:C.textMuted}`,transition:"all 0.15s"}}/>
                    <span style={{flex:1,fontSize:13,color:a?C.text:C.textDim}}>{sk}</span>
                    <span style={{fontSize:10,color:C.textMuted}}>{DND.skillStat[sk].toUpperCase()}</span>
                    <span style={{fontSize:13,fontWeight:700,color:a?C.gold:C.textMuted,minWidth:26,textAlign:"right"}}>{fmt(m)}</span>
                  </div>
                );
              })}
            </div>
          )}

          {tab==="spells"&&<SpellEditor spells={char.spells||[]} onChange={s=>set("spells",s)}/>}

          {tab==="character"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              <div>
                <SecHdr>Classes</SecHdr>
                {(char.classes||[]).map((cl,idx)=>{
                  const cc=DND.classColors[cl.name]||C.gold;
                  const def=DND.classes.find(c=>c.name===cl.name)||{subclasses:[]};
                  return (
                    <div key={idx} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:9,padding:12,marginBottom:8,borderLeft:`3px solid ${cc}`}}>
                      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
                        <span style={{fontSize:18}}>{DND_ICONS[cl.name]||"⚔"}</span>
                        {editing?(
                          <>
                            <select value={cl.name} onChange={e=>updateClass(idx,"name",e.target.value)} style={{...inp,flex:1}}>
                              {DND.classes.map(c=><option key={c.name}>{c.name}</option>)}
                            </select>
                            <input type="number" min={1} max={20} value={cl.level} onChange={e=>updateClass(idx,"level",+e.target.value)} style={{...inp,width:60}}/>
                          </>
                        ):<span style={{color:cc,fontWeight:700}}>{cl.name} {cl.level}</span>}
                      </div>
                      <div style={{fontSize:11,color:C.textMuted,marginBottom:4}}>Subclass</div>
                      <div style={{marginBottom:10}}>
                        <input
                          style={{...inp, width:'100%', marginBottom:6}}
                          placeholder="Subclass name (e.g. Arcane Trickster)"
                          value={cl.subclass || ''}
                          onChange={e => updateClass(idx, 'subclass', e.target.value)}
                          disabled={!editing}
                        />
                        <textarea
                          style={{...inp, width:'100%', minHeight:32}}
                          placeholder="Subclass features (e.g. Mage Hand Legerdemain, Spellcasting, etc.)"
                          value={cl.subclassFeatures || ''}
                          onChange={e => updateClass(idx, 'subclassFeatures', e.target.value)}
                          disabled={!editing}
                        />
                      </div>
                      <div style={{marginBottom:10}}>
                        <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{cl.subclassFeatures}</div>
                        <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{cl.classFeatures}</div>
                      </div>
                    </div>
                  );
                })}
                {editing&&<Btn onClick={()=>set("classes",[...(char.classes||[]),{name:"Fighter",level:1,subclass:""}])} style={{width:"100%",marginBottom:12,padding:"7px"}}>+ Add Class</Btn>}

                <SecHdr mt={16}>Identity</SecHdr>
                {editing?(
                  [["Name","name","text"],["Species","species","text"],["Background","background","text"],["Alignment","alignment","text"],["Languages","languages","text"],["XP","xp","number"],["Initiative","initiative","number"]].map(([l,k,t])=>(
                    <div key={k} style={{marginBottom:8}}>
                      <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{l}</div>
                      <input type={t} value={char[k]||""} onChange={e=>set(k,t==="number"?+e.target.value:e.target.value)} style={inp}/>
                    </div>
                  ))
                ):(
                  [["Species",char.customSpecies||char.species],["Background",char.background],["Alignment",char.alignment],["Languages",char.languages],["XP",char.xp]].map(([l,v])=>(
                    <div key={l} style={{marginBottom:10}}>
                      <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>{l}</div>
                      <div style={{color:C.text,fontSize:14}}>{v||"—"}</div>
                    </div>
                  ))
                )}
              </div>
              <div>
                <SecHdr>Personality</SecHdr>
                {[["Traits","personalityTraits"],["Ideals","ideals"],["Bonds","bonds"],["Flaws","flaws"]].map(([label,key])=>(
                  <div key={key} style={{marginBottom:12}}>
                    <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{label}</div>
                    {editing?<textarea value={char[key]||""} onChange={e=>set(key,e.target.value)} rows={2} style={{...inp,resize:"vertical"}}/>
                    :<div style={{color:C.textDim,fontSize:13,lineHeight:1.5}}>{char[key]||<span style={{color:C.textMuted}}>—</span>}</div>}
                  </div>
                ))}
              </div>
              <div style={{gridColumn:"1 / -1"}}>
                <SecHdr>Features & Equipment</SecHdr>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                  {[["Features & Traits","features"],["Equipment","equipment"],["Notes","notes"]].map(([label,key])=>(
                    <div key={key}>
                      <div style={{fontSize:10,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{label}</div>
                      {editing?<textarea value={char[key]||""} onChange={e=>set(key,e.target.value)} rows={4} style={{...inp,resize:"vertical"}}/>
                      :<div style={{color:C.textDim,fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{char[key]||<span style={{color:C.textMuted}}>—</span>}</div>}
                    </div>
                  ))}
                </div>
                <SecHdr>Currency</SecHdr>
                <div style={{display:"flex",gap:10}}>
                  {[["CP","cp","#b87333"],["SP","sp","#aaa9ad"],["GP","gp","#ffd700"],["PP","pp","#e8e8e8"]].map(([label,key,color])=>(
                    <div key={key} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 14px",textAlign:"center"}}>
                      <div style={{fontSize:10,color,textTransform:"uppercase",letterSpacing:1,marginBottom:4,fontWeight:700}}>{label}</div>
                      {editing?<input type="number" value={char.currency[key]} onChange={e=>setN("currency",key,+e.target.value)} style={{...inp,textAlign:"center",fontSize:18}}/>
                      :<div style={{fontSize:22,fontWeight:700,color,fontFamily:"Georgia,serif"}}>{char.currency[key]}</div>}
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
