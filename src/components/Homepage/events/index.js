import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Row } from '../../grid'
import DesktopMeetups from './DesktopMeetups'
import { MobileMeetups, MobileHeader } from './MobileElements'
import FeaturedEvent from './FeaturedEvent'

const EventsRow = styled(Row)`
  ${breakpoint('smallTablet')`
    justify-content: space-between;
  `}
`

const Events = ({ featuredEvent, nonFeaturedEvents }) => (
  <EventsRow>
    <DesktopMeetups events={nonFeaturedEvents} />
    <MobileHeader />
    <FeaturedEvent event={featuredEvent} />
    <MobileMeetups events={nonFeaturedEvents} />
  </EventsRow>
)

export default Events
