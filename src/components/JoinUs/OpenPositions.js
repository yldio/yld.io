import React from 'react'
import remcalc from 'remcalc'
import { Row, CompensatedCol, CompensatedRow } from '../grid'
import styled from 'styled-components'
import JobsByLocation from '../jobsByLocation'
import { Padding } from 'styled-components-spacing'
import { Paragraph, H2, H5 } from '../Typography'
import { FirstColumn, SecondColumn, Section, Hr } from './elements'
import ExternalAnchor from '../Common/ExternalAnchor'
import StyledLink from '../styledLink'

const Line = styled(Hr)`
  width: ${remcalc(60)};
`

const JobLinkWrapper = styled(Padding)`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const JobLink = styled(ExternalAnchor)`
  flex: 1 0 75px;
`

const Job = ({ text, hostedUrl, categories: { commitment } }) => (
  <CompensatedCol as="li" width={[1, 1, 1, 1, 4 / 12, 3 / 12]}>
    <JobLinkWrapper top={1}>
      <JobLink href={hostedUrl}>
        <Paragraph noMargin>{text}</Paragraph>
        <Paragraph muted noMargin>
          {commitment}
        </Paragraph>
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
        <H2>{title}</H2>
        <JobsByLocation>
          {jobs =>
            jobs.map(({ location, jobs: jobsForLocation }, idx) =>
              this.renderJobsForlocation(jobsForLocation, location, idx)
            )
          }
        </JobsByLocation>
        <DirectApplication title={directApplicationTitle} text={text} />
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

  handleChangeCheckbox = e => {
    const target = e.target
    this.setState(prevState => ({
      ...prevState,
      [target.name]: target.checked
    }))
  }
}

export default OpenPositions
