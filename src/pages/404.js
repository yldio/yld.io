import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { LinksTitle, LinkParagraph, NotFoundPageLink } from '../components/404';

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
        <NotFoundPage
          siteTitle={site.siteMetadata.siteTitle}
          footerId={id}
          titleHeadline={title}
          copy={copy}
        >
          <LinksTitle>{linksTitle}</LinksTitle>
          <LinkParagraph>
            <NotFoundPageLink to="/">Home</NotFoundPageLink>
          </LinkParagraph>
          <LinkParagraph>
            <NotFoundPageLink to="/our-work/">Our work</NotFoundPageLink>
          </LinkParagraph>
          <LinkParagraph>
            <NotFoundPageLink to="/contact/">Contact</NotFoundPageLink>
          </LinkParagraph>
        </NotFoundPage>
      );
    }}
  />
);

export default NotFoundPage;
