import React, { useState, useEffect } from 'react'
import { ThemeCtx, THEMES } from './themes.js'
import { loadLS, saveLS, blank, uid } from './utils.js'
import { GlobalCSS }  from './components/GlobalCSS.jsx'
import { Sidebar }    from './components/Sidebar.jsx'
import { Home }       from './components/Home.jsx'
import { Roster }     from './components/Roster.jsx'
import { Creator }    from './components/Creator.jsx'
import { Sheet }      from './components/Sheet.jsx'
import { Wiki }       from './components/Wiki.jsx'
import { Party }      from './components/Party.jsx'

export default function App() {
  const [themeKey, setThemeKey] = useState(() => {
    try { return localStorage.getItem('dnd_theme') || 'vcr' } catch { return 'vcr' }
  })
  const C        = THEMES[themeKey] || THEMES.vcr
  const isVcr      = themeKey === 'vcr'
  const isRacing   = themeKey === 'racing'
  const isMoon     = themeKey === 'moon'
  const isSakura   = themeKey === 'sakura'
  const isKuromi   = themeKey === 'kuromi'
  const isMyMelody = themeKey === 'mymelody'
  const isNier2b   = themeKey === 'nier2b'
  const isA2       = themeKey === 'a2'
  const isTeto     = themeKey === 'teto'

  useEffect(() => {
    try { localStorage.setItem('dnd_theme', themeKey) } catch {}
  }, [themeKey])

  const [chars,    setChars]    = useState(() =>
    loadLS().map(c => {
      if (typeof c.equipment === 'string') {
        return { ...c, equipmentNotes: c.equipmentNotes || c.equipment, equipment: [], conditions: c.conditions || [] }
      }
      return { ...c, equipment: Array.isArray(c.equipment) ? c.equipment : [], conditions: c.conditions || [] }
    })
  )
  const [view,     setView]     = useState('home')
  const [activeId, setActiveId] = useState(null)
  const [draft,    setDraft]    = useState(null)
  const [step,     setStep]     = useState(0)

  useEffect(() => { saveLS(chars) }, [chars])

  const saveChar   = (char) => setChars(cs => cs.some(c => c.id === char.id) ? cs.map(c => c.id === char.id ? char : c) : [...cs, char])
  const deleteChar = (id)   => setChars(cs => cs.filter(c => c.id !== id))
  const importChars = (newChars) => newChars.forEach(c => saveChar({ ...c, id: uid() }))
  const handleCreate = () => { setDraft(blank()); setStep(0); setView('create') }
  const handleOpen   = (id) => { setActiveId(id); setView('sheet') }

  const rootClass = isVcr ? 'vcr-root'
    : isRacing   ? 'racing-root'
    : isMoon     ? 'moon-root'
    : isSakura   ? 'sakura-root'
    : isKuromi   ? 'kuromi-root'
    : isMyMelody ? 'mymelody-root'
    : isNier2b   ? 'nier2b-root'
    : isA2       ? 'a2-root'
    : isTeto     ? 'teto-root'
    : ''
  const fontFamily = isVcr     ? "'Share Tech Mono', monospace"
    : isRacing   ? "'Rajdhani', 'Segoe UI', sans-serif"
    : isMyMelody ? "'Nunito', 'Segoe UI', sans-serif"
    : isKuromi   ? "'Share Tech Mono', monospace"
    : isMoon     ? "'Cinzel', 'Georgia', serif"
    : isNier2b   ? "'Rajdhani', 'Segoe UI', sans-serif"
    : isA2       ? "'Rajdhani', 'Segoe UI', sans-serif"
    : isTeto     ? "'Exo 2', 'Segoe UI', sans-serif"
    : "'Segoe UI', system-ui, sans-serif"

  return (
    <ThemeCtx.Provider value={C}>
      <GlobalCSS />

      {/* ── Background effect layers ── */}
      {isVcr && <div className="vcr-scanlines" />}

      {isMoon && <div className="moon-nebula" />}
      {isMoon && <div className="moon-milkyway" />}
      {isMoon && <div className="moon-aurora" />}
      {isMoon && <div className="moon-stars" />}
      {isMoon && <div className="moon-stars-lg" />}
      {isMoon && <div className="moon-planet" />}
      {isMoon && <div className="moon-galaxy-spiral" />}
      {isMoon && <div className="moon-shooting" />}
      {isMoon && <div className="moon-shooting2" />}
      {isMoon && <div className="moon-shimmer" />}

      {isSakura && <div className="sakura-petals" />}
      {isSakura && <div className="sakura-sparkles" />}
      {isSakura && <div className="sakura-bloom" />}

      {isRacing && <div className="racing-speedlines" />}
      {isRacing && <div className="racing-stripe" />}

      {isNier2b && <div className="nier2b-vignette" />}
      {isNier2b && <div className="nier2b-scanlines" />}
      {isNier2b && <div className="nier2b-hexgrid" />}
      {isNier2b && <div className="nier2b-glitch" />}
      {isNier2b && <div className="nier2b-petals" />}
      {isNier2b && <div className="nier2b-particles" />}
      {isNier2b && <div className="nier2b-core" />}
      {isNier2b && <div className="nier2b-hud" />}

      {isA2 && <div className="a2-vignette" />}
      {isA2 && <div className="a2-noise" />}
      {isA2 && <div className="a2-wind" />}
      {isA2 && <div className="a2-dust" />}
      {isA2 && <div className="a2-core" />}
      {isA2 && <div className="a2-hud" />}

      {isTeto && <div className="teto-glow" />}
      {isTeto && <div className="teto-drills" />}
      {isTeto && <div className="teto-grid" />}
      {isTeto && <div className="teto-notes" />}
      {isTeto && <div className="teto-scanband" />}
      {isTeto && <div className="teto-shimmer" />}

      {isKuromi && <div className="kuromi-aura" />}
      {isKuromi && <div className="kuromi-particles" />}
      {isKuromi && <div className="kuromi-skull">💀</div>}
      {isKuromi && <div className="kuromi-lightning" />}

      {isMyMelody && <div className="mymelody-rainbow" />}
      {isMyMelody && <div className="mymelody-hearts" />}
      {isMyMelody && <div className="mymelody-orbs" />}
      {isMyMelody && <div className="mymelody-sparkles" />}

      {/* ── App shell ── */}
      <div className={`app-shell ${rootClass}`} style={{ background: C.bg, color: C.text, fontFamily }}>

        <Sidebar
          view={view}
          setView={setView}
          themeKey={themeKey}
          setThemeKey={setThemeKey}
          chars={chars}
          onCreate={handleCreate}
          onImport={importChars}
        />

        <main className="app-main">
          {view === 'home' && (
            <Home
              chars={chars}
              onCreate={handleCreate}
              onOpen={handleOpen}
              themeKey={themeKey}
            />
          )}

          {view === 'wiki'  && <Wiki themeKey={themeKey} />}

          {view === 'party' && (
            <Party
              chars={chars}
              onSave={saveChar}
              onOpen={handleOpen}
              themeKey={themeKey}
            />
          )}

          {view === 'roster' && (
            <Roster
              chars={chars}
              themeKey={themeKey}
              onCreate={handleCreate}
              onOpen={handleOpen}
              onDelete={deleteChar}
            />
          )}

          {view === 'create' && draft && (
            <Creator
              draft={draft}
              setDraft={setDraft}
              step={step}
              setStep={setStep}
              onFinish={() => { saveChar(draft); setActiveId(draft.id); setView('sheet') }}
              onCancel={() => setView('roster')}
            />
          )}

          {view === 'sheet' && (() => {
            const char = chars.find(c => c.id === activeId)
            if (!char) { setTimeout(() => setView('home'), 0); return null }
            return <Sheet char={char} onChange={saveChar} onBack={() => setView('roster')} />
          })()}
        </main>
      </div>
    </ThemeCtx.Provider>
  )
}
