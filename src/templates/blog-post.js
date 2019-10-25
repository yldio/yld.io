import React from 'react'
import { FacebookShareButton, LinkedinShareButton } from 'react-share'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { PostWrapper } from '../components/Blog/Typography'
import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import {
  PostIntroMetaData,
  PostOutroMetaData
} from '../components/Blog/PostMetaData'

const ShareWrapper = styled.div``
const COL_WIDTHS = [1, 1, 1, 7 / 12]
const BlogPostTemplate = ({
  data: { contentfulBlogPost: post },
  location,
  __mdxScope
}) => {
  return (
    <Layout location={location}>
      <Grid>
        <Row style={{ justifyContent: 'center' }}>
          <Col width={COL_WIDTHS}>
            <PostIntroMetaData
              title={post.title}
              author={post.authorName}
              date={post.firstPublishedAt}
              readTime={post.content.childMdx.timeToRead}
            />
          </Col>
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <PostWrapper as={Col} width={COL_WIDTHS}>
            <MDXRenderer scope={__mdxScope}>
              {post.content.childMdx.body}
            </MDXRenderer>
          </PostWrapper>
          <Col width={COL_WIDTHS}>
            <PostOutroMetaData
              author={post.authorName}
              date={post.firstPublishedAt}
              tags={post.tags}
            />
            <ShareWrapper>
              <FacebookShareButton url={location.href}>fb</FacebookShareButton>
              <LinkedinShareButton url={location.href}>li</LinkedinShareButton>
            </ShareWrapper>
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
