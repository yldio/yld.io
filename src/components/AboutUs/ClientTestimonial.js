import React from 'react';
import { Padding } from 'styled-components-spacing';

import { Row, Col, Grid } from '../grid';
import { SectionTitle } from '../Typography';
import VideoSection from '../Common/VideoSection';

const ClientTestimonial = ({ title, video }) => (
  <Grid>
    <Padding
      top={{ smallPhone: 3, tablet: 4 }}
      bottom={{ smallPhone: 3.5, tablet: 5 }}
    >
      <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
            <SectionTitle>{title}</SectionTitle>
          </Col>
        </Row>
      </Padding>
      <VideoSection src={video.link} />
    </Padding>
  </Grid>
);

export default ClientTestimonial;
