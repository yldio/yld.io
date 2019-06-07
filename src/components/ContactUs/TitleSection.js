import React from 'react'
import { Padding } from 'styled-components-spacing'

import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'

const TitleSection = ({ title }) => (

  // TODO: make title accept an array so that we can pass in array of Rich tech box and give it a conditional of string vs array to send the array to do node<br>node to have new line for new sentende
  <Grid>
    <Padding
      top={{ smallPhone: 3, tablet: 4 }}
      bottom={{ smallPhone: 3, tablet: 4 }}
    >
      <Row>
        <Col width={[1, 1, 1, 8 / 12, 7 / 12]}>
          <SectionTitle as="h1">{title}</SectionTitle>
        </Col>
      </Row>
    </Padding>
  </Grid>
)

export default TitleSection
