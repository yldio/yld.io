import createServer from '../createServer'
import { Selector, ClientFunction } from 'testcafe'
require('dotenv').config()

const getWindowLocation = ClientFunction(() => window.location)

const hostname = `localhost`
const port = 3002
const baseUrl = `${hostname}:${port}`

let server

fixture`Top Nav Menu`.page`${baseUrl}`
  .before(async t => {
    server = createServer(port)
  })
  .after(() => server.close())

test('we are on the homepage', async t => {
  const location = await getWindowLocation()
  await t.expect(location.href).contains(baseUrl)
})

test('a dropdown dropdownContainer opens on desktop and redirects correctly', async t => {
  const services = await Selector('li').withText('Services')
  await t.expect(services.exists).ok()
  await t.click(services)

  const engineeringSubItem = await Selector('li[class^="InnerAnchorItem"]').nth(
    0
  )
  await t.click(engineeringSubItem)

  const location = await getWindowLocation()
  await t.expect(location.href).contains(`${baseUrl}/engineering`)
})

test('An outerAnchorItem redirects to a page', async t => {
  const joinUs = await Selector('li').withText('Join us')
  await t.expect(joinUs.exists).ok()
  await t.click(joinUs)

  const location = await getWindowLocation()
  await t.expect(location.href).contains(`${baseUrl}/join-us`)
})
