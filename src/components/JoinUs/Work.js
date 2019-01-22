import React from 'react'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import { Link } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import { CompensatedCol, CompensatedRow } from '../grid'
import { H3, Paragraph } from '../Typography'
import colorLuminance from 'color-luminance'

import { Section, Separator, TitleAndBody, TitleAndList } from './elements'

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

const CaseStudy = ({ title, lightText, ...props }) => (
  <CaseStudyLink {...props}>
    <Padding
      vertical={{ smallPhone: 2, smallTablet: 1.5, tablet: 3 }}
      horizontal={{ smallPhone: 2, smallTablet: 1.5, tablet: 2 }}
    >
      <Paragraph muted reverse={lightText} noMargin>
        Case Study
      </Paragraph>
      <CaseStudyTitle reverse={lightText}>{title}</CaseStudyTitle>
    </Padding>
  </CaseStudyLink>
)

const CaseStudyWrapper = styled(Padding)`
  display: flex;
  width: 100%;
`
const CaseStudyTitle = styled(H3)`
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

const Work = ({ data: { title, subtitle, list, text, someWork } }) => (
  <Section>
    <TitleAndList title={title} list={list} />
    <Separator />
    <TitleAndBody title={subtitle} body={text} />
    <CompensatedRow>
      {someWork.slice(0, MAX_CASE_STUDIES).map((cs, idx) => {
        const lightText = getColorLuminance(cs.posterColor) < 127.5

        return (
          <CompensatedCol width={[1, 1, 1, 4 / 12]} key={idx} block={false}>
            <CaseStudyWrapper top={2}>
              <CaseStudy
                bg={`#${cs.posterColor}`}
                to={`/case-study/${cs.slug}`}
                lightText={lightText}
                title={cs.title}
              />
            </CaseStudyWrapper>
          </CompensatedCol>
        )
      })}
    </CompensatedRow>
  </Section>
)

export default Work
