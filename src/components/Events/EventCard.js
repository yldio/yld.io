import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'

import { CardTitle, BodyPrimary, CalendarDay } from '../Typography'
import remcalc from 'remcalc'

const CalendarPage = styled.div`
  padding: 24px;
  border: solid;
  border-color: ${props => props.theme.colors.border};
  border-width: thin;
  width: 108px;
  height: 108px;
  text-align: center;

  ${breakpoint('tablet')`
    width: 143px;
    height: 143px;
  `}
`

const CenteredBodyPrimary = styled(BodyPrimary)`
  text-align: center;
  line-height: ${remcalc(18)};

  ${breakpoint('tablet')`
    line-height: ${remcalc(24)};

  `}
`

const noPaddingCol = styled(Col)`
  padding: 0;
`

const DateCard = ({ date }) => (
  <CalendarPage>
    <CalendarDay noPadding>{date.day}</CalendarDay>
    <CenteredBodyPrimary noPadding>
      {date.month.toUpperCase()}
    </CenteredBodyPrimary>
  </CalendarPage>
)

const AlignRightCol = styled(Col)`
  ${breakpoint('tablet')`
text-align: right;

  `}
`

const SelectivePaddingCardTitle = styled(CardTitle)`
  ${breakpoint('tablet')`
padding-top: 0;

  `}
`

const selectivePaddingBodyPrimary = styled(BodyPrimary)`
  padding-top: ${remcalc(24)} ${breakpoint('tablet')`
padding-top: 0;

  `};
`

const EventCard = ({ event }) => {
  const {
    type,
    date,
    eventName,
    eventLocation,
    startTime,
    endTime,
    attendees = 0,
    link
  } = event

  return (
    <Row>
      <noPaddingCol width={[1, 1, 1, 1, 3 / 12, 2 / 12, 2 / 12]}>
        <DateCard date={date} />
      </noPaddingCol>

      <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
        <selectivePaddingBodyPrimary>{type}</selectivePaddingBodyPrimary>
        <SelectivePaddingCardTitle as="h2">
          {eventName}
        </SelectivePaddingCardTitle>
        <BodyPrimary muted>
          {eventLocation} • {startTime} - {endTime} • {attendees} attending
        </BodyPrimary>
      </Col>

      <AlignRightCol width={[1, 1, 1, 1, 3 / 12, 4 / 12, 5 / 12]}>
        {type === 'meetup' ? (
          <StyledLink
            aria-label={`More on Meetup`}
            to={link}
            title={`More on Meetup`}
          >
            More on Meetup
          </StyledLink>
        ) : (
          <StyledLink
            aria-label={`Get tickets`}
            to={link}
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
