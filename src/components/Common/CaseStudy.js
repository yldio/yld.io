import React from 'react';

import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import remcalc from 'remcalc';
import InternalAnchor from '../Common/InternalAnchor';
import { CardTitle, BodyPrimary } from '../Typography';

const CaseStudyLink = styled(InternalAnchor)`
  background: ${(props) => props.bg};
  color: ${(props) => props.color || props.theme.colors.white};
  flex: 1;
`;

const CaseStudyTitle = styled(CardTitle)`
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
  color: ${(props) =>
    props.reverse ? props.theme.colors.white : props.theme.colors.text};

  ${breakpoint('largePhone')`
  font-size: ${remcalc(17)};
  line-height: ${remcalc(21)};
`};

  ${breakpoint('smallTablet')`
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
`};

  ${breakpoint('tablet')`
  font-size: ${remcalc(26)};
  line-height: ${remcalc(30)};
`};
`;

const servicesList = (services) => {
  return [services.slice(0, -1).join(', '), services.slice(-1)[0]].join(
    services.length < 2 ? '' : ' & ',
  );
};

const Wrapper = styled.div`
  ${breakpoint('tablet')`
      padding:
        ${({ theme }) => theme.space[4]}
        ${({ theme }) => theme.space[3]};
  `}

  ${breakpoint('smallTablet', 'tablet')`
        padding:
          ${remcalc(18)};
    `}

  ${breakpoint('smallPhone')`
        padding:
          ${({ theme }) => theme.space[3]} ;
    `}
`;

const CaseStudy = ({ title, services, ...props }) => (
  <CaseStudyLink {...props}>
    <Wrapper>
      <BodyPrimary reverse noPadding>
        {services && services.length > 0
          ? servicesList(services)
          : 'Case Study'}
      </BodyPrimary>
      <CaseStudyTitle reverse>{title}</CaseStudyTitle>
    </Wrapper>
  </CaseStudyLink>
);

export { CaseStudy };
