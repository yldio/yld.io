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

  background: ${(props) => props.theme.colors.greyBg};
  color: ${(props) => props.theme.colors.secondaryText};

  &:hover,
  &:focus,
  &.current {
    color: ${(props) => props.theme.colors.text};
    font-weight: bold;
  }
`;

export const InnerAnchorItem = ({
  children,
  to,
  href,
  currentClassName,
  label,
}) => (
  <InnerListItem>
    <InnerAnchor
      href={href}
      to={to}
      currentClassName={currentClassName}
      title={label}
    >
      {children}
    </InnerAnchor>
  </InnerListItem>
);

export default InnerAnchorItem;
