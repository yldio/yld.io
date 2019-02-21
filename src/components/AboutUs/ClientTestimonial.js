import React from 'react'
import { Padding } from 'styled-components-spacing'

import { Row, Col, Grid } from '../grid'
import { SectionTitle } from '../Typography'
import GreyBackground from '../Common/GreyBackground'
import VideoSection from '../Common/VideoSection'

const ClientTestimonial = ({ title, video }) => (
  <GreyBackground>
    <Grid>
      <Padding
        top={{ smallPhone: 3, tablet: 4 }}
        bottom={{ smallPhone: 3.5, tablet: 5 }}
      >
        <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
          <Row>
            <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
              <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
                <SectionTitle>{title}</SectionTitle>
              </Padding>
            </Col>
          </Row>
        </Padding>
        <VideoSection src={video.link} />
      </Padding>
    </Grid>
  </GreyBackground>
)

export default ClientTestimonial
