import React from 'react'
import { graphql } from 'gatsby'

import { Grid } from '../components/grid'
import Layout from '../components/layout'
import Statement from '../components/Common/Statement'
import Approach from '../components/Training/Approach'
import Courses from '../components/Training/Courses'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import GetInTouch from '../components/Common/GetInTouch'
import Head from '../components/Common/Head'
import GreyBackground from '../components/Common/GreyBackground'

const TrainingPage = ({ data: { contentfulTrainingPage: content } }) => {
  const trainingApproachesContent = [
    content.trainingApproachContent1.trainingApproachContent1,
    content.trainingApproachContent2.trainingApproachContent2,
    content.trainingApproachContent3.trainingApproachContent3
  ]

  return (
    <Layout>
      <Head page={content} />
      <CaseStudyPreview caseStudy={content.featuredCaseStudy} />
      <GreyBackground>
        <Grid>
          <Statement richText={content.seoText.content[0].content} />
        </Grid>
      </GreyBackground>
      <Approach
        title={content.trainingApproachTitle}
        content={trainingApproachesContent}
        formats={content.trainingFormats}
      />
      <Courses
        categories={content.courseCategories}
        sectionTitle={content.courseSectionTitle}
      />
      <GetInTouch
        title={`${content.contactUsTitle}`}
        contactText={content.contactUsText.contactUsText}
      />
      <CaseStudyPreview isTop={false} caseStudy={content.relatedCaseStudy} />
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulTrainingPage {
      title
      seoTitle
      seoMetaDescription
      contactUsText {
        contactUsText
      }
      contactUsTitle
      trainingApproachTitle
      trainingApproachContent1 {
        trainingApproachContent1
      }
      trainingApproachContent2 {
        trainingApproachContent2
      }
      trainingApproachContent3 {
        trainingApproachContent3
      }
      courseSectionTitle
      courseCategories {
        id
        slug
        name
        logo {
          fluid(maxWidth: 680) {
            ...GatsbyContentfulFluid_withWebp
          }
          title
          file {
            url
          }
        }
        courses {
          id
          slug
          name
          technology
          level
          preRequisites
          preRequisitesCourses
          description {
            description
          }
          content {
            content
          }
        }
      }
      featuredCaseStudy {
        id
        title
        slug
        posterImage {
          title
          file {
            url
          }
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        posterColor
        introSentence
      }
      seoText {
        content {
          content {
            value
            nodeType
          }
        }
      }
      trainingFormats {
        id
        title
        description
        bulletPoints
        icon {
          title
          file {
            url
          }
        }
      }
      relatedCaseStudy {
        title
        slug
        posterImage {
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_withWebp
          }
          title
          file {
            url
          }
        }
        posterColor
        introSentence
      }
    }
  }
`

export default TrainingPage
