import { css } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import modifiers from './modifiers'

const SectionTitleStyles = css`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: ${remcalc(32)};
  line-height: ${remcalc(36)};
  padding: ${remcalc(13)} 0 ${remcalc(11)} 0;
  ${modifiers}

  ${breakpoint('tablet')`
    font-size: ${remcalc(42)};
    line-height: ${remcalc(48)};
    padding: ${remcalc(10)} 0 ${remcalc(8)} 0;
    ${modifiers}
  `};
`

export default SectionTitleStyles
