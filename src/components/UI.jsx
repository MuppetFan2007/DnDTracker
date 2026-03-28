import React from 'react'
import { useT } from '../themes.js'

export function CLabel({ children }) {
  const C = useT()
  return (
    <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4, marginTop: 12 }}>
      {children}
    </div>
  )
}

export function CRow({ children, gap = 12 }) {
  return <div style={{ display: 'flex', gap }}>{children}</div>
}

export function SecHdr({ children, mt = 4 }) {
  const C = useT()
  return (
    <div style={{ fontSize: 10, color: C.gold, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 10, paddingBottom: 5, borderBottom: `1px solid ${C.gold}44`, marginTop: mt }}>
      {children}
    </div>
  )
}

export function Chip({ children, active, onClick, color }) {
  const C = useT()
  const ac = color || C.gold
  return (
    <div
      className="chip-toggle"
      onClick={onClick}
      style={{
        padding: '7px 10px', textAlign: 'center', fontSize: 11, lineHeight: 1.4, letterSpacing: 1,
        background: active ? ac + '22' : 'transparent',
        border: `1px solid ${active ? ac : C.border}`,
        color: active ? ac : C.textDim,
        boxShadow: active ? `0 0 8px ${ac}33` : 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  )
}

export function Btn({ children, onClick, variant = 'default', style = {}, disabled = false }) {
  const C = useT()
  const base = {
    padding: '8px 16px', fontSize: 11, fontFamily: 'inherit', letterSpacing: 2,
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
    textTransform: 'uppercase', border: '1px solid', transition: 'all 0.13s', borderRadius: 0,
  }
  const variants = {
    gold:    { background: 'transparent', borderColor: C.gold, borderWidth: 2, color: C.gold, boxShadow: `0 0 10px ${C.gold}33` },
    danger:  { background: 'transparent', borderColor: C.red,  color: C.red },
    default: { background: 'transparent', borderColor: C.border, color: C.textDim },
    ghost:   { background: 'transparent', border: 'none', color: C.textDim },
  }
  return (
    <button
      className="hov-btn"
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  )
}

export function useInp() {
  const C = useT()
  return {
    background: C.surface, border: `1px solid ${C.border}`, color: C.text,
    padding: '8px 10px', fontSize: 12, width: '100%',
    fontFamily: 'inherit', letterSpacing: 1, borderRadius: 0,
  }
}

export function FullCircleHP({ current, max, color, size = 88 }) {
  const pct = max ? Math.max(0, Math.min(1, current / max)) : 0
  const r = size * 0.41
  const cx = size / 2, cy = size / 2
  const circ = 2 * Math.PI * r
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} overflow="visible">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={size * 0.09} />
        {pct > 0 && (
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={size * 0.09}
            strokeDasharray={`${pct * circ} ${(1 - pct) * circ}`} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 5px ${color}99)` }}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: size * 0.21, fontWeight: 700, color, lineHeight: 1 }}>{current}</div>
        <div style={{ fontSize: size * 0.13, color: 'rgba(255,255,255,0.3)' }}>/ {max}</div>
      </div>
    </div>
  )
}
