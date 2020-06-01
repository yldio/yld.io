import remcalc from 'remcalc';
import { createStatic } from 'styled-components-breakpoint';

// slowly being deprecated
export const spacing = {
  0: '0',
  0.5: remcalc(6),
  1: remcalc(12),
  1.5: remcalc(18),
  1.75: remcalc(21),
  2: remcalc(24),
  3: remcalc(36),
  3.5: remcalc(54),
  4: remcalc(72),
  4.5: remcalc(96),
  5: remcalc(108),
  6: remcalc(144),
  6.5: remcalc(210),
  7: remcalc(288),
  30: remcalc(30),
  32: remcalc(32),
  60: remcalc(60),
  42: remcalc(42),
  48: remcalc(48),
  90: remcalc(90),
};

// use this instead of the 'spacing' object - 'space' is a keyword in styled-system
export const space = [
  '0', // 0
  remcalc(6), // 1
  remcalc(12), // 2
  remcalc(24), // 3
  remcalc(36), // 4
  remcalc(54), // 5
  remcalc(72), // 6
  remcalc(108), // 7
  remcalc(144), // 8
  remcalc(176), // 9
];

export const breakpoints = {
  smallPhone: 0,
  phone: 471,
  largePhone: 553,
  smallTablet: 701, // sharon
  tablet: 901,
  desktop: 1197,
};
export const breakpointsWithHeader = createStatic({
  ...breakpoints,
  header: 1000,
});

const elementSizes = {
  tappableArea: 48,
};

export const zIndexes = {
  header: 999,
  modal: 10000,
  gridDebugger: 10001,
};

export const colors = {
  blueBg: '#090329',
  vibrant: '#65ffcd',
  white: '#ffffff',
  greyBg: '#f9f9f9',
  grey: '#8e8e8e',
  text: '#333333',
  secondaryText: '#737373',
};

export const variations = {
  white: 'white',
  dark: 'dark',
  grey: 'grey',
};

export const animations = {
  fast: '200ms',
  normal: '300ms',
  long: '450ms',
};

export default {
  animations,
  breakpoints,
  colors,
  elementSizes,
  space,
  spacing,
  variations,
  zIndexes,
};
