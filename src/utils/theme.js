import remcalc from 'remcalc'

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
  60: remcalc(60),
  42: remcalc(42),
  48: remcalc(48),
  90: remcalc(90)
}

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
  remcalc(144) // 8
]

export const breakpoints = {
  smallPhone: 0,
  phone: 471,
  largePhone: 553,
  smallTablet: 701, // sharon
  tablet: 901,
  desktop: 1197
}

const elementSizes = {
  tappableArea: 48
}

export const zIndexes = {
  header: 999,
  modal: 10000,
  gridDebugger: 10001
}

const colorsVariables = {
  darkBlue: '#090329',
  neonGreen: '#65FFCD',
  darkBlack: '#1d1d1d',
  black: '#333333',
  darkGrey: '#828282',
  lightGrey: '#f9f9f9',
  grey: '#e6e6e6',
  white: '#fff',
  opacityWhite: '#848194',
  mediumGrey: '#757575',
  tan: '#a08162',
  regalBlue: '#153d53',
  mountainMeadow: '#14B48F'
}

export default {
  breakpoints,
  spacing,
  space,
  elementSizes,
  zIndexes,
  variations: {
    white: 'white',
    dark: 'dark',
    grey: 'grey'
  },
  animations: {
    fast: '200ms',
    normal: '300ms',
    long: '450ms'
  },
  colors: {
    blueBg: colorsVariables.darkBlue,
    vibrant: colorsVariables.neonGreen,
    white: colorsVariables.white,
    opacityWhite: colorsVariables.opacityWhite,
    greyBg: colorsVariables.lightGrey,
    border: colorsVariables.grey,
    black: colorsVariables.darkBlack,
    text: colorsVariables.black,
    secondaryText: colorsVariables.mediumGrey,
    placeholder: colorsVariables.mediumGrey,
    textLight: colorsVariables.darkGrey,
    tanBg: colorsVariables.tan,
    regalBlueBg: colorsVariables.regalBlue,
    mountainMeadowBg: colorsVariables.mountainMeadow
  }
}
