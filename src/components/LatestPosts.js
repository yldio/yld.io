import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const POSTS = graphql`
  query mediumPosts {
    allMediumPost(
      limit: 100
      sort: { fields: [firstPublishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          title
          firstPublishedAt
          virtuals {
            tags {
              slug
            }
          }
          uniqueSlug
        }
      }
    }
  }
`

const LatestPosts = ({ data, children }) => (
  <StaticQuery
    query={POSTS}
    render={({ allMediumPost }) => children(allMediumPost.edges)}
  />
)

export default LatestPosts
