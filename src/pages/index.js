import React from 'react'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
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

const IndexPage = ({
  data: { contentfulHomepage: content, allContentfulMeetupEvent: events },
  location
}) => (
  <Layout location={location}>
    <Head page={content} />
    <CaseStudyPreview caseStudy={content.featuredCaseStudy} />
    <GreyBackground>
      <Grid>
        <Padding top={{ smallPhone: 4 }} bottom={3}>
          <Statement noPadding richText={content.seoText.content[0].content} />
          <Padding bottom={{ smallPhone: 2, smallTablet: 4, desktop: 4 }} />
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
          <Events events={events.edges} />
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
      <Padding bottom={{ smallPhone: 1.5, smallTablet: 0 }} />
    </GreyBackground>
  </Layout>
)

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
