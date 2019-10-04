import React from 'react'
import { Grid, Row, Col } from '../components/grid'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

const BlogPostTemplate = ({
  data: { contentfulBlogPost: post },
  location,
  __mdxScope
}) => {
  return (
    <Layout location={location}>
      <Grid>
        <Row>
          <Col>
            <h1>{post.title}</h1>
            <MDXRenderer scope={__mdxScope}>
              {post.markdown.childMdx.body}
            </MDXRenderer>
          </Col>
        </Row>
      </Grid>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      title
      slug
      tags
      markdown {
        childMdx {
          body
        }
      }
    }
  }
`
