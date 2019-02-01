import React from 'react'
import { Padding } from 'styled-components-spacing'
import { Col } from '../../grid'
import eventIcon from './assets/homepage-event-icon.svg'
import { SectionTitle, Subtitle } from '../../Typography'
import { getHomepageMeetups } from './getEvents'
import CustomisedBulletpoint from '../../CustomisedBulletpoint'
import ExternalAnchor from '../../Common/ExternalAnchor'
import { EventsColumn } from './elements'

const DesktopMeetups = ({ events }) => (
  <Col width={[0, 0, 0, 0, 4 / 12, 4 / 12, 4 / 12]}>
    <EventsColumn>
      <Padding bottom={1}>
        <img src={eventIcon} alt="events icon" />
      </Padding>
      <SectionTitle>Upcoming events</SectionTitle>
    </EventsColumn>
    <Padding top={42}>
      <ul>
        {getHomepageMeetups(events).map(event => (
          <CustomisedBulletpoint fullWidth symmetrical key={`${event.id}`}>
            <Subtitle noPaddingBottom>
              <ExternalAnchor href={event.linkToEvent}>
                {event.eventTitle}
              </ExternalAnchor>
            </Subtitle>
            {event.date}
          </CustomisedBulletpoint>
        ))}
      </ul>
    </Padding>
  </Col>
)

export default DesktopMeetups
