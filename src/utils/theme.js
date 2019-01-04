import remcalc from 'remcalc'

export const spacing = {
  0: '0',
  0.5: remcalc(6),
  1: remcalc(12),
  1.5: remcalc(18),
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

export const breakpoints = {
  smallPhone: 0,
  phone: 471,
  largePhone: 553,
  smallTablet: 701, // sharon
  tablet: 901,
  desktop: 1197
}

export default {
  breakpoints,
  spacing,
  colors: {
    white: '#fff',
    text: '#333333',
    p: '#757575',
    textLight: '#828282',
    link: '#757575',
    dark: '#232323',
    black: '#1d1d1d',
    lightGrey: '#737272',
    greyBG: '#f9f9f9',
    grey: '#e6e6e6',
    blueBg: '#090329'
  }
}
