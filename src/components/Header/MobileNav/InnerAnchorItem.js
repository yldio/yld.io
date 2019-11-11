import React from 'react';
import styled from 'styled-components';

import outlineStyles from '../utils/outlineStyles';
import Anchor from '../../Common/Anchor';
import headerItemStyles from '../utils/headerItemStyles';
import mobileNavItemStyles from './mobileNavItemStyles';

const InnerListItem = styled.li`
  display: flex;
  > a:focus {
    ${outlineStyles}
  }
`;

const InnerAnchor = styled(Anchor)`
  ${headerItemStyles}
  ${mobileNavItemStyles}
  width: 100%;

  background: ${props => props.theme.colors.greyBg};
  color: ${props => props.theme.colors.textLight};

  &:hover,
  &:focus,
  &.active {
    color: ${props => props.theme.colors.text};
  }
`;

export const InnerAnchorItem = ({
  children,
  to,
  href,
  activeClassName,
  label,
}) => (
  <InnerListItem>
    <InnerAnchor
      href={href}
      to={to}
      activeClassName={activeClassName}
      title={label}
    >
      {children}
    </InnerAnchor>
  </InnerListItem>
);

export default InnerAnchorItem;
