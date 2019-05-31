import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'

import BlueBackground from '../Common/BlueBackground'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'

const StyledSectionTitle = styled(Col)`
  padding: ${remcalc(83)} 0;
`

const StyledTalksRow = styled(Row)`
  padding-bottom: ${remcalc(60)};
`

const TalkCol = ({
  title,
  type,
  link,
  cta,
  featured,
  additionalInfo,
  colorCode
}) => (
  <Col key={title} width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 3]}>
    {title}
    <br />
    <br />
    {link}
  </Col>
)

const TalksSection = ({ title, talks }) => (
  <BlueBackground>
    <Grid>
      <Row>
        <StyledSectionTitle width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 2]}>
          <SectionTitle reverse>{title}</SectionTitle>
        </StyledSectionTitle>
      </Row>
      <StyledTalksRow>
        {talks && talks.length && talks.map(talk => TalkCol(talk))}
      </StyledTalksRow>
    </Grid>
  </BlueBackground>
)

export default TalksSection
