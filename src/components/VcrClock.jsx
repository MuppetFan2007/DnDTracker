import React, { useState, useEffect } from 'react'
import { useT } from '../themes.js'

export function VcrClock() {
  const C = useT()
  const [t, setT] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const pad = (n) => String(n).padStart(2, '0')
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 10, letterSpacing: 2 }}>
      <span style={{ color: C.red, fontWeight: 700 }}>● REC</span>
      <span style={{ color: C.gold }}>{pad(t.getHours())}:{pad(t.getMinutes())}:{pad(t.getSeconds())}</span>
      <span style={{ color: C.textMuted }}>SP ■■■□□</span>
      <span style={{ color: C.textMuted }}>TRACKING OK</span>
    </div>
  )
}
