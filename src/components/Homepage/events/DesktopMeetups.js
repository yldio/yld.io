import React from 'react'
import { Padding } from 'styled-components-spacing'

import { Col } from '../../grid'
import eventIcon from './assets/homepage-event-icon.svg'
import { SectionTitle, Subtitle, BodyPrimary } from '../../Typography'
import { getHomepageMeetups } from './getEvents'
import ExternalAnchor from '../../Common/ExternalAnchor'
import Hr from '../../Common/Hr'

const DesktopMeetups = ({ events }) => (
  <Col width={[0, 0, 0, 0, 6 / 12, 4 / 12, 4 / 12]}>
    <div>
      <Padding bottom={1}>
        <img src={eventIcon} alt="events icon" />
      </Padding>
      <SectionTitle>Upcoming events</SectionTitle>
    </div>
    <Padding top={42}>
      <ul>
        {getHomepageMeetups(events).map(event => (
          <li key={`${event.id}`}>
            <Subtitle noPaddingBottom>
              <ExternalAnchor href={event.linkToEvent}>
                {event.eventTitle}
              </ExternalAnchor>
            </Subtitle>
            <BodyPrimary noPaddingTop>{event.date}</BodyPrimary>
            <Hr />
          </li>
        ))}
      </ul>
    </Padding>
  </Col>
)

export default DesktopMeetups
