/**
 * Frames Manifest — Cinematic Timeline
 *
 * Every shot is an independently tunable chapter with:
 *   scrollWeight  – how much scroll distance it occupies
 *   easing        – frame-progression curve within the shot
 *   holdEnd       – fraction of shot's scroll that holds on the end frame (page-turn effect)
 *   caption       – editorial annotation rail content & positioning
 *
 * Frame files are 1-indexed: frame_0001.jpg → frame_1572.jpg
 */

export const TOTAL_FRAMES = 1572;

// ── Montage helper — 13 shots share combined weight of 3 ──
const MONTAGE_WEIGHT = 3 / 13; // ≈ 0.231

const MONTAGE_CAPTION = {
  label: 'LIFESTYLE COLLECTION',
  headline: 'Every Detail\nConsidered',
  description: '',
  position: 'bottom-left',
  panelMode: 'onDark',
};

export const SHOTS = [
  // ─── ACT I — Arrival (Slow, Cinematic) ───
  {
    id: 1,
    folder: '01_aerial_rooftop_pool',
    startFrame: 1,
    endFrame: 162,
    scrollWeight: 5,
    easing: 'power2.inOut',
    holdEnd: 0,
    caption: {
      label: 'RESIDENTIAL COLLECTION',
      headline: 'Morning Begins\nAbove the Skyline',
      description: 'Rooftop infinity pool suspended above the city.',
      position: 'bottom-left',
      panelMode: 'onDark',
    },
  },
  {
    id: 2,
    folder: '02_blue_luxury_car',
    startFrame: 163,
    endFrame: 365,
    scrollWeight: 4,
    easing: 'power1.inOut',
    holdEnd: 0,
    caption: {
      label: 'THE ARRIVAL',
      headline: 'Architecture Designed\nAround Light',
      description: '',
      position: 'lower-right',
      panelMode: 'onDark',
    },
  },
  {
    id: 3,
    folder: '03_exterior_building_facade',
    startFrame: 366,
    endFrame: 549,
    scrollWeight: 4,
    easing: 'power1.inOut',
    holdEnd: 0,
    caption: {
      label: 'ARCHITECTURAL FORM',
      headline: 'Luxury\nWithout Excess',
      description: 'Clean lines. Honest materials.',
      position: 'left-center',
      panelMode: 'onLight',
    },
  },
  {
    id: 4,
    folder: '04_outdoor_restaurant_terrace',
    startFrame: 550,
    endFrame: 741,
    scrollWeight: 4,
    easing: 'power1.inOut',
    holdEnd: 0,
    caption: {
      label: 'ELEVATED LIVING',
      headline: 'Where Space\nBecomes Home',
      description: 'Twilight terrace dining, every evening.',
      position: 'upper-right',
      panelMode: 'onDark',
    },
  },
  {
    id: 5,
    folder: '05_building_facade_dusk_night',
    startFrame: 742,
    endFrame: 943,
    scrollWeight: 5,
    easing: 'power2.inOut',
    holdEnd: 0.14, // Magazine page-turn pause before montage
    caption: {
      label: 'AFTER DARK',
      headline: 'Nightfall.\nArchitecture Endures.',
      description: '',
      position: 'lower-left',
      panelMode: 'onDark',
    },
  },

  // ─── ACT II — Lifestyle Montage (Rapid, Energetic) ───
  {
    id: 6,
    folder: '06_garden_courtyard_yoga',
    startFrame: 944,
    endFrame: 984,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 7,
    folder: '07_green_floral_archway',
    startFrame: 985,
    endFrame: 1030,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 8,
    folder: '08_aerial_garden_plaza_fountains',
    startFrame: 1031,
    endFrame: 1074,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 9,
    folder: '09_aerial_amphitheater_garden',
    startFrame: 1075,
    endFrame: 1124,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 10,
    folder: '10_top_down_street_view',
    startFrame: 1125,
    endFrame: 1168,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 11,
    folder: '11_basketball_court',
    startFrame: 1169,
    endFrame: 1184,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 12,
    folder: '12_lawn_courtyard_walkway',
    startFrame: 1185,
    endFrame: 1198,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 13,
    folder: '13_buddha_statue_zen_garden',
    startFrame: 1199,
    endFrame: 1214,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 14,
    folder: '14_tower_palm_trees_dusk',
    startFrame: 1215,
    endFrame: 1222,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 15,
    folder: '15_indoor_gym_fitness',
    startFrame: 1223,
    endFrame: 1232,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 16,
    folder: '16_clubhouse_facade',
    startFrame: 1233,
    endFrame: 1240,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 17,
    folder: '17_breakfast_table_apples_coffee',
    startFrame: 1241,
    endFrame: 1252,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },
  {
    id: 18,
    folder: '18_decorative_garden_lantern',
    startFrame: 1253,
    endFrame: 1272,
    scrollWeight: MONTAGE_WEIGHT,
    easing: 'linear',
    holdEnd: 0,
    caption: { ...MONTAGE_CAPTION },
  },

  // ─── ACT III — The Reveal (Slow, Climactic) ───
  {
    id: 19,
    folder: '19_twin_towers_sunset',
    startFrame: 1273,
    endFrame: 1378,
    scrollWeight: 6,
    easing: 'power2.inOut',
    holdEnd: 0,
    caption: {
      label: 'THE REVEAL',
      headline: 'Golden Hour',
      description: 'Twin silhouettes against the sunset.',
      position: 'center-bottom',
      panelMode: 'onDark',
    },
  },
  {
    id: 20,
    folder: '20_street_level_towers_traffic',
    startFrame: 1379,
    endFrame: 1466,
    scrollWeight: 4,
    easing: 'power1.inOut',
    holdEnd: 0,
    caption: {
      label: 'URBAN CONTEXT',
      headline: 'Where the City\nMeets the Sky',
      description: '',
      position: 'lower-right',
      panelMode: 'onDark',
    },
  },
  {
    id: 21,
    folder: '21_final_hero_shot_twin_towers',
    startFrame: 1467,
    endFrame: 1572,
    scrollWeight: 8,
    easing: 'power2.inOut',
    holdEnd: 0.35, // Extended hold — frame settles, brand reveal fades in
    caption: {
      label: 'MATTESPACE',
      headline: 'Live Above\nIt All',
      description: '',
      position: 'center-bottom',
      panelMode: 'onDark',
    },
  },
];

// ─── Utility: get image file path for a 1-based frame number ───
export function getFramePath(frameNumber) {
  const padded = String(frameNumber).padStart(4, '0');
  const shot = SHOTS.find((s) => frameNumber >= s.startFrame && frameNumber <= s.endFrame);
  if (!shot) return `/frames/${SHOTS[0].folder}/frame_0001.jpg`;
  return `/frames/${shot.folder}/frame_${padded}.jpg`;
}

// ─── Utility: get the shot object for a 1-based frame index ───
export function getActiveShot(frameIndex) {
  return (
    SHOTS.find((s) => frameIndex >= s.startFrame && frameIndex <= s.endFrame) || SHOTS[0]
  );
}
