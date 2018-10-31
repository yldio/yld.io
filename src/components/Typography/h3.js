import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'

export default styled.h3`
  color: ${props => props.theme.colors.textLight};
  font-weight: 500;
  font-size: ${remcalc(20)};
  line-height: ${remcalc(24)};
  padding: ${remcalc(11)} 0 ${remcalc(13)} 0;

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${breakpoint('tablet')`
    font-size: ${remcalc(40)};
    padding: ${remcalc(22)} 0 ${remcalc(20)} 0;
    line-height: ${remcalc(48)};
  `};
`
