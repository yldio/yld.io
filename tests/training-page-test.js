import { Selector, ClientFunction } from 'testcafe'
require('dotenv').config()

const { GATSBY_ENVIRONMENT } = process.env

const baseUrl =
  GATSBY_ENVIRONMENT === 'preview'
    ? process.env.DEPLOY_PRIME_URL
    : process.env.BASE_URL

const trainingPageUrl = `${baseUrl}/training`
const getWindowLocation = ClientFunction(() => window.location)

let firstModalLink
fixture`Training page`.page`${trainingPageUrl}`.beforeEach(async t => {
  firstModalLink = await Selector('a[data-testid^="modal"]').nth(0)
})

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

test('should be redirected to when the training course modal is closed', async t => {
  await t.click(firstModalLink)
  const modalCloseButton = Selector('a[class^="CourseCloseButton"]').nth(0)
  await t.click(modalCloseButton)

  const location = await getWindowLocation()
  await t.expect(location.href).contains(trainingPageUrl)
})
