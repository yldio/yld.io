import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import { Grid } from 'react-styled-flexboxgrid'

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
      title={`${site.siteMetadata.title}  ${
        content.title ? '- ' + content.title : ''
      } ${content.seoTitle ? '- ' + content.seoTitle : ''} `}
      meta={[{ name: 'description', content: content.seoMetaDescription }]}
    >
      <html lang="en" />
    </Helmet>
    <Grid className="grid">
      <Padding bottom={{ mobile: 0, tablet: 2, desktop: 2 }}>
        <CaseStudy caseStudy={content.featuredCaseStudy} />
      </Padding>
      <Padding bottom={{ mobile: 0, tablet: 2, desktop: 2 }} />
    </Grid>
    <GrayBackground>
      <Grid className="grid">
        <Padding top={{ mobile: 2 }} />
        <Padding top={{ mobile: 4, tablet: 5, desktop: 6 }} bottom={2}>
          <SEOText text={content.seoText.content[0].content} />
          <Padding bottom={4} />
          <Companies companies={content.companies} />
        </Padding>
      </Grid>
    </GrayBackground>
    <Grid className="grid">
      <Padding top={2} />
      <Padding top={3} bottom={5}>
        <Specialty services={content.services} />
      </Padding>
    </Grid>
    <GrayBackground topOffset={-30}>
      <Grid className="grid">
        <Padding bottom={4}>
          <Events events={events.edges} />
        </Padding>
      </Grid>
    </GrayBackground>
    <Grid className="grid">
      <Padding top={2} />
      <Padding top={3} bottom={4}>
        <Blog />
      </Padding>
      <Padding bottom={2} />
    </Grid>
    <GrayBackground>
      <Grid className="grid">
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
          file {
            url
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
        caseStudies {
          ... on ContentfulGenericCaseStudy {
            title
            slug
            posterColor
            posterImage {
              file {
                url
              }
            }
          }
          ... on ContentfulCaseStudy {
            title
            slug
            posterColor
            posterImage {
              file {
                url
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
        file {
          url
          fileName
        }
      }
    }
    allContentfulMeetupEvent {
      edges {
        node {
          color
          posterImage {
            file {
              url
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
