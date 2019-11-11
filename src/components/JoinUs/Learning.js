import React from 'react';
import { Padding } from 'styled-components-spacing';
import styled from 'styled-components';
import generate from 'shortid';
import { Row, Col } from '../grid';
import Image from '../Common/Image';
import Hr from '../Common/Hr';
import { Subtitle } from '../Typography';

import { Section, Separator, TitleAndBody } from './elements';
import ExternalAnchor from '../Common/ExternalAnchor';
import TitleAndList from '../Common/TitleAndList';

const InsightAnchor = styled(ExternalAnchor)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const PostTitleWrapper = styled(Padding)`
  flex: 1;
`;

const Insight = ({ insight }) => (
  <Col width={[1, 1, 1, 4 / 12]}>
    <InsightAnchor href={insight.url} title={insight.title}>
      <Padding top={{ smallPhone: 2, tablet: 3 }}>
        <Image image={insight.image} />
      </Padding>
      <PostTitleWrapper top={1.5}>
        <Subtitle noMargin>{insight.title}</Subtitle>
      </PostTitleWrapper>
      <Hr />
    </InsightAnchor>
  </Col>
);

const Learning = ({
  data: { title, subtitle, text, featuredInsights, list },
}) => (
  <Section greyBg>
    <TitleAndList title={title} list={list} />
    <Separator />
    <TitleAndBody title={subtitle} body={text} />
    <Row>
      {featuredInsights.map(el => (
        <Insight insight={el} key={generate()} />
      ))}
    </Row>
    <Padding bottom={{ smallPhone: 3.5, tablet: 5 }} />
  </Section>
);

export default Learning;
