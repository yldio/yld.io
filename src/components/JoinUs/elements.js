import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import { Grid, Row, Col } from '../grid'
import { DisplayTitle, BodyPrimary } from '../Typography'
import GreyBackground from '../Common/GreyBackground'
import Hr from '../Common/Hr'

/**
 * Layout
 */
export const FirstColumn = ({ children }) => (
  <Col width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>{children}</Col>
)

export const ShiftedColumn = styled(Col)`
  ${breakpoint('tablet')`
    margin-left: 8.33333%;
  `};
`
export const SecondColumn = ({ children }) => (
  <ShiftedColumn width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>{children}</ShiftedColumn>
)

export const Section = ({ children, greyBg, ...props }) => {
  const content = <Grid {...props}>{children}</Grid>

  if (!greyBg) {
    return content
  }

  return <GreyBackground>{content}</GreyBackground>
}

/**
 * Elements
 */
export const TitleAndBody = ({ title, body }) => (
  <Row>
    <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
      <DisplayTitle>{title}</DisplayTitle>
      <BodyPrimary textLight>{body}</BodyPrimary>
    </Col>
  </Row>
)

export const Separator = () => (
  <Padding bottom={{ smallPhone: 3, tablet: 3.5 }}>
    <Hr />
  </Padding>
)
