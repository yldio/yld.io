import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
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

// headings, textBelowImage & rightHandText should be sub-components (rather than a string, for example)
const CaseStudyLayout = ({
  posterImage,
  headings,
  textBelowImage,
  rightHandText
}) => (
  <RowLayout>
    <Col width={[1, 1, 1, 1, 0]}>{headings}</Col>
    <Col width={[1, 1, 1, 1, 1 / 2]} pb={[3, 3, 3, 3, 0]}>
      <Image alt={posterImage.title} image={posterImage} />
    </Col>
    <FlexCol pl={[0, 0, 0, 0, 0, 0, 0]} width={[0, 0, 0, 0, 1 / 2, 5 / 12]}>
      <TextWrapper>{rightHandText}</TextWrapper>
    </FlexCol>
    <Col width={[1, 1, 1, 1, 0]}>{textBelowImage}</Col>
  </RowLayout>
)

export default CaseStudyLayout
