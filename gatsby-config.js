require('dotenv').config();
const path = require('path');

const {
  CONTENTFUL_TOKEN,
  CONTENTFUL_SPACE,
  GA_TRACKING_ID,
  GOOGLE_SITE_VERIFICATION_META_CONTENT,
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://www.yld.io',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;

const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

const configs = {
  'gatsby-plugin-robots-txt': {
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
  'gatsby-plugin-google-gtag': {
    resolve: 'gatsby-plugin-google-gtag',
    options: {
      trackingIds: [GA_TRACKING_ID],
      gtagConfig: {
        // eslint-disable-next-line camelcase
        anonymize_ip: false,
        // eslint-disable-next-line camelcase
        cookie_expires: 0,
      },
      pluginConfig: {
        head: true,
      },
    },
  },
  'gatsby-plugin-manifest': {
    resolve: 'gatsby-plugin-manifest',
    options: {
      icon: './src/images/favicon.png',
      name: 'YLD',
      // eslint-disable-next-line camelcase
      background_color: '#fff',
    },
  },
  'gatsby-plugin-mdx': {
    // Exclusively for the blog posts and listing page
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: ['.md', '.mdx'],
      // The blog currently has a FigureImage component that does not use remark-images
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 600,
          },
        },
        'gatsby-remark-responsive-iframe',
        'gatsby-remark-smartypants',
      ],
      plugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 600,
          },
        },
        'gatsby-remark-responsive-iframe',
        'gatsby-remark-smartypants',
      ],
    },
  },
  'gatsby-plugin-modal-routing-3': {
    resolve: 'gatsby-plugin-modal-routing-3',
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
  'gatsby-source-filesystem': {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: path.join(__dirname, 'src', 'images'),
    },
  },
  'gatsby-source-contentful': {
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: CONTENTFUL_SPACE,
      accessToken: CONTENTFUL_TOKEN,
      environment: 'master',
    },
  },
  'gatsby-source-lever': {
    resolve: 'gatsby-source-lever',
    options: {
      site: 'yld',
      verboseOutput: false,
    },
  },
};

module.exports = {
  siteMetadata: {
    siteTitle: 'YLD',
    siteUrl,
    image: '/images/logo.png',
    googleSiteVerificationMetaContent:
      GOOGLE_SITE_VERIFICATION_META_CONTENT || '',
  },
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    configs['gatsby-plugin-robots-txt'],
    configs['gatsby-plugin-mdx'],
    configs['gatsby-plugin-modal-routing-3'],
    configs['gatsby-source-filesystem'],
    configs['gatsby-source-contentful'],
    configs['gatsby-source-lever'],
    configs['gatsby-plugin-google-gtag'],
    configs['gatsby-plugin-manifest'],
  ].filter(Boolean),
};
