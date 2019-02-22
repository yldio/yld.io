import React from 'react'
import { Row, Col, Grid } from '../grid'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import styled from 'styled-components'
import StyledLink from '../styledLink'
import { SectionTitle, Subtitle } from '../Typography'
import Jobs from '../jobsByLocation'
import CustomisedBulletpoint from '../Common/CustomisedBulletpoint'
import ExternalAnchor from '../Common/ExternalAnchor'

const JobContainer = styled.ul`
  margin-top: ${remcalc(12)};
  margin-bottom: ${remcalc(36)};

  ${breakpoint('smallTablet')`
      margin-bottom: ${remcalc(0)};
  `}
`

const JobCommitment = styled.span`
  padding-top: ${remcalc(4)};
`

const JobLi = styled(CustomisedBulletpoint)`
  height: ${remcalc(123)};
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
                  <JobLi spaced key={`${job.id}`}>
                    <ExternalAnchor href={job.hostedUrl}>
                      {job.text.split(' - ')[0]}
                    </ExternalAnchor>
                    <JobCommitment>{job.categories.commitment}</JobCommitment>
                  </JobLi>
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
