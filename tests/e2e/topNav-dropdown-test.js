import createServer from '../createServer'
import { Selector, ClientFunction } from 'testcafe'
require('dotenv').config()

const getWindowLocation = ClientFunction(() => window.location)

const hostname = `localhost`
const port = 3002
const baseUrl = `${hostname}:${port}`

let server

fixture`Menu`.page`${baseUrl}`
  .before(async t => {
    server = createServer(port)
  })
  .after(() => server.close())

test('we are on the homepage', async t => {
  const displayTitle = await Selector('h1[class^="DisplayTitle"]')

  await t.expect(displayTitle.exists).ok()
})

test('dropdown opens on desktop ', async t => {
  const services = await Selector('li').nth(0)

  await t.expect(services.exists).ok()

  await t.click(services)

  const servicesSubItem = await Selector('li[class^="InnerAnchorItem"]').nth(0)

  await t.click(servicesSubItem).wait(2000)

  const engineeringPageUrl = `${baseUrl}/engineering`
  const location = await getWindowLocation()

  await t.expect(location.href).contains(engineeringPageUrl)
})
