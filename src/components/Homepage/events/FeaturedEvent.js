import React from 'react'
import styled from 'styled-components'

import { Col } from '../../grid'
import { CardTitle, BodyPrimary } from '../../Typography'
import Image from '../../Common/Image'
import {
  FeaturedEventWrapper,
  EventWrapper,
  FixedWidthBodyPrimary
} from './elements'
import StyledLink from '../../Common/StyledLink'

const PaddedBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${props => props.theme.spacing[0.5]};
`

const FeaturedEvent = ({ event }) => (
  <Col width={[1, 1, 1, 1, 6 / 12, 7 / 12]}>
    <FeaturedEventWrapper key={event.id} color={event.color}>
      <EventWrapper>
        <PaddedBodyPrimary muted reverse noPadding>
          Featured
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
