import React from 'react';
import styled from 'styled-components';

import Anchor from '../../Common/Anchor';
import headerItemStyles from '../utils/headerItemStyles';
import topNavItemStyles from './desktopNavItemStyles';
import TopNavItem from './TopNavItem';

const StyledAnchor = styled(Anchor)`
  ${headerItemStyles}
  ${topNavItemStyles}
`;

const StyledListItem = styled(TopNavItem)`
  display: flex;
  flex-wrap: wrap;

  > a {
    ${props => props.states.default}
  }

  > a:hover {
    ${props => props.states.default}
    ${props => props.states.hover}
  }

  > a:active {
    ${props => props.states.default}
    ${props => props.states.clickTap}
  }

  > a.current {
    ${props => props.states.current}
  }
`;

const OuterAnchorItem = ({
  children,
  to,
  href,
  currentClassName,
  themeVariation,
  onClick,
  title,
  attributes,
  ...props
}) => (
  <StyledListItem themeVariation={themeVariation} {...props}>
    <StyledAnchor
      href={href}
      to={to}
      currentClassName={currentClassName}
      onClick={onClick}
      title={title}
      {...attributes}
    >
      {children}
    </StyledAnchor>
  </StyledListItem>
);

export default OuterAnchorItem;
