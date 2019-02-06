import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

const Hr = styled.hr`
  height: ${remcalc(1)};
  padding: ${remcalc(17)} 0 ${remcalc(18)} 0;
  border: none;
  margin: 0;
  border-top: 1px solid ${props => props.theme.colors.grey};
  ${is('short')`
    width: 60px;
  `};
  ${is('muted')`
    opacity: 0.25;
    border-color: ${props => props.theme.colors.white};
  `};
`

export default Hr
