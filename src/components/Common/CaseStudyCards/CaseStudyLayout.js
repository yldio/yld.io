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

const RowLayout = styled(Row)`
  // creates extra column of space between image & text on RHS
  ${breakpoint('tablet')`
    justify-content: space-between;
  `}
`

// headings & mainText should be sub-components (rather than a string, for example)
const CaseStudyLayout = ({ posterImage, headings, mainText }) => (
  <RowLayout>
    <Col width={[1, 1, 1, 1, 0]}>
      <Padding bottom={3}>{headings}</Padding>
    </Col>
    <Col width={[1, 1, 1, 1, 1 / 2]}>
      <Image alt={posterImage.title} image={posterImage} />
    </Col>
    <FlexCol width={[0, 0, 0, 0, 1 / 2, 5 / 12]}>
      <TextWrapper>
        <Padding bottom={0.5}>{headings}</Padding>
        <Padding bottom={1}>{mainText}</Padding>
      </TextWrapper>
    </FlexCol>
    <Col width={[1, 1, 1, 1, 0]}>{mainText}</Col>
  </RowLayout>
)

export default CaseStudyLayout
