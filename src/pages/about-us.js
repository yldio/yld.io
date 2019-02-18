import React from 'react'

import Layout from '../components/layout'
import Head from '../components/Common/Head'

const AboutUs = ({ content = mockAboutUsContent }) => (
  <Layout backgroundColor="grey">
    <Head page={content} />
  </Layout>
)

const mockAboutUsContent = {
  site: {
    siteMetaData: {
      title: 'YLD | About Us'
    }
  },
  contentfulAboutUsPage: {
    title: 'YLD | About Us',
    seoTitle: 'YLD | About Us'
  }
}

export default AboutUs
