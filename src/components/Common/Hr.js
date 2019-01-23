import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

const Hr = styled.hr`
  height: ${remcalc(1)};
  margin: ${remcalc(17)} 0 ${remcalc(18)} 0;
  border: none;
  background-color: ${props => props.theme.colors.grey};
  ${is('short')`
    width: 60px;
  `};
  ${is('muted')`
    opacity: 0.25;
    background-color: ${props => props.theme.colors.white};
  `};
`

export default Hr
