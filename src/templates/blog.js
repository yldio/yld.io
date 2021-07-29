import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import remcalc from 'remcalc';
import breakpoint from 'styled-components-breakpoint';
import styled from 'styled-components';

import generateBreadcrumbData from '../utils/generateBreadcrumbData';

import Layout from '../components/layout';
import BlogPostPreview from '../components/Blog/BlogPostPreview';
import Head from '../components/Common/Head';
import { Grid, Row, Col } from '../components/grid';
import { DisplayTitle } from '../components/Typography';
import Hr from '../components/Common/Hr';
import GreyBackground from '../components/Common/GreyBackground';
import Pagination from '../components/Blog/Pagination';

const blogPageMeta = {
  title: 'Blog | YLD',
  description:
    'A collection of thoughts, musings and insights from our talented group of software engineers and product designers - read all about it on our blog.',
};

const FixedWidthDisplayTitle = styled(DisplayTitle)`
  max-width: 100%;
  ${breakpoint('smallTablet')`
    max-width: ${remcalc(593)};
  `}
  ${breakpoint('tablet')`
    max-width: ${remcalc(785)};
  `}
`;

const PageDescriptionCol = styled(Col)`
  ${breakpoint('smallPhone')`
    padding-top: ${({ theme }) => theme.space[5]}
    padding-bottom: ${({ theme }) => theme.space[5]}
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]}
    padding-bottom: ${({ theme }) => theme.space[7]}
  `}
`;

const DisplayTitleCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[5]}
  `}
`;

const BlogPage = ({
  data: {
    allContentfulBlogPost: { edges: blogPosts },
    site: {
      siteMetadata: { siteUrl },
    },
  },
  pageContext,
  location,
}) => {
  const breadcrumbData = generateBreadcrumbData(siteUrl, [
    {
      name: 'Blog',
      pathname: location.pathname,
      position: 2,
    },
  ]);

  return (
    <Layout breadcrumbData={breadcrumbData} slug="Blog">
      <Head
        seoMetaData={{
          title: blogPageMeta.title,
          description: blogPageMeta.description,
        }}
      />
      <Grid>
        <Row>
          <PageDescriptionCol width={[1]}>
            <FixedWidthDisplayTitle regular secondary>
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

          {blogPosts &&
            blogPosts.length > 0 &&
            blogPosts.map((blogPost, idx) => {
              const isLastPost = idx === blogPosts.length - 1;

              return (
                <Fragment key={blogPost.node.id}>
                  <BlogPostPreview {...blogPost.node} />
                  {!isLastPost && <Hr />}
                </Fragment>
              );
            })}

          <Pagination {...pageContext} />
        </Grid>
      </GreyBackground>
    </Layout>
  );
};

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allContentfulBlogPost(
      filter: { publish: { eq: true }, content: { content: { ne: null } } }
      sort: { fields: [firstPublishedAt], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          firstPublishedAt
          slug
          content {
            childMdx {
              excerpt
            }
          }
          headerImage {
            title
            file {
              url
            }
            gatsbyImageData(layout: FULL_WIDTH)
          }
          authorId
          authorName
        }
      }
    }
  }
`;

export default BlogPage;
