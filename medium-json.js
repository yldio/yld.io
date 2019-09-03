const { createClient } = require('contentful-management')
const jsonData = require('./json-file.json')
const Main = require('apr-main')
const dotenv = require('dotenv')

dotenv.config()
const { CMS_CRUD, CONTENTFUL_SPACE } = process.env
const client = createClient({
  accessToken: CMS_CRUD
})

const publishEntry = async (environment, postData) => {
  const id = await environment.createEntry('blogPost', postData)
  const newEntry = await environment.getEntry(id.sys.id)

  // eslint-disable-next-line
  console.log(`Adding blog post ${postData.fields.title['en-US']} `)
  return newEntry.publish()
}

Main(async () => {
  const json = jsonData
  const space = await client.getSpace(CONTENTFUL_SPACE)
  const environment = await space.getEnvironment('master')

  let importableResources = []
  let posts = {} // because `posts` needs to be in a scope accessible by `links` below

  const users = Object.keys(json.payload.references.User).map(
    key => json.payload.references.User[key]
  )
  importableResources = importableResources.concat(users)

  if (json.payload.posts) {
    posts = json.payload.posts
    importableResources = importableResources.concat(posts)
  }

  if (json.payload.references.Post) {
    posts = Object.keys(json.payload.references.Post).map(
      key => json.payload.references.Post[key]
    )
    importableResources = importableResources.concat(posts)
  }

  if (json.payload.references.Collection) {
    const collections = Object.keys(json.payload.references.Collection).map(
      key => json.payload.references.Collection[key]
    )
    importableResources = importableResources.concat(collections)
  }

  const resources = Array.prototype.concat(...importableResources)

  const results = resources
    .filter(({ type }) => type === 'Post')
    .map(resource => {
      const {
        id,
        title,
        firstPublishedAt,
        virtuals,
        uniqueSlug: slug,
        creatorId
      } = resource

      const { name, username } = resources.find(r => r.userId === creatorId)

      const node = {
        fields: {
          id: {
            'en-US': id
          },
          title: {
            'en-US': title
          },
          firstPublishedAt: {
            'en-US': new Date(firstPublishedAt).toISOString().slice(0, 10)
          },
          imageId: {
            'en-US': virtuals.previewImage.imageId
          },
          tags: {
            'en-US':
              virtuals.tags && virtuals.tags.length > 0
                ? virtuals.tags.map(({ slug }) => slug)
                : []
          },
          slug: {
            'en-US': slug
          },
          subtitle: {
            'en-US': virtuals.subtitle
          },
          authorName: {
            'en-US': name
          },
          authorId: {
            'en-US': username
          }
        }
      }

      return node
    })

  return results.map(result => publishEntry(environment, result))
})
