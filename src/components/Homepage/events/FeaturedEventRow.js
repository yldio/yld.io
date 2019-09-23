import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Row, Col } from '../../grid'
import Image from '../../Common/Image'

import StyledLink from '../../Common/StyledLink'
import { SectionTitle, BodyPrimary, DisplayTitle } from '../../Typography'

const InfoInner = styled.section`
  background-color: #${props => props.color};
  width: 100%;
`

const EventWrapper = styled.header`
  padding: ${remcalc(18)} ${remcalc(24)} 0;

  ${breakpoint('tablet')`
    padding: ${remcalc(24)} ${remcalc(36)} 0;
  `}

  ${breakpoint('desktop')`
    padding-top: ${remcalc(24)};
    padding-left: ${remcalc(36)};
  `};
`

const PaddedBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${props => props.theme.space[1]};
`

const FixedWidthBodyPrimary = styled(BodyPrimary)`
  max-width: ${remcalc(380)};
`

const StyledImage = styled(Image)`
  // to remove extra space below SVG
  display: block;
`

const StyledRatioContainer = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  ${({ sizing }) => {
    Object.keys(sizing).map(
      size => breakpoint(size)`
        padding-bottom: ${(sizing[size].height / sizing[size].width) * 100}%}
      `
    )
  }}
  overflow: hidden;

  > img {
    position: absolute;
  }
`
const StyledRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[4]};
  padding-top: ${({ theme }) => theme.space[4]};
`

const FeaturedEvent = ({ event }) => (
  <StyledRow>
    <Col>
      <SectionTitle>Events we run</SectionTitle>
      <BodyPrimary>
        We pride ourselves on offering informative, inclusive and fun
        get-togethers for our ever growing tech community.
      </BodyPrimary>
    </Col>
    <Col width={[1, 1, 1, 1, 7 / 12, 5 / 12]} block={false}>
      <InfoInner key={event.id} color={event.color}>
        <EventWrapper>
          <PaddedBodyPrimary muted reverse noPadding>
            Featured event
          </PaddedBodyPrimary>
          <DisplayTitle reverse noPaddingTop>
            {event.eventTitle}
          </DisplayTitle>
          <BodyPrimary reverse>{event.date}</BodyPrimary>
          <FixedWidthBodyPrimary muted reverse>
            {event.blurb.blurb}
          </FixedWidthBodyPrimary>
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
    <Col width={[1, 1, 1, 1, 5 / 12, 7 / 12]}>
      <StyledRatioContainer
        sizing={{ desktop: { width: 1, height: 1 } }}
        width={1}
        height={1}
      >
        <StyledImage image={event.posterImage} />
      </StyledRatioContainer>
    </Col>
  </StyledRow>
)

export default FeaturedEvent
