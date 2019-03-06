import React from 'react'
import styled, { css } from 'styled-components'
import remcalc from 'remcalc'

import Anchor from '../Common/Anchor'
import headerAnchorStyles from './headerAnchorStyles'
import outlineStyles from './outlineStyles'

const StyledAnchor = styled(Anchor)`
  ${headerAnchorStyles}
  font-weight: 400;
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
`

const itemLightStyles = css`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  opacity: 1;

  &:hover,
  > a:hover {
    background: ${props => props.theme.colors.greyBG};
    color: ${props => props.theme.colors.text};
    opacity: 1;
  }

  // click/tap
  > a:active {
    background: ${props => props.theme.colors.text};
    color: ${props => props.theme.colors.white};
    opacity: 1;
  }

  // current page
  > a.active {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.text};
    opacity: 0.5;

    &:hover {
      background: ${props => props.theme.colors.text};
      color: #a9a9a9;
      opacity: 1;
    }
  }
`

const itemDarkStyles = css`
  background: ${props => props.theme.colors.blueBg};
  color: ${props => props.theme.colors.white};
  opacity: 1;

  &:hover,
  > a:hover {
    background: #3a3553;
    color: ${props => props.theme.colors.white};
    opacity: 1;
  }

  // click/tap
  > a:active {
    background: ${props => props.theme.colors.vibrant};
    color: ${props => props.theme.colors.text};
    opacity: 1;
  }

  // current page
  > a.active {
    background: ${props => props.theme.colors.blueBg};
    color: ${props => props.theme.colors.white};
    opacity: 0.7;

    &:hover {
      background: ${props => props.theme.colors.vibrant};
      color: #007f56;
      opacity: 1;
    }
  }
`

const TopNavListItem = styled.li`
  display: flex;
  > a:focus {
    ${outlineStyles}
  }

  ${props =>
    props.themeVariation === 'dark' ? itemDarkStyles : itemLightStyles}
`

const TopNavAnchorItem = ({
  children,
  to,
  href,
  activeClassName,
  themeVariation,
  ...props
}) => (
  <TopNavListItem themeVariation={themeVariation} {...props}>
    <StyledAnchor href={href} to={to} activeClassName={activeClassName}>
      {children}
    </StyledAnchor>
  </TopNavListItem>
)

export default TopNavAnchorItem
