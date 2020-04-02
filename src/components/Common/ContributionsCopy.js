import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { SectionTitle } from '../Typography';

const StyledSectionTitle = styled(SectionTitle)`
  ${breakpoint('smallPhone', 'desktop')`
    padding-top: ${({ theme }) => theme.space[3]};
    padding-bottom: 0;
  `}

  ${breakpoint('desktop')`
    padding-top: ${({ theme }) => theme.space[3]};
    padding-bottom: ${({ theme }) => theme.space[3]};
  `}
`;

const StyledSpan = styled.span`
  font-family: 'PT Mono';
`;

const ContributionsCopy = props => {
  const {
    projects,
    contributions,
    titleStandalone = null,
    titleBeforeContributionCount: first = null,
    titleBetweenContributionAndProjectCount: second = null,
    titleAfterProjectCount: third = null,
  } = props;

  return (
    <>
      <StyledSectionTitle reverse>
        {titleStandalone}
        {titleStandalone && <br />}
        {first && second && third && (
          <>
            {first} <br />
            <StyledSpan>{contributions}</StyledSpan> {second} <br />
            <StyledSpan>{projects}</StyledSpan> {third}
          </>
        )}
      </StyledSectionTitle>
    </>
  );
};

export default ContributionsCopy;
