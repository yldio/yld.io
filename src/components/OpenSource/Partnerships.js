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
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`

const StyledRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[6]};
`

const StyledSubtitleWithBodyContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing[1]};
`

const StyledImageContainer = styled.div`
  width: ${remcalc(200)};
  height: ${remcalc(90)};

  ${breakpoint('tablet')`
    width: ${remcalc(165)};
    height: ${remcalc(75)};
  `}

  ${breakpoint('desktop')`
    width: ${remcalc(239)};
    height: ${remcalc(108)};
  `}
`

const PartnerCol = ({ name, logoDarkTheme, membershipLevel, description }) => (
  <Col key={name} width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 3]}>
    <StyledImageContainer>
      <Image image={logoDarkTheme} alt={`Image of ${logoDarkTheme.title}`} />
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
