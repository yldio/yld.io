import React from 'react';
import styled from 'styled-components';
import { Margin } from 'styled-components-spacing';
import { storiesOf, addDecorator } from '@storybook/react';
import Theme from './theme';
import { Grid, Row, Col } from '../src/components/grid';

addDecorator(Theme);

const Container = styled(Margin)`
  width: 100%;
`;

const Block = styled.div`
  width: 100%;
  height: 300px;
  margin: 20px 0;
  background: #d8fff7;
  border: 1px solid #31ffde;
`;

storiesOf('Grid', module).add('Rows and Colums (some combinations)', () => {
  return (
    <Container vertical={2}>
      <Grid>
        <Row>
          <Col width={[1]}>
            <Block />
          </Col>
        </Row>
        <Row>
          <Col width={[1, 1, 1, 1, 0.5]}>
            <Block />
          </Col>
          <Col width={[1, 1, 1, 1, 0.5]}>
            <Block />
          </Col>
        </Row>
        <Row>
          <Col width={[1, 1, 1, 1, 8 / 12]}>
            <Block />
          </Col>
          <Col width={[1, 1, 1, 1, 4 / 12]}>
            <Block />
          </Col>
        </Row>
        <Row spaced>
          <Col width={[1, 1, 1, 1, 4 / 12]}>
            <Block />
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <Block />
          </Col>
        </Row>
        <Row>
          <Col width={[1, 1, 1, 1, 4 / 12]}>
            <Block />
          </Col>
          <Col width={[1, 1, 1, 1, 4 / 12]}>
            <Block />
          </Col>
          <Col width={[1, 1, 1, 1, 4 / 12]}>
            <Block />
          </Col>
        </Row>
        <Row>
          <Col width={[1, 1, 1, 1, 3 / 12]}>
            <Block />
          </Col>
          <Col width={[1, 1, 1, 1, 3 / 12]}>
            <Block />
          </Col>
          <Col width={[1, 1, 1, 1, 3 / 12]}>
            <Block />
          </Col>
          <Col width={[1, 1, 1, 1, 3 / 12]}>
            <Block />
          </Col>
        </Row>
      </Grid>
    </Container>
  );
});
