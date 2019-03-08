import styled from 'styled-components'
import is from 'styled-is'

import headerItemStyles from '../headerItemStyles'
import sideNavItemPadding from './sideNavItemPadding'
import {
  fontSizeAndWeight,
  defaultStyles,
  hoverActiveStyles
} from './outerItemStyles'

export const SideNavDropdownContainer = styled.div`
  cursor: pointer;
  background: inherit;
`

export const SideNavDropdownList = styled.ul`
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

export const SideNavDropdownNameWrapper = styled.span`
  display: flex;
  align-items: center;
  ${headerItemStyles}
  ${sideNavItemPadding}
  ${fontSizeAndWeight}
  ${defaultStyles}

  ${is('expanded')`
    ${hoverActiveStyles}
    
    &:focus {
      outline-color: ${props => props.theme.colors.white};
    }
  `}
`

export const SideNavDropdownName = styled.span`
  width: 320px;
`
