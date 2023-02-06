/* eslint-disable no-irregular-whitespace */
import mapBlogPostsToList from '../mapBlogPostsToList';

test('mapBlogPostsToList should return an array of objects with a tilte and slug properties from a search term', () => {
  const posts = [
    {
      node: {
        title: 'Consider DynamoDB for your next project',
        authorName: 'Filipe Pinheiro',
        slug: 'consider-dynamodb-for-your-next-project',
      },
    },
    {
      node: {
        title: 'The Interview Process: What to Expect When You Apply to YLD',
        authorName: 'Ana Silva',
        slug: 'the-interview-process-what-to-expect-when-you-apply-to-yld',
      },
    },
    {
      node: {
        title: 'Load testing micro-services',
        authorName: 'João Tiago',
        slug: 'load-testing-micro-services',
      },
    },
    {
      node: {
        title: 'Mirroring our Medium blog to YLD.io',
        authorName: 'Tim Seckinger',
        slug: 'mirroring-our-medium-blog-to-yld-io',
      },
    },
    {
      node: {
        title: 'Fabio Oliveira promoted to YLD Managing Director',
        authorName: 'Greta Strolyte',
        slug: 'fabio-oliveira-promoted-to-yld-managing-director',
      },
    },
    {
      node: {
        title: 'Handling global notifications with React’s Context API',
        authorName: 'Daniela Matos de Carvalho',
        slug: 'handling-global-notifications-with-reacts-context-api',
      },
    },
    {
      node: {
        title:
          ' Play Lesser Players: correlating your teams’ input with exceptional outcomes',
        authorName: 'Nuno Job',
        slug: 'play-lesser-players-correlating-your-teams-input-with-exceptional-outcomes',
      },
    },
    {
      node: {
        title: 'The YLD Green Team',
        authorName: 'Joe Schofield',
        slug: 'the-yld-green-team',
      },
    },
    {
      node: {
        title: 'Optimising Manchester Web Meetup',
        authorName: 'James Wright',
        slug: 'optimising-manchester-web-meetup',
      },
    },
    {
      node: {
        title: 'A Heart Rate Dynamic Admission Controller',
        authorName: 'Tom Gallacher',
        slug: 'a-heart-rate-dynamic-admission-controller',
      },
    },
    {
      node: {
        title: 'Reduce bloat of your Lambdas',
        authorName: 'Sérgio Ramos',
        slug: 'reduce-bloat-of-your-lambdas',
      },
    },
    {
      node: {
        title: 'ScotlandJS 2016',
        authorName: 'YLD',
        slug: 'scotlandjs-2016',
      },
    },
    {
      node: {
        title:
          'Cloud Deep Dive: Part 3 — The Extremely Scalable Pizza Menu with Serverless SSR',
        authorName: 'Pieter Raubenheimer',
        slug: 'cloud-deep-dive-part-3-the-extremely-scalable-pizza-menu-with-serverless-ssr',
      },
    },
    {
      node: {
        title: 'Build your own community event monitor',
        authorName: 'YLD',
        slug: 'build-your-own-community-event-monitor',
      },
    },
    {
      node: {
        title: 'What is a software engineer?',
        authorName: 'Ray Brooks',
        slug: 'what-is-a-software-engineer',
      },
    },
  ];

  expect(mapBlogPostsToList('jo', posts)).toMatchInlineSnapshot(`
    [
      {
        "slug": "/blog/load-testing-micro-services",
        "title": "Load testing micro-services",
      },
      {
        "slug": "/blog/play-lesser-players-correlating-your-teams-input-with-exceptional-outcomes",
        "title": " Play Lesser Players: correlating your teams’ input with exceptional outcomes",
      },
      {
        "slug": "/blog/the-yld-green-team",
        "title": "The YLD Green Team",
      },
    ]
  `);

  expect(mapBlogPostsToList('deep', posts)).toMatchInlineSnapshot(`
    [
      {
        "slug": "/blog/cloud-deep-dive-part-3-the-extremely-scalable-pizza-menu-with-serverless-ssr",
        "title": "Cloud Deep Dive: Part 3 — The Extremely Scalable Pizza Menu with Serverless SSR",
      },
    ]
  `);

  expect(mapBlogPostsToList('sdkjhfsdkjhf', posts)).toMatchInlineSnapshot(`[]`);
});
