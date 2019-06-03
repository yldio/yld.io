import PropTypes from 'prop-types'
import { or } from 'airbnb-prop-types'
import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'

import CaseStudyLayout from './CaseStudyLayout'
import { SectionTitle, BodyPrimary } from '../../Typography'
import StyledLink from '../StyledLink'
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

const CaseStudyPreview = ({ isTop, caseStudy }) => {
  if (!caseStudy) {
    return null
  }

  const introSentence = getIntroSentence(caseStudy)
  const { posterImage, title, slug } = caseStudy
  return (
    <CaseStudyLayout
      isTop={isTop}
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

CaseStudyPreview.propTypes = {
  isTop: PropTypes.bool,
  caseStudy: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    posterImage: PropTypes.object,
    introSentence: or([
      PropTypes.string.isRequired,
      PropTypes.objectOf(PropTypes.string.isRequired).isRequired
    ])
  })
}

export default CaseStudyPreview
