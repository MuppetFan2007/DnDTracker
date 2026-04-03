import React from 'react'
import GroupIcon          from '@mui/icons-material/Group'
import StarIcon           from '@mui/icons-material/Star'
import BoltIcon           from '@mui/icons-material/Bolt'
import MapIcon            from '@mui/icons-material/Map'
import MenuBookIcon       from '@mui/icons-material/MenuBook'
import FitnessCenterIcon  from '@mui/icons-material/FitnessCenter'
import MusicNoteIcon      from '@mui/icons-material/MusicNote'
import FlareIcon          from '@mui/icons-material/Flare'
import ForestIcon         from '@mui/icons-material/Forest'
import ShieldIcon         from '@mui/icons-material/Shield'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import FavoriteIcon       from '@mui/icons-material/Favorite'
import ExploreIcon        from '@mui/icons-material/Explore'
import ContentCutIcon     from '@mui/icons-material/ContentCut'
import RemoveRedEyeIcon   from '@mui/icons-material/RemoveRedEye'
import AutoStoriesIcon    from '@mui/icons-material/AutoStories'

/* General-purpose icons used in stat bars, empty states, etc. */
export const Icons = {
  Users: (props) => <GroupIcon          fontSize="inherit" {...props} />,
  Star:  (props) => <StarIcon           fontSize="inherit" {...props} />,
  Zap:   (props) => <BoltIcon           fontSize="inherit" {...props} />,
  Map:   (props) => <MapIcon            fontSize="inherit" {...props} />,
  Book:  (props) => <MenuBookIcon       fontSize="inherit" {...props} />,
}

/* Per-class icons — used with fontSize="inherit" so parent controls size */
export const DND_ICONS = {
  Barbarian: <FitnessCenterIcon   fontSize="inherit" />,
  Bard:      <MusicNoteIcon       fontSize="inherit" />,
  Cleric:    <FlareIcon           fontSize="inherit" />,
  Druid:     <ForestIcon          fontSize="inherit" />,
  Fighter:   <ShieldIcon          fontSize="inherit" />,
  Monk:      <SelfImprovementIcon fontSize="inherit" />,
  Paladin:   <FavoriteIcon        fontSize="inherit" />,
  Ranger:    <ExploreIcon         fontSize="inherit" />,
  Rogue:     <ContentCutIcon      fontSize="inherit" />,
  Sorcerer:  <BoltIcon            fontSize="inherit" />,
  Warlock:   <RemoveRedEyeIcon    fontSize="inherit" />,
  Wizard:    <AutoStoriesIcon     fontSize="inherit" />,
}
