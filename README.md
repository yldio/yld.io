# YLD Website

## [Link](https://yldio.io/)

## [Storybook](https://yld-storybook.now.sh)

## How to run

```bash
  git clone git@github.com:yldio/yld.io.git
  cd yld.io
  yarn
  yarn develop
```

In order to access the development branch on contentful during development set the environment variable `ENV` to `'dev'`

```bash
ENV=dev yarn develop
```

and your .env file to match the contentful keys and tokens

```
CONTENTFUL_TOKEN=(see in contentful/settings/API keys)
CONTENTFUL_SPACE=(see in contentful/settings/API keys)
MEETUP_KEY=(see in contentful/settings/API keys)
GATSBY_ENVIRONMENT="development"
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
As a result make sure to run `npm run build` before running the Lighthouse tests. Depending on your environment you may on occasion also need to serve manually with `serve public`.

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
