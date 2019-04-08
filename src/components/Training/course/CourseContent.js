import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Padding } from 'styled-components-spacing'

import { Col } from '../../../components/grid'
import {
  ItemSubtitle,
  ItemBody
} from '../../../components/Common/SubtitleWithBody'
import CustomisedBulletpoint from '../../../components/Common/CustomisedBulletpoint'

const CourseContent = ({ content }) => (
  <Col width={[1, 1, 1, 1, 1, 5 / 6]} px={0}>
    <Padding top={4}>
      {/* eslint-disable react/display-name */}
      <ReactMarkdown
        renderers={{
          paragraph: props => (
            <Padding bottom={1}>
              <ItemBody {...props} />
            </Padding>
          ),
          heading: props => <ItemSubtitle {...props} />,
          list: props => (
            <Padding top={1} bottom={30}>
              <ul {...props} />
            </Padding>
          ),
          listItem: props => (
            <CustomisedBulletpoint maxWidth="auto" {...props} />
          )
        }}
        source={content}
      />
      {/* eslint-enable react/display-name */}
    </Padding>
  </Col>
)

export default CourseContent
