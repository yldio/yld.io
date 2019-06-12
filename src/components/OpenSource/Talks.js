import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import BlueBackground from '../Common/BlueBackground'
import VideoGrid from '../Common/VideoGrid'
import StyledLink from '../Common/StyledLink'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'

const StyledGrid = styled(Grid)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[5]};
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]}
  `}
`

const StyledImage = styled.img`
  padding-bottom: ${({ theme }) => theme.spacing[2]};
`

const StyledVideoGridWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing[3]};
  padding-bottom: ${({ theme }) => theme.spacing[3]};
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
      <StyledVideoGridWrapper>
        <VideoGrid data={talks} themeVariation="dark" />
      </StyledVideoGridWrapper>
      <StyledLink reverse external aria-label={ctaText} href={ctaLink}>
        {ctaText}
      </StyledLink>
    </StyledGrid>
  </BlueBackground>
)

export default TalksSection
