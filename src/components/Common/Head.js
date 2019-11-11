import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const TITLE = graphql`
  query SITE_TITLE {
    site {
      siteMetadata {
        siteTitle
        image
        siteUrl
      }
    }
  }
`;

/**
 * Contentful doesn't give us https: in the image urls so
 * we have to prefix them here for twitter et al to pick
 * up the image properly
 */
const initImageUrl = ({ siteUrl, image }) => ({ socialLogo }) =>
  socialLogo ? `https://${socialLogo}` : `${siteUrl}${image}`;

/**
 *
 * This getMetaData function is in place during the transition
 * of integrating the seoMetaData reference to each page
 * content type.
 *
 * This new content type aims to:
 * - Remove complex logic of site title geneartion
 * - Remove differences in field naming. e.g. `page.seoMetaDescription || page.seoDescription`
 * - Enables a clear 1:1 relationship between content in CMS and what goes on the site. As
 *   you can see below the generate of page title is troublesome in that it's made up of three parts...
 *
 * Once the new seoMetaData field is added throughout the site, this getMetaData function
 * can be removed and we should be able to just destructure content from the argument passed
 * into `Head` component.
 *
 * Reference tickets:
 * - https://trello.com/c/f5gRVN79/636-integrate-seo-content-type-to-all-pages
 * - https://trello.com/c/q8pzabwy/573-amend-site-title-creation
 */
const getMetaData = ({ page, seoMetaData, siteMetadata }) => {
  const getImageUrl = initImageUrl(siteMetadata);

  if (seoMetaData)
    return {
      ...seoMetaData,
      imageUrl: getImageUrl({
        socialLogo: (
          (seoMetaData.socialLogo && seoMetaData.socialLogo.file) ||
          {}
        ).url,
      }),
    };

  const { siteTitle } = siteMetadata;

  const title = `${siteTitle} ${
    page.title === 'YLD' ? '' : ` - ${page.title}`
  } ${page.seoTitle && page.seoTitle !== ' ' ? ` - ${page.seoTitle}` : ''}`;

  const description = page.seoMetaDescription || page.seoDescription;
  const imageUrl = getImageUrl({ socialLogo: page.socialLogo });

  return {
    title,
    description,
    imageUrl,
    keywords: page.keywords,
  };
};

const Head = ({ page, seoMetaData }) => {
  return (
    <StaticQuery
      query={TITLE}
      render={({ site: { siteMetadata } }) => {
        const { siteTitle, siteUrl } = siteMetadata;

        const { title, description, imageUrl, keywords } = getMetaData({
          page,
          seoMetaData,
          siteMetadata,
        });

        return (
          <Helmet>
            <html lang="en" />
            <title>{title}</title>

            <meta name="description" content={description} />

            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph  */}
            <meta property="og:image" content={imageUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:url" content={siteUrl} />

            {/* Twitter */}
            <meta name="twitter:site" content="yldio" />

            <link rel="image_src" type="image/png" href={imageUrl} />
          </Helmet>
        );
      }}
    />
  );
};

export default Head;
