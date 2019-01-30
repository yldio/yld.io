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

We have some docs to make it easier to get you started:

- [Scripts Overview](./docs/scripts.md)

## Tech Used

- [Yarn](https://yarnpkg.com)
- [Gatsby](https://www.gatsbyjs.org/docs/)
- [React](https://reactjs.org)
- [Styled Components](https://styled-components.com)
- [Storybook](https://storybook.js.org/)

## Content in

- [Contentful](https://contentful.com)

## Deployed Using

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
