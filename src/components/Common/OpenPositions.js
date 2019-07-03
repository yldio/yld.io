import React from 'react'
import { Padding } from 'styled-components-spacing'

import { Col, Row } from '../grid'
import JobsByLocation from '../JobsByLocation'
import { SectionTitle, Subtitle } from '../Typography'
import JobLink from './JobLink'

export const OpenPositionsWithRef = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <OpenPositions {...props} />
  </div>
))

const OpenPositions = ({ data: { title } }) => (
  <Padding top={{ smallPhone: 3, tablet: 4 }}>
    <SectionTitle>{title}</SectionTitle>
    <JobsByLocation>
      {jobs =>
        jobs.map(({ location, jobs }, idx) => (
          <Padding top={3} key={idx}>
            <Subtitle>{location}</Subtitle>
            <Padding top={2}>
              <Row as="ul">
                {jobs.map((job, idx) => {
                  const {
                    text,
                    hostedUrl,
                    categories: { commitment }
                  } = job.node
                  return (
                    <Col
                      key={`job-${location}-${idx}`}
                      as="li"
                      width={[1, 1, 1, 1, 4 / 12, 3 / 12]}
                    >
                      <JobLink
                        location={location}
                        position={text}
                        hostedUrl={hostedUrl}
                        contractType={commitment}
                      />
                    </Col>
                  )
                })}
              </Row>
            </Padding>
          </Padding>
        ))
      }
    </JobsByLocation>
  </Padding>
)

export default OpenPositions
