import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Head from '../components/Common/Head'
import Layout from '../components/layout'
// import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import PartnershipsSection from '../components/OpenSource/Partnerships'

import Contributions from '../components/OpenSource/Contributions'
import OpenDeliverables from '../components/OpenSource/OpenDeliverables'

const OpenSource = ({ data }) => {
  const {
    contentfulOpenSourcePage: {
      title,
      slug,
      seoTitle,
      seoMetaDescription,
      technologyPartnersSectionTitle,
      technologyPartners
    }
  } = data

  return (
    <Layout>
      <Head page={{ title, slug, seoTitle, seoMetaDescription }} />
      {/* <CaseStudyPreview caseStudy={} /> */}
      <PartnershipsSection
        title={technologyPartnersSectionTitle}
        partners={technologyPartners}
      />
      <OpenDeliverables {...data} />
      <Contributions {...data} />
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
            openDeliverablesSectionTitle
            openDeliverablesClientReposSubtitle
            openDeliverablesSectionDescription {
              openDeliverablesSectionDescription
            }
            openDeliverablesClientRepos {
              id
              url
              nameWithOwner
              pullRequestCount
              starCount
            }
            contributionsSectionTitleLine1
            contributionsSectionTitleLine2
            contributionsSectionTitleLine3
            openSourceMetaRepoCount
            openSourceMetaPullRequestCount
            contributionsSectionImage {
              title
              file {
                url
              }
              fluid(maxWidth: 250) {
                ...GatsbyContentfulFluid_tracedSVG
              }
            }
            contributionsSectionDescription
            contributionsSectionCtaText
            contributionsSectionCtaLink
            contributionsSectionGithubRepos {
              id
              url
              nameWithOwner
              pullRequestCount
              starCount
            }
          }
        }
    `}
    render={data => <OpenSource data={data} {...props} />}
  />
)

export default OpenSourcePage
