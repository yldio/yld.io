import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Col } from '../../grid'
import Image from '../../Common/Image'
import StyledLink from '../../Common/StyledLink'
import { BodyPrimary, DisplayTitle } from '../../Typography'

const FeaturedEventWrapper = styled.section`
  background-color: #${props => props.color};
  ${breakpoint('smallTablet')`
    margin-top: ${remcalc(175)}
  `}
`

const EventWrapper = styled.header`
  padding: ${remcalc(18)} ${remcalc(24)} 0;

  ${breakpoint('tablet')`
    padding: ${remcalc(24)} ${remcalc(36)} 0;
  `} ${breakpoint('desktop')`
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

const FeaturedEvent = ({ event }) => (
  <Col width={[1, 1, 1, 1, 6 / 12, 7 / 12]}>
    <FeaturedEventWrapper key={event.id} color={event.color}>
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
      <StyledImage image={event.posterImage} />
    </FeaturedEventWrapper>
  </Col>
)

export default FeaturedEvent
