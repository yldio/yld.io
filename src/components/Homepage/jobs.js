import React from 'react'
import { Row, Col, Grid } from '../grid'
import { Padding } from 'styled-components-spacing'

import StyledLink from '../Common/StyledLink'
import OpenPositions from '../Common/OpenPositions'

const Jobs = () => (
  <Grid pb={3}>
    <OpenPositions
      data={{
        title: 'Join our team'
      }}
    />
    <Row>
      <Col width={[1]}>
        <Padding top={{ smallPhone: 3, smallTablet: 4, desktop: 3.5 }}>
          <StyledLink to="/join-us" title="View all openings">
            View all openings
          </StyledLink>
        </Padding>
      </Col>
    </Row>
  </Grid>
)

export default Jobs
