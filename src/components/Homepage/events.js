import React from 'react'
import styled from 'styled-components'
import { Row, Col } from '../grid'
import remcalc from 'remcalc'
import { format } from 'date-fns'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'
import StyledLink from '../styledLink'
import { H2, H5, H4, Paragraph } from '../Typography'
import Image from '../Common/Image'
import Li from '../listItem'

const EventTitle = styled(H4)`
  padding-top: ${remcalc(2)} !important;
`

const EventWrapper = styled.header`
  padding: ${remcalc(18)} ${remcalc(24)} 0;

  ${breakpoint('tablet')`
    padding: ${remcalc(24)} ${remcalc(36)} 0;
  `} ${breakpoint('desktop')`
    padding-top: ${remcalc(24)};
    padding-left: ${remcalc(36)};
  `};
`

const P = styled(Paragraph)`
  max-width: ${remcalc(380)};
  margin-bottom: ${remcalc(3)};
`

const EventsColumn = styled(Col)`
  padding-left: 0;
`

const Events = ({ events }) => (
  <Row>
    <Col width={[0, 0, 0, 0, 4 / 12, 4 / 12, 4 / 12]}>
      <EventsColumn>
        <H2>Upcoming events</H2>
      </EventsColumn>
      <Padding top={42}>
        <ul>
          {events
            .filter(n => !n.node.homepageFeatured)
            .slice(0, 3)
            .map(({ node }) => (
              <Li fullWidth symmetrical key={`${node.id}`}>
                <H5>
                  <a
                    href={node.linkToEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {node.eventTitle}
                  </a>
                </H5>
                {format(new Date(node.date), 'MMMM DD[,] dddd')}
              </Li>
            ))}
        </ul>
      </Padding>
    </Col>
    <Col width={[1, 1, 1, 1, 0, 0, 0]}>
      <EventsColumn>
        <Padding bottom={2}>
          <H2>Upcoming events</H2>
        </Padding>
      </EventsColumn>
    </Col>

    <Col width={[1, 1, 1, 1, 8 / 12, 8 / 12, 8 / 12]}>
      {events
        .filter(n => n.node.homepageFeatured)
        .map(({ node }) => (
          <div key={node.id} style={{ background: `#${node.color}` }}>
            <EventWrapper>
              <Paragraph muted reverse noMargin>
                Featured
              </Paragraph>
              <EventTitle reverse>{node.eventTitle}</EventTitle>
              <Padding top={0.5}>
                <P muted reverse>
                  {node.blurb.blurb}
                </P>
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
          </div>
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
                <H5>
                  <a
                    href={node.linkToEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {node.eventTitle}
                  </a>
                </H5>
                {format(new Date(node.date), 'MMMM DD[,] dddd')}
              </Li>
            ))}
        </ul>
      </Padding>
    </Col>
  </Row>
)

export default Events
