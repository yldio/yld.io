import { Selector } from 'testcafe'

import createServer from '../createServer'
import { port, baseUrl, getWindowLocation } from './helper'

require('dotenv').config()
let server

const trainingPageUrl = `${baseUrl}/training`
let firstModalLink

fixture`Training page`.page`${trainingPageUrl}`
  .before(async () => {
    server = createServer(port)
  })
  .beforeEach(async () => {
    firstModalLink = await Selector('a[data-testid=course-link]').nth(0)
  })
  .after(() => server.close())

test('clicking a link on the training page should open up a modal with information on the correct training course', async t => {
  const courseLinkText = await firstModalLink.textContent
  await t.click(firstModalLink)
  const modalTitle = await Selector('[data-testid="modal-title"]').textContent
  await t.expect(courseLinkText).eql(modalTitle)
})

test('should be redirected to the course catalog on the training page when the modal is closed', async t => {
  await t.click(firstModalLink)
  const modalCloseButton = Selector('a[data-testid="modal-close-button"]')
  await t.click(modalCloseButton)

  const location = await getWindowLocation()
  await t
    .expect(location.href)
    .contains(trainingPageUrl)
    .expect(firstModalLink.visible)
    .ok()
})

test('pressing Escape on the keyboard closes the modal & redirects to the course catalog', async t => {
  await t.click(firstModalLink)
  await t.pressKey('esc')

  const location = await getWindowLocation()
  await t
    .expect(location.href)
    .contains(trainingPageUrl)
    .expect(firstModalLink.visible)
    .ok()
})

test('when using the Escape key to close a modal, any future modal that is opened still has the correct content', async t => {
  const firstCourseLinkText = await firstModalLink.textContent
  const secondModalLink = await Selector('a[data-testid=course-link]').nth(1)
  const secondCourseLinkText = await secondModalLink.textContent

  let modalTitle
  await t.click(firstModalLink)
  modalTitle = await Selector('[data-testid="modal-title"]').textContent
  await t.expect(firstCourseLinkText).eql(modalTitle)

  await t.pressKey('esc')

  await t.click(secondModalLink)
  modalTitle = await Selector('[data-testid="modal-title"]').textContent
  await t.expect(secondCourseLinkText).eql(modalTitle)
})

test("navigating directly to a training course's url should show the same content as navigating via the training page", async t => {
  await t.click(firstModalLink)
  const titleFromTrainingPageLink = await Selector(
    '[data-testid="modal-title"]'
  ).textContent
  const location = await getWindowLocation()

  await t.navigateTo('/')
  await t.navigateTo(location.pathname)
  const titleFromUrlNavigation = await Selector('[data-testid="modal-title"]')
    .textContent

  await t.expect(titleFromUrlNavigation).eql(titleFromTrainingPageLink)
})
