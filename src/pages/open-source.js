import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import getIntroSentence from '../utils/getIntroSentence'
import Head from '../components/Common/Head'
import Layout from '../components/layout'
import { Grid } from '../components/grid'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import Statement from '../components/Common/Statement'
import PartnershipsSection from '../components/OpenSource/Partnerships'

const OpenSource = ({ data }) => {
  const {
    contentfulOpenSourcePage: {
      title,
      seoTitle,
      seoMetaDescription,
      featuredCaseStudy,
      statement,
      technologyPartnersSectionTitle,
      technologyPartners
    }
  } = data

  return (
    <Layout>
      <Head page={{ title, seoTitle, seoMetaDescription }} />
      <CaseStudyPreview isTop caseStudy={featuredCaseStudy} />
      <Statement>{statement}</Statement>
      <PartnershipsSection
        title={technologyPartnersSectionTitle}
        partners={technologyPartners}
      />
    </Layout>
  )
}

const OpenSourcePage = props => (
  <StaticQuery
    query={graphql`
      query {
        contentfulOpenSourcePage {
          title
          seoTitle
          seoDescription
          featuredCaseStudy {
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
            introSentence {
              introSentence
            }
          }
          statement
          technologyPartnersSectionTitle
          technologiesSectionTitle
          technologyPartners {
            name
            logoLightTheme {
              title
              file {
                url
              }
            }
            logoDarkTheme {
              title
              file {
                url
              }
            }
            url
            membershipLevel
            description
          }
        }
      }
    `}
    render={data => <OpenSource data={data} {...props} />}
  />
)

export default OpenSourcePage
