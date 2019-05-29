import styled from 'styled-components'
import remcalc from 'remcalc'

import modifiers from './modifiers'

const BodyStylised = styled.p`
  color: ${props => props.theme.colors.secondaryText};
  font-family: 'PT Mono', sans-serif;
  font-weight: 400;
  font-size: ${({ small = false }) => (small ? remcalc(13) : remcalc(15))};
  line-height: ${({ small = false }) => (small ? remcalc(18) : remcalc(24))};
  padding: ${({ small = false }) =>
    small ? `${remcalc(6)} 0` : `${remcalc(13)} 0 ${remcalc(11)} 0`};
  ${modifiers}
`

export default BodyStylised
