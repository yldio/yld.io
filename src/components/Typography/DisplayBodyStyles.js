import { css } from 'styled-components'
import is from 'styled-is'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

const DisplayBodyStyles = css`
  font-weight: 400;
  font-size: ${remcalc(26)};
  line-height: ${remcalc(30)};
  padding: ${remcalc(12)} 0 ${remcalc(12)} 0;
  color: ${props => props.theme.colors.text};

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${is('textLight')`
    color: ${props => props.theme.colors.textLight};
  `};

  ${is('center')`
    text-align:center
  `};

  ${breakpoint('tablet')`
    font-size: ${remcalc(32)};
    line-height: ${remcalc(36)};
    padding: ${remcalc(13)} 0 ${remcalc(11)} 0;
  `}
`

export default DisplayBodyStyles
