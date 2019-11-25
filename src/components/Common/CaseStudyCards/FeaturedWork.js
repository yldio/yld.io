import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import Image from '../../Common/Image';
import StyledLink from '../../Common/StyledLink';
import Hr from '../Hr';
import { Grid, Row, Col } from '../../grid';
import CaseStudiesGrid from './CaseStudiesGrid';
import { BodyPrimary, CardTitle, DisplayTitle } from '../../Typography';

// --- individual case study ---

const SeparatorCol = styled(Hr)`
  margin: ${({ theme }) => theme.space[3]} 0;
`;
const CaseStudyPoster = styled.div`
  ${breakpoint('smallPhone', 'tablet')`
    display: none;
  `}
`;
const CaseStudyCard = styled.div`
  padding: ${({ theme }) =>
    `${theme.space[3]} ${theme.space[6]} ${theme.space[3]} ${theme.space[3]}`};
  background-color: #${({ backgroundColor }) => backgroundColor};

  ${breakpoint('tablet')`
    display: none;
  `}
`;

const CaseStudy = ({
  caseStudy: {
    slug,
    previewImage,
    posterColor,
    reverseColor,
    client,
    title,
    introSentence: { introSentence },
  },
}) => (
  <>
    <SeparatorCol />
    {/* large screen */}
    <CaseStudyPoster>
      <Image
        css={({ theme }) => ({ marginBottom: theme.space[4] })}
        image={previewImage}
      />
      <BodyPrimary noPadding muted>
        {client}
      </BodyPrimary>
      <CardTitle>{title}</CardTitle>
    </CaseStudyPoster>
    {/* small screen */}
    <CaseStudyCard backgroundColor={posterColor}>
      <BodyPrimary noPaddingBottom muted reverse={reverseColor}>
        {client}
      </BodyPrimary>
      <CardTitle reverse={reverseColor}>{title}</CardTitle>
    </CaseStudyCard>
    {/* any screen */}
    <BodyPrimary css={({ theme }) => ({ padding: `${theme.space[3]} 0` })}>
      {introSentence}
    </BodyPrimary>
    <div>
      <StyledLink to={`/case-study/${slug}/`}>Learn more</StyledLink>
    </div>
  </>
);

// --- featured work as a whole ---

const FeaturedWorkGrid = styled(Grid)`
  margin-top: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    margin-top: ${({ theme }) => theme.space[5]};
    margin-bottom: ${({ theme }) => theme.space[5]};
  `}
`;

const FeaturedWorkHeading = () => (
  <Row css={({ theme }) => ({ 'padding-bottom': theme.space[3] })}>
    <Col>
      <DisplayTitle>Featured work</DisplayTitle>
    </Col>
  </Row>
);

const FeaturedWork = ({ caseStudies, limited = false }) => {
  if (!caseStudies || !caseStudies.length) {
    return null;
  }

  return (
    <section>
      <FeaturedWorkGrid>
        <FeaturedWorkHeading />
        <CaseStudiesGrid limited={limited}>
          {caseStudies.map(caseStudy => (
            <CaseStudy key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </CaseStudiesGrid>
      </FeaturedWorkGrid>
    </section>
  );
};

export default FeaturedWork;
