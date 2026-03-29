import React, { useState, useEffect } from 'react'
import { ThemeCtx, THEMES } from './themes.js'
import { loadLS, saveLS, blank, uid } from './utils.js'
import { GlobalCSS }  from './components/GlobalCSS.jsx'
import { Roster }     from './components/Roster.jsx'
import { Creator }    from './components/Creator.jsx'
import { Sheet }      from './components/Sheet.jsx'

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

  useEffect(() => {
    try { localStorage.setItem('dnd_theme', themeKey) } catch {}
  }, [themeKey])

  const [chars,    setChars]    = useState(loadLS)
  const [view,     setView]     = useState('roster')
  const [activeId, setActiveId] = useState(null)
  const [draft,    setDraft]    = useState(null)
  const [step,     setStep]     = useState(0)

  useEffect(() => { saveLS(chars) }, [chars])

  const saveChar   = (char) => setChars(cs => cs.some(c => c.id === char.id) ? cs.map(c => c.id === char.id ? char : c) : [...cs, char])
  const deleteChar = (id)   => setChars(cs => cs.filter(c => c.id !== id))
  const importChars = (newChars) => newChars.forEach(c => saveChar({ ...c, id: uid() }))

  const rootClass = isVcr ? 'vcr-root'
    : isRacing   ? 'racing-root'
    : isMoon     ? 'moon-root'
    : isSakura   ? 'sakura-root'
    : isKuromi   ? 'kuromi-root'
    : isMyMelody ? 'mymelody-root'
    : ''
  const fontFamily = isVcr     ? "'Share Tech Mono', monospace"
    : isRacing   ? "'Rajdhani', 'Segoe UI', sans-serif"
    : isMyMelody ? "'Nunito', 'Segoe UI', sans-serif"
    : isKuromi   ? "'Share Tech Mono', monospace"
    : isMoon     ? "'Cinzel', 'Georgia', serif"
    : "'Segoe UI', system-ui, sans-serif"

  return (
    <ThemeCtx.Provider value={C}>
      <GlobalCSS />

      {/* VCR scanlines */}
      {isVcr && <div className="vcr-scanlines" />}

      {/* ✦ Galaxy — nebula + milkyway + aurora + stars + planet + spiral + shooting stars + shimmer */}
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

      {/* Sakura Miku — falling petals + sparkles + corner bloom */}
      {isSakura && <div className="sakura-petals" />}
      {isSakura && <div className="sakura-sparkles" />}
      {isSakura && <div className="sakura-bloom" />}

      {/* Racing Miku — speed lines + animated stripe */}
      {isRacing && <div className="racing-speedlines" />}
      {isRacing && <div className="racing-stripe" />}

      {/* Kuromi — dark aura + particles + skull + lightning */}
      {isKuromi && <div className="kuromi-aura" />}
      {isKuromi && <div className="kuromi-particles" />}
      {isKuromi && <div className="kuromi-skull">💀</div>}
      {isKuromi && <div className="kuromi-lightning" />}

      {/* My Melody — rainbow stripe + hearts + corner orbs + sparkles */}
      {isMyMelody && <div className="mymelody-rainbow" />}
      {isMyMelody && <div className="mymelody-hearts" />}
      {isMyMelody && <div className="mymelody-orbs" />}
      {isMyMelody && <div className="mymelody-sparkles" />}

      <div
        className={rootClass}
        style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily, display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ flex: '1 0 auto' }}>
          {view === 'roster' && (
            <Roster
              chars={chars}
              themeKey={themeKey}
              setThemeKey={setThemeKey}
              onCreate={() => { setDraft(blank()); setStep(0); setView('create') }}
              onOpen={id  => { setActiveId(id); setView('sheet') }}
              onDelete={deleteChar}
              onImport={importChars}
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
            if (!char) { setTimeout(() => setView('roster'), 0); return null }
            return <Sheet char={char} onChange={saveChar} onBack={() => setView('roster')} />
          })()}
        </div>

        <footer className="app-footer" style={{ borderTop: `1px solid ${C.border}`, background: C.surface, color: C.textMuted }}>
          <span style={{ color: C.gold, fontWeight: 700 }}>⚔ D&D 2024 Manager</span>
          <span className="app-footer-mid">GLHF :3 </span>
          <span>Characters saved locally</span>
        </footer>
      </div>
    </ThemeCtx.Provider>
  )
}