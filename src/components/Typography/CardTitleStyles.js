import { css } from 'styled-components'
import is from 'styled-is'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

const CardTitleStyles = css`
  color: ${props => props.theme.colors.textLight};
  font-weight: 500;
  font-size: ${remcalc(26)};
  line-height: ${remcalc(30)};
  padding: ${remcalc(12)} 0 ${remcalc(12)} 0;

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${is('regular')`
    font-weight: normal;
  `};

  ${is('muted')`
    opacity: .5;
  `};

  ${breakpoint('tablet')`
    font-size: ${remcalc(32)};
    padding: ${remcalc(13)} 0 ${remcalc(11)} 0;
    line-height: ${remcalc(36)};
  `};
`

export default CardTitleStyles
