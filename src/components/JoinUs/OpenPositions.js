import React from 'react'
import Flex from 'styled-flex-component'
import { CompensatedCol, CompensatedRow } from '../grid'
import styled from 'styled-components'
import JobsByLocation from '../jobsByLocation'
import { Padding } from 'styled-components-spacing'
import { Paragraph, H2, H5 } from '../Typography'
import { Section } from './elements'
import ExternalAnchor from '../Common/ExternalAnchor'
import Hr from '../Common/Hr'

const JobLink = styled(ExternalAnchor)`
  flex: 1 0 90px;
`

const Job = ({ text, hostedUrl, categories: { commitment } }) => (
  <CompensatedCol as="li" width={[1, 1, 1, 1, 4 / 12, 3 / 12]}>
    <Flex column>
      <JobLink href={hostedUrl}>
        <Padding top={1} bottom={0.5}>
          <Paragraph noMargin>{text}</Paragraph>
          <Paragraph noMargin muted>
            {commitment}
          </Paragraph>
        </Padding>
      </JobLink>
      <Hr short />
    </Flex>
  </CompensatedCol>
)

class OpenPositions extends React.PureComponent {
  render() {
    const { title } = this.props.data

    return (
      <Section greyBg id="open-positions">
        <Padding top={{ smallPhone: 3, tablet: 4 }}>
          <H2>{title}</H2>
          <JobsByLocation>
            {jobs =>
              jobs.map(({ location, jobs: jobsForLocation }, idx) =>
                this.renderJobsForlocation(jobsForLocation, location, idx)
              )
            }
          </JobsByLocation>
        </Padding>
      </Section>
    )
  }

  renderJobsForlocation = (jobs, location, key) => {
    return (
      <Padding top={3} key={key}>
        <H5 as="h3">{location}</H5>
        <Padding top={2}>
          <CompensatedRow as="ul">
            {jobs.map((job, idx) => (
              <Job key={`job-${location}-${idx}`} {...job.node} />
            ))}
          </CompensatedRow>
        </Padding>
      </Padding>
    )
  }
}

export default OpenPositions
