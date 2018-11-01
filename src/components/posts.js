import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const POSTS = graphql`
  query mediumPosts {
    allMediumPost(limit: 5, sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          title
          createdAt
          uniqueSlug
        }
      }
    }
  }
`

const Posts = ({ data, children }) => (
  <StaticQuery
    query={POSTS}
    render={({ allMediumPost }) => children(allMediumPost.edges)}
  />
)

export default Posts
