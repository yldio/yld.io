import React from 'react'
import { graphql } from 'gatsby'
import { format, isAfter, isSameDay } from 'date-fns'

import { Grid } from '../components/grid'
import Layout from '../components/layout'
import Head from '../components/Common/Head'
import GreyBackground from '../components/Common/GreyBackground'
import LogoGrid from '../components/Common/LogoGrid'
import Services from '../components/Homepage/services'
import Intro from '../components/Homepage/Intro'
import OurWork from '../components/Homepage/OurWork'
import Events from '../components/Homepage/events'
import BlogSection from '../components/Homepage/BlogSection'
import FooterSections from '../components/Homepage/FooterSections'
import BlueBackground from '../components/Common/BlueBackground'
import Contributions from '../components/Common/Contributions'

import { HomePageContext, LogoStyleContext } from '../context/PageContext'

/**
 * Importing fragments here to have them available to the entire
 * GraphQL schema
 */
// eslint-disable-next-line no-unused-vars
import { fragments } from '../fragments'

const dateFormat = 'dddd[,] MMMM DD'

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

/**
 * Because this is the home page and needs to be a
 * great looking page, a lot of work on diverts
 * from the normal practises that  are used throughout
 * the rest of the site.
 *
 * Specifically the hero section, a lot of this
 * has custom CSS to get it the way that we want it.
 */
const IndexPage = ({ data, location }) => {
  const {
    contentfulHomepage: content,
    allContentfulMeetupEvent: events,
    allContentfulBlogPost: blogData
  } = data

  const sortedServices = content.services.sort((a, b) => a.order - b.order)
  const blogPosts = blogData.edges || []
  const featuredEvent = getHomepageConferences(events.edges)[0]
  return (
    <HomePageContext.Provider value={true}>
      <LogoStyleContext.Provider value="white">
        <Layout location={location} bgColor="blueBg">
          <Head seoMetaData={content.seoMetaData} />
          <Intro {...content} />
          <GreyBackground>
            <Grid>
              <OurWork />
              <LogoGrid companies={content.companies} />
            </Grid>
          </GreyBackground>
          <Grid>
            <Services
              statement={content.serviceStatement}
              services={sortedServices}
            />
          </Grid>
          <GreyBackground>
            <Events
              featuredEvent={featuredEvent}
              eventTypes={content.eventTypes}
            />
          </GreyBackground>
          {blogPosts && blogPosts.length > 0 && (
            <BlogSection blogPosts={blogPosts} />
          )}
          <BlueBackground>
            <Contributions {...content.contributions} />
          </BlueBackground>
          <GreyBackground>
            <FooterSections {...content} />
          </GreyBackground>
        </Layout>
      </LogoStyleContext.Provider>
    </HomePageContext.Provider>
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
      serviceStatement
      services {
        id
        title
        slug
        pageReady
        order
        icon {
          file {
            url
          }
          title
          fluid(maxWidth: 60) {
            ...GatsbyContentfulFluid_withWebp
          }
        }

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
      contributions: contributionsSection {
        githubMetaData {
          openSourceMetaPullRequestsCount
          openSourceMetaReposCount
        }
        ctaCopy
        ctaLink
        descriptionLine1
        descriptionLine2
        titleSectionLine1
        titleSectionLine2
        titleSectionLine3
        icon {
          title
          file {
            url
          }
        }
        sectionGraphic {
          title
          file {
            url
          }
        }
        descriptionLine1
        descriptionLine2
        ctaCopy
        ctaLink
        githubRepos {
          id
          url
          nameWithOwner
          pullRequestCount
          starCount
        }
      }
      footerSection1Icon {
        file {
          url
        }
        title
      }
      footerSection1Title
      footerSection1Copy
      footerSection1CtaCopy
      footerSection1CtaLink
      footerSection2Icon {
        file {
          url
        }
        title
      }
      footerSection2Title
      footerSection2Copy
      footerSection2CtaCopy
      footerSection2CtaLink
      eventTypes {
        title
        copy
        image {
          fluid(maxWidth: 500) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
    allContentfulBlogPost(
      limit: 3
      sort: { fields: [firstPublishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          title
          firstPublishedAt
          slug
          imageId
          authorId
          authorName
          subtitle {
            subtitle
          }
        }
      }
    }

    allContentfulMeetupEvent {
      edges {
        node {
          color
          mobilePosterImage {
            title
            file {
              url
            }
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          desktopPosterImage {
            title
            file {
              url
            }
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
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
