import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'

import generateBreadcrumbData from '../utils/generateBreadcrumbData'

import Layout from '../components/layout'
import MediumPostPreview from '../components/Blog/MediumPostPreview'
import Head from '../components/Common/Head'
import { Grid, Row, Col } from '../components/grid'
import { SectionTitle, DisplayTitle } from '../components/Typography'
import Hr from '../components/Common/Hr'
import GreyBackground from '../components/Common/GreyBackground'

const blogPageMeta = {
  title: 'Blog',
  description:
    'A collection of thoughts, musings and insights from our talented group of software engineers and product designers - read all about it on our ',
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

const PageDescriptionCol = styled(Col)`
  ${breakpoint('smallPhone')`
    padding-top: ${({ theme }) => theme.space[5]}
    padding-bottom: ${({ theme }) => theme.space[5]}
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]}
    padding-bottom: ${({ theme }) => theme.space[7]}
  `}
`

const DisplayTitleCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[5]}
  `}
`

const BlogPage = ({
  data: {
    allContentfulBlogPost: { edges: blogPosts },
    site: {
      siteMetadata: { siteUrl }
    },
    blogPaths
  },
  location
}) => {
  const breadcrumbData = generateBreadcrumbData(siteUrl, [
    {
      name: 'Blog',
      pathname: location.pathname,
      position: 2
    }
  ])

  return (
    <Layout breadcrumbData={breadcrumbData}>
      <Head
        page={{
          title: blogPageMeta.title,
          seoTitle: blogPageMeta.seoTitle,
          seoMetaDescription: blogPageMeta.description
        }}
      />
      <Grid>
        <Row>
          <PageDescriptionCol width={[1]}>
            <SectionTitle as="h1">{blogPageMeta.title}</SectionTitle>
            <FixedWidthDisplayTitle regular textLight>
              {blogPageMeta.description}
            </FixedWidthDisplayTitle>
          </PageDescriptionCol>
        </Row>
      </Grid>
      <GreyBackground>
        <Grid>
          <Row>
            <DisplayTitleCol width={[1]}>
              <DisplayTitle>Recent articles</DisplayTitle>
            </DisplayTitleCol>
          </Row>
          <Row>
            <Col width={[1]}>
              {blogPaths.nodes.map(({ path }) => {
                return (
                  <p key={path}>
                    <Link to={path}>{path}</Link>
                  </p>
                )
              })}
            </Col>
          </Row>
          {blogPosts &&
            blogPosts.length > 0 &&
            blogPosts.map((blogPost, idx) => {
              const isLastPost = idx === blogPosts.length - 1

              return (
                <Fragment key={blogPost.node.id}>
                  <MediumPostPreview {...blogPost.node} />
                  {!isLastPost && <Hr />}
                </Fragment>
              )
            })}
        </Grid>
      </GreyBackground>
    </Layout>
  )
}

export const query = graphql`
  {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allContentfulBlogPost(
      limit: 6
      sort: { fields: [firstPublishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          title
          firstPublishedAt
          slug
          imageId
          authorId
          authorName
          subtitle {
            subtitle
          }
        }
      }
    }
    blogPaths: allSitePage(filter:{path: {regex: "/blog\/\\S/"}}) {
      nodes {
        path
      }
    }
  }
`

export default BlogPage
