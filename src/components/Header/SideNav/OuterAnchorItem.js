import React from 'react'
import styled from 'styled-components'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import outlineStyles from '../outlineStyles'
import sideNavItemStyles from './sideNavItemStyles'
import { defaultStyles, hoverActiveStyles } from './outerItemStyles'

const StyledAnchor = styled(Anchor)`
  display: block;
  ${headerItemStyles}
  ${sideNavItemStyles}
  ${defaultStyles}

  &:hover,
  &:active,
  &.active {
    ${hoverActiveStyles}
  }

  &:focus {
    ${hoverActiveStyles}
    ${outlineStyles}
  }
`

const StyledListItem = styled.li`
  list-style-type: none;
`

const OuterAnchorItem = ({
  children,
  to,
  href,
  activeClassName,
  onClick,
  ...props
}) => (
  <StyledListItem {...props}>
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
