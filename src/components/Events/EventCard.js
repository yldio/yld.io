import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import remcalc from 'remcalc';
import { format } from 'date-fns';

import { Row, Col } from '../grid';
import StyledLink from '../Common/StyledLink';
import RatioContainer from '../Common/RatioContainer';
import { CardTitle, BodyPrimary, CalendarDay } from '../Typography';

const StyledRatioContainer = styled(RatioContainer)`
  border: ${remcalc(1)} solid ${({ theme }) => theme.colors.border};
`;

const CalendarMonth = styled(BodyPrimary)`
  line-height: ${remcalc(18)};

  ${breakpoint('tablet')`
    line-height: ${remcalc(24)};
  `}
`;

const DateCardInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
`;

const DateCard = ({ date }) => {
  const monthDayArray = format(new Date(date), 'MMM DD').split(' ');
  const month = monthDayArray[0];
  const day = monthDayArray[1];

  return (
    <DateCardInner>
      <CalendarDay noPadding>{day}</CalendarDay>
      <CalendarMonth noPadding>{month.toUpperCase()}</CalendarMonth>
    </DateCardInner>
  );
};

const StyledInfoCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${breakpoint('smallPhone', 'smallTablet')`
    padding-bottom: ${({ theme }) => theme.spacing[3]};
  `};
`;

const AlignRightCol = styled(Col)`
  ${breakpoint('tablet')`
    text-align: right;
  `}
`;

const TypeBodyPrimary = styled(BodyPrimary)`
  padding-top: ${({ theme }) => theme.space[2]};

  ${breakpoint('smallTablet')`
    padding-top: 0;
  `};
`;

const EventCard = ({ event }) => {
  const {
    date,
    addressLine3,
    city,
    startTime,
    endTime,
    type,
    eventTitle,
    attendees,
    linkToEvent,
  } = event;

  const formattedStartTime = format(new Date(startTime), 'ha');
  const formattedEndTime = format(new Date(endTime), 'ha');

  const eventInfo = `${
    addressLine3 ? `${addressLine3}, ` : ''
  }${city} • ${formattedStartTime} - ${formattedEndTime}${
    attendees ? ` • ${attendees} attending` : ''
  }`;

  const StyledLinkText = type === 'Meetup' ? 'More on Meetup' : 'Get tickets';

  return (
    <Row>
      <Col width={[4 / 12, 4 / 12, 5 / 12, 4 / 12, 3 / 12, 3 / 12, 2 / 12]}>
        <StyledRatioContainer width={1} height={1}>
          <DateCard date={date} />
        </StyledRatioContainer>
      </Col>

      <StyledInfoCol width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
        <div>
          {type && <TypeBodyPrimary noPadding>{type}</TypeBodyPrimary>}

          <CardTitle as="h3">{eventTitle}</CardTitle>
        </div>
        <BodyPrimary muted noPaddingBottom>
          {eventInfo}
        </BodyPrimary>
      </StyledInfoCol>

      <AlignRightCol width={[1, 1, 1, 1, 3 / 12, 3 / 12, 5 / 12]}>
        <StyledLink
          aria-label={StyledLinkText}
          href={linkToEvent}
          title={StyledLinkText}
        >
          {StyledLinkText}
        </StyledLink>
      </AlignRightCol>
    </Row>
  );
};

export default EventCard;
