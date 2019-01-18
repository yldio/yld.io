const _ = require(`lodash`)
const path = require(`path`)
const slash = require(`slash`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allContentfulSpeciality {
        edges {
          node {
            id
            slug
            generate
          }
        }
      }
      allContentfulService {
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
      allContentfulPolicy {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const caseStudyTemplate = path.resolve(`./src/templates/caseStudy.js`)
  const specialityTemplate = path.resolve(`./src/templates/speciality.js`)
  const serviceTemplate = path.resolve(`./src/templates/service.js`)
  const policyTemplate = path.resolve(`./src/templates/policy.js`)

  _.each(result.data.allContentfulCaseStudy.edges, edge => {
    if (edge.node.slug) {
      createPage({
        path: `/case-study/${edge.node.slug}/`,
        component: slash(caseStudyTemplate),
        context: {
          id: edge.node.id
        }
      })
    }
  })

  _.each(result.data.allContentfulSpeciality.edges, edge => {
    if (edge.node.slug && edge.node.generate) {
      createPage({
        path: `/speciality/${edge.node.slug}/`,
        component: slash(specialityTemplate),
        context: {
          id: edge.node.id
        }
      })
    }
  })

  _.each(result.data.allContentfulService.edges, edge => {
    if (edge.node.slug) {
      createPage({
        path: `/${edge.node.slug}/`,
        component: slash(serviceTemplate),
        context: {
          id: edge.node.id
        }
      })
    }
  })

  _.each(result.data.allContentfulPolicy.edges, edge => {
    if (edge.node.slug) {
      createPage({
        path: `/${edge.node.slug}/`,
        component: slash(policyTemplate),
        context: {
          id: edge.node.id
        }
      })
    }
  })
}
