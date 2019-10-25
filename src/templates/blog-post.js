import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'

import { PostWrapper } from '../components/Blog/Typography'
import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import Head from '../components/Common/Head'
import {
  PostIntroMetaData,
  PostOutroMetaData
} from '../components/Blog/PostMetaData'

const COL_WIDTHS = [1, 1, 1, 7 / 12]
const BlogPostTemplate = ({
  data: { contentfulBlogPost: post },
  location,
  __mdxScope
}) => {
  const seoMetaData = {
    title: post.title + ' | YLD',
    description: post.subtitle.subtitle || post.content.childMdx.excerpt,
    socialLogo: post.headerImage && post.headerImage,
    keywords: post.tags
  }

  return (
    <Layout location={location}>
      <Head seoMetaData={seoMetaData} />
      <Grid>
        <Row style={{ justifyContent: 'center' }}>
          <Col width={COL_WIDTHS}>
            <PostIntroMetaData
              title={post.title}
              subtitle={post.subtitle.subtitle}
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
              shareUrl={location.href}
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
      subtitle {
        subtitle
      }
      headerImage {
        file {
          url
        }
      }
      slug
      tags
      firstPublishedAt
      authorId
      authorName
      content {
        childMdx {
          body
          timeToRead
          excerpt
        }
      }
    }
  }
`
