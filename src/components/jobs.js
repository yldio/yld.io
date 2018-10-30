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

export default ({ data }) => (
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
      return Object.keys(jobs).map(key => (
        <article key={`${key}-${jobs[key].length}-main`}>
          <h3>{key}</h3>
          <ul>
            {jobs[key].map(job => (
              <li key={`${job.id}`}>
                <a
                  rel="noopener noreferrer"
                  href={job.hostedUrl}
                  target="_blank"
                >
                  {job.text} -
                </a>
                {job.categories.commitment}
              </li>
            ))}
          </ul>
        </article>
      ))
    }}
  />
)
