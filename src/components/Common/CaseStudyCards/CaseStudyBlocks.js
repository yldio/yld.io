import React, { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { Col } from '../../../components/grid'
import { SectionTitle, BodyPrimary } from '../../../components/Typography'
import Image from '../../../components/Common/Image'
import VideoSection from '../../../components/Common/VideoSection'

const StyledColumnImage = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[3]};

  ${breakpoint('smallTablet')`
    padding-bottom: 0;
  `}
`

const renderImage = data => data && <Image image={data} />

/* The reason for this is to solve inconsistent CSS Styling Between gatsby develop and build.
This solution ensures that strong is always bold for any environment */
const StyledBodyPrimary = styled(BodyPrimary)`
  > strong {
    font-weight: bold;
  }
`

const renderText = (text, colorReverse, disallowed = []) =>
  text && (
    <ReactMarkdown
      disallowedTypes={disallowed}
      renderers={{
        // eslint-disable-next-line
        heading: props => <SectionTitle reverse={colorReverse} {...props} />,
        // eslint-disable-next-line
        paragraph: props => (
          <StyledBodyPrimary reverse={colorReverse} {...props} />
        )
      }}
      source={text}
    />
  )

const TextColumnsBlock = ({ data: { text }, colorReverse = false }) => (
  <Fragment>
    <Col width={[1, 1, 1, 1, 1 / 2]}>
      {renderText(text, colorReverse, ['paragraph'])}
    </Col>
    <Col width={[1, 1, 1, 1, 1 / 2]}>
      {renderText(text, colorReverse, ['heading'])}
    </Col>
  </Fragment>
)

const FullWidthBlock = ({ data: { text, image } }) => (
  <Col width={[1]}>
    {renderText(text)}
    {renderImage(image)}
  </Col>
)

const VideoBlock = ({ data: { text } }) => <VideoSection src={text} />

const ImagesBlock = ({ data }) => (
  <Fragment>
    {data.map((image, index) => (
      <StyledColumnImage
        width={[2 / 5, 2 / 5, 1 / 5, 1 / 5, 1 / 4, 1 / 4]}
        key={index}
      >
        {renderImage(image)}
      </StyledColumnImage>
    ))}
  </Fragment>
)

const TextAndImageBlock = ({ data: { text, image }, colorReverse = false }) => (
  <Fragment>
    <Col width={[1, 1, 1, 1, 1 / 2]}>{renderText(text, colorReverse)}</Col>
    <Col width={[1, 1, 1, 1, 1 / 2]}>{renderImage(image)}</Col>
  </Fragment>
)

const TextAndResizedImageBlock = ({ data: { text, image } }) => (
  <Fragment>
    <Col width={[1, 1, 1, 1, 4 / 8]}>{renderText(text)}</Col>
    <Col width={[0, 0, 0, 0, 1 / 8]} />
    <Col width={[1, 1, 1, 1, 3 / 8]}>{renderImage(image)}</Col>
  </Fragment>
)

export {
  renderImage,
  renderText,
  TextColumnsBlock,
  FullWidthBlock,
  VideoBlock,
  ImagesBlock,
  TextAndImageBlock,
  TextAndResizedImageBlock
}