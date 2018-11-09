import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Padding, Margin } from 'styled-components-spacing'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { H2, Paragraph, H6 } from '../../components/Typography'
import CaseStudyTop from '../../components/Common/topCaseStudy'

import Layout from '../../components/layout'
import GrayBackground from '../../components/GrayBG'
import iterations from './assets/Logo-Iterations.png'
import meaning from './assets/Logo-Meaning@2x.png'
import logoImage from './assets/Logo-on-image.jpg'
import type1 from './assets/Type-Display-1.png'
import type2 from './assets/Type-Display-2.png'
import dark from './assets/Dark-Colour-Swatch.png'
import light from './assets/Light-Colour-Swatch.png'
import layout from './assets/Marketing-Page-Mockups.png'
import mockup from './assets/VPC-Mockup.png'
import iconsDesktop from './assets/Icon-Graphic.png'

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
              <Col xs={12} sm={12} md={6}>
                <H2 noTop>Building from the logo upwards</H2>
              </Col>
              <Col xs={12} sm={12} md={6}>
                {caseStudy.genericText1.genericText1.split('\n').map((p, i) => (
                  <Paragraph padded key={i}>
                    {p}
                  </Paragraph>
                ))}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={8} mdOffset={4}>
                <Margin top={3}>
                  <img src={iterations} alt="Logo Iterations" />
                  <H6>Logo Iterations</H6>
                </Margin>
              </Col>
            </Row>
          </Grid>
        </Padding>
      </GrayBackground>
      <div style={{ background: '#191933' }}>
        <Grid className="grid">
          <Row>
            <Col xs={12}>
              <img src={meaning} alt="Logo Iterations" />
            </Col>
          </Row>
        </Grid>
      </div>
      <Grid className="grid">
        <Padding vertical={60}>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <H2 noTop>Cutting the wordmark</H2>
            </Col>
            <Col xs={12} sm={12} md={6}>
              {caseStudy.genericText2.genericText2.split('\n').map((p, i) => (
                <Paragraph padded key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
        </Padding>
      </Grid>
      <Grid className="grid">
        <Row>
          <Col xs={12}>
            <img src={logoImage} alt="Logo Iterations" />
          </Col>
        </Row>
      </Grid>
      <GrayBackground>
        <Grid className="grid">
          <Padding top={6}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <H2 noTop>Custom typeface</H2>
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
      </GrayBackground>
      <GrayBackground noTop>
        <Flex>
          <div
            style={{
              flexGrow: 1,

              padding: 40,
              display: 'flex',
              justifyContent: 'center',
              background: '#333333'
            }}
          >
            <img
              src={type1}
              style={{
                width: 475,
                height: 248
              }}
            />
          </div>
          <div
            style={{
              flexGrow: 1,
              padding: 40,
              display: 'flex',
              justifyContent: 'center',
              background: '#f9f9f9'
            }}
          >
            <img
              src={type2}
              style={{
                width: 475,
                height: 240
              }}
            />
          </div>
        </Flex>
      </GrayBackground>
      <Grid className="grid">
        <Padding vertical={60}>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <H2 noTop>New icon system</H2>
            </Col>
            <Col xs={12} sm={12} md={6}>
              {caseStudy.genericText4.genericText4.split('\n').map((p, i) => (
                <Paragraph padded key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
          <Margin top={3}>
            <Row>
              <Col xs={12}>
                <img src={iconsDesktop} alt="icons" />
              </Col>
            </Row>
          </Margin>
        </Padding>
      </Grid>
      <Grid className="grid">
        <Padding vertical={60}>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <H2 noTop>Colour approach</H2>
            </Col>
            <Col xs={12} sm={12} md={6}>
              {caseStudy.genericText5.genericText5.split('\n').map((p, i) => (
                <Paragraph padded key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
          <Margin top={3}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <img src={light} alt="light color scheme" />
              </Col>
              <Col xs={12} sm={12} md={6}>
                <img src={dark} alt="dark color scheme" />
              </Col>
            </Row>
          </Margin>
        </Padding>
      </Grid>
      <GrayBackground noTop>
        <Grid className="grid">
          <Padding vertical={60}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <H2 noTop>Putting it all together</H2>
              </Col>
              <Col xs={12} sm={12} md={6}>
                {caseStudy.genericText6.genericText6.split('\n').map((p, i) => (
                  <Paragraph padded key={i}>
                    {p}
                  </Paragraph>
                ))}
              </Col>
            </Row>
            <Margin top={3}>
              <Row>
                <Col xs={12}>
                  <img src={layout} alt="layout" />
                </Col>
              </Row>
            </Margin>
          </Padding>
        </Grid>
      </GrayBackground>
      <Padding vertical={60}>
        <Grid className="grid">
          <Row>
            <Col xs={12} sm={12} md={6}>
              <H2 noTop>Product vision</H2>
              {caseStudy.genericText7.genericText7.split('\n').map((p, i) => (
                <Paragraph padded key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
            <Col xs={12} sm={12} md={6}>
              <img src={mockup} alt="mockup" />
            </Col>
          </Row>
        </Grid>
      </Padding>
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
      filter: { slug: { eq: "stackable-rebranding-the-orginal-cloud" } }
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
