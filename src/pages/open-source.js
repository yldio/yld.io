import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Head from '../components/Common/Head'
import Layout from '../components/layout'
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview'

const OpenSource = ({ data }) => {
  return (
    <Layout>
      <Head page={} /> 
      <CaseStudyPreview caseStudy={} />
      <p>open source page</p>
      {/* All the sections go herer */}
    </Layout>
  )
}

const OpenSourcePage = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetaData {
            title
          }
        }
      }
    `}
    render={data => <OpenSource data={data} {...props} />}
  />
)

export default OpenSourcePage
