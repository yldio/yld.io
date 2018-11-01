import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const CaseStudy = ({ data }) => {
  console.log(data)
  const caseStudy = data.allContentfulCaseStudy.edges[0].node

  return (
    <Layout>
      <h1>{caseStudy.title}</h1>
    </Layout>
  )
}

export default CaseStudy

export const pageQuery = graphql`
  query($id: String) {
    allContentfulCaseStudy(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          title
        }
      }
    }
  }
`
