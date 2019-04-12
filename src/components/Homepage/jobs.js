import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import { Row, Col, Grid } from '../grid'
import { Padding } from 'styled-components-spacing'

import StyledLink from '../Common/StyledLink'
import { SectionTitle, Subtitle } from '../Typography'
import Jobs from '../JobsByLocation'
import JobLink from '../Common/JobLink'

const JobContainer = styled.ul`
  margin-top: ${remcalc(12)};
  margin-bottom: ${remcalc(36)};

  ${breakpoint('smallTablet')`
      margin-bottom: ${remcalc(0)};
  `}
`

const JobsComponent = () => (
  <Grid pb={3}>
    <Row>
      <Col width={[1]}>
        <Padding top={{ smallPhone: 3, smallTablet: 4 }}>
          <SectionTitle>Join our team</SectionTitle>
        </Padding>
      </Col>
    </Row>
    <Row pt={[3, 3, 3, 3, 90]}>
      <Jobs>
        {jobs =>
          jobs.map(({ location, jobs: jobsForLocation }) => (
            <Col
              width={[1, 1, 1, 1, 1 / 2, 3 / 12]}
              key={`${location}-${jobsForLocation.length}-main`}
            >
              <Subtitle>{location}</Subtitle>
              <JobContainer>
                {jobsForLocation.slice(0, 3).map((job, idx) => {
                  const {
                    text,
                    hostedUrl,
                    categories: { commitment }
                  } = job.node
                  return (
                    <JobLink
                      as="li"
                      key={`job-${location}-${idx}`}
                      position={text}
                      hostedUrl={hostedUrl}
                      contractType={commitment}
                    />
                  )
                })}
              </JobContainer>
            </Col>
          ))
        }
      </Jobs>
    </Row>
    <Row>
      <Col width={[1]}>
        <Padding top={{ smallPhone: 3, smallTablet: 4 }}>
          <StyledLink to="/join-us">View all openings</StyledLink>
        </Padding>
      </Col>
    </Row>
  </Grid>
)

export default JobsComponent
