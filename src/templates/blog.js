import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import remcalc from 'remcalc';
import breakpoint from 'styled-components-breakpoint';
import styled from 'styled-components';

import generateBreadcrumbData from '../utils/generateBreadcrumbData';

import Layout from '../components/layout';
import MediumPostPreview from '../components/Blog/MediumPostPreview';
import Head from '../components/Common/Head';
import { Grid, Row, Col } from '../components/grid';
import { SectionTitle, DisplayTitle } from '../components/Typography';
import Hr from '../components/Common/Hr';
import StyledLink from '../components/Common/StyledLink';
import GreyBackground from '../components/Common/GreyBackground';

const blogPageMeta = {
  title: 'Blog',
  description:
    'A collection of thoughts, musings and insights from our talented group of software engineers and product designers - read all about it on our blog.',
  seoTitle: 'A collection of medium blog posts created by YLD',
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
  const { numberOfPages, currentPage } = pageContext;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numberOfPages;

  const prevPagePath =
    currentPage - 1 === 1 ? `` : `page/${(currentPage - 1).toString()}`;
  const nextPagePath = `page/${(currentPage + 1).toString()}`;

  const prevPageLink = isFirst ? null : `/blog/${prevPagePath}`;
  const nextPageLink = isLast ? null : `/blog/${nextPagePath}`;

  return (
    <Layout breadcrumbData={breadcrumbData}>
      <Head
        page={{
          title: blogPageMeta.title,
          seoTitle: blogPageMeta.seoTitle,
          seoMetaDescription: blogPageMeta.description,
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

          {blogPosts &&
            blogPosts.length > 0 &&
            blogPosts.map((blogPost, idx) => {
              const isLastPost = idx === blogPosts.length - 1;

              return (
                <Fragment key={blogPost.node.id}>
                  <MediumPostPreview {...blogPost.node} />
                  {!isLastPost && <Hr />}
                </Fragment>
              );
            })}

          <Row style={{ justifyContent: 'space-between' }} block={false}>
            <Col>
              {prevPageLink && (
                <StyledLink to={prevPageLink}>Previous Page</StyledLink>
              )}
            </Col>
            <Col>
              {nextPageLink && (
                <StyledLink to={nextPageLink}>Next Page</StyledLink>
              )}
            </Col>
          </Row>
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
      filter: { content: { content: { ne: null } } }
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
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          authorId
          authorName
        }
      }
    }
  }
`;

export default BlogPage;
