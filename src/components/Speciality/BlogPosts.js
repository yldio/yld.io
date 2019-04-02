import React from 'react'
import { Padding } from 'styled-components-spacing'
import { format } from 'date-fns'
import { Row, Col, Grid } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import StyledLink from '../Common/StyledLink'
import Hr from '../Common/Hr'
import ExternalAnchor from '../Common/ExternalAnchor'

const BlogPosts = ({ title, posts }) => {
  return posts.length > 0 ? (
    <Grid>
      <Padding vertical={{ desktop: 4, smallTablet: 3.5 }}>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <SectionTitle>Blog posts</SectionTitle>
            <BodyPrimary>{`${title} articles created by members of YLD for the community.`}</BodyPrimary>
          </Col>
          <Col width={[1, 1, 1, 1, 4 / 12]}>
            <Padding top={1}>
              <ul>
                {posts
                  .map(({ node }) => node)
                  .map(({ id, uniqueSlug, title, createdAt }) => (
                    <li key={`${id}`}>
                      <Subtitle>
                        <ExternalAnchor
                          href={`https://medium.com/yld-engineering-blog/${uniqueSlug}`}
                        >
                          {title}
                        </ExternalAnchor>
                      </Subtitle>
                      {format(new Date(createdAt), 'MMMM DD[,] dddd')}
                      <Hr />
                    </li>
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

export default BlogPosts
