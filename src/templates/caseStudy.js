import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const CaseStudy = ({ data }) => {
  const caseStudy = data.allContentfulCaseStudy.edges[0].node
  const site = data.site

  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title}  ${caseStudy.title ? '-' + caseStudy.title : ''} - ${
          caseStudy.seoTitle ? '-' + caseStudy.seoTitle : ''
        } `}
        meta={[{ name: 'description', content: caseStudy.seoMetaDescription }]}
      >
        <html lang="en" />
      </Helmet>
      <h1>{caseStudy.title}</h1>
    </Layout>
  )
}

export default CaseStudy

export const pageQuery = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulCaseStudy(filter: { id: { eq: $id } }) {
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
