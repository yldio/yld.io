import React from 'react'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import { Row, Col, Grid } from '../grid'
import { SectionTitle } from '../Typography'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import BlueBackground from '../BlueBG'
import styled from 'styled-components'
import CompactVideoLink from '../Common/CompactVideoLink'
import theme from '../../utils/theme'

const Video = styled.iframe`
  width: ${remcalc(854)};
  height: ${remcalc(480)};
  margin: auto;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 90px rgba(255, 255, 255, 0.2),
    0px 0px 20px rgba(255, 255, 255, 0.07);
`

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
              <Row>
                <Col width={[1]}>
                  <Flex justifyCenter alignCenter>
                    <Video
                      align="middle"
                      src={featured.link}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Flex>
                </Col>
              </Row>
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
