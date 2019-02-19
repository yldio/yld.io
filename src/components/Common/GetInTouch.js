import React from 'react'
import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, BodyPrimary } from '../Typography'
import { Padding } from 'styled-components-spacing'
import GreyBackground from './GreyBackground'
import StyledLink from './StyledLink'

const RowLayout = styled(Row)`
  ${breakpoint('desktop')`
    justify-content: space-between;
  `}
`

const GetInTouch = ({ title, contactText }) => (
  <GreyBackground>
    <Grid>
      <Padding
        top={{ smallPhone: 3.5, tablet: 5 }}
        bottom={{ smallPhone: 3.5, tablet: 5 }}
      >
        <RowLayout>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <SectionTitle>{title}</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>
            <BodyPrimary>{contactText}</BodyPrimary>
            <StyledLink to="/contact/">Get in touch</StyledLink>
          </Col>
        </RowLayout>
      </Padding>
    </Grid>
  </GreyBackground>
)

export default GetInTouch
