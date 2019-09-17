import React, { Fragment } from 'react'
import { generate } from 'shortid'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import GetInTouch from '../components/Common/GetInTouch'
import Head from '../components/Common/Head'
import Hr from '../components/Common/Hr'
import { SectionTitle, DisplayTitle } from '../components/Typography'
import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import ConferenceCard from '../components/Events/ConferenceCard'
import EventCard from '../components/Events/EventCard'
import GreyBackground from '../components/Common/GreyBackground'
import Image from '../components/Common/Image'
import BlueBackground from '../components/Common/BlueBackground'

const StyledBlueBackground = styled(BlueBackground)`
  margin-top: -${remcalc(40)};
`

const StyledDisplayTitle = styled(DisplayTitle)`
  padding-top: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[6]};
`

const StyledRow = styled(Row)`
  align-items: center;
  justify-content: center;
  overflow: visible;
  padding-bottom: ${({ theme }) => theme.space[3]};

  ${breakpoint('smalltablet')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `};

  ${breakpoint('tablet')`
    height: ${remcalc(544)};
    padding-bottom: ${({ theme }) => theme.space[5]};
  `};

  ${breakpoint('desktop')`
    height: ${remcalc(644)};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `};
`

const StyledPosterImage = styled(Image)`
  height: 100%;
  width: auto;
  max-width: inherit;
`

const StyledSectionTitleCol = styled(Col)`
  display: flex;
  align-items: center;
`

const StyledPosterImageCol = styled(Col)`
  height: 100%;
  overflow: visible;
`

const getInTouchData = {
  title: 'Interested in hosting or talking at our meetups?',
  text:
    'Bring your organisation closer to our community, Host or sponsor one of our events. Have an idea of your own? Let us know!',
  ctaText: 'Get in touch'
}

const HrWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[4]};
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`

const EventsRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[5]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const ConferenceRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[7]};
`

const EventList = ({ events, Component }) =>
  events.slice(0, 4).map(event => (
    <Fragment key={generate()}>
      <HrWrapper>
        <Hr />
      </HrWrapper>
      <Component event={event.node} />
    </Fragment>
  ))

const EventPage = ({
  data: { allContentfulMeetupEvent: allEvents, contentfulEventsPage: content }
}) => {
  const events = allEvents.edges
  const conferences = events.filter(event => event.node.type === 'Conference')
  const { introSentence, posterImage, seoMetaData } = content

  return (
    <Layout bgColor="blueBg">
      <Head seoMetaData={seoMetaData} />

      <StyledBlueBackground>
        <Grid>
          <StyledRow>
            <StyledSectionTitleCol width={[1, 1, 1, 1, 1 / 2]}>
              <SectionTitle reverse>{introSentence.introSentence}</SectionTitle>
            </StyledSectionTitleCol>
            <StyledPosterImageCol width={[1, 1, 1, 1, 1 / 2]}>
              <StyledPosterImage image={posterImage} />
            </StyledPosterImageCol>
          </StyledRow>
        </Grid>
      </StyledBlueBackground>

      <Grid>
        <EventsRow>
          <Col width={[1]}>
            <DisplayTitle>Upcoming events</DisplayTitle>
          </Col>
          <Col width={[1]}>
            {events && events.length > 0 && (
              <EventList events={events} Component={EventCard} />
            )}
          </Col>
        </EventsRow>
      </Grid>

      <GreyBackground>
        <GetInTouch
          title={getInTouchData.title}
          contactText={getInTouchData.text}
          ctaText={getInTouchData.ctaText}
        />
      </GreyBackground>

      <Grid>
        <ConferenceRow>
          <Col width={[1]}>
            <StyledDisplayTitle>Our Conferences</StyledDisplayTitle>
          </Col>
          <Col width={[1]}>
            {conferences && conferences.length > 0 && (
              <EventList events={conferences} Component={ConferenceCard} />
            )}
          </Col>
        </ConferenceRow>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulEventsPage {
      seoMetaData {
        ...SEOMetaFields
      }
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
          attendees
          type
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
