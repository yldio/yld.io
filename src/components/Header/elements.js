import React from 'react'
import styled, { css } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'
import remcalc from 'remcalc'
import menu from '../../images/menu.svg'

export const outlineStyles = css`
  &:focus {
    outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
  }

  &:active {
    outline: none;
  }
`

const HamburgerButton = styled.button`
  display: flex;
  cursor: pointer;
  margin: 0;
  border: none;
  background: transparent;
  padding: ${remcalc(8)} ${remcalc(6)};

  &:focus {
    background: transparent;
    outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
    color: ${props => props.theme.colors.text};
  }

  ${breakpoint('tablet')`
    display: none;
  `};
`

export const Hamburger = ({ onClick }) => (
  <HamburgerButton onClick={onClick}>
    <img src={menu} alt="open menu" />
  </HamburgerButton>
)

export const Overlay = styled.div`
  display: none;

  @media screen and (max-width: 768px) and (min-width: 600px) {
    z-index: 9;
    background-color: rgba(51, 51, 51, 0.2);
    content: '';
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    transition: opacity ${props => props.theme.animations.fast} ease-out;
    opacity: 0;
    transform: translateX(200%);

    ${is('visible')`
      transform: translateX(0);
      opacity: 1;
    `}
  }
`
