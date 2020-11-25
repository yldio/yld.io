import React from 'react';
import remcalc from 'remcalc';
import { css } from 'styled-components';

import OuterAnchorItem from './OuterAnchorItem';

const ContactButton = ({ themeVariation }) => (
  <OuterAnchorItem
    currentClassName="current"
    to="/contact/"
    title="Contact"
    themeVariation={themeVariation}
    primary
    css={css`
      margin: 0 ${remcalc(15)};
      z-index: ${props => props.theme.zIndexes.headerButton};
    `}
  >
    Contact
  </OuterAnchorItem>
);

export default ContactButton;
