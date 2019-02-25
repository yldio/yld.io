import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import is from 'styled-is'

import close from '../../images/close.svg'
import HeaderAnchor from './HeaderAnchor'

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
  padding: ${remcalc(12)};
  padding-right: ${remcalc(0)};

  ${breakpoint('phone')`
    position: relative;
    padding-bottom: ${remcalc(24)};
  `}

  ${breakpoint('smallTablet')`
    width: auto;
    height: auto;
  `};

  @media screen and (min-width: 600px) and (max-width: 901px) {
    position: static;
    top: -${remcalc(60)};
    padding: ${remcalc(36)};
  }

  @media screen and (min-width: 901px) {
    top: 0;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    max-width: ${remcalc(655)};
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
      margin-bottom: ${remcalc(0)};
    }

    &:last-child > a{
      padding-right: 0;
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
  flex: 1;
  justify-content: flex-start;
  padding-top: ${remcalc(60)};

  /* Showing the 'thinner version' of the navbar from 600px to tablet */
  @media screen and (min-width: 600px) and (max-width: 901px) {
    padding-top: 0;
    width: ${remcalc(295)};
    left: auto;
    right: 0;
    z-index: 10;
    justify-content: center;
  }

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

  @media screen and (min-width: 901px) {
    padding-top: 0;
    justify-content: flex-end;
  }

  ${is('open')`
    transform: translateX(0%);
  `};
`

const HomeLink = styled(HeaderAnchor)`
  display: block;

  ${breakpoint('tablet')`
    display: none;
  `};
`

const Navbar = ({ links, isOpen, onClose, blue }) => (
  <NavBarContainer open={isOpen}>
    <MobileCloseButton onClick={onClose}>
      <img src={close} alt="Close menu" />
    </MobileCloseButton>
    <NavbarItems>
      <NavbarItem>
        <HomeLink activeClassName="active" to="/">
          Home
        </HomeLink>
      </NavbarItem>
      {links.map((link, idx) => (
        <NavbarItem key={idx}>
          {link.isInternal ? (
            <HeaderAnchor
              light={!!blue}
              activeClassName="active"
              to={link.path}
            >
              {link.text}
            </HeaderAnchor>
          ) : (
            <HeaderAnchor
              light={!!blue}
              activeClassName="active"
              href={link.path}
            >
              {link.text}
            </HeaderAnchor>
          )}
        </NavbarItem>
      ))}
    </NavbarItems>
  </NavBarContainer>
)
export default Navbar
