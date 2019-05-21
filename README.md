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
CONTENTFUL_TOKEN=(see in contentful/settings/API keys "meetup > Content Delivery API - Access Token")
CONTENTFUL_SPACE=(see in contentful/settings/API keys "meetup > Space ID")
GATSBY_ENVIRONMENT="development"

# For local Lambda development
MEETUP_KEY=(see in contentful/settings/API keys "gatsby > Content Delivery API - Access Token")
CMS_CRUD=(copy from Netlify - Build & Deploy - Environment - Edit variables - CMS_CRUD. Read below why copy)
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

The website and lambda are built (`yarn build`) and deployed on [Netlify](https://netlify.com/) to our production environment ([https://yld.io](https://yld.io)) when:

- a new commit is pushed to our **production** (`master`) branch, read more [here](https://www.netlify.com/docs/continuous-deployment/);
- the Contentful data is updated (via _webhook_).

Also, for each Pull Request that's open, a [Deploy Preview](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) is created, allowing for that branch to be tested and shared amongst stakeholders.

## Automated deployments

### 📬 Webhook automated deployments

We are using Netlify webhooks/build hooks to automate new builds when services we use update. Each service has its own webhook url set up in Netlify.

Keep in mind if you need to urgently alter any of the automated builds but don't have access to the services below, it's possible to just remove the webhook url from Netlify and stop it temporarily!

#### Medium

Zapier is subscribed to the yld engineering medium account via an RSS feeds, it checks every hour for new content. Upon new content zapier makes a post request to Netlify to trigger a fresh build.

The account is registered under `apis@yld.io`, for access speak with Carlos Vilhena.

### ƛ Netlify lambda automated deployments

Utilising Netlify's [functions](https://www.netlify.com/docs/functions/).

#### Meetup

Local development requires:

`MEETUP_KEY` - Key for the lambda to get content from Contentful. Available from Contentful API Keys Settings.

`CMS_CRUD` - A personal access token generated from your Contentful account settings to allow writing to the yld Contentful space. Anyone with a Contentful account can generate one of these. The token used in production is registered to the `apis@yld.io` Contentful account.

`./src/functions/meetup.js`

Gets events from meetup.com and writes to Contentful which then triggers a deployment via the Contentful -> Netlify webhook.

#### Lever

`./src/functions/lever.js`

Utilises Gatsby's `onPostBuild` functionality - see how we utilise it [here](./gatsby-node.js) and Gatsby docs [here](https://www.gatsbyjs.org/docs/node-apis/#onPostBuild)

Lever webhooks are extremely limited so we have to write our own lambda to check for updated roles. Zapier pings the the public lambda every hour. Using the onPostBuild functionality we write the current role ids to a public file named `meta.json`. The lmabda compares the ids we get from lever and the ones currently on the site, if there are any differences we use the URL stored within `LAMBDA_LEVER_WEBHOOK` to make a POST request to deploy the site.

The zap is within the zapier account registered to `apis@yld.io`

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
