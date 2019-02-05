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

const Events = ({ events }) => (
  <EventsRow>
    <DesktopMeetups events={events} />
    <MobileHeader />
    <FeaturedEvent events={events} />
    <MobileMeetups events={events} />
  </EventsRow>
)

export default Events
