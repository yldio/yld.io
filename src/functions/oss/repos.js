const Reduce = require('apr-reduce')
const { find, isEqual } = require('lodash')

const { getFieldValue, generateContentfulDataType } = require('./utils')
const { LAMBDA_ENV = 'development' } = process.env

const repoKeys = ['url', 'nameWithOwner', 'descriptionHTML', 'pullRequestCount']

const Repos = async (environment, { repos }) => {
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

    const contentfulRepoFromGithub = generateContentfulDataType(
      githubRepo,
      repoKeys
    )

    const fieldsAreEqual = isEqual(
      contentfulRepoFromGithub,
      contentfulRepo.fields
    )

    if (isProd && !fieldsAreEqual) {
      contentfulRepo.fields = contentfulRepoFromGithub

      const id = await contentfulRepo.update()
      const updatedEntry = await environment.getEntry(id.sys.id)

      console.log(`Publishing updated entry ${githubRepo.nameWithOwner}`)

      await updatedEntry.publish()
      return [...acc, githubRepo.nameWithOwner]
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
