import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import remcalc from 'remcalc';

import Chevron from '../../Common/Chevron';
import InnerAnchorItem from './InnerAnchorItem';
import headerItemStyles from '../utils/headerItemStyles';
import DesktopNavItemStyles from './desktopNavItemStyles';
import TopNavItem from './TopNavItem';

const DropdownContainer = styled(TopNavItem)`
  position: relative;
  cursor: pointer;
  background: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  > span {
    ${props => props.states.default}
    &:hover {
      ${props => props.states.default}
      ${props => props.states.hover}
    }
    &:active {
      ${props => props.states.default}
      ${props => props.states.clickTap}
    }

    ${is('current')`
      ${props => props.states.current}
    `}

    ${is('expanded')`
      ${props => props.states.current}
    `}
  }
`;

const DropdownNameWrapper = styled.span`
  ${headerItemStyles}
  ${DesktopNavItemStyles}

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* bumping the z-index so that the outline doesn't get behind the dropdown items list */
  z-index: 2;

  > span {
    padding-right: ${remcalc(6)};
    outline: none;
    user-select: none;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  width: ${remcalc(160)};
  display: flex;
  flex-direction: column;
  top: 100%;
  transition: opacity ${props => props.theme.animations.normal} ease;
  z-index: ${props => props.theme.zIndexes.header};

  display: none;
  opacity: 0;

  ${is('expanded')`
    display: block;
    opacity: 1;
  `};
`;

const Dropdown = ({ items, path, themeVariation, children, dataEvent }) => {
  const [isExpanded, toggleDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    if (!hasTouch()) {
      return;
    }

    toggleDropdown(!isExpanded);
  };

  const handleFocus = () => {
    if (hasTouch()) {
      return;
    }
    toggleDropdown(true);
  };

  const handleBlur = e => {
    if (hasTouch()) {
      return;
    }
    /**
     * Here the event gives us `relatedTarget`, this value is a
     * DOM node of the new focused element, knowing this value
     * and setting a ref on the DropdownContainer, we can work
     * out if the new relatedTarget is a child of the DropdownContainer.
     * This functionality is to make sure that users are able to
     * tab through the navigation properly.
     */
    toggleDropdown(dropdownRef.current.contains(e.relatedTarget));
  };

  const hasTouch = () => {
    return 'ontouchstart' in window;
  };

  return (
    <DropdownContainer
      ref={dropdownRef}
      current={items.some(({ to }) => to === path)}
      expanded={isExpanded}
      aria-haspopup="true"
      aria-expanded={isExpanded}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      themeVariation={themeVariation}
    >
      <DropdownNameWrapper tabIndex="0" themeVariation={themeVariation}>
        <span data-event={dataEvent}>{children}</span>
        <Chevron direction={isExpanded ? 'up' : 'down'} />
      </DropdownNameWrapper>
      <DropdownList expanded={isExpanded}>
        {items.map(({ to, href, label }) => (
          <InnerAnchorItem
            key={label}
            themeVariation={themeVariation}
            href={href}
            to={to}
            currentClassName="current"
            label={label}
          >
            {label}
          </InnerAnchorItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default Dropdown;
