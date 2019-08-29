import React, { Fragment } from 'react'
import { generate } from 'shortid'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import GetInTouch from '../components/Common/GetInTouch'
import Head from '../components/Common/Head'
import Hr from '../components/Common/Hr'
import { DisplayTitle } from '../components/Typography'
import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import ConferenceCard from '../components/Events/ConferenceCard'
import EventCard from '../components/Events/EventCard'

const StyledDisplayTitle = styled(DisplayTitle)`
  padding-top: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[6]};
`

const eventsPageMeta = {
  title: 'Events',
  description:
    'Building a constellation of brilliant minds, one meetup at the time',
  seoTitle: 'A collection of events organised and sponsored by YLD'
}

const EventList = ({ events }) =>
  events.slice(0, 4).map(event => (
    <Fragment key={generate()} t>
      <Hr />
      <EventCard event={event.node} />
    </Fragment>
  ))

const ConferanceList = ({ conferances }) =>
  conferances
    .slice(0, 3)
    .map(conferance => (
      <ConferenceCard key={generate()} conferance={conferance.node} />
    ))

const getInTouchData = {
  title: 'Interested in hosting or talking at our meetups?',
  text:
    'Bring your organisation closer to our community, Host or sponsor one of our events. Have an idea of your own? Let us know!',
  ctaText: 'Get in touch'
}

const EventPage = ({ data: { allContentfulMeetupEvent: allEvents } }) => {
  const events = allEvents.edges
  const conferances = events.filter(event => event.node.posterImage) // TODO change this filter to filter according to type === "Conferance"

  return (
    <Layout>
      <Grid>
        <Head
          page={{
            title: eventsPageMeta.title,
            seoTitle: eventsPageMeta.seoTitle,
            seoMetaDescription: eventsPageMeta.description
          }}
        />
        <Row>
          <Col width={[1 / 2]}>
            <DisplayTitle regular>
              Building a constellation of brilliant minds, one meetup at the
              time
            </DisplayTitle>
          </Col>
        </Row>
        <Row>
          <Col>
            <DisplayTitle>Upcoming events</DisplayTitle>
          </Col>
        </Row>
        {events && events.length > 0 && <EventList events={events} />}
        <Row>
          <GetInTouch
            title={getInTouchData.title}
            contactText={getInTouchData.text}
            ctaText={getInTouchData.ctaText}
          />
        </Row>
        <Row>
          <Col>
            <StyledDisplayTitle>Our Conferances</StyledDisplayTitle>
          </Col>
        </Row>
        <ConferanceList conferances={conferances} />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulMeetupEvent {
      edges {
        node {
          startTime
          endTime
          date
          #   attendees
          #   type
          eventTitle
          address
          blurb {
            blurb
          }
          homepageFeatured
          linkToEvent
          ctaText
          posterImage {
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid_withWebp
            }
            file {
              url
            }
          }
        }
      }
    }
  }
`

export default EventPage
