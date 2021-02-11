import React from 'react';
import styled, { css } from 'styled-components';
import remcalc from 'remcalc';

import Anchor from '../../Common/Anchor';
import headerItemStyles from '../utils/headerItemStyles';
import topNavItemStyles from './desktopNavItemStyles';

const InnerListItem = styled.li`
  display: flex;

  ${props => (props.themeVariation === 'white' ? innerWhite : innerDark)}
`;

const innerWhite = css`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};

  > a {
    &:hover,
    &:active,
    &.current {
      color: ${props => props.theme.colors.text};
      font-weight: bold;
    }
  }
`;

const innerDark = css`
  background: ${props => props.theme.colors.blueBg};
  color: ${props => props.theme.colors.white};

  > a {
    &:hover,
    &:active,
    &.current {
      color: ${props => props.theme.colors.white};
      font-weight: bold;
    }
  }
`;

const InnerAnchor = styled(Anchor)`
  ${headerItemStyles}
  ${topNavItemStyles}

  line-height: ${remcalc(6)};
  width: 100%;
`;

export const InnerAnchorItem = ({
  children,
  to,
  href,
  currentClassName,
  themeVariation,
  label,
  ...props
}) => (
  <InnerListItem themeVariation={themeVariation} {...props}>
    <InnerAnchor
      href={href}
      to={to}
      title={label}
      /**
       * Tab Index here is very important! It
       * allows e.relatedTarget in Dropdown.js to
       * get this dropdown element to perform the
       * dropdown.contains(e.relatedTarget) check!
       *
       * Without tabindex={0} to relatedTarget is the
       * gatsby app wrapper element that wraps the
       * entire app, i.e. not what we want!
       *
       * Do not remove unless with good reason, always
       * perform cross browser testing!
       */
      tabIndex={0}
      currentClassName={currentClassName}
    >
      {children}
    </InnerAnchor>
  </InnerListItem>
);

export default InnerAnchorItem;
