import React from 'react';
import remcalc from 'remcalc';
import { css } from 'styled-components';

import OuterAnchorItem from './OuterAnchorItem';

const ContactButton = ({ themeVariation }) => (
  <OuterAnchorItem
    primary
    currentClassName="current"
    to="/contact/"
    title="Contact"
    themeVariation={themeVariation}
    css={css`
      margin: 0 ${remcalc(15)};
    `}
  >
    Contact
  </OuterAnchorItem>
);

export default ContactButton;
