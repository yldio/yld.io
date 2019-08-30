import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import { format } from 'date-fns'

import { Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'
import RatioContainer from '../Common/RatioContainer'
import { CardTitle, BodyPrimary, CalendarDay } from '../Typography'

const StyledRatioContainer = styled(RatioContainer)`
  border: solid;
  border-color: ${props => props.theme.colors.border};
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
  padding: ${props => props.theme.spacing[3]};
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
  padding-top: ${props => props.theme.spacing[3]};
  padding-bottom: ${props => props.theme.spacing[2]};

  ${breakpoint('smallTablet')`
    padding-top: 0;
  `};
`

const EventTitlePadding = styled.div`
  padding-bottom: ${props => props.theme.spacing[1]};

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
  const dateArray = format(new Date(event.date), 'MMM DD').split(' ')
  const formattedDate = { month: dateArray[0], day: dateArray[1] }
  const formattedAddress = event.address.slice(0, 15).trim() // TODO use a proper format for the address
  const formattedStartTime = format(new Date(event.startTime), 'ha')
  const formattedEndTime = format(new Date(event.endTime), 'ha')

  // TODO delete the default value for type and when you are able to get it from the query
  const { type = 'type', eventTitle, attendees = 0, linkToEvent } = event

  return (
    <Row style={{ paddingTop: '36px', paddingBottom: '36px' }}>
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
    </Row>
  )
}

export default EventCard
