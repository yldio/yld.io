import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const POSTS = graphql`
  query contentfulBlogPosts {
    allContentfulBlogPost(
      limit: 100
      sort: { fields: [firstPublishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          title
          firstPublishedAt
          tags
          slug
        }
      }
    }
  }
`

const LatestPosts = ({ children }) => (
  <StaticQuery
    query={POSTS}
    render={({ allContentfulBlogPost }) =>
      children(allContentfulBlogPost.edges)
    }
  />
)

export default LatestPosts
