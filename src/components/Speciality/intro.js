import React from 'react'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import { H1, H4, Paragraph } from '../Typography'
import { Padding } from 'styled-components-spacing'
import BlueBackground from '../BlueBG'
import Flex from 'styled-flex-component'

const IntroBorder = styled(Col)`
  border: 1px solid rgba(255, 255, 255, 0.3);
`
const IntroRectangle = ({ introTextTitle, introTextBody }) => (
  <IntroBorder width={[1, 1, 1, 1, 4 / 12]}>
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
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <Flex full column justifyCenter>
              <H1 style={{ fontSize: '42px' }} reverse>
                {specialty.title}
              </H1>
              <Paragraph reverse muted>
                {specialty.seoText.content[0].content[0].value}
              </Paragraph>
            </Flex>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <img
              alt={specialty.introGraphic.title}
              src={specialty.introGraphic.file.url}
              style={{ maxHeight: '100%' }}
            />
          </Col>
        </Row>
        <Row>
          <Col width={[1]}>
            <Padding top={2} bottom={2}>
              <H4 reverse>{specialty.introTitle}</H4>
            </Padding>
          </Col>
        </Row>

        <Col width={[1]}>
          <Row>
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
        </Col>
      </Grid>
    </Padding>
  </BlueBackground>
)
export default IntroSection
