import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import remcalc from 'remcalc'
import { lighten } from 'polished'

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=PT+Mono|Roboto:400,500,700');
  ${reset}

  body {
    font-size: ${remcalc(18)};
    font-family: 'Roboto', sans-serif;
    background: ${props => props.theme.colors.white};
    font-weight: normal;
    line-height: 1.33;
    color: ${props => props.theme.colors.text};
  }

  a {
    font-size: 18px;
    line-height: 1.67;
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    position: relative;


    &:hover {
      color: ${props => lighten(0.2, props.theme.colors.text)};

      &:after {
        background: ${props => lighten(0.2, props.theme.colors.text)}
      }
    }

    &:after {
      content: '';
      height: ${remcalc(2)};
      width: 100%;
      background: ${props => props.theme.colors.text};
      margin-top: ${remcalc(3)};
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
`
