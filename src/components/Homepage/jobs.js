import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import { Row, Col, Grid } from '../grid'
import { Padding } from 'styled-components-spacing'

import StyledLink from '../Common/StyledLink'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import Jobs from '../JobsByLocation'
import ExternalAnchor from '../Common/ExternalAnchor'
import Hr from '../Common/Hr'

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
                {jobsForLocation.slice(0, 3).map(({ node: job }) => (
                  <li key={`${job.id}`}>
                    <ExternalAnchor href={job.hostedUrl}>
                      {job.text.split(' - ')[0]}
                    </ExternalAnchor>
                    <BodyPrimary muted noPaddingTop>
                      {job.categories.commitment}
                    </BodyPrimary>
                    <Hr short />
                  </li>
                ))}
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
