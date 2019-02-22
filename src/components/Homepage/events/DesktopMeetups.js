import React from 'react'
import { Padding } from 'styled-components-spacing'
import { Col } from '../../grid'
import eventIcon from './assets/homepage-event-icon.svg'
import { SectionTitle, Subtitle } from '../../Typography'
import { getHomepageMeetups } from './getEvents'
import CustomisedBulletpoint from '../../Common/CustomisedBulletpoint'
import ExternalAnchor from '../../Common/ExternalAnchor'

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
          <CustomisedBulletpoint
            fullWidth
            fullWidthBorder
            symmetrical
            key={`${event.id}`}
          >
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
