import React from 'react'
import remcalc from 'remcalc'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { Col, Row } from '../grid'
import { Padding } from 'styled-components-spacing'
import { Subtitle, BodyPrimary, SectionTitle } from '../Typography'

const OuterPaddings = ({ children }) => (
  <Padding vertical={{ smallPhone: 3, tablet: 4 }}>{children}</Padding>
)

const ParagraphWithOptionalPadding = styled(BodyPrimary)`
  padding-bottom: ${remcalc(24)};
  &:last-child {
    padding: 0;
  }
`
const ItemTitle = ({ children, ...props }) => (
  <Subtitle as="h3" noPadding bold {...props}>
    {children}
  </Subtitle>
)

const TitleAndList = ({ title, list, bg = 'white', extraContent }) => {
  return (
    <OuterPaddings>
      <Row>
        <Col width={[1, 1, 1, 6 / 12]}>
          <Padding bottom={3}>
            <SectionTitle small noPadding reverse={bg === 'dark'}>
              {title}
            </SectionTitle>
          </Padding>
        </Col>
        <Col width={[1, 1, 1, 6 / 12]}>
          {typeof list === 'string' ? (
            <ReactMarkdown
              renderers={{
                heading: props => {
                  const Comp = <ItemTitle reverse={bg === 'dark'} {...props} /> // eslint-disable-line react/no-display-name
                  return Comp
                },
                paragraph: props => {
                  const Comp = (
                    <ParagraphWithOptionalPadding
                      noPaddingTop
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
                  <ItemTitle reverse={bg === 'dark'}>{el.title}</ItemTitle>
                  <ParagraphWithOptionalPadding
                    noPaddingTop
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
