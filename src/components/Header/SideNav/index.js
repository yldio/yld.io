import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import is from 'styled-is'

import CloseButton from './CloseButton'
import Dropdown from './Dropdown'
import OuterAnchorItem from './OuterAnchorItem'
import breakpoint from 'styled-components-breakpoint'

const SideNavPanel = styled.nav`
  position: fixed;
  z-index: ${props => props.theme.zIndexes.header};
  background: ${props => props.theme.colors.blueBg};
  height: 100vh;

  transform: translateX(100%);
  transition: transform ${props => props.theme.animations.fast} ease-in-out;
  ${is('open')`
    transform: translateX(0%);
  `};

  ${breakpoint('phone')`
    width: 100vw;
    top: 0;
    left: 0;
  `}

  /* Thinner version' of the navbar */
  @media screen and (min-width: 600px) and (max-width: 959px) {
    width: ${remcalc(320)};
    left: auto;
    right: 0;
  }

  @media screen and (min-width: 960px) {
    display: none;
  }
`

const SideNav = ({ links, isOpen, onClose }) => (
  <SideNavPanel open={isOpen}>
    <Flex justifyEnd>
      <CloseButton onClick={onClose} />
    </Flex>
    <ul>
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
    </ul>
  </SideNavPanel>
)

export default SideNav
