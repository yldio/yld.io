import React from 'react';
import { Grid } from '../components/grid';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout';

import {
  StyledBlueBackground,
  StyledRow,
  TextCol,
  IllustrationCol,
  TitleHeadline,
  CopyText,
  LinksTitle,
  LinkParagraph,
  NotFoundPageLink,
} from '../components/404';

import { LogoStyleContext } from '../context/PageContext';

import illustration from '../images/404-illustration.svg';

import { colors } from '../utils/theme';

// Page

const NotFoundPage = () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            siteTitle
          }
        }
        contentful404Page {
          title
          copy {
            copy
          }
          linksTitle
          footerContactUsProfile {
            id
          }
        }
      }
    `}
    render={({ site, contentful404Page: content }) => {
      const {
        footerContactUsProfile: { id },
        title,
        copy: { copy },
        linksTitle,
      } = content;
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
                    <LinksTitle>{linksTitle}</LinksTitle>
                    <LinkParagraph>
                      <NotFoundPageLink to="/">Home</NotFoundPageLink>
                    </LinkParagraph>
                    <LinkParagraph>
                      <NotFoundPageLink to="/our-work/">
                        Our work
                      </NotFoundPageLink>
                    </LinkParagraph>
                    <LinkParagraph>
                      <NotFoundPageLink to="/contact/">
                        Contact
                      </NotFoundPageLink>
                    </LinkParagraph>
                  </TextCol>
                  <IllustrationCol>
                    <img src={illustration} alt="" />
                  </IllustrationCol>
                </StyledRow>
              </Grid>
            </StyledBlueBackground>
          </Layout>
        </LogoStyleContext.Provider>
      );
    }}
  />
);

export default NotFoundPage;
