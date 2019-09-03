import React, { Fragment } from 'react'
// import { graphql } from 'gatsby'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'

import Layout from '../../components/layout'
import MediumPostPreview from '../../components/Blog/MediumPostPreview'
import Head from '../../components/Common/Head'
import StyledLink from '../../components/Common/StyledLink'
import { Grid, Row, Col } from '../../components/grid'
import { SectionTitle, DisplayTitle } from '../../components/Typography'
import Hr from '../../components/Common/Hr'
import Anchor from '../../components/Common/Anchor'
import GreyBackground from '../../components/Common/GreyBackground'

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

const MediumLink = styled(StyledLink)`
  margin-top: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[6]};
`

const DisplayTitleCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[5]}
  `}
`

const DescriptionMediumLink = styled(Anchor)`
  color: ${({ theme }) => theme.colors.black};
  text-decoration: underline;
`

const BlogPage = ({ data: { allMediumPost: mediumContent } }) => {
  const mediumPosts = mediumContent.edges || []
  const mediumLink = 'https://medium.com/yld-blog'

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
          <PageDescriptionCol width={[1]}>
            <SectionTitle as="h1">{blogPageMeta.title}</SectionTitle>
            <FixedWidthDisplayTitle regular textLight>
              {blogPageMeta.description}
              <DescriptionMediumLink href={mediumLink}>
                Medium blog
              </DescriptionMediumLink>
              .
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
          {mediumPosts &&
            mediumPosts.length > 0 &&
            mediumPosts.map((mediumPostData, idx) => {
              const isLastPost = idx === mediumPosts.length - 1

              return (
                <Fragment key={mediumPostData.node.id}>
                  <MediumPostPreview {...mediumPostData.node} />
                  {!isLastPost && <Hr />}
                </Fragment>
              )
            })}
          <Row>
            <Col width={[1]}>
              <MediumLink
                rel="noopener noreferrer"
                target="_blank"
                href={mediumLink}
              >
                View more on Medium
              </MediumLink>
            </Col>
          </Row>
        </Grid>
      </GreyBackground>
    </Layout>
  )
}

/**
 *
 * This should be added back in once the medium/blog post export has
 * been completed.
 * ticket: https://trello.com/c/ozDzAeA3/658-investigate-gatsby-medium-source-plugin-issues
 */
// export const query = graphql`
//   {
//     allMediumPost(limit: 6, sort: { fields: [createdAt], order: DESC }) {
//       edges {
//         node {
//           id
//           title
//           createdAt
//           uniqueSlug
//           virtuals {
//             subtitle
//             previewImage {
//               imageId
//             }
//           }
//           author {
//             username
//             name
//           }
//         }
//       }
//     }
//   }
// `

export default BlogPage
