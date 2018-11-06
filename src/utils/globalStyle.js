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
    color: inherit;
    text-decoration: none;
    position: relative;


    &:hover {
      color: ${props => lighten(0.2, props.theme.colors.text)};
    }
  }

    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: #949494;
      font-style: italic;
    }
    ::-moz-placeholder { /* Firefox 19+ */
      color: #949494;
      font-style: italic;
    }
    :-ms-input-placeholder { /* IE 10+ */
      color: #949494;
      font-style: italic;
    }
    :-moz-placeholder { /* Firefox 18- */
      color: #949494;
      font-style: italic;
    }


`
