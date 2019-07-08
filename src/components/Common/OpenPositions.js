import React from 'react'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'

import { Col, Row, Grid } from '../grid'
import JobsByLocation from './JobsByLocation'
import { SectionTitle, Subtitle } from '../Typography'
import JobLink from './JobLink'
import GreyBackground from './GreyBackground'

export const OpenPositionsWithRef = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <OpenPositions {...props} />
  </div>
))

const StyledOpenPositions = styled(GreyBackground)`
  padding-top: ${({ theme }) => theme.space[5]};
  padding-bottom: ${({ theme }) => theme.space[5]};
`

const OpenPositions = ({ data: { title }, limit }) => (
  <StyledOpenPositions>
    <Grid>
      <SectionTitle>{title}</SectionTitle>
      <JobsByLocation limit={limit}>
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
    </Grid>
  </StyledOpenPositions>
)

export default OpenPositions
