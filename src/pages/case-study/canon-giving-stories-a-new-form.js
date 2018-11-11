import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Padding, Margin } from 'styled-components-spacing'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import { H2, Paragraph } from '../../components/Typography'
import CaseStudyTop from '../../components/Common/topCaseStudy'

import Layout from '../../components/layout'
import GrayBackground from '../../components/GrayBG'
import landscape from './assets/at_the_heart_of_a_story.svg'
import travel from './assets/beyond_photography.png'

const IndexPage = ({
  data: { allContentfulGenericCaseStudy: content, site }
}) => {
  const caseStudy = content.edges[0].node
  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title}  ${
          content.title ? '- ' + content.title : ''
        } ${content.seoTitle ? '- ' + content.seoTitle : ''} `}
        meta={[{ name: 'description', content: content.seoMetaDescription }]}
      >
        <html lang="en" />
      </Helmet>
      <Grid className="grid">
        <CaseStudyTop caseStudy={caseStudy} />
        <Margin vertical={4}>
          <Row>
            <Col xs={12} sm={9} md={7}>
              <Paragraph padded>
                {caseStudy.introSentence.introSentence}
              </Paragraph>
            </Col>
          </Row>
        </Margin>
      </Grid>
      <GrayBackground>
        <Padding vertical={6}>
          <Grid className="grid">
            <Row>
              <Col xs={12} sm={12} md={5}>
                <H2 noTop>At the heart of a photo is a story</H2>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={5} mdOffset={4}>
                <img src={landscape} alt="landscape" />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={5} mdOffset={8}>
                <Margin top={3}>
                  {caseStudy.genericText1.genericText1
                    .split('\n')
                    .map((p, i) => (
                      <Paragraph padded key={i}>
                        {p}
                      </Paragraph>
                    ))}
                </Margin>
              </Col>
            </Row>
          </Grid>
        </Padding>
      </GrayBackground>
      <Grid
        className="grid"
        style={{ backgroundImage: 'linear-gradient(to top, #0c1835, #050a18)' }}
      >
        <Row>
          <Col xs={12} sm={12} md={6} mdOffset={3}>
            <Margin top={2}>
              <H2 reverse>Beyond photography</H2>
            </Margin>
            {caseStudy.genericText2.genericText2.split('\n').map((p, i) => (
              <Paragraph muted reverse padded key={i}>
                {p}
              </Paragraph>
            ))}
          </Col>
        </Row>
        <Margin bottom={3} />
        <Row>
          <Col xs={12} sm={12} md={6} mdOffset={3}>
            <img src={travel} alt="Beyond photography" />
          </Col>
        </Row>
      </Grid>
      <Margin bottom={6} />
      <Grid className="grid">
        <Padding top={60}>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <H2 noTop>Exploring the story</H2>
            </Col>
            <Col xs={12} sm={12} md={6}>
              {caseStudy.genericText3.genericText3.split('\n').map((p, i) => (
                <Paragraph padded key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
        </Padding>
      </Grid>
      <Margin vertical={5}>
        <Grid className="grid">
          <Row>
            <Col xs={12}>
              <div className="video-container">
                <iframe
                  src="https://player.vimeo.com/video/203746618"
                  width="640"
                  height="360"
                  frameBorder="0"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowFullScreen
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </Margin>
      <GrayBackground>
        <Grid className="grid">
          <Padding top={6}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <H2 noTop>Out in the wild</H2>
              </Col>
              <Col xs={12} sm={12} md={6}>
                {caseStudy.genericText4.genericText4.split('\n').map((p, i) => (
                  <Paragraph padded key={i}>
                    {p}
                  </Paragraph>
                ))}
              </Col>
            </Row>
          </Padding>
        </Grid>
      </GrayBackground>
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
    allContentfulGenericCaseStudy(
      filter: { slug: { eq: "canon-giving-stories-a-new-form" } }
    ) {
      edges {
        node {
          slug
          title
          posterImage {
            file {
              url
            }
          }
          introSentence {
            introSentence
          }
          genericText1 {
            id
            genericText1
          }
          genericText2 {
            id
            genericText2
          }
          genericText3 {
            id
            genericText3
          }
          genericText4 {
            id
            genericText4
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
    }
  }
`

export default IndexPage
