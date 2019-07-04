import React, { Fragment } from 'react'
import styled from 'styled-components'

import { Row, Col, Grid } from '../grid'
import StyledLink from '../Common/StyledLink'
import OpenPositions from '../Common/OpenPositions'

const StyledGrid = styled(Grid)`
  padding-bottom: ${({ theme }) => theme.space[5]};
`

const Jobs = () => (
  <Fragment>
    <OpenPositions
      data={{
        title: 'Join our team'
      }}
    />
    <StyledGrid>
      <Row>
        <Col width={[1]}>
          <StyledLink to="/join-us" title="View all openings">
            View all openings
          </StyledLink>
        </Col>
      </Row>
    </StyledGrid>
  </Fragment>
)

export default Jobs
