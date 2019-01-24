import React from 'react'
import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import { H2, Paragraph } from '../Typography'
import { Padding } from 'styled-components-spacing'
import GreyBackground from '../GreyBackgroundWithoutOffset'
import StyledLink from '../styledLink'

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
            <H2 small noTop>
              {title}
            </H2>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>
            <Paragraph>{contactText}</Paragraph>
            <StyledLink to="/contact/">Get in touch</StyledLink>
          </Col>
        </RowLayout>
      </Padding>
    </Grid>
  </GreyBackground>
)

export default GetInTouch
