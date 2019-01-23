import React from 'react'
import remcalc from 'remcalc'
import { Row, CompensatedCol, CompensatedRow } from '../grid'
import styled from 'styled-components'
import JobsByLocation from '../jobsByLocation'
import { Padding } from 'styled-components-spacing'
import { Paragraph, H2, H5 } from '../Typography'
import { FirstColumn, SecondColumn, Section } from './elements'
import ExternalAnchor from '../Common/ExternalAnchor'
import Hr from '../Common/Hr'
import StyledLink from '../styledLink'

const Line = styled(Hr)`
  width: ${remcalc(60)};
`

const JobLinkWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const JobLink = styled(ExternalAnchor)`
  flex: 1 0 90px;
`

const Job = ({ text, hostedUrl, categories: { commitment } }) => (
  <CompensatedCol as="li" width={[1, 1, 1, 1, 4 / 12, 3 / 12]}>
    <JobLinkWrapper>
      <JobLink href={hostedUrl}>
        <Padding top={1} bottom={0.5}>
          <Paragraph noMargin>{text}</Paragraph>
          <Paragraph noMargin muted>
            {commitment}
          </Paragraph>
        </Padding>
      </JobLink>
      <Line />
    </JobLinkWrapper>
  </CompensatedCol>
)

const DirectApplication = ({ title, text }) => (
  <Padding top={{ smallPhone: 3.5, smallTablet: 3 }}>
    <Row>
      <FirstColumn>
        <H2 as="h3">{title}</H2>
      </FirstColumn>
      <SecondColumn>
        <Padding top={1} bottom={{ smallPhone: 1, tablet: 3 }}>
          <Paragraph noMargin>{text}</Paragraph>
        </Padding>
        <StyledLink to="/contact">Get in Touch</StyledLink>
      </SecondColumn>
    </Row>
  </Padding>
)

class OpenPositions extends React.PureComponent {
  render() {
    const { title, directApplicationTitle, text } = this.props.data

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
          <DirectApplication title={directApplicationTitle} text={text} />
        </Padding>
      </Section>
    )
  }

  renderJobsForlocation = (jobs, location, key) => {
    return (
      <Padding top={3} key={key}>
        <H5 as="h3">{location}</H5>
        <Padding top={1}>
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
