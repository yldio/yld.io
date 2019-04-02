import React, { Fragment } from 'react'
import Flex from 'styled-flex-component'
import { Col, Row } from '../grid'
import styled from 'styled-components'
import JobsByLocation from '../JobsByLocation'
import { Padding } from 'styled-components-spacing'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import { Section } from './elements'
import ExternalAnchor from '../Common/ExternalAnchor'
import Hr from '../Common/Hr'
import GetInTouch from '../Common/GetInTouch'

const JobLink = styled(ExternalAnchor)`
  flex: 1 0 90px;
`

const Job = ({ text, hostedUrl, categories: { commitment } }) => (
  <Col width={[1, 1, 1, 1, 4 / 12, 3 / 12]}>
    <Flex column>
      <JobLink href={hostedUrl}>
        <Padding top={1} bottom={0.5}>
          <BodyPrimary noPadding>{text}</BodyPrimary>
          <BodyPrimary noPadding muted>
            {commitment}
          </BodyPrimary>
        </Padding>
      </JobLink>
      <Hr short />
    </Flex>
  </Col>
)

const renderJobsForlocation = (jobs, location, key) => {
  return (
    <Padding top={3} key={key}>
      <Subtitle>{location}</Subtitle>
      <Padding top={2}>
        <Row as="ul">
          {jobs.map((job, idx) => (
            <Job key={`job-${location}-${idx}`} {...job.node} />
          ))}
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
