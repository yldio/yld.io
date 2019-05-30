import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Head from '../components/Common/Head'
import Layout from '../components/layout'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'

import Contributions from '../components/OpenSource/Contributions'
import OpenDeliverables from '../components/OpenSource/OpenDeliverables'

const OpenSource = ({ data }) => {
  return (
    <Layout>
      {/* <Head page={} />  */}
      {/* <CaseStudyPreview caseStudy={} /> */}
      <p>open source page</p>
      <OpenDeliverables {...data} />
      <Contributions {...data} />
      {/* All the sections go herer */}
    </Layout>
  )
}

const OpenSourcePage = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        contentfulOpenSourcePage {
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
