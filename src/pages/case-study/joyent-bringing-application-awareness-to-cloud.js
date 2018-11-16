import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import CaseStudyTop from '../../components/Common/topCaseStudy'
import CaseStudyBottom from '../../components/Homepage/caseStudy'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import { Padding, Margin } from 'styled-components-spacing'
import { Paragraph } from '../../components/Typography'

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
        <CaseStudyTop caseStudy={caseStudy} />

        <Padding top={7} bottom={4}>
          <Row>
            <Col xs={12} sm={9} md={7}>
              <Paragraph padded>
                {caseStudy.introSentence.introSentence}
              </Paragraph>
            </Col>
          </Row>
        </Padding>
        <Padding bottom={2} />
      </Grid>
      <span>hi mum</span>
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
