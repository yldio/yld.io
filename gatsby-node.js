const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

//  /case-study/blah
// /speciality/react

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(
      `
        query {
          allContentfulSpeciality {
            edges {
              node {
                id
                slug
              }
            }
          }
          allContentfulCaseStudy {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      const caseStudyTemplate = path.resolve(`./src/templates/caseStudy.js`)
      const specialityTemplate = path.resolve(`./src/templates/speciality.js`)

      _.each(result.data.allContentfulCaseStudy.edges, edge => {
        createPage({
          path: `/case-study/${edge.node.slug}/`,
          component: slash(caseStudyTemplate),
          context: {
            id: edge.node.id
          }
        })
      })

      _.each(result.data.allContentfulSpeciality.edges, edge => {
        createPage({
          path: `/speciality/${edge.node.slug}/`,
          component: slash(specialityTemplate),
          context: {
            id: edge.node.id
          }
        })
      })
      resolve()
    })
  })
}
