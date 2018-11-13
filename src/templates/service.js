import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { H1, H6, H3 } from '../components/Typography'
import { Padding } from 'styled-components-spacing'
import Layout from '../components/layout'
import CaseStudy from '../components/Homepage/caseStudy'
import SeoLinks from '../components/Common/seoLinks'
import WorkStages from '../components/Service/workStage'
import GrayBackground from '../components/GrayBG'

const Service = ({ data }) => {
  const service = data.allContentfulService.edges[0].node
  const site = data.site
  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title}  ${
          service.title ? '- ' + service.title : ''
        } ${service.seoTitle ? '- ' + service.seoTitle : ''} `}
        meta={[{ name: 'description', content: service.seoMetaDescription }]}
      >
        <html lang="en" />
      </Helmet>
      <Grid className="grid">
        <Row>
          <Col xs={12}>
            <CaseStudy caseStudy={service.caseStudies[0]} />
            <GrayBackground>
              <Grid className="grid">
                <Padding top={6} bottom={4}>
                  <H3>{service.mainPageIntroSentence.mainPageIntroSentence}</H3>
                  <Padding bottom={4} />
                </Padding>
              </Grid>
            </GrayBackground>
            <p>{}</p>
            <WorkStages
              title={service.workStagesTitle}
              workStages={service.workStages}
            />
            <div>
              <H1>We work with</H1>
              <H6>{service.specialityAreaTitle1}</H6>
              <H6>
                <SeoLinks items={service.specialityAreaItems1} />
              </H6>
              <H6>{service.specialityAreaTitle2}</H6>
              <H6>
                <SeoLinks items={service.specialityAreaItems2} />
              </H6>
              <H6>{service.specialityAreaTitle3}</H6>
              <H6>
                <SeoLinks items={service.specialityAreaItems3} />
              </H6>
              <H6>{service.specialityAreaTitle4}</H6>
              <H6>
                <SeoLinks items={service.specialityAreaItems4} />
              </H6>
            </div>
          </Col>
        </Row>
      </Grid>
    </Layout>
  )
}

export default Service

export const pageQuery = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulService(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          title
          seoTitle
          seoMetaDescription
          mainPageIntroSentence {
            mainPageIntroSentence
          }
          caseStudies {
            ... on ContentfulCaseStudy {
              title
              slug
              body {
                content {
                  content {
                    value
                    nodeType
                  }
                }
              }
              posterColor
              posterImage {
                file {
                  url
                }
              }
            }
          }
          workStagesTitle
          workStagesImage {
            file {
              url
              fileName
              contentType
            }
          }
          workStages {
            id
            title
            sectionTitle1
            sectionTitle2
            sectionTitle3
            sectionTitle4
            sectionTitle5
            sectionIcon1 {
              file {
                url
              }
            }
            sectionIcon2 {
              file {
                url
              }
            }
            sectionIcon3 {
              file {
                url
              }
            }
            sectionIcon4 {
              file {
                url
              }
            }
            sectionIcon5 {
              file {
                url
              }
            }
            sectionBody1 {
              sectionBody1
            }
            sectionBody2 {
              sectionBody2
            }
            sectionBody3 {
              sectionBody3
            }

            sectionBody4 {
              sectionBody4
            }

            sectionBody5 {
              sectionBody5
            }
          }
          specialityAreaTitle1
          specialityAreaItems1 {
            id
            slug
            title
            body {
              nodeType
            }
          }
          specialityAreaTitle2
          specialityAreaItems2 {
            id
            slug
            title
            body {
              nodeType
            }
          }
          specialityAreaTitle3
          specialityAreaItems3 {
            id
            slug
            title
            body {
              nodeType
            }
          }
          specialityAreaTitle4
          specialityAreaItems4 {
            id
            slug
            title
            body {
              nodeType
            }
          }
        }
      }
    }
  }
`
