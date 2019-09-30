import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Grid, Row, Col } from '../../grid'
import Image from '../../Common/Image'

import StyledLink from '../../Common/StyledLink'
import { SectionTitle, BodyPrimary, DisplayTitle } from '../../Typography'

const BackgroundColorGrid = styled(Grid)`
  background-color: ${({ bgColor }) => `#${bgColor}`};
  padding: 0;
`

const InfoInner = styled.section`
  background-color: #${props => props.color};
  width: 100%;
`

const EventWrapper = styled.header`
  padding: ${remcalc(24)} ${remcalc(24)} ${remcalc(36)};

  ${breakpoint('smallTablet')`
    padding: ${remcalc(36)};
  `}

  ${breakpoint('tablet')`
    padding: ${remcalc(30)} ${remcalc(36)} ${remcalc(36)};
  `}
`

const SpacedSectionTitle = styled(SectionTitle)`
  margin-bottom: ${props => props.theme.space[2]};
`

const PaddedBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${props => props.theme.space[1]};

  ${breakpoint('desktop')`
    padding-bottom: ${props => props.theme.space[2]};
  `};
`

const StyledDisplayTitle = styled(DisplayTitle)`
  padding-bottom: ${props => props.theme.space[2]};
`

const IntroRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
      padding-top: ${({ theme }) => theme.space[6]};
  `}
`

const EventRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[5]};
  `}
`

const DesktopImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  > img {
    position: absolute;
    right: 0;
    height: 100%;
    width: auto;
  }

  ${breakpoint('smallPhone', 'smallTablet')`
    display: none;
  `}
`
const MobileImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  > img {
    display: block;
  }

  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const FeaturedEvent = ({ event }) => (
  <>
    <IntroRow>
      <Col width={[1, 1, 1, 1, 8 / 12, 7 / 12, 5 / 12]}>
        <SpacedSectionTitle>Events we run</SpacedSectionTitle>
        <BodyPrimary>
          We pride ourselves on offering informative, inclusive and fun
          get-togethers for our ever growing tech community.
        </BodyPrimary>
      </Col>
    </IntroRow>
    <EventRow>
      <Col width={[1]}>
        <BackgroundColorGrid bgColor={event.color}>
          <Row>
            <Col width={[1, 1, 1, 1, 1, 7 / 12, 5 / 12]}>
              <InfoInner color={event.color}>
                <EventWrapper>
                  <PaddedBodyPrimary muted reverse noPadding>
                    Featured event
                  </PaddedBodyPrimary>
                  <StyledDisplayTitle reverse noPaddingTop>
                    {event.eventTitle}
                  </StyledDisplayTitle>
                  <BodyPrimary reverse>{event.date}</BodyPrimary>
                  <BodyPrimary muted reverse>
                    {event.blurb.blurb}
                  </BodyPrimary>
                  <StyledLink
                    external
                    reverse
                    href={event.linkToEvent}
                    title={`${event.eventTitle} - ${event.ctaText}`}
                  >
                    {event.ctaText}
                  </StyledLink>
                </EventWrapper>
              </InfoInner>
            </Col>
            <Col width={[1, 1, 1, 1, 1, 5 / 12, 7 / 12]}>
              <DesktopImageWrapper>
                <Image image={event.desktopPosterImage} />
              </DesktopImageWrapper>
              <MobileImageWrapper>
                <Image image={event.mobilePosterImage} />
              </MobileImageWrapper>
            </Col>
          </Row>
        </BackgroundColorGrid>
      </Col>
    </EventRow>
  </>
)

export default FeaturedEvent
