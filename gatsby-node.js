const forEach = require(`lodash.foreach`);
const path = require(`path`);
const slash = require(`slash`);
const { getTagsForTitle } = require('./src/utils/getTagsForTitle');
const { writeFile } = require('mz/fs');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

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
            speciality {
              id
              slug
              title
              generate
              blogpostTags
            }
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
      allContentfulBlogPost(
        filter: { publish: { eq: true } }
        sort: { firstPublishedAt: DESC }
      ) {
        edges {
          node {
            id
            slug
            content {
              content
            }
            aliases
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

  forEach(result.data.allContentfulTrainingCourseCategory.edges, (edge) => {
    if (edge.node.slug && edge.node.courses) {
      forEach(edge.node.courses, (course) => {
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

  forEach(result.data.allContentfulTemplatedCaseStudy.edges, (edge) => {
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

  forEach(result.data.allContentfulService.edges, (edge) => {
    if (edge.node.slug) {
      createPage({
        path: `/${edge.node.slug}/`,
        component: slash(serviceTemplate),
        context: {
          id: edge.node.id,
        },
      });

      forEach(edge.node.speciality, (speciality) => {
        const { id, slug, title, generate, blogpostTags } = speciality;

        if (slug && generate) {
          const titleTags = getTagsForTitle(title);
          const contentfulTags = blogpostTags
            ? blogpostTags.map((el) => el.toLowerCase().trim())
            : [];

          createPage({
            path: `/${edge.node.slug}/${slug}/`,
            component: slash(specialityTemplate),
            context: {
              id,
              postsLimit: 3,
              postsTags: [...titleTags, ...contentfulTags],
            },
          });
        }
      });
    }
  });

  forEach(result.data.allContentfulPolicy.edges, (edge) => {
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

  forEach(allBlogPosts, (post) => {
    if (post.node.slug && post.node.content) {
      createPage({
        path: `/blog/${post.node.slug}/`,
        component: slash(blogPostTemplate),
        context: {
          id: post.node.id,
        },
      });

      forEach(post.node.aliases, (alias) =>
        createRedirect({
          fromPath: alias,
          toPath: `/blog/${post.node.slug}/`,
          isPermanent: true,
          force: true,
        }),
      );
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

    let slug;
    let title;
    let date;
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
        group(field: { categories: { location: SELECT } }) {
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

exports.onCreatePage = async ({
  page,
  actions: { createPage, deletePage },
}) => {
  // this approach was taken from the gatsby docs https://www.gatsbyjs.org/docs/creating-prefixed-404-pages-for-different-languages/
  if (/^\/blog\/404\/$/.test(page.path)) {
    const oldPage = { ...page };
    page.matchPath = '/blog/*';
    deletePage(oldPage);
    createPage(page);
  }
};
