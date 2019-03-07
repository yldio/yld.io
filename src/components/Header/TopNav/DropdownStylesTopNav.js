import styled, { css } from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'

import headerItemStyles from '../headerItemStyles'
import topNavItemPadding from './topNavItemPadding'
import outlineStyles from '../outlineStyles'
import itemLightStyles, {
  hoverLightStyles,
  clickTapLightStyles,
  activeAndHoverLightStyles
} from './itemLightStyles'
import itemDarkStyles, {
  hoverDarkStyles,
  clickTapDarkStyles,
  activeAndHoverDarkStyles
} from './itemDarkStyles'

export const TopNavDropdownContainer = styled.li`
  position: relative;
  cursor: pointer;
  background: transparent;
  ${props => {
    if (props.themeVariation === 'light') {
      return css`
        > span {
          ${itemLightStyles}
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
          ${itemDarkStyles}
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

export const TopNavDropdownList = styled.ul`
  position: absolute;
  width: ${remcalc(160)};
  display: flex;
  flex-direction: column;
  top: ${remcalc(48)};
  left: -9999px;
  opacity: 0;
  transition: opacity ${props => props.theme.animations.normal} ease;
  background: ${props => props.theme.colors.greyBG};

  ${is('expanded')`
    left: 0;
    opacity: 1;
  `}
`

export const TopNavDropdownNameWrapper = styled.span`
  display: flex;
  align-items: center;
  transition: outline ${props => props.theme.animations.normal} ease-out;
  /* bumping the z-index so that the outline doesn't get behind the dropdown items list */
  z-index: 2;
  ${headerItemStyles}
  ${topNavItemPadding}
  ${outlineStyles}

  ${is('darkTheme')`
    &:focus {
      outline-color: white;
    } 
  `}
`

export const TopNavDropdownName = styled.span`
  margin-right: ${remcalc(6)};
`
