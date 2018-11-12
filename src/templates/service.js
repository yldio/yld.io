import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { H1, H6 } from '../components/Typography'
import Layout from '../components/layout'
import CaseStudy from '../components/Homepage/caseStudy'
import SeoLinks from '../components/Common/seoLinks'

const WorkStage = ({ workStage }) => {
  const sections = Array(5)
    .fill({})
    .map((element, index) => ({
      sectionTitle: workStage[`sectionTitle${index + 1}`],
      ...(workStage[`sectionBody${index + 1}`] && {
        sectionBody:
          workStage[`sectionBody${index + 1}`][`sectionBody${index + 1}`]
      }),
      ...(workStage[`sectionIcon${index + 1}`] && {
        sectionIcon: workStage[`sectionIcon${index + 1}`]
      })
    }))
    .filter(({ sectionTitle }) => sectionTitle)
  return (
    <div>
      <H1>{workStage.title}</H1>
      {sections.map(({ sectionTitle, sectionBody }) => (
        <div key={sectionTitle}>
          <p>{sectionTitle}</p>
          <p>{sectionBody}</p>
        </div>
      ))}
    </div>
  )
}

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
            <p>{service.mainPageIntroSentence.mainPageIntroSentence}</p>
            <div>
              <H1>{service.workStagesTitle}</H1>
              {service.workStages.map(workStage => (
                <WorkStage key={workStage.id} workStage={workStage} />
              ))}
            </div>
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
