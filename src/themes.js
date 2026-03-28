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
  storm: {
    name: 'Storm',
    bg: '#0b0c10', surface: '#111217', card: '#16171b',
    border: '#2b2e35', borderHover: '#5a6070',
    gold: '#c6b6f0', goldDim: '#9c8cd3',
    text: '#e6e6ee', textDim: '#9ea0ab', textMuted: '#7b7e89',
    red: '#f28b9b', green: '#6fbf9a', yellow: '#f4d07a', blue: '#9aaef8',
    activeSkill: '#1e1a2e', activeBorder: '#5a4e8a',
  },
  miku: {
    name: 'Miku',
    bg: '#071018', surface: '#05242b', card: '#08333b',
    border: '#0f5e66', borderHover: '#19c0cc',
    gold: '#00d2d6', goldDim: '#00a5a9',
    text: '#e6fbff', textDim: '#9fd8dc', textMuted: '#4a8e92',
    red: '#ff9bb3', green: '#6ef7b5', yellow: '#ffd67a', blue: '#7dd3fc',
    activeSkill: '#052830', activeBorder: '#0f8e96',
  },
  pink: {
    name: 'Kawaii',
    bg: '#fff0f6', surface: '#ffe4f0', card: '#ffd6ea',
    border: '#ffbfdc', borderHover: '#ff8fcf',
    gold: '#ff6fb3', goldDim: '#ff97c2',
    text: '#9b1554', textDim: '#d87aa6', textMuted: '#e8aac8',
    red: '#ff4d6d', green: '#6bd687', yellow: '#ffe066', blue: '#85d1ff',
    activeSkill: '#ffd6ea', activeBorder: '#ff6fb3',
  },
}

export const ThemeCtx = createContext(THEMES.vcr)
export const useT = () => useContext(ThemeCtx)
