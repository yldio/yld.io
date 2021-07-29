import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BodyPrimary, Subtitle } from '../Typography';

const MarkdownRenderer = ({ source }) => (
  <ReactMarkdown
    components={{
      ...Object.fromEntries(
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
          heading,
          (props) => <Subtitle noPaddingBottom {...props} />,
        ]),
      ),
      // eslint-disable-next-line react/display-name
      p: (props) => <BodyPrimary {...props} />,
    }}
  >
    {source}
  </ReactMarkdown>
);

export default MarkdownRenderer;
