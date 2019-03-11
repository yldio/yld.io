import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import is from 'styled-is'

import close from '../../../images/close.svg'
import Dropdown from './Dropdown'
import OuterAnchorItem from './OuterAnchorItem'

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
    outline: ${remcalc(4)} solid ${props => props.theme.colors.vibrant};
    color: ${props => props.theme.colors.text};
  }
`

const SideNavList = styled.ul``

const SideNavPanel = styled(Flex).attrs({
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

const SideNav = ({ links, isOpen, onClose }) => (
  <SideNavPanel open={isOpen}>
    <MobileCloseButton onClick={onClose}>
      <img src={close} alt="Close menu" />
    </MobileCloseButton>
    <SideNavList>
      <OuterAnchorItem activeClassName="active" to="/">
        Home
      </OuterAnchorItem>
      {links.map((link, idx) => {
        if (link.dropdownItems) {
          const { label, dropdownItems } = link
          return (
            <Dropdown key={idx} items={dropdownItems}>
              {label}
            </Dropdown>
          )
        } else {
          const { label, to, href } = link
          return (
            <OuterAnchorItem
              key={idx}
              activeClassName="active"
              to={to}
              href={href}
            >
              {label}
            </OuterAnchorItem>
          )
        }
      })}
    </SideNavList>
  </SideNavPanel>
)

export default SideNav
