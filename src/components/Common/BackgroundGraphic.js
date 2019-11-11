import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Grid, Row, Col } from '../grid';
import Image from './Image';
import remcalc from 'remcalc';
import { SectionTitle } from '../Typography';
import { StaticQuery, graphql } from 'gatsby';

export const Graphic = styled.div`
  position: relative;
  top: ${remcalc(0)};
  height: 85%;
  width: ${remcalc(680)};
  max-width: 100%;
  left: 50%;
  transform: translateX(-50%);

  ${breakpoint('smallTablet')`
    max-width: 80%;
  `}
`;

export const How = styled(SectionTitle)`
  position: relative;
  top: -71%;
  text-align: center;
`;

const HowGrid = styled(Grid)`
  ${breakpoint('smallTablet')`margin-bottom: -10%;`};
  ${breakpoint('tablet')`margin-bottom: 0;`};
`;

export const BackgroundGraphic = ({ title, image }) => (
  <HowGrid>
    <Row style={{ position: 'relative' }}>
      <Col width={[1]}>
        <Graphic>
          <Image image={image} />
        </Graphic>
        <How reverse>{title}</How>
      </Col>
    </Row>
  </HowGrid>
);

const BackgroundGraphicWrapper = ({ title }) => (
  <StaticQuery
    query={graphql`
      {
        image: contentfulAsset(title: { eq: "Background graphic" }) {
          fluid(maxWidth: 680) {
            ...GatsbyContentfulFluid_withWebp
          }
          title
          file {
            url
          }
        }
      }
    `}
    render={({ image }) => <BackgroundGraphic title={title} image={image} />}
  />
);

export default BackgroundGraphicWrapper;
