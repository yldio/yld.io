import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'

import { Row, Col, Grid } from '../grid'
import { SectionTitle } from '../Typography'
import GreyBackground from '../Common/GreyBackground'

const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

/**
 * Since iframes can't set their height to auto, we're using a
 * container with the padding bottom equal to the video width/height ratio.
 */
const VideoRatioContainer = styled.div`
  position: relative;
  height: 0;
  padding-bottom: ${props => (props.height / props.width) * 100}%;
`

const CenteredRow = styled(Row)`
  justify-content: center;
`

const ClientTestimonialVideo = ({ video }) => (
  <CenteredRow>
    <Col width={[1, 1, 1, 10 / 12]}>
      <VideoRatioContainer height={480} width={854}>
        <Video
          align="middle"
          src={video.link}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoRatioContainer>
    </Col>
  </CenteredRow>
)

const ClientTestimonial = ({ title, video }) => {
  return (
    <GreyBackground>
      <Grid>
        <Padding
          top={{ smallPhone: 3, tablet: 4 }}
          bottom={{ smallPhone: 3.5, tablet: 5 }}
        >
          <Row>
            <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
              <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
                <SectionTitle>{title}</SectionTitle>
              </Padding>
            </Col>
          </Row>
          <ClientTestimonialVideo video={video} />
        </Padding>
      </Grid>
    </GreyBackground>
  )
}

export default ClientTestimonial
