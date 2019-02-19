import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/Common/Head'
import Subsidiaries from '../components/AboutUs/Subsidiaries'
import Teams from '../components/AboutUs/Teams'
import Partners from '../components/AboutUs/Partners'

const AboutUs = ({ data: { contentfulAboutUsPage: content } }) => {
  const {
    teamSectionTitle,
    teams,
    yldGroupTitle,
    subsidiaries,
    partnershipsTitle,
    partners
  } = content

  return (
    <Layout>
      <Head page={content} />
      <Teams title={teamSectionTitle} teams={teams} />
      <Subsidiaries title={yldGroupTitle} subsidiaries={subsidiaries} />
      <Partners partnershipsTitle={partnershipsTitle} partners={partners} />
    </Layout>
  )
}

const AboutUsPage = props => (
  <StaticQuery
    query={graphql`
      query {
        contentfulAboutUsPage {
          title
          seoTitle
          seoDescription
          teamSectionTitle
          teams {
            name
            members {
              name
              role
              description {
                description
              }
              image {
                title
                file {
                  url
                }
                fluid(maxWidth: 500) {
                  ...GatsbyContentfulFluid_tracedSVG
                }
              }
              socialLinks {
                name
                url
                image {
                  title
                  file {
                    url
                  }
                  fluid(maxWidth: 30) {
                    ...GatsbyContentfulFluid_withWebp
                  }
                }
              }
            }
          }
          yldGroupTitle
          subsidiaries {
            name
            description {
              description
            }
            image {
              title
              file {
                url
              }
              fluid(maxWidth: 250) {
                ...GatsbyContentfulFluid_tracedSVG
              }
            }
            linkUrl
            linkText
          }
          clientTestimonialTitle
          clientTestimonialVideo {
            title
            type
            link
          }
          partnershipsTitle
          partners {
            name
            url
            image {
              title
              file {
                url
              }
              fluid(maxWidth: 250) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    `}
    render={data => <AboutUs data={data} {...props} />}
  />
)

export default AboutUsPage
