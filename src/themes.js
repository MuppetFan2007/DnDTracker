import { createContext, useContext } from 'react'

export const THEMES = {
  vcr: {
    name: 'VCR',
    bg: '#0a0a0a', surface: '#0f0f0f', card: '#111111',
    border: '#2a2a2a', borderHover: '#ff3c00',
    gold: '#ff3c00', goldDim: '#cc2e00',
    text: '#e8e8e8', textDim: '#888888', textMuted: '#444444',
    red: '#ff0044', green: '#00ff88', yellow: '#ffcc00', blue: '#00ccff',
    activeSkill: '#1a0800', activeBorder: '#ff3c00',
  },
  moon: {
    name: 'Moon',
    bg: '#010915', surface: '#021428', card: '#031e3c',
    border: '#0c2d50', borderHover: '#4a82b8',
    gold: '#f0e4c0', goldDim: '#b8a878',
    text: '#d8eaf8', textDim: '#7fa8c8', textMuted: '#3a6080',
    red: '#e87878', green: '#5ec8a0', yellow: '#f5df8a', blue: '#7ab8e8',
    activeSkill: '#021828', activeBorder: '#304a70',
  },
  sakura: {
    name: 'Sakura Miku',
    bg: '#fff0f6', surface: '#ffe4ef', card: '#ffd4e8',
    border: '#f0a0c4', borderHover: '#d94090',
    gold: '#cc2878', goldDim: '#9a1e58',
    text: '#280c1c', textDim: '#7a3858', textMuted: '#c088a8',
    red: '#d42050', green: '#1a9058', yellow: '#b07800', blue: '#2860c0',
    activeSkill: '#ffbed6', activeBorder: '#d94090',
  },
  racing: {
    name: 'Racing Miku',
    bg: '#010b12', surface: '#021520', card: '#031d2a',
    border: '#00e5cc33', borderHover: '#00e5cc',
    gold: '#00e5cc', goldDim: '#00b8a4',
    text: '#e0faff', textDim: '#7ecfdb', textMuted: '#2a7a85',
    red: '#ff4fa3', green: '#00ffcc', yellow: '#ffe566', blue: '#39d0ff',
    activeSkill: '#00e5cc18', activeBorder: '#00e5cc',
  },
}

export const ThemeCtx = createContext(THEMES.vcr)
export const useT = () => useContext(ThemeCtx)
