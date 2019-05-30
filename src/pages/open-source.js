import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Head from '../components/Common/Head'
import Layout from '../components/layout'
// import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import PartnershipsSection from '../components/OpenSource/Partnerships'

const OpenSource = ({ data }) => {
  const {
    contentfulOpenSourcePage: { title, slug, seoTitle, seoMetaDescription }
  } = data

  return (
    <Layout>
      <Head page={{ title, slug, seoTitle, seoMetaDescription }} />
      {/* <CaseStudyPreview caseStudy={} /> */}
      <PartnershipsSection />
      <p>open source page</p>
      {/* All the sections go herer */}
    </Layout>
  )
}

const OpenSourcePage = props => (
  <StaticQuery
    query={graphql`
      query {
        contentfulOpenSourcePage(slug: { eq: "open-source" }) {
          title
          slug
          seoTitle
          seoDescription
          statement
          technologyPartnersSectionTitle
          technologyPartners {
            name
            logoLightTheme {
              title
            }
            logoDarkTheme {
              title
            }
            url
            membershipLevel
            description
          }
          technologiesSectionTitle
        }
      }
    `}
    render={data => <OpenSource data={data} {...props} />}
  />
)

export default OpenSourcePage
