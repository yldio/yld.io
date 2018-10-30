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

export default ({ data }) => (
  <StaticQuery
    query={POSTS}
    render={({ allMediumPost }) => (
      <ul>
        {allMediumPost.edges.map(({ node: post }) => (
          <li key={post.id}>
            <a
              href={`https://medium.com/yld-engineering-blog/${
                post.uniqueSlug
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    )}
  />
)
