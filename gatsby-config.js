require('dotenv').config()

const {
  CONTENTFUL_TOKEN,
  CONTENTFUL_SPACE,
  GA_TRACKING_ID
} = process.env

module.exports = {
  siteMetadata: {
    title: 'YLD',
    siteUrl: `https://yld.io`
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: CONTENTFUL_SPACE,
        accessToken: CONTENTFUL_TOKEN
      }
    },
    {
      resolve: 'gatsby-source-lever',
      options: {
        site: 'yld',
        verboseOutput: false
      }
    },
    {
      resolve: `gatsby-source-medium`,
      options: {
        username: `yld-engineering-blog`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: GA_TRACKING_ID
      }
    }
  ]
}
