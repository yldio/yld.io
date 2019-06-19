import React from 'react'

import { Padding } from 'styled-components-spacing'
import { ColumnLayout } from '../grid'
import { CaseStudyWrapper, CaseStudy } from '../Common/CaseStudy'
import { Section, Separator, TitleAndBody } from './elements'
import TitleAndList from '../Common/TitleAndList'

import getColorLuminance from '../../utils/getColorLuminance'

const MAX_CASE_STUDIES = 3

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
