import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import remcalc from 'remcalc';
import OuterAnchorItem from './OuterAnchorItem';
import Dropdown from './Dropdown';
import links from '../utils/navLinks';
import ContactButton from './ContactButton';

const IfDesktopHeader = styled.div`
  ${breakpoint('smallPhone', 'header')`
    display: none;
  `}
`;

const SmallTabletAndUp = styled.div`
  ${breakpoint('smallPhone', 'smallTablet')`
    display: none;
  `}
`;

const TopNavList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${remcalc(20)} ${remcalc(0)} ${remcalc(16)};
`;

const TopNav = ({ path, themeVariation }) => (
  <TopNavList>
    {links.map(({ label, dropdownItems, attributes, to, href }) => (
      <IfDesktopHeader key={label}>
        {dropdownItems && dropdownItems.length > 0 ? (
          <Dropdown
            path={path}
            themeVariation={themeVariation}
            items={dropdownItems}
            dataEvent={
              attributes && attributes.dataEvent ? attributes.dataEvent : null
            }
          >
            {label}
          </Dropdown>
        ) : (
          <OuterAnchorItem
            themeVariation={themeVariation}
            currentClassName="current"
            to={to}
            href={href}
            title={label}
            attributes={attributes}
          >
            {label}
          </OuterAnchorItem>
        )}
      </IfDesktopHeader>
    ))}
    <SmallTabletAndUp>
      <ContactButton themeVariation={themeVariation} />
    </SmallTabletAndUp>
  </TopNavList>
);

export default TopNav;
