import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

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
  padding: ${remcalc(24)};
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

const EventNamePadding = styled.div`
  padding-bottom: ${props => props.theme.spacing[1]};

  ${breakpoint('smallTablet')`
min-height: ${remcalc(60)};

`};
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
  margin-top: ${props => props.theme.spacing[2]};
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
      <Col width={[4 / 12, 3 / 12, 3 / 12, 2 / 12]}>
        <DateCard date={date} />
      </Col>

      <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
        <EventTypePadding>
          <BodyPrimary noPadding>{type}</BodyPrimary>
        </EventTypePadding>
        <EventNamePadding>
          <CardTitle noPadding as="h3">
            {eventName}
          </CardTitle>
        </EventNamePadding>
        <BodyPrimary muted noPadding>
          {eventLocation} • {startTime} - {endTime} • {attendees} attending
        </BodyPrimary>
        {sponsor && (
          <SponsorOuter>
            <SponsorInner>
              <BodyPrimary muted>{sponsor}</BodyPrimary>
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
