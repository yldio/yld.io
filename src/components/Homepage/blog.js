import React from 'react'
import { Padding } from 'styled-components-spacing'
import { format } from 'date-fns'

import { Row, Col } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import StyledLink from '../Common/StyledLink'
import Hr from '../Common/Hr'
import ExternalAnchor from '../Common/ExternalAnchor'
import LatestPosts from '../LatestPosts'

const Blog = () => (
  <Row>
    <Col width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>
      <SectionTitle>From the blog</SectionTitle>
    </Col>
    <Col width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>
      <LatestPosts>
        {posts => (
          <ul>
            {posts
              .slice(0, 3)
              .map(({ node }) => node)
              .map(({ id, uniqueSlug, title, firstPublishedAt }) => (
                <li key={`${id}`}>
                  <Subtitle noPaddingBottom>
                    <ExternalAnchor
                      href={`https://medium.com/yld-engineering-blog/${uniqueSlug}`}
                    >
                      {title}
                    </ExternalAnchor>
                  </Subtitle>
                  <BodyPrimary noPaddingTop>
                    {format(new Date(firstPublishedAt), 'MMMM DD[,] dddd')}
                  </BodyPrimary>
                  <Hr />
                </li>
              ))}
          </ul>
        )}
      </LatestPosts>
      <Padding top={3}>
        <StyledLink external href="https://medium.com/yld-engineering-blog">
          More articles
        </StyledLink>
      </Padding>
    </Col>
  </Row>
)

export default Blog
