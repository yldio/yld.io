import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import Image from '../../Common/Image';
import StyledLink from '../../Common/StyledLink';
import Hr from '../Hr';
import { BodyPrimary, CardTitle } from '../../Typography';

import CaseStudiesGrid from './CaseStudiesGrid';

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
      <BodyPrimary noPaddingBottom reverse={reverseColor}>
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

/**
 * @prop {boolean} limited Do not show more than two rows on phones, or one row on larger screens. Defaults to false.
 * @prop {boolean} hideSparseRows Hide the last row if there are too few elements to fill all its columns. Does not apply to the first row, which is always shown. Defaults to false.
 */
const CaseStudies = ({
  caseStudies,
  limited = false,
  hideSparseRows = false,
}) => {
  if (!caseStudies || !caseStudies.length) {
    return null;
  }

  return (
    <CaseStudiesGrid limited={limited} hideSparseRows={hideSparseRows}>
      {caseStudies.map(caseStudy => (
        <CaseStudy key={caseStudy.slug} caseStudy={caseStudy} />
      ))}
    </CaseStudiesGrid>
  );
};

export default CaseStudies;
