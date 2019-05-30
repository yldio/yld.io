import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'

import BlueBackground from '../Common/BlueBackground'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'
import Image from '../Common/Image'
import SubtitleWithBody from '../Common/SubtitleWithBody'

const StyledSectionTitle = styled(Col)`
  padding: ${remcalc(83)} 0;
`

const StyledPartnersRow = styled(Row)`
  padding-bottom: ${remcalc(60)};
`

const StyledImage = styled(Image)`
  max-height: 100%;
  max-width: 60%;
`

const StyledImageContainer = styled.div`
  height: ${remcalc(108)};
`

const PartnerCol = ({ name, logoDarkTheme, membershipLevel, description }) => (
  <Col key={name} width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 3]}>
    <StyledImageContainer>
      <StyledImage
        image={logoDarkTheme}
        alt={`Image of ${logoDarkTheme.title}`}
      />
    </StyledImageContainer>
    <SubtitleWithBody
      subtitle={membershipLevel}
      body={description}
      themeVariation="dark"
    />
  </Col>
)

const PartnershipsSection = ({ title, partners }) => (
  <BlueBackground>
    <Grid>
      <Row>
        <StyledSectionTitle width={[1 / 2]}>
          <SectionTitle reverse>{title}</SectionTitle>
        </StyledSectionTitle>
      </Row>
      <StyledPartnersRow>
        {partners.map(partner => PartnerCol(partner))}
      </StyledPartnersRow>
    </Grid>
  </BlueBackground>
)

export default PartnershipsSection
