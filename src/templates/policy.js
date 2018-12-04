import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'

import Layout from '../components/layout'
import { H1 } from '../components/Typography'
import { makeText } from '../utils/makeText'

const Body = styled.article`
  > p {
    margin-bottom: 10px;
  }
  margin-bottom: 108px;
`
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
              <Body>
                {makeText(policy.body.body).map(content => (
                  <p key={content}>{content}</p>
                ))}
              </Body>
            )}
            {policy.section &&
              policy.section.length &&
              policy.section.map(pol => <p key={pol}>{pol}</p>)}
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
