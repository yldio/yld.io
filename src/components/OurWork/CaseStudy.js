import React, { Fragment } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import Image from '../Common/Image'
import { H4, Paragraph } from '../Typography'
import getIntroSentence from '../../utils/getIntroSentence'

const Services = styled(Paragraph).attrs({ muted: true })`
  // overwrite default padding on Paragraph component
  padding-bottom: 0;
`

const IntroSentence = styled(Paragraph).attrs({ fullWidth: true })`
  padding-bottom: 6px;
  ${breakpoint('tablet')`
    padding-bottom: 12px;
  `}
`

const FlexCol = styled(Col)`
  display: flex;
  ${breakpoint('tablet')`
    align-items: center;
  `}
`

const MobileOnlyCol = styled(Col)`
  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const NonMobileCol = styled(Col)`
  display: none;

  ${breakpoint('smallTablet')`
    display: block;
  `}
`

const TitleSection = ({ services, title }) => {
  const commaSeparatedServices = [
    services.slice(0, -1).join(', '),
    services.slice(-1)[0]
  ].join(services.length < 2 ? '' : ' & ')
  return (
    <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
      <Services>{commaSeparatedServices}</Services>
      <H4 as="h2">{title}</H4>
    </Padding>
  )
}

const InfoSection = ({ introSentence, title, slug }) => (
  <Fragment>
    <Padding top={1}>
      <IntroSentence fullWidth>{introSentence}</IntroSentence>
    </Padding>
    <StyledLink
      aria-label={`Learn more about ${title}`}
      to={`/case-study/${slug}`}
    >
      Learn more
    </StyledLink>
  </Fragment>
)

const CaseStudy = ({ caseStudy }) => {
  const { title, services, posterImage, slug } = caseStudy
  const introSentence = getIntroSentence(caseStudy)

  return (
    <Row>
      <MobileOnlyCol width={[1, 1, 1, 1, 0, 0, 0]}>
        <TitleSection services={services} title={title} />
      </MobileOnlyCol>
      <FlexCol width={1}>
        <Col px={[0]} width={[1, 1, 1, 1, 5 / 12, 4 / 12, 4 / 12]}>
          <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
            <Image alt={posterImage.title} image={posterImage} />
          </Padding>
        </Col>
        <NonMobileCol
          pr={[0, 0, 0, 0, 0, 0]}
          width={[0, 0, 0, 0, 7 / 12, 6 / 12, 6 / 12]}
        >
          <TitleSection services={services} title={title} />
          <InfoSection introSentence={introSentence} slug={slug} />
        </NonMobileCol>
      </FlexCol>
      <MobileOnlyCol width={[1, 1, 1, 1, 0, 0, 0]}>
        <InfoSection introSentence={introSentence} title={title} slug={slug} />
      </MobileOnlyCol>
    </Row>
  )
}

export default CaseStudy
