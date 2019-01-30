import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import { Grid, Row, Col } from '../grid'
import { DisplayTitle, Subtitle, BodyPrimary } from '../Typography'
import GreyBG from '../GreyBG'
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

const BodyWithCustomAnchors = styled(BodyPrimary)`
  a {
    text-decoration: underline;
  }
`

export const List = ({ list }) => (
  <Padding top={1}>
    <ReactMarkdown
      renderers={{
        heading: props => <Subtitle noPadding {...props} />, // eslint-disable-line react/display-name
        paragraph: props => <BodyWithCustomAnchors muted {...props} /> // eslint-disable-line react/display-name
      }}
      source={list}
    />
  </Padding>
)

export const Section = ({ children, greyBg, ...props }) => {
  const content = <Grid {...props}>{children}</Grid>

  if (!greyBg) {
    return content
  }

  return <GreyBG static>{content}</GreyBG>
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

export const Separator = ({ children }) => (
  <Padding bottom={{ smallPhone: 3, tablet: 3.5 }}>
    <Hr />
  </Padding>
)
