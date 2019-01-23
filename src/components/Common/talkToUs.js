import React from 'react'
import { Row, Col, Grid } from '../grid'
import { H2, Paragraph } from '../Typography'
import { Padding } from 'styled-components-spacing'
import GreyBackground from '../GreyBackgroundWithoutOffset'
import StyledLink from '../styledLink'

const TalkToUsSection = ({ title, contactText }) => (
  <GreyBackground>
    <Grid>
      <Padding
        top={{ smallPhone: 3.5, tablet: 5 }}
        bottom={{ smallPhone: 3.5, tablet: 5 }}
      >
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 4 / 12]}>
            <H2 small noTop>
              {title}
            </H2>
          </Col>
          <Col width={[0, 0, 0, 0, 0, 0, 2 / 12]} />
          <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 6 / 12]}>
            <Padding top={1}>
              <Paragraph>{contactText}</Paragraph>
              <StyledLink to="/contact/">Get in touch</StyledLink>
            </Padding>
          </Col>
        </Row>
      </Padding>
    </Grid>
  </GreyBackground>
)

export default TalkToUsSection
