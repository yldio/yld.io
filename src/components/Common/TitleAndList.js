import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { Col, Row } from '../grid'
import { Padding } from 'styled-components-spacing'
import { SectionTitle } from '../Typography'
import { ItemBody as Body, ItemSubtitle } from './SubtitleWithBody'
import theme from '../../utils/theme'

const OuterPaddings = ({ children }) => (
  <Padding vertical={{ smallPhone: 3, tablet: 4 }}>{children}</Padding>
)

const ItemBody = styled(Body)`
  &:last-child {
    padding: 0;
  }
`
const TitleAndList = ({
  title,
  list,
  themeVariation = 'white',
  extraContent
}) => {
  useEffect(() => {
    const titledAnchors = Array.from(document.querySelectorAll('a')).filter(
      a => a.title
    )
    titledAnchors.forEach(a => a.setAttribute('target', '_blank'))
  }, [])

  return (
    <OuterPaddings>
      <Row>
        <Col width={[1, 1, 1, 1, 6 / 12]}>
          <Padding bottom={3}>
            <SectionTitle reverse={themeVariation === theme.variations.dark}>
              {title}
            </SectionTitle>
          </Padding>
        </Col>
        <Col width={[1, 1, 1, 1, 6 / 12]}>
          {typeof list === 'string' ? (
            <ReactMarkdown
              renderers={{
                // eslint-disable-next-line
                heading: props => (
                  <ItemSubtitle themeVariation={themeVariation} {...props} />
                ),
                // eslint-disable-next-line
                paragraph: props => (
                  <ItemBody themeVariation={themeVariation} {...props} />
                )
              }}
              source={list}
            />
          ) : null}
          {Array.isArray(list)
            ? list.map((el, idx) => (
                <React.Fragment key={idx}>
                  <ItemSubtitle themeVariation={themeVariation}>
                    {el.title}
                  </ItemSubtitle>
                  <ItemBody themeVariation={themeVariation}>{el.body}</ItemBody>
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
