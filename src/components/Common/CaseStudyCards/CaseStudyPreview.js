import React, { Fragment } from 'react'
import CaseStudyLayout from './CaseStudyLayout'
import FixedSizeHeading from './FixedSizeHeading'
import { Paragraph } from '../../Typography'
import StyledLink from '../../styledLink'
import getIntroSentence from '../../../utils/getIntroSentence'

const Headings = ({ title }) => (
  <Fragment>
    <Paragraph noMargin p>
      Featured work
    </Paragraph>
    <FixedSizeHeading>{title}</FixedSizeHeading>
  </Fragment>
)

const MainText = ({ introSentence, slug }) => (
  <Fragment>
    <Paragraph fullWidth>{introSentence}</Paragraph>
    <StyledLink to={`/case-study/${slug}`}>Learn more</StyledLink>
  </Fragment>
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
