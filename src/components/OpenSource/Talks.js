import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import BlueBackground from '../Common/BlueBackground'
import StandaloneVideoLink from '../Common/StandaloneVideoLink'
import StyledLink from '../Common/StyledLink'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'

const MAX_VIDEOS = 3

const StyledGrid = styled(Grid)`
  padding-top: ${props => props.theme.spacing[2]};
  padding-bottom: ${props => props.theme.space[5]};

  ${breakpoint('smallTablet')`
    padding-top: ${props => props.theme.space[6]};
    padding-bottom: ${props => props.theme.space[7]};
  `}
`

const StyledImage = styled.img`
  padding-bottom: ${props => props.theme.spacing[2]};
`

const StyledTalksRow = styled(Row)`
  padding-top: ${props => props.theme.spacing[3]};
  padding-bottom: ${props => props.theme.spacing[3]};
`

const TalksSection = ({ icon, title, talks, ctaText, ctaLink }) => (
  <BlueBackground>
    <StyledGrid>
      <StyledImage src={icon.file.url} alt={icon.title} />
      <Row>
        <Col width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 2]}>
          <SectionTitle reverse>{title}</SectionTitle>
        </Col>
      </Row>
      <StyledTalksRow>
        {talks.slice(0, MAX_VIDEOS).map(({ title, link }, idx) => (
          <StandaloneVideoLink href={link} key={idx} themeVariation="dark">
            {title}
          </StandaloneVideoLink>
        ))}{' '}
      </StyledTalksRow>
      <StyledLink reverse external aria-label={ctaText} href={ctaLink}>
        {ctaText}
      </StyledLink>
    </StyledGrid>
  </BlueBackground>
)

export default TalksSection
