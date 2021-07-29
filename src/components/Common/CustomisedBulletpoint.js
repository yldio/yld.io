import React, { Fragment } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import BodyPrimaryStyles from '../Typography/BodyPrimaryStyles';
import Hr from './Hr';

const StyledListItem = styled.li`
  ${BodyPrimaryStyles}
  padding: ${remcalc(12)} 0 ${remcalc(21)} 0;
  list-style: none;
  max-width: ${(props) => props.maxWidth || '240px'};
`;

const StyledHr = styled(Hr)`
  margin: 0;
  padding: 0 0 ${remcalc(8)} 0;
`;

const CustomisedBulletpoint = ({ muted, reverse, maxWidth, ...props }) => (
  <>
    <StyledListItem
      muted={muted}
      reverse={reverse}
      maxWidth={maxWidth}
      {...props}
    />
    <StyledHr short muted={muted} reverse={reverse} />
  </>
);

export default CustomisedBulletpoint;
