import styled from 'styled-components'

import Anchor from '../Common/Anchor'
import headerItemStyles from './headerItemStyles'
import sideNavItemPadding from './SideNav/sideNavItemPadding'
import { fontSizeAndWeight as sideNavFont } from './SideNav/outerItemStyles'
import topNavItemPadding from './TopNav/topNavItemPadding'
import { fontSizeAndWeight as topNavFont } from './TopNav/outerItemStyles'

const StyledAnchor = styled(Anchor)`
  ${headerItemStyles}

  background: ${props => props.theme.colors.greyBG};
  color: ${props => props.theme.colors.text};
  opacity: 0.5;

  &:hover,
  &.active {
    color: ${props => props.theme.colors.text};
    opacity: 1;
  }
`

export const SideNavInnerAnchor = styled(StyledAnchor)`
  ${sideNavFont}
  ${sideNavItemPadding}
`

export const TopNavInnerAnchor = styled(StyledAnchor)`
  ${topNavFont}
  ${topNavItemPadding}
`
