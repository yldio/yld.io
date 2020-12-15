import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import generate from 'shortid';
import remcalc from 'remcalc';
import is from 'styled-is';

import Chevron from '../../Common/Chevron';
import InnerAnchorItem from './InnerAnchorItem';
import headerItemStyles from '../utils/headerItemStyles';
import mobileNavItemStyles from './mobileNavItemStyles';
import outerItemStates from './outerItemStates';
import { underlinePseudoElement } from '../../Common/StyledLink';

const themeFn = ({ theme, themeVariation }) =>
  themeVariation === 'white' ? theme.colors.blueBg : theme.colors.vibrant;

const DropdownContainer = styled.li`
  > span {
    > span {
      &:after {
        ${underlinePseudoElement}
        background: ${props => themeFn(props)};
        opacity: 0;
        transition: all ${({ theme }) => theme.animations.fast} ease-out;
      }

      ${is('expanded')`
        &:after {
          opacity: 1;
        }
      `}
      }
    }

    svg {
      color: ${props => themeFn(props)};
      margin-bottom: ${remcalc(10)};
    }
  }
`;

const DropdownNameWrapper = styled.span.attrs(() => ({
  states: outerItemStates,
}))`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${headerItemStyles}
  ${mobileNavItemStyles}

  ${({ states, themeVariation }) =>
    themeVariation === 'white' ? states.white : states.dark}
`;

const DropdownName = styled.span`
  max-width: ${remcalc(320)};
  padding-right: ${remcalc(15)};
`;
const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 ${props => props.theme.spacing[1]};
`;

const Dropdown = ({ items, path, themeVariation, children, dataEvent }) => {
  const [isExpanded, toggleDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleFocus = () => {
    toggleDropdown(true);
  };

  const handleBlur = e => {
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

  return (
    <DropdownContainer
      ref={dropdownRef}
      current={items.some(({ to }) => to === path)}
      expanded={isExpanded}
      aria-haspopup="true"
      aria-expanded={isExpanded}
      themeVariation={themeVariation}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <DropdownNameWrapper
        tabIndex="0"
        data-event={dataEvent}
        themeVariation={themeVariation}
      >
        <DropdownName>{children}</DropdownName>
        <Chevron direction={isExpanded ? 'up' : 'down'} size={10} />
      </DropdownNameWrapper>
      {isExpanded && (
        <DropdownList>
          {items.map(({ to, href, label }) => (
            <InnerAnchorItem
              key={generate()}
              href={href}
              to={to}
              currentClassName="current"
              label={label}
              themeVariation={themeVariation}
            >
              {label}
            </InnerAnchorItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
