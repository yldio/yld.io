import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const POSTS = graphql`
  query JOBS_BY_CITY {
    allLever(limit: 40) {
      edges {
        node {
          id
          categories {
            location
            commitment
          }
          text
          hostedUrl
        }
      }
    }
  }
`

const Jobs = ({ data, children }) => (
  <StaticQuery
    query={POSTS}
    render={({ allLever }) => {
      const jobs = allLever.edges.reduce((acc, current) => {
        if (!acc[current.node.categories.location]) {
          acc[current.node.categories.location] = [current.node]
        } else {
          acc[current.node.categories.location].push(current.node)
        }

        return acc
      }, {})
      return children(jobs)
    }}
  />
)

export default Jobs
