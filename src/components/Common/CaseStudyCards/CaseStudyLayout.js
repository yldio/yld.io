import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Padding } from 'styled-components-spacing'
import { Row, Col } from '../../grid'
import Image from '../Image'

const TextWrapper = styled.div`
  ${breakpoint('tablet')`
    align-self: center;
  `}
`

const FlexCol = styled(Col)`
  display: flex;
`

// headings & mainText should be sub-components (rather than a string, for example)
const CaseStudyLayout = ({ posterImage, headings, mainText }) => (
  <Row>
    <Col width={[1, 1, 1, 1, 0]}>{headings}</Col>
    <Col width={[1, 1, 1, 1, 1 / 2]} pb={[3, 3, 3, 3, 0]}>
      <Image alt={posterImage.title} image={posterImage} />
    </Col>
    <FlexCol width={[0, 0, 0, 0, 1 / 2, 1 / 2]}>
      <TextWrapper>
        <Padding bottom={0.5}>{headings}</Padding>
        <Padding bottom={1}>{mainText}</Padding>
      </TextWrapper>
    </FlexCol>
    <Col width={[1, 1, 1, 1, 0]}>{mainText}</Col>
  </Row>
)

export default CaseStudyLayout
