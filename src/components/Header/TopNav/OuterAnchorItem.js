import React from 'react'
import styled from 'styled-components'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import outlineStyles from '../outlineStyles'
import topNavItemStyles from './topNavItemStyles'
import { lightStates, darkStates } from './outerItemStates'

const StyledAnchor = styled(Anchor)`
  ${headerItemStyles}
  ${topNavItemStyles}

  ${outlineStyles}
`

const StyledListItem = styled.li.attrs(props => ({
  states: props.themeVariation === 'dark' ? darkStates : lightStates
}))`
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
