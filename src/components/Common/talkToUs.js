import React from 'react'
import { Row, Col, Grid } from '../grid'
import { SectionTitleH2, BodyPrimary } from '../Typography'
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
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <SectionTitleH2 noTop>{`Talk to us about ${title}`}</SectionTitleH2>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <Padding top={1}>
              <BodyPrimary>{contactText}</BodyPrimary>
              <StyledLink to="/contact/">Get in touch</StyledLink>
            </Padding>
          </Col>
        </Row>
      </Padding>
    </Grid>
  </GreyBackground>
)

export default TalkToUsSection
