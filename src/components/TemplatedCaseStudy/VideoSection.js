import React from 'react'

import { Row, Col } from '../grid'

const VideoSection = ({ videoInfo }) => (
  <Row center="md">
    <Col width={[1]}>
      {videoInfo.map((text, i) => (
        <div
          key={i}
          className="video-container"
          dangerouslySetInnerHTML={{
            __html: `<iframe width="844" height="480" src="${text}" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`
          }}
        />
      ))}
    </Col>
  </Row>
)

export default VideoSection
