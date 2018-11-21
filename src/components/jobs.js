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

const makeJobs = allLever =>
  allLever.edges.reduce((acc, current) => {
    if (!acc[current.node.categories.location]) {
      acc[current.node.categories.location] = [current.node]
    } else {
      acc[current.node.categories.location].push(current.node)
    }

    return acc
  }, {})

const Jobs = ({ data, children }) => (
  <StaticQuery
    query={POSTS}
    render={({ allLever }) => children(makeJobs(allLever))}
  />
)

export default Jobs
