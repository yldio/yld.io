import createServer from '../createServer'
import { Selector, ClientFunction } from 'testcafe'
import { ReactSelector, waitForReact } from 'testcafe-react-selectors'
require('dotenv').config()

const getWindowLocation = ClientFunction(() => window.location)

const hostname = `localhost`
const port = 3002
const baseUrl = `${hostname}:${port}`

let server

fixture`Side Nav Menu`.page`${baseUrl}`
  .before(async () => {
    server = createServer(port)
  })
  .beforeEach(async () => {
    await waitForReact()
  })
  .after(() => server.close())

test('we are on the homepage', async t => {
  const location = await getWindowLocation()
  await t.expect(location.href).contains(baseUrl)
})

test('a hamburger is present on the page', async t => {
  const hamburger = await Selector('[class^="Hamburger"').filterVisible()
  await t.expect(hamburger.exists).ok()
})

test('the side nav is not expanded at its initial state', async t => {
  const sideNavPanel = ReactSelector('nav[class^="SideNav"').withProps(
    'open',
    true
  )
  await t.expect(sideNavPanel.exists).notOk()
})

test.skip('when the hamburger button is clicked the side nav expands', async t => {
  const hamburger = await Selector('[class^="Hamburger"')
  await t.click(hamburger)

  const sideNavPanel = ReactSelector('nav[class^="SideNav"').withProps(
    'open',
    true
  )
  await t.expect(sideNavPanel.exists).ok()
})
