import styled from 'styled-components'
import is from 'styled-is'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import modifiers from './modifiers'

export default styled.h3`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
  padding: ${remcalc(11)} 0 ${remcalc(13)} 0;
  ${modifiers}

  ${is('regular')`
    font-weight: 400;
  `};

  ${breakpoint('tablet')`
    font-size: ${remcalc(26)};
    line-height: ${remcalc(30)};
    padding: ${remcalc(12)} 0 ${remcalc(12)} 0;
    ${modifiers}

    ${is('bigger')`
      font-size: ${remcalc(30)};
      line-height: ${remcalc(36)};
    `}

    ${is('biggest')`
      font-size: ${remcalc(32)};
      line-height: ${remcalc(36)};
    `}
  `};
`
