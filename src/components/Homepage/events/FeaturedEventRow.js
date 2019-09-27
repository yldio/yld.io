import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Row, Col } from '../../grid'
import Image from '../../Common/Image'

import StyledLink from '../../Common/StyledLink'
import { SectionTitle, BodyPrimary, DisplayTitle } from '../../Typography'

const BackgroundColorCol = styled(Col)`
  background-color: ${({ bgColor }) => `#${bgColor}`};
`

const InfoInner = styled.section`
  background-color: #${props => props.color};
  width: 100%;
`

const EventWrapper = styled.header`
  padding: ${remcalc(18)} ${remcalc(24)} 0;

  ${breakpoint('tablet')`
    padding: ${remcalc(24)} 0 0;
  `}

  ${breakpoint('desktop')`
    padding: ${remcalc(30)} 0;
  `};
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

const StyledImage = styled(Image)`
  /* to remove extra space below SVG */
  display: block;
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

/**
 * `nowrap` here forces the DesktopImageContainer
 * to fill the remaining space of the row.
 */
const InnerRow = styled(Row)`
  ${breakpoint('tablet')`
    flex-wrap: nowrap;
  `}
`

const DesktopImageContainer = styled.div`
  flex: 1;
  display: flex;

  ${breakpoint('smallPhone', 'smallTablet')`
    display: none;
  `}
`

const DesktopImageWrapper = styled.div`
  position: relative;
  width: 100%;

  > img {
    position: absolute;
    right: 0;
    height: 100%;
    width: auto;
  }
`

const MobileImageContainer = styled.div`
  width: 100%;

  ${breakpoint('smallTablet')`
    display: none;
  `}

  img > {
    width: 100%;
  }
`

/**
 *
 * The Grid layout in this component is nested to make sure that
 * the entire Row has the chosen background color. Because of
 * padding, it's not possible to set background color on both
 * columns without there being a white space between them.
 *
 * The only drawback from this method is that on desktop the
 * background color spills over into the Row because of the
 * negative left/right margin on Row.
 *
 *  IntroRow
 *  EventRow
 *    BackgroundColorCol <---- set to 100% and background color set on here
 *      InnerRow <--- main content Row
 *        Col <--- event info column
 *        DesktopImageContainer <--- fills remaining space from Col
 *        MobileImageContainer <--- is 100% width under sibling Col on mobile
 *
 */
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
      <BackgroundColorCol width={[1]} bgColor={event.color}>
        <InnerRow block={false}>
          <Col width={[1, 1, 1, 1, 7 / 12, 5 / 12]} block={false}>
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
          <DesktopImageContainer>
            <DesktopImageWrapper>
              <StyledImage image={event.desktopPosterImage} />
            </DesktopImageWrapper>
          </DesktopImageContainer>
          <MobileImageContainer>
            <StyledImage image={event.mobilePosterImage} />
          </MobileImageContainer>
        </InnerRow>
      </BackgroundColorCol>
    </EventRow>
  </>
)

export default FeaturedEvent
