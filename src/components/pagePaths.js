import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

let cachedPathsById = null

export default function PagePaths(props) {
  if (cachedPathsById) {
    return props.render(cachedPathsById)
  }
  return (
    <StaticQuery
      query={graphql`
        query {
          allSitePage {
            edges {
              node {
                id
                path
                context {
                  id
                }
              }
            }
          }
        }
      `}
      render={data => {
        cachedPathsById = {}
        data.allSitePage.edges.forEach(
          edge =>
            edge.node.context &&
            (cachedPathsById[edge.node.context.id] = edge.node.path),
        )
        return props.render(cachedPathsById)
      }}
    />
  )
}
