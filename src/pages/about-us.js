import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/Common/Head'
import AboutUsHero from '../components/AboutUs/AboutUsHero'
import Teams from '../components/AboutUs/Teams'
import Subsidiaries from '../components/AboutUs/Subsidiaries'
import ClientTestimonial from '../components/AboutUs/ClientTestimonial'
import Partners from '../components/AboutUs/Partners'

const AboutUs = ({ data: { contentfulAboutUsPage: content } }) => {
  const {
    statementText,
    supportingStatement1Icon,
    supportingStatement1Text,
    supportingStatement2Icon,
    supportingStatement2Text,
    supportingStatement3Icon,
    supportingStatement3Text,
    teamSectionTitle,
    teams,
    yldGroupTitle,
    subsidiaries,
    clientTestimonialTitle,
    clientTestimonialVideo,
    partnershipsTitle,
    partners
  } = content

  const supportingStatements = [
    {
      icon: supportingStatement1Icon,
      text: supportingStatement1Text
    },
    {
      icon: supportingStatement2Icon,
      text: supportingStatement2Text
    },
    {
      icon: supportingStatement3Icon,
      text: supportingStatement3Text
    }
  ]

  return (
    <Layout>
      <Head page={content} />
      <AboutUsHero
        statementText={statementText}
        supportingStatements={supportingStatements}
      />
      <Teams title={teamSectionTitle} teams={teams} />
      <Subsidiaries title={yldGroupTitle} subsidiaries={subsidiaries} />
      <ClientTestimonial
        title={clientTestimonialTitle}
        video={clientTestimonialVideo}
      />
      <Partners title={partnershipsTitle} partners={partners} />
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
          statementText
          supportingStatement1Icon {
            title
            file {
              url
            }
            fluid(maxWidth: 30) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          supportingStatement1Text
          supportingStatement2Icon {
            title
            file {
              url
            }
            fluid(maxWidth: 30) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          supportingStatement2Text
          supportingStatement3Icon {
            title
            file {
              url
            }
            fluid(maxWidth: 30) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          supportingStatement3Text
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
                  ...GatsbyContentfulFluid_withWebp
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
