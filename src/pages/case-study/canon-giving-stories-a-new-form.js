import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Flex from 'styled-flex-component'
import { Padding, Margin } from 'styled-components-spacing'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import { H2, Paragraph } from '../../components/Typography'
import CaseStudyTop from '../../components/Common/topCaseStudy'
import CaseStudyBottom from '../../components/Homepage/caseStudy'
import Layout from '../../components/layout'
import GrayBackground from '../../components/GrayBG'
import landscape from './assets/at_the_heart_of_a_story.svg'
import travel from './assets/beyond_photography.png'

const makeText = content => content.split('\n').filter(c => c.length)

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
        <CaseStudyTop
          caseStudy={caseStudy}
          introSentence={caseStudy.introSentence.introSentence}
        />
      </Grid>
      <GrayBackground topOffset={-783} offsetBottom>
        <Padding top={5} bottom={30}>
          <Grid className="grid">
            <Row>
              <Col xs={12} sm={12} md={5}>
                <H2 noTop>At the heart of a photo is a story</H2>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={8} mdOffset={2}>
                <Margin top={3}>
                  <Flex justifyCenter alignCenter>
                    <img src={landscape} alt="landscape" />
                  </Flex>
                </Margin>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} mdOffset={6}>
                <Margin top={3}>
                  {makeText(caseStudy.genericText1.genericText1).map((p, i) => (
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
            <Margin top={2} bottom={1}>
              <H2 reverse>Beyond photography</H2>
            </Margin>
            {makeText(caseStudy.genericText2.genericText2).map((p, i) => (
              <Paragraph muted reverse padded key={i}>
                {p}
              </Paragraph>
            ))}
          </Col>
        </Row>
        <Margin bottom={2} />
        <Row>
          <Col xs={12} sm={12} md={8} mdOffset={2}>
            <Flex justifyCenter alignCenter>
              <img src={travel} alt="Beyond photography" />
            </Flex>
          </Col>
        </Row>
      </Grid>
      <Margin bottom={6} />
      <Grid className="grid">
        <Padding top={2}>
          <Row>
            <Col xs={12} sm={12} md={5}>
              <H2 noTop>Exploring the story</H2>
            </Col>
            <Col xs={12} sm={12} md={7}>
              {makeText(caseStudy.genericText3.genericText3).map((p, i) => (
                <Paragraph padded key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
        </Padding>
      </Grid>

      <GrayBackground topOffset={-300}>
        <Padding top={5} bottom={2}>
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
        </Padding>
        <Grid className="grid">
          <Padding top={5} bottom={3}>
            <Row>
              <Col xs={12} sm={12} md={5}>
                <H2 noTop>Out in the wild</H2>
              </Col>
              <Col xs={12} sm={12} md={7}>
                {makeText(caseStudy.genericText4.genericText4).map((p, i) => (
                  <Paragraph padded key={i}>
                    {p}
                  </Paragraph>
                ))}
              </Col>
            </Row>
          </Padding>
        </Grid>
      </GrayBackground>
      <div style={{ backgroundColor: 'white' }}>
        <Grid>
          <Row>
            <Col xs={12}>
              <Padding top={4} bottom={2}>
                <Paragraph>More of our work</Paragraph>
              </Padding>
            </Col>
          </Row>
          {caseStudy.relatedCaseStudy ? (
            <Padding bottom={5}>
              <CaseStudyBottom caseStudy={caseStudy.relatedCaseStudy} />
            </Padding>
          ) : null}
        </Grid>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
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
          relatedCaseStudy {
            title
            slug
            introSentence {
              introSentence
            }
            posterImage {
              file {
                url
              }
            }
            posterColor
          }
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
            ... on ContentfulService {
              title
              id
            }
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
