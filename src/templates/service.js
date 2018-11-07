import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const Service = ({ data }) => {
  const service = data.allContentfulService.edges[0].node
  const site = data.site

  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title}  ${service.title ? '-' + service.title : ''} - ${
          service.seoTitle ? '-' + service.seoTitle : ''
        } `}
        meta={[{ name: 'description', content: service.seoMetaDescription }]}
      >
        <html lang="en" />
      </Helmet>
      <h1>{service.title}</h1>
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
        }
      }
    }
  }
`
