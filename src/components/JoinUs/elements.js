import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import { Grid, Row, Col } from '../grid'
import { H3, Paragraph } from '../Typography'
import GreyBG from '../GreyBG'

/**
 * Layout
 */
export const FirstColumn = ({ children }) => (
  <Col width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>{children}</Col>
)

export const SecondColum = ({ fillWidth = false, children }) => (
  <ShiftedColumn
    width={fillWidth ? [1, 1, 1, 1, 6 / 12] : [1, 1, 1, 1, 6 / 12, 5 / 12]}
  >
    {children}
  </ShiftedColumn>
)

export const List = ({ list }) => (
  <Padding top={1}>
    <ReactMarkdown
      renderers={{
        heading: props => <Paragraph noMargin bold {...props} />, // eslint-disable-line react/display-name
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
export const Hr = styled.hr`
  margin: 18px 0;
  opacity: 1;
  background: ${props => props.theme.colors.grey};
`

export const LightH3 = styled(H3)`
  font-weight: normal;
  color: ${props => props.color || props.theme.colors.text};
`

export const ShiftedColumn = styled(Col)`
  ${breakpoint('tablet')`
    margin-left: 8.33333%;
  `};
`
export const TitleAndBody = ({ title, body }) => (
  <React.Fragment>
    <Row>
      <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
        <LightH3>{title}</LightH3>
      </Col>
    </Row>
    <Row>
      <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
        <Paragraph muted>{body}</Paragraph>
      </Col>
    </Row>
  </React.Fragment>
)

export const Separator = ({ children }) => (
  <Padding
    top={{ smallPhone: 3, tablet: 4 }}
    bottom={{ smallPhone: 3, tablet: 3.5 }}
  >
    <Hr />
  </Padding>
)
