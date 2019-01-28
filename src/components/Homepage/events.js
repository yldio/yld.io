import React from 'react'
import styled from 'styled-components'
import { Row, Col } from '../grid'
import remcalc from 'remcalc'
import { format } from 'date-fns'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import StyledLink from '../styledLink'
import { SectionTitle, CardTitle, Subtitle, BodyPrimary } from '../Typography'
import Image from '../Common/Image'
import Li from '../listItem'
import eventIcon from './assets/homepage-event-icon.svg'

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
          {events
            .filter(n => !n.node.homepageFeatured)
            .slice(0, 3)
            .map(({ node }) => (
              <Li fullWidth symmetrical key={`${node.id}`}>
                <Subtitle>
                  <a
                    href={node.linkToEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {node.eventTitle}
                  </a>
                </Subtitle>
                {format(new Date(node.date), 'MMMM DD[,] dddd')}
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
      {events
        .filter(n => n.node.homepageFeatured)
        .map(({ node }) => (
          <FeaturedEvent key={node.id} color={node.color}>
            <EventWrapper>
              <BodyPrimary muted reverse noPadding>
                Featured
              </BodyPrimary>
              <CardTitle reverse noPadding biggest>
                {node.eventTitle}
              </CardTitle>
              <Padding top={0.5}>
                <FixedWidthBodyPrimary muted reverse>
                  {node.blurb.blurb}
                </FixedWidthBodyPrimary>
              </Padding>
              <StyledLink
                reverse
                href={node.linkToEvent}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit the website
              </StyledLink>
            </EventWrapper>
            <Image image={node.posterImage} />
          </FeaturedEvent>
        ))}
    </Col>
    <Col width={[1, 1, 1, 1, 0, 0, 0]}>
      <Padding top={{ smallPhone: 3, smallTablet: 42 }}>
        <ul>
          {events
            .filter(n => !n.node.homepageFeatured)
            .slice(0, 3)
            .map(({ node }) => (
              <Li fullWidth symmetrical key={`${node.id}`}>
                <Subtitle>
                  <a
                    href={node.linkToEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {node.eventTitle}
                  </a>
                </Subtitle>
                {format(new Date(node.date), 'MMMM DD[,] dddd')}
              </Li>
            ))}
        </ul>
      </Padding>
    </Col>
  </Row>
)

export default Events
