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
- [Tescafe](https://devexpress.github.io/testcafe/)

## Content in

- [Contentful](https://contentful.com)

## Deployment

The website is built and deployed on [Netlify](https://netlify.com/) to our production environment ([https://yld.io](https://yld.io)) when:

- a new commit is pushed to our **production** (`master`) branch, read more [here](https://www.netlify.com/docs/continuous-deployment/);
- the Contentful data is updated (via _webhook_).

Also, for each Pull Request that's open, a [Deploy Preview](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) is created, allowing for that branch to be tested and shared amongst stakeholders.

## Content Model notes

This section serves as a information repository for some of our content models, stating what they represent and explaining some of their fields, if needed.

### Speciality

This content type describe YLD's specialities (Design and engineering methodologies, technologies, models, patterns, etc). These specialities may or may not have their own page and that's decided based on the content.

- **generate:** a boolean value that indicates wether a page should be generate for the current speciality;
- **Blogpost tags:** comma-separated list of tags that should be considered when displaying the latest blog posts for the current speciality. By default, the speciality title is already added as a tag, so this fields are added to that base filtering.

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

We're working towards supporting IE11 & introducing graceful fallbacks for earlier versions (for where this sits in our priorities, see trello).

## License

[MPL-2](/LICENSE)
