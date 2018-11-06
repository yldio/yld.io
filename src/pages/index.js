import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'

import Layout from '../components/layout'
import SEOText from '../components/Homepage/seoText'
import Companies from '../components/Homepage/companies'
import Blog from '../components/Homepage/blog'
import Events from '../components/Homepage/events'
import Jobs from '../components/Homepage/jobs'
import CaseStudy from '../components/Homepage/caseStudy'
import Specialty from '../components/Homepage/specialty'

const IndexPage = ({
  data: {
    contentfulHomepage: content,
    allContentfulMeetupEvent: events,
    site
  }
}) => (
  <Layout>
    <Helmet
      title={`${site.siteMetadata.title} - ${content.seoTitle} - ${content.seoPageTitle} `}
      meta={[
        { name: 'description', content: content.seoMetaDescription },
        { name: 'keywords', content: content.seoMetaKeywords }
      ]}
    >
      <html lang="en" />
    </Helmet>
    <CaseStudy caseStudy={content.pIckedCaseStudy} />
    <Padding bottom={6} />
    <Padding bottom={4} />
    <SEOText text={content.seoText.content[0].content} />
    <Padding bottom={4} />
    <Companies companies={content.companies} />
    <Padding bottom={5} />
    <Specialty services={content.services} />
    <Padding top={5} />
    <Events events={events.edges} />
    <Padding top={5} bottom={4} />
    <Blog />
    <Jobs />
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
      seoTitle
      seoPageTitle
      seoMetaDescription
      seoMetaKeywords
      pIckedCaseStudy {
        title
        slug
        posterImage {
          file {
            url
          }
        }
        posterColor
        body {
          content {
            content {
              value
              nodeType
            }
          }
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
        caseStudies {
          title
          posterColor
          posterImage {
            file {
              url
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
