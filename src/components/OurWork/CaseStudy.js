import React, { Fragment } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../Common/StyledLink'
import Image from '../Common/Image'
import Anchor from '../Common/Anchor'
import { CardTitle, BodyPrimary } from '../Typography'
import getIntroSentence from '../../utils/getIntroSentence'
import eventLabels from '../../utils/eventLabels'

const TitleSection = ({ services, title, link }) => {
  return (
    <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
      <BodyPrimary muted noPadding>
        <ServiceList services={services} />
      </BodyPrimary>
      <Anchor to={link}>
        <CardTitle as="h2">{title}</CardTitle>
      </Anchor>
    </Padding>
  )
}

const InfoSection = ({ introSentence, title, link }) => (
  <Fragment>
    <Padding bottom={{ smallPhone: 0.5, tablet: 1 }}>
      <BodyPrimary>{introSentence}</BodyPrimary>
    </Padding>
    <StyledLink
      aria-label={`Learn more about ${title}`}
      to={link}
      title={`Learn more about ${title}`}
      data-event={eventLabels.learnMoreCTA}
    >
      Learn more
    </StyledLink>
  </Fragment>
)

const CaseStudy = ({ caseStudy }) => {
  const { title, services, posterImage, slug } = caseStudy
  const introSentence = getIntroSentence(caseStudy)
  const caseStudyLink = `/case-study/${slug}`

  return <Image alt={posterImage.title} image={posterImage} />

  // return (
  //   <Row>
  //     <MobileOnlyCol width={[1, 1, 1, 1, 0, 0, 0]}>
  //       <TitleSection services={services} title={title} link={caseStudyLink} />
  //     </MobileOnlyCol>
  //     <Col width={[1, 1, 1, 1, 5 / 12, 4 / 12, 4 / 12]}>
  //       <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
  //         <Anchor to={caseStudyLink}>
  //           <Image alt={posterImage.title} image={posterImage} />
  //         </Anchor>
  //       </Padding>
  //     </Col>
  //     <NonMobileCol width={[0, 0, 0, 0, 7 / 12, 6 / 12]}>
  //       <TitleSection services={services} title={title} link={caseStudyLink} />
  //       <InfoSection
  //         introSentence={introSentence}
  //         title={title}
  //         link={caseStudyLink}
  //       />
  //     </NonMobileCol>
  //     <MobileOnlyCol width={[1, 1, 1, 1, 0, 0, 0]}>
  //       <InfoSection
  //         introSentence={introSentence}
  //         title={title}
  //         link={caseStudyLink}
  //       />
  //     </MobileOnlyCol>
  //   // </Row>
  // )
}

export default CaseStudy
