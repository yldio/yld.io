import styled from 'styled-components'
import remcalc from 'remcalc'

export default styled.h6`
  color: ${props => props.theme.colors.link};
  font-family: 'PT Mono', sans-serif;
  font-size: ${remcalc(15)};
  padding: ${remcalc(12)} 0 ${remcalc(12)} 0;
  line-height: ${remcalc(24)};
  font-weight: 400;
  text-decoration: underline;
`
