import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import { Grid, Row, Col } from '../grid'
import { H3, Paragraph, H5 } from '../Typography'
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

export const List = ({ list }) => (
  <Padding top={1}>
    <ReactMarkdown
      renderers={{
        heading: props => <H5 as="h4" noMargin bold {...props} />, // eslint-disable-line react/display-name
        paragraph: props => <Paragraph muted {...props} /> // eslint-disable-line react/display-name
      }}
      source={list}
    />
  </Padding>
)

export const Section = ({ children, greyBg, ...props }) => {
  const content = (
    <Grid {...props}>
      <Padding
        top={{ smallPhone: 3, tablet: 4 }}
        bottom={{ smallPhone: 3.5, tablet: 5 }}
      >
        {children}
      </Padding>
    </Grid>
  )

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
      <H3 regular dark>
        {title}
      </H3>
      <Paragraph muted>{body}</Paragraph>
    </Col>
  </Row>
)

export const Separator = ({ children }) => (
  <Padding
    top={{ smallPhone: 3, tablet: 4 }}
    bottom={{ smallPhone: 3, tablet: 3.5 }}
  >
    <Hr />
  </Padding>
)
