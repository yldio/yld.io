import React from 'react'
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

const CaseStudy = ({
  data: { contentfulTemplatedCaseStudy: caseStudy },
  location
}) => {
  const body = generateCaseStudy(caseStudy)

  return (
    <Layout location={location}>
      <Head page={caseStudy} />
      <Grid>
        <Padding bottom={0.5}>
          <CaseStudyHero caseStudy={caseStudy} />
        </Padding>
        <Margin bottom={4} />
        <Row>
          <Col width={[1, 1, 1, 9 / 12, 7 / 12]}>
            {body[0].map((text, i) => (
              <BodyPrimary key={i}>{text}</BodyPrimary>
            ))}
          </Col>
        </Row>
      </Grid>
      <GreyBGOffset topMargin topOffset={-150}>
        <Grid>
          <Padding bottom={4} top={4}>
            <Row center="md">
              <Col width={[1]}>
                {body[1].map((text, i) => (
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
          <Row>
            <Col width={[1, 1, 1, 1, 9 / 12, 7 / 12]}>
              {body[2].map((text, i) => (
                <BodyPrimary key={i}>{text}</BodyPrimary>
              ))}
            </Col>
            <Col>
              {caseStudy.stats &&
                caseStudy.stats.map(stat => (
                  <Margin bottom={1} key={stat.id}>
                    <SectionTitle>{stat.value}</SectionTitle>
                    <Subtitle noPaddingTop>{stat.label}</Subtitle>
                  </Margin>
                ))}
            </Col>
          </Row>
          <Padding bottom={5} />
        </Grid>
      </GreyBGOffset>
      <Grid>
        <Row>
          <Col width={[1]}>
            <Padding top={4} bottom={2}>
              <BodyPrimary>More of our work</BodyPrimary>
            </Padding>
          </Col>
        </Row>
        {caseStudy.relatedCaseStudy ? (
          <Padding bottom={5}>
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
