import React from 'react'
import { Padding } from 'styled-components-spacing'
import { format } from 'date-fns'
import { Row, Col, Grid } from '../grid'
import { SmallerH2, H5, Paragraph } from '../Typography'
import StyledLink from '../styledLink'
import Posts from '../posts'
import Li from '../listItem'
import makeBlogPosts from '../../utils/makeBlogPosts'

const BlogPosts = ({ speciality }) => (
  <Posts>
    {posts =>
      makeBlogPosts(posts, speciality.title).length > 0 ? (
        <Grid>
          <Padding vertical={{ desktop: 4, smallTablet: 3.5 }}>
            <Row>
              <Col width={[1, 1, 1, 1, 6 / 12]}>
                <SmallerH2>{`From the blog`}</SmallerH2>
                <Paragraph>{`${
                  speciality.title
                } articles created by members of YLD for the community.`}</Paragraph>
              </Col>
              <Col width={[1, 1, 1, 1, 4 / 12]}>
                <Padding top={1}>
                  <ul>
                    {makeBlogPosts(posts, speciality.title)
                      .slice(0, 3)
                      .map(({ id, uniqueSlug, title, createdAt }) => (
                        <Li key={`${id}`} fullWidthDivider>
                          <H5 bold>
                            <a
                              href={`https://medium.com/yld-engineering-blog/${uniqueSlug}`}
                            >
                              {title}
                            </a>
                          </H5>
                          {format(new Date(createdAt), 'MMMM DD[,] dddd')}
                        </Li>
                      ))}
                  </ul>
                </Padding>
                <Padding top={3}>
                  <StyledLink href="https://medium.com/yld-engineering-blog">
                    More articles
                  </StyledLink>
                </Padding>
              </Col>
            </Row>
          </Padding>
        </Grid>
      ) : null
    }
  </Posts>
)

export default BlogPosts
