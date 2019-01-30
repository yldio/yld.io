import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const JOBS_BY_LOCATION = graphql`
  query JOBS_BY_CITY {
    allLever(limit: 40) {
      group(field: categories___location) {
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
  }
`

/**
 * Aux function for adjusting the group ordering.
 * The current sorting brought from the query is alphabetical but
 * it seems London is suppposed to come first in the list.
 */
const sortJobs = jobsByLocation => {
  const sortedJobs = []

  jobsByLocation.forEach(group => {
    const location = group.edges[0].node.categories.location

    if (location === 'London') {
      sortedJobs.unshift({
        location,
        jobs: group.edges
      })
    } else {
      sortedJobs.push({
        location,
        jobs: group.edges
      })
    }
  })

  return sortedJobs
}

const JobsByLocation = ({ children, sort = sortJobs }) => (
  <StaticQuery
    query={JOBS_BY_LOCATION}
    render={({ allLever }) => children(sort(allLever.group))}
  />
)

export default JobsByLocation
