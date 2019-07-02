import React from 'react'
import { Padding } from 'styled-components-spacing'
import { Col, Row } from '../grid'
import JobsByLocation from '../JobsByLocation'
import { SectionTitle, Subtitle } from '../Typography'
import { Section } from '../JoinUs/elements'
import JobLink from './JobLink'

const renderJobsForlocation = (jobs, location, key) => {
  return (
    <Padding top={3} key={key}>
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
  )
}

const OpenPositions = React.forwardRef(({ data: { title } }, ref = null) => (
  <div ref={ref}>
    <Section greyBg id="open-positions">
      <Padding top={{ smallPhone: 3, tablet: 4 }}>
        <SectionTitle>{title}</SectionTitle>
        <JobsByLocation>
          {jobs =>
            jobs.map(({ location, jobs: jobsForLocation }, idx) =>
              renderJobsForlocation(jobsForLocation, location, idx)
            )
          }
        </JobsByLocation>
      </Padding>
    </Section>
  </div>
))
export default OpenPositions
