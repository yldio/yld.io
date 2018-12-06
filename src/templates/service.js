import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { H2, H6, H3, H5, Paragraph } from '../components/Typography'
import { Padding } from 'styled-components-spacing'
import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import CaseStudy from '../components/Homepage/caseStudy'
import SeoLinks from '../components/Common/seoLinks'
import WorkStages from '../components/Service/work-stage/index'
import GrayBackground from '../components/GrayBG'

const Title = H3.withComponent('h1')

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
      <Grid>
        <Row>
          <Col width={[1]}>
            <CaseStudy
              caseStudy={service.caseStudies[0]}
              subHeading="Featured work"
            />
          </Col>
        </Row>
      </Grid>

      <GrayBackground>
        <Grid>
          <Row>
            <Col width={[9 / 12]}>
              <Padding top={5} bottom={4}>
                <Title>
                  {service.mainPageIntroSentence.mainPageIntroSentence}
                </Title>
              </Padding>
            </Col>
          </Row>
        </Grid>
      </GrayBackground>
      <GrayBackground noTop style={{ background: '#090329' }}>
        <WorkStages
          title={service.workStagesTitle}
          workStages={service.workStages}
          image={service.graphic}
        />
      </GrayBackground>
      <GrayBackground noTop>
        <Padding top={5} bottom={6}>
          <Grid>
            <Row>
              <H2>We work with</H2>
              <Row>
                <Col pt={5} width={[1, 1, 1, 3 / 12, 3 / 12, 3 / 12]}>
                  <Fragment>
                    <H5>{service.specialityAreaTitle1}</H5>
                    <H6>
                      <SeoLinks items={service.specialityAreaItems1} />
                    </H6>
                  </Fragment>
                </Col>
                <Col pt={5} width={[1, 1, 1, 3 / 12, 3 / 12, 3 / 12]}>
                  <Fragment>
                    <H5>{service.specialityAreaTitle2}</H5>
                    <H6>
                      <SeoLinks items={service.specialityAreaItems2} />
                    </H6>
                  </Fragment>
                </Col>
                <Col pt={5} width={[1, 1, 1, 3 / 12, 3 / 12, 3 / 12]}>
                  {service.specialityAreaTitle3 && (
                    <Fragment>
                      <H5>{service.specialityAreaTitle3}</H5>
                      <H6>
                        <SeoLinks items={service.specialityAreaItems3} />
                      </H6>
                    </Fragment>
                  )}
                </Col>
                <Col pt={5} width={[1, 1, 1, 3 / 12, 3 / 12, 3 / 12]}>
                  {service.specialityAreaTitle4 && (
                    <Fragment vertical={6}>
                      <H5>{service.specialityAreaTitle4}</H5>
                      <H6>
                        <SeoLinks items={service.specialityAreaItems4} />
                      </H6>
                    </Fragment>
                  )}
                </Col>
              </Row>
            </Row>
          </Grid>
        </Padding>
      </GrayBackground>
      <Grid>
        <Row>
          <Col width={[1]}>
            <Padding top={4} bottom={2}>
              <Paragraph>More of our work</Paragraph>
            </Padding>
          </Col>
        </Row>
        {service.bottomCaseStudy ? (
          <Padding bottom={5}>
            <CaseStudy caseStudy={service.bottomCaseStudy} />
          </Padding>
        ) : null}
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
          graphic {
            fluid(maxWidth: 680) {
              ...GatsbyContentfulFluid_tracedSVG
            }
            title
            file {
              url
            }
          }
          bottomCaseStudy {
            title
            slug
            introSentence
            posterImage {
              title
              fluid(maxWidth: 600) {
                ...GatsbyContentfulFluid_tracedSVG
              }
              file {
                url
              }
            }
            posterColor
          }
          caseStudies {
            ... on ContentfulCaseStudy {
              title
              slug
              introSentence
              posterColor
              posterImage {
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_tracedSVG
                }
                title
                file {
                  url
                }
              }
            }
            ... on ContentfulGenericCaseStudy {
              title
              slug
              intro: introSentence {
                introSentence
              }
              posterColor
              posterImage {
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_tracedSVG
                }
                title
                file {
                  url
                }
              }
            }
          }
          workStagesTitle
          workStagesImage {
            title
            fluid(maxWidth: 680) {
              ...GatsbyContentfulFluid_tracedSVG
            }
            file {
              url
              fileName
              contentType
            }
          }
          workStages {
            id
            title
            displayType
            alternativeTitle
            alternativeWorkStages {
              title
              alternativeTitle
              sectionTitle1
              sectionTitle2
              sectionTitle3
              sectionTitle4
              sectionTitle5
              sectionIcon1 {
                title
                file {
                  url
                }
              }
              sectionIcon2 {
                title
                file {
                  url
                }
              }
              sectionIcon3 {
                title
                file {
                  url
                }
              }
              sectionIcon4 {
                title
                file {
                  url
                }
              }
              sectionIcon5 {
                title
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
            sectionTitle1
            sectionTitle2
            sectionTitle3
            sectionTitle4
            sectionTitle5
            sectionIcon1 {
              title
              file {
                url
              }
            }
            sectionIcon2 {
              title
              file {
                url
              }
            }
            sectionIcon3 {
              title
              file {
                url
              }
            }
            sectionIcon4 {
              title
              file {
                url
              }
            }
            sectionIcon5 {
              title
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
