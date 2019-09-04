import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import { format } from 'date-fns'

import { Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'
import RatioContainer from '../Common/RatioContainer'
import { CardTitle, BodyPrimary, CalendarDay } from '../Typography'

const StyledRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const StyledRatioContainer = styled(RatioContainer)`
  border: solid;
  border-color: ${({ theme }) => theme.colors.border};
  border-width: thin;
`

const CalendarMonth = styled(BodyPrimary)`
  line-height: ${remcalc(18)};

  ${breakpoint('tablet')`
    line-height: ${remcalc(24)};
  `}
`

const DateCardInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
`

const DateCard = ({ date }) => (
  <StyledRatioContainer width={100} height={100}>
    <DateCardInner>
      <CalendarDay noPadding>{date.day}</CalendarDay>
      <CalendarMonth noPadding>{date.month.toUpperCase()}</CalendarMonth>
    </DateCardInner>
  </StyledRatioContainer>
)

const EventTypePadding = styled.div`
  padding-top: ${({ theme }) => theme.spacing[3]};
  padding-bottom: ${({ theme }) => theme.spacing[2]};

  ${breakpoint('smallTablet')`
    padding-top: 0;
  `};
`

const EventTitlePadding = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing[1]};

  ${breakpoint('smallTablet')`
    min-height: ${remcalc(60)};
`};
`

const AlignRightCol = styled(Col)`
  ${breakpoint('tablet')`
    text-align: right;
  `}
`

const EventCard = ({ event }) => {
  // TODO delete the default value for type and attendees when they can be retrieved
  const {
    date,
    address,
    startTime,
    endTime,
    type = 'type',
    eventTitle,
    attendees = 0,
    linkToEvent
  } = event

  const dateArray = format(new Date(date), 'MMM DD').split(' ')
  const formattedDate = { month: dateArray[0], day: dateArray[1] }
  const formattedAddress = address.slice(0, 15).trim() // TODO use a proper format for the address
  const formattedStartTime = format(new Date(startTime), 'ha')
  const formattedEndTime = format(new Date(endTime), 'ha')

  return (
    <StyledRow>
      <Col width={[4 / 12, 3 / 12, 3 / 12, 2 / 12]}>
        <DateCard date={formattedDate} />
      </Col>

      <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
        <EventTypePadding>
          <BodyPrimary noPadding>{type}</BodyPrimary>
        </EventTypePadding>
        <EventTitlePadding>
          <CardTitle noPadding as="h3">
            {eventTitle}
          </CardTitle>
        </EventTitlePadding>
        <BodyPrimary muted noPadding>
          {formattedAddress} • {formattedStartTime} - {formattedEndTime} •{' '}
          {attendees} attending
        </BodyPrimary>
      </Col>

      <AlignRightCol width={[1, 1, 1, 1, 3 / 12, 4 / 12, 5 / 12]}>
        {type === 'meetup' ? (
          <StyledLink
            aria-label={`More on Meetup`}
            to={linkToEvent}
            title={`More on Meetup`}
          >
            More on Meetup
          </StyledLink>
        ) : (
          <StyledLink
            aria-label={`Get tickets`}
            to={linkToEvent}
            title={`Get tickets`}
          >
            Get Tickets
          </StyledLink>
        )}
      </AlignRightCol>
    </StyledRow>
  )
}

export default EventCard
