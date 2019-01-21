import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'

export default styled.h3`
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

  ${is('dark')`
    color: ${props => props.theme.colors.text};
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
