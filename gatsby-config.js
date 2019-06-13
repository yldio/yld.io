require('dotenv').config()
const path = require(`path`)

const {
  CONTENTFUL_TOKEN,
  CONTENTFUL_SPACE,
  GA_TRACKING_ID,
  GTM_AUTH,
  ENV
} = process.env

module.exports = {
  siteMetadata: {
    title: 'YLD',
    siteUrl: `https://yld.io`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-modal-routing`,
      options: {
        modalProps: {
          style: {
            content: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          }
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`)
      }
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ['HOTJAR_ID', 'HOTJAR_SCRIPT_VERSION']
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: CONTENTFUL_SPACE,
        accessToken: CONTENTFUL_TOKEN,
        environment: ENV === 'dev' ? 'development' : 'master'
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
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/images/favicon.png',
        appName: 'YLD',
        background: '#fff'
      }
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-TNNW9LP',
        includeInDevelopment: false,
        gtmAuth: GTM_AUTH,
        gtmPreview: 'env-2'
      }
    }
  ]
}
