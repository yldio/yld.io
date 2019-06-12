import React from 'react'

import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import { Link } from 'gatsby'
import { CardTitle, BodyPrimary } from '../Typography'
import { Padding } from 'styled-components-spacing'

const CaseStudyLink = styled(Link)`
  background: ${props => props.bg};
  color: ${props => props.color || props.theme.colors.white};
  flex: 1;
`
const CaseStudyWrapper = styled(Padding)`
  display: flex;
  width: 100%;
`
const CaseStudyTitle = styled(CardTitle)`
  font-size: ${remcalc(21)};
  line-height: ${remcalc(24)};
  color: ${props =>
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
`

const servicesList = services => {
  return [services.slice(0, -1).join(', '), services.slice(-1)[0]].join(
    services.length < 2 ? '' : ' & '
  )
}

const CaseStudy = ({ title, services, ...props }) => (
  <CaseStudyLink {...props}>
    <Padding
      vertical={{ smallPhone: 2, smallTablet: 1.5, tablet: 3 }}
      horizontal={{ smallPhone: 2, smallTablet: 1.5, tablet: 2 }}
    >
      <BodyPrimary muted reverse noPadding>
        {services && services.length > 0
          ? servicesList(services)
          : 'Case Study'}
      </BodyPrimary>
      <CaseStudyTitle reverse>{title}</CaseStudyTitle>
    </Padding>
  </CaseStudyLink>
)

export { CaseStudyWrapper, CaseStudy }
