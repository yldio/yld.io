import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'
import CaseStudyLayout from './CaseStudyLayout'
import { H1, Paragraph } from '../../Typography'
import StyledLink from '../../styledLink'
import getIntroSentence from '../../../utils/getIntroSentence'

const Headings = ({ title }) => (
  <Fragment>
    <Paragraph noMargin secondary>
      Featured work
    </Paragraph>
    <H1>{title}</H1>
  </Fragment>
)

const MainText = ({ introSentence, slug }) => (
  <Padding top={{ smallPhone: 0, tablet: 0.5 }}>
    <Paragraph fullWidth>{introSentence}</Paragraph>
    <StyledLink to={`/case-study/${slug}`}>Learn more</StyledLink>
  </Padding>
)

const CaseStudyPreview = ({ caseStudy }) => {
  const introSentence = getIntroSentence(caseStudy)
  const { posterImage, title, slug } = caseStudy
  return (
    <CaseStudyLayout
      posterImage={posterImage}
      headings={<Headings title={title} />}
      mainText={<MainText introSentence={introSentence} slug={slug} />}
    />
  )
}

export default CaseStudyPreview
