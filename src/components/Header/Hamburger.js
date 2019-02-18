import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import menu from '../../images/menu.svg'

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

const Hamburger = ({ onClick }) => (
  <HamburgerButton onClick={onClick}>
    <img src={menu} alt="open menu" />
  </HamburgerButton>
)

export default Hamburger
