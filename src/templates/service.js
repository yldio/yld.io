import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import SeoLinksContainer from '../components/Common/seoLinksContainer'
import WorkStages from '../components/Service/WorkStages'
import GreyBackground from '../components/Common/GreyBackground'
import BlueBackground from '../components/Common/BlueBackground'
import Head from '../components/Common/Head'
import Statement from '../components/Common/Statement'
import generateBreadcrumbData from '../utils/generateBreadcrumbData'

const Service = ({
  data: {
    contentfulService: service,
    site: {
      siteMetadata: { siteUrl },
    },
  },
  location,
}) => {
  const specialities = [
    {
      title: service.specialityAreaTitle1,
      items: service.specialityAreaItems1,
    },
    {
      title: service.specialityAreaTitle2,
      items: service.specialityAreaItems2,
    },
    {
      title: service.specialityAreaTitle3,
      items: service.specialityAreaItems3,
    },
    {
      title: service.specialityAreaTitle4,
      items: service.specialityAreaItems4,
    },
  ]

  const { seoMetaData } = service

  const breadcrumbData = generateBreadcrumbData(siteUrl, [
    {
      name: service.title,
      pathname: location.pathname,
      position: 2,
    },
  ])

  return (
    <Layout
      location={location}
      slug={service.slug}
      breadcrumbData={breadcrumbData}
      footerContactUsId={service.footerContactUs.id}
    >
      <Head seoMetaData={seoMetaData} />

      <CaseStudyPreview as="h1" caseStudy={service.caseStudies[0]} />

      <Statement>
        {service.mainPageIntroSentence.mainPageIntroSentence}
      </Statement>

      <BlueBackground>
        <WorkStages
          title={service.workStagesTitle}
          workStages={service.workStages}
        />
      </BlueBackground>
      <GreyBackground>
        <SeoLinksContainer
          specialities={specialities}
          sectionTitle="We work with"
        />
      </GreyBackground>
      <CaseStudyPreview isTop={false} caseStudy={service.relatedCaseStudy[0]} />
    </Layout>
  )
}

export default Service

/**
 *
 * The use of `... on Node` within the relatedCaseStudy and caseStudies
 * schema is to prevent builds breaking if any of the content-types are
 * removed from contentful. Previously without the `... on Node` fragment,
 * the build would break due to type X not being present in any of the
 * entries. This meant graphql schema would not generate the union type of
 * all the different case study templates and gatsby build would error.
 * more info: https://medium.com/@Zepro/contentful-reference-fields-with-gatsby-js-graphql-9f14ed90bdf9
 */
export const pageQuery = graphql`
  query($id: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    contentfulService(id: { eq: $id }) {
      slug
      title
      seoMetaData {
        ...SEOMetaFields
      }
      seoTitle
      seoMetaDescription
      mainPageIntroSentence {
        mainPageIntroSentence
      }
      relatedCaseStudy {
        ... on Node {
          ... on ContentfulTemplatedCaseStudy {
            title
            slug
            introSentence {
              introSentence
            }
            posterImage {
              title
              fluid(maxWidth: 600) {
                ...GatsbyContentfulFluid_withWebp
              }
              file {
                url
              }
            }
            posterColor
          }
          ... on ContentfulNonTemplatedCaseStudyV2 {
            title
            slug
            intro: introSentence {
              introSentence
            }
            posterImage {
              title
              fluid(maxWidth: 600) {
                ...GatsbyContentfulFluid_withWebp
              }
              file {
                url
              }
            }
            posterColor
          }
        }
      }
      caseStudies {
        ... on Node {
          ... on ContentfulTemplatedCaseStudy {
            title
            slug
            introSentence {
              introSentence
            }
            posterColor
            posterImage {
              fluid(maxWidth: 600) {
                ...GatsbyContentfulFluid_withWebp
              }
              title
              file {
                url
              }
            }
          }
          ... on ContentfulNonTemplatedCaseStudyV2 {
            title
            slug
            intro: introSentence {
              introSentence
            }
            posterColor
            posterImage {
              title
              file {
                url
              }
            }
          }
        }
      }
      workStagesTitle
      workStages {
        id
        title
        displayType
        sectionTitle1
        sectionTitle2
        sectionTitle3
        sectionTitle4
        sectionTitle5
        sectionIcon1 {
          title
          file {
            url
          }
        }
        sectionIcon2 {
          title
          file {
            url
          }
        }
        sectionIcon3 {
          title
          file {
            url
          }
        }
        sectionIcon4 {
          title
          file {
            url
          }
        }
        sectionIcon5 {
          title
          file {
            url
          }
        }
        sectionBody1 {
          sectionBody1
        }
        sectionBody2 {
          sectionBody2
        }
        sectionBody3 {
          sectionBody3
        }

        sectionBody4 {
          sectionBody4
        }

        sectionBody5 {
          sectionBody5
        }
      }
      specialityAreaTitle1
      specialityAreaItems1 {
        id
        slug
        title
      }
      specialityAreaTitle2
      specialityAreaItems2 {
        id
        slug
        title
      }
      specialityAreaTitle3
      specialityAreaItems3 {
        id
        slug
        title
      }
      specialityAreaTitle4
      specialityAreaItems4 {
        id
        slug
        title
      }
      footerContactUs {
        id
      }
    }
  }
`
