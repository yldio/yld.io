import createServer from '../createServer'
import { Selector, ClientFunction } from 'testcafe'
require('dotenv').config()

const getWindowLocation = ClientFunction(() => window.location)

const hostname = `localhost`
const port = 3002
const baseUrl = `${hostname}:${port}`

let server

fixture`Side Nav Menu`.page`${baseUrl}`
  .before(async t => {
    server = createServer(port)
  })
  .after(() => server.close())

test('we are on the homepage', async t => {
  const location = await getWindowLocation()
  await t.expect(location.href).contains(baseUrl)
})

test('a hamburger is present and opens the side nav', async t => {
  const hamburger = await Selector('[class^="Hamburger"').filterVisible()
  await t.expect(hamburger.exists).ok()
  await t.click(hamburger)

  const sideNav = await Selector('[class^="SideNav"]').filterVisible()
  await t.expect(sideNav.exists).ok()
})
