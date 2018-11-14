import remcalc from 'remcalc'

const calc = v => remcalc(v).split('rem')[0]

const breakpoints = {
  phone: 0,
  tablet: 767,
  desktop: 1096
}

const flexboxbGridBreakPoints = {
  xs: calc(breakpoints.phone),
  sm: calc(breakpoints.tablet),
  md: calc(breakpoints.desktop)
}

export default {
  breakpoints,
  flexboxgrid: {
    gridSize: 12,
    gutterWidth: calc(48),
    outerMargin: calc(30),
    container: {
      sm: 55.5,
      md: 55.5,
      lg: calc(1000)
    },
    breakpoints: flexboxbGridBreakPoints
  },
  spacing: {
    0: '0',
    0.5: remcalc(6),
    1: remcalc(12),
    1.5: remcalc(18),
    2: remcalc(24),
    3: remcalc(36),
    4: remcalc(72),
    5: remcalc(108),
    6: remcalc(144),
    7: remcalc(288),
    30: remcalc(30),
    60: remcalc(60)
  },
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
