import React from 'react'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, CardTitle, Subtitle, BodyPrimary } from '../Typography'
import { Padding } from 'styled-components-spacing'
import BlueBackground from '../Common/BlueBG'
import Flex from 'styled-flex-component'

const IntroBorder = styled(Col)`
  border: 1px solid rgba(255, 255, 255, 0.3);
`
const IntroRectangle = ({ introTextTitle, introTextBody }) => (
  <IntroBorder width={[1, 1, 1, 1, 4 / 12]}>
    <Padding top={2} bottom={2}>
      <Subtitle reverse noPadding>
        {introTextTitle}
      </Subtitle>
      <BodyPrimary muted reverse>
        {introTextBody.content[0].content[0].value}
      </BodyPrimary>
    </Padding>
  </IntroBorder>
)

const IntroSection = ({ speciality }) => (
  <BlueBackground>
    <Padding top={2} bottom={5}>
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <Flex full column justifyCenter>
              <SectionTitle reverse>{speciality.title}</SectionTitle>
              <BodyPrimary reverse muted>
                {speciality.seoText.content[0].content[0].value}
              </BodyPrimary>
            </Flex>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <img
              alt={speciality.introGraphic.title}
              src={speciality.introGraphic.file.url}
              style={{ maxHeight: '100%' }}
            />
          </Col>
        </Row>
        <Row>
          <Col width={[1]}>
            <Padding top={2} bottom={2}>
              <CardTitle reverse noPadding>
                {speciality.introTitle}
              </CardTitle>
            </Padding>
          </Col>
        </Row>

        <Col width={[1]}>
          <Row>
            <IntroRectangle
              introTextTitle={speciality.introTextTitle1}
              introTextBody={speciality.introTextBody1}
            />
            <IntroRectangle
              introTextTitle={speciality.introTextTitle2}
              introTextBody={speciality.introTextBody2}
            />
            <IntroRectangle
              introTextTitle={speciality.introTextTitle3}
              introTextBody={speciality.introTextBody3}
            />
          </Row>
        </Col>
      </Grid>
    </Padding>
  </BlueBackground>
)
export default IntroSection
