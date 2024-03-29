import React from 'react';
import styled from 'styled-components';
import { Padding } from 'styled-components-spacing';

import { Col } from '../../grid';
import { SectionTitle, Subtitle, BodyPrimary } from '../../Typography';
import ExternalAnchor from '../../Common/ExternalAnchor';
import Hr from '../../Common/Hr';
import eventIcon from './assets/homepage-event-icon.svg';

const EventsColumn = styled(Col)`
  padding-left: 0;
`;

export const MobileMeetups = ({ events }) => (
  <Col width={[1, 1, 1, 1, 0, 0, 0]}>
    <Padding top={{ smallPhone: 3, smallTablet: 42 }}>
      <ul>
        {events.map((conf) => (
          <li key={`${conf.id}`}>
            <Subtitle noPaddingBottom>
              <ExternalAnchor href={conf.linkToEvent} title={conf.eventTitle}>
                {conf.eventTitle}
              </ExternalAnchor>
            </Subtitle>
            <BodyPrimary noPaddingTop>{conf.date}</BodyPrimary>
            <Hr />
          </li>
        ))}
      </ul>
    </Padding>
  </Col>
);

export const MobileHeader = () => (
  <Col width={[1, 1, 1, 1, 0, 0, 0]}>
    <EventsColumn>
      <Padding bottom={2}>
        <Padding bottom={1}>
          <img src={eventIcon} alt="events icon" />
        </Padding>

        <SectionTitle>Upcoming events</SectionTitle>
      </Padding>
    </EventsColumn>
  </Col>
);
