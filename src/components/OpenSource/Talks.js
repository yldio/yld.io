import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import BlueBackground from '../Common/BlueBackground'
import StandaloneVideoLink from '../Common/StandaloneVideoLink'
import StyledLink from '../Common/StyledLink'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'

const MAX_VIDEOS = 3

const StyledImage = styled.img`
  padding-bottom: ${remcalc(14)};
`

const StyledGrid = styled(Grid)`
  padding-top: ${remcalc(36)};
  padding-bottom: ${remcalc(54)};

  ${breakpoint('smallTablet')`
    padding-top: ${remcalc(72)};
    padding-bottom: ${remcalc(108)};
  `}
`

const StyledTalksRow = styled(Row)`
  padding: ${remcalc(28)} 0 ${remcalc(36)};
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
