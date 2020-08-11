# YLD Website

## [Link](https://www.yld.io/)

## [Storybook](https://yld-storybook.now.sh)

## How to run:

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
MEETUP_API_SECRET - OAuth Secret
MEETUP_API_KEY - OAuth Key
MEETUP_EMAIL - See below
MEETUP_PASS - See below
CMS_CRUD
```

You can now run:

```
  yarn develop
```

We have some docs to make it easier for you to get started:

## Running Tests

All tests are run through scripts within package.json so check there for details.

**N.B. You need to `yarn run build` prior to running testcafe and lighthouse testing scripts.**

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
- [Testcafe](https://devexpress.github.io/testcafe/)

## Content in

- [Contentful](https://contentful.com)

## Blog

How does the blog work? Good question! See [here](./docs/blog.md)

## Deployment

The website and lambda are built (`yarn build`) and deployed on [Netlify](https://netlify.com/) to our production environment ([https://www.yld.io](https://www.yld.io)) when:

- a new commit is pushed to our **production** (`master`) branch, read more [here](https://www.netlify.com/docs/continuous-deployment/);
- the Contentful data is updated (via _webhook_).

Also, for each Pull Request that's open, a [Deploy Preview](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) is created, allowing for that branch to be tested and shared amongst stakeholders.

## Automated deployments

[`Zapier`](http://zapier.com) is a great tool for automating certain tasks, e.g. tracking changes to RSS feeds or simple scheduling requests to certain endpoints. We depend on it for several of our automated deployments, all listed below.

### 📬 Webhook automated deployments

We are using Netlify [webhooks/build hooks](https://www.netlify.com/docs/webhooks/) to automate new builds when services we use update. Each service has its own webhook url set up in Netlify.

Keep in mind if you need to urgently alter any of the automated builds but don't have access to the services below, it's possible to just remove the webhook url from Netlify and stop it temporarily!

#### Medium

Zapier is subscribed to the yld engineering medium account via an RSS feeds, it checks every hour for new content. Upon new content zapier makes a post request to Netlify to trigger a fresh build.

The account is registered under `apis@yld.io`, for access speak with Carlos Vilhena.

### ƛ Netlify lambda automated deployments

Utilising Netlify's [functions](https://www.netlify.com/docs/functions/).

#### Meetup

Local development requires:

`MEETUP_API_SECRET` - OAuth secret, defined in our meetup.com account

`MEETUP_API_KEY` - OAuth Client ID, defined in our meetup.com account

`MEETUP_EMAIL` - Meetup account email login

`MEETUP_PASS` - Meetup account password

`CONTENTFUL_SPACE` - Our Contentful space ID

`CMS_CRUD` - A _personal access token_ generated from your Contentful account settings (listed under the `Content management tokens` section in settings > APIs) to allow writing to the yld Contentful space. Anyone with a Contentful account can generate one of these. The token used in production is registered to the `apis@yld.io` Contentful account.

`./src/functions/meetup-oauth.js`
`./src/functions/meetup-callback.js`

This lambda takes our meetup event data and publishes it to Contentful.

Due to meetups use of OAuth 2.0, the flow here requires some authentication prior to starting to work that deals with the meetup and contentful data.

Flow:

- Zapier triggers the `meetup-oauth.js` lambda
- Meetup OAuth service calls the redirect URL, `https://yld.io/.netlify/functions/meetup-callback.js`
- Within `meetup-callback.js` we perform some authentication and include the returned session tokens within all of our meetup API requests as an Authorization header.
- Once all of the contentful updates and new entries have been made we return `log`, an object detailing all of the updated/created meetup events in contentful.
- `log` is then returned back to `meetup-oauth` endpoint and the process ends.

For another explanation of the flow check the meetup guides [here](https://www.meetup.com/meetup_api/auth/#oauth2servercredentials)

> **WARNING** - Due to the sensitive login information that is required to develop this lambda you are encourage to exercise common sense when handling these login details.

#### Lever

`./src/functions/lever.js`

Utilises Gatsby's `onPostBuild` functionality - see how we utilise it [here](./gatsby-node.js) and Gatsby docs [here](https://www.gatsbyjs.org/docs/node-apis/#onPostBuild)

Lever webhooks are extremely limited so we have to write our own lambda to check for updated roles. Zapier pings the the public lambda every hour. Using the onPostBuild functionality we write the current role ids to a public file named `meta.json`. The lmabda compares the ids we get from lever and the ones currently on the site, if there are any differences we use the URL stored within `LAMBDA_LEVER_WEBHOOK` to make a POST request to deploy the site.

The zap is within the zapier account registered to `apis@yld.io`

#### Contributions

We have 4 lambdas to update contribution data on contentful, considering each contribution type (_pullRequest_, _pullRequestReview_, _commit_, _issue_):

- `contributions-pull-requests`
- `contributions-pull-request-reviews`
- `contributions-commits`
- `contributions-issues`

Each time one of these lambdas runs, it'll fetch the contributions using the github graphQL API and _Members Data_ from Contenful, considering each members working periods, and update the contribution list for that type on Contentful (_OS contributions_).

#### Github

Local development requires:

`GITHUB_TOKEN` - A personal access token generated on your personal github account. Create one [here](https://github.com/settings/tokens) with the following scopes: `public_repo`, `read:org`, `read:user`

`CONTENTFUL_SPACE` - see [How to run](#how-to-run) section

`CMS_CRUD` - see [How to run](#how-to-run) section

`./src/functions/github.js`

The aim of this lammbda is to have up to date metrics of yld's open source contribution on the site. We do this by aggregating the contributions from different types, that should be up to date on Contenful via the contribution types lambdas, processing the data and publishing it to Contentful. It is split into two sections, `repos` and `meta`.

- Repos
  We want to store data regarding specific repos that members of yld have contributed to e.g. node, react, enyzyme etc. By creating a `githubRepo` content type on Contentful with only a URL value edtiable, we are able to create references to these repos that can be used throughout the site but have metrics that are _only_ available to update via the API medium. This ensures data is always valid and accurate.

- Meta
  Meta data is used a summary of all the repositories that yldio organisation has contributed to. This data is written directly to the Open Source content type.

Main [`@yld.io/oss-stats`](https://www.npmjs.com/package/@yldio/oss-stats) to aggregate all open source contributions for `yldio` organization members.

#### Members

This lambda takes a log with members join/leave dates from contentful(_Member log_), as:

```
Sérgio Ramos,Joined YLD,Mar 2015,sergioramos
Filipe Pinheiro,Joined YLD,Sep 2015,fampinheiro
Fábio Moreira,Joined YLD,Apr 2018,fabiommmoreira
Fábio Antunes (2),Joined YLD,Feb 2017,FabioAntunes
Fábio Antunes (2),Left YLD,May 2018,FabioAntunes
Fábio Antunes (1),Joined YLD,Mar 2019,FabioAntunes
```

calls [`@yld.io/oss-stats`](https://www.npmjs.com/package/@yldio/oss-stats) to fetch additional data from github (id and url) and return an object with the member data formatted in the way it's intended to be used within the contributions aggregator and stores it on Contenful - _Members Data_.

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
