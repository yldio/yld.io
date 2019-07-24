import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'

import Layout from '../components/layout'
import MediumPostPreview from '../components/Blog/MediumPostPreview'
import Head from '../components/Common/Head'
import StyledLink from '../components/Common/StyledLink'
import { Grid, Row, Col } from '../components/grid'
import { SectionTitle, DisplayTitle } from '../components/Typography'
import Hr from '../components/Common/Hr'

const blogPageMeta = {
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

const PageDescription = styled.div`
  ${breakpoint('smallPhone')`
  padding-top: ${({ theme }) => theme.space[5]}
  padding-bottom: ${({ theme }) => theme.space[5]}
`}
  ${breakpoint('tablet')`
padding-top: ${({ theme }) => theme.space[6]}
padding-bottom: ${({ theme }) => theme.space[7]}
`}
`

const MediumLink = styled(StyledLink)`
  margin-top: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[6]};
`

const StyledDisplayTitleWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[5]};
  ${breakpoint('tablet')`
  padding-top: ${({ theme }) => theme.space[6]}
  `}
`

const StyledPostPreviewWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const BlogPage = ({ data: { allMediumPost: mediumContent } }) => {
  const mediumPosts = mediumContent.edges || []

  return (
    <Layout>
      <Head
        page={{
          title: blogPageMeta.title,
          seoTitle: blogPageMeta.seoTitle,
          seoMetaDescription: blogPageMeta.description
        }}
      />
      <Grid>
        <Row>
          <Col>
            <PageDescription>
              <SectionTitle as="h1">{blogPageMeta.title}</SectionTitle>
              <FixedWidthDisplayTitle regular textLight>
                {blogPageMeta.description}
              </FixedWidthDisplayTitle>
            </PageDescription>
          </Col>
        </Row>
        <Row>
          <StyledDisplayTitleWrapper>
            <DisplayTitle>Recent articles</DisplayTitle>
          </StyledDisplayTitleWrapper>
          {mediumPosts &&
            mediumPosts.length > 0 &&
            mediumPosts.map((mediumPostData, idx) => {
              const isLastPost = idx === mediumPosts.length - 1
              return (
                <Fragment key={idx}>
                  <StyledPostPreviewWrapper>
                    <MediumPostPreview mediumPostData={mediumPostData} />
                  </StyledPostPreviewWrapper>
                  {!isLastPost && <Hr />}
                </Fragment>
              )
            })}
          <MediumLink
            rel="noopener noreferrer"
            target="_blank"
            href="https://medium.com/yld-engineering-blog"
          >
            View more on Medium
          </MediumLink>
        </Row>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  {
    allMediumPost(limit: 6, sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          title
          createdAt
          uniqueSlug
          virtuals {
            subtitle
            previewImage {
              imageId
            }
          }
          author {
            username
            name
          }
        }
      }
    }
  }
`

export default BlogPage
