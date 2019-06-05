import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Head from '../components/Common/Head'
import Layout from '../components/layout'
import { Grid } from '../components/grid'
import EventSection from '../components/Common/Events'
import BlueBackground from '../components/Common/BlueBackground'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import Statement from '../components/Common/Statement'

import TalksSection from '../components/OpenSource/Talks'
import PartnershipsSection from '../components/OpenSource/Partnerships'
import WhyOpenSource from '../components/OpenSource/WhyOpenSource'
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
      talksSectionImage,
      talksSectionTitle,
      talksSectionTalks,
      talkSectionCtaText,
      talksSectionCtaLink,
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
      technologyPartners: partners,
      eventsSectionImage
    },
    allContentfulMeetupEvent: { edges: events }
  } = data

  const talks = talksSectionTalks.filter(({ type }) => type === 'Talk')

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
      <OpenDeliverables {...data} />
      <BlueBackground>
        <Contributions {...data} />
        {talks && talks.length && (
          <TalksSection
            icon={talksSectionImage}
            title={talksSectionTitle}
            talks={talks}
            ctaText={talkSectionCtaText}
            ctaLink={talksSectionCtaLink}
          />
        )}
        {partners && partners.length && (
          <PartnershipsSection
            title={technologyPartnersSectionTitle}
            partners={partners}
          />
        )}
      </BlueBackground>
      <EventSection
        events={events}
        title={title}
        eventIcon={eventsSectionImage.file.url}
      />
    </Layout>
  )
}

const OpenSourcePage = props => (
  <StaticQuery
    query={graphql`
      query {
        allContentfulMeetupEvent {
          edges {
            node {
              id
              eventTitle
              date
              linkToEvent
            }
          }
        }
        contentfulOpenSourcePage {
          title
          seoTitle
          seoDescription
          eventsSectionImage {
            id
            title
            file {
              fileName
              url
            }
          }
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
          talksSectionImage {
            title
            file {
              url
            }
          }
          talksSectionTitle
          talksSectionTalks {
            title
            type
            link
          }
          talkSectionCtaText
          talksSectionCtaLink
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
