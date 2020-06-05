import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';

import { LogoStyleContext } from '../../context/PageContext';

import { Grid } from '../../components/grid';
import Layout from '../../components/layout';
import { SearchBox } from '../../components/Common/Forms';

import {
  StyledBlueBackground,
  StyledRow,
  TextCol,
  IllustrationCol,
  TitleHeadline,
  CopyText,
  LinkParagraph,
  NotFoundPageLink,
} from '../../components/404';

import illustration from '../../images/404-illustration.svg';

import { colors } from '../../utils/theme';
import replaceAccentChars from '../../utils/replaceAccentChars';

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
    const reg = new RegExp(ref.current.value, 'ig');
    return posts
      .filter(
        ({ node: { title, authorName } }) =>
          reg.test(title) || reg.test(replaceAccentChars(authorName)),
      )
      .map(({ node: { title, slug } }) => ({
        slug: `/blog/${slug}`,
        title,
      }));
  };

  return (
    <LogoStyleContext.Provider
      value={{
        fillColorInitial: colors.white,
        textColor: colors.blueBg,
      }}
    >
      <Layout is404={true} bgColor="blueBg" footerContactUsId={id}>
        <Helmet
          title={`${site.siteMetadata.siteTitle} - Not Found`}
          meta={[
            {
              name: 'description',
              content: 'YLD - Engineering - Digital, NodeJS, React, AWS',
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <StyledBlueBackground>
          <Grid>
            <StyledRow>
              <TextCol>
                <TitleHeadline>{title}</TitleHeadline>
                <ReactMarkdown
                  renderers={{
                    paragraph: CopyText,
                  }}
                  source={copy}
                />
                <SearchBox ref={ref} searchedData={handleSearch} />
                <LinkParagraph>
                  <NotFoundPageLink to="/blog">Go to our Blog</NotFoundPageLink>
                </LinkParagraph>
              </TextCol>
              <IllustrationCol>
                <img
                  src={illustration}
                  alt="There's nothing to see here - ilustration"
                />
              </IllustrationCol>
            </StyledRow>
          </Grid>
        </StyledBlueBackground>
      </Layout>
    </LogoStyleContext.Provider>
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
