import React, { Fragment } from 'react'
import { Col, Row } from '../grid'
import JobsByLocation from '../JobsByLocation'
import { Padding } from 'styled-components-spacing'
import { SectionTitle, Subtitle } from '../Typography'
import { Section } from './elements'
import Hr from '../Common/Hr'
import GetInTouch from '../Common/GetInTouch'
import JobLink from '../Common/JobLink'

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

const OpenPositions = ({
  data: { title, getInTouchText, getInTouchTitle }
}) => (
  <Fragment>
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
        <Padding top={{ smallPhone: 3, tablet: 4 }}>
          <Hr />
        </Padding>
      </Padding>
    </Section>
    <GetInTouch title={getInTouchTitle} contactText={getInTouchText} />
  </Fragment>
)

export default OpenPositions
