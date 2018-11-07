import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { format } from 'date-fns'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import { H2, H5, H4, Paragraph } from '../Typography'
import Flex from 'styled-flex-component'
import Li from '../listItem'

const EventTitle = styled(H4)`
  padding-top: ${remcalc(2)} !important;
`

const EventWrapper = styled.header`
  padding-top: ${remcalc(24)};
  padding-left: ${remcalc(36)};
`

const Events = ({ events }) => (
  <Row>
    <Col md={4} xs={12}>
      <H2 noTop>Upcoming events</H2>
      <ul>
        {events
          .filter(n => !n.node.homepageFeatured)
          .splice(0, 3)
          .map(({ node }) => (
            <Li key={`${node.id}`}>
              <H5 bold>{node.eventTitle}</H5>
              {format(new Date(node.date), 'MMMM DD[,] dddd')}
            </Li>
          ))}
      </ul>
    </Col>
    <Col md={8} xs={12}>
      {events.filter(n => n.node.homepageFeatured).map(({ node }) => (
        <Flex
          key={node.id}
          alignStart
          justifyBetween
          full
          column
          style={{ background: `#${node.color}` }}
        >
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
            <StyledLink reverse href={node.linkToEvent}>
              Get tickets
            </StyledLink>
          </EventWrapper>
          <img alt={node.eventName} src={node.posterImage.file.url} />
        </Flex>
      ))}
    </Col>
  </Row>
)

export default Events
