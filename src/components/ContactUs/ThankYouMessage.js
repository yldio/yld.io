import React from 'react';

import { Row, Col } from '../grid';
import { BodyPrimary } from '../Typography';

const ThankYouMessage = ({ message }) => (
  <Row>
    <Col width={[1, 1, 1, 8 / 12, 7 / 12]}>
      <BodyPrimary>{message}</BodyPrimary>
    </Col>
  </Row>
);

export default ThankYouMessage;
