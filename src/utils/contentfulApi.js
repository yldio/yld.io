const Main = require('apr-main')
const { createClient } = require('contentful-management')

const { PORT = 3000, CONTENTFUL_SPACE, CMS_CRUD } = process.env

const client = createClient({
  accessToken: CMS_CRUD
})

Main(async () => {})
const express = require('express')
const app = express()

app.get('/', async (req, res) => {
  const contentType = req.param('contentType')
  if (!contentType) {
    res.send('Missing contentType')
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

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Port: ${PORT}`))
