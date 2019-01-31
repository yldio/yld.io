import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { Col, Row } from '../grid'
import { Padding } from 'styled-components-spacing'
import { SectionTitle } from '../Typography'
import { ItemBody as Body, ItemSubtitle } from './SubtitleWithBody'

const OuterPaddings = ({ children }) => (
  <Padding vertical={{ smallPhone: 3, tablet: 4 }}>{children}</Padding>
)

const ItemBody = styled(Body)`
  &:last-child {
    padding: 0;
  }
`
const TitleAndList = ({ title, list, bg = 'white', extraContent }) => {
  return (
    <OuterPaddings>
      <Row>
        <Col width={[1, 1, 1, 6 / 12]}>
          <Padding bottom={3}>
            <SectionTitle reverse={bg === 'dark'}>{title}</SectionTitle>
          </Padding>
        </Col>
        <Col width={[1, 1, 1, 6 / 12]}>
          {typeof list === 'string' ? (
            <ReactMarkdown
              renderers={{
                heading: props => {
                  const Comp = <ItemSubtitle bg={bg} {...props} /> // eslint-disable-line react/no-display-name
                  return Comp
                },
                paragraph: props => {
                  const Comp = <ItemBody bg={bg} {...props} /> // eslint-disable-line react/no-display-name

                  return Comp
                }
              }}
              source={list}
            />
          ) : null}
          {Array.isArray(list)
            ? list.map((el, idx) => (
                <React.Fragment key={idx}>
                  <ItemSubtitle bg={bg}>{el.title}</ItemSubtitle>
                  <ItemBody bg={bg}>{el.body}</ItemBody>
                </React.Fragment>
              ))
            : null}
          {extraContent}
        </Col>
      </Row>
    </OuterPaddings>
  )
}

export default TitleAndList
