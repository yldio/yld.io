import remcalc from 'remcalc'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'
import { h1Styles } from './h1'

const H2 = styled.h2`
  ${h1Styles}

  ${is('small')`
    font-size: ${remcalc(30)};
    padding: ${remcalc(29)} 0 ${remcalc(25)} 0;
    line-height: ${remcalc(30)};
    font-weight: 500;
    color: ${props => props.theme.colors.text};

    ${is('reverse')`
      color: ${props => props.theme.colors.white};
    `};
    ${is('center')`
      text-align:center
    `};

      ${is('noTop')`
        padding-top: 0;
      `};

    ${breakpoint('tablet')`
      font-size: ${remcalc(42)};
      padding: ${remcalc(21)} 0;
      line-height: ${remcalc(42)};

      ${is('noTop')`
        padding-top: 0;
      `};

    `}



  `}
`
export default H2
