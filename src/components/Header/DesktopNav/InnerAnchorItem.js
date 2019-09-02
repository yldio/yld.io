import React from 'react'
import styled from 'styled-components'

import outlineStyles from '../utils/outlineStyles'
import Anchor from '../../Common/Anchor'
import headerItemStyles from '../utils/headerItemStyles'
import topNavItemStyles from './topNavItemStyles'

const InnerListItem = styled.li`
  display: flex;
`

const InnerAnchor = styled(Anchor)`
  ${headerItemStyles}
  ${topNavItemStyles}
  ${outlineStyles}

  width: 100%;
  background: ${props => props.theme.colors.greyBg};
  color: ${props => props.theme.colors.textLight};

  &:hover,
  &.active {
    color: ${props => props.theme.colors.text};
  }
`

export const InnerAnchorItem = ({
  children,
  to,
  href,
  activeClassName,
  themeVariation,
  onMouseDown,
  label,
  ...props
}) => (
  <InnerListItem themeVariation={themeVariation} {...props}>
    <InnerAnchor
      href={href}
      to={to}
      title={label}
      activeClassName={activeClassName}
      onMouseDown={onMouseDown}
    >
      {children}
    </InnerAnchor>
  </InnerListItem>
)

export default InnerAnchorItem
