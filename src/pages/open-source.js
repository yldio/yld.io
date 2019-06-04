import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Head from '../components/Common/Head'
import Layout from '../components/layout'
import BlueBackground from '../components/Common/BlueBackground'
import { Grid } from '../components/grid'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import Statement from '../components/Common/Statement'

import PartnershipsSection from '../components/OpenSource/Partnerships'

import Contributions from '../components/OpenSource/Contributions'
import OpenDeliverables from '../components/OpenSource/OpenDeliverables'

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
      <OpenDeliverables {...data} />
      <BlueBackground>
        <Contributions {...data} />
        <PartnershipsSection
          title={technologyPartnersSectionTitle}
          partners={technologyPartners}
        />
      </BlueBackground>
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
