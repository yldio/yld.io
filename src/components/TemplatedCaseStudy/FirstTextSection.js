import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { BodyPrimary } from '../Typography';
import { Row, Col } from '../grid';

const RowLayout = styled(Row)`
  ${breakpoint('smallTablet')`
    justify-content: flex-end;
  `}
`;

const FirstTextSection = ({ text }) => (
  <RowLayout>
    <Col width={[1, 1, 1, 1, 9 / 12, 7 / 12]}>
      {text.map((text, i) => (
        <BodyPrimary key={i}>{text}</BodyPrimary>
      ))}
    </Col>
  </RowLayout>
);

export default FirstTextSection;
