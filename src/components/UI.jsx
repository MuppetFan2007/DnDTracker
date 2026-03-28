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

export function FullCircleHP({ current, max, color, size = 88, temp = 0 }) {
  const pct     = max ? Math.max(0, Math.min(1, current / max)) : 0
  const tempPct = max && temp > 0 ? Math.min(1, temp / max) : 0
  const sw    = size * 0.09
  const swT   = size * 0.065
  const r     = size * 0.41
  const rOut  = r + sw * 0.5 + swT * 0.5 + 3
  // expand container so outer ring never clips surrounding elements
  const pad   = temp > 0 ? Math.ceil(rOut + swT / 2 - size / 2 + 3) : 0
  const total = size + pad * 2
  const cx = total / 2, cy = total / 2
  const circ  = 2 * Math.PI * r
  const circT = 2 * Math.PI * rOut
  return (
    <div style={{ position: 'relative', width: total, height: total, flexShrink: 0 }}>
      <svg width={total} height={total} viewBox={`0 0 ${total} ${total}`}>
        {/* Temp HP outer track */}
        {temp > 0 && (
          <circle cx={cx} cy={cy} r={rOut} fill="none" stroke="rgba(100,180,255,0.12)" strokeWidth={swT} />
        )}
        {/* Temp HP outer arc */}
        {tempPct > 0 && (
          <circle cx={cx} cy={cy} r={rOut} fill="none" stroke="#7ab8e8" strokeWidth={swT}
            strokeDasharray={`${tempPct * circT} ${(1 - tempPct) * circT}`} strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 4px #7ab8e888)' }}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )}
        {/* Main HP track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={sw} />
        {/* Main HP arc */}
        {pct > 0 && (
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw}
            strokeDasharray={`${pct * circ} ${(1 - pct) * circ}`} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 5px ${color}99)` }}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: size * 0.21, fontWeight: 700, color, lineHeight: 1 }}>{current}</div>
        <div style={{ fontSize: size * 0.13, color: 'rgba(255,255,255,0.3)' }}>/ {max}</div>
        {temp > 0 && <div style={{ fontSize: size * 0.11, color: '#7ab8e8', lineHeight: 1, marginTop: 2 }}>+{temp}</div>}
      </div>
    </div>
  )
}
