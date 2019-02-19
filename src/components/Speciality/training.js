import React from 'react'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import { Padding } from 'styled-components-spacing'
import GreyBackground from '../GreyBG'
import StyledLink from '../Common/StyledLink'

const TrainingStage = ({ title, body, icon }) => (
  <Col width={[1, 1, 1, 1, 4 / 12]}>
    <Padding top={4} bottom={4}>
      <Padding bottom={1.5}>
        <img src={`https://${icon.file.url}`} alt={icon.title} />
      </Padding>
      <Subtitle>{title}</Subtitle>
      <BodyPrimary>{body.content[0].content[0].value}</BodyPrimary>
    </Padding>
  </Col>
)

const TrainingSection = ({ speciality }) => (
  <GreyBackground>
    <Padding top={4} bottom={6}>
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <SectionTitle
              small
            >{`${speciality.title.trim()} training`}</SectionTitle>
            <BodyPrimary>
              {speciality.trainingIntroText.content[0].content[0].value}
            </BodyPrimary>
          </Col>
        </Row>
        <Row>
          <TrainingStage
            title={speciality.trainingTextTitle1}
            body={speciality.trainingTextBody1}
            icon={speciality.trainingTextIcon1}
          />
          <TrainingStage
            title={speciality.trainingTextTitle2}
            body={speciality.trainingTextBody2}
            icon={speciality.trainingTextIcon2}
          />
          <TrainingStage
            title={speciality.trainingTextTitle3}
            body={speciality.trainingTextBody3}
            icon={speciality.trainingTextIcon3}
          />
        </Row>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <StyledLink to="/contact">{`Request ${
              speciality.title
            } training`}</StyledLink>
          </Col>
        </Row>
      </Grid>
    </Padding>
  </GreyBackground>
)

export default TrainingSection
