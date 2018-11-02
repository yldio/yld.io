import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'
import { format } from 'date-fns'
import StyledLink from '../styledLink'
import { H2, H4 } from '../Typography'
import Posts from '../posts'
import Li from '../listItem'

const Blog = () => (
  <Row>
    <Col md={6} xs={12}>
      <H2>From the blog</H2>
    </Col>
    <Col md={6} xs={12}>
      <Posts>
        {posts => (
          <ul>
            {posts.splice(0, 3).map(({ node }) => (
              <Li key={`${node.id}`}>
                <H4>{node.title}</H4>
                {format(new Date(node.createdAt), 'MMMM DD[,] dddd')}
              </Li>
            ))}
          </ul>
        )}
      </Posts>
      <Padding top={3}>
        <StyledLink href="https://medium.com/yld-engineering-blog">
          More Articles
        </StyledLink>
      </Padding>
    </Col>
  </Row>
)

export default Blog
