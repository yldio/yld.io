import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Page404, {
  LinksTitle,
  LinkParagraph,
  Page404Link,
} from '../components/404';

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
        <Page404
          siteTitle={site.siteMetadata.siteTitle}
          footerId={id}
          titleHeadline={title}
          copy={copy}
        >
          <LinksTitle>{linksTitle}</LinksTitle>
          <LinkParagraph>
            <Page404Link to="/">Home</Page404Link>
          </LinkParagraph>
          <LinkParagraph>
            <Page404Link to="/our-work/">Our work</Page404Link>
          </LinkParagraph>
          <LinkParagraph>
            <Page404Link to="/contact/">Contact</Page404Link>
          </LinkParagraph>
        </Page404>
      );
    }}
  />
);

export default NotFoundPage;
