import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/Common/Head'

const AboutUs = ({ data: { contentfulAboutUsPage: content } }) => (
  <Layout>
    <Head page={content} />
  </Layout>
)

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
              image {
                title
                file {
                  url
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
                }
              }
            }
          }
          yldGroupTitle
          subsidiaries {
            name
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
            }
          }
        }
      }
    `}
    render={data => <AboutUs data={data} {...props} />}
  />
)

export default AboutUsPage
