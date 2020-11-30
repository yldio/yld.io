import React from 'react';
import styled from 'styled-components';

import Anchor from '../../Common/Anchor';
import headerItemStyles from '../utils/headerItemStyles';
import mobileNavItemStyles from './mobileNavItemStyles';
import outerItemStates from './outerItemStates';

const StyledAnchor = styled(Anchor).attrs(() => ({
  states: outerItemStates,
}))`
  display: block;
  ${headerItemStyles}
  ${mobileNavItemStyles}

  ${({ states, themeVariation }) =>
    themeVariation === 'white' ? states.white : states.dark}
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
  themeVariation,
  ...props
}) => (
  <StyledListItem {...props}>
    <StyledAnchor
      href={href}
      to={to}
      currentClassName={currentClassName}
      onClick={onClick}
      title={label}
      themeVariation={themeVariation}
      {...attributes}
    >
      {label}
    </StyledAnchor>
  </StyledListItem>
);

export default OuterAnchorItem;
