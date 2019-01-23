import React from 'react'
import styled from 'styled-components'
import { Row, Col } from '../grid'
import remcalc from 'remcalc'
import { format } from 'date-fns'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import StyledLink from '../styledLink'
import {
  SectionTitleH2,
  CardTitleH3,
  SubtitleH3,
  BodyPrimary
} from '../Typography'
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

const StyledBodyPrimary = styled(BodyPrimary)`
  max-width: ${remcalc(380)};
  margin-bottom: ${remcalc(3)};
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
        <SectionTitleH2>Upcoming events</SectionTitleH2>
      </EventsColumn>
      <Padding top={42}>
        <ul>
          {events
            .filter(n => !n.node.homepageFeatured)
            .slice(0, 3)
            .map(({ node }) => (
              <Li fullWidth symmetrical key={`${node.id}`}>
                <SubtitleH3>
                  <a
                    href={node.linkToEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {node.eventTitle}
                  </a>
                </SubtitleH3>
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

          <SectionTitleH2>Upcoming events</SectionTitleH2>
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
              <CardTitleH3 reverse noPadding biggest>
                {node.eventTitle}
              </CardTitleH3>
              <Padding top={0.5}>
                <StyledBodyPrimary muted reverse>
                  {node.blurb.blurb}
                </StyledBodyPrimary>
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
                <SubtitleH3>
                  <a
                    href={node.linkToEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {node.eventTitle}
                  </a>
                </SubtitleH3>
                {format(new Date(node.date), 'MMMM DD[,] dddd')}
              </Li>
            ))}
        </ul>
      </Padding>
    </Col>
  </Row>
)

export default Events
