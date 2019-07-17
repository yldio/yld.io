import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'

import Layout from '../components/layout'
import Head from '../components/Common/Head'
import { Grid, Row, Col } from '../components/grid'
import { SectionTitle, DisplayTitle, CardTitle } from '../components/Typography'
import Hr from '../components/Common/Hr'

const blogPage = {
  title: 'Blog',
  description:
    'A collection of thoughts, musings and insights from our talented group of software engineers and product designers - read all about it on our Medium blog.',
  seoTitle: 'A collection of medium blog posts created by YLD'
}

const FixedWidthDisplayTitle = styled(DisplayTitle)`
  max-width: 100%;
  ${breakpoint('smallTablet')`
    max-width: ${remcalc(593)};
  `}
  ${breakpoint('tablet')`
    max-width: ${remcalc(785)};
  `}
`

const TitleSection = ({ title }) => {
  return (
    <Padding bottom={{ smallPhone: 1, smallTablet: 0 }}>
      <CardTitle as="h2">{title}</CardTitle>
    </Padding>
  )
}

const BlogPost = ({ blogPost }) => {
  const { title } = blogPost.node
  return (
    <Row>
      <TitleSection title={title} />
    </Row>
  )
}

const BlogPage = ({ data: { allMediumPost: mediumContent } }) => {
  const blogPosts = mediumContent.edges.slice(0, 4) || []

  return (
    <Layout>
      <Head page={mediumContent} />
      <Grid>
        <Row>
          <Col>
            <Padding
              top={{
                smallPhone: 3.5,
                tablet: 4
              }}
              bottom={{
                smallPhone: 3.5,
                tablet: 5
              }}
            >
              <SectionTitle as="h1">{blogPage.title}</SectionTitle>
              <FixedWidthDisplayTitle regular textLight>
                {blogPage.description}
              </FixedWidthDisplayTitle>
            </Padding>
          </Col>
        </Row>
      </Grid>
      <Grid>
        {blogPosts &&
          blogPosts.length > 0 &&
          blogPosts.map((blogPost, index) => {
            return (
              <Fragment key={index}>
                <Fragment>
                  <Padding
                    top={{ smallPhone: 3, smallTablet: 3.5, tablet: 4 }}
                    bottom={{ smallPhone: 2, smallTablet: 3 }}
                  >
                    <BlogPost blogPost={blogPost} />
                  </Padding>
                  <Hr />
                </Fragment>
              </Fragment>
            )
          })}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  {
    allMediumPost(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          title
          createdAt
          virtuals {
            subtitle
            previewImage {
              imageId
            }
          }
          author {
            name
          }
        }
      }
    }
  }
`

export default BlogPage
