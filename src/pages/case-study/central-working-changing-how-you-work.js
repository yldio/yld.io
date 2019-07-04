import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Row } from '../../components/grid'
import BlueBackground from '../../components/Common/BlueBackground'
import GreyBackground from '../../components/Common/GreyBackground'
import Layout from '../../components/layout'
import Head from '../../components/Common/Head'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import {
  TextColumnsBlock,
  TextAndImageBlock,
  FullWidthBlock,
  VideoBlock,
  ImagesBlock
} from '../../components/Common/CaseStudyCards/CaseStudyBlocks'
// import SubtitleWithBody from '../../components/Common/SubtitleWithBody'
import Statement from '../../components/Common/Statement'
import CaseStudyPreview from '../../components/Common/CaseStudyCards/CaseStudyPreview'

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
    genericBlock9: data9
  } = caseStudy

  return (
    <Layout location={location}>
      <Head
        page={{
          ...caseStudy,
          socialLogo:
            'https://www.yld.io/static/logo_animated-832020608244057f6a9d73e80994ac4a.gif'
        }}
      />
      <CaseStudyHero caseStudy={caseStudy} />

      <Grid>
        <CaseStudyPreview
          isTop={false}
          caseStudy={caseStudy.relatedCaseStudy}
        />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  {
    contentfulNonTemplatedCaseStudyV2(
      slug: { eq: "central-working-changing-how-you-work" }
    ) {
      relatedCaseStudy {
        title
        slug
        introSentence {
          id
        }
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
