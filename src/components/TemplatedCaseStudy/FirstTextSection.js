import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Row, Col } from '../grid';

import MarkdownRenderer from './MarkdownRenderer';
const RowLayout = styled(Row)`
  ${breakpoint('smallTablet')`
    justify-content: flex-end;
  `}
`;

const FirstTextSection = ({ source }) => (
  <RowLayout>
    <Col width={[1, 1, 1, 1, 9 / 12, 7 / 12]}>
      <MarkdownRenderer source={source} />
    </Col>
  </RowLayout>
);

export default FirstTextSection;
