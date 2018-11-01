import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export default styled.h5`
  color: ${props => props.theme.colors.text};
  font-size: ${remcalc(18)};
  padding: ${remcalc(12)} 0 ${remcalc(12)} 0;
  line-height: ${remcalc(24)};
  font-weight: 400;

  ${is('muted')`
    opacity: 50%;
  `};

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};
`
