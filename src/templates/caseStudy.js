import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { Margin, Padding } from 'styled-components-spacing'
import { H1, Paragraph, H5 } from '../components/Typography'
import CaseStudyBottom from '../components/Homepage/caseStudy'
import CaseStudyTop from '../components/Common/topCaseStudy'
import Layout from '../components/layout'

const Stat = styled(H1)`
  font-size: ${remcalc(72)};
  padding-bottom: 0 !important; /* sorry */
`

const CaseStudy = ({ data: { allContentfulCaseStudy, site } }) => {
  const caseStudy = allContentfulCaseStudy.edges[0].node

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
        <CaseStudyTop caseStudy={caseStudy} />
        <Margin bottom={4} />
        <Row>
          <Col xs={12} sm={9} md={7}>
            {caseStudy.body.content
              .filter(
                c =>
                  c.content[0] &&
                  c.content[0].marks &&
                  !c.content[0].marks.length
              )
              .slice(0, 2)
              .map(
                (c, i) =>
                  c.content[0] && (
                    <Paragraph padded key={i}>
                      {c.content[0].value}
                    </Paragraph>
                  )
              )}
          </Col>
        </Row>
        <Margin bottom={4} top={3}>
          <Row center="md">
            <Col xs={12} md={10}>
              {caseStudy.body.content
                .filter(
                  c =>
                    c.content[0] &&
                    c.content[0].marks &&
                    c.content[0].marks.length
                )
                .map(
                  (c, i) =>
                    c.content[0] && (
                      <div
                        className="video-container"
                        dangerouslySetInnerHTML={{ __html: c.content[0].value }}
                      />
                    )
                )}
            </Col>
          </Row>
        </Margin>
        <Row>
          <Col xs={12} sm={9} md={7}>
            {caseStudy.body.content
              .filter(
                c =>
                  c.content[0] &&
                  c.content[0].marks &&
                  !c.content[0].marks.length
              )
              .slice(2)
              .map(
                (c, i) =>
                  c.content[0] && (
                    <Paragraph padded key={i}>
                      {c.content[0].value}
                    </Paragraph>
                  )
              )}
          </Col>
          <Col md={3} sm={12} mdOffset={1}>
            {caseStudy.stats &&
              caseStudy.stats.map(stat => (
                <Fragment key={stat.id}>
                  <Stat>{stat.value}</Stat>
                  <H5 bold>{stat.label}</H5>
                </Fragment>
              ))}
          </Col>
        </Row>
        <Padding bottom={5} />
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
              file {
                url
              }
            }
            posterColor
            body {
              content {
                content {
                  value
                  nodeType
                }
              }
            }
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
