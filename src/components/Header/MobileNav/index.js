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
import ContactItem from './ContactItem';
import { breakpointsWithHeader } from '../../../utils/theme';

const themeFn = ({ theme, themeVariation }) =>
  themeVariation === 'white' ? theme.colors.white : theme.colors.blueBg;

const MobileNavPanel = styled.nav`
  background: ${props => themeFn(props)};

  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: ${props => props.theme.zIndexes.header};
  overflow-y: auto;
  padding-bottom: ${remcalc(60)};

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

  ${breakpointsWithHeader.header`
    display: none;
  `}
`;

const MobileNav = ({ isOpen, onClose, path, themeVariation }) => (
  <MobileNavPanel open={isOpen} themeVariation={themeVariation}>
    <Flex justifyEnd>
      <CloseButton themeVariation={themeVariation} onClick={onClose} />
    </Flex>
    <ul>
      {links &&
        links.length &&
        links.map(({ label, dropdownItems, attributes, to, href }) =>
          dropdownItems && dropdownItems.length > 0 ? (
            <Dropdown
              key={generate()}
              items={dropdownItems}
              path={path}
              themeVariation={themeVariation}
              dataEvent={attributes ? attributes.dataEvent : null}
            >
              {label}
            </Dropdown>
          ) : (
            <OuterAnchorItem
              key={generate()}
              currentClassName="current"
              to={to}
              href={href}
              label={label}
              attributes={attributes}
              themeVariation={themeVariation}
            />
          ),
        )}
      <ContactItem
        themeVariation={themeVariation}
        currentClassName="current"
        to="/contact/"
        label="Contact"
      />
    </ul>
  </MobileNavPanel>
);

export default MobileNav;
