import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import BlueBackground from '../Common/BlueBackground'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'
import Image from '../Common/Image'
import SubtitleWithBody from '../Common/SubtitleWithBody'

const StyledGrid = styled(Grid)`
  padding-top: ${remcalc(36)};
  padding-bottom: ${remcalc(54)};

  ${breakpoint('smallTablet')`
    padding-top: ${remcalc(72)};
    padding-bottom: ${remcalc(108)};
  `}
`

const StyledRow = styled(Row)`
  padding-bottom: ${remcalc(72)};
`

const StyledSubtitleWithBodyContainer = styled.div`
  padding-top: ${remcalc(12)};
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
    <StyledSubtitleWithBodyContainer>
      <SubtitleWithBody
        subtitle={membershipLevel}
        body={description}
        themeVariation="dark"
      />
    </StyledSubtitleWithBodyContainer>
  </Col>
)

const PartnershipsSection = ({ title, partners }) => (
  <BlueBackground>
    <StyledGrid>
      <StyledRow>
        <Col width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 2]}>
          <SectionTitle reverse>{title}</SectionTitle>
        </Col>
      </StyledRow>
      <Row>{partners.map(partner => PartnerCol(partner))}</Row>
    </StyledGrid>
  </BlueBackground>
)

export default PartnershipsSection
