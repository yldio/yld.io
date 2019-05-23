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
MEETUP_KEY=(see in contentful/settings/API keys "gatsby > Content Delivery API - Access Token")
GATSBY_ENVIRONMENT="development"
CMS_CRUD=(copy from Netlify - Build & Deploy - Environment - Edit variables - CMS_CRUD. Read below why copy)
```

The meetup contentful lambda script uses [Contentful's Content Management API](https://www.contentful.com/developers/docs/references/content-management-api/). This requires a _Content Management Token_ and NOT a Content Delivery Token (Content Delivery can only give you the info that's there, you can't CRUD entries). A CMT can only be viewed just after it has been generated. In theory these are Personal Tokens and each user can generate their own, but for simplicity's sake, it's easier for everyone to use the same one in their env file. Should you need to generate a new CMT, you can do so from contentful/settings/API keys/Content management tokens. The one used in Netlify is the "cms-crud" one. The token used in Netlify production is registered with the apis@yld.io's Contentful account.

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

Zapier is subscribed to the yld engineering medium account via an RSS feeds, it checks every 5mins for new content. Upon new content zapier makes a post request to Netlify to trigger a fresh build.

The account is registered under apis@yld.io, for access speak with Carlos Vilhena.

#### Lever

Using Lever's internal webhook functionality, a POST request is made to the corresponding Netlify endpoint whenver a role is ADDED or REMOVED within the yld Lever account.

Due to Lever's "all or nothing" permission access developers do not have access to set up webhooks. At time of writing Nick Osborn has God tier access and will happily set the url endpoints if they need changing.

### ƛ Netlify lambda automated deployments

Utilising Netlify's [functions](https://www.netlify.com/docs/functions/).

#### Meetup

`src/functions/meetup.js`

Gets events from meetup.com and writes to contentful which then triggers a deployment via the contentful -> netlify webhook.

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
