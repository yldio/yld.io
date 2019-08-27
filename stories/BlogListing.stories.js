import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import BlogListing from '../src/components/Common/BlogListing'
import Theme from './theme'

addDecorator(Theme)

const posts = [
  {
    id: '53ae7f97-4a1b-51b0-a66c-cb5517edbcbb',
    title: 'Security Trivia Series: Understanding CSP’s Reporting',
    uniqueSlug:
      'security-trivia-series-understanding-csps-reporting-68d885596686',
    firstPublishedAt: '2019-04-08'
  },
  {
    id: '45f45b3a-2332-55d2-9419-031daae7225a',
    title: 'Serverless: It’s not all a FaaS',
    uniqueSlug: 'serverless-its-not-all-a-faas-9de3d8187ba3',
    firstPublishedAt: '2019-03-14'
  },
  {
    id: '22ad39f9-0298-5771-8d5e-26b190bc76cf',
    title: 'Under the 🔬 with Kubernetes',
    uniqueSlug: 'under-the-with-kubernetes-c1ea1a82c61f',
    firstPublishedAt: '2019-03-11'
  }
]

storiesOf('Blog Listing', module).add('Blog Listing', () => (
  <div>
    <BlogListing
      title="Title about blog posts"
      description="Description about the blog posts in this section."
      posts={posts}
    />
  </div>
))
