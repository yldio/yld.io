import React from 'react';
import styled from 'styled-components';

import CaseStudies from '../Common/case-studies/CaseStudies';
import { Section, Separator, TitleAndBody } from './elements';
import TitleAndList from '../Common/TitleAndList';
import breakpoint from 'styled-components-breakpoint';

const MAX_CASE_STUDIES = 3;

const CaseStudyWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: ${({ theme }) => theme.space[3]};
`;

const SpaceFiller = styled.div`
  ${breakpoint('tablet')`
      padding-bottom:
        ${({ theme }) => theme.space[7]};
  `}

  ${breakpoint('smallPhone')`
      padding-bottom:
        ${({ theme }) => theme.space[5]};
  `}
`;

const Work = ({ data: { title, subtitle, list, text, someWork } }) => (
  <Section>
    <TitleAndList title={title} list={list} />
    <Separator />
    <TitleAndBody title={subtitle} body={text} />
    <CaseStudyWrapper>
      <CaseStudies caseStudies={someWork.slice(0, MAX_CASE_STUDIES)} />
    </CaseStudyWrapper>
    <SpaceFiller />
  </Section>
);

export default Work;
