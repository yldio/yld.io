const _ = require(`lodash`);
const path = require(`path`);
const slash = require(`slash`);
const { getTagsForTitle } = require('./src/utils/getTagsForTitle');
const { writeFile } = require('mz/fs');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
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
            title
            blogpostTags
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
      contentfulCareerFramework {
        publish
      }
      allContentfulCareerDiscipline {
        edges {
          node {
            id
            title
            slug
          }
        }
      }
      allContentfulBlogPost(
        filter: { publish: { eq: true } }
        sort: { fields: [firstPublishedAt], order: DESC }
      ) {
        edges {
          node {
            id
            slug
            content {
              content
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const trainingCourseTemplate = path.resolve(
    `./src/templates/trainingCourseModal.js`,
  );
  const caseStudyTemplate = path.resolve(`./src/templates/caseStudy.js`);
  const specialityTemplate = path.resolve(`./src/templates/speciality.js`);
  const serviceTemplate = path.resolve(`./src/templates/service.js`);
  const blogListTemplate = path.resolve(`./src/templates/blog.js`);
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`);
  const policyTemplate = path.resolve(`./src/templates/policy.js`);
  const careerDisciplineTemplate = path.resolve(
    `./src/templates/career-discipline.js`,
  );

  _.each(result.data.allContentfulTrainingCourseCategory.edges, edge => {
    if (edge.node.slug && edge.node.courses) {
      _.each(edge.node.courses, course => {
        if (course.slug && course.id) {
          createPage({
            path: `/training/${edge.node.slug}/${course.slug}/`,
            component: slash(trainingCourseTemplate),
            context: {
              id: course.id,
              categoryId: edge.node.id,
            },
          });
        }
      });
    }
  });

  _.each(result.data.allContentfulTemplatedCaseStudy.edges, edge => {
    if (edge.node.slug) {
      createPage({
        path: `/case-study/${edge.node.slug}/`,
        component: slash(caseStudyTemplate),
        context: {
          id: edge.node.id,
        },
      });
    }
  });

  _.each(result.data.allContentfulSpeciality.edges, ({ node }) => {
    const { id, slug, title, generate, blogpostTags } = node;

    if (slug && generate) {
      const titleTags = getTagsForTitle(title);
      const contentfulTags = blogpostTags
        ? blogpostTags.map(el => el.toLowerCase().trim())
        : [];

      createPage({
        path: `/speciality/${slug}/`,
        component: slash(specialityTemplate),
        context: {
          id: id,
          postsLimit: 3,
          postsTags: [...titleTags, ...contentfulTags],
        },
      });
    }
  });

  _.each(result.data.allContentfulService.edges, edge => {
    if (edge.node.slug) {
      createPage({
        path: `/${edge.node.slug}/`,
        component: slash(serviceTemplate),
        context: {
          id: edge.node.id,
        },
      });
    }
  });

  _.each(result.data.allContentfulPolicy.edges, edge => {
    if (edge.node.slug) {
      createPage({
        path: `/${edge.node.slug}/`,
        component: slash(policyTemplate),
        context: {
          id: edge.node.id,
        },
      });
    }
  });

  if (result.data.contentfulCareerFramework.publish) {
    _.each(result.data.allContentfulCareerDiscipline.edges, edge => {
      if (edge.node.slug) {
        createPage({
          path: `/career-framework/${edge.node.slug}/`,
          component: slash(careerDisciplineTemplate),
          context: {
            id: edge.node.id,
            slug: edge.node.slug,
          },
        });
      }
    });
  }

  /**
   * Creates all pages for blog listing pages,
   * includes context for paging functionality
   */

  const allBlogPosts = result.data.allContentfulBlogPost.edges;
  const postsPerPage = 6;

  const numberOfPages = Math.ceil(allBlogPosts.length / postsPerPage);

  Array.from({
    length: numberOfPages,
  }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/page/${i + 1}/`,
      component: slash(blogListTemplate),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numberOfPages,
        currentPage: i + 1,
      },
    });
  });

  _.each(allBlogPosts, post => {
    if (post.node.slug && post.node.content) {
      createPage({
        path: `/blog/${post.node.slug}/`,
        component: slash(blogPostTemplate),
        context: {
          id: post.node.id,
        },
      });
    }
  });
};

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  /**
   * This section creates nodes within the graphql schema
   * that we can query blog post content on.
   */
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);

    let slug, title, date;
    if (parent.internal.type === 'contentfulBlogPostContentTextNode') {
      const contentfulNode = getNode(parent.parent);

      slug = contentfulNode.slug;
      title = contentfulNode.title;
      date = contentfulNode.createdAt;
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });

    createNodeField({
      node,
      name: `title`,
      value: title,
    });

    createNodeField({
      node,
      name: `date`,
      value: date,
    });
  }
};

exports.onPostBuild = async ({ graphql }) => {
  /**
   * Grab a bunch of meta information from the site and make public
   *
   * The lever information is used in the lever lambda to work out whether to
   * trigger a new build of the site. see src/functions/lever.js
   */
  const {
    errors,
    data: { allLever },
  } = await graphql(`
    {
      allLever(limit: 500) {
        group(field: categories___location) {
          edges {
            node {
              lever_id
            }
          }
        }
      }
    }
  `);

  if (errors) {
    throw new Error(errors);
  }

  const allJobIds =
    allLever &&
    allLever.group &&
    allLever.group.reduce(
      (acc, { edges }) =>
        acc.concat(...edges.map(({ node: { lever_id: id } }) => id)),
      [],
    );

  await writeFile('./public/meta.json', JSON.stringify({ allJobIds }));
};
