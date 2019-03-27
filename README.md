# YLD Website

## [Link](https://yldio.io/)

## [Storybook](https://yld-storybook.now.sh)

## How to run

```
  git clone git@github.com:yldio/yld.io.git
  cd yld.io
  yarn
```

In order to access data from contentful make sure that you have an .env file that matches the contentful keys and tokens:

```
CONTENTFUL_TOKEN=(see in contentful/settings/API keys)
CONTENTFUL_SPACE=(see in contentful/settings/API keys)
MEETUP_KEY=(see in contentful/settings/API keys)
GATSBY_ENVIRONMENT="development"
```

You can now run:

```
  yarn develop
```

We have some docs to make it easier to get you started:

- [Scripts Overview](./docs/scripts.md)

## Tech used

- [Yarn](https://yarnpkg.com)
- [Gatsby](https://www.gatsbyjs.org/docs/)
- [React](https://reactjs.org)
- [Styled Components](https://styled-components.com)
- [Storybook](https://storybook.js.org/)

## Tests stack

- [Jest](https://jestjs.io/)
- [Lighthouse](https://www.gatsbyjs.org/docs/audit-with-lighthouse/)

Lighthouse expects you to have your app built locally in and served from the /public directory.
As a result make sure to run `npm run build` before running the Lighthouse tests.
If you want to check the ouput of the build, you can run `gatsby serve`.

## Content in

- [Contentful](https://contentful.com)

## Deployed using

- [Netlify](https://netlify.com/)

## Browser support

Browsers people are using to access our website, based on google analytics:

- 70% chrome
- 23% safari
- 3.5% firefox
- 0.15% IE

We current support:

- Chrome
- Firefox
- Safari
- Edge

We're working towrads supporting IE11 & introducing graceful fallbacks for earlier versions (for where this sits in our prioritise, see trello).

## License

[MPL-2](/LICENSE)
