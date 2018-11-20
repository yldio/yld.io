import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-styled-flexboxgrid'
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

const Events = ({ events }) => (
  <Row>
    <Col md={4} sm={false} xs={false}>
      <Col xs={8} style={{ paddingLeft: 0 }}>
        <H2 noTop>Upcoming events</H2>
      </Col>
      <ul>
        {events
          .filter(n => !n.node.homepageFeatured)
          .slice(0, 3)
          .map(({ node }) => (
            <Li key={`${node.id}`}>
              <H5 bold>
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
    </Col>
    <Col md={false} sm={12} xs={12}>
      <Col xs={8} style={{ paddingLeft: 0 }}>
        <H2 noTop>Upcoming events</H2>
      </Col>
    </Col>

    <Col md={8} xs={12}>
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
                <Paragraph
                  muted
                  reverse
                  style={{ maxWidth: remcalc(380), marginBottom: remcalc(3) }}
                >
                  {node.blurb.blurb}
                </Paragraph>
              </Padding>
              <StyledLink
                reverse
                href={node.linkToEvent}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get tickets
              </StyledLink>
            </EventWrapper>
            <Image image={node.posterImage} />
          </div>
        ))}
    </Col>
    <Col md={false} sm={12} xs={12}>
      <Padding top={3}>
        <ul>
          {events
            .filter(n => !n.node.homepageFeatured)
            .slice(0, 3)
            .map(({ node }) => (
              <Li key={`${node.id}`}>
                <H5 bold>
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
