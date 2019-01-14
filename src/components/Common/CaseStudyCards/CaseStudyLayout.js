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
  ${breakpoint('desktop')`
    justify-content: space-between;
  `}
`

// headings & mainText should be sub-components (rather than a string, for example)
const CaseStudyLayout = ({ posterImage, headings, mainText }) => (
  <RowLayout>
    <Col width={[1, 1, 1, 1, 0]}>{headings}</Col>
    <Col width={[1, 1, 1, 1, 1 / 2]} pb={[3, 3, 3, 3, 0]}>
      <Image alt={posterImage.title} image={posterImage} />
    </Col>
    <FlexCol px={[0, 0, 0, 0, 0, 0, 0]} width={[0, 0, 0, 0, 1 / 2, 5 / 12]}>
      <TextWrapper>
        <Padding bottom={0.5}>{headings}</Padding>
        <Padding bottom={1}>{mainText}</Padding>
      </TextWrapper>
    </FlexCol>
    <Col width={[1, 1, 1, 1, 0]}>{mainText}</Col>
  </RowLayout>
)

export default CaseStudyLayout
