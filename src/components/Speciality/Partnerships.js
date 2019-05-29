import React from 'react'

import BlueBackground from '../Common/BlueBackground'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'

// will come from Contentful
const data = {
  title: 'Our Technology partnerships'
}

const PartnershipsSection = () => (
  <BlueBackground>
    <Grid>
      <Row>
        <Col width={[1]}>
          <SectionTitle reverse>{data.title}</SectionTitle>
        </Col>
      </Row>
    </Grid>
  </BlueBackground>
)

export default PartnershipsSection
