import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'

const HamburgerSvg = styled.svg`
  fill: currentColor;

  ${is('light')`
    fill: ${props => props.theme.colors.white};
  `}
`

const HamburgerButton = styled.button`
  ${breakpoint('phone')`
    display: flex;
    cursor: pointer;
    margin: 0;
    border: none;
    background: transparent;
    padding: ${remcalc(8)} ${remcalc(6)};

    &:focus {
      background: transparent;
      outline: ${remcalc(4)} solid ${props => props.theme.colors.vibrant};
      color: ${props => props.theme.colors.text};
    }
  `}

  @media screen and (min-width: 960px) {
    display: none;
  }
`

const Hamburger = ({ onClick, light }) => (
  <HamburgerButton onClick={onClick}>
    <HamburgerSvg
      light={light}
      title="open menu"
      width="24"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 16h24v2H0zm0-8h24v2H0zm0-8h24v2H0z" fillRule="evenodd" />
    </HamburgerSvg>
  </HamburgerButton>
)

export default Hamburger
