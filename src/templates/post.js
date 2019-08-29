import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styled from 'styled-components'
import Layout from '../components/layout'

const BackLink = styled(Link)`
  display: inline-block;
  font-size: 0.875rem;
  margin-top: 1rem;
`

const Author = styled.p`
  font-size: 0.75rem;
  margin-top: 0.25rem;
  padding-bottom: 1rem;
`

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
      }
      body
    }
  }
`

const PostTemplate = ({ data: { mdx: post } }) => (
  <Layout>
    <h1>{post.frontmatter.title}</h1>
    <Author>Posted by {post.frontmatter.author}</Author>
    <MDXRenderer>{post.body}</MDXRenderer>
    <BackLink to="/yld-blog">&larr; back to all posts</BackLink>
  </Layout>
)

export default PostTemplate
