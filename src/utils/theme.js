import remcalc from 'remcalc'

const space = {
  0: '0',
  0.5: remcalc(6),
  1: remcalc(12),
  1.5: remcalc(18),
  2: remcalc(24),
  3: remcalc(36),
  3.5: remcalc(54),
  4: remcalc(72),
  5: remcalc(108),
  6: remcalc(144),
  7: remcalc(288),
  30: remcalc(30),
  60: remcalc(60),
  42: remcalc(42),
  48: remcalc(48)
}

const breakpoints = [
  remcalc(0),
  remcalc(471),
  remcalc(553),
  remcalc(899), // sharon
  remcalc(900),
  remcalc(1197)
]

export default {
  breakpoints,
  spacing: space,
  space,
  colors: {
    white: '#fff',
    text: '#333333',
    p: '#757575',
    textLight: '#828282',
    link: '#757575',
    dark: '#232323',
    black: '#1d1d1d',
    lightGray: '#737272',
    greyBg: '#f9f9f9',
    grey: '#e6e6e6'
  }
}
