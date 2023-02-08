import React from 'react';
import styled from 'styled-components';
import { Padding } from 'styled-components-spacing';
import breakpoint from 'styled-components-breakpoint';

import { Col, Row, Grid } from '../grid';
import JobsByLocation from './JobsByLocation';
import { SectionTitle, Subtitle } from '../Typography';
import JobLink from './JobLink';
import GreyBackground from './GreyBackground';

export const OpenPositionsWithRef = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <OpenPositions {...props} />
  </div>
));

const StyledOpenPositions = styled(GreyBackground)`
  padding-top: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[6]};
  ${breakpoint('smallPhone', 'tablet')`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]}
`}
`;

const OpenPositions = ({ data: { title } }) => (
  <StyledOpenPositions>
    <Grid>
      <SectionTitle>{title}</SectionTitle>
      <JobsByLocation>
        {(jobs) => {
          return jobs.map(({ team, jobs }, idx) => (
            <Padding key={idx} top={3}>
              <Subtitle>{team}</Subtitle>
              <Padding top={2}>
                <Row as="ul">
                  {jobs.map(({ text, hostedUrl, categories }, idx) => {
                    return (
                      <Col
                        key={`job-${text}-${idx}`}
                        as="li"
                        width={[1, 1, 1, 1, 4 / 12, 3 / 12]}
                      >
                        <JobLink
                          location={categories.location}
                          position={text}
                          hostedUrl={hostedUrl}
                          contractType={categories.commitment}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Padding>
            </Padding>
          ));
        }}
      </JobsByLocation>
    </Grid>
  </StyledOpenPositions>
);

export default OpenPositions;
