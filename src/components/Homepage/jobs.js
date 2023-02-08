import React, { Fragment } from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Row, Col, Grid } from '../grid';
import StyledLink from '../Common/StyledLink';
import OpenPositions from '../Common/OpenPositions';
import eventLabels from '../../utils/eventLabels';

const StyledGrid = styled(Grid)`
  padding-bottom: ${({ theme }) => theme.space[7]};
  ${breakpoint('smallPhone', 'tablet')`
  padding-bottom: ${({ theme }) => theme.space[5]}
`}
`;

const Jobs = () => (
  <>
    <OpenPositions
      data={{
        title: 'Join our team',
      }}
    />
    <StyledGrid>
      <Row>
        <Col width={[1]}>
          <StyledLink
            to="/join-us"
            title="Learn more"
            data-event={eventLabels.learnMoreCTA}
          >
            Learn more
          </StyledLink>
        </Col>
      </Row>
    </StyledGrid>
  </>
);

export default Jobs;
