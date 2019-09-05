import React from 'react'
import styled from 'styled-components'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../utils/headerItemStyles'
import outlineStyles from '../utils/outlineStyles'
import topNavItemStyles from './desktopNavItemStyles'
import TopNavItem from './TopNavItem'

const StyledAnchor = styled(Anchor)`
  ${headerItemStyles}
  ${topNavItemStyles}
  ${outlineStyles}
`

const StyledListItem = styled(TopNavItem)`
  display: flex;
  ${props => props.states.default}

  &:hover,
  > a:hover {
    ${props => props.states.hover}
  }

  > a:active {
    ${props => props.states.clickTap}
  }

  > a.active {
    ${props => props.states.active}
    &:active {
      ${props => props.states.active}
    }

    &:hover {
      ${props => props.states.activeAndHover}
    }
  }
`

const OuterAnchorItem = ({
  children,
  to,
  href,
  activeClassName,
  themeVariation,
  onClick,
  title,
  attributes,
  ...props
}) => (
  <StyledListItem themeVariation={themeVariation} {...props}>
    <StyledAnchor
      href={href}
      to={to}
      activeClassName={activeClassName}
      onClick={onClick}
      title={title}
      {...attributes}
    >
      {children}
    </StyledAnchor>
  </StyledListItem>
)

export default OuterAnchorItem
