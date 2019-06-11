import React from 'react'

import { Padding } from 'styled-components-spacing'
import { ColumnLayout } from '../grid'
import colorLuminance from 'color-luminance'
import { CaseStudyWrapper, CaseStudy } from '../Common/CaseStudy'
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
