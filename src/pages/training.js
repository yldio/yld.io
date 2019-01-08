import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import { Grid, Row, Col } from '../components/grid'

import { H2, Paragraph } from '../components/Typography'
import Layout from '../components/layout'
import SEOText from '../components/Homepage/seoText'
import CaseStudy from '../components/Homepage/caseStudy'
import GrayBackground from '../components/GreyBG'
import TalkToUsSection from '../components/Speciality/talkToUs'

const Hr = styled.hr`
  height: 1px;
  border: none;
  opacity: 0.2;
  background-color: #ffffff;
`

const IndexPage = ({ data: { contentfulTrainingPage: content, site } }) => {
  const trainingApproachesContent = [
    content.trainingApproachContent1.trainingApproachContent1,
    content.trainingApproachContent2.trainingApproachContent2,
    content.trainingApproachContent3.trainingApproachContent3
  ]
  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title} ${
          content.seoTitle ? '- ' + content.seoTitle : ''
        } `}
        meta={[{ name: 'description', content: content.seoMetaDescription }]}
      >
        <html lang="en" />
      </Helmet>
      <Grid>
        <Padding bottom={{ smallPhone: 0, smallTablet: 2, desktop: 2 }}>
          <CaseStudy
            caseStudy={content.featuredCaseStudy}
            subHeading="Featured work"
          />
        </Padding>
        <Padding bottom={{ smallPhone: 0, desktop: 2 }} />
      </Grid>
      <GrayBackground>
        <Grid>
          <Padding top={{ smallPhone: 2 }} />
          <Padding
            top={{ smallPhone: 4, smallTablet: 4, desktop: 4 }}
            bottom={4}
          >
            <SEOText text={content.seoText.content[0].content} />
          </Padding>
        </Grid>
      </GrayBackground>
      <GrayBackground style={{ background: '#090329' }}>
        <Padding top={{ smallPhone: 4 }} bottom={{ smallPhone: 4 }}>
          <Grid>
            <Row>
              <Col width={[1, 1, 1, 1, 1 / 2]}>
                <H2 style={{ maxWidth: 250 }} reverse>
                  Our training approach
                </H2>
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2]}>
                {content.trainingApproachTitle.map((approach, i) => (
                  <Padding bottom={2} key={i}>
                    <Paragraph reverse bold>
                      {approach}
                    </Paragraph>
                    <Paragraph reverse muted>
                      {trainingApproachesContent[i]}
                    </Paragraph>
                  </Padding>
                ))}
              </Col>
            </Row>
            <Padding top={{ smallPhone: 48 }} bottom={{ smallPhone: 4 }}>
              <Hr />
            </Padding>
            <Row>
              <Col width={[1]}>
                <H2 reverse>Our training formats</H2>
              </Col>
            </Row>
          </Grid>
        </Padding>
      </GrayBackground>
      <TalkToUsSection
        contactTitle={content.contactUsTitle}
        contactText={content.contactUsText.contactUsText}
      />
      <Grid>
        {content.relatedCaseStudy ? (
          <Padding top={5} bottom={5}>
            <CaseStudy
              subHeading="Featured work"
              caseStudy={content.relatedCaseStudy}
            />
          </Padding>
        ) : null}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

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
            ...GatsbyContentfulFluid_tracedSVG
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
      relatedCaseStudy {
        title
        slug
        posterImage {
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_tracedSVG
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

export default IndexPage
