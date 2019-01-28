import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'
import CaseStudyLayout from './CaseStudyLayout'
import { SectionTitle, BodyPrimary } from '../../Typography'
import StyledLink from '../../styledLink'
import getIntroSentence from '../../../utils/getIntroSentence'

const Headings = ({ title }) => (
  <Fragment>
    <BodyPrimary noPadding secondary>
      Featured work
    </BodyPrimary>
    <SectionTitle>{title}</SectionTitle>
  </Fragment>
)

const TextBelowImage = ({ introSentence, slug }) => (
  <Padding top={{ smallPhone: 0, tablet: 0.5 }}>
    <BodyPrimary>{introSentence}</BodyPrimary>
    <StyledLink to={`/case-study/${slug}`}>Learn more</StyledLink>
  </Padding>
)

const RightHandText = ({ title, introSentence, slug }) => (
  <Fragment>
    <Padding bottom={0.5}>
      <Headings title={title} />
    </Padding>
    <Padding bottom={1}>
      <TextBelowImage introSentence={introSentence} slug={slug} />
    </Padding>
  </Fragment>
)

const CaseStudyPreview = ({ caseStudy }) => {
  const introSentence = getIntroSentence(caseStudy)
  const { posterImage, title, slug } = caseStudy
  return (
    <CaseStudyLayout
      posterImage={posterImage}
      headings={<Headings title={title} />}
      textBelowImage={
        <TextBelowImage introSentence={introSentence} slug={slug} />
      }
      rightHandText={
        <RightHandText
          title={title}
          introSentence={introSentence}
          slug={slug}
        />
      }
    />
  )
}

export default CaseStudyPreview
