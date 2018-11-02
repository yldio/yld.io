import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const Service = ({ data }) => {
  const service = data.allContentfulService.edges[0].node

  return (
    <Layout>
      <h1>{service.title}</h1>
    </Layout>
  )
}

export default Service

export const pageQuery = graphql`
  query($id: String) {
    allContentfulService(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          title
        }
      }
    }
  }
`
