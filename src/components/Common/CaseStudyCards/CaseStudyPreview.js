import PropTypes from 'prop-types'
import { or } from 'airbnb-prop-types'
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

const TextBelowImage = ({ introSentence, slug, ctaDataEventLabel }) => (
  <Padding top={{ smallPhone: 0, tablet: 0.5 }}>
    <BodyPrimary>{introSentence}</BodyPrimary>
    <StyledLink
      title="Learn more"
      to={`/case-study/${slug}`}
      data-event={ctaDataEventLabel}
    >
      Learn more
    </StyledLink>
  </Padding>
)

const RightHandText = ({
  title,
  introSentence,
  ctaDataEventLabel,
  slug,
  as
}) => (
  <Fragment>
    <Padding bottom={0.5}>
      <Headings as={as} title={title} />
    </Padding>
    <Padding bottom={1}>
      <TextBelowImage
        introSentence={introSentence}
        ctaDataEventLabel={ctaDataEventLabel}
        slug={slug}
      />
    </Padding>
  </Fragment>
)

const CaseStudyPreview = ({ isTop, caseStudy, ctaDataEventLabel, as }) => {
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
        <TextBelowImage
          ctaDataEventLabel={ctaDataEventLabel}
          introSentence={introSentence}
          slug={slug}
        />
      }
      rightHandText={
        <RightHandText
          ctaDataEventLabel={ctaDataEventLabel}
          title={title}
          introSentence={introSentence}
          slug={slug}
          as={as}
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
      PropTypes.shape({
        introSentence: PropTypes.string.isRequired
      }).isRequired
    ])
  })
}

export default CaseStudyPreview
