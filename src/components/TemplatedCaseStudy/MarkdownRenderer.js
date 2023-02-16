import remcalc from 'remcalc';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { BodyPrimary, Subtitle } from '../Typography';

const UnorderedList = styled.ul`
  list-style-type: disc;
  padding-left: ${remcalc(30)};
  padding-bottom: ${remcalc(36)};
`;

const OrderedList = styled.ol`
  list-style-type: decimal;
  padding-left: ${remcalc(30)};
  padding-bottom: 0;
`;

const ListItem = styled.li`
  padding: ${remcalc(8)} 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:first-child:last-child {
    padding-top: ${remcalc(24)};
    padding-bottom: 0;
  }
`;

const H2 = styled(Subtitle).attrs({ as: 'h2' })`
  font-weight: 500;
  padding: ${remcalc(11)} 0 ${remcalc(7)};

  font-size: ${remcalc(21)};
  line-height: ${remcalc(26)};

  ${breakpoint('smallTablet')`
    font-size: ${remcalc(28)};
    line-height: ${remcalc(42)};
  `}
`;

const H3 = styled(Subtitle).attrs({ as: 'h3' })`
  font-weight: 400;
  padding: ${remcalc(12)} 0 ${remcalc(24)};

  font-size: ${remcalc(21)};
  line-height: ${remcalc(30)};

  ${breakpoint('smallTablet')`
    font-size: ${remcalc(24)};
    line-height: ${remcalc(36)};
  `}
`;

const Strong = styled(BodyPrimary).attrs({ as: 'strong' })`
  font-weight: 600;
`;

const A = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;

const MarkdownRenderer = ({ source }) => (
  <ReactMarkdown
    components={{
      h1: (props) => <H2 {...props} />,
      h2: (props) => <H3 {...props} />,
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
