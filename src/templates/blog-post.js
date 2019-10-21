import React from 'react'
import { Grid, Row, Col } from '../components/grid'
import { H1, PostWrapper } from '../components/Blog/Typography'
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
        <Row style={{ justifyContent: 'center' }}>
          <PostWrapper as={Col} width={[1, 1, 9 / 12]}>
            <H1>{post.title}</H1>
            <MDXRenderer scope={__mdxScope}>
              {post.content.childMdx.body}
            </MDXRenderer>
          </PostWrapper>
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
      content {
        childMdx {
          body
        }
      }
    }
  }
`
