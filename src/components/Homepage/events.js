import React from 'react'
import styled from 'styled-components'
import { Row, Col } from '../grid'
import remcalc from 'remcalc'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import StyledLink from '../styledLink'
import { SectionTitle, CardTitle, Subtitle, BodyPrimary } from '../Typography'
import Image from '../Common/Image'
import ExternalAnchor from '../Common/ExternalAnchor'
import Li from '../listItem'
import eventIcon from './assets/homepage-event-icon.svg'
import { getHomepageMeetups, getHomepageConferences } from './getEvents'

const EventWrapper = styled.header`
  padding: ${remcalc(18)} ${remcalc(24)} 0;

  ${breakpoint('tablet')`
    padding: ${remcalc(24)} ${remcalc(36)} 0;
  `} ${breakpoint('desktop')`
    padding-top: ${remcalc(24)};
    padding-left: ${remcalc(36)};
  `};
`

const FixedWidthBodyPrimary = styled(BodyPrimary)`
  max-width: ${remcalc(380)};
`

const EventsColumn = styled(Col)`
  padding-left: 0;
`

const FeaturedEvent = styled.section`
  background-color: #${props => props.color};
  ${breakpoint('smallTablet')`
    margin-top: ${remcalc(175)}
  `}
`

const Events = ({ events }) => (
  <Row>
    <Col width={[0, 0, 0, 0, 4 / 12, 4 / 12, 4 / 12]}>
      <EventsColumn>
        <Padding bottom={1}>
          <img src={eventIcon} alt="events icon" />
        </Padding>
        <SectionTitle>Upcoming events</SectionTitle>
      </EventsColumn>
      <Padding top={42}>
        <ul>
          {getHomepageMeetups(events).map(event => (
            <Li fullWidth symmetrical key={`${event.id}`}>
              <Subtitle noPaddingBottom>
                <ExternalAnchor href={event.linkToEvent}>
                  {event.eventTitle}
                </ExternalAnchor>
              </Subtitle>
              {event.date}
            </Li>
          ))}
        </ul>
      </Padding>
    </Col>
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

    <Col width={[1, 1, 1, 1, 8 / 12, 8 / 12, 8 / 12]}>
      {getHomepageConferences(events).map(conf => (
        <FeaturedEvent key={conf.id} color={conf.color}>
          <EventWrapper>
            <BodyPrimary muted reverse noPadding>
              Featured
            </BodyPrimary>
            <CardTitle reverse noPadding biggest>
              {conf.eventTitle}
            </CardTitle>
            <Padding top={0.5}>
              <FixedWidthBodyPrimary muted reverse>
                {conf.blurb.blurb}
              </FixedWidthBodyPrimary>
            </Padding>
            <StyledLink external reverse href={conf.linkToEvent}>
              Visit the website
            </StyledLink>
          </EventWrapper>
          <Image image={conf.posterImage} />
        </FeaturedEvent>
      ))}
    </Col>
    <Col width={[1, 1, 1, 1, 0, 0, 0]}>
      <Padding top={{ smallPhone: 3, smallTablet: 42 }}>
        <ul>
          {getHomepageMeetups(events).map(conf => (
            <Li fullWidth symmetrical key={`${conf.id}`}>
              <Subtitle noPaddingBottom>
                <ExternalAnchor href={conf.linkToEvent}>
                  {conf.eventTitle}
                </ExternalAnchor>
              </Subtitle>
              {conf.date}
            </Li>
          ))}
        </ul>
      </Padding>
    </Col>
  </Row>
)

export default Events
