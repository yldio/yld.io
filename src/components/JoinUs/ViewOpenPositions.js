import React from 'react'
import { Padding } from 'styled-components-spacing'
import { Grid, Row, Col } from '../grid'
import StyledLink from '../styledLink'
import { SectionTitle } from '../Typography'

const ViewPositions = ({ text }) => (
  <Grid>
    <Padding
      top={{ smallPhone: 4, smallTablet: 3, tablet: 4 }}
      bottom={{ smallPhone: 3.5, desktop: 5 }}
    >
      <Row>
        <Col width={[1, 1, 1, 1, 9 / 12]}>
          <Padding bottom={{ smallPhone: 2, tablet: 3 }}>
            <SectionTitle>{text}</SectionTitle>
          </Padding>
          <StyledLink href="#open-positions">All job opportunities</StyledLink>
        </Col>
      </Row>
    </Padding>
  </Grid>
)

export default ViewPositions
