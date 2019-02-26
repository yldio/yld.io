import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import is from 'styled-is'

import close from '../../images/close.svg'
import HeaderAnchor from './HeaderAnchor'

const MobileCloseButton = styled.button`
  min-width: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  min-height: ${props => remcalc(props.theme.elementSizes.tappableArea)};
  background: transparent;
  color: ${props => props.theme.colors.white};
  border: none;
  font-size: ${remcalc(40)};
  height: ${remcalc(24)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin: ${remcalc(24)};

  &:focus {
    background: transparent;
    outline: ${remcalc(4)} solid ${props => props.theme.colors.outline};
    color: ${props => props.theme.colors.text};
  }
`
const SideNavList = styled.ul`
  padding-left: ${remcalc(24)};
`

export const SideNavListItem = styled.li`
  list-style-type: none;

  &:not(:last-child) {
    margin-bottom: ${remcalc(18)};
  }

  &:last-child > a {
    padding-right: 0;
  }
`
const SideNavModal = styled(Flex).attrs({
  as: 'nav'
})`
  position: fixed;
  background: ${props => props.theme.colors.blueBg};
  display: flex;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  flex-direction: column;
  z-index: ${props => props.theme.zIndexes.header};
  transform: translateX(100%);
  transition: transform ${props => props.theme.animations.fast} ease-in-out;

  /* Showing the 'thinner version' of the navbar from 600px to tablet */
  @media screen and (min-width: 600px) and (max-width: 959px) {
    width: ${remcalc(295)};
    left: auto;
    right: 0;
    z-index: 10;
  }

  ${is('open')`
    transform: translateX(0%);
  `};

  @media screen and (min-width: 960px) {
    display: none;
  }
`

const SideNavbar = ({ links, isOpen, onClose, blue }) => (
  <SideNavModal open={isOpen}>
    <MobileCloseButton onClick={onClose}>
      <img src={close} alt="Close menu" />
    </MobileCloseButton>
    <SideNavList>
      <SideNavListItem>
        <HeaderAnchor activeClassName="active" to="/">
          Home
        </HeaderAnchor>
      </SideNavListItem>
      {links.map((link, idx) => (
        <SideNavListItem key={idx}>
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
        </SideNavListItem>
      ))}
    </SideNavList>
  </SideNavModal>
)
export default SideNavbar
