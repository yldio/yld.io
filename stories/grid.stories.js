import React from 'react'
import styled from 'styled-components'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import { Grid, Row, Col } from '../src/components/grid'

addDecorator(Theme)

const Block = styled.div`
  width: 100%;
  height: 200px;
  background: #d8fff7;
  border-right: 1px solid #31ffde;
  border-left: 1px solid #31ffde;
`

storiesOf('Grid', module).add(
  'list in form of a string (Contentful data)',
  () => {
    return (
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 0.5]}>
            <Block />
          </Col>
          <Col width={[1, 1, 1, 0.5]}>
            <Block />
          </Col>
        </Row>
      </Grid>
    )
  }
)
