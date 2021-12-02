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

const ContributionsCopy = (props) => {
  const {
    projects,
    contributions,
    titleStandalone = null,
    titleBeforeContributionCount: first = null,
    titleBetweenContributionAndProjectCount: second = null,
    titleAfterProjectCount: third = null,
  } = props;

  const labelStyle = React.useMemo(() => {
    return first && second && third ? undefined : { display: 'none' };
  }, [first, second, third]);

  return (
    <StyledSectionTitle reverse>
      {titleStandalone}
      {titleStandalone && <br />}
      <span style={labelStyle}>
        {first} <br />
      </span>
      <span style={labelStyle}>
        <StyledSpan ref={contributions} /> {second} <br />
      </span>
      <span style={labelStyle}>
        <StyledSpan ref={projects} /> {third}
      </span>
    </StyledSectionTitle>
  );
};

export default ContributionsCopy;
