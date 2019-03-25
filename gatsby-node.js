const _ = require(`lodash`)
const path = require(`path`)
const slash = require(`slash`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allContentfulTrainingCourseCategory {
        edges {
          node {
            id
            slug
            courses {
              id
              slug
            }
          }
        }
      }
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
      allContentfulTemplatedCaseStudy {
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

  const trainingCourseTemplate = path.resolve(
    `./src/templates/trainingCourseModal.js`
  )
  const caseStudyTemplate = path.resolve(`./src/templates/caseStudy.js`)
  const specialityTemplate = path.resolve(`./src/templates/speciality.js`)
  const serviceTemplate = path.resolve(`./src/templates/service.js`)
  const policyTemplate = path.resolve(`./src/templates/policy.js`)

  _.each(result.data.allContentfulTrainingCourseCategory.edges, edge => {
    if (edge.node.slug && edge.node.courses) {
      _.each(edge.node.courses, course => {
        if (course.slug && course.id) {
          createPage({
            path: `/training/${edge.node.slug}/${course.slug}`,
            component: slash(trainingCourseTemplate),
            context: {
              id: course.id,
              categoryId: edge.node.id
            }
          })
        }
      })
    }
  })

  _.each(result.data.allContentfulTemplatedCaseStudy.edges, edge => {
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
