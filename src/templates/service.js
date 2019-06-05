import React from 'react'
import { graphql } from 'gatsby'

import { Padding } from 'styled-components-spacing'
import Layout from '../components/layout'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import SeoLinksContainer from '../components/Common/seoLinksContainer'
import WorkStages from '../components/Service/WorkStages'
import GreyBackground from '../components/Common/GreyBackground'
import BlueBackground from '../components/Common/BlueBackground'
import Head from '../components/Common/Head'
import Statement from '../components/Common/Statement'

const Service = ({ data: { contentfulService: service }, location }) => (
  <Layout location={location}>
    <Head page={service} />
    <CaseStudyPreview caseStudy={service.caseStudies[0]} />
    <Statement>{service.mainPageIntroSentence.mainPageIntroSentence}</Statement>

    <BlueBackground>
      <WorkStages
        title={service.workStagesTitle}
        workStages={service.workStages}
      />
    </BlueBackground>
    <GreyBackground>
      <Padding
        top={{ smallPhone: 3, tablet: 4 }}
        bottom={{ smallTablet: 3.5, tablet: 5 }}
      >
        <SeoLinksContainer service={service} sectionTitle="We work with" />
      </Padding>
    </GreyBackground>
    <CaseStudyPreview isTop={false} caseStudy={service.relatedCaseStudy[0]} />
  </Layout>
)

export default Service

export const pageQuery = graphql`
  query($id: String) {
    contentfulService(id: { eq: $id }) {
      slug
      title
      seoTitle
      seoMetaDescription
      mainPageIntroSentence {
        mainPageIntroSentence
      }
      relatedCaseStudy {
        ... on ContentfulTemplatedCaseStudy {
          title
          slug
          introSentence
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
        ... on ContentfulNonTemplatedCaseStudy {
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
      caseStudies {
        ... on ContentfulTemplatedCaseStudy {
          title
          slug
          introSentence
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
        ... on ContentfulNonTemplatedCaseStudy {
          title
          slug
          intro: introSentence {
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
    }
  }
`
