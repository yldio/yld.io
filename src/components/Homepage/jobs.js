import React, { Fragment } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { Row, Col, Grid } from '../grid'
import StyledLink from '../Common/StyledLink'
import OpenPositions from '../Common/OpenPositions'

const StyledGrid = styled(Grid)`
  padding-bottom: ${({ theme }) => theme.space[7]};
  ${breakpoint('smallPhone', 'tablet')`
  padding-bottom: ${({ theme }) => theme.space[5]}
`}
`

const Jobs = () => (
  <Fragment>
    <OpenPositions
      data={{
        title: 'Join our team'
      }}
      limit={4}
    />
    <StyledGrid>
      <Row>
        <Col width={[1]}>
          <StyledLink
            to="/join-us"
            title="Learn more"
            data-event="learn-more-cta"
          >
            Learn more
          </StyledLink>
        </Col>
      </Row>
    </StyledGrid>
  </Fragment>
)

export default Jobs
