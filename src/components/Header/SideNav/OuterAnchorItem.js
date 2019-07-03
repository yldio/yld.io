import React from 'react'
import styled from 'styled-components'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import outlineStyles from '../outlineStyles'
import sideNavItemStyles from './sideNavItemStyles'
import outerItemStates from './outerItemStates'

const StyledAnchor = styled(Anchor).attrs(() => ({
  states: outerItemStates
}))`
  display: block;
  ${headerItemStyles}
  ${sideNavItemStyles}

  ${props => props.states.default}

  &:hover,
  &:active,
  &.active {
    ${props => props.states.hoverActive}
  }

  &:focus {
    ${props => props.states.hoverActive}
    ${outlineStyles}
  }
`

const StyledListItem = styled.li`
  list-style-type: none;
`

const OuterAnchorItem = ({
  label,
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
      title={label}
    >
      {label}
    </StyledAnchor>
  </StyledListItem>
)

export default OuterAnchorItem
