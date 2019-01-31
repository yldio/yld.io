import React from 'react'
import { Row } from '../../grid'
import DesktopMeetups from './DesktopMeetups'
import { MobileMeetups, MobileHeader } from './MobileElements'
import FeaturedEvent from './FeaturedEvent'

const Events = ({ events }) => (
  <Row>
    <DesktopMeetups events={events} />
    <MobileHeader />
    <FeaturedEvent events={events} />
    <MobileMeetups events={events} />
  </Row>
)

export default Events
