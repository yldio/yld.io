import createServer from '../createServer'
import { Selector, ClientFunction } from 'testcafe'
require('dotenv').config()

const hostname = `localhost`
const port = `3001`
const baseUrl = `${hostname}:${port}`
const trainingPageUrl = `${baseUrl}/training`

const getWindowLocation = ClientFunction(() => window.location)

let server
let firstModalLink
fixture`Training page`.page`${trainingPageUrl}`
  .before(async t => {
    server = createServer(port)
  })
  .beforeEach(async t => {
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
