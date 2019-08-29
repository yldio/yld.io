import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const StyledArticle = styled.article`
  border-bottom: 1px solid #ddd;
  margin-top: 0.75rem;
  padding-bottom: 1rem;
`

const ReadLink = styled(Link)`
  display: inline-block;
  font-size: 0.875rem;
`

const PostPreview = ({ post }) => (
  <StyledArticle>
    <h3>
      {' '}
      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
    </h3>
    <p>{post.excerpt}</p>
    <ReadLink to={`/blog/${post.slug}`}>read this post &rarr;</ReadLink>
  </StyledArticle>
)

export default PostPreview
