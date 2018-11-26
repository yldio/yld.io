import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { H1, Paragraph } from '../components/Typography'
import { Padding } from 'styled-components-spacing'
import GrayBackground from '../components/BlueBG'
import StyledLink from '../components/styledLink'

const TalkToUsSection = ({ title, contactText }) => (
  <GrayBackground noTop>
    <Grid className="grid">
      <Padding top={5} bottom={5}>
        <Row>
          <Col md={6} sm={12} xs={12}>
            <H1>{`Talk to us about ${title}`}</H1>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <Paragraph>{contactText}</Paragraph>
            <StyledLink to="/contact/">Get in touch</StyledLink>
          </Col>
        </Row>
      </Padding>
      <Padding bottom={3} />
    </Grid>
  </GrayBackground>
)

export default TalkToUsSection
