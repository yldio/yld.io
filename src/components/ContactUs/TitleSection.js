import React from 'react'
import { Padding } from 'styled-components-spacing'

import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'

const TitleSection = ({ title }) => {

  if (typeof (title) === 'string') {
    return (
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
  }

  const lines = title.content.map(item =>
    item.content[0].value
  )

  return (
    <Grid>
      <Padding
        top={{ smallPhone: 3, tablet: 4 }}
        bottom={{ smallPhone: 3, tablet: 4 }}
      >
        <Row>
          <Col width={[1, 1, 1, 8 / 12, 7 / 12]}>
            <SectionTitle as="h1">{lines[0]}<br />{lines[1]}</SectionTitle>
          </Col>
        </Row>
      </Padding>
    </Grid>
  )


}

// TODO: make title accept an array so that we can pass in array of Rich tech box and give it a conditional of string vs array to send the array to do node<br>node to have new line for new sentende


export default TitleSection
