import React from 'react';
import styled from 'styled-components';

import { ColumnLayout } from '../grid';
import { CaseStudy } from '../Common/CaseStudy';
import { Section, Separator, TitleAndBody } from './elements';
import TitleAndList from '../Common/TitleAndList';
import breakpoint from 'styled-components-breakpoint';

import { getColorLuminance } from '../../utils/color';

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
    <ColumnLayout
      cols={3}
      items={someWork.slice(0, MAX_CASE_STUDIES)}
      compensated
    >
      {({ Col, item: cs }) => (
        <Col block={false}>
          <CaseStudyWrapper>
            <CaseStudy
              bg={`#${cs.posterColor}`}
              to={`/case-study/${cs.slug}`}
              lightText={getColorLuminance(cs.posterColor) < 127.5}
              title={cs.title}
            />
          </CaseStudyWrapper>
        </Col>
      )}
    </ColumnLayout>
    <SpaceFiller />
  </Section>
);

export default Work;
