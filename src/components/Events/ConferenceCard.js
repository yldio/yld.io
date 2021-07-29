import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import format from 'date-fns/format';
import isPast from 'date-fns/isPast';

import Image from '../Common/Image';
import Anchor from '../Common/Anchor';
import { Row, Col } from '../grid';
import StyledLink from '../Common/StyledLink';
import { CardTitle, BodyPrimary } from '../Typography';

const BlurbWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[2]};

  ${breakpoint('smallTablet')`
      padding-top: ${({ theme }) => theme.space[3]};
  `};
`;

const StyledStatusBodyPrimary = styled(BodyPrimary)`
  padding-top: ${({ theme }) => theme.space[2]};

  ${breakpoint('smallTablet')`
    padding-top: 0;
  `};
`;

const AnchorWrapper = ({ to, children }) =>
  to ? <Anchor to={to}>{children}</Anchor> : children;

const ConferenceCard = ({ event }) => {
  const {
    date,
    city,
    eventTitle,
    blurb,
    blurbCtaLink,
    blurbCtaCopy,
    linkToEvent,
    linkToTickets,
    eventImage,
    ctaText,
  } = event;

  const formattedDate = format(new Date(date), 'PPP');
  const eventInfo = `${formattedDate} • ${city}`;

  const status = isPast(new Date(date)) ? 'Past' : 'Upcoming';

  return (
    <Row>
      <Col width={[8 / 12, 8 / 12, 8 / 12, 8 / 12, 0, 0, 0]}>
        <AnchorWrapper href={linkToEvent}>
          {eventImage && (
            <Image
              style={{ display: 'block' }}
              image={eventImage}
              width="100%"
            />
          )}
        </AnchorWrapper>
      </Col>

      <Col width={[1, 1, 1, 1, 5 / 12, 4 / 12, 4 / 12]}>
        <StyledStatusBodyPrimary noPadding muted>
          {status}
        </StyledStatusBodyPrimary>
        <CardTitle as="h3">{eventTitle}</CardTitle>
        <BodyPrimary>{eventInfo}</BodyPrimary>
      </Col>

      <Col width={[1, 1, 1, 1, 7 / 12, 5 / 12, 5 / 12]}>
        <BlurbWrapper>
          <BodyPrimary noPaddingBottom>{blurb.blurb}</BodyPrimary>
          <BodyPrimary noPaddingTop>
            <a
              href={blurbCtaLink || linkToEvent}
              style={{ textDecoration: 'underline' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {blurbCtaCopy || 'Read more'}
            </a>
          </BodyPrimary>
        </BlurbWrapper>
        <StyledLink
          aria-label={ctaText}
          href={linkToTickets || linkToEvent}
          title={ctaText}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ctaText}
        </StyledLink>
      </Col>
      <Col width={[0, 0, 0, 0, 0, 3 / 12, 3 / 12]}>
        <AnchorWrapper href={linkToEvent}>
          {eventImage && <Image image={eventImage} height="100%" />}
        </AnchorWrapper>
      </Col>
    </Row>
  );
};

export default ConferenceCard;
