import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

const BodyStylised = styled.p`
  color: ${props => props.theme.colors.secondaryText};
  font-family: 'PT Mono', sans-serif;
  font-weight: 400;
  font-size: ${remcalc(15)};
  line-height: ${remcalc(24)};
  padding: ${remcalc(13)} 0 ${remcalc(11)} 0;

  ${is('reverse')`
    color: ${props => props.theme.colors.white};
  `};

  ${is('muted')`
    opacity: .5;
  `};

  ${is('noMargin')`
      padding: 0;
  `};
`

export default BodyStylised
