import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Grid, Row, Col } from '../components/grid'
import { H1 } from '../components/Typography'
import Layout from '../components/layout'

const Specialty = ({ data }) => {
  const specialty = data.allContentfulSpeciality.edges[0].node
  const site = data.site
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
      <Grid>
        <Row>
          <Col xs={12}>
            <H1>{specialty.title}</H1>
          </Col>
        </Row>
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
        }
      }
    }
  }
`
