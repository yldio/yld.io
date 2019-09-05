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
  border: ${remcalc(1)} solid ${({ theme }) => theme.colors.border};
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
  position: absolute;
  height: 100%;
  width: 100%;
`

const DateCard = ({ date }) => {
  const monthDayArray = format(new Date(date), 'MMM DD').split(' ')
  const month = monthDayArray[0]
  const day = monthDayArray[1]

  return (
    <DateCardInner>
      <CalendarDay noPadding>{day}</CalendarDay>
      <CalendarMonth noPadding>{month.toUpperCase()}</CalendarMonth>
    </DateCardInner>
  )
}

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

  const formattedAddress = address.slice(0, 15).trim() // TODO use a proper format for the address

  const formattedStartTime = format(new Date(startTime), 'ha')
  const formattedEndTime = format(new Date(endTime), 'ha')
  const eventInfo = `${formattedAddress} • ${formattedStartTime} - ${formattedEndTime} • ${attendees} attending`

  const StyledLinkText = type === 'meetup' ? 'More on Meetup' : 'Get tickets'

  return (
    <StyledRow>
      <Col width={[4 / 12, 3 / 12, 3 / 12, 2 / 12]}>
        <StyledRatioContainer width={1} height={1}>
          <DateCard date={date} />
        </StyledRatioContainer>
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
          {eventInfo}
        </BodyPrimary>
      </Col>

      <AlignRightCol width={[1, 1, 1, 1, 3 / 12, 4 / 12, 5 / 12]}>
        <StyledLink
          aria-label={StyledLinkText}
          to={linkToEvent}
          title={StyledLinkText}
        >
          {StyledLinkText}
        </StyledLink>
      </AlignRightCol>
    </StyledRow>
  )
}

export default EventCard
