import { css } from 'styled-components'
import is from 'styled-is'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

const DisplayBodyStyles = css`
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

  ${breakpoint('tablet')`
    font-size: ${remcalc(42)};
    padding: ${remcalc(21)} 0;
    line-height: ${remcalc(42)};
  `}
`

export default DisplayBodyStyles
