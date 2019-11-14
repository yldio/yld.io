import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BodyPrimary, Subtitle } from '../Typography';

const MarkdownRenderer = ({ source }) => (
  <ReactMarkdown
    renderers={{
      // eslint-disable-next-line
      heading: props => <Subtitle noPaddingBottom {...props} />,
      // eslint-disable-next-line react/display-name
      paragraph: props => <BodyPrimary {...props} />,
    }}
    source={source}
  />
);

export default MarkdownRenderer;
