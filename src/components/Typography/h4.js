import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'

export default styled.h4`
  color: ${props => props.theme.colors.text};
  font-weight: 700;
  line-height: ${remcalc(24)};
  padding: ${remcalc(11)} 0 ${remcalc(13)} 0;

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${is('muted')`
    opacity: 50%;
  `};

  ${breakpoint('tablet')`
    font-size: ${remcalc(18)};
    padding: ${remcalc(12)} 0 ${remcalc(12)} 0;
    line-height: ${remcalc(24)};
  `};
`
