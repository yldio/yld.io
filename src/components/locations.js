import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const LOCATIONS = graphql`
  query locations {
    allContentfulLocation(sort: { fields: createdAt }) {
      edges {
        node {
          id
          name
          mapLocation {
            lon
            lat
          }
          telephone
          email
          streetAddress {
            id
            streetAddress
          }
        }
      }
    }
  }
`

const Locations = ({ data, children }) => (
  <StaticQuery
    query={LOCATIONS}
    render={({ allContentfulLocation }) => {
      return children(allContentfulLocation.edges)
    }}
  />
)

export default Locations
