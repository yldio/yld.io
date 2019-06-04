import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Col, Row } from '../grid'
import { SectionTitle } from '../Typography'
import { ItemBody as Body, ItemSubtitle } from './SubtitleWithBody'
import theme from '../../utils/theme'
import Image from './Image'

const StyledCol = styled(Col)`
  padding-bottom: ${props => props.theme.space[4]};
`

const PaddedGrid = styled(Grid)`
  padding: ${props => props.theme.space[4]} 0;

  ${breakpoint('tablet')`
    padding: ${props => props.theme.space[6]} 0;
  `}
`

const ItemBody = styled(Body)`
  &:last-child {
    padding: 0;
  }
`

const SquareImg60 = styled(Image)`
  max-width: 60px;
  max-height: 60px;
  padding-bottom: 12px;

  &:not(:first-child) {
    margin-top: 12px;
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

  // there is no image in the `typeof list === 'string'` because that would come from a textarea input from contentful as a bullet list, so if we want an image per bullet, we MUST pass the list as an array of objects.

  return (
    <PaddedGrid>
      <Row>
        <StyledCol width={[1, 1, 1, 1, 6 / 12]}>
          <SectionTitle reverse={themeVariation === theme.variations.dark}>
            {title}
          </SectionTitle>
        </StyledCol>
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
                  {el.image && <SquareImg60 image={el.image} />}
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
    </PaddedGrid>
  )
}

export default TitleAndList
