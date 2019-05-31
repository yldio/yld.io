import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import BlueBackground from '../Common/BlueBackground'
import CompactVideoLink from '../Common/CompactVideoLink'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'

const StyledSectionTitle = styled(Col)`
  padding: ${remcalc(83)} 0 ${remcalc(41)};

  ${breakpoint('smallTablet')`
    padding-left: ${remcalc(21)};
  `}

  ${breakpoint('tablet')`
    padding-left: ${remcalc(24)};
  `}
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
  <CompactVideoLink
    key={title}
    href={link}
    themeVariation="dark"
    mode="standalone"
  >
    {title}
  </CompactVideoLink>
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
