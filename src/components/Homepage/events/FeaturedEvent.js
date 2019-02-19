import React from 'react'
import { Padding } from 'styled-components-spacing'
import { Col } from '../../grid'
import { CardTitle, BodyPrimary } from '../../Typography'
import { getHomepageConferences } from './getEvents'
import Image from '../../Common/Image'
import {
  FeaturedEventWrapper,
  EventWrapper,
  FixedWidthBodyPrimary
} from './elements'
import StyledLink from '../../Common/StyledLink'

const FeaturedEvent = ({ events }) => (
  <Col width={[1, 1, 1, 1, 6 / 12, 7 / 12]}>
    {getHomepageConferences(events).map(conf => (
      <FeaturedEventWrapper key={conf.id} color={conf.color}>
        <EventWrapper>
          <BodyPrimary muted reverse noPadding>
            Featured
          </BodyPrimary>
          <CardTitle reverse noPadding biggest>
            {conf.eventTitle}
          </CardTitle>
          <Padding top={0.5}>
            <FixedWidthBodyPrimary muted reverse>
              {conf.blurb.blurb}
            </FixedWidthBodyPrimary>
          </Padding>
          <StyledLink external reverse href={conf.linkToEvent}>
            Visit the website
          </StyledLink>
        </EventWrapper>
        <Image image={conf.posterImage} />
      </FeaturedEventWrapper>
    ))}
  </Col>
)

export default FeaturedEvent
