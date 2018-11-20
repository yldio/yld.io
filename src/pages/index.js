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
      title={`${site.siteMetadata.title} ${
        content.seoTitle ? '- ' + content.seoTitle : ''
      } `}
      meta={[{ name: 'description', content: content.seoMetaDescription }]}
    >
      <html lang="en" />
    </Helmet>
    <Grid className="grid">
      <Padding bottom={{ phone: 0, tablet: 2, desktop: 2 }}>
        <CaseStudy
          caseStudy={content.featuredCaseStudy}
          subHeading="Featured work"
        />
      </Padding>
      <Padding bottom={{ phone: 0, tablet: 2, desktop: 2 }} />
    </Grid>
    <GrayBackground>
      <Grid className="grid">
        <Padding top={{ phone: 2 }} />
        <Padding top={{ phone: 4, tablet: 5, desktop: 6 }} bottom={3}>
          <SEOText text={content.seoText.content[0].content} />
          <Padding bottom={{ phone: 2, tablet: 4, desktop: 4 }} />
          <Companies companies={content.companies} />
        </Padding>
      </Grid>
    </GrayBackground>
    <div style={{ backgroundColor: 'white' }}>
      <Grid className="grid">
        <Padding top={3} bottom={{ phone: 3.5, tablet: 5, desktop: 5 }}>
          <Specialty services={content.services} />
        </Padding>
      </Grid>
    </div>
    <GrayBackground topOffset={-30}>
      <Grid className="grid">
        <Padding bottom={4}>
          <Events events={events.edges} />
        </Padding>
      </Grid>
    </GrayBackground>
    <Grid className="grid">
      <Padding top={2} />
      <Padding top={{ phone: 3, tablet: 4 }} bottom={{ phone: 3, tablet: 4 }}>
        <Blog />
      </Padding>
      <Padding bottom={{ phone: 0, tablet: 2 }} />
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
          title
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
              title
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
              title
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
        title
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
            title
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
