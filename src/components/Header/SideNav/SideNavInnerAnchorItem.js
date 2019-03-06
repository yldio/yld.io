import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import outlineStyles from '../outlineStyles'
import itemPadding from './itemPadding'

const StyledAnchor = styled(Anchor)`
  ${headerItemStyles}
  ${itemPadding}
  font-weight: 400;
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};

  background: ${props => props.theme.colors.greyBG};
  color: ${props => props.theme.colors.text};
  opacity: 0.5;

  &:hover,
  &.active {
    color: ${props => props.theme.colors.text};
    opacity: 1;
  }
`

const SideNavInnerListItem = styled.li`
  display: flex;
  > a:focus {
    ${outlineStyles}
  }
`

const SideNavInnerAnchorItem = ({
  children,
  to,
  href,
  activeClassName,
  themeVariation,
  onClick,
  ...props
}) => (
  <SideNavInnerListItem themeVariation={themeVariation} {...props}>
    <StyledAnchor
      href={href}
      to={to}
      activeClassName={activeClassName}
      onClick={onClick}
    >
      {children}
    </StyledAnchor>
  </SideNavInnerListItem>
)

export default SideNavInnerAnchorItem
