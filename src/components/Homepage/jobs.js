import React from 'react'
import { Row, Col, Grid } from '../grid'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import styled from 'styled-components'
import StyledLink from '../styledLink'
import { H2, H5 } from '../Typography'
import Jobs from '../jobsByLocation'
import Li from '../listItem'

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

const JobLi = styled(Li)`
  height: ${remcalc(123)};
`

const JobsComponent = () => (
  <Grid pb={3}>
    <Row>
      <Col width={[1]}>
        <Padding top={{ smallPhone: 3, smallTablet: 4 }}>
          <H2>Join our team</H2>
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
              <H5>{location}</H5>

              <JobContainer>
                {jobsForLocation.slice(0, 3).map(({ node: job }) => (
                  <JobLi key={`${job.id}`}>
                    <a
                      rel="noopener noreferrer"
                      href={job.hostedUrl}
                      target="_blank"
                    >
                      {job.text.split(' - ')[0]}
                    </a>
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
          <StyledLink
            href="https://jobs.lever.co/yld"
            rel="noopener noreferrer"
            target="_blank"
          >
            View all openings
          </StyledLink>
        </Padding>
      </Col>
    </Row>
  </Grid>
)

export default JobsComponent
