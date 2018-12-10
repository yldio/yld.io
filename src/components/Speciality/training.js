import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { SmallerH2, H5, Paragraph } from '../Typography'
import { Padding } from 'styled-components-spacing'
import GrayBackground from '../GrayBG'
import StyledLink from '../styledLink'

const TrainingStage = ({ title, body, icon }) => (
  <Col md={4} sm={12} xs={12}>
    <Padding top={4} bottom={4}>
      <Padding bottom={1.5}>
        <img src={`https://${icon.file.url}`} alt={icon.title} />
      </Padding>
      <H5 bold>{title}</H5>
      <Paragraph>{body.content[0].content[0].value}</Paragraph>
    </Padding>
  </Col>
)

const TrainingSection = ({ specialty }) => (
  <GrayBackground noTop>
    <Padding top={4} bottom={6}>
      <Grid className="grid">
        <Row>
          <Col md={6} sm={12} xs={12}>
            <SmallerH2>{`${specialty.title.trim()} training`}</SmallerH2>
            <Paragraph>
              {specialty.trainingIntroText.content[0].content[0].value}
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <TrainingStage
            title={specialty.trainingTextTitle1}
            body={specialty.trainingTextBody1}
            icon={specialty.trainingTextIcon1}
          />
          <TrainingStage
            title={specialty.trainingTextTitle2}
            body={specialty.trainingTextBody2}
            icon={specialty.trainingTextIcon2}
          />
          <TrainingStage
            title={specialty.trainingTextTitle3}
            body={specialty.trainingTextBody3}
            icon={specialty.trainingTextIcon3}
          />
        </Row>
        <Row>
          <Col md={6} sm={12} xs={12}>
            <StyledLink>{`Request ${specialty.title} training`}</StyledLink>
          </Col>
        </Row>
      </Grid>
    </Padding>
  </GrayBackground>
)

export default TrainingSection
