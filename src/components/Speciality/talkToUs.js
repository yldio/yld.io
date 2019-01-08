import React from 'react'
import { Row, Col, Grid } from '../grid'
import { SmallerH2, Paragraph } from '../Typography'
import { Padding } from 'styled-components-spacing'
import GreyBackground from '../GreyBG'
import StyledLink from '../styledLink'

const TalkToUsSection = ({ title, contactText }) => (
  <GreyBackground>
    <Grid>
      <Padding top={5} bottom={5}>
        <Row>
          <Col width={[1, 1, 1, 1, 4 / 12]}>
            <SmallerH2>{`Talk to us about ${title}`}</SmallerH2>
          </Col>
          <Col width={[0, 0, 0, 0, 2 / 12]} />
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <Padding top={1}>
              <Paragraph>{contactText}</Paragraph>
              <StyledLink to="/contact/">Get in touch</StyledLink>
            </Padding>
          </Col>
        </Row>
      </Padding>
      <Padding bottom={3} />
    </Grid>
  </GreyBackground>
)

export default TalkToUsSection
