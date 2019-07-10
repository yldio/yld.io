import React from 'react'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import GreyBackground from '../Common/GreyBackground'
import StyledLink from '../Common/StyledLink'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import Image from '../Common/Image'

const TrainingStageContainer = styled.div`
  padding-top: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[6]};
`

const StyledImageBorder = styled.div`
  padding-bottom: ${({ theme }) => theme.space[2]};
`

const TrainingSectionContainer = styled.div`
  ${breakpoint('desktop')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`

const TrainingStageSubtitle = styled(Subtitle)`
  padding-bottom: 0;
`

const TrainingStage = ({ title, body, iconTitle, icon }) => (
  <Col width={[1, 1, 1, 1, 4 / 12]}>
    <TrainingStageContainer>
      <StyledImageBorder>
        <Image
          alt={iconTitle}
          image={icon}
          style={{ height: '50px', width: 'auto' }}
        />
      </StyledImageBorder>
      <TrainingStageSubtitle>{title}</TrainingStageSubtitle>
      <BodyPrimary>{body}</BodyPrimary>
    </TrainingStageContainer>
  </Col>
)

const TrainingSection = ({ speciality }) => (
  <GreyBackground>
    <TrainingSectionContainer>
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
            icon={speciality.trainingTextIcon1}
          />
          <TrainingStage
            title={speciality.trainingTextTitle2}
            body={speciality.trainingTextBody2}
            iconTitle={speciality.trainingTextIcon2Title}
            icon={speciality.trainingTextIcon2}
          />
          <TrainingStage
            title={speciality.trainingTextTitle3}
            body={speciality.trainingTextBody3}
            iconTitle={speciality.trainingTextIcon3Title}
            icon={speciality.trainingTextIcon3}
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
    </TrainingSectionContainer>
  </GreyBackground>
)

export default TrainingSection
