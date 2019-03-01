import styled from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'

import outlineStyles from './outlineStyles'

const dropDownItemPadding = `padding: 10px 15px 14px 15px;`

export const TopNavDropdownContainer = styled.div`
  position: relative;
  transition: color ${props => props.theme.animations.fast} ease-in-out,
    background ${props => props.theme.animations.fast} ease-in-out;
  cursor: pointer;
  background: transparent;

  &:hover {
    background: ${props => props.theme.colors.greyBG};
  }

  ${is('expanded')`
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.text};

    &:hover {
      background: ${props => props.theme.colors.text};
    }
  `}

  ${is('darkTheme')`
    color: ${props => props.theme.colors.white};

    &:hover {
      background: #3A3553;
    }

    ${is('expanded')`
      background: ${props => props.theme.colors.vibrant};
      color: ${props => props.theme.colors.text};

      &:hover {
        background: ${props => props.theme.colors.vibrant};
        color: #007F56;
      }
    `}
  `}
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

  a {
    color: ${props => props.theme.colors.text};
    width: 100%;
    ${dropDownItemPadding}

    &:active,
    &:focus,
    &:hover {
      background: ${props => props.theme.colors.greyBG};
      color: ${props => props.theme.colors.textLight};
    }
    ${outlineStyles}
  }
`

export const TopNavDropdownListItem = styled.li`
  display: flex;
`

export const TopNavDropdownNameWrapper = styled.span`
  display: flex;
  align-items: center;
  transition: outline ${props => props.theme.animations.normal} ease-out;
  /* bumping the z-index so that the outline doesn't get behind the dropdown items list */
  z-index: 2;
  ${dropDownItemPadding}
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
