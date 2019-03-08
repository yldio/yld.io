import React from 'react'
import styled from 'styled-components'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import {
  fontSizeAndWeight,
  defaultStyles,
  hoverActiveStyles
} from './outerItemStyles'
import sideNavItemPadding from './sideNavItemPadding'

const StyledAnchor = styled(Anchor)`
  display: block;
  ${headerItemStyles}
  ${fontSizeAndWeight}
  ${defaultStyles}

  &:hover,
  &:active,
  &.active {
    ${hoverActiveStyles}
  }
`

const StyledListItem = styled.li`
  list-style-type: none;
  padding: ${sideNavItemPadding};
`

const OuterAnchorItem = ({
  children,
  to,
  href,
  activeClassName,
  themeVariation,
  onClick,
  ...props
}) => (
  <StyledListItem themeVariation={themeVariation} {...props}>
    <StyledAnchor
      href={href}
      to={to}
      activeClassName={activeClassName}
      onClick={onClick}
    >
      {children}
    </StyledAnchor>
  </StyledListItem>
)

export default OuterAnchorItem
