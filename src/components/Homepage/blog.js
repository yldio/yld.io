import React from 'react'
import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import { format } from 'date-fns'
import StyledLink from '../styledLink'
import { SectionTitleH2, SubtitleH3 } from '../Typography'
import Posts from '../posts'
import Li from '../listItem'

const Blog = () => (
  <Row>
    <Col width={[1, 1, 1, 1, 5 / 12, 5 / 12]}>
      <SectionTitleH2>From the blog</SectionTitleH2>
    </Col>
    <Col width={[1, 1, 1, 1, 7 / 12, 7 / 12]}>
      <Posts>
        {posts => (
          <ul>
            {posts.slice(0, 3).map(({ node }) => (
              <Li fullWidth symmetrical key={`${node.id}`}>
                <SubtitleH3>
                  <a
                    href={`https://medium.com/yld-engineering-blog/${
                      node.uniqueSlug
                    }`}
                  >
                    {node.title}
                  </a>
                </SubtitleH3>
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
