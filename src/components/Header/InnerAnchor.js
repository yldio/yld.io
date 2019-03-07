import styled from 'styled-components'
import remcalc from 'remcalc'

import Anchor from '../Common/Anchor'
import headerItemStyles from './headerItemStyles'
import sideNavItemPadding from './SideNav/sideNavItemPadding'
import topNavItemPadding from './TopNav/topNavItemPadding'

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
  font-weight: 400;
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
  ${sideNavItemPadding}
`

export const TopNavInnerAnchor = styled(StyledAnchor)`
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
  ${topNavItemPadding}
`
