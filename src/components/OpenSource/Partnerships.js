import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import BlueBackground from '../Common/BlueBackground'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'
import Image from '../Common/Image'
import SubtitleWithBody from '../Common/SubtitleWithBody'

const StyledGrid = styled(Grid)`
  padding-top: ${props => props.theme.space[4]};
  padding-bottom: ${props => props.theme.space[5]};

  ${breakpoint('smallTablet')`
    padding-top: ${props => props.theme.space[6]};
    padding-bottom: ${props => props.theme.space[7]};
  `}
`

const StyledRow = styled(Row)`
  padding-bottom: ${props => props.theme.space[6]};
`

const StyledSubtitleWithBodyContainer = styled.div`
  padding-top: ${props => props.theme.spacing[1]};
`

const PartnerCol = ({ name, logoDarkTheme, membershipLevel, description }) => (
  <Col key={name} width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 3]}>
    <Image image={logoDarkTheme} alt={`Image of ${logoDarkTheme.title}`} />
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
