/**
 *
 * This lambda is to keep selected repo data up to date on Contentful
 *
 * lambda triggered --> get repo urls stored in contentful --> get current contentful data -->  get current github data --> if any differences, write new data to contentful
 */

const {
  getData,
  normalise,
  summariseContributions
} = require('@yldio/oss-stats')
const { createClient } = require('contentful-management')

const Auth = require('./utils/auth')
const Meta = require('./oss/meta')
const Repos = require('./oss/repos')

const org = 'yldio'

exports.handler = async evt =>
  Auth(evt, async () => {
    const { CONTENTFUL_SPACE, CMS_CRUD, GITHUB_TOKEN } = process.env

    if ((!CONTENTFUL_SPACE, !CMS_CRUD, !GITHUB_TOKEN)) {
      throw new Error(`Missing env variables, check set up`)
    }

    // Get github data
    const {
      repos,
      repoCount: openSourceMetaReposCount,
      pullRequestCount: openSourceMetaPullRequestsCount
    } = await getData({
      org,
      token: GITHUB_TOKEN
    })
      .then(normalise)
      .then(summariseContributions)

    // Get contentful data
    const client = createClient({
      accessToken: CMS_CRUD
    })

    const space = await client.getSpace(CONTENTFUL_SPACE)
    const environment = await space.getEnvironment('master')

    const [meta, updatedRepos] = await Promise.all([
      Meta(environment, {
        openSourceMetaPullRequestsCount,
        openSourceMetaReposCount
      }),
      Repos(environment, { repos })
    ]).catch(err => {
      throw new Error(err)
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        meta: { ...meta },
        updatedRepos:
          updatedRepos && updatedRepos.length
            ? updatedRepos
            : 'No repos updated'
      })
    }
  })
