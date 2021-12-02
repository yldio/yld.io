import React from 'react';
import styled from 'styled-components';

import Anchor from '../../Common/Anchor';
import headerItemStyles from '../utils/headerItemStyles';
import outlineStyles from '../utils/outlineStyles';
import mobileNavItemStyles from './mobileNavItemStyles';
import outerItemStates from './outerItemStates';

const StyledAnchor = styled(Anchor).attrs(() => ({
  states: outerItemStates,
}))`
  display: block;
  ${headerItemStyles}
  ${mobileNavItemStyles}

  ${(props) => props.states.default}

  &.current {
    ${(props) => props.states.hoverActive}
  }

  &:focus {
    ${(props) => props.states.hoverActive}
    ${outlineStyles}
  }
`;

const StyledListItem = styled.li`
  list-style-type: none;
`;

const OuterAnchorItem = ({
  label,
  to,
  href,
  currentClassName,
  onClick,
  attributes,
  ...props
}) => (
  <StyledListItem {...props}>
    <StyledAnchor
      href={href}
      to={to}
      currentClassName={currentClassName}
      title={label}
      onClick={onClick}
      {...attributes}
    >
      {label}
    </StyledAnchor>
  </StyledListItem>
);

export default OuterAnchorItem;
