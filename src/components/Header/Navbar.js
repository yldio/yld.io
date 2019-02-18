import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import is from 'styled-is'

import close from '../../images/close.svg'

const MobileCloseButton = styled.button`
  position: absolute;
  min-width: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  min-height: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  top: ${remcalc(24)};
  right: ${remcalc(24)};
  background: transparent;
  color: ${props => props.theme.colors.white};
  border: none;
  font-size: ${remcalc(40)};
  height: ${remcalc(32)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:focus {
    background: transparent;
    outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
    color: ${props => props.theme.colors.text};
  }

  ${breakpoint('tablet')`
    display: none;
  `};
`
const NavbarItems = styled.ul`
  display: flex;
  flex-direction: column;
  padding: ${remcalc(12)} ${remcalc(24)};
  padding-right: ${remcalc(0)};
  justify-content: center;

  ${breakpoint('phone')`
    position: relative;
    top: -${remcalc(60)};
    padding-bottom: ${remcalc(24)};
  `}

  ${breakpoint('tablet')`
    position: static;
    width: auto;
    height: auto;
    flex-direction: row;
    padding-bottom: ${remcalc(12)};
  `};

  @media screen and (max-width: 768px) and (min-width: 600px) {
    padding: ${remcalc(36)};
  }
`
export const NavbarItem = styled.li`
  list-style-type: none;
  display: flex;

  &:not(:last-child) {
    margin-bottom: ${remcalc(18)};
  }

  ${breakpoint('tablet')`
    &:not(:last-child) {
      margin-right: ${remcalc(18)};
      margin-bottom: ${remcalc(0)};
    }
  `};
`
const NavBarContainer = styled(Flex).attrs({
  as: 'nav'
})`
  position: fixed;
  background: ${props => props.theme.colors.black};
  display: flex;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  flex-direction: column;
  z-index: ${props => props.theme.zIndexes.header};
  transform: translateX(100%);
  transition: transform ${props => props.theme.animations.fast} ease-in-out;
  justify-content: center;

  ${breakpoint('tablet')`
    display: flex;
    width: auto;
    opacity: 1;
    transform: translateX(0%);
    height: auto;
    flex-direction: row;
    background: transparent;
    position: relative;
  `};

  /* Showing the 'thinner version' of the navbar from 600px to tablet */
  @media screen and (max-width: 901px) and (min-width: 600px) {
    width: ${remcalc(295)};
    left: auto;
    right: 0;
    z-index: 10;
  }

  ${is('open')`
    transform: translateX(0%);
  `};
`

const Navbar = ({ children, isOpen, onClose }) => (
  <NavBarContainer open={isOpen}>
    <MobileCloseButton onClick={onClose}>
      <img src={close} alt="Close menu" />
    </MobileCloseButton>
    <NavbarItems>
      {children.map((child, idx) => (
        <NavbarItem key={idx}>{child}</NavbarItem>
      ))}
    </NavbarItems>
  </NavBarContainer>
)
export default Navbar
