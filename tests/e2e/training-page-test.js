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
    firstModalLink = await Selector('a[data-testid^="modal"]').nth(0)
  })
  .after(() => server.close())

test('should open the correct training course modal when accessed via a link', async t => {
  const coursePathName = await firstModalLink
    .getAttribute('data-testid')
    .then(data =>
      data
        .split('/')
        .slice(1)
        .join('/')
    )

  await t.click(firstModalLink)
  const location = await getWindowLocation()
  await t.expect(location.href).contains(`${trainingPageUrl}/${coursePathName}`)
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
