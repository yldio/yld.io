import React from 'react'
import styled from 'styled-components'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { H1, H4, Paragraph } from '../components/Typography'
import { Padding } from 'styled-components-spacing'
import BlueBackground from '../components/BlueBG'
import Flex from 'styled-flex-component'
const IntroBorder = styled(Col)`
  border: 1px solid rgba(255, 255, 255, 0.3);
`
const IntroRectangle = ({ introTextTitle, introTextBody }) => (
  <IntroBorder md={4} sm={12} xs={12}>
    <Padding top={2} bottom={2}>
      <Paragraph bold reverse>
        {introTextTitle}
      </Paragraph>
      <Paragraph muted reverse>
        {introTextBody.content[0].content[0].value}
      </Paragraph>
    </Padding>
  </IntroBorder>
)

const IntroSection = ({ specialty }) => (
  <BlueBackground>
    <Padding top={2} bottom={5}>
      <Grid className="grid">
        <Row>
          <Col xs={12} sm={12} md={6}>
            <Flex full column justifyCenter>
              <H1 reverse>{specialty.title}</H1>
              <Paragraph reverse muted>
                {specialty.seoText.content[0].content[0].value}
              </Paragraph>
            </Flex>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <img
              alt={specialty.introGraphic.title}
              src={specialty.introGraphic.file.url}
              style={{ maxHeight: '100%' }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <Padding top={2} bottom={2}>
              <H4 reverse>{specialty.introTitle}</H4>
            </Padding>
          </Col>
          <IntroRectangle
            introTextTitle={specialty.introTextTitle1}
            introTextBody={specialty.introTextBody1}
          />
          <IntroRectangle
            introTextTitle={specialty.introTextTitle2}
            introTextBody={specialty.introTextBody2}
          />
          <IntroRectangle
            introTextTitle={specialty.introTextTitle3}
            introTextBody={specialty.introTextBody3}
          />
        </Row>
      </Grid>
    </Padding>
  </BlueBackground>
)
export default IntroSection
