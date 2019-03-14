import React from 'react'
import styled, { css } from 'styled-components'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import outlineStyles from '../outlineStyles'
import topNavItemSpacing from './topNavItemSpacing'
import {
  fontSizeAndWeight,
  defaultLightStyles,
  hoverLightStyles,
  clickTapLightStyles,
  activeLightStyles,
  activeAndHoverLightStyles,
  defaultDarkStyles,
  hoverDarkStyles,
  clickTapDarkStyles,
  activeDarkStyles,
  activeAndHoverDarkStyles
} from './outerItemStyles'

const StyledAnchor = styled(Anchor)`
  ${headerItemStyles}
  ${fontSizeAndWeight}
  ${topNavItemSpacing}

  &:focus {
    ${outlineStyles}
  }
`

const StyledListItem = styled.li`
  display: flex;
  &:focus {
    ${outlineStyles}
  }

  ${props => {
    if (props.themeVariation === 'light') {
      return css`
        ${defaultLightStyles}

        &:hover,
        > a:hover {
          ${hoverLightStyles}
        }

        > a:active {
          ${clickTapLightStyles}
        }

        > a.active {
          ${activeLightStyles}
          &:active {
            ${activeLightStyles}
          }

          &:hover {
            ${activeAndHoverLightStyles}
          }
        }
      `
    } else if (props.themeVariation === 'dark') {
      return css`
        ${defaultDarkStyles}

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
