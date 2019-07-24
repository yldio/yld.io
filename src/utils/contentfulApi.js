const { createClient } = require('contentful-management')
const express = require('express')
const app = express()
const Intercept = require('apr-intercept')
const { PORT = 3000, CONTENTFUL_SPACE, CMS_CRUD } = process.env

const client = createClient({
  accessToken: CMS_CRUD
})

app.get('/content-type', async (req, res) => {
  const contentType = req.param('contentType')

  if (!contentType) {
    res.send('Missing query params')
  }

  const space = await client.getSpace(CONTENTFUL_SPACE)
  const environment = await space.getEnvironment('master')

  const entries = await environment.getEntries({
    limit: 1000,
    content_type: contentType
  })

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ contentType, entries }, null, 2))
})

app.get('/entry', async (req, res) => {
  const { id: entryId } = req.query

  const space = await client.getSpace(CONTENTFUL_SPACE)
  const environment = await space.getEnvironment('master')

  if (!entryId) {
    return res.send('Missing id query param')
  }

  const [err, entry] = await Intercept(environment.getEntry(entryId))
  if (err) {
    res.send(err)
  }

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ entry }, null, 2))
})

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Port: ${PORT}`))
