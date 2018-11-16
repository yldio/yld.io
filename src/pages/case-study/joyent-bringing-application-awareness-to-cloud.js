import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import CaseStudyTop from '../../components/Common/topCaseStudy'
import CaseStudyBottom from '../../components/Homepage/caseStudy'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import { Padding, Margin } from 'styled-components-spacing'
import { H2, Paragraph } from '../../components/Typography'
import GrayBackground from '../../components/GrayBG'
import singleSignOnImage from './assets/single_sign_on.png'
import navigationImage from './assets/navigation.png'
import appDeploymentImage from './assets/app_deployment.png'
import topologyImage from './assets/topology.png'
import bigPictureImage from './assets/the_big_picture.png'
import metricsImage from './assets/metrics.png'
import monitoringImage from './assets/monitoring.png'

const IndexPage = ({
  data: { allContentfulGenericCaseStudy: content, site }
}) => {
  const caseStudy = content.edges[0].node
  console.log({ caseStudy, site })
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
      <GrayBackground>
        <Grid className="grid">
          <Padding top={5}>
            <Row>
              <Col md={6}>
                <H2>The challenge</H2>
              </Col>
              <Col md={6}>
                <Paragraph padded>
                  {caseStudy.genericText1.genericText1}
                </Paragraph>
              </Col>
            </Row>
          </Padding>
          <Padding top={4} bottom={10}>
            <Row>
              <Col md={4}>
                <H2>Single sign-on</H2>
                <Paragraph padded>
                  {caseStudy.genericText2.genericText2}
                </Paragraph>
              </Col>
              <img
                src={singleSignOnImage}
                style={{ position: 'absolute', maxWidth: '71%', left: '42%' }}
              />
            </Row>
          </Padding>
        </Grid>
      </GrayBackground>
      <Grid className="grid">
        <Col md={12}>
          <Padding top={6}>
            <H2 style={{ textAlign: 'center' }}>Navigation</H2>
            <Paragraph style={{ textAlign: 'center', margin: '0 auto' }}>
              {caseStudy.genericText3.genericText3}
            </Paragraph>
            <img src={navigationImage} />
          </Padding>
        </Col>
      </Grid>
      <GrayBackground topOffset={-540}>
        <Grid className="grid">
          <Col md={8}>
            <Padding top={2} bottom={3}>
              <H2>App deployment</H2>
              <Paragraph>{caseStudy.genericText4.genericText4}</Paragraph>
            </Padding>
          </Col>
          <Col md={12}>
            <img src={appDeploymentImage} />
          </Col>

          <Padding top={5} bottom={10}>
            <Row>
              <Col md={4}>
                <H2>Topology</H2>
                <Paragraph>{caseStudy.genericText5.genericText5}</Paragraph>
              </Col>
              <img
                src={topologyImage}
                style={{
                  maxWidth: '704px',
                  position: 'absolute',
                  left: '44.5%'
                }}
              />
            </Row>
          </Padding>
        </Grid>
        <Padding bottom={3} />
      </GrayBackground>
      <div style={{ backgroundColor: 'white' }}>
        <Padding top={5}>
          <Grid className="grid">
            <Col md={12}>
              <Padding top={6}>
                <H2 style={{ textAlign: 'center' }}>The big picture</H2>
                <Paragraph style={{ textAlign: 'center', margin: '0 auto' }}>
                  {caseStudy.genericText6.genericText6}
                </Paragraph>
                <img src={bigPictureImage} style={{ paddingTop: '32px' }} />
              </Padding>
            </Col>

            <Col md={12}>
              <Padding top={3}>
                <H2 style={{ textAlign: 'center' }}>Metrics visualisation</H2>
                <Paragraph style={{ textAlign: 'center', margin: '0 auto' }}>
                  {caseStudy.genericText7.genericText7}
                </Paragraph>
                <img src={metricsImage} style={{ paddingTop: '32px' }} />
              </Padding>
            </Col>
            <Padding top={5} bottom={15}>
              <Row>
                <Col md={4}>
                  <H2>Monitoring and alerting</H2>
                  <Paragraph>{caseStudy.genericText8.genericText8}</Paragraph>
                </Col>
                <img
                  src={monitoringImage}
                  style={{
                    maxWidth: '704px',
                    position: 'absolute',
                    left: '44.5%'
                  }}
                />
              </Row>
            </Padding>
          </Grid>
        </Padding>
      </div>

      <div style={{ backgroundColor: 'white' }}>
        <Grid className="grid">
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
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulGenericCaseStudy(
      filter: { slug: { eq: "joyent-bringing-application-awareness-to-cloud" } }
    ) {
      edges {
        node {
          relatedCaseStudy {
            title
            slug
            introSentence
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
          genericText5 {
            id
            genericText5
          }
          genericText6 {
            id
            genericText6
          }
          genericText7 {
            id
            genericText7
          }
          genericText8 {
            id
            genericText8
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
