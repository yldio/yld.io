/**
 * This lambda is to keep selected repo data up to date on Contentful
 *
 * lambda triggered --> get repo urls stored in contentful --> get current contentful data -->  get current github data --> if any differences, write new data to contentful
 */

const { getData, normalise, summariseContributions } = require('oss-stats')
const { createClient } = require('contentful-management')
const { get } = require('lodash')

const { CONTENTFUL_SPACE, CMS_CRUD, LAMBDA_ENV = 'development' } = process.env

const org = 'yldio'
const locale = 'en-US'

const getInFields = locale => (obj, key) => get(obj, `fields.${key}.${locale}`)
const getFieldValue = getInFields(locale)

// const repoKeys = ['url', 'name']

const repoKeys = ['url', 'nameWithOwner', 'descriptionHTML', 'pullRequestCount']

const gernerateRepo = obj =>
  repoKeys.reduce(acc, curr => ({ ...acc, [curr]: obj[curr] }), {})

exports.handler = async (event, context) => {
  // Get github data
  const { repos } = await getData(org)
    .then(normalise)
    .then(summariseContributions)

  // Get contentful data
  const client = createClient({
    accessToken: CMS_CRUD
  })

  const space = await client.getSpace(CONTENTFUL_SPACE)
  const environment = await space.getEnvironment('master')

  const { items: contentfulRepos } = await environment.getEntries({
    limit: 1000,
    content_type: 'githubRepo'
  })

  // Get the urls from the repos currently on the site
  const contentfulRepoUrls = contentfulRepos.map(repo =>
    getFieldValue(repo, 'url')
  )

  // filter out any repos we dont need
  const filteredRepos = repos.filter(({ url }) =>
    contentfulRepoUrls.includes(url)
  )

  // generate the objects to compare against each other
  const githubData = filteredRepos.map(repo => gernerateRepo(repo))
  const contentfulData = contentfulRepos
    .map(({ fields }) => Object.keys(fields))
    .reduce(
      (acc, field) => ({
        ...acc,
        [field]: getFieldValue(contentfulRepos, field)
      }),
      {}
    )

  console.log(JSON.stringify({ githubData, contentfulData }, null, 2))

  return {
    status: 200,
    body: contentfulRepoUrls
  }
}
