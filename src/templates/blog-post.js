import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import { Grid, Row, Col } from '../components/grid';
import Layout from '../components/layout';
import Head from '../components/Common/Head';
import {
  PostIntroMetaData,
  PostOutroMetaData,
} from '../components/Blog/post/PostMetaData';

import FigureImage from '../components/Blog/post/FigureImage';
import Gist from 'react-gist';
import Instagram from '../components/Blog/post/Instagram';
import { TwitterTweetEmbed as Tweet } from 'react-twitter-embed';
import YouTube from '../components/Blog/post/YouTube';

import {
  PostWrapper,
  H1,
  H2,
  UnorderedList,
  OrderedList,
  ListItem,
  Body,
  Code,
  A,
  Blockquote,
} from '../components/Blog/post/Typography';

const components = {
  h1: H1,
  h2: H2,
  h3: H2,
  h4: H2,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  p: Body,
  code: Code,
  anchor: A,
  blockquote: Blockquote,
};
const shortCodes = {
  FigureImage,
  Gist,
  Instagram,
  Tweet,
  YouTube,
};

const COL_WIDTHS = [1, 1, 1, 10 / 12, 10 / 12, 7 / 12];

const BlogPostTemplate = ({
  data: { contentfulBlogPost: post },
  location,
  __mdxScope,
}) => {
  const seoMetaData = {
    title: post.title + ' | YLD Blog',
    description:
      (post.subtitle && post.subtitle.subtitle) ||
      post.content.childMdx.excerpt,
    socialLogo: post.headerImage && post.headerImage,
    keywords: post.tags,
  };

  return (
    <MDXProvider components={{ ...components, ...shortCodes }}>
      <Layout location={location}>
        <Head seoMetaData={seoMetaData} />
        <Grid>
          <Row style={{ justifyContent: 'center' }}>
            <Col width={COL_WIDTHS}>
              <PostIntroMetaData
                title={post.title}
                author={post.authorName}
                date={post.firstPublishedAt}
                readTime={post.content.childMdx.timeToRead}
              />
            </Col>
          </Row>
          <Row style={{ justifyContent: 'center' }}>
            <PostWrapper as={Col} width={COL_WIDTHS}>
              <MDXRenderer scope={__mdxScope}>
                {post.content.childMdx.body}
              </MDXRenderer>
            </PostWrapper>
            <Col width={COL_WIDTHS}>
              <PostOutroMetaData
                title={post.title}
                author={post.authorName}
                date={post.firstPublishedAt}
                tags={post.tags}
                shareUrl={location.href}
              />
            </Col>
          </Row>
        </Grid>
      </Layout>
    </MDXProvider>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      title
      headerImage {
        file {
          url
        }
      }
      slug
      tags
      firstPublishedAt
      authorId
      authorName
      content {
        childMdx {
          body
          timeToRead
          excerpt
        }
      }
    }
  }
`;
