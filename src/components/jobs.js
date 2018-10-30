import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const POSTS = graphql`
  query JOBS_BY_CITY {
    allLever(limit: 40) {
      edges {
        node {
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

export default ({ data }) => (
  <StaticQuery
    query={POSTS}
    render={({ allLever }) => {
      const jobs = allLever.edges.reduce((acc, current) => {
        if (!acc[current.node.categories.location]) {
          acc[current.node.categories.location] = [current.node]
        }

        acc[current.node.categories.location].push(current.node)

        return acc
      }, {})
      console.log(jobs)
      return Object.keys(jobs).map(key => (
        <>
          <h3>{key}</h3>
          <ul>
            {jobs[key].map(job => (
              <li>
                <a
                  rel="noopener noreferrer"
                  href={job.hostedUrl}
                  target="_blank"
                >
                  {job.text}
                </a>
                {job.categories.commitment}
              </li>
            ))}
          </ul>
        </>
      ))
    }}
  />
)
