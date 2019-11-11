import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import generateBreadcrumbData from '../utils/generateBreadcrumbData'
import Head from '../components/Common/Head'
import Layout from '../components/layout'
import { Grid, Row, Col } from '../components/grid'
import EventSection from '../components/Common/Events'
import BlueBackground from '../components/Common/BlueBackground'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import Statement from '../components/Common/Statement'
import SeoLinksContainer from '../components/Common/seoLinksContainer'
import Hr from '../components/Common/Hr'
import Contributions from '../components/Common/Contributions'

import TalksSection from '../components/OpenSource/Talks'
import PartnershipsSection from '../components/OpenSource/Partnerships'
import WhyOpenSource from '../components/OpenSource/WhyOpenSource'
import OpenDeliverables from '../components/OpenSource/OpenDeliverables'

const StyledHr = styled(Hr)`
  border-color: #848194;
`

const OpenSource = ({ data, location }) => {
  const {
    contentfulOpenSourcePage: {
      seoMetaData,
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
      technologiesSectionTitle,
      technologiesSectionTechnologies,
      technologyPartnersSectionTitle,
      technologyPartners: partners,
      eventsSectionImage,
      eventsSectionDescription,
      footerContactUs: { id: footerContactId },
      contributionsSection: contributions,
    },
    allContentfulMeetupEvent: { nodes: events },
    site: {
      siteMetadata: { siteUrl },
    },
  } = data

  const talks = talksSectionTalks.filter(({ type }) => type === 'Talk')

  const whyOsReasons = [
    {
      image: whyOsSectionReason1Image,
      title: whyOsSectionReason1Title,
      body: whyOsSectionReason1Body.whyOsSectionReason1Body,
    },
    {
      image: whyOsSectionReason2Image,
      title: whyOsSectionReason2Title,
      body: whyOsSectionReason2Body.whyOsSectionReason2Body,
    },
    {
      image: whyOsSectionReason3Image,
      title: whyOsSectionReason3Title,
      body: whyOsSectionReason3Body.whyOsSectionReason3Body,
    },
  ]

  const specialities = technologiesSectionTechnologies.map(
    ({ name, specialities }) => ({
      title: name,
      items: specialities,
    }),
  )

  const breadcrumbData = generateBreadcrumbData(siteUrl, [
    {
      name: 'Open source',
      pathname: location.pathname,
      position: 2,
    },
  ])

  return (
    <Layout
      location={location}
      slug={'open-source'}
      footerContactUsId={footerContactId}
      breadcrumbData={breadcrumbData}
    >
      <Head seoMetaData={seoMetaData} />
      <CaseStudyPreview isTop caseStudy={featuredCaseStudy} />
      <Statement as="h1">{statement}</Statement>
      <WhyOpenSource
        title={whyOsSectionTitle}
        list={whyOsReasons}
        subtitle={whyOsSectionClientsSubtitle}
        companies={whyOsSectionClients}
      />
      <OpenDeliverables {...data} />
      <BlueBackground>
        <Contributions {...contributions} />
        <Grid>
          <Row>
            <Col width={[1]}>
              <StyledHr />
            </Col>
          </Row>
        </Grid>
        {talks && talks.length && (
          <TalksSection
            icon={talksSectionImage}
            title={talksSectionTitle}
            talks={talks}
            ctaText={talkSectionCtaText}
            ctaLink={talksSectionCtaLink}
          />
        )}
      </BlueBackground>
      <EventSection
        events={events}
        description={eventsSectionDescription}
        eventIcon={eventsSectionImage.file.url}
      />
      <BlueBackground>
        {partners && partners.length && (
          <PartnershipsSection
            title={technologyPartnersSectionTitle}
            partners={partners}
          />
        )}
      </BlueBackground>

      {specialities && specialities.length && (
        <SeoLinksContainer
          specialities={specialities}
          sectionTitle={technologiesSectionTitle}
        />
      )}
    </Layout>
  )
}

const OpenSourcePage = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allContentfulMeetupEvent {
          nodes {
            id
            eventTitle
            date
            linkToEvent
          }
        }
        contentfulOpenSourcePage {
          title
          seoDescription
          seoMetaData {
            ...SEOMetaFields
          }
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
            clientLogo {
              file {
                url
                fileName
                contentType
              }
            }
          }
          contributionsSection {
            githubMetaData {
              openSourceMetaPullRequestsCount
              openSourceMetaReposCount
            }
            ctaCopy
            ctaLink
            descriptionLine1
            descriptionLine2
            titleSectionLine1
            titleSectionLine2
            titleSectionLine3
            icon {
              title
              file {
                url
              }
            }
            descriptionLine1
            descriptionLine2
            ctaCopy
            ctaLink
            githubRepos {
              id
              url
              nameWithOwner
              pullRequestCount
              starCount
            }
          }
          eventsSectionDescription
          technologiesSectionTitle
          technologiesSectionTechnologies {
            referenceName
            name
            specialities {
              title
              id
            }
          }
          footerContactUs {
            id
          }
        }
      }
    `}
    render={data => <OpenSource data={data} {...props} />}
  />
)

export default OpenSourcePage
