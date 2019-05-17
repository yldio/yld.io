import React from 'react'
import { Padding } from 'styled-components-spacing'
import { Col } from '../../grid'
import { CardTitle, BodyPrimary } from '../../Typography'
import Image from '../../Common/Image'
import {
  FeaturedEventWrapper,
  EventWrapper,
  FixedWidthBodyPrimary
} from './elements'
import StyledLink from '../../Common/StyledLink'

const FeaturedEvent = ({ event }) => (
  <Col width={[1, 1, 1, 1, 6 / 12, 7 / 12]}>
    <FeaturedEventWrapper key={event.id} color={event.color}>
      <EventWrapper>
        <BodyPrimary muted reverse noPadding>
          Featured
        </BodyPrimary>
        <CardTitle reverse noPadding biggest>
          {event.eventTitle}
        </CardTitle>
        <Padding top={0.5}>
          <BodyPrimary noPadding reverse>
            {event.date}
          </BodyPrimary>
          <FixedWidthBodyPrimary muted reverse>
            {event.blurb.blurb}
          </FixedWidthBodyPrimary>
        </Padding>
        <StyledLink external reverse href={event.linkToEvent}>
          {event.ctaText}
        </StyledLink>
      </EventWrapper>
      <Image image={event.posterImage} />
    </FeaturedEventWrapper>
  </Col>
)

export default FeaturedEvent
