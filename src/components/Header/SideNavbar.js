import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import is from 'styled-is'

import close from '../../images/close.svg'
import SideNavAnchor from './SideNavAnchor'

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

  /* Thinner version' of the navbar */
  @media screen and (min-width: 600px) and (max-width: 1009px) {
    width: ${remcalc(295)};
    left: auto;
    right: 0;
    z-index: 10;
  }

  ${is('open')`
    transform: translateX(0%);
  `};

  @media screen and (min-width: 1010px) {
    display: none;
  }
`

const SideNavbar = ({ links, isOpen, onClose, dark }) => (
  <SideNavModal open={isOpen}>
    <MobileCloseButton onClick={onClose}>
      <img src={close} alt="Close menu" />
    </MobileCloseButton>
    <SideNavList>
      <SideNavListItem>
        <SideNavAnchor activeClassName="active" to="/">
          Home
        </SideNavAnchor>
      </SideNavListItem>
      {links.map((link, idx) => {
        const { label, to, href } = link
        return (
          <SideNavListItem key={idx}>
            <SideNavAnchor
              dark={dark}
              activeClassName="active"
              to={to}
              href={href}
            >
              {label}
            </SideNavAnchor>
          </SideNavListItem>
        )
      })}
    </SideNavList>
  </SideNavModal>
)
export default SideNavbar
