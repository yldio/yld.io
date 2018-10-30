import styled from 'styled-components'
import remcalc from 'remcalc'

export default styled.h5`
  color: ${props => props.theme.colors.text};
  font-size: ${remcalc(18)};
  padding: ${remcalc(12)} 0 ${remcalc(12)} 0;
  line-height: ${remcalc(24)};
  font-weight: 400;
`
