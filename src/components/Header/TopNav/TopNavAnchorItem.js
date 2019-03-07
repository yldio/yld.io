import React from 'react'
import styled, { css } from 'styled-components'
import remcalc from 'remcalc'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import outlineStyles from '../outlineStyles'
import topNavItemPadding from './topNavItemPadding'
import itemLightStyles, {
  hoverLightStyles,
  clickTapLightStyles,
  activeLightStyles,
  activeAndHoverLightStyles
} from './itemLightStyles'
import itemDarkStyles, {
  hoverDarkStyles,
  clickTapDarkStyles,
  activeDarkStyles,
  activeAndHoverDarkStyles
} from './itemDarkStyles'

const StyledAnchor = styled(Anchor)`
  ${headerItemStyles}
  ${topNavItemPadding}
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
`

const TopNavListItem = styled.li`
  display: flex;
  > a:focus {
    ${outlineStyles}
  }

  ${props => {
    if (props.themeVariation === 'light') {
      return css`
        ${itemLightStyles}

        &:hover,
        > a:hover {
          ${hoverLightStyles}
        }

        > a:active {
          ${clickTapLightStyles}
        }

        > a.active {
          ${activeLightStyles}

          &:hover {
            ${activeAndHoverLightStyles}
          }
        }
      `
    } else if (props.themeVariation === 'dark') {
      return css`
        ${itemDarkStyles}

        &:hover,
        > a:hover {
          ${hoverDarkStyles}
        }

        > a:active {
          ${clickTapDarkStyles}
        }

        > a.active {
          ${activeDarkStyles}

          &:hover {
            ${activeAndHoverDarkStyles}
          }
        }
      `
    }
  }}
`

const TopNavAnchorItem = ({
  children,
  to,
  href,
  activeClassName,
  themeVariation,
  onClick,
  ...props
}) => (
  <TopNavListItem themeVariation={themeVariation} {...props}>
    <StyledAnchor
      href={href}
      to={to}
      activeClassName={activeClassName}
      onClick={onClick}
    >
      {children}
    </StyledAnchor>
  </TopNavListItem>
)

export default TopNavAnchorItem
