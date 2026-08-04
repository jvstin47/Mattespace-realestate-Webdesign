/**
 * Frames Manifest — 14-Chapter Cinematic Engine
 *
 * Folders map frame indices to physical directories on disk.
 * Chapters define the 14 playback sequences triggered by the user's scroll.
 */

export const TOTAL_FRAMES = 1572;

// ── Physical Folder Mapping ──
const FOLDERS = [
  { folder: '01_aerial_rooftop_pool', startFrame: 1, endFrame: 162 },
  { folder: '02_blue_luxury_car', startFrame: 163, endFrame: 365 },
  { folder: '03_exterior_building_facade', startFrame: 366, endFrame: 549 },
  { folder: '04_outdoor_restaurant_terrace', startFrame: 550, endFrame: 741 },
  { folder: '05_building_facade_dusk_night', startFrame: 742, endFrame: 943 },
  { folder: '06_garden_courtyard_yoga', startFrame: 944, endFrame: 984 },
  { folder: '07_green_floral_archway', startFrame: 985, endFrame: 1030 },
  { folder: '08_aerial_garden_plaza_fountains', startFrame: 1031, endFrame: 1074 },
  { folder: '09_aerial_amphitheater_garden', startFrame: 1075, endFrame: 1124 },
  { folder: '10_top_down_street_view', startFrame: 1125, endFrame: 1168 },
  { folder: '11_basketball_court', startFrame: 1169, endFrame: 1184 },
  { folder: '12_lawn_courtyard_walkway', startFrame: 1185, endFrame: 1198 },
  { folder: '13_buddha_statue_zen_garden', startFrame: 1199, endFrame: 1214 },
  { folder: '14_tower_palm_trees_dusk', startFrame: 1215, endFrame: 1222 },
  { folder: '15_indoor_gym_fitness', startFrame: 1223, endFrame: 1232 },
  { folder: '16_clubhouse_facade', startFrame: 1233, endFrame: 1240 },
  { folder: '17_breakfast_table_apples_coffee', startFrame: 1241, endFrame: 1252 },
  { folder: '18_decorative_garden_lantern', startFrame: 1253, endFrame: 1272 },
  { folder: '19_twin_towers_sunset', startFrame: 1273, endFrame: 1378 },
  { folder: '20_street_level_towers_traffic', startFrame: 1379, endFrame: 1466 },
  { folder: '21_final_hero_shot_twin_towers', startFrame: 1467, endFrame: 1572 },
];

// ── 14 Cinematic Chapters ──
export const CHAPTERS = [
  {
    id: 1,
    title: 'Rooftop Pool',
    startFrame: 1,
    endFrame: 162,
    speedMultiplier: 1,
    caption: {
      chapterNum: '01',
      category: 'RESIDENTIAL COLLECTION',
      label: 'MORNING ASCENT',
      headline: 'Morning Begins Above the Skyline',
      description: 'Rooftop infinity pool suspended above the urban horizon.',
      position: 'bottom-left',
      panelMode: 'onDark',
    },
  },
  {
    id: 2,
    title: 'Luxury Car Arrival',
    startFrame: 185, // Trimmed for punchy, fast playback
    endFrame: 345,
    speedMultiplier: 1.85, // Fast-forwarded for dynamic drive pacing
    caption: {
      chapterNum: '02',
      category: 'THE ARRIVAL',
      label: 'PRECISION & SPEED',
      headline: 'Architecture Designed Around Light',
      description: 'Sculpted contours meeting golden reflection.',
      position: 'bottom-left',
      panelMode: 'onDark',
    },
  },
  {
    id: 3,
    title: 'Exterior Day',
    startFrame: 366,
    endFrame: 549,
    speedMultiplier: 1,
    caption: {
      chapterNum: '03',
      category: 'ARCHITECTURAL FORM',
      label: 'CERAMIC & STONE',
      headline: 'Sculpted in Light and Stone',
      description: 'Clean monoliths. Honest, enduring materials.',
      position: 'center-right',
      panelMode: 'onLight',
    },
  },
  {
    id: 4,
    title: 'Dining Terrace',
    startFrame: 550,
    endFrame: 741,
    speedMultiplier: 1,
    caption: {
      chapterNum: '04',
      category: 'ELEVATED DINING',
      label: 'TWILIGHT SANCTUARY',
      headline: 'Where Space Becomes Home',
      description: 'Open-air terrace dining under twilight skies.',
      position: 'upper-right',
      panelMode: 'onDark',
    },
  },
  {
    id: 5,
    title: 'Night Exterior',
    startFrame: 742,
    endFrame: 943,
    speedMultiplier: 1,
    caption: {
      chapterNum: '05',
      category: 'AFTER DARK',
      label: 'ILLUMINATED HORIZON',
      headline: 'Nightfall. Architecture Endures.',
      description: 'Subtle facade illumination defining the nocturnal skyline.',
      position: 'lower-left',
      panelMode: 'onDark',
    },
  },
  {
    id: 6,
    title: 'Wellness Courtyard',
    startFrame: 944,
    endFrame: 1074,
    speedMultiplier: 1.2,
    caption: {
      chapterNum: '06',
      category: 'LIFESTYLE MONTAGE I',
      label: 'BOTANICAL CALM',
      headline: 'Sanctuaries of Well-Being',
      description: 'Curated yoga lawns, floral archways, and water plazas.',
      position: 'bottom-left',
      panelMode: 'onDark',
    },
  },
  {
    id: 7,
    title: 'Amphitheater & Street',
    startFrame: 1075,
    endFrame: 1168,
    speedMultiplier: 1.2,
    caption: {
      chapterNum: '07',
      category: 'URBAN INTEGRATION',
      label: 'CIVIC HARMONY',
      headline: 'Dynamic Ground Plane',
      description: 'Amphitheater gardens integrated into top-down streetscapes.',
      position: 'bottom-right',
      panelMode: 'onDark',
    },
  },
  {
    id: 8,
    title: 'Recreation & Zen',
    startFrame: 1169,
    endFrame: 1214,
    speedMultiplier: 1.2,
    caption: {
      chapterNum: '08',
      category: 'ACTIVE LIVING',
      label: 'ZENITH GARDENS',
      headline: 'Movement and Mindfulness',
      description: 'Private sports courts adjacent to serene zen gardens.',
      position: 'left-center',
      panelMode: 'onLight',
    },
  },
  {
    id: 9,
    title: 'Fitness & Lounge',
    startFrame: 1215,
    endFrame: 1240,
    speedMultiplier: 1.2,
    caption: {
      chapterNum: '09',
      category: 'PRIVATE CLUBHOUSE',
      label: 'EXCLUSIVITY',
      headline: 'Tailored Amenities for Every Hour',
      description: 'High-performance fitness suites & resident lounges.',
      position: 'bottom-left',
      panelMode: 'onDark',
    },
  },
  {
    id: 10,
    title: 'Curated Details',
    startFrame: 1241,
    endFrame: 1272,
    speedMultiplier: 1.2,
    caption: {
      chapterNum: '10',
      category: 'EVERY DETAIL',
      label: 'MATERIAL HONESTY',
      headline: 'Intimate Moments, Flawlessly Crafted',
      description: 'Morning rituals framed by bespoke architectural textures.',
      position: 'lower-left',
      panelMode: 'onDark',
    },
  },
  {
    id: 11,
    title: 'Sunset Silhouettes',
    startFrame: 1273,
    endFrame: 1378,
    speedMultiplier: 1,
    caption: {
      chapterNum: '11',
      category: 'THE REVEAL',
      label: 'GOLDEN HOUR',
      headline: 'Golden Hour Silhouettes',
      description: 'Twin towers capturing the fading twilight radiance.',
      position: 'center-bottom',
      panelMode: 'onDark',
    },
  },
  {
    id: 12,
    title: 'Street Level Context',
    startFrame: 1379,
    endFrame: 1466,
    speedMultiplier: 1,
    caption: {
      chapterNum: '12',
      category: 'SKYLINE PRESENCE',
      label: 'URBAN PULSE',
      headline: 'Anchored in the City Pulse',
      description: 'Commanding boulevard view meeting skyward grandeur.',
      position: 'lower-right',
      panelMode: 'onDark',
    },
  },
  {
    id: 13,
    title: 'Twin Towers Ascent',
    startFrame: 1467,
    endFrame: 1520,
    speedMultiplier: 1,
    caption: {
      chapterNum: '13',
      category: 'MATTESPACE',
      label: 'THE CLIMAX',
      headline: 'Ascending Above the Horizon',
      description: 'The definitive architectural statement.',
      position: 'center-bottom',
      panelMode: 'onDark',
    },
  },
  {
    id: 14,
    title: 'Final Crown & Brand Reveal',
    startFrame: 1521,
    endFrame: 1572,
    speedMultiplier: 1,
    caption: {
      chapterNum: '14',
      category: 'MATTESPACE',
      label: 'THE FINALE',
      headline: 'Live Above It All',
      description: '',
      position: 'center-bottom',
      panelMode: 'onDark',
    },
  },
];

// ─── Utility: get image file path for a 1-based frame number ───
export function getFramePath(frameNumber) {
  const padded = String(frameNumber).padStart(4, '0');
  const folderData = FOLDERS.find((f) => frameNumber >= f.startFrame && frameNumber <= f.endFrame);
  if (!folderData) return `/frames/${FOLDERS[0].folder}/frame_0001.jpg`;
  return `/frames/${folderData.folder}/frame_${padded}.jpg`;
}
