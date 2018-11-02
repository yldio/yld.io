import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { format } from 'date-fns'
import StyledLink from '../styledLink'
import { H2, H5, H3 } from '../Typography'
import Flex from 'styled-flex-component'
import Li from '../listItem'

const EventTitle = styled(H3)`
  font-size: ${remcalc(30)};
  padding: ${remcalc(12)} 0 0 0;
`

const EventWrapper = styled.header`
  padding-top: ${remcalc(24)};
  padding-left: ${remcalc(36)};

  span {
    color: ${props => props.theme.colors.lightGray};
    display: block;
  }
`

const Events = ({ events }) => (
  <Row>
    <Col md={4} xs={12}>
      <H2>Upcoming Events</H2>
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
            <span>Featured</span>
            <EventTitle reverse>{node.eventTitle}</EventTitle>
            <span>{node.blurb.blurb}</span>
            <StyledLink reverse href={node.linkToEvent}>
              Buy Tickets
            </StyledLink>
          </EventWrapper>
          <img alt={node.eventName} src={node.posterImage.file.url} />
        </Flex>
      ))}
    </Col>
  </Row>
)

export default Events
