import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

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
          }
        ]}
      >
        <html lang="en" />
      </Helmet>
    )}
  />
)

export default Head
