import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Grid, Row, Col } from '../../grid';
import CaseStudies from './CaseStudies';
import { DisplayTitle } from '../../Typography';

const FeaturedWorkGrid = styled(Grid)`
  margin-top: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    margin-top: ${({ theme }) => theme.space[5]};
    margin-bottom: ${({ theme }) => theme.space[5]};
  `}
`;

const FeaturedWorkHeading = () => (
  <Row css={({ theme }) => ({ 'padding-bottom': theme.space[3] })}>
    <Col>
      <DisplayTitle>Featured work</DisplayTitle>
    </Col>
  </Row>
);

const FeaturedWork = props => {
  return (
    <section>
      <FeaturedWorkGrid>
        <FeaturedWorkHeading />
        <CaseStudies {...props} />
      </FeaturedWorkGrid>
    </section>
  );
};

export default FeaturedWork;
