import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import generate from 'shortid';

import links from '../utils/navLinks';
import CloseButton from './CloseButton';
import Dropdown from './Dropdown';
import OuterAnchorItem from './OuterAnchorItem';

const MobileNavPanel = styled.nav`
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

  /* Thinner version of MobileNav for tablet devices */
  @media screen and (min-width: 600px) and (max-width: 959px) {
    width: ${remcalc(295)};
    left: auto;
    right: 0;
  }

  ${is('open')`
    transform: translateX(0%);
  `};

  @media screen and (min-width: 1000px) {
    display: none;
  }
`;

const MobileNav = ({ isOpen, onClose, path }) => (
  <MobileNavPanel open={isOpen}>
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
              key={generate()}
              items={dropdownItems}
              path={path}
              dataEvent={attributes ? attributes.dataEvent : null}
            >
              {label}
            </Dropdown>
          ) : (
            <OuterAnchorItem
              key={generate()}
              activeClassName="active"
              to={to}
              href={href}
              label={label}
              attributes={attributes}
            />
          ),
        )}
    </ul>
  </MobileNavPanel>
);

export default MobileNav;
