import React from 'react'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import { format, isAfter, isSameDay, endOfYesterday } from 'date-fns'

import { Grid } from '../components/grid'
import Layout from '../components/layout'
import Head from '../components/Common/Head'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import GreyBackground from '../components/Common/GreyBackground'
import Statement from '../components/Common/Statement'
import LogoGrid from '../components/Common/LogoGrid'
import Services from '../components/Homepage/services'
import Events from '../components/Homepage/events/index'
import LatestPosts from '../components/LatestPosts'
import BlogListing from '../components/Common/BlogListing'
import Jobs from '../components/Homepage/jobs'

const getHomepageMeetups = (events = []) =>
  events
    .filter(
      n => !n.node.homepageFeatured && isAfter(n.node.date, endOfYesterday())
    )
    .sort((a, b) => (a.node.date <= b.node.date ? -1 : 1))
    .slice(0, 5)
    .map(n => ({
      ...n.node,
      date: format(n.node.date, 'MMMM DD[,] dddd')
    }))

const getFeaturedEventDate = ({ node: { date, endTime } }) => {
  const dateFormat = 'MMMM DD[,] dddd'

  return !isSameDay(date, endTime) && isAfter(endTime, date)
    ? `${format(date, dateFormat)} - ${format(endTime, dateFormat)}`
    : format(date, 'MMMM DD[,] dddd')
}

const getHomepageConferences = (events = []) =>
  events
    .filter(n => n.node.homepageFeatured)
    .slice(0, 1)
    .map(n => ({
      ...n.node,
      date: getFeaturedEventDate(n)
    }))

const IndexPage = ({
  data: { contentfulHomepage: content, allContentfulMeetupEvent: events },
  location
}) => {
  const featuredEvent = getHomepageConferences(events.edges)[0]
  const nonFeaturedEvents = getHomepageMeetups(events.edges)

  return (
    <Layout location={location}>
      <Head page={content} />
      <CaseStudyPreview as="h1" caseStudy={content.featuredCaseStudy} />
      <Statement richText={content.seoText.content[0].content} />
      <GreyBackground>
        <Grid>
          <Padding bottom={{ smallPhone: 2, smallTablet: 4, desktop: 4 }}>
            <LogoGrid companies={content.companies} />
          </Padding>
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
        introSentence
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
