import React from 'react'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import { Grid } from '../components/grid'
import Head from '../components/Common/Head'
import Layout from '../components/layout'
import SEOText from '../components/Homepage/seoText'
import Companies from '../components/Homepage/companies'
import Blog from '../components/Homepage/blog'
import Events from '../components/Homepage/events'
import Jobs from '../components/Homepage/jobs'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import Services from '../components/Homepage/services'
import GreyBackground from '../components/GreyBG'

const IndexPage = ({
  data: { contentfulHomepage: content, allContentfulMeetupEvent: events },
  location
}) => (
  <Layout location={location}>
    <Head page={content} />
    <Grid>
      <Padding bottom={{ smallPhone: 0, smallTablet: 2, desktop: 2 }}>
        <CaseStudyPreview
          caseStudy={content.featuredCaseStudy}
          subHeading="Featured work"
        />
      </Padding>
      <Padding bottom={{ smallPhone: 0, desktop: 2 }} />
    </Grid>
    <GreyBackground topMargin>
      <Grid>
        <Padding top={{ smallPhone: 2 }} />
        <Padding top={{ smallPhone: 4, smallTablet: 5, desktop: 6 }} bottom={3}>
          <SEOText text={content.seoText.content[0].content} />
          <Padding bottom={{ smallPhone: 2, smallTablet: 4, desktop: 4 }} />
          <Companies companies={content.companies} />
        </Padding>
      </Grid>
    </GreyBackground>
    <Grid>
      <Services services={content.services} />
    </Grid>
    <GreyBackground topMargin>
      <Grid pt={4}>
        <Padding bottom={{ smallPhone: 3.5, smallTablet: 3.5 }}>
          <Events events={events.edges} />
        </Padding>
      </Grid>
    </GreyBackground>
    <Grid>
      <Padding
        top={{ smallPhone: 3, smallTablet: 4 }}
        bottom={{ smallPhone: 3.5, smallTablet: 3.5 }}
      >
        <Blog />
      </Padding>
    </Grid>
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
          ...GatsbyContentfulFluid_withWebp
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
