// import React from 'react'
// import { StaticQuery, graphql } from 'gatsby'

// const POSTS = graphql`
//   query mediumPosts {
//     allMediumPost(
//       limit: 100
//       sort: { fields: [firstPublishedAt], order: DESC }
//     ) {
//       edges {
//         node {
//           id
//           title
//           firstPublishedAt
//           virtuals {
//             tags {
//               slug
//             }
//           }
//           uniqueSlug
//         }
//       }
//     }
//   }
// `

// const LatestPosts = ({ children }) => (
//   <StaticQuery
//     query={POSTS}
//     render={({ allMediumPost }) => children(allMediumPost.edges)}
//   />
// )

// exports = { LatestPosts }

export default null
