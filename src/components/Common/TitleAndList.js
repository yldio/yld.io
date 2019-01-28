import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { Col, Row } from '../grid'
import { Padding } from 'styled-components-spacing'
import { Paragraph, H2 } from '../Typography'

const OuterPaddings = ({ children }) => (
  <Padding vertical={{ smallPhone: 3, tablet: 4 }}>{children}</Padding>
)

const ParagraphWithOptionalPadding = styled(Paragraph)`
  &:last-child {
    padding: 0;
  }
`
const Subtitle = ({ children, ...props }) => (
  <Paragraph as="h3" noMargin bold {...props}>
    {children}
  </Paragraph>
)

const TitleAndList = ({ title, list, bg = 'white', extraContent }) => {
  return (
    <OuterPaddings>
      <Row>
        <Col width={[1, 1, 1, 6 / 12]}>
          <Padding bottom={3}>
            <H2 small noMargin reverse={bg === 'dark'}>
              {title}
            </H2>
          </Padding>
        </Col>
        <Col width={[1, 1, 1, 6 / 12]}>
          {typeof list === 'string' ? (
            <ReactMarkdown
              renderers={{
                heading: props => {
                  const Comp = <Subtitle reverse={bg === 'dark'} {...props} /> // eslint-disable-line react/no-display-name
                  return Comp
                },
                paragraph: props => {
                  const Comp = (
                    <ParagraphWithOptionalPadding
                      padded
                      muted={bg === 'dark'}
                      reverse={bg === 'dark'}
                      {...props}
                    />
                  ) // eslint-disable-line react/no-display-name

                  return Comp
                }
              }}
              source={list}
            />
          ) : null}
          {Array.isArray(list)
            ? list.map((el, idx) => (
                <React.Fragment key={idx}>
                  <Subtitle reverse={bg === 'dark'}>{el.title}</Subtitle>
                  <ParagraphWithOptionalPadding
                    padded
                    muted={bg === 'dark'}
                    reverse={bg === 'dark'}
                  >
                    {el.body}
                  </ParagraphWithOptionalPadding>
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
