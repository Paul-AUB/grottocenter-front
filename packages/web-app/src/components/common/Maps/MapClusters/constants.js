import { blue, brown } from '@mui/material/colors';

export const MARKERS_LIMIT = 13;

// Related to Heat map
const HEX_MIN_RADIUS = 10;
export const HEX_OPACITY = 0.75;
export const HEX_MAX_RADIUS = 14;
export const HEX_FLY_TO_DURATION = 1;
export const HEX_RADIUS_RANGE = [HEX_MIN_RADIUS, HEX_MAX_RADIUS];
// Start at [200] to avoid near-white shades that disappear
// on light OSM tiles, especially combined with the hex opacity.
export const ENTRANCE_HEAT_COLORS = [brown[200], brown[900]];
export const NETWORK_HEAT_COLORS = [blue[200], blue[900]];
export const HEX_LAYER_OPTIONS = {
  radius: HEX_MAX_RADIUS,
  opacity: HEX_OPACITY,
  duration: 400
};

// For visibility we changes the options on
export const HEX_DETAILS_OPACITY = 0.85;
export const HEX_DETAILS_ZOOM = 8;
const HEX_DETAILS_MIN_RADIUS = 10;
export const HEX_DETAILS_RADIUS_RANGE = [
  HEX_DETAILS_MIN_RADIUS,
  HEX_MAX_RADIUS
];
