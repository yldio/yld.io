import React from 'react'
import { Grid, Row, Col } from '../components/grid'
import { H1, PostWrapper } from '../components/Blog/Typography'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import TitleCase from 'title-case'
import Hr from '../components/Common/Hr'
import styled from 'styled-components'
import Format from 'date-fns/format'
import Layout from '../components/layout'

const PostTitle = styled(H1)`
  margin-bottom: ${({ theme }) => theme.space[2]};
`

const PostIntroMetaDataWrapper = styled.div`
  p {
    padding-bottom: ${({ theme }) => theme.space[3]};
  }
`

const PostIntroMetaData = ({ author, date }) => (
  <PostIntroMetaDataWrapper>
    <p>
      by {author} • {Format(date, 'MMMM do[,] YYYY')}
    </p>
    <Hr />
  </PostIntroMetaDataWrapper>
)

const Tag = styled.li`
  display: inline-block;
  background-color: #d8d8d8;
  padding: 6px 12px;
  margin-right: 10px;
  font-family: 'PT Mono';
`

const PostOutroTopSection = styled.section`
  padding: ${({ theme }) => theme.space[4]} 0;
`

const PostOutroTagSection = styled.section`
  padding: ${({ theme }) => theme.space[4]} 0;
`

const PostOutroMetaData = ({ author, date, tags }) => (
  <>
    <Hr />
    <PostOutroTopSection>
      <p>
        by {author} • {Format(date, 'MMMM do[,] YYYY')}
      </p>
    </PostOutroTopSection>
    <Hr />

    <PostOutroTagSection>
      {tags && tags.length > 0 && (
        <ul>
          {tags.map(tag => (
            <Tag key={tag}>{TitleCase(tag)}</Tag>
          ))}
        </ul>
      )}
    </PostOutroTagSection>
  </>
)

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
            <PostTitle>{post.title}</PostTitle>
            <PostIntroMetaData
              author={post.authorName}
              date={post.firstPublishedAt}
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
