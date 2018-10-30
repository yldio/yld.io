import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'
import remcalc from 'remcalc'

export default styled.h1`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: ${remcalc(30)};
  line-height: ${remcalc(30)};
  padding: ${remcalc(29)} 0 ${remcalc(25)} 0;

  ${breakpoint('phone')`
    font-size: ${remcalc(60)};
    padding: ${remcalc(21)} 0;
    line-height: ${remcalc(60)};
  `};
`
