import React, { Fragment } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import Image from '../Common/Image'
import { CardTitle, BodyPrimary } from '../Typography'
import getIntroSentence from '../../utils/getIntroSentence'

const MobileOnlyCol = styled(Col)`
  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const NonMobileCol = styled(Col)`
  display: none;

  ${breakpoint('smallTablet')`
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  `}
`

const TitleSection = ({ services, title }) => {
  const commaSeparatedServices = [
    services.slice(0, -1).join(', '),
    services.slice(-1)[0]
  ].join(services.length < 2 ? '' : ' & ')
  return (
    <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
      <BodyPrimary muted noPadding>
        {commaSeparatedServices}
      </BodyPrimary>
      <CardTitle as="h2">{title}</CardTitle>
    </Padding>
  )
}

const InfoSection = ({ introSentence, title, slug }) => (
  <Fragment>
    <Padding bottom={{ smallPhone: 0.5, tablet: 1 }}>
      <BodyPrimary>{introSentence}</BodyPrimary>
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
      <Col width={[1, 1, 1, 1, 5 / 12, 4 / 12, 4 / 12]}>
        <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
          <Image alt={posterImage.title} image={posterImage} />
        </Padding>
      </Col>
      <NonMobileCol width={[0, 0, 0, 0, 7 / 12, 6 / 12]}>
        <TitleSection services={services} title={title} />
        <InfoSection introSentence={introSentence} slug={slug} />
      </NonMobileCol>
      <MobileOnlyCol width={[1, 1, 1, 1, 0, 0, 0]}>
        <InfoSection introSentence={introSentence} title={title} slug={slug} />
      </MobileOnlyCol>
    </Row>
  )
}

export default CaseStudy
