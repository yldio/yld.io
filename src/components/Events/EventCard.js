import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Row, Col } from '../grid'
import StyledLink from '../Common/StyledLink'
import { CardTitle, BodyPrimary, CalendarDay } from '../Typography'

const CalendarPage = styled.div`
  display: inline-block;

  padding: 24px;
  border: solid;
  border-color: ${props => props.theme.colors.border};
  border-width: thin;
  text-align: center;
`

const CenteredBodyPrimary = styled(BodyPrimary)`
  text-align: center;
  line-height: ${remcalc(18)};

  ${breakpoint('tablet')`
    line-height: ${remcalc(24)};

  `}
`

const DateCard = ({ date }) => (
  <CalendarPage>
    <CalendarDay noPadding>{date.day}</CalendarDay>
    <CenteredBodyPrimary noPadding>
      {date.month.toUpperCase()}
    </CenteredBodyPrimary>
  </CalendarPage>
)

const EventTypePadding = styled.div`
  padding-top: ${remcalc(24)};
  padding-bottom: ${remcalc(12)};

  ${breakpoint('tablet')`
padding-top: 0;

  `};
`

const EventNamePadding = styled.div`
  padding-top: 0;
  padding-bottom: ${remcalc(6)};

  ${breakpoint('tablet')`
padding-top: 0;
`}
`

const SponsorInner = styled.div`
  padding-left: ${remcalc(18)};
  padding-right: ${remcalc(18)};

  display: inline-block;
`
const SponsorOuter = styled.div`
  border: solid;
  border-color: ${props => props.theme.colors.border};
  border-width: thin;
  margin-top: ${remcalc(12)};
  display: inline-block;
`

const AlignRightCol = styled(Col)`
  ${breakpoint('tablet')`
text-align: right;

  `}
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
    link,
    sponsor
  } = event

  return (
    <Row>
      <Col width={[1, 1, 1, 1, 3 / 12, 2 / 12, 2 / 12]}>
        <DateCard date={date} />
      </Col>

      <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
        <EventTypePadding>
          <BodyPrimary noPadding>{type}</BodyPrimary>
        </EventTypePadding>
        <EventNamePadding>
          <CardTitle noPadding as="h2">
            {eventName}
          </CardTitle>
        </EventNamePadding>
        <BodyPrimary muted noPadding>
          {eventLocation} • {startTime} - {endTime} • {attendees} attending
        </BodyPrimary>
        {sponsor && (
          <SponsorOuter>
            <SponsorInner>
              <BodyPrimary>{sponsor}</BodyPrimary>
            </SponsorInner>
          </SponsorOuter>
        )}
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
