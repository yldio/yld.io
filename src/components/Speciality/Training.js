import React from 'react'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import { Padding } from 'styled-components-spacing'
import GreyBackground from '../Common/GreyBackground'
import StyledLink from '../Common/StyledLink'

const TrainingStage = ({ title, body, iconTitle, iconUrl }) => (
  <Col width={[1, 1, 1, 1, 4 / 12]}>
    <Padding top={4} bottom={4}>
      <Padding bottom={1.5}>
        <img src={`https://${iconUrl}`} alt={iconTitle} />
      </Padding>
      <Subtitle>{title}</Subtitle>
      <BodyPrimary>{body}</BodyPrimary>
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
            <BodyPrimary>{speciality.trainingIntroText}</BodyPrimary>
          </Col>
        </Row>
        <Row>
          <TrainingStage
            title={speciality.trainingTextTitle1}
            body={speciality.trainingTextBody1}
            iconTitle={speciality.trainingTextIcon1Title}
            iconUrl={speciality.trainingTextIcon1Url}
          />
          <TrainingStage
            title={speciality.trainingTextTitle2}
            body={speciality.trainingTextBody2}
            iconTitle={speciality.trainingTextIcon2Title}
            iconUrl={speciality.trainingTextIcon2Url}
          />
          <TrainingStage
            title={speciality.trainingTextTitle3}
            body={speciality.trainingTextBody3}
            iconTitle={speciality.trainingTextIcon3Title}
            iconUrl={speciality.trainingTextIcon3Url}
          />
        </Row>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <StyledLink to="/contact" title={speciality.title}>{`Request ${
              speciality.title
            } training`}</StyledLink>
          </Col>
        </Row>
      </Grid>
    </Padding>
  </GreyBackground>
)

export default TrainingSection
