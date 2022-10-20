import React from 'react';

import { Row, Col } from '../grid';
import { BodyPrimary, DisplayTitle } from '../Typography';

const ThankYouMessage = ({ titleMessage, message }) => (
  <Row>
    <Col width={[1, 1, 1, 8 / 12, 7 / 12]}>
      <DisplayTitle>{titleMessage}</DisplayTitle>

      <BodyPrimary>{message}</BodyPrimary>
    </Col>
  </Row>
);

export default ThankYouMessage;
