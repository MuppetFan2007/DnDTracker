import React, { useState, useEffect } from 'react'
import { ThemeCtx, THEMES } from './themes.js'
import { loadLS, saveLS, blank } from './utils.js'
import { GlobalCSS }  from './components/GlobalCSS.jsx'
import { Roster }     from './components/Roster.jsx'
import { Creator }    from './components/Creator.jsx'
import { Sheet }      from './components/Sheet.jsx'

export default function App() {
  const [themeKey, setThemeKey] = useState(() => {
    try { return localStorage.getItem('dnd_theme') || 'vcr' } catch { return 'vcr' }
  })
  const C     = THEMES[themeKey] || THEMES.vcr
  const isVcr = themeKey === 'vcr'

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

  return (
    <ThemeCtx.Provider value={C}>
      <GlobalCSS />
      {isVcr && <div className="vcr-scanlines" />}
      <div
        className={isVcr ? 'vcr-root' : ''}
        style={{
          minHeight: '100vh',
          background: C.bg,
          color: C.text,
          fontFamily: isVcr ? "'Share Tech Mono', monospace" : "'Segoe UI', system-ui, sans-serif",
        }}
      >
        {view === 'roster' && (
          <Roster
            chars={chars}
            themeKey={themeKey}
            setThemeKey={setThemeKey}
            onCreate={() => { setDraft(blank()); setStep(0); setView('create') }}
            onOpen={id  => { setActiveId(id); setView('sheet') }}
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
          if (!char) { setTimeout(() => setView('roster'), 0); return null }
          return <Sheet char={char} onChange={saveChar} onBack={() => setView('roster')} />
        })()}
      </div>
    </ThemeCtx.Provider>
  )
}
