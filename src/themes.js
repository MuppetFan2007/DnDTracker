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
    name: '月夜 Tsukiyo',
    bg: '#01020e', surface: '#040918', card: '#080e28',
    border: '#1a2758', borderHover: '#7a6eff',
    gold: '#c8b8ff', goldDim: '#8a78d0',
    text: '#d8e4ff', textDim: '#6880c0', textMuted: '#2a3560',
    red: '#ff6888', green: '#60deb0', yellow: '#ffd070', blue: '#78a8ff',
    activeSkill: '#0c1440', activeBorder: '#7a6eff',
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
  kuromi: {
    name: 'Kuromi',
    bg: '#04000a', surface: '#0a0016', card: '#100022',
    border: '#4a1085', borderHover: '#d060ff',
    gold: '#c840ff', goldDim: '#8a18cc',
    text: '#f0d8ff', textDim: '#b880e8', textMuted: '#6030a0',
    red: '#ff3388', green: '#44ee88', yellow: '#ffbb44', blue: '#9988ff',
    activeSkill: '#1e0038', activeBorder: '#c840ff',
  },
  mymelody: {
    name: 'My Melody',
    bg: '#fff5f8', surface: '#fff0f5', card: '#ffe6f0',
    border: '#f0b0c8', borderHover: '#d82858',
    gold: '#d82858', goldDim: '#a81840',
    text: '#280818', textDim: '#803050', textMuted: '#c898b0',
    red: '#d82858', green: '#186840', yellow: '#a86000', blue: '#205898',
    activeSkill: '#ffd0e4', activeBorder: '#d82858',
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
