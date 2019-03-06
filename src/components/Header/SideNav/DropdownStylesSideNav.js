import styled, { css } from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'

import Anchor from '../../Common/Anchor'
import headerItemStyles from '../headerItemStyles'
import itemPadding from './itemPadding'

export const SideNavDropdownContainer = styled.div`
  cursor: pointer;
  background: inherit;
`

export const SideNavDropdownList = styled.ul`
  display: none;
  opacity: 0;

  ${is('expanded')`
    display: flex;
    flex-direction: column;
    width: 100%;
    opacity: 1;
    transition: opacity ${props => props.theme.animations.normal} ease;
    background: ${props => props.theme.colors.greyBG};
  `}
`

const OuterItemStyles = css`
  ${headerItemStyles}
  display: block;
  font-weight: 400;
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
  background: inherit;
  color: ${props => props.theme.colors.white};
  opacity: 0.5;

  &:hover,
  &.active {
    color: ${props => props.theme.colors.white};
    opacity: 1;
  }
`

export const SideNavOuterAnchor = styled(Anchor)`
  ${OuterItemStyles}
`

export const SideNavDropdownNameWrapper = styled.span`
  ${OuterItemStyles}
  display: flex;
  align-items: center;
  ${itemPadding}

  ${is('expanded')`
    color: ${props => props.theme.colors.white};
    opacity: 1;
  `}
  
  ${is('darkTheme')`
    &:focus {
      outline-color: white;
    } 
  `}
`

export const SideNavDropdownName = styled.span`
  width: 320px;
`
