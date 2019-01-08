import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export const StyledLinkCss = css`
  padding: ${remcalc(8)} ${remcalc(6)};
  margin-top: ${remcalc(3)};
  margin-bottom: ${remcalc(24)};
  margin-left: ${remcalc(-6)};
  line-height: ${remcalc(24)};
  color: ${props => props.theme.colors.text};
  font-weight: 700;
  position: relative;
  display: inline-block;
  transition: all 200ms ease-out;

  &:after {
    content: '';
    display: block;
    height: ${remcalc(2)};
    width: 100%;
    margin-top: ${remcalc(6)};
    background: ${props => props.theme.colors.text};
    box-sizing: border-box;
    ${is('noAfter')`
      content: none;
    `}
    ${is('reverse')`
      background: ${props => props.theme.colors.white};
  `};
  }

  &:hover {
    background: ${props => props.theme.colors.greyBG};
    color: ${props => props.theme.colors.text};
  }

  &:focus {
    background: transparent;
    outline: ${remcalc(4)} solid #6be9c1;
    color: ${props => props.theme.colors.text};
  }

  &:active {
    outline: none;
    background: #00edbf;
    color: ${props => props.theme.colors.text};

    &:after {
      background: ${props => props.theme.colors.text};
    }
  }

  ${is('reverse')`
    color: ${props => props.theme.colors.white};

    &:hover {
      background: ${props => props.theme.colors.black};
      color: ${props => props.theme.colors.white};
    }

    &:focus {
      background: transparent;
      outline: ${remcalc(4)} solid #6be9c1;
      color: ${props => props.theme.colors.white};
    }

    &:active {
      outline: none;
      background: #00edbf;
      color: ${props => props.theme.colors.text};

      &:after {
        background: ${props => props.theme.colors.text};
      }
    }
  `};
`

const Anchor = styled(Link)`
  ${StyledLinkCss};
`

const StyledAnchor = Anchor.withComponent('a')

const StyledLink = ({ to, href, children, ...props }) => {
  if (to) {
    return (
      <Anchor to={to} {...props}>
        {children}
      </Anchor>
    )
  }

  return (
    <StyledAnchor href={href} {...props}>
      {children}
    </StyledAnchor>
  )
}

export default StyledLink
