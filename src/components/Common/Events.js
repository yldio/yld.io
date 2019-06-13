import React from 'react'
import { format, isAfter, endOfYesterday } from 'date-fns'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import specialityEventIcon from '../Speciality/assets/events-icon.svg'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import ExternalAnchor from './ExternalAnchor'
import Hr from './Hr'

const noEventsMessage = title =>
  `It looks like there currently aren’t any upcoming ${title} events. You can always check back again later or get in touch if you are interested in potentially hosting one.`

const getAllUpcomingEvents = events =>
  events
    .filter(({ node: { date } }) => isAfter(date, endOfYesterday()))
    .sort((a, b) => (a.date <= b.date ? -1 : 1))
    .slice(0, 5)

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.space[4]} 0 ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
      padding: 
        ${({ theme }) => theme.space[6]} 
        0 
        ${({ theme }) => theme.space[7]};
  `}
`

const EventSection = ({ events, title, description }) => {
  const displayedEvents = events.length ? getAllUpcomingEvents(events) : []
  const hasEvents = !!displayedEvents.length

  const ctaKey = hasEvents ? 'withEvents' : 'withoutEvents'

  const ctaText = CTA.text[ctaKey]
  const ctaLink = CTA.link[ctaKey]

  return (
    <Grid>
      <Wrapper>
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
          </Col>
        </Row>
      </Wrapper>
    </Grid>
  )
}
export default EventSection
