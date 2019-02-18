import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/Common/Head'
import SubsidiariesSection from '../components/AboutUs/SubsidiariesSection'

const AboutUs = ({ data: { contentfulAboutUsPage: content } }) => {
  const { yldGroupTitle, subsidiaries } = content

  return (
    <Layout>
      <Head page={content} />
      <SubsidiariesSection
        yldGroupTitle={yldGroupTitle}
        subsidiaries={subsidiaries}
      />
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
            description {
              description
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
            }
          }
        }
      }
    `}
    render={data => <AboutUs data={data} {...props} />}
  />
)

export default AboutUsPage
