import React from 'react'
import { Padding } from 'styled-components-spacing'

import BlueBackground from '../Common/BlueBackground'
import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'
import VideoSection from '../Common/VideoSection'
import CompactVideoLink from '../Common/CompactVideoLink'
import StyledLink from '../Common/StyledLink'
import theme from '../../utils/theme'

const TalksSection = ({ talks: allTalks, videoIcon }) => {
  const talks = allTalks.filter(({ type, featured, cta }) => !featured && !cta)
  const featured = allTalks.find(({ type, featured }) => featured)
  const cta = allTalks.find(({ type, cta }) => cta)
  return talks.length ? (
    <BlueBackground>
      <Grid>
        <Padding top={4} bottom={5}>
          <Row>
            <Col width={[1]}>
              <SectionTitle reverse>{`Talks`}</SectionTitle>
            </Col>
          </Row>
          {featured && (
            <Padding top={3}>
              <VideoSection videoLink={featured.link} />
            </Padding>
          )}
          <Padding top={4} bottom={4}>
            <Row>
              {talks.map(({ title, link, id }) => (
                <CompactVideoLink
                  href={link}
                  key={id}
                  themeVariation={theme.variations.dark}
                >
                  {title}
                </CompactVideoLink>
              ))}
            </Row>
          </Padding>
          {cta && (
            <Row>
              <Col width={[1]}>
                <StyledLink reverse href={cta.link}>
                  {cta.title}
                </StyledLink>
              </Col>
            </Row>
          )}
        </Padding>
      </Grid>
    </BlueBackground>
  ) : null
}

export default TalksSection
