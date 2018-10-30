import remcalc from 'remcalc'

export default {
  breakpoints: {
    phone: 400,
    tablet: 600,
    desktop: 1096
  },
  spacing: {
    0: '0',
    1: remcalc(12),
    2: remcalc(24),
    3: remcalc(32),
    4: remcalc(44),
    5: remcalc(56)
  },
  colors: {
    white: '#fff',
    text: '#333333',
    textLight: '#828282',
    link: '#757575',
    dark: '#232323'
  }
}
