import PropTypes from 'prop-types';
import { or } from 'airbnb-prop-types';
import React, { Fragment } from 'react';
import { Padding } from 'styled-components-spacing';

import CaseStudyLayout from './CaseStudyLayout';
import { SectionTitle, BodyPrimary } from '../../Typography';
import Anchor from '../Anchor';
import StyledLink from '../StyledLink';
import getIntroSentence from '../../../utils/getIntroSentence';
import eventLabels from '../../../utils/eventLabels';

const Headings = ({ title, as, link }) => (
  <Fragment>
    <BodyPrimary noPadding secondary>
      Featured work
    </BodyPrimary>
    <Anchor to={link}>
      <SectionTitle as={as}>{title}</SectionTitle>
    </Anchor>
  </Fragment>
);

const TextBelowImage = ({ introSentence, link, ctaDataEventLabel }) => (
  <Padding top={{ smallPhone: 0, tablet: 0.5 }}>
    <BodyPrimary>{introSentence}</BodyPrimary>
    <StyledLink
      title="Learn more"
      data-event={ctaDataEventLabel || eventLabels.learnMoreCTA}
      to={link}
    >
      Learn more
    </StyledLink>
  </Padding>
);

const RightHandText = ({
  title,
  introSentence,
  ctaDataEventLabel,
  link,
  as,
}) => (
  <Fragment>
    <Padding bottom={0.5}>
      <Headings as={as} title={title} link={link} />
    </Padding>
    <Padding bottom={1}>
      <TextBelowImage
        introSentence={introSentence}
        ctaDataEventLabel={ctaDataEventLabel}
        link={link}
      />
    </Padding>
  </Fragment>
);

const CaseStudyPreview = ({ isTop, caseStudy, ctaDataEventLabel, as }) => {
  if (!caseStudy) {
    return null;
  }

  const introSentence = getIntroSentence(caseStudy);
  const { posterImage, title, slug } = caseStudy;
  const caseStudyLink = `/case-study/${slug}`;

  return (
    <CaseStudyLayout
      isTop={isTop}
      link={caseStudyLink}
      posterImage={posterImage}
      headings={<Headings title={title} as={as} />}
      textBelowImage={
        <TextBelowImage
          ctaDataEventLabel={ctaDataEventLabel}
          introSentence={introSentence}
          link={caseStudyLink}
        />
      }
      rightHandText={
        <RightHandText
          ctaDataEventLabel={ctaDataEventLabel}
          title={title}
          introSentence={introSentence}
          link={caseStudyLink}
          as={as}
        />
      }
    />
  );
};

CaseStudyPreview.propTypes = {
  isTop: PropTypes.bool,
  caseStudy: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    posterImage: PropTypes.object,
    introSentence: or([
      PropTypes.string.isRequired,
      PropTypes.shape({
        introSentence: PropTypes.string.isRequired,
      }).isRequired,
    ]),
  }),
};

export default CaseStudyPreview;
