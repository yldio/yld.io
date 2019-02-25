import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Grid, Row, Col } from '../../grid'
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
  ${breakpoint('smallPhone')`
    padding-top: ${props =>
      props.isTop ? props.theme.spacing[3] : props.theme.spacing[3.5]};
    padding-bottom: ${props =>
      props.isTop ? props.theme.spacing[3] : props.theme.spacing[3.5]};
  `}

  ${breakpoint('tablet')`
    padding-top: ${props =>
      props.isTop ? remcalc(51) : props.theme.spacing[5]};
    padding-bottom: ${props =>
      props.isTop ? remcalc(86) : props.theme.spacing[5]};
  `}

  /* creates extra column of space between image & text on RHS */
  ${breakpoint('desktop')`
    justify-content: space-between;
  `}
`

// headings, textBelowImage & rightHandText should be sub-components (rather than a string, for example)
const CaseStudyLayout = ({
  isTop = true,
  posterImage,
  headings,
  textBelowImage,
  rightHandText
}) => (
  <Grid>
    <RowLayout isTop={isTop}>
      <Col width={[1, 1, 1, 1, 0]}>{headings}</Col>
      <Col width={[1, 1, 1, 1, 1 / 2]} pb={[3, 3, 3, 3, 0]}>
        <Image alt={posterImage.title} image={posterImage} width="100%" />
      </Col>
      <FlexCol width={[0, 0, 0, 0, 1 / 2, 1 / 2, 5 / 12]}>
        <TextWrapper>{rightHandText}</TextWrapper>
      </FlexCol>
      <Col width={[1, 1, 1, 1, 0]}>{textBelowImage}</Col>
    </RowLayout>
  </Grid>
)

export default CaseStudyLayout
