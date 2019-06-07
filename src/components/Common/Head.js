import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
// eslint-disable-next-line import/no-webpack-loader-syntax
import yldLogo from 'file-loader!../../images/logo.png'

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
      </Helmet>
    )}
  />
)

export default Head
