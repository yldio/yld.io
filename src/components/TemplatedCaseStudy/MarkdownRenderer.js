import remcalc from 'remcalc';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { BodyPrimary, Subtitle } from '../Typography';

const UnorderedList = styled.ul`
  list-style-type: disc;
  padding-left: ${remcalc(30)};
  padding-bottom: ${remcalc(36)};
`;

const OrderedList = styled.ol`
  list-style-type: decimal;
  padding-left: ${remcalc(30)};
  padding-top: ${remcalc(36)};
`;

const ListItem = styled.li`
  padding: ${remcalc(8)} 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const A = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;

const Strong = styled.strong`
  font-weight: 700;
`;

const MarkdownRenderer = ({ source }) => (
  <ReactMarkdown
    components={{
      ...Object.fromEntries(
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
          heading,
          (props) => <Subtitle noPaddingBottom {...props} />,
        ]),
      ),

      p: (props) => <BodyPrimary {...props} />,
      ol: (props) => <OrderedList {...props} />,
      ul: (props) => <UnorderedList {...props} />,
      li: (props) => <ListItem {...props} />,
      a: (props) => <A {...props} />,
      strong: (props) => <Strong {...props} />,
    }}
  >
    {source}
  </ReactMarkdown>
);

export default MarkdownRenderer;
