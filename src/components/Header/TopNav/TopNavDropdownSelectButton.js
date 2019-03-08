import styled from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'

import headerItemStyles from '../headerItemStyles'
import topNavItemPadding from './topNavItemPadding'
import outlineStyles from '../outlineStyles'

export const TopNavDropdownNameWrapper = styled.span`
  display: flex;
  align-items: center;
  transition: outline ${props => props.theme.animations.normal} ease-out;
  /* bumping the z-index so that the outline doesn't get behind the dropdown items list */
  z-index: 2;
  ${headerItemStyles}
  ${topNavItemPadding}
  ${outlineStyles}

  ${is('darkTheme')`
    &:focus {
      outline-color: white;
    } 
  `}
`

export const TopNavDropdownName = styled.span`
  margin-right: ${remcalc(6)};
`
