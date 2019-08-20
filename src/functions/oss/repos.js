/* eslint-disable no-console */
const Reduce = require('apr-reduce')
const { find, isEqual } = require('lodash')

const {
  getFieldValue,
  generateContentfulData,
  updateEntry
} = require('./utils')

const repoKeys = [
  'url',
  'nameWithOwner',
  'descriptionHTML',
  'pullRequestCount',
  'starCount'
]

const Repos = async (environment, { repos }) => {
  const { LAMBDA_ENV = 'development' } = process.env
  const isProd = LAMBDA_ENV === 'production'
  const { items: contentfulRepos } = await environment.getEntries({
    limit: 1000,
    content_type: 'githubRepo'
  })

  // Get the urls from the repos currently on the site
  const contentfulRepoUrls = contentfulRepos.map(repo =>
    getFieldValue(repo, 'url')
  )

  // Get the repo data we care about
  const filteredRepos = repos.filter(({ url }) =>
    contentfulRepoUrls.includes(url)
  )

  // Iterate over the contentful repo data
  return Reduce(contentfulRepos, async (acc = [], contentfulRepo) => {
    const githubRepo = find(filteredRepos, [
      `url`,
      getFieldValue(contentfulRepo, 'url')
    ])

    const contentfulRepoFromGithub = generateContentfulData(
      githubRepo,
      repoKeys
    )

    const fieldsAreEqual = isEqual(
      contentfulRepoFromGithub,
      contentfulRepo.fields
    )

    if (isProd && !fieldsAreEqual) {
      const { nameWithOwner } = githubRepo
      await updateEntry(
        contentfulRepo,
        contentfulRepoFromGithub,
        environment,
        nameWithOwner
      )

      return [...acc, nameWithOwner]
    } else {
      console.log(
        fieldsAreEqual
          ? `Fields for ${
              githubRepo.nameWithOwner
            } have not changed. Not updating!`
          : `Not prod so not updating contentful for ${
              githubRepo.nameWithOwner
            }`,
        JSON.stringify(
          {
            contentful: contentfulRepo.fields,
            github: contentfulRepoFromGithub
          },
          null,
          2
        )
      )

      return acc
    }
  })
}

module.exports = Repos
