import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import BlueBackground from '../Common/BlueBackground'
import StandAloneVideoLink from '../Common/StandAloneVideoLink'
import StyledLink from '../Common/StyledLink'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'

const StyledImage = styled.img`
  padding: ${remcalc(83)} 0 ${remcalc(15)};
`

const StyledCol = styled(Col)`
  padding: 0 0 ${remcalc(35)};

  ${breakpoint('smallTablet')`
    padding-left: ${remcalc(21)};
  `}

  ${breakpoint('tablet')`
    padding-left: ${remcalc(24)};
  `}
`

const StyledTalksRow = styled(Row)`
  padding-bottom: ${remcalc(35)};
`

const StyledTalksLink = styled(StyledLink)`
  padding-bottom: ${remcalc(90)};
`

const TalkCol = ({ title, link }) => (
  <StandAloneVideoLink
    key={title}
    href={link}
    themeVariation="dark"
    mode="standalone"
  >
    {title}
  </StandAloneVideoLink>
)

const TalksSection = ({ icon, title, talks, ctaText, ctaLink }) => (
  <BlueBackground>
    <Grid>
      <StyledImage src={icon.file.url} alt={icon.title} />
      <Row>
        <StyledCol width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 2]}>
          <SectionTitle reverse>{title}</SectionTitle>
        </StyledCol>
      </Row>
      <StyledTalksRow>
        {talks && talks.length && talks.map(talk => TalkCol(talk))}
      </StyledTalksRow>
      <StyledTalksLink reverse external aria-label={ctaText} href={ctaLink}>
        {ctaText}
      </StyledTalksLink>
    </Grid>
  </BlueBackground>
)

export default TalksSection
