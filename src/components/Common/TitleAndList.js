import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Col, Row } from '../grid'
import { SectionTitle } from '../Typography'
import { ItemBody as Body, ItemSubtitle } from './SubtitleWithBody'
import theme from '../../utils/theme'
import RatioContainer from './RatioContainer'
import Image from './Image'

const StyledCol = styled(Col)`
  padding-bottom: ${props => props.theme.space[4]};
`

const PaddedGrid = styled(Grid)`
  padding-top: ${props => props.theme.space[4]};
  padding-bottom: ${props => props.theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${props => props.theme.space[6]};
    padding-bottom: ${props => props.theme.space[6]};
  `}
`

const Wrapper = styled.div`
  padding-bottom: ${props => props.theme.spacing[3]};

  &:last-child {
    padding: 0;
  }
`

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: ${props => props.theme.space[2]};
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
`

const TitleAndList = ({
  title,
  list,
  themeVariation = 'white',
  extraContent,
}) => {
  useEffect(() => {
    const titledAnchors = Array.from(document.querySelectorAll('a')).filter(
      a => a.title,
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
                  <Body themeVariation={themeVariation} {...props} />
                ),
              }}
              source={list}
            />
          ) : null}
          {Array.isArray(list)
            ? list.map((el, idx) => (
                <Wrapper key={idx}>
                  {el.image && (
                    <ImageWrapper>
                      <RatioContainer width={100} height={100}>
                        <StyledImage image={el.image} />
                      </RatioContainer>
                    </ImageWrapper>
                  )}
                  <ItemSubtitle themeVariation={themeVariation}>
                    {el.title}
                  </ItemSubtitle>
                  <Body themeVariation={themeVariation}>{el.body}</Body>
                </Wrapper>
              ))
            : null}
          {extraContent}
        </Col>
      </Row>
    </PaddedGrid>
  )
}

export default TitleAndList
