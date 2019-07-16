import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/layout'
import Head from '../../components/Common/Head'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import CaseStudyPreview from '../../components/Common/CaseStudyCards/CaseStudyPreview'
import { normalise } from '../../components/Common/CaseStudyCards/CaseStudyBlocks'

const IndexPage = props => {
  const {
    data: { contentfulNonTemplatedCaseStudyV2: caseStudy },
    location
  } = props

  const {
    genericBlock1: data1,
    genericBlock2: data2,
    genericBlock3: data3,
    genericBlock4: data4,
    genericBlock5: data5,
    genericBlock6: data6,
    genericBlock7: data7,
    genericBlock8: data8,
    genericBlock9: data9,
    relatedCaseStudy
  } = caseStudy

  return (
    <Layout location={location}>
      <Head
        page={{
          ...caseStudy,
          socialLogo: caseStudy.posterImage.file.url
        }}
      />
      <CaseStudyHero caseStudy={caseStudy} as="h1" />
      {/* "In early 2016 Make Us Proud began working with Learnerbly" */}
      <div>{JSON.stringify(normalise(data1))}</div>
      <br />
      {/* "Following our initial engagement with Learnerbly" */}
      <div>{JSON.stringify(normalise(data2))}</div>
      <br />
      {/* "What was the problem we were tackling?" */}
      <div>{JSON.stringify(normalise(data3))}</div>
      <br />
      {/* Image - "We curate the best learning to accelerate your growth" */}
      <div>{JSON.stringify(normalise(data4))}</div>
      <br />
      {/* "How did we go about solving it?" */}
      <div>{JSON.stringify(normalise(data5))}</div>
      <br />
      {/* "On-boarding" */}
      <div>{JSON.stringify(normalise(data6))}</div>
      <br />
      {/* "Staying on target" */}
      <div>{JSON.stringify(normalise(data7))}</div>
      <br />
      {/* "Curated courses" */}
      <div>{JSON.stringify(normalise(data8))}</div>
      <br />
      {/* "The bigger picture" */}
      <div>{JSON.stringify(normalise(data9))}</div>
      <br />
      <CaseStudyPreview isTop={false} caseStudy={relatedCaseStudy} />
    </Layout>
  )
}

export const query = graphql`
  {
    contentfulNonTemplatedCaseStudyV2(
      slug: { eq: "learnerbly-accelerating-professional-growth" }
    ) {
      relatedCaseStudy {
        title
        slug
        introSentence
        posterImage {
          title
          file {
            url
          }
        }
        posterColor
      }
      slug
      title
      posterImage {
        title
        file {
          url
        }
      }
      genericBlock1 {
        ...GenericFragment
      }
      genericBlock2 {
        ...GenericFragment
      }
      genericBlock3 {
        ...GenericFragment
      }
      genericBlock4 {
        ...GenericFragment
      }
      genericBlock5 {
        ...GenericFragment
      }
      genericBlock6 {
        ...GenericFragment
      }
      genericBlock7 {
        ...GenericFragment
      }
      genericBlock8 {
        ...GenericFragment
      }
      genericBlock9 {
        ...GenericFragment
      }
      specialities {
        title
        id
      }
      services {
        title
        id
      }
      posterColor
      seoTitle
      seoMetaDescription
    }
  }
`
export default IndexPage
