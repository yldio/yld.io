import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { Padding } from 'styled-components-spacing'

import Layout from '../components/layout'
import { makeText } from '../utils/makeText'

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: bold;
  line-height: 1.5;
`

const Title = styled.h1`
  font-size: ${remcalc(42)};
  line-height: ${remcalc(42)};
  font-weight: 500;
`
const Body = styled.article`
  > p {
    margin-bottom: 10px;
  }
`

const Section = styled.section`
  margin-bottom: 10px;
`

const renderParagraphs = content =>
  makeText(content).map(cont => <p key={cont}>{cont}</p>)
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
      <Padding top={4} bottom={5}>
        <Grid className="grid">
          <Row>
            <Col xs={12} sm={6}>
              <Title>{policy.title}</Title>
            </Col>
            <Col xs={12} sm={6}>
              {policy.body && policy.body.body && (
                <Body>{renderParagraphs(policy.body.body)}</Body>
              )}
              {policy.section &&
                policy.section.length &&
                policy.section.map(({ title, content: { content } }) => (
                  <Section key={title}>
                    <SectionTitle>{title}</SectionTitle>
                    {renderParagraphs(content)}
                  </Section>
                ))}
            </Col>
          </Row>
        </Grid>
      </Padding>
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
