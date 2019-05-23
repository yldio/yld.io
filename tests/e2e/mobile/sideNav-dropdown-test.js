import createServer from '../../createServer'
import { Selector, ClientFunction } from 'testcafe'
// import { ReactSelector, waitForReact } from 'testcafe-react-selectors'
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

const openSideNav = async t => {
  const hamburger = await Selector('[class^="Hamburger"')
  await t
    // .resizeWindowToFitDevice('iPhone 6', {
    //   portraitOrientation: true
    // })
    .click(hamburger)
}

fixture`Side Nav Menu`.page`${baseUrl}`
  .before(async () => {
    server = createServer(port)
  })
  .after(() => server.close())

test('we are on the homepage', async t => {
  const location = await getWindowLocation()
  await t.expect(location.href).contains(baseUrl)
})

test('a hamburger is present on the page', async t => {
  const hamburger = await Selector('[class^="Hamburger"').filterVisible()
  await t
    // .resizeWindowToFitDevice('iPhone 6', {
    //   portraitOrientation: true
    // })
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
  const sideNavPanel = Selector('nav[class^="SideNav"]').withAttribute('open')

  const joinUsLink = sideNavPanel.find('a').withText('Join us')
  await t.click(joinUsLink)

  const location = await getWindowLocation()
  await t.expect(location.href).contains(`${baseUrl}/join-us`)
  await t.expect(sideNavPanel.exists).notOk()
})

test('when the side nav expands for the first time no sub-item is shown by default', async t => {
  await openSideNav(t)
  const sideNavPanel = Selector('nav[class^="SideNav"]').withAttribute('open')

  const engineeringSubItem = sideNavPanel.find('a').withText('Engineering')
  await t.expect(engineeringSubItem.exists).notOk()
})

test('when an item is clicked its sub-items appear', async t => {
  await openSideNav(t)
  const sideNavPanel = Selector('nav[class^="SideNav"]').withAttribute('open')

  const servicesItem = sideNavPanel.find('span').withText('Services')
  await t.click(servicesItem)

  const engineeringSubItem = sideNavPanel.find('a').withText('Engineering')
  await t.expect(engineeringSubItem.exists).ok()
})

test('clicking a sub-item redirects to the correct url and closes the side Nav', async t => {
  await openSideNav(t)
  const sideNavPanel = Selector('nav[class^="SideNav"]').withAttribute('open')

  const servicesItem = sideNavPanel.find('span').withText('Services')
  await t.click(servicesItem)

  const engineeringSubItem = sideNavPanel.find('a').withText('Engineering')
  await t.click(engineeringSubItem)

  const location = await getWindowLocation()
  await t.expect(location.href).contains(`${baseUrl}/engineering`)
  await t.expect(sideNavPanel.exists).notOk()
})

test('After a sub-item has been clicked and if the sideNav is re-opened, the subitems are still visible and the selected one highlighted', async t => {
  await openSideNav(t)
  const sideNavPanel = Selector('nav[class^="SideNav"]').withAttribute('open')

  const servicesItem = sideNavPanel.find('span').withText('Services')
  await t.click(servicesItem)

  const designSubItem = sideNavPanel.find('a').withText('Design')
  await t.click(designSubItem)
  await openSideNav(t)

  const engineeringSubItem = sideNavPanel.find('a').withText('Engineering')
  await t.expect(engineeringSubItem.exists).ok()

  const inactiveSubItem = sideNavPanel
    .find('a')
    .withText('Engineering')
    .withAttribute('active')
  await t.expect(inactiveSubItem.exists).notOk()

  const activeSubItem = sideNavPanel
    .find('a[class$="active"]')
    .withText('Design')
  await t.expect(activeSubItem.exists).ok()
})
