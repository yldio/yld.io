import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';

import { LogoStyleContext } from '../../context/PageContext';

import { Grid } from '../../components/grid';
import Layout from '../../components/layout';

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

const NotFoundBlogPage = ({
  data: {
    site,
    contentfulBlog404Page: {
      footerContactUsProfile: { id },
      title,
      copy: { copy },
    },
  },
}) => (
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

export const query = graphql`
  query {
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
  }
`;

export default NotFoundBlogPage;
