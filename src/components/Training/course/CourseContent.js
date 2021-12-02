import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Padding } from 'styled-components-spacing';

import { Col } from '../../../components/grid';
import {
  ItemSubtitle,
  ItemBody,
} from '../../../components/Common/SubtitleWithBody';
import CustomisedBulletpoint from '../../../components/Common/CustomisedBulletpoint';

const CourseContent = ({ content }) => (
  <Col width={[1, 1, 1, 1, 1, 5 / 6]} px={0}>
    <Padding top={4}>
      {/* eslint-disable react/display-name */}
      <ReactMarkdown
        components={{
          li: (props) => <CustomisedBulletpoint maxWidth="auto" {...props} />,
          p: (props) => (
            <Padding bottom={1}>
              <ItemBody {...props} />
            </Padding>
          ),
          ...Object.fromEntries(
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
              heading,
              (props) => <ItemSubtitle {...props} />,
            ]),
          ),
          ...Object.fromEntries(
            ['ol', 'ul'].map((list) => [
              list,
              (props) => (
                <Padding top={1} bottom={30}>
                  <ul {...props} />
                </Padding>
              ),
            ]),
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      {/* eslint-enable react/display-name */}
    </Padding>
  </Col>
);

export default CourseContent;
