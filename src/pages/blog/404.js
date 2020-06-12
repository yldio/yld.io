import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';
import SearchBox from '../../components/Common/SearchBox';

import Page404, { LinkParagraph, Page404Link } from '../../components/404';

import mapBlogPostsToList from '../../utils/mapBlogPostsToList';

const NotFoundBlogPage = ({
  data: {
    allContentfulBlogPost,
    site,
    contentfulBlog404Page: {
      footerContactUsProfile: { id },
      title,
      copy: { copy },
    },
  },
}) => {
  const [posts] = useState(allContentfulBlogPost.edges);
  const ref = useRef(null);

  const handleSearch = () => {
    return mapBlogPostsToList(ref.current.value, posts);
  };

  return (
    <Page404
      siteTitle={site.siteMetadata.siteTitle}
      footerId={id}
      titleHeadline={title}
      copy={copy}
    >
      <SearchBox ref={ref} searchedData={handleSearch} />
      <LinkParagraph>
        <Page404Link to="/blog">Go to our Blog</Page404Link>
      </LinkParagraph>
    </Page404>
  );
};

export const query = graphql`
  {
    site {
      siteMetadata {
        siteTitle
      }
    }
    contentfulBlog404Page {
      title
      copy {
        copy
      }
      footerContactUsProfile {
        id
      }
    }
    allContentfulBlogPost(filter: { publish: { eq: true } }) {
      edges {
        node {
          title
          authorName
          slug
        }
      }
    }
  }
`;

export default NotFoundBlogPage;
