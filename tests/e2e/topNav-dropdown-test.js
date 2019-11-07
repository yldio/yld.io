import { Selector } from 'testcafe'

import createServer from '../createServer'
import { port, baseUrl, getWindowLocation } from './helper'

require('dotenv').config()
let server

fixture`Top Nav Menu`.page`${baseUrl}`
  .before(async () => {
    server = createServer(port)
  })
  .after(() => server.close())

test('we are on the homepage', async t => {
  const location = await getWindowLocation()
  await t
    .resizeWindow(1280, 720)
    .expect(location.href)
    .contains(baseUrl)
})

test('a dropdown dropdownContainer opens on desktop and redirects correctly', async t => {
  const services = await Selector('li').withText('Services')
  await t.expect(services.exists).ok({ timeout: 5000 })
  await t.click(services)

  const engineeringSubItem = await Selector('li[class^="InnerAnchorItem"]').nth(
    0
  )
  await t.expect(engineeringSubItem.exists).ok({ timeout: 5000 })
  await t.click(engineeringSubItem)

  const location = await getWindowLocation()
  await t.expect(location.href).contains(`${baseUrl}/engineering`)
})

test('An outerAnchorItem redirects to a page', async t => {
  const contact = await Selector('li').withText('Contact')
  await t.expect(contact.exists).ok()
  await t.click(contact)

  await t.expect(contact.exists).ok()
  const location = await getWindowLocation()

  await t.expect(location.href).contains(`${baseUrl}/contact`)
})

test('opens and close a dropdown', async t => {
  const services = await Selector('li').withText('Services')
  await t.expect(services.exists).ok({ timeout: 5000 })
  await t.click(services)

  const openDropdown = Selector('li')
    .withText('Services')
    .withAttribute('aria-expanded', 'true')
  await t.expect(openDropdown.exists).ok({ timeout: 5000 })

  const elsewhere = Selector('section').nth(0)
  await t.click(elsewhere)

  const closedDropdown = services.withAttribute('aria-expanded', 'false').nth(0)
  await t.expect(closedDropdown.exists).ok({ timeout: 5000 })
})
