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
const sortJobs = (jobsByLocation, limit) => {
  const sortedJobs = []
  jobsByLocation.forEach(group => {
    const location = group.edges[0].node.categories.location
    const limitedJobs = group.edges.slice(0, limit)

    if (location === 'London') {
      sortedJobs.unshift({
        location,
        jobs: limitedJobs
      })
    } else {
      sortedJobs.push({
        location,
        jobs: limitedJobs
      })
    }
  })

  return sortedJobs
}

const JobsByLocation = ({ children, sort = sortJobs, limit }) => (
  <StaticQuery
    query={JOBS_BY_LOCATION}
    render={({ allLever }) => children(sort(allLever.group, limit))}
  />
)

export default JobsByLocation
