import React from 'react'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import { format, isAfter, isSameDay, endOfYesterday } from 'date-fns'
import { Grid } from '../components/grid'
import Layout from '../components/layout'
import Head from '../components/Common/Head'
import GreyBackground from '../components/Common/GreyBackground'
import LogoGrid from '../components/Common/LogoGrid'
import Services from '../components/Homepage/services'
import Intro from '../components/Homepage/Intro'
import OurWork from '../components/Homepage/OurWork'
import Events from '../components/Homepage/events/index'
import LatestPosts from '../components/LatestPosts'
import BlogListing from '../components/Common/BlogListing'
import Jobs from '../components/Homepage/jobs'

/**
 * Importing fragments here to have them available to the entire
 * GraphQL schema
 */
// eslint-disable-next-line no-unused-vars
import { fragments } from '../fragments'

const dateFormat = 'dddd[,] MMMM DD'

const getHomepageMeetups = (events = []) =>
  events
    .filter(
      n => !n.node.homepageFeatured && isAfter(n.node.date, endOfYesterday())
    )
    .sort((a, b) => (a.node.date <= b.node.date ? -1 : 1))
    .slice(0, 5)
    .map(n => ({
      ...n.node,
      date: format(n.node.date, dateFormat)
    }))

const getFeaturedEventDate = ({ node: { date, endTime } }) =>
  !isSameDay(date, endTime) && isAfter(endTime, date)
    ? `${format(date, dateFormat)} - ${format(endTime, dateFormat)}`
    : format(date, dateFormat)

const getHomepageConferences = (events = []) =>
  events
    .filter(n => n.node.homepageFeatured)
    .slice(0, 1)
    .map(n => ({
      ...n.node,
      date: getFeaturedEventDate(n)
    }))

const IndexPage = ({ data, location }) => {
  const { contentfulHomepage: content, allContentfulMeetupEvent: events } = data

  const featuredEvent = getHomepageConferences(events.edges)[0]
  const nonFeaturedEvents = getHomepageMeetups(events.edges)

  return (
    <Layout
      location={location}
      footerContactUsId={content.footerContactUs.id}
      bgColor="blueBg"
    >
      <Head seoMetaData={content.seoMetaData} />
      <Intro {...content} />
      <GreyBackground>
        <Grid>
          <OurWork />
          <LogoGrid companies={content.companies} />
        </Grid>
      </GreyBackground>
      <Grid>
        <Services services={content.services} />
      </Grid>
      <GreyBackground>
        <Grid>
          <Padding bottom={{ smallPhone: 4, smallTablet: 5 }} top={4}>
            <Events
              nonFeaturedEvents={nonFeaturedEvents}
              featuredEvent={featuredEvent}
            />
          </Padding>
        </Grid>
      </GreyBackground>
      <LatestPosts>
        {posts => (
          <BlogListing
            title="From the blog"
            posts={posts.map(({ node }) => node).slice(0, 3)}
          />
        )}
      </LatestPosts>
      <GreyBackground>
        <Jobs />
      </GreyBackground>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulHomepage {
      title
      seoTitle
      seoMetaDescription
      seoMetaData {
        ...SEOMetaFields
      }
      introHeader
      introContent {
        introContent
      }
      introCtaText
      introCtaLink
      featuredCaseStudy {
        id
        title
        slug
        posterImage {
          title
          file {
            url
          }
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        posterColor
        introSentence {
          introSentence
        }
      }
      seoText {
        content {
          content {
            data {
              uri
            }
            value
            content {
              value
              nodeType
            }
            nodeType
          }
        }
      }
      services {
        id
        title
        slug
        pageReady
        caseStudies {
          ... on Node {
            ... on ContentfulNonTemplatedCaseStudy {
              title
              slug
              posterColor
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 550) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
            ... on ContentfulNonTemplatedCaseStudyV2 {
              title
              slug
              posterColor
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 550) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
            ... on ContentfulTemplatedCaseStudy {
              title
              slug
              posterColor
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 550) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
        introSentence {
          introSentence
        }
        homePageSpecialities {
          id
          slug
          title
        }
      }
      companies {
        id
        title
        file {
          url
        }
        fluid(maxWidth: 250) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
      footerContactUs {
        id
      }
    }
    allContentfulMeetupEvent {
      edges {
        node {
          color
          posterImage {
            title
            file {
              url
            }
            fluid(maxWidth: 610) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          homepageFeatured
          id
          eventTitle
          date
          endTime
          ctaText
          linkToEvent
          blurb {
            blurb
          }
        }
      }
    }
  }
`

export default IndexPage
