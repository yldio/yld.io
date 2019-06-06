import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { hotjar } from 'react-hotjar'
// eslint-disable-next-line import/no-webpack-loader-syntax
import yldLogo from 'file-loader!../../images/logo.png'

const {
  NODE_ENV = 'development',
  HOTJAR_ID,
  HOTJAR_SCRIPT_VERSION
} = process.env

const isProd = NODE_ENV === 'production'

const TITLE = graphql`
  query SITE_TITLE {
    site {
      siteMetadata {
        title
      }
    }
  }
`
const Head = ({ page }) => (
  <StaticQuery
    query={TITLE}
    render={({ site: { siteMetadata } }) => (
      <Helmet
        title={`${siteMetadata.title}  ${page.title ? '- ' + page.title : ''} ${
          page.seoTitle ? '- ' + page.seoTitle : ''
        } `}
        meta={[
          {
            name: 'description',
            content: page.seoMetaDescription
          },
          {
            name: 'og:image',
            content: page.socialLogo ? page.socialLogo : yldLogo
          }
        ]}
      >
        <html lang="en" />
        {isProd && hotjar.initialize(HOTJAR_ID, HOTJAR_SCRIPT_VERSION)}
      </Helmet>
    )}
  />
)

export default Head
