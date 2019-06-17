import React from 'react'
import { format, isAfter, endOfYesterday } from 'date-fns'
import { Padding } from 'styled-components-spacing'

import specialityEventIcon from './assets/events-icon.svg'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import ExternalAnchor from '../Common/ExternalAnchor'
import StyledLink from '../Common/StyledLink'
import Hr from '../Common/Hr'

const CTA = {
  link: {
    withEvents: 'https://www.meetup.com/',
    withoutEvents: '/contact/'
  },
  text: {
    withEvents: 'More events',
    withoutEvents: 'Get in touch'
  }
}

const noEventsMessage = title =>
  `It looks like there currently aren’t any upcoming ${title} events. You can always check back again later or get in touch if you are interested in potentially hosting one.`

const isSpecialityEvent = (eventTitle, title) => {
  const formattedTitle = title
    .toLowerCase()
    .replace(/(\.|js)/gi, '')
    .trim()

  return eventTitle.toLowerCase().includes(formattedTitle)
}

const getSpecialityEvents = (title, events) =>
  events
    .filter(
      ({ node: { eventTitle, date } }) =>
        isSpecialityEvent(eventTitle, title) && isAfter(date, endOfYesterday())
    )
    .sort((a, b) => (a.date <= b.date ? -1 : 1))
    .slice(0, 5)

const EventSection = ({ events, title }) => {
  const specialityEvents = events ? getSpecialityEvents(title, events) : []
  const hasEvents = !!specialityEvents.length

  const ctaKey = hasEvents ? 'withEvents' : 'withoutEvents'

  const ctaText = CTA.text[ctaKey]
  const ctaLink = CTA.link[ctaKey]

  return (
    <Grid>
      <Padding top={6} bottom={6}>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <div>
              <Padding bottom={1}>
                <img src={specialityEventIcon} alt="events icon" />
              </Padding>
              <SectionTitle>{`Upcoming ${title.trim()} events`}</SectionTitle>
            </div>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            {hasEvents ? (
              <ul>
                {specialityEvents.map(
                  ({ node: { id, eventTitle, date, linkToEvent } }) => (
                    <li key={`${id}`}>
                      <Subtitle noPaddingBottom>
                        <ExternalAnchor href={linkToEvent} title={eventTitle}>
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
            <Padding top={3}>
              <StyledLink external href={ctaLink} title={ctaText}>
                {ctaText}
              </StyledLink>
            </Padding>
          </Col>
        </Row>
      </Padding>
    </Grid>
  )
}
export default EventSection
