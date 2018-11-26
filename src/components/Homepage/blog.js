import React from 'react'
import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import { format } from 'date-fns'
import StyledLink from '../styledLink'
import { H2, H5 } from '../Typography'
import Posts from '../posts'
import Li from '../listItem'

const BlogTitle = styled(H2)`
  /* sorry */
  padding-top: 0.5rem !important;
`

const Blog = () => (
  <Row>
    <Col md={6} xs={12}>
      <BlogTitle>From the blog</BlogTitle>
    </Col>
    <Col md={4} xs={12}>
      <Posts>
        {posts => (
          <ul>
            {posts.slice(0, 3).map(({ node }) => (
              <Li key={`${node.id}`}>
                <H5>
                  <a
                    href={`https://medium.com/yld-engineering-blog/${
                      node.uniqueSlug
                    }`}
                  >
                    {node.title}
                  </a>
                </H5>
                {format(new Date(node.createdAt), 'MMMM DD[,] dddd')}
              </Li>
            ))}
          </ul>
        )}
      </Posts>
      <Padding top={3}>
        <StyledLink href="https://medium.com/yld-engineering-blog">
          More articles
        </StyledLink>
      </Padding>
    </Col>
  </Row>
)

export default Blog
