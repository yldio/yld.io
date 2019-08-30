import React from 'react'
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
import GreyBackground from '../components/Common/GreyBackground'
import Image from '../components/Common/Image'

const StyledDisplayTitle = styled(DisplayTitle)`
  padding-top: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[6]};
`

const PageHeader = styled.div`
  background-color: ${props => '#' + props.color};
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 72px;
  padding-left: 3rem;
`

const PosterImage = styled(Image)`
  position: relative;
  right: -18%;
  margin-left: -18%;
`

const EventWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const eventsPageMeta = {
  title: 'Events',
  description:
    'Building a constellation of brilliant minds, one meetup at the time',
  seoTitle: 'A collection of events organised and sponsored by YLD'
}

const getInTouchData = {
  title: 'Interested in hosting or talking at our meetups?',
  text:
    'Bring your organisation closer to our community, Host or sponsor one of our events. Have an idea of your own? Let us know!',
  ctaText: 'Get in touch'
}

const EventList = ({ events }) =>
  events.slice(0, 4).map(event => (
    <EventWrapper key={generate()}>
      <Hr />
      <EventCard event={event.node} />
    </EventWrapper>
  ))

const ConferanceList = ({ conferances }) =>
  conferances
    .slice(0, 3)
    .map(conferance => (
      <ConferenceCard key={generate()} conferance={conferance.node} />
    ))

const EventPage = ({
  data: { allContentfulMeetupEvent: allEvents, contentfulLandingPage: pageData }
}) => {
  const events = allEvents.edges
  const conferances = events.filter(event => event.node.posterImage) // TODO change this filter to filter according to type === "Conferance"

  const {
    introSentence,
    posterImage: pagePosterImage,
    posterColor: pagePosterColor
  } = pageData

  return (
    <Layout bgColor={pagePosterColor}>
      <Head
        page={{
          title: eventsPageMeta.title,
          seoTitle: eventsPageMeta.seoTitle,
          seoMetaDescription: eventsPageMeta.description
        }}
      />
      <PageHeader color={pagePosterColor}>
        <DisplayTitle reverse>{introSentence.introSentence}</DisplayTitle>
        <PosterImage image={pagePosterImage} />
      </PageHeader>
      <Grid>
        <Row>
          <Col>
            <DisplayTitle style={{ paddingBottom: '36px' }}>
              Upcoming events
            </DisplayTitle>
          </Col>
          <Col>
            {events && events.length > 0 && <EventList events={events} />}
          </Col>
        </Row>
      </Grid>
      <GreyBackground>
        <GetInTouch
          title={getInTouchData.title}
          contactText={getInTouchData.text}
          ctaText={getInTouchData.ctaText}
        />
      </GreyBackground>
      <Grid>
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
  query {
    contentfulLandingPage {
      posterColor
      posterImage {
        fluid(maxWidth: 600) {
          ...GatsbyContentfulFluid_withWebp
        }
        file {
          url
        }
      }
      introSentence {
        introSentence
      }
    }
    allContentfulMeetupEvent {
      edges {
        node {
          startTime
          endTime
          date
          # attendees
          # type
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
