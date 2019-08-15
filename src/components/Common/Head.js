import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

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
`

const Head = ({ page }) => {
  return (
    <StaticQuery
      query={TITLE}
      render={({ site: { siteMetadata } }) => {
        const { siteTitle, image, siteUrl } = siteMetadata

        const title = `${siteTitle} ${
          page.title === 'YLD' ? '' : ` - ${page.title}`
        } ${
          page.seoTitle && page.seoTitle !== ' ' ? ` - ${page.seoTitle}` : ''
        }`

        const description = page.seoMetaDescription || page.seoDescription

        const imageUrl = page.socialLogo
          ? page.socialLogo
          : `${siteUrl}${image}`

        return (
          <Helmet>
            <html lang="en" />
            <title>{title}</title>

            <meta name="description" content={description} />

            {page.keywords && <meta name="keywords" content={page.keywords} />}

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
        )
      }}
    />
  )
}

export default Head
