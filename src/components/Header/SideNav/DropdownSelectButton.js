import styled from 'styled-components'
import is from 'styled-is'

import headerItemStyles from '../headerItemStyles'
import sideNavItemPadding from './sideNavItemPadding'
import {
  fontSizeAndWeight,
  defaultStyles,
  hoverActiveStyles
} from './outerItemStyles'

export const DropdownNameWrapper = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
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

export const DropdownName = styled.span`
  width: 320px;
`
