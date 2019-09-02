import React from 'react'
import styled from 'styled-components'

import outlineStyles from '../utils/outlineStyles'
import Anchor from '../../Common/Anchor'
import headerItemStyles from '../utils/headerItemStyles'
import topNavItemStyles from './desktopNavItemStyles'

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
  label,
  ...props
}) => (
  <InnerListItem themeVariation={themeVariation} {...props}>
    <InnerAnchor
      href={href}
      to={to}
      title={label}
      activeClassName={activeClassName}
    >
      {children}
    </InnerAnchor>
  </InnerListItem>
)

export default InnerAnchorItem
