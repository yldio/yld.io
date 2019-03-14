import React from 'react'
import styled from 'styled-components'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import {
  fontSizeAndWeight,
  defaultStyles,
  hoverActiveStyles
} from './outerItemStyles'
import sideNavItemSpacing from './sideNavItemSpacing'
import outlineStyles from '../outlineStyles'

const StyledAnchor = styled(Anchor)`
  display: block;
  ${headerItemStyles}
  ${fontSizeAndWeight}
  ${defaultStyles}
  ${sideNavItemSpacing};

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
