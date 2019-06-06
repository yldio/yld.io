import React from 'react'
import { format, isAfter, endOfYesterday } from 'date-fns'
import { Padding } from 'styled-components-spacing'

import specialityEventIcon from '../Speciality/assets/events-icon.svg'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import ExternalAnchor from './ExternalAnchor'
import Hr from './Hr'

const noEventsMessage = title =>
  `It looks like there currently aren’t any upcoming ${title} events. You can always check back again later or get in touch if you are interested in potentially hosting one.`

const getAllUpcomingEvents = events =>
  events
    .filter(({ node: { eventTitle, date } }) => isAfter(date, endOfYesterday()))
    .sort((a, b) => (a.date <= b.date ? -1 : 1))
    .slice(0, 5)

const EventSection = ({ events, title, description, eventIcon }) => {
  const displayedEvents = events.length ? getAllUpcomingEvents(events) : []
  const hasEvents = !!displayedEvents.length

  return (
    <Grid>
      <Padding top={6} bottom={6}>
        <Row>
          <Col width={[1]}>
            <div>
              <Padding bottom={1}>
                <img src={specialityEventIcon} alt="events icon" />
              </Padding>
            </div>
          </Col>
          <Col width={[1, 1, 1, 1, 7 / 12]}>
            <Row>
              <Col width={[1]}>
                <SectionTitle>{`Upcoming ${
                  title ? title.trim() : ''
                } events`}</SectionTitle>
              </Col>

              {description ? (
                <Col width={[1, 1, 1, 1, 10 / 12, 7 / 12]}>
                  <BodyPrimary>{description}</BodyPrimary>
                </Col>
              ) : null}
            </Row>
          </Col>
          <Col width={[1, 1, 1, 1, 5 / 12]}>
            {hasEvents ? (
              <ul>
                {displayedEvents.map(
                  ({ node: { id, eventTitle, date, linkToEvent } }) => (
                    <li key={`${id}`}>
                      <Subtitle noPaddingBottom>
                        <ExternalAnchor href={linkToEvent}>
                          {eventTitle}
                        </ExternalAnchor>
                      </Subtitle>
                      <BodyPrimary noPaddingTop>
                        {format(date, 'MMMM DD[,] dddd')}
                      </BodyPrimary>
                      <Hr />
                    </li>
                  )
                )}
              </ul>
            ) : (
              noEventsMessage(title)
            )}
          </Col>
        </Row>
      </Padding>
    </Grid>
  )
}
export default EventSection
