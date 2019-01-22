import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'
import ViewPositions from '../components/JoinUs/ViewOpenPositions'
import Learning from '../components/JoinUs/Learning'
import Work from '../components/JoinUs/Work'
import OSS from '../components/JoinUs/OpenSource'
import Perks from '../components/JoinUs/Perks'
import OpenPositions from '../components/JoinUs/OpenPositions'

class JoinUs extends Component {
  render() {
    const { site, contentfulJoinUsPage: content } = this.props.data

    return (
      <Layout>
        <Helmet
          title={`${site.siteMetadata.title} ${
            content.seoTitle ? '- ' + content.seoTitle : ''
          } `}
          meta={[{ name: 'description', content: content.seoMetaDescription }]}
        >
          <html lang="en" />
        </Helmet>
        <ViewPositions text={content.introductionText.introductionText} />
        <Learning
          data={{
            title: content.learningTitle,
            list: content.learningText.learningText,
            subtitle: content.insightsTitle,
            text: content.insightsDescriptionText.insightsDescriptionText,
            featuredInsights: content.insights
          }}
        />
        <Work
          data={{
            title: content.challengingTitle,
            list: content.challengingText.challengingText,
            subtitle: content.someOfOurWorkTitle,
            text: content.someOfOurWorkDescription.someOfOurWorkDescription,
            someWork: content.someWork
          }}
        />
        <OSS
          data={{
            title: content.ossTitle,
            list: content.ossText.ossText,
            subtitle: content.talksTitle,
            text: content.talksText.talksText,
            featuredTalks: content.talks
          }}
        />
        <Perks
          data={{
            title: content.perksTitle,
            text: content.perksText.perksText,
            perks: content.perks
          }}
        />
        <OpenPositions
          data={{
            title: content.openPositionsTitle,
            directApplicationTitle: content.directApplicationTitle,
            text: content.directApplicationText.directApplicationText
          }}
        />
      </Layout>
    )
  }
}

const JoinUsPage = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        contentfulJoinUsPage {
          title
          seoTitle
          introductionText {
            introductionText
          }
          learningTitle
          learningText {
            learningText
          }
          insightsTitle
          insightsDescriptionText {
            insightsDescriptionText
          }
          insights {
            name
            title
            url
            image {
              title
              file {
                url
              }
              fluid(maxWidth: 600) {
                ...GatsbyContentfulFluid_tracedSVG
              }
            }
          }
          challengingTitle
          challengingText {
            challengingText
          }
          someOfOurWorkTitle
          someOfOurWorkDescription {
            someOfOurWorkDescription
          }
          someWork {
            ... on ContentfulTemplatedCaseStudy {
              title
              slug
              posterColor
            }
            ... on ContentfulNonTemplatedCaseStudy {
              title
              slug
              posterColor
            }
          }
          ossTitle
          ossText {
            ossText
          }
          talksTitle
          talksText {
            talksText
          }
          talks {
            title
            link
          }
          perksTitle
          perksText {
            perksText
          }
          perks {
            description {
              description
            }
            icon {
              file {
                url
                fileName
                contentType
              }
              fluid(maxWidth: 40) {
                ...GatsbyContentfulFluid_tracedSVG
              }
            }
          }
          openPositionsTitle
          directApplicationTitle
          directApplicationText {
            directApplicationText
          }
        }
      }
    `}
    render={data => <JoinUs data={data} {...props} />}
  />
)

export default JoinUsPage
