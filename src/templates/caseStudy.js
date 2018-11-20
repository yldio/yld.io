import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { Margin, Padding } from 'styled-components-spacing'
import { H2, Paragraph, H5 } from '../components/Typography'
import CaseStudyBottom from '../components/Homepage/caseStudy'
import CaseStudyTop from '../components/Common/topCaseStudy'
import Layout from '../components/layout'
import generateCaseStudy from '../utils/generateCaseStudy'
import GrayBackgroud from '../components/GrayBG'

const Stat = styled(H2)`
  font-size: ${remcalc(72)};
  padding-bottom: 0 !important; /* sorry */
`

const CaseStudy = ({ data: { allContentfulCaseStudy, site } }) => {
  const caseStudy = allContentfulCaseStudy.edges[0].node
  const body = generateCaseStudy(caseStudy)

  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title}  ${
          caseStudy.title ? '- ' + caseStudy.title : ''
        } ${caseStudy.seoTitle ? '- ' + caseStudy.seoTitle : ''} `}
        meta={[{ name: 'description', content: caseStudy.seoMetaDescription }]}
      >
        <html lang="en" />
      </Helmet>
      <Grid className="grid">
        <Padding bottom={0.5}>
          <CaseStudyTop caseStudy={caseStudy} />
        </Padding>
        <Margin bottom={4} />
        <Row>
          <Col xs={12} sm={9} md={7}>
            {body[0].map((text, i) => (
              <Paragraph padded key={i}>
                {text}
              </Paragraph>
            ))}
          </Col>
        </Row>
      </Grid>
      <GrayBackgroud topOffset={-250}>
        <Grid className="grid">
          <Padding bottom={4} top={4}>
            <Row center="md">
              <Col xs={12} md={10}>
                {body[1].map((text, i) => (
                  <div
                    key={i}
                    className="video-container"
                    dangerouslySetInnerHTML={{
                      __html: `<iframe width="844" height="480" src="${text}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    }}
                  />
                ))}
              </Col>
            </Row>
          </Padding>
          <Margin top={1} />
          <Row>
            <Col xs={12} sm={9} md={7}>
              {body[2].map((text, i) => (
                <Paragraph padded key={i}>
                  {text}
                </Paragraph>
              ))}
            </Col>
            <Col md={3} sm={12} mdOffset={1}>
              {caseStudy.stats &&
                caseStudy.stats.map(stat => (
                  <Margin bottom={1} key={stat.id}>
                    <Stat noTop>{stat.value}</Stat>
                    <H5 bold>{stat.label}</H5>
                  </Margin>
                ))}
            </Col>
          </Row>
          <Padding bottom={5} />
        </Grid>
      </GrayBackgroud>
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
    </Layout>
  )
}

export default CaseStudy

export const pageQuery = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulCaseStudy(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          title
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
              ...GatsbyContentfulFluid_tracedSVG
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
    }
  }
`
