import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const Specialty = ({ data }) => {
  console.log(data)
  const specialty = data.allContentfulSpeciality.edges[0].node

  return (
    <Layout>
      <h1>{specialty.title}</h1>
    </Layout>
  )
}

export default Specialty

export const pageQuery = graphql`
  query($id: String) {
    allContentfulSpeciality(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          title
        }
      }
    }
  }
`
