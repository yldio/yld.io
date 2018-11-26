import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { H1, Paragraph } from '../components/Typography'
import { Padding } from 'styled-components-spacing'
import BlueBackground from '../BlueBG'

const CommunitySection = ({ specialty }) => (
  <BlueBackground>
    <Grid className="grid">
      <Padding top={6} bottom={6}>
        <Row>
          <Col md={6} sm={12} xs={12}>
            <img
              alt={specialty.communityLogo.title}
              src={specialty.communityLogo.file.url}
              style={{ maxHeight: '100%' }}
            />
          </Col>
          <Col md={6} sm={12} xs={12}>
            <H1 reverse>{`${specialty.title} community`}</H1>
            <Paragraph reverse muted>
              {specialty.communityText.content[0].content[0].value}
            </Paragraph>
          </Col>
        </Row>
      </Padding>
    </Grid>
  </BlueBackground>
)
export default CommunitySection
