import React from 'react'
import styled from 'styled-components'
import RatioContainer from './RatioContainer'

import { Row, Col } from '../grid'

const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 90px rgba(255, 255, 255, 0.2),
    0px 0px 20px rgba(255, 255, 255, 0.07);
`

const CenteredRow = styled(Row)`
  justify-content: center;
`

/**
 * Since iframes can't set their height to auto, we're using a RatioContainer
 * container with the padding bottom equal to the video width/height ratio.
 */
const VideoSection = ({ src }) => (
  <CenteredRow>
    <Col width={[1, 1, 1, 10 / 12]}>
      <RatioContainer height={480} width={854}>
        <Video
          align="middle"
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </RatioContainer>
    </Col>
  </CenteredRow>
)

export default VideoSection
