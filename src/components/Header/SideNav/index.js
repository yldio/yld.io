import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import is from 'styled-is'

import CloseButton from './CloseButton'
import Dropdown from './Dropdown'
import OuterAnchorItem from './OuterAnchorItem'

const SideNavPanel = styled.nav`
  position: fixed;
  background: ${props => props.theme.colors.blueBg};
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: ${props => props.theme.zIndexes.header};
  transform: translateX(100%);
  transition: transform ${props => props.theme.animations.fast} ease-in-out;

  /* Thinner version' of the navbar */
  @media screen and (min-width: 600px) and (max-width: 959px) {
    width: ${remcalc(295)};
    left: auto;
    right: 0;
  }

  ${is('open')`
    transform: translateX(0%);
  `};

  @media screen and (min-width: 960px) {
    display: none;
  }
`

const SideNavItem = ({ item, path }) => {
  if (item.dropdownItems) {
    const { label, dropdownItems } = item
    return (
      <Dropdown items={dropdownItems} path={path}>
        {label}
      </Dropdown>
    )
  } else {
    const { label, to, href } = item
    return (
      <OuterAnchorItem activeClassName="active" to={to} href={href}>
        {label}
      </OuterAnchorItem>
    )
  }
}

const SideNav = ({ links, isOpen, onClose, path }) => (
  <SideNavPanel open={isOpen}>
    <Flex justifyEnd>
      <CloseButton onClick={onClose} />
    </Flex>
    <ul>
      <OuterAnchorItem activeClassName="active" to="/">
        Home
      </OuterAnchorItem>
      {links.map((link, idx) => (
        <SideNavItem item={link} key={idx} path={path} />
      ))}
    </ul>
  </SideNavPanel>
)

export default SideNav
