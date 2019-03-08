import React from 'react'
import styled from 'styled-components'

import outlineStyles from '../outlineStyles'
import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import { fontSizeAndWeight as topNavFont } from './outerItemStyles'
import topNavItemPadding from './topNavItemPadding'

const InnerListItem = styled.li`
  display: flex;
  > a:focus {
    ${outlineStyles}
  }
`

const InnerAnchor = styled(Anchor)`
  ${headerItemStyles}
  ${topNavFont}
  ${topNavItemPadding}

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
  themeVariation,
  onClick,
  ...props
}) => (
  <InnerListItem themeVariation={themeVariation} {...props}>
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
