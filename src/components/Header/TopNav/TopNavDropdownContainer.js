import styled, { css } from 'styled-components'
import is from 'styled-is'

import {
  defaultLightStyles,
  hoverLightStyles,
  clickTapLightStyles,
  activeAndHoverLightStyles,
  defaultDarkStyles,
  hoverDarkStyles,
  clickTapDarkStyles,
  activeAndHoverDarkStyles
} from './outerItemStyles'

const TopNavDropdownContainer = styled.li`
  position: relative;
  cursor: pointer;
  background: transparent;
  ${props => {
    if (props.themeVariation === 'light') {
      return css`
        > span {
          ${defaultLightStyles}
        }

        &:hover {
          > span {
            ${hoverLightStyles}
          }
        }

        ${is('expanded')`
          > span {
            ${clickTapLightStyles}
          }
      
          &:hover {
            > span {
              ${activeAndHoverLightStyles}
            }
          }
        `}
      `
    } else if (props.themeVariation === 'dark') {
      return css`
        > span {
          ${defaultDarkStyles}
        }

        &:hover {
          > span {
            ${hoverDarkStyles}
          }
        }

        ${is('expanded')`
          > span {
            ${clickTapDarkStyles}
          }
      
          &:hover {
            > span {
              ${activeAndHoverDarkStyles}
            }
          }
        `}
      `
    }
  }}
`

export default TopNavDropdownContainer
