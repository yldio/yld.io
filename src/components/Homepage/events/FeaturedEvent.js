import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Col } from '../../grid'
import { BodyPrimary, CardTitle } from '../../Typography'
import Image from '../../Common/Image'
import StyledLink from '../../Common/StyledLink'

const PaddedBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${props => props.theme.space[1]};
`

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

const FixedWidthBodyPrimary = styled(BodyPrimary)`
  max-width: ${remcalc(380)};
`

const FeaturedEvent = ({ event }) => (
  <Col width={[1, 1, 1, 1, 6 / 12, 7 / 12]}>
    <FeaturedEventWrapper key={event.id} color={event.color}>
      <EventWrapper>
        <PaddedBodyPrimary muted reverse noPadding>
          Featured event
        </PaddedBodyPrimary>
        <CardTitle reverse noPaddingTop biggest>
          {event.eventTitle}
        </CardTitle>
        <BodyPrimary reverse>{event.date}</BodyPrimary>
        <FixedWidthBodyPrimary muted reverse>
          {event.blurb.blurb}
        </FixedWidthBodyPrimary>
        <StyledLink external reverse href={event.linkToEvent}>
          {event.ctaText}
        </StyledLink>
      </EventWrapper>
      <Image image={event.posterImage} />
    </FeaturedEventWrapper>
  </Col>
)

export default FeaturedEvent
