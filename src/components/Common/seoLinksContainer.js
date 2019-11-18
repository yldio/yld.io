import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { generate } from 'shortid';

import { SectionTitle, Subtitle } from '../Typography';
import { Grid, Row, Col } from '../grid';
import SeoLinks from './seoLinks';

const StyledLinksColumn = styled.div`
  padding-top: ${({ theme }) => theme.space[4]};
  ${breakpoint('desktop')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-right: ${({ theme }) => theme.space[6]};
  `}
`;

const Wrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('desktop')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`;

const SeoLinksColumn = ({ speciality: { title, items } }) => (
  <Col width={[1, 1, 1, 1, 1 / 2, 1 / 2]} key={generate()}>
    {items && items.length && (
      <StyledLinksColumn>
        <Subtitle>{title}</Subtitle>
        <SeoLinks items={items} />
      </StyledLinksColumn>
    )}
  </Col>
);

const SeoLinksContainer = ({ specialities, sectionTitle }) => (
  <Wrapper>
    <Grid>
      <Row>
        <Col width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 2]}>
          <SectionTitle>{sectionTitle}</SectionTitle>
        </Col>
      </Row>
      <Row>
        {specialities.map((speciality, index) =>
          SeoLinksColumn({ speciality }, index),
        )}
      </Row>
    </Grid>
  </Wrapper>
);

export default SeoLinksContainer;
