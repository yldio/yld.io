import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { generate } from 'shortid'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import { startOfToday, isAfter, isToday } from 'date-fns'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'
import is from 'styled-is'

import Head from '../components/Common/Head'
import Hr from '../components/Common/Hr'
import {
  BodyPrimary,
  SectionTitle,
  DisplayTitle,
} from '../components/Typography'
import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import ConferenceCard from '../components/Events/ConferenceCard'
import EventCard from '../components/Events/EventCard'
import GreyBackground from '../components/Common/GreyBackground'
import Image from '../components/Common/Image'
import StyledLink from '../components/Common/StyledLink'
import BlueBackground from '../components/Common/BlueBackground'

import { LogoStyleContext } from '../context/PageContext'

import generateBreadcrumbData from '../utils/generateBreadcrumbData'

const createEventStructuredData = (events = []) =>
  events.map(({ node }) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: node.eventTitle,
    startDate: node.date,
    endDate: node.endTime,
    location: {
      '@type': 'Place',
      name: node.venueName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: node.addressLine1,
        addressLocality: node.addressLine2,
        postalCode: node.addressLine3,
        addressRegion: node.city,
        addressCountry: 'US',
      },
    },
    ...((node.linkToTickets || node.linkToEvent) && {
      offers: {
        '@type': 'Offer',
        url: node.linkToTickets || node.linkToEvent,
      },
    }),
    // Can't add description when meetup as meetup blurb is HTML, using strip tags
    // is not reliable enough due to potential ' + " characters in html breaking parsing
    ...(node.type !== 'Meetup' && { description: node.blurb.blurb }),
  }))

const getInTouchData = {
  title: 'Interested in hosting or talking at our meetups?',
  copyHeading: 'Bring your organisation closer to our community',
  copy:
    'Host or sponsor one of our events. Have an idea of your own? Let us know!',
  ctaText: 'Get in touch',
}

const StyledBlueBackground = styled(BlueBackground)`
  margin-top: -${remcalc(40)};
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

  ${breakpoint('desktop')`
    width: 200%;
  `}
`

const StyledSectionTitleCol = styled(Col)`
  display: flex;
  align-items: center;

  ${breakpoint('smallPhone', 'smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`

const StyledPosterImageCol = styled(Col)`
  overflow: visible;
  ${breakpoint('smallPhone', 'largePhone')`
    height: ${remcalc(240)};
  `}

  height: 100%;
`

const HrWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[4]};
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}

  ${is('noPaddingTop')`
    padding-top: 0;
  `}
`

const EventsRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[5]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[5]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
  `}
`

const ConferenceRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[7]};
    `}
`

const ConferenceTitleWrap = styled.div`
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const EventListWrapper = styled.div`
  ${is('paddingBottom')`
    padding-bottom: ${({ theme }) => theme.space[2]}
  `}
`

const EventList = ({ events }) =>
  events.slice(0, 4).map((event, idx, arr) => (
    <EventListWrapper key={generate()} paddingBottom={arr.length - 1 === idx}>
      <HrWrapper noPaddingTop={idx === 0}>
        <Hr />
      </HrWrapper>
      <EventCard event={event.node} />
    </EventListWrapper>
  ))

const ConferenceList = ({ events }) =>
  events.slice(0, 4).map((event, idx) => (
    <Fragment key={generate()}>
      {idx !== 0 && (
        <HrWrapper>
          <Hr />
        </HrWrapper>
      )}
      <ConferenceCard event={event.node} />
    </Fragment>
  ))

const EventPage = ({
  data: {
    events,
    conferences,
    contentfulEventsPage: content,
    site: {
      siteMetadata: { siteUrl },
    },
  },
  location,
}) => {
  const futureEvents = events.edges.filter(
    ({ node }) => isAfter(node.date, startOfToday()) || isToday(node.date),
  )

  const { introSentence, posterImage, seoMetaData, footerContactUs } = content

  const breadcrumbData = generateBreadcrumbData(siteUrl, [
    {
      name: 'Events',
      pathname: location.pathname,
      position: 2,
    },
  ])

  const eventStructuredData = createEventStructuredData(futureEvents)

  return (
    <LogoStyleContext.Provider value="white">
      <Layout
        bgColor="blueBg"
        footerContactUsId={footerContactUs.id}
        breadcrumbData={breadcrumbData}
      >
        <Helmet>
          {eventStructuredData &&
            eventStructuredData.length > 0 &&
            eventStructuredData.map(data => (
              <script key={generate()} type="application/ld+json">
                {JSON.stringify(data)}
              </script>
            ))}
        </Helmet>
        <Head seoMetaData={seoMetaData} />

        <StyledBlueBackground>
          <Grid>
            <StyledRow>
              <StyledSectionTitleCol width={[1, 1, 1, 1, 1 / 2]}>
                <SectionTitle reverse>
                  {introSentence.introSentence}
                </SectionTitle>
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
              {futureEvents && futureEvents.length > 0 ? (
                <EventList events={futureEvents} />
              ) : (
                <DisplayTitle>
                  {
                    "We don't seem to have any upcoming events currently, check back soon!"
                  }
                </DisplayTitle>
              )}
            </Col>
          </EventsRow>
        </Grid>

        <GreyBackground>
          <Grid>
            <Padding
              top={{ smallPhone: 3.5, tablet: 5 }}
              bottom={{ smallPhone: 3.5, tablet: 5 }}
            >
              <Row>
                <Col width={[1, 1, 1, 1, 6 / 12]}>
                  <SectionTitle>{getInTouchData.title}</SectionTitle>
                </Col>
                <Col width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>
                  <BodyPrimary bold>{getInTouchData.copyHeading}</BodyPrimary>
                  <BodyPrimary noPaddingTop>{getInTouchData.copy}</BodyPrimary>

                  <StyledLink to="/contact/" title={getInTouchData.ctaText}>
                    {getInTouchData.ctaText}
                  </StyledLink>
                </Col>
              </Row>
            </Padding>
          </Grid>
        </GreyBackground>

        <Grid>
          <ConferenceRow>
            <Col width={[1]}>
              <ConferenceTitleWrap>
                <SectionTitle>Our Conferences</SectionTitle>
              </ConferenceTitleWrap>
            </Col>
            <Col width={[1]}>
              {conferences.edges && conferences.edges.length > 0 && (
                <ConferenceList events={conferences.edges} />
              )}
            </Col>
          </ConferenceRow>
        </Grid>
      </Layout>
    </LogoStyleContext.Provider>
  )
}

export const query = graphql`
  fragment Event on ContentfulMeetupEvent {
    startTime
    endTime
    date
    attendees
    type
    eventTitle
    address
    addressLine1
    addressLine2
    addressLine3
    city
    blurb {
      blurb
    }
    blurbCtaCopy
    blurbCtaLink
    homepageFeatured
    linkToEvent
    linkToTickets
    ctaText
    eventImage: eventPage {
      file {
        url
      }
      fluid(maxWidth: 600) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }

  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
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
      footerContactUs {
        id
      }
    }
    events: allContentfulMeetupEvent(
      sort: { fields: date, order: ASC }
      filter: { type: { in: ["Workshop", "Meetup"] } }
    ) {
      edges {
        node {
          ...Event
        }
      }
    }
    conferences: allContentfulMeetupEvent(
      sort: { fields: date, order: DESC }
      filter: { type: { eq: "Conference" } }
    ) {
      edges {
        node {
          ...Event
        }
      }
    }
  }
`

export default EventPage
