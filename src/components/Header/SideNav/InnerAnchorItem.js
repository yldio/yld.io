import React from 'react'
import styled from 'styled-components'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import sideNavItemStyles from './sideNavItemStyles'

const InnerListItem = styled.li`
  display: flex;
`

const InnerAnchor = styled(Anchor)`
  ${headerItemStyles}
  ${sideNavItemStyles}
  width: 100%;

  background: ${props => props.theme.colors.greyBG};
  color: ${props => props.theme.colors.text};
  opacity: 0.5;

  &:hover,
  &.active {
    color: ${props => props.theme.colors.text};
    opacity: 1;
  }
`

export const InnerAnchorItem = ({
  children,
  to,
  href,
  activeClassName,
  onClick
}) => (
  <InnerListItem>
    <InnerAnchor
      href={href}
      to={to}
      activeClassName={activeClassName}
      onClick={onClick}
    >
      {children}
    </InnerAnchor>
  </InnerListItem>
)

export default InnerAnchorItem
