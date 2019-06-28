import React, { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'

import { Col } from '../../../components/grid'
import { SectionTitle, BodyPrimary } from '../../../components/Typography'
import Image from '../../../components/Common/Image'
import VideoSection from '../../../components/Common/VideoSection'

const renderImage = data => data && <Image image={data} />

const renderText = (text, colorReverse, disallowed = []) =>
  text && (
    <ReactMarkdown
      disallowedTypes={disallowed}
      renderers={{
        // eslint-disable-next-line
        heading: props => <SectionTitle reverse={colorReverse} {...props} />,
        // eslint-disable-next-line
        paragraph: props => <BodyPrimary reverse={colorReverse} {...props} />
      }}
      source={text}
    />
  )

const TextColumnsBlock = ({ data: { text }, colorReverse = false }) => (
  <Fragment>
    <Col width={[1, 1, 1, 1 / 2]}>
      {renderText(text, colorReverse, ['paragraph'])}
    </Col>
    <Col width={[1, 1, 1, 1 / 2]}>
      {renderText(text, colorReverse, ['heading'])}
    </Col>
  </Fragment>
)

const TextAndImageBlock = ({ data: { text, image }, colorReverse = false }) => (
  <Fragment>
    <Col width={[1, 1, 1, 1 / 2]}>{renderText(text, colorReverse)}</Col>
    <Col width={[1, 1, 1, 1 / 2]}>{renderImage(image)}</Col>
  </Fragment>
)

const FullWidthBlock = ({ data: { text, image } }) => (
  <Col width={[1]}>
    {renderText(text)}
    {renderImage(image)}
  </Col>
)

const VideoBlock = ({ data: { text } }) => <VideoSection src={text} />

const ImagesBlock = ({ data }) => {
  const l = data.length
  const colWidth = [1, 1, 2 / l, 2 / l, 1 / l]

  return (
    <Fragment>
      {data.map(imageUrl => (
        <Col width={colWidth} key={imageUrl}>
          {renderImage(imageUrl)}
        </Col>
      ))}
    </Fragment>
  )
}

export {
  TextColumnsBlock,
  TextAndImageBlock,
  FullWidthBlock,
  VideoBlock,
  ImagesBlock
}
