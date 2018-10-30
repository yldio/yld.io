import React from 'react'
// import { Link } from 'gatsby'

import Layout from '../components/layout'
import Posts from '../components/posts'
import Jobs from '../components/jobs'

const IndexPage = () => (
  <Layout>
    <h1>Posts</h1>
    <Posts />
    <h1>Jobs</h1>
    <Jobs />
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage
