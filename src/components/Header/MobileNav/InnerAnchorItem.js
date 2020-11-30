import React from 'react';
import styled from 'styled-components';

import outlineStyles from '../utils/outlineStyles';
import Anchor from '../../Common/Anchor';
import headerItemStyles from '../utils/headerItemStyles';
import mobileNavItemStyles from './mobileNavItemStyles';

const themeFn = ({ theme, themeVariation }) =>
  themeVariation === 'white' ? theme.colors.text : theme.colors.white;

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
  color: ${props => themeFn(props)};
`;

export const InnerAnchorItem = ({
  children,
  to,
  href,
  currentClassName,
  label,
  themeVariation,
}) => (
  <InnerListItem>
    <InnerAnchor
      href={href}
      to={to}
      currentClassName={currentClassName}
      title={label}
      themeVariation={themeVariation}
    >
      {children}
    </InnerAnchor>
  </InnerListItem>
);

export default InnerAnchorItem;
