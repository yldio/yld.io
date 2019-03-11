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
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`)
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
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
        include_favicon: true // Include favicon
      }
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        runtimeCaching: [
          {
            // Use cacheFirst since these don't need to be revalidated (same RegExp
            // and same reason as above)
            urlPattern: /(\.js$|\.css$|static\/)/,
            handler: `cacheFirst`
          },
          {
            // Add runtime caching of various other page resources
            urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
            handler: `staleWhileRevalidate`
          },
          {
            // Google Fonts CSS (doesn't end in .css so we need to specify it)
            urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
            handler: `staleWhileRevalidate`
          },
          {
            // Use cacheFirst since these don't need to be revalidated (same RegExp
            // and same reason as above)
            urlPattern: /contact/,
            handler: `networkOnly`,
            options: {
              backgroundSync: {
                name: 'my-queue-name',
                options: {
                  maxRetentionTime: 60 * 60
                }
              }
            },
            method: 'POST'
          },
          {
            // Google Fonts CSS (doesn't end in .css so we need to specify it)
            urlPattern: /^https?:\/\/images\.ctfassets\.net/,
            handler: `staleWhileRevalidate`
          }
        ]
      }
    }
  ]
}
