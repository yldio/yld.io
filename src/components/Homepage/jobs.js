import React, { Fragment } from 'react'
import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import remcalc from 'remcalc'
import styled from 'styled-components'
import StyledLink from '../styledLink'
import { H2, H5 } from '../Typography'
import Jobs from '../jobs'
import Li from '../listItem'

const JobContainer = styled.ul`
  margin-top: ${remcalc(12)};
`

const JobCommitment = styled.span`
  padding-top: ${remcalc(4)};
`

const JobsComponent = () => (
  <Fragment>
    <Row>
      <Col width={[1]}>
        <H2>Join our team</H2>
      </Col>
    </Row>
    <Padding top={3}>
      <Row>
        <Jobs>
          {jobs =>
            Object.keys(jobs).map(key => (
              <Col
                md={4}
                sm={6}
                xs={12}
                key={`${key}-${jobs[key].length}-main`}
              >
                <H5>{key}</H5>

                <JobContainer>
                  {jobs[key].slice(0, 3).map(job => (
                    <Li key={`${job.id}`}>
                      <a
                        rel="noopener noreferrer"
                        href={job.hostedUrl}
                        target="_blank"
                      >
                        {job.text.split(' - ')[0]}
                      </a>
                      <JobCommitment>{job.categories.commitment}</JobCommitment>
                    </Li>
                  ))}
                </JobContainer>
              </Col>
            ))
          }
        </Jobs>
      </Row>
      <Row>
        <Col width={[1]}>
          <Padding top={4}>
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
    </Padding>
  </Fragment>
)

export default JobsComponent
