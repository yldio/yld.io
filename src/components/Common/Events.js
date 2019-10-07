import React from 'react'
import { format, isAfter, endOfYesterday } from 'date-fns'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import specialityEventIcon from '../Speciality/assets/events-icon.svg'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import ExternalAnchor from './ExternalAnchor'
import Hr from './Hr'
import BackgroundColorWrapper from './BackgroundColorWrapper'

const noEventsMessage = title =>
  `It looks like there currently aren’t any upcoming ${title} events. You can always check back again later or get in touch if you are interested in potentially hosting one.`

const getAllUpcomingEvents = events =>
  events
    .filter(({ date }) => isAfter(date, endOfYesterday()))
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
const ImageWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[2]};
  padding-top: ${({ theme }) => theme.space[2]};
`

const StyledBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const EventSection = ({ events, title, description, bgColor }) => {
  const upcomingEvents = events.length ? getAllUpcomingEvents(events) : []
  const hasEvents = !!upcomingEvents.length

  return (
    <BackgroundColorWrapper bgColor={bgColor}>
      <Grid>
        <Wrapper>
          <Row>
            <Col width={[1]}>
              <ImageWrapper>
                <img src={specialityEventIcon} alt="events icon" />
              </ImageWrapper>
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
                    <StyledBodyPrimary>{description}</StyledBodyPrimary>
                  </Col>
                ) : null}
              </Row>
            </Col>
            <Col width={[1, 1, 1, 1, 5 / 12]}>
              {hasEvents ? (
                <ul>
                  {upcomingEvents.map(
                    ({ id, eventTitle, date, linkToEvent }) => (
                      <li key={id}>
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
    </BackgroundColorWrapper>
  )
}
export default EventSection
