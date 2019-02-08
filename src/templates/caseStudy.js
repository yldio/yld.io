import React from 'react'
import { Padding } from 'styled-components-spacing'
import { graphql } from 'gatsby'

import generateCaseStudy from '../utils/generateCaseStudy'
import Layout from '../components/layout'
import { Grid } from '../components/grid'
import { GreyBGOffset } from '../components/GreyBG'
import Head from '../components/Common/Head'
import CaseStudyHero from '../components/Common/CaseStudyCards/CaseStudyHero'
import FirstTextSection from '../components/TemplatedCaseStudy/FirstTextSection'
import SecondTextSection from '../components/TemplatedCaseStudy/SecondTextSection'
import VideoSection from '../components/TemplatedCaseStudy/VideoSection'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'

const CaseStudy = ({
  data: { contentfulTemplatedCaseStudy: caseStudy },
  location
}) => {
  const body = generateCaseStudy(caseStudy)
  const textAboveVideo = body[0]
  const videoInfo = body[1]
  const textBelowVideo = body[2]
  const hasStats = !!caseStudy.stats

  return (
    <Layout location={location}>
      <Head page={caseStudy} />
      <Grid>
        <CaseStudyHero caseStudy={caseStudy} />
        <Padding top={4} bottom={4}>
          <FirstTextSection textAboveVideo={textAboveVideo} />
        </Padding>
      </Grid>
      <GreyBGOffset topMargin topOffset={-150}>
        <Grid>
          <VideoSection videoInfo={videoInfo} />
          <Padding top={4} bottom={4}>
            <SecondTextSection
              hasStats={hasStats}
              stats={caseStudy.stats}
              textBelowVideo={textBelowVideo}
            />
          </Padding>
        </Grid>
      </GreyBGOffset>
      <Grid>
        {caseStudy.relatedCaseStudy ? (
          <Padding top={4} bottom={5}>
            <CaseStudyPreview caseStudy={caseStudy.relatedCaseStudy} />
          </Padding>
        ) : null}
      </Grid>
    </Layout>
  )
}

export default CaseStudy

export const pageQuery = graphql`
  query($id: String) {
    contentfulTemplatedCaseStudy(id: { eq: $id }) {
      slug
      title
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
      specialities {
        title
        id
      }
      services {
        title
        id
      }
      stats {
        id
        label
        value
      }
      posterColor
      body {
        content {
          nodeType
          content {
            value
            marks {
              type
            }
          }
        }
      }
      posterImage {
        fluid(maxWidth: 600) {
          ...GatsbyContentfulFluid_withWebp
        }
        title
        file {
          url
        }
      }
      seoTitle
      seoMetaDescription
    }
  }
`
