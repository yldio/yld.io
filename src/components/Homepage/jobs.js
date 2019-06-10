import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import { Row, Col, Grid } from '../grid'
import { Padding } from 'styled-components-spacing'

import StyledLink from '../Common/StyledLink'
import { SectionTitle, Subtitle } from '../Typography'
import JobsByLocation from '../JobsByLocation'
import JobLink from '../Common/JobLink'

const JobContainer = styled.ul`
  margin-top: ${remcalc(12)};
  margin-bottom: ${remcalc(36)};

  ${breakpoint('smallTablet')`
      margin-bottom: ${remcalc(0)};
  `}
`

const Jobs = () => (
  <Grid pb={3}>
    <Row>
      <Col width={[1]}>
        <Padding top={{ smallPhone: 3, smallTablet: 4 }}>
          <SectionTitle>Join our team</SectionTitle>
        </Padding>
      </Col>
    </Row>
    <Row pt={[3, 3, 3, 3, 90]}>
      <JobsByLocation>
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
                    <li key={`job-${location}-${idx}`}>
                      <JobLink
                        position={text}
                        hostedUrl={hostedUrl}
                        contractType={commitment}
                      />
                    </li>
                  )
                })}
              </JobContainer>
            </Col>
          ))
        }
      </JobsByLocation>
    </Row>
    <Row>
      <Col width={[1]}>
        <Padding top={{ smallPhone: 3, smallTablet: 4 }}>
          <StyledLink to="/join-us" title="View all openings">
            View all openings
          </StyledLink>
        </Padding>
      </Col>
    </Row>
  </Grid>
)

export default Jobs
