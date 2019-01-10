import styled from 'styled-components'
import remcalc from 'remcalc'

export default styled.h2`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: ${remcalc(32)};
  line-height: ${remcalc(36)};
  padding: ${remcalc(13)} 0 ${remcalc(11)} 0;
`
