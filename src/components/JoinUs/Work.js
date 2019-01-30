import React from 'react'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import { Link } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import { ColumnLayout } from '../grid'
import { CardTitle, BodyPrimary } from '../Typography'
import colorLuminance from 'color-luminance'

import { Section, Separator, TitleAndBody } from './elements'
import TitleAndList from '../Common/TitleAndList'

const MAX_CASE_STUDIES = 3

/* Utility function to convert an HEX color into the RGB format */
const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

/* Returns the luminance (in a 0-255 range) of a color in the HEX format */
const getColorLuminance = hexColor => {
  const rgbValue = hexToRgb(`#${hexColor}`)

  return colorLuminance(rgbValue.r, rgbValue.g, rgbValue.b)
}

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

const CaseStudy = ({ title, lightText, ...props }) => (
  <CaseStudyLink {...props}>
    <Padding
      vertical={{ smallPhone: 2, smallTablet: 1.5, tablet: 3 }}
      horizontal={{ smallPhone: 2, smallTablet: 1.5, tablet: 2 }}
    >
      <BodyPrimary muted reverse noPadding>
        Case Study
      </BodyPrimary>
      <CaseStudyTitle reverse>{title}</CaseStudyTitle>
    </Padding>
  </CaseStudyLink>
)

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
          <CaseStudyWrapper top={2}>
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
    <Padding bottom={{ smallPhone: 3.5, tablet: 5 }} />
  </Section>
)

export default Work
