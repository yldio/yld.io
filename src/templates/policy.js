import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'

import Layout from '../components/layout'
import { H1 } from '../components/Typography'
import { makeTextComponents } from '../utils/makeText'

const Body = styled.article`
  :last-of-type {
    margin-bottom: 108px;
  }
`

const Paragraph = styled.p`
  margin-bottom: 10px;
`

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: bold;
  line-height: 1.5;
`

const renderContent = makeTextComponents(Paragraph)
const Policy = ({ data }) => {
  const policy = data.allContentfulPolicy.edges[0].node
  const site = data.site
  console.log({ policy, site })

  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title}  ${
          policy.title ? '- ' + policy.title : ''
        } ${policy.seoTitle ? '- ' + policy.seoTitle : ''} `}
        meta={[
          {
            name: 'description',
            content: policy.seoMetaDescription
          }
        ]}
      >
        <html lang="en" />
      </Helmet>
      <Grid className="grid">
        <Row>
          <Col xs={12} sm={6}>
            <H1>{policy.title}</H1>
          </Col>
          <Col xs={12} sm={6}>
            {policy.body && policy.body.body && (
              <Body>{renderContent(policy.body.body)}</Body>
            )}
            {policy.section &&
              policy.section.length &&
              policy.section.map(({ title, content: { content } }) => (
                <Body key={title}>
                  <SectionTitle>{title}</SectionTitle>
                  {renderContent(content)}
                </Body>
              ))}
          </Col>
        </Row>
      </Grid>
    </Layout>
  )
}

export default Policy

export const pageQuery = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPolicy(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          title
          body {
            body
          }
          section {
            title
            content {
              content
            }
          }
        }
      }
    }
  }
`
