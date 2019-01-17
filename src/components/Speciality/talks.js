import React from 'react'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import { Row, Col, Grid } from '../grid'
import breakpoint from 'styled-components-breakpoint'
import { SmallerH2, Paragraph } from '../Typography'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import BlueBackground from '../BlueBG'
import styled from 'styled-components'

const Video = styled.iframe`
  width: ${remcalc(854)};
  height: ${remcalc(480)};
  margin: auto;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 90px rgba(255, 255, 255, 0.2),
    0px 0px 20px rgba(255, 255, 255, 0.07);
`
const PlayIcon = styled.img`
  min-height: ${remcalc(24)};
  max-width: ${remcalc(24)};
  margin-right: ${remcalc(10)};
`

const TalkLink = styled.a`
  display: flex;
  align-items: start;
`

const TalkLinkCol = styled(Col)`
  :not(:first-of-type) {
    margin-top: 10px;
  }

  ${breakpoint('tablet')`
    :not(:first-of-type) {
      margin-top: 0px;
    }
  `}
`
const TalksSection = ({ speciality }) => {
  const talks = speciality.externalResources.filter(
    ({ type, additionalInfo }) =>
      type.toLowerCase() === 'talk' && !additionalInfo
  )
  const featured = speciality.externalResources.filter(
    ({ type, additionalInfo }) =>
      type === 'Talk' && (additionalInfo || '').toLowerCase() === 'featured'
  )[0]
  const cta = speciality.externalResources.filter(
    ({ type, additionalInfo }) =>
      type.toLowerCase() === 'talk' &&
      (additionalInfo || '').toLowerCase() === 'cta'
  )[0]
  return talks.length ? (
    <BlueBackground>
      <Grid>
        <Padding top={4} bottom={5}>
          <Row>
            <Col width={[1]}>
              <SmallerH2 reverse>{`Talks`}</SmallerH2>
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
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    />
                  </Flex>
                </Col>
              </Row>
            </Padding>
          )}
          <Padding top={4} bottom={4}>
            <Row>
              {talks.map(({ title, link, additionalInfo, id }) => (
                <TalkLinkCol width={[1, 1, 1, 1, 4 / 12]} key={id}>
                  <TalkLink href={link}>
                    <PlayIcon
                      src={`https://${speciality.videoIcon.file.url}`}
                      alt={speciality.videoIcon.title}
                    />
                    <Paragraph reverse muted noMargin>
                      {title}
                    </Paragraph>
                  </TalkLink>
                </TalkLinkCol>
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
