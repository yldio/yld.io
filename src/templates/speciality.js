import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { H1, H2, H4, Paragraph } from '../components/Typography'
import Layout from '../components/layout'

const Specialty = ({ data }) => {
  const specialty = data.allContentfulSpeciality.edges[0].node
  const site = data.site
  console.log(specialty)
  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title}  ${
          specialty.title ? '- ' + specialty.title : ''
        } ${specialty.seoTitle ? '- ' + specialty.seoTitle : ''} `}
        meta={[
          {
            name: 'description',
            content: specialty.seoMetaDescription
          }
        ]}
      >
        <html lang="en" />
      </Helmet>
      <Grid className="grid">
        <Row>
          <Col xs={12}>
            <H1>{specialty.title}</H1>
            <Paragraph>
              {specialty.seoText.content[0].content[0].value}
            </Paragraph>
            <H2>{specialty.introTitle}</H2>
            <Row>
              <Col md={4} sm={12} xs={12}>
                <H4>{specialty.introTextTitle1}</H4>
                <Paragraph>
                  {specialty.introTextBody1.content[0].content[0].value}
                </Paragraph>
              </Col>
              <Col md={4} sm={12} xs={12}>
                <H4>{specialty.introTextTitle2}</H4>
                <Paragraph>
                  {specialty.introTextBody2.content[0].content[0].value}
                </Paragraph>
              </Col>
              <Col md={4} sm={12} xs={12}>
                <H4>{specialty.introTextTitle3}</H4>
                <Paragraph>
                  {specialty.introTextBody3.content[0].content[0].value}
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
      <Grid className="grid">
        <Col md={6} sm={12} xs={12}>
          <H1>{specialty.title}</H1>
          <H1 muted>related projects</H1>
        </Col>
      </Grid>
    </Layout>
  )
}

export default Specialty

export const pageQuery = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulSpeciality(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          title
          seoTitle
          seoMetaDescription
          seoText {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          introTitle
          introTextTitle1
          introTextBody1 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          introTextTitle2
          introTextBody2 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          introTextTitle3
          introTextBody3 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          relatedProjects {
            ... on ContentfulCaseStudy {
              title
              slug
              posterColor
              posterImage {
                title
                file {
                  url
                }
              }
            }
          }
          trainingIntroText {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          trainingTextIcon1 {
            id
            title
            file {
              url
              fileName
            }
          }
          trainingTextTitle1
          trainingTextBody1 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          trainingTextIcon2 {
            id
            title
            file {
              url
              fileName
            }
          }
          trainingTextTitle2
          trainingTextBody2 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          trainingTextIcon3 {
            id
            title
            file {
              url
              fileName
            }
          }
          trainingTextTitle3
          trainingTextBody3 {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          communityText {
            nodeType
            content {
              nodeType
              content {
                nodeType
                value
              }
            }
          }
          communityLogo {
            id
            title
            file {
              fileName
              url
            }
          }
        }
      }
    }
  }
`
