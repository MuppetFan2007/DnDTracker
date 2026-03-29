import React from 'react'

const Icon = ({ d, size = 16 }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path d={d} />
  </svg>
)

export const Icons = {
  Users:      () => <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  Star:       () => <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  Zap:        () => <Icon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  Map:        () => <Icon d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16" />,
  Shield:     () => <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  Wind:       () => <Icon d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />,
  Music:      () => <Icon d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />,
  Book:       () => <Icon d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />,
  Feather:    () => <Icon d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8L2 22M17.5 15H9" />,
  Crosshair:  () => <Icon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v8M8 12h8" />,
  Heart:      () => <Icon d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  Eye:        () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
  Aperture:   () => <Icon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16 3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />,
  User:       () => <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  Award:      () => <Icon d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12" />,
  Clock:      () => <Icon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20 M12 6v6l4 2" />,
  ArrowRight: () => <Icon d="M5 12h14M12 5l7 7-7 7" />,
  Move:       () => <Icon d="M5 9l-3 3 3 3 M9 5l3-3 3 3 M15 19l-3 3-3-3 M19 9l3 3-3 3 M2 12h20 M12 2v20" />,
  Activity:   () => <Icon d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  Search:     () => <Icon d="M11 19A8 8 0 1 0 11 3a8 8 0 0 0 0 16 M21 21l-4.35-4.35" />,
  Repeat:     () => <Icon d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4m14 0v2a4 4 0 0 1-4 4H3" />,
  Plus:       () => <Icon d="M12 5v14M5 12h14" />,
  Slash:      () => <Icon d="M22 2L2 22" />,
}

export const DND_ICONS = {
  Barbarian: <Icons.Crosshair />,
  Bard:      <Icons.Music />,
  Cleric:    <Icons.Award />,
  Druid:     <Icons.Feather />,
  Fighter:   <Icons.Shield />,
  Monk:      <Icons.Aperture />,
  Paladin:   <Icons.Heart />,
  Ranger:    <Icons.Wind />,
  Rogue:     <Icons.User />,
  Sorcerer:  <Icons.Zap />,
  Warlock:   <Icons.Eye />,
  Wizard:    <Icons.Book />,
}
