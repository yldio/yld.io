import React from 'react'
import { Padding } from 'styled-components-spacing'
import { format } from 'date-fns'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import StyledLink from '../styledLink'
import Posts from '../posts'
import CustomisedBulletpoint from '../CustomisedBulletpoint'
import makeBlogPosts from '../../utils/makeBlogPosts'

const BlogPosts = ({ speciality }) => (
  <Posts>
    {posts =>
      makeBlogPosts(posts, speciality.title).length > 0 ? (
        <Grid>
          <Padding vertical={{ desktop: 4, smallTablet: 3.5 }}>
            <Row>
              <Col width={[1, 1, 1, 1, 6 / 12]}>
                <SectionTitle>{`From the blog`}</SectionTitle>
                <BodyPrimary>{`${
                  speciality.title
                } articles created by members of YLD for the community.`}</BodyPrimary>
              </Col>
              <Col width={[1, 1, 1, 1, 4 / 12]}>
                <Padding top={1}>
                  <ul>
                    {makeBlogPosts(posts, speciality.title)
                      .slice(0, 3)
                      .map(({ id, uniqueSlug, title, createdAt }) => (
                        <CustomisedBulletpoint
                          big
                          key={`${id}`}
                          fullWidthDivider
                        >
                          <Subtitle>
                            <a
                              href={`https://medium.com/yld-engineering-blog/${uniqueSlug}`}
                            >
                              {title}
                            </a>
                          </Subtitle>
                          {format(new Date(createdAt), 'MMMM DD[,] dddd')}
                        </CustomisedBulletpoint>
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
