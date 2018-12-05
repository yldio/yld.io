import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import { Grid } from '../components/grid'

import Layout from '../components/layout'
import SEOText from '../components/Homepage/seoText'
import Companies from '../components/Homepage/companies'
import Blog from '../components/Homepage/blog'
import Events from '../components/Homepage/events'
import Jobs from '../components/Homepage/jobs'
import CaseStudy from '../components/Homepage/caseStudy'
import Specialty from '../components/Homepage/specialty'
import GrayBackground from '../components/GrayBG'

const IndexPage = ({
  data: { contentfulHomepage: content, allContentfulMeetupEvent: events, site }
}) => (
  <Layout>
    <Helmet
      title={`${site.siteMetadata.title} ${
        content.seoTitle ? '- ' + content.seoTitle : ''
      } `}
      meta={[{ name: 'description', content: content.seoMetaDescription }]}
    >
      <html lang="en" />
    </Helmet>
    <Grid>
      <Padding bottom={{ smallPhone: 0, tablet: 2, desktop: 2 }}>
        <CaseStudy
          caseStudy={content.featuredCaseStudy}
          subHeading="Featured work"
        />
      </Padding>
      <Padding bottom={{ smallPhone: 0, tablet: 2, desktop: 2 }} />
    </Grid>
    <GrayBackground>
      <Grid>
        <Padding top={{ smallPhone: 2 }} />
        <Padding top={{ smallPhone: 4, tablet: 5, desktop: 6 }} bottom={3}>
          <SEOText text={content.seoText.content[0].content} />
          <Padding bottom={{ smallPhone: 2, tablet: 4, desktop: 4 }} />
          <Companies companies={content.companies} />
        </Padding>
      </Grid>
    </GrayBackground>
    <Grid>
      <Padding top={3} bottom={{ smallPhone: 3.5, tablet: 5, desktop: 5 }}>
        <Specialty services={content.services} />
      </Padding>
    </Grid>
    <GrayBackground topOffset={-30}>
      <Grid>
        <Padding bottom={4}>
          <Events events={events.edges} />
        </Padding>
      </Grid>
    </GrayBackground>
    <Grid>
      <Padding top={2} />
      <Padding
        top={{ smallPhone: 3, tablet: 4 }}
        bottom={{ smallPhone: 3, tablet: 4 }}
      >
        <Blog />
      </Padding>
      <Padding bottom={{ smallPhone: 0, tablet: 2 }} />
    </Grid>
    <GrayBackground>
      <Grid>
        <Jobs />
        <Padding bottom={3} />
      </Grid>
    </GrayBackground>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

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
            ...GatsbyContentfulFluid_tracedSVG
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
          ... on ContentfulGenericCaseStudy {
            title
            slug
            posterColor
            posterImage {
              title
              file {
                url
              }
              fluid(maxWidth: 550) {
                ...GatsbyContentfulFluid_tracedSVG
              }
            }
          }
          ... on ContentfulCaseStudy {
            title
            slug
            posterColor
            posterImage {
              title
              file {
                url
              }
              fluid(maxWidth: 550) {
                ...GatsbyContentfulFluid_tracedSVG
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
          body {
            nodeType
          }
        }
      }
      companies {
        id
        title
        file {
          url
        }
        fluid(maxWidth: 250) {
          ...GatsbyContentfulFluid_tracedSVG
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
              ...GatsbyContentfulFluid_tracedSVG
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
