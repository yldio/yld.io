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
const TalksSection = ({ specialty }) => {
  const talks = specialty.externalResources.filter(
    ({ type, additionalInfo }) => type === 'Talk' && !additionalInfo
  )
  const featured = specialty.externalResources.filter(
    ({ type, additionalInfo }) =>
      type === 'Talk' && additionalInfo === 'Featured'
  )[0]
  const cta = specialty.externalResources.filter(
    ({ type, additionalInfo }) => type === 'Talk' && additionalInfo === 'CTA'
  )[0]
  return (
    <BlueBackground>
      <Grid>
        <Padding top={4} bottom={5}>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <SmallerH2 reverse>{`Talks`}</SmallerH2>
            </Col>
          </Row>
          <Padding top={3}>
            <Row>
              <Col md={12} sm={12} xs={12}>
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
          <Padding top={4} bottom={4}>
            <Row>
              {talks.map(({ title, link, additionalInfo, id }) => (
                <TalkLinkCol md={4} sm={4} xs={12} key={id}>
                  <TalkLink href={link}>
                    <PlayIcon
                      src={`https://${specialty.videoIcon.file.url}`}
                      alt={specialty.videoIcon.title}
                    />
                    <Paragraph reverse muted noMargin>
                      {title}
                    </Paragraph>
                  </TalkLink>
                </TalkLinkCol>
              ))}
            </Row>
          </Padding>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <StyledLink reverse href={cta.link}>
                {cta.title}
              </StyledLink>
            </Col>
          </Row>
        </Padding>
      </Grid>
    </BlueBackground>
  )
}

export default TalksSection
