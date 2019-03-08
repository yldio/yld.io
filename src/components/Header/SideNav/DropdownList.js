import styled from 'styled-components'
import is from 'styled-is'

const DropdownList = styled.ul`
  display: none;
  opacity: 0;

  ${is('expanded')`
    display: flex;
    flex-direction: column;
    width: 100%;
    opacity: 1;
    transition: opacity ${props => props.theme.animations.normal} ease;
    background: ${props => props.theme.colors.greyBG};
  `}
`

export default DropdownList
