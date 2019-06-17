import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'

import CaseStudyLayout from './CaseStudyLayout'
import { SectionTitle, BodyPrimary } from '../../Typography'
import StyledLink from '../StyledLink'
import getIntroSentence from '../../../utils/getIntroSentence'

const Headings = ({ title, as }) => (
  <Fragment>
    <BodyPrimary noPadding secondary>
      Featured work
    </BodyPrimary>
    <SectionTitle as={as}>{title}</SectionTitle>
  </Fragment>
)

const TextBelowImage = ({ introSentence, slug }) => (
  <Padding top={{ smallPhone: 0, tablet: 0.5 }}>
    <BodyPrimary>{introSentence}</BodyPrimary>
    <StyledLink title="Learn more" to={`/case-study/${slug}`}>
      Learn more
    </StyledLink>
  </Padding>
)

const RightHandText = ({ title, introSentence, slug, as }) => (
  <Fragment>
    <Padding bottom={0.5}>
      <Headings as={as} title={title} />
    </Padding>
    <Padding bottom={1}>
      <TextBelowImage introSentence={introSentence} slug={slug} />
    </Padding>
  </Fragment>
)

const CaseStudyPreview = ({ isTop, caseStudy, as }) => {
  if (!caseStudy) {
    return null
  }

  const introSentence = getIntroSentence(caseStudy)
  const { posterImage, title, slug } = caseStudy
  return (
    <CaseStudyLayout
      isTop={isTop}
      posterImage={posterImage}
      headings={<Headings title={title} as={as} />}
      textBelowImage={
        <TextBelowImage introSentence={introSentence} slug={slug} />
      }
      rightHandText={
        <RightHandText
          title={title}
          introSentence={introSentence}
          slug={slug}
          as={as}
        />
      }
    />
  )
}

export default CaseStudyPreview
