import remcalc from 'remcalc'

const calc = v => remcalc(v).split('rem')[0]

const breakpoints = {
  phone: 400,
  tablet: 600,
  desktop: 1096
}

export default {
  breakpoints,
  flexboxgrid: {
    gridSize: 12,
    gutterWidth: calc(48),
    outerMargin: calc(48),
    mediaQuery: 'only screen',
    container: {
      sm: 55.5,
      md: 55.5,
      lg: calc(1048)
    },
    breakpoints
  },
  spacing: {
    0: '0',
    1: remcalc(12),
    2: remcalc(24),
    3: remcalc(36),
    4: remcalc(72),
    5: remcalc(108),
    6: remcalc(144),
    7: remcalc(288)
  },
  colors: {
    white: '#fff',
    text: '#333333',
    textLight: '#828282',
    link: '#757575',
    dark: '#232323',
    black: '#1d1d1d',
    lightGray: '#949494',
    greyBg: '#f9f9f9'
  }
}
