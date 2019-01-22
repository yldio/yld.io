import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'
import CaseStudyLayout from './CaseStudyLayout'
import { SectionTitleH1, Paragraph } from '../../Typography'
import StyledLink from '../../styledLink'
import getIntroSentence from '../../../utils/getIntroSentence'

const Headings = ({ title }) => (
  <Fragment>
    <Paragraph noMargin secondary>
      Featured work
    </Paragraph>
    <SectionTitleH1>{title}</SectionTitleH1>
  </Fragment>
)

const TextBelowImage = ({ introSentence, slug }) => (
  <Padding top={{ smallPhone: 0, tablet: 0.5 }}>
    <Paragraph fullWidth>{introSentence}</Paragraph>
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
