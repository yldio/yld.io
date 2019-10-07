/**
 * This is just a simple script that can be used when you want
 * to check the return values from the contentful API and try
 * to understand what gatsby-source-contentful is doing behind
 * the sceens when it's inferring typings from the CMS.
 *
 * Change the `content_type` value to the content type return
 * value that you want to see the raw data of, then run:
 *
 * `node contentful-check.js
 *
 */
/* eslint-disable no-console */
const Main = require('apr-main')
const { createClient } = require('contentful-management')
const { CMS_CRUD, CONTENTFUL_SPACE } = process.env

const client = createClient({
  accessToken: CMS_CRUD
})

Main(async () => {
  const space = await client.getSpace(CONTENTFUL_SPACE)
  const environment = await space.getEnvironment('master')

  const { items } = await environment.getEntries({
    limit: 1000,
    content_type: 'speciality'
  })

  console.log(
    JSON.stringify(
      {
        items
      },
      null,
      2
    )
  )
})
