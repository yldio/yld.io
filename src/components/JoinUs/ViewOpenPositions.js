import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import { Grid, Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'
import { SectionTitle, BodyPrimary } from '../Typography'

const FixedWidthBodyPrimary = styled(BodyPrimary)`
  max-width: ${remcalc(525)};
`
const ViewPositions = ({ text, description }) => (
  <Grid>
    <Padding
      top={{ smallPhone: 4, smallTablet: 3, tablet: 4 }}
      bottom={{ smallPhone: 3.5, desktop: 5 }}
    >
      <Row>
        <Col width={[1, 1, 1, 1, 8 / 12]}>
          <Padding bottom={{ smallPhone: 2, tablet: 3 }}>
            <SectionTitle>{text}</SectionTitle>
            {description && (
              <Padding top={1}>
                <FixedWidthBodyPrimary muted>
                  {description}
                </FixedWidthBodyPrimary>
              </Padding>
            )}
          </Padding>
          <StyledLink href="#open-positions">All job opportunities</StyledLink>
        </Col>
      </Row>
    </Padding>
  </Grid>
)

export default ViewPositions
