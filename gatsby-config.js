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
          resolve: `gatsby-remark-prismjs`,
          options: {
            // Class prefix for <pre> tags containing syntax highlighting;
            // defaults to 'language-' (e.g. <pre class="language-js">).
            // If your site loads Prism into the browser at runtime,
            // (e.g. for use with libraries like react-live),
            // you may use this to prevent Prism from re-processing syntax.
            // This is an uncommon use-case though;
            // If you're unsure, it's best to use the default value.
            classPrefix: 'language-',
            // This is used to allow setting a language for inline code
            // (i.e. single backticks) by creating a separator.
            // This separator is a string and will do no white-space
            // stripping.
            // A suggested value for English speakers is the non-ascii
            // character '›'.
            inlineCodeMarker: null,
            // This lets you set up language aliases.  For example,
            // setting this to '{ sh: "bash" }' will let you use
            // the language "sh" which will highlight using the
            // bash highlighter.
            aliases: {},
            // This toggles the display of line numbers globally alongside the code.
            // To use it, add the following line in gatsby-browser.js
            // right after importing the prism color scheme:
            //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
            // Defaults to false.
            // If you wish to only show line numbers on certain code blocks,
            // leave false and use the {numberLines: true} syntax below
            showLineNumbers: true,
            // If setting this to true, the parser won't handle and highlight inline
            // code used in markdown i.e. single backtick code like `this`.
            noInlineHighlight: false,
            // This adds a new language definition to Prism or extend an already
            // existing language definition. More details on this option can be
            // found under the header "Add new language definition or extend an
            // existing language" below.
            languageExtensions: [
              {
                language: 'superscript',
                extend: 'javascript',
                definition: {
                  superscript_types: /(SuperType)/,
                },
                insertBefore: {
                  function: {
                    superscript_keywords: /(superif|superelse)/,
                  },
                },
              },
            ],
            // Customize the prompt used in shell output
            // Values below are default
            prompt: {
              user: 'root',
              host: 'localhost',
              global: false,
            },
            // By default the HTML entities <>&'" are escaped.
            // Add additional HTML escapes by providing a mapping
            // of HTML entities and their escape value IE: { '}': '&#123;' }
            escapeEntities: {},
          },
        },
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
  'gatsby-plugin-feed': {
    resolve: 'gatsby-plugin-feed',
    options: {
      query: `
        {
          site {
            siteMetadata {
              title : siteTitle
              url : siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          title: 'YLD RSS Feed',
          output: 'rss.xml',
          query: `
          {
            pages: allSitePage {
               nodes {
                 path
               }
             }
          }
          `,
          serialize: ({ query: { site, pages } }) => {
            return pages.nodes.map((node) => {
              return { ...node, url: `${site.siteMetadata.url}${node.path}` };
            });
          },
        },
      ],
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
    configs['gatsby-plugin-feed'],
  ].filter(Boolean),
};
