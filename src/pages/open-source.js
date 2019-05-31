import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Head from '../components/Common/Head'
import Layout from '../components/layout'
// import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import TalksSection from '../components/OpenSource/Talks'
import PartnershipsSection from '../components/OpenSource/Partnerships'

const OpenSource = ({ data }) => {
  const {
    contentfulOpenSourcePage: {
      title,
      slug,
      seoTitle,
      seoMetaDescription,
      talksSectionImage,
      talksSectionTitle,
      talksSectionTalks,
      talkSectionCtaText,
      talksSectionCtaLink,
      technologyPartnersSectionTitle,
      technologyPartners
    }
  } = data

  return (
    <Layout>
      <Head page={{ title, slug, seoTitle, seoMetaDescription }} />
      {/* <CaseStudyPreview caseStudy={} /> */}
      <TalksSection
        icon={talksSectionImage}
        title={talksSectionTitle}
        talks={talksSectionTalks}
        ctaText={talkSectionCtaText}
        ctaLink={talksSectionCtaLink}
      />
      <p>open source page</p>
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
