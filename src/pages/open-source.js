import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Head from '../components/Common/Head'
import Layout from '../components/layout'
import { Grid } from '../components/grid'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import Statement from '../components/Common/Statement'
import PartnershipsSection from '../components/OpenSource/Partnerships'
import WhyOpenSource from '../components/OpenSource/WhyOpenSource'

const OpenSource = ({ data }) => {
  const {
    contentfulOpenSourcePage: {
      title,
      seoTitle,
      seoMetaDescription,
      featuredCaseStudy,
      statement,
      whyOsSectionTitle,
      whyOsSectionReason1Image,
      whyOsSectionReason1Title,
      whyOsSectionReason1Body,
      whyOsSectionReason2Image,
      whyOsSectionReason2Title,
      whyOsSectionReason2Body,
      whyOsSectionReason3Image,
      whyOsSectionReason3Title,
      whyOsSectionReason3Body,
      whyOsSectionClientsSubtitle,
      whyOsSectionClients,
      technologyPartnersSectionTitle,
      technologyPartners
    }
  } = data

  const whyOsReasons = [
    {
      image: whyOsSectionReason1Image,
      title: whyOsSectionReason1Title,
      body: whyOsSectionReason1Body.whyOsSectionReason1Body
    },
    {
      image: whyOsSectionReason2Image,
      title: whyOsSectionReason2Title,
      body: whyOsSectionReason2Body.whyOsSectionReason2Body
    },
    {
      image: whyOsSectionReason3Image,
      title: whyOsSectionReason3Title,
      body: whyOsSectionReason3Body.whyOsSectionReason3Body
    }
  ]

  return (
    <Layout>
      <Head page={{ title, seoTitle, seoMetaDescription }} />
      <CaseStudyPreview isTop caseStudy={featuredCaseStudy} />
      <Statement>{statement}</Statement>
      <WhyOpenSource
        title={whyOsSectionTitle}
        list={whyOsReasons}
        subtitle={whyOsSectionClientsSubtitle}
        companies={whyOsSectionClients}
      />
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
          whyOsSectionTitle
          whyOsSectionReason1Image {
            title
            file {
              url
            }
            fluid(maxWidth: 30) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          whyOsSectionReason1Title
          whyOsSectionReason1Body {
            whyOsSectionReason1Body
          }
          whyOsSectionReason2Image {
            title
            file {
              url
            }
            fluid(maxWidth: 30) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          whyOsSectionReason2Title
          whyOsSectionReason2Body {
            whyOsSectionReason2Body
          }
          whyOsSectionReason3Image {
            title
            file {
              url
            }
            fluid(maxWidth: 30) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          whyOsSectionReason3Title
          whyOsSectionReason3Body {
            whyOsSectionReason3Body
          }
          whyOsSectionClientsSubtitle
          whyOsSectionClients {
            id
            title
            file {
              url
            }
            fluid(maxWidth: 250) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
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
