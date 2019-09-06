import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import is from 'styled-is'

import links from '../utils/navLinks'
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
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform ${props => props.theme.animations.fast} ease-in-out;

  /* Thinner version of Sidenav for tablet devices */
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

const SideNav = ({ isOpen, onClose, path }) => (
  <SideNavPanel open={isOpen}>
    <Flex justifyEnd>
      <CloseButton onClick={onClose} />
    </Flex>
    <ul>
      <OuterAnchorItem activeClassName="active" to="/" label="Home" />
      {links &&
        links.length &&
        links.map(({ label, dropdownItems, attributes, to, href }) =>
          dropdownItems && dropdownItems.length > 0 ? (
            <Dropdown
              items={dropdownItems}
              path={path}
              dataEvent={attributes ? attributes.dataEvent : null}
            >
              {label}
            </Dropdown>
          ) : (
            <OuterAnchorItem
              activeClassName="active"
              to={to}
              href={href}
              label={label}
              attributes={attributes}
            />
          )
        )}
    </ul>
  </SideNavPanel>
)

export default SideNav
