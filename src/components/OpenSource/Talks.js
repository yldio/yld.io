import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'

import BlueBackground from '../Common/BlueBackground'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'

const StyledSectionTitle = styled(Col)`
  padding: ${remcalc(83)} 0;
`

const TalksSection = ({ title }) => (
  <BlueBackground>
    <Grid>
      <Row>
        <StyledSectionTitle width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 2]}>
          <SectionTitle reverse>{title}</SectionTitle>
        </StyledSectionTitle>
      </Row>
    </Grid>
  </BlueBackground>
)

export default TalksSection
