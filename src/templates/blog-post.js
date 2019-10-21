import React from 'react'
import { Grid, Row, Col } from '../components/grid'
import { PostWrapper } from '../components/Blog/Typography'

import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import {
  PostIntroMetaData,
  PostOutroMetaData
} from '../components/Blog/PostMetaData'

const BlogPostTemplate = ({
  data: { contentfulBlogPost: post },
  location,
  __mdxScope
}) => {
  return (
    <Layout location={location}>
      <Grid>
        <Row style={{ justifyContent: 'center' }}>
          <Col width={[1, 1, 9 / 12]}>
            <PostIntroMetaData
              author={post.authorName}
              date={post.firstPublishedAt}
              readTime={post.content.childMdx.timeToRead}
            />
          </Col>
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <PostWrapper as={Col} width={[1, 1, 9 / 12]}>
            <MDXRenderer scope={__mdxScope}>
              {post.content.childMdx.body}
            </MDXRenderer>
          </PostWrapper>
          <Col width={[1, 1, 9 / 12]}>
            <PostOutroMetaData
              author={post.authorName}
              date={post.firstPublishedAt}
              tags={post.tags}
            />
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
      firstPublishedAt
      authorId
      authorName
      content {
        childMdx {
          body
          timeToRead
        }
      }
    }
  }
`
