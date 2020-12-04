require('dotenv').config();
const path = require(`path`);

const {
  CONTENTFUL_TOKEN,
  CONTENTFUL_SPACE,
  GA_TRACKING_ID,
  GOOGLE_SITE_VERIFICATION_META_CONTENT,
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://www.yld.io',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
  LIGHTHOUSE,
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const isLighthouse = LIGHTHOUSE === 'true';
const netlifyUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;
const siteUrl = isLighthouse ? 'http://localhost:3001' : netlifyUrl;

module.exports = {
  siteMetadata: {
    siteTitle: 'YLD',
    siteUrl,
    image: '/images/logo.png',
    googleSiteVerificationMetaContent:
      GOOGLE_SITE_VERIFICATION_META_CONTENT || '',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      // Exclusively for the blog posts and listing page
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.md', '.mdx'],
        // The blog currently has a FigureImage component that does not use remark-images
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-smartypants',
        ],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-modal-routing`,
      options: {
        modalProps: {
          style: {
            content: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: CONTENTFUL_SPACE,
        accessToken: CONTENTFUL_TOKEN,
        environment: 'master',
      },
    },
    {
      resolve: 'gatsby-source-lever',
      options: {
        site: 'yld',
        verboseOutput: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [GA_TRACKING_ID],
        gtagConfig: {
          anonymize_ip: false,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/images/favicon.png',
        appName: 'YLD',
        background: '#fff',
      },
    },
  ],
};
