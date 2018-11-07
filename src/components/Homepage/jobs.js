import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import { H2, H5 } from '../Typography'
import Jobs from '../jobs'
import Li from '../listItem'

const JobsComponent = () => (
  <Padding top={4}>
    <Row>
      <Col xs={12}>
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
                <H5 bold>{key}</H5>

                <ul>
                  {jobs[key].splice(0, 3).map(job => (
                    <Li key={`${job.id}`}>
                      <a
                        rel="noopener noreferrer"
                        href={job.hostedUrl}
                        target="_blank"
                      >
                        {job.text.split(' - ')[0]}
                      </a>
                      <span>{job.categories.commitment}</span>
                    </Li>
                  ))}
                </ul>
              </Col>
            ))
          }
        </Jobs>
      </Row>
      <Row>
        <Col xs={12}>
          <Padding top={2}>
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
  </Padding>
)

export default JobsComponent
