import createServer from '../createServer'
import { Selector, ClientFunction } from 'testcafe'
// import { ReactSelector, waitForReact } from 'testcafe-react-selectors'
require('dotenv').config()

const getWindowLocation = ClientFunction(() => window.location)

const hostname = `localhost`
const port = 3002
const baseUrl = `${hostname}:${port}`

let server

const openSideNav = async t => {
  const hamburger = await Selector('[class^="Hamburger"')
  await t.click(hamburger)
}

fixture`Side Nav Menu`.page`${baseUrl}`
  .before(async () => {
    server = createServer(port)
  })
  //   .beforeEach(async () => {
  //     await waitForReact()
  //   })
  .after(() => server.close())

test('we are on the homepage', async t => {
  const location = await getWindowLocation()
  await t.expect(location.href).contains(baseUrl)
})

test('a hamburger is present on the page', async t => {
  const hamburger = await Selector('[class^="Hamburger"').filterVisible()
  await t
    .resizeWindowToFitDevice('iPhone 6', {
      portraitOrientation: true
    })
    .expect(hamburger.exists)
    .ok()
})

test('the side nav is not expanded at its initial state', async t => {
  const sideNavPanel = Selector('nav[class^="SideNav"').withAttribute('open')
  await t.expect(sideNavPanel.exists).notOk()
})

test('when the hamburger button is clicked the side nav expands', async t => {
  await openSideNav(t)

  const sideNavPanel = Selector('nav[class^="SideNav"').withAttribute('open')
  await t.expect(sideNavPanel.exists).ok()
})

test('clicking a side Nav link redirects to the correct url and closes the side Nav', async t => {
  await openSideNav(t)
  const sideNavPanel = Selector('nav[class^="SideNav"').withAttribute('open')

  const joinUsLink = sideNavPanel.find('a').withText('Join us')
  await t.click(joinUsLink)

  const location = await getWindowLocation()
  await t.expect(location.href).contains(`${baseUrl}/join-us`)
  await t.expect(sideNavPanel.exists).notOk()
})

test('when the side nav expands for the first time no sub-item is shown by default', async t => {
  await openSideNav(t)
  const sideNavPanel = Selector('nav[class^="SideNav"').withAttribute('open')

  const engineeringSubItem = sideNavPanel.find('a').withText('Engineering')
  await t.expect(engineeringSubItem.exists).notOk()
})

test('when an item is clicked its sub-items appear', async t => {
  await openSideNav(t)
  const sideNavPanel = Selector('nav[class^="SideNav"').withAttribute('open')

  const servicesItem = sideNavPanel.find('span').withText('Services')
  await t.click(servicesItem)

  const engineeringSubItem = sideNavPanel.find('a').withText('Engineering')
  await t.expect(engineeringSubItem.exists).ok()
})
