import React, { Fragment } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { graphql } from 'gatsby'
import { Margin, Padding } from 'styled-components-spacing'
import { Grid, Row, Col } from '../components/grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../components/Typography'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'
import CaseStudyHero from '../components/Common/CaseStudyCards/CaseStudyHero'
import Layout from '../components/layout'
import generateCaseStudy from '../utils/generateCaseStudy'
import { GreyBGOffset } from '../components/GreyBG'
import Head from '../components/Common/Head'

const NonMobileCol = styled(Col)`
  display: none;

  ${breakpoint('smallTablet')`
    display: flex;
  `}
`

const MobileOnlyCol = styled(Col)`
  display: flex;

  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const RowLayout = styled(Row)`
  ${breakpoint('smallTablet')`
    justify-content: flex-end;
  `}
`

const Stats = ({ stats }) => (
  <Fragment>
    {stats.map(stat => (
      <Margin bottom={1} key={stat.id}>
        <SectionTitle>{stat.value}</SectionTitle>
        <Subtitle noPaddingTop>{stat.label}</Subtitle>
      </Margin>
    ))}
  </Fragment>
)

const SecondTextColumn = ({ textBelowVideo }) => (
  <Col width={[1, 1, 1, 1, 9 / 12, 7 / 12]}>
    {textBelowVideo.map((text, i) => (
      <BodyPrimary key={i}>{text}</BodyPrimary>
    ))}
  </Col>
)

const TextAndStatsSection = ({ stats, textBelowVideo }) => (
  <Fragment>
    {stats && (
      <Row spaced>
        <NonMobileCol width={[0, 0, 0, 0, 3 / 12]}>
          <Stats stats={stats} />
        </NonMobileCol>
        <SecondTextColumn textBelowVideo={textBelowVideo} />
        <MobileOnlyCol width={[1, 1, 1, 1, 0]}>
          <Stats stats={stats} />
        </MobileOnlyCol>
      </Row>
    )}
  </Fragment>
)

const TextSectionWithoutStats = ({ textBelowVideo }) => (
  <Row flexEnd>
    <SecondTextColumn textBelowVideo={textBelowVideo} />
  </Row>
)

const CaseStudy = ({
  data: { contentfulTemplatedCaseStudy: caseStudy },
  location
}) => {
  const body = generateCaseStudy(caseStudy)
  const textAboveVideo = body[0]
  const videoSection = body[1]
  const textBelowVideo = body[2]

  return (
    <Layout location={location}>
      <Head page={caseStudy} />
      <Grid>
        <Padding bottom={0.5}>
          <CaseStudyHero caseStudy={caseStudy} />
        </Padding>
        <Margin bottom={4} />
        <RowLayout>
          <Col width={[1, 1, 1, 9 / 12, 7 / 12]}>
            {textAboveVideo.map((text, i) => (
              <BodyPrimary key={i}>{text}</BodyPrimary>
            ))}
          </Col>
        </RowLayout>
      </Grid>
      <GreyBGOffset topMargin topOffset={-150}>
        <Grid>
          <Padding bottom={4} top={4}>
            <Row center="md">
              <Col width={[1]}>
                {videoSection.map((text, i) => (
                  <div
                    key={i}
                    className="video-container"
                    dangerouslySetInnerHTML={{
                      __html: `<iframe width="844" height="480" src="${text}" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`
                    }}
                  />
                ))}
              </Col>
            </Row>
          </Padding>
          <Margin top={1} />
          {caseStudy.stats ? (
            <TextAndStatsSection
              stats={caseStudy.stats}
              textBelowVideo={textBelowVideo}
            />
          ) : (
            <TextSectionWithoutStats textBelowVideo={textBelowVideo} />
          )}
          <Padding bottom={5} />
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
